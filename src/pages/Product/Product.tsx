import { Suspense } from "react";
import { useDispatch } from "react-redux";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import { Product as Prod } from "../../interfaces/product.interface";
import { cartActions } from "../../store/cart.slice";
import styles from "./Product.module.css";

export function Product() {
	const { data } = useLoaderData() as { data: Prod };
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div className={styles["product-wrapper"]}>
			<Suspense fallback="Загружаю...">
				<Await resolve={data}>
					{({ data }: { data: Prod }) => (
						<>
							<div className={styles.top}>
								<div className={styles["top-left"]}>
									<button
										className={styles["btn-back"]}
										onClick={() => {
											navigate("/");
										}}
									>
										<img src="/back-btn.svg" alt="Кнопка назад" />
									</button>
									<Heading>{data.name}</Heading>
								</div>
								<div className={styles["top-right"]}>
									<Button
										className={styles["btn-buy"]}
										onClick={() => dispatch(cartActions.add(data.id))}
									>
										<img src="/cart-button-icon.svg" alt="" />
										<span>В корзину</span>
									</Button>
								</div>
							</div>
							<div className={styles["product-summary"]}>
								<div className={styles["product-img"]}>
									<img src={data.image} alt="Большое фото продукта" />
								</div>
								<div className={styles["product-aside"]}>
									<div className={styles["price-shelf"]}>
										<p className={styles["price-text"]}>Цена</p>
										<p className={styles["price-value"]}>
											{data.price}&nbsp;<span>₽</span>
										</p>
									</div>
									<div className={styles["rating-shelf"]}>
										<p className={styles["rating-text"]}>Рейтинг</p>
										<p className={styles["rating-value"]}>
											{data.rating}&nbsp;
											<img src="/star-icon.svg" alt="Иконка звезды" />
										</p>
									</div>
									<p className={styles["ingredients-title"]}>Состав:</p>
									<ul className={styles["ingredients-list"]}>
										{data.ingredients.map((ingredient, id) => (
											<li key={id} className={styles.ingredient}>
												{ingredient}
											</li>
										))}
									</ul>
								</div>
							</div>
						</>
					)}
				</Await>
			</Suspense>
		</div>
	);
}
