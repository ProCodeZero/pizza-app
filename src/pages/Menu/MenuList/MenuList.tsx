import ProductCard from "../../../components/ProductCard/ProductCard";
import { MenuListProps } from "./MenuList.props";

export function MenuList({ products }: MenuListProps) {
  return products.map((p) => (
    <ProductCard
      key={p.id}
      id={p.id}
      title={p.name}
      description={p.ingredients.join(", ")}
      rating={p.rating}
      price={p.price}
      image={p.image}
    />
  ));
}
