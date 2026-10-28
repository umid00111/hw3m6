import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Products() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://dummyjson.com/products");

      if (!response.ok) {
        throw new Error("Ошибка загрузки");
      }

      const result = await response.json();
      return result.products;
    },
  });

  if (isLoading) {
    return <h2 className="message">Загрузка...</h2>;
  }

  if (isError) {
    return <h2 className="message">Ошибка загрузки товаров!</h2>;
  }

  return (
    <div className="container">
      <h1>Каталог товаров</h1>

      <div className="products">
        {data.map((product) => (
          <Link
            to={`/products/${product.id}`}
            className="card"
            key={product.id}
          >
            <img src={product.thumbnail} alt={product.title} />

            <h3>{product.title}</h3>

            <p>Цена: ${product.price}</p>

            <span className="button">Подробнее</span>
          </Link>
        ))}
      </div>
    </div>
  );
}