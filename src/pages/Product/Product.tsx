import { useLoaderData } from "react-router-dom";
import { Product as Prod } from "../../interfaces/product.interface";

export function Product() {
  const data = useLoaderData() as Prod;
  return <>Product - {data.name}</>;
}
