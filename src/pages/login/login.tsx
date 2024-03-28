import { Input, Button } from "antd";

import styles from "./login.module.scss";

export const LoginPage = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Вход</h1>

      <div className={styles.form}>
        <Input placeholder="Логин" />
        <Input placeholder="Пароль" />

        <Button type="primary" ghost>
          Войти
        </Button>
      </div>
    </div>
  );
};
