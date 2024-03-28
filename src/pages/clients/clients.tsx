import { List, Input, Select, Button, Spin } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useUnit, useGate } from "effector-react";
import { combine } from "effector";
import {
  Client,
  $searchClientList,
  clientGate,
  CRUDModal,
  updateClientFx,
  addClientFx,
  DeleteApproveModal,
  deleteClientFx,
  getClientListFx,
  searchClient,
  $search,
} from "../../features/clients";
import styles from "./clients.module.scss";

const $state = combine({
  clientList: $searchClientList,
  pendingLoadList: getClientListFx.pending,
  pendingDeleteClient: deleteClientFx.pending,
  pendingAddClient: addClientFx.pending,
  pendingUpdateClient: updateClientFx.pending,
  search: $search,
});

export const ClientsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientdeletingModalId, setClientdeletingModalId] =
    useState<string>("");

  const {
    clientList,
    pendingLoadList,
    pendingDeleteClient,
    pendingAddClient,
    pendingUpdateClient,
    search,
  } = useUnit($state);

  useGate(clientGate);

  useEffect(() => {
    return deleteClientFx.doneData.watch(() => {
      setClientdeletingModalId("");
    });
  }, []);

  useEffect(() => {
    return addClientFx.doneData.watch(() => {
      setIsOpen(false);
    });
  }, []);

  useEffect(() => {
    return updateClientFx.doneData.watch(() => {
      setEditingClient(null);
    });
  }, []);

  if (pendingLoadList) {
    return (
      <Spin className={styles.spin}>
        <h2>Загрузка списка клиентов...</h2>
      </Spin>
    );
  }

  return (
    <div className={styles.root}>
      <DeleteApproveModal
        isLoading={pendingDeleteClient}
        open={!!clientdeletingModalId}
        onSubmit={() => {
          deleteClientFx(clientdeletingModalId);
        }}
        closeModal={() => {
          setClientdeletingModalId("");
        }}
      />

      <CRUDModal
        isLoading={pendingUpdateClient}
        open={!!editingClient}
        onSubmit={(client) => {
          updateClientFx(client);
        }}
        closeModal={() => {
          setEditingClient(null);
        }}
        okButton="Обновить"
        client={editingClient}
      />
      <CRUDModal
        isLoading={pendingAddClient}
        open={isOpen}
        onSubmit={(client) => {
          addClientFx(client);
        }}
        closeModal={() => {
          setIsOpen(false);
        }}
        okButton="Сохранить"
      />

      <div className={styles.filter}>
        <Button onClick={() => setIsOpen(true)}>Добавить клиента</Button>

        <Input.Search
          placeholder="Найти клиента"
          value={search}
          onChange={(e) => searchClient(e.target.value)}
          allowClear
        />

        <Select
          defaultValue="3"
          style={{
            width: "100%",
          }}
          options={[
            {
              value: "1",
              label: "По возрастанию",
            },
            {
              value: "2",
              label: "По убыванию",
            },
            {
              value: "3",
              label: "По дате регистрации",
            },
          ]}
        />
      </div>

      <List
        itemLayout="horizontal"
        dataSource={clientList}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">
                <EditOutlined onClick={() => setEditingClient(item)} />
              </a>,
              <a key="list-loadmore-more">
                <DeleteOutlined
                  onClick={() => setClientdeletingModalId(item.id)}
                />
              </a>,
            ]}
          >
            <List.Item.Meta
              title={
                <div>
                  <p>{item.name}</p>
                  <p>{item.phone}</p>
                </div>
              }
              description={
                <>
                  <p>Посетил: {item.visited}</p>
                  <p>Отменил: {item.canceled}</p>
                  <p>Перенес: {item.moved}</p>
                  <p>
                    Зарегистрирован:{" "}
                    {moment(new Date(item.createdAt)).format("MMMM Do YYYY")}
                  </p>
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};
