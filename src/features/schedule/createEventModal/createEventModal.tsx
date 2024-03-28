import { nanoid } from "nanoid";
import { Modal, Button, Form, Input, Select } from "antd";
import styles from "./createEventModal.module.scss";

const { useForm } = Form;

type Props = {
  isLoading?: boolean;
  open: boolean;
  closeModal: () => void;
  onSubmit: () => void;
};

export const CreateEventModal = ({
  onSubmit,
  open,
  closeModal,
  isLoading,
}: Props) => {
  const [form] = useForm<any | null>();

  const onFormSave = async () => {
    try {
      const values = (await form.validateFields()) as any;

      // @ts-ignore
      onSubmit({
        ...values,
        id: nanoid(),
        createdAt: new Date().toISOString(),
      });
    } catch (errInfo) {
      //   console.table(errInfo);
    }
  };

  return (
    <>
      <Modal
        destroyOnClose
        className={styles.modal}
        width="98%"
        open={open}
        footer={null}
        onCancel={closeModal}
        title="Создание записи"
      >
        <div className={styles.body}>
          <Form
            form={form}
            initialValues={{ distance: "60" }}
            onSubmitCapture={onFormSave}
          >
            <Form.Item
              name="client"
              label="Клиент"
              rules={[
                {
                  required: true,
                  message: "Обязательное поле",
                },
              ]}
            >
              <Select
                placeholder="Выберите клиента"
                options={[
                  { label: "Клиент 1", value: "1" },
                  { label: "Клиент 2", value: "2" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="price"
              label="Услуга"
              rules={[
                {
                  required: true,
                  message: "Обязательное поле",
                },
              ]}
            >
              <Select
                placeholder="Выберите услугу"
                options={[
                  { label: "Услуга 1", value: "1" },
                  { label: "Услуга 2", value: "2" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="distance"
              label="Длительность (минуты)"
              rules={[
                {
                  required: true,
                  message: "Обязательное поле",
                },
              ]}
            >
              <Input placeholder="Введите длительность сеанса" type="number" />
            </Form.Item>
            <Form.Item
              name="date"
              label="Дата"
              rules={[
                {
                  required: true,
                  message: "Обязательное поле",
                },
              ]}
            >
              <Input placeholder="Дата" />
            </Form.Item>

            <div className={styles.buttons}>
              <Button onClick={closeModal} disabled={isLoading} danger>
                Удалить запись
              </Button>

              <Button type="primary" htmlType="submit" loading={isLoading}>
                Сохранить
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};
