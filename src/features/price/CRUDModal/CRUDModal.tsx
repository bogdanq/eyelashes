import { useEffect } from "react";
import { nanoid } from "nanoid";
import { Modal, Button, Form, Input } from "antd";
import { Service } from "../types";
import styles from "./CRUDModal.module.scss";

const { useForm } = Form;

type Props = {
  service?: Service | null;
  isLoading?: boolean;
  open: boolean;
  closeModal: () => void;
  okButton: string;
  onSubmit: (service: Service) => void;
};

export const CRUDModal = ({
  service,
  onSubmit,
  open,
  closeModal,
  okButton,
  isLoading,
}: Props) => {
  const [form] = useForm<Service | null>();

  const onFormSave = async () => {
    try {
      const values = (await form.validateFields()) as Service;

      onSubmit({ ...values, id: service?.id || nanoid() });
    } catch (errInfo) {
      //   console.table(errInfo);
    }
  };

  useEffect(() => {
    if (service) {
      form.setFieldsValue(service);
    } else {
      form.resetFields();
    }
  }, [form, service]);

  return (
    <>
      <Modal
        destroyOnClose
        className={styles.modal}
        width="98%"
        open={open}
        footer={null}
        onCancel={closeModal}
        title={service ? "Редактирование услуги" : "Добавление услуги"}
      >
        <div className={styles.body}>
          <Form form={form} onSubmitCapture={onFormSave}>
            <Form.Item
              name="title"
              label="Название услуги"
              rules={[
                {
                  required: true,
                  message: "Обязательное поле",
                },
              ]}
            >
              <Input placeholder="Введите название услуги" />
            </Form.Item>
            <Form.Item name="description" label="Описание услуги">
              <Input placeholder="Введите описание услуг" />
            </Form.Item>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Обязательное поле",
                },
              ]}
              label="Стоимость услуги"
            >
              <Input placeholder="Введите стоимость услуг" type="number" />
            </Form.Item>
            <Form.Item
              name="profit"
              rules={[
                {
                  required: true,
                  message: "Обязательное поле",
                },
              ]}
              label="Чистая прибыль"
            >
              <Input placeholder="Введите чистую прибыль" type="number" />
            </Form.Item>

            <div className={styles.buttons}>
              <Button onClick={closeModal} disabled={isLoading}>
                Отменить
              </Button>

              <Button type="primary" htmlType="submit" loading={isLoading}>
                {okButton}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};
