import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";
import cn from "classnames";

export function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.user}>
          <img className={styles.avatar} src="/avatar.png" alt="Аватар" />
          <div className={styles.name}>Ларри Лоренс</div>
          <div className={styles.email}>larry.lorens.2024@inbox.ru</div>
        </div>
        <div className={styles.menu}>
          <NavLink
            className={({ isActive }) =>
              cn(styles.link, {
                [styles.active]: isActive,
              })
            }
            to="/"
          >
            <img src="/menu-icon.svg" alt="Иконка меню" />
            Меню
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              cn(styles.link, {
                [styles.active]: isActive,
              })
            }
            to="/cart"
          >
            <img src="/cart-icon.svg" alt="Иконка корзины" />
            Корзина
          </NavLink>
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
