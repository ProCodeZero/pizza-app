import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../../components/CartItem/CartItem";
import Heading from "../../components/Heading/Heading";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import { RootState } from "../../store/store";

export function Cart() {
	const [cartProducts, setCardProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);

	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map((i) => getItem(i.id)));
		setCardProducts(res);
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);

	return (
		<>
			<Heading>Корзина</Heading>
			{items.map((i) => {
				const product = cartProducts.find((p) => p.id === i.id);
				if (!product) {
					return;
				}
				return <CartItem key={product.id} count={i.count} {...product} />;
			})}
		</>
	);
}
