import { useEffect } from "react";
import { nanoid } from "nanoid";
import { Modal, Button, Form, Input } from "antd";
import { Client } from "../types";
import styles from "./CRUDModal.module.scss";

const { useForm } = Form;

type Props = {
  client?: Client | null;
  isLoading?: boolean;
  open: boolean;
  closeModal: () => void;
  okButton: string;
  onSubmit: (client: Client) => void;
};

export const CRUDModal = ({
  client,
  onSubmit,
  open,
  closeModal,
  okButton,
  isLoading,
}: Props) => {
  const [form] = useForm<Client | null>();

  const onFormSave = async () => {
    try {
      const values = (await form.validateFields()) as Client;

      onSubmit({
        ...values,
        id: client?.id || nanoid(),
        createdAt: client?.createdAt || new Date().toISOString(),
      });
    } catch (errInfo) {
      //   console.table(errInfo);
    }
  };

  useEffect(() => {
    if (client) {
      form.setFieldsValue(client);
    } else {
      form.resetFields();
    }
  }, [form, client]);

  return (
    <>
      <Modal
        destroyOnClose
        className={styles.modal}
        width="98%"
        open={open}
        footer={null}
        onCancel={closeModal}
        title={client ? "Редактирование клиента" : "Добавление клиента"}
      >
        <div className={styles.body}>
          <Form
            form={form}
            initialValues={client || {}}
            onSubmitCapture={onFormSave}
          >
            <Form.Item
              name="name"
              label="Имя клиента"
              rules={[
                {
                  required: true,
                  message: "Обязательное поле",
                },
              ]}
            >
              <Input placeholder="Введите имя клиента" />
            </Form.Item>
            <Form.Item name="phone" label="Номер телефона">
              <Input placeholder="Введите номер телефона" />
            </Form.Item>

            <Form.Item name="visited" label="Посетил раз">
              <Input placeholder="Количство посещений" disabled />
            </Form.Item>
            <Form.Item name="canceled" label="Отменил раз">
              <Input placeholder="Количство отмен" disabled />
            </Form.Item>
            <Form.Item name="moved" label="Перенес раз">
              <Input placeholder="Количство переносов" disabled />
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
