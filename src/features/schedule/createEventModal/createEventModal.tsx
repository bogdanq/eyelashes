import { nanoid } from "nanoid";
import dayjs from "dayjs";
import { Modal, Button, Form, Input, Select, DatePicker } from "antd";
import styles from "./createEventModal.module.scss";
import { Event } from "../types";
import { useEffect } from "react";
import { ClientsSelect } from "../../shared/clients-select";
import { ServicesSelect } from "../../shared/services-select";

const { useForm } = Form;

type LocalEvent = Event & {
  date: dayjs.Dayjs;
  distance: number;
};

type Props = {
  isLoading?: boolean;
  open: boolean;
  closeModal: () => void;
  deleteEvent: (id: string) => void;
  onSubmit: (event: Event, isEditingMode: boolean) => void;
  event: Event | null;
  pendingDeleteEvent: boolean;
};

export const CreateEventModal = ({
  onSubmit,
  open,
  closeModal,
  isLoading,
  event,
  deleteEvent,
  pendingDeleteEvent,
}: Props) => {
  const isEditingMode = !!Object.keys(event || {}).length;

  const [form] = useForm<LocalEvent | null>();

  useEffect(() => {
    if (event) {
      form.setFieldsValue({
        ...event,
        date: dayjs(dayjs(event.start).format("YYYY-MM-DD HH:mm")),
        distance: dayjs(event.end).diff(dayjs(event.start), "minutes"),
      });
    } else {
      form.resetFields();
    }
  }, [form, event]);

  const onFormSave = async () => {
    try {
      const values = await form.validateFields();

      if (values) {
        const { date, distance, ...rest } = values;

        const formattedEvent: Event = {
          ...rest,
          start: date.toDate(),
          end: date.add(distance, "minutes").toDate(),
          desc: "",
        };

        onSubmit(
          {
            ...formattedEvent,
            id: event?.id || nanoid(),
          },
          isEditingMode,
        );
      }
    } catch (errInfo) {
      //   console.table(errInfo);
    }
  };

  const onSelect = (item: { label: string; value: string }, field: string) => {
    form.setFieldValue(field, item);
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
        title={isEditingMode ? "Редактирование записи" : "Создание записи"}
      >
        <div className={styles.body}>
          <Form
            form={form}
            initialValues={{
              distance: "60",
            }}
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
              <ClientsSelect onSelect={onSelect} />
            </Form.Item>
            <Form.Item
              name="service"
              label="Услуга"
              rules={[
                {
                  required: true,
                  message: "Обязательное поле",
                },
              ]}
            >
              <ServicesSelect onSelect={onSelect} />
            </Form.Item>

            <Form.Item
              className={styles.datepicker}
              name="date"
              label="Дата"
              rules={[
                {
                  required: true,
                  message: "Обязательное поле",
                },
              ]}
            >
              <DatePicker
                getPopupContainer={(trigger) => trigger.parentElement!}
                format="YYYY-MM-DD HH:mm"
                // disabledDate={disabledDate}
                // disabledTime={disabledDateTime}
                showTime={{
                  format: "HH:mm",
                }}
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

            <div className={styles.buttons}>
              {isEditingMode && (
                <Button
                  onClick={() => {
                    if (event) {
                      deleteEvent(event.id);
                    }
                  }}
                  disabled={pendingDeleteEvent}
                  danger
                >
                  Удалить запись
                </Button>
              )}

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
