import { List, Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { useUnit, useGate } from "effector-react";
import { combine } from "effector";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Service,
  $serviceList,
  priceGate,
  CRUDModal,
  updateServiceFx,
  addServiceFx,
  DeleteApproveModal,
  deleteServiceFx,
  getServiceListFx,
} from "../../features/price";
import styles from "./price.module.scss";

const $state = combine({
  serviceList: $serviceList,
  pendingLoadList: getServiceListFx.pending,
  pendingDeleteService: deleteServiceFx.pending,
  pendingAddService: addServiceFx.pending,
  pendingUpdateService: updateServiceFx.pending,
});

export const PricePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [servicedeletingModalId, setServicedeletingModalId] =
    useState<string>("");

  const {
    serviceList,
    pendingLoadList,
    pendingDeleteService,
    pendingAddService,
    pendingUpdateService,
  } = useUnit($state);

  useGate(priceGate);

  useEffect(() => {
    return deleteServiceFx.doneData.watch(() => {
      setServicedeletingModalId("");
    });
  }, []);

  useEffect(() => {
    return addServiceFx.doneData.watch(() => {
      setIsOpen(false);
    });
  }, []);

  useEffect(() => {
    return updateServiceFx.doneData.watch(() => {
      setEditingService(null);
    });
  }, []);

  if (pendingLoadList) {
    return (
      <Spin className={styles.spin}>
        <h2>Загрузка списка услуг...</h2>
      </Spin>
    );
  }

  return (
    <div>
      <DeleteApproveModal
        isLoading={pendingDeleteService}
        open={!!servicedeletingModalId}
        onSubmit={() => {
          deleteServiceFx(servicedeletingModalId);
        }}
        closeModal={() => {
          setServicedeletingModalId("");
        }}
      />

      <CRUDModal
        isLoading={pendingUpdateService}
        open={!!editingService}
        onSubmit={(service) => {
          updateServiceFx(service);
        }}
        closeModal={() => {
          setEditingService(null);
        }}
        okButton="Обновить"
        service={editingService}
      />
      <CRUDModal
        isLoading={pendingAddService}
        open={isOpen}
        onSubmit={(service) => {
          addServiceFx(service);
        }}
        closeModal={() => {
          setIsOpen(false);
        }}
        okButton="Сохранить"
      />

      <div className={styles.header}>
        <Button onClick={() => setIsOpen(true)}>Добавить услугу</Button>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={serviceList}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <a key="list-loadmore-edit">
                <EditOutlined onClick={() => setEditingService(item)} />
              </a>,
              <a key="list-loadmore-more">
                <DeleteOutlined
                  onClick={() => setServicedeletingModalId(item.id)}
                />
              </a>,
            ]}
          >
            <List.Item.Meta
              title={<a href="https://ant.design">{item.title}</a>}
              description={
                <div>
                  <p>Общая цена - {item.price} р</p>
                  <p>Чистая прибыль - {item.profit} р</p>

                  <div>
                    <p>{item.description}</p>
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};
