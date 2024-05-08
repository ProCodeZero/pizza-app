import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";
import { useEffect } from "react";
import cn from "classnames";

export function Layout() {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.user}>
          <img className={styles.avatar} src="/avatar.png" alt="Аватар" />
          <div className={styles.name}>Ларри Лоренс</div>
          <div className={styles.email}>larry.lorens.2024@inbox.ru</div>
        </div>
        <div className={styles.menu}>
          <Link
            className={cn(styles.link, {
              [styles.active]: location.pathname === "/",
            })}
            to="/"
          >
            <img src="/menu-icon.svg" alt="Иконка меню" />
            Меню
          </Link>
          <Link className={styles.link} to="/cart">
            <img src="/cart-icon.svg" alt="Иконка корзины" />
            Корзина
          </Link>
        </div>
        <Button className={styles.exit}>
          <img
            className={styles["exit-img"]}
            src="/exit-icon.png"
            alt="Иконка выхода"
          />
          Выход
        </Button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
