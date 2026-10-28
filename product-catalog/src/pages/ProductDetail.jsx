import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(
        `https://dummyjson.com/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Ошибка загрузки");
      }

      return response.json();
    },
  });

  if (isLoading) {
    return <h2 className="message">Загрузка...</h2>;
  }

  if (isError) {
    return <h2 className="message">Ошибка загрузки товара!</h2>;
  }

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/")}>
        Назад к каталогу
      </button>

      <div className="detail">
        <img src={data.thumbnail} alt={data.title} />

        <div className="detail-info">
          <h1>{data.title}</h1>

          <p>{data.description}</p>

          <h2>Цена: ${data.price}</h2>

          <p>Категория: {data.category}</p>

          <p>Рейтинг: {data.rating}</p>

          <p>Количество на складе: {data.stock}</p>
        </div>
      </div>
    </div>
  );
}