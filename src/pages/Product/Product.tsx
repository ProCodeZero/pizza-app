import { Await, useLoaderData } from "react-router-dom";
import { Product as Prod } from "../../interfaces/product.interface";
import { Suspense } from "react";

export function Product() {
  const data = useLoaderData() as { data: Prod };
  return (
    <>
      <Suspense fallback="Загружаю...">
        <Await resolve={data.data}>
          {({ data }: { data: Prod }) => <>Product - {data.name}</>}
        </Await>
      </Suspense>
    </>
  );
}
