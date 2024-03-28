import { Modal, Button } from "antd";
import styles from "./DeleteApproveModal.module.scss";

type Props = {
  isLoading?: boolean;
  open: boolean;
  closeModal: () => void;
  onSubmit: () => void;
};

export const DeleteApproveModal = ({
  open,
  closeModal,
  onSubmit,
  isLoading,
}: Props) => {
  return (
    <>
      <Modal
        destroyOnClose
        className={styles.modal}
        width="98%"
        open={open}
        footer={null}
        onCancel={closeModal}
        title="Удаление услуги"
      >
        <div className={styles.body}>
          <div className={styles.buttons}>
            <Button onClick={closeModal} disabled={isLoading}>
              Отменить
            </Button>

            <Button
              type="primary"
              danger
              onClick={onSubmit}
              loading={isLoading}
            >
              Удалить
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
