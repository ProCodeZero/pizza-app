import { useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import ProductCard from "../../components/ProductCard/ProductCard";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import styles from "./Menu.module.css";
import axios from "axios";

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Запрос на axios
  const getMenu = async () => {
    try {
      setIsLoading(true);
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
      setIsLoading(false);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
      setProducts(data);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      return;
    }
  };

  // Старый Запрос на fetch
  // const getMenu = async () => {
  //   try {
  //     const response = await fetch(`${PREFIX}/products`);
  //     if (!response.ok) {
  //       return;
  //     }
  //     const data = (await response.json()) as Product[];
  //     setProducts(data);
  //   } catch (e) {
  //     console.error(e);
  //     return;
  //   }
  // };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div className={styles.head}>
        <Heading>Меню</Heading>
        <Search placeholder="Введите блюдо или состав" />
      </div>
      <div>
        {!isLoading &&
          products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.name}
              description={p.ingredients.join(", ")}
              rating={p.rating}
              price={p.price}
              image={p.image}
            />
          ))}
        {isLoading && <>Заружаем продукты...</>}
      </div>
    </>
  );
}
