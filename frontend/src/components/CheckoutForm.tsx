import { useState } from "react";
import { checkout } from "../api/checkout";

import iphoneImg from "../assets/iphone15.jpg";
import s23Img from "../assets/s23.jpg";

const products = [
  {
    id: "case-iphone-15",
    name: "Capinha iPhone 15",
    image: iphoneImg,
  },
  {
    id: "case-s23",
    name: "Capinha Galaxy S23",
    image: s23Img,
  },
];

export function CheckoutForm() {
  const [selectedProduct, setSelectedProduct] =
    useState(products[0]);

  const [quantity, setQuantity] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [isError, setIsError] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const result = await checkout(
        selectedProduct.id,
        quantity
      );

      setIsError(false);
      setMessage(`${result.message}. Pedido em processamento pelo ERP local. Estoque restante: ${result.remainingStock}`);
    } catch (error: any) {
      setIsError(true);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <img
        src={selectedProduct.image}
        alt={selectedProduct.name}
        className="product-image"
      />

      <h2>{selectedProduct.name}</h2>

      <form onSubmit={handleSubmit}>
        <label>Produto</label>

        <select
          value={selectedProduct.id}
          onChange={(e) => {
            const product =
              products.find(
                (p) =>
                  p.id === e.target.value
              );

            if (product)
              setSelectedProduct(
                product
              );
          }}
        >
          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>
          ))}
        </select>

        <label>Quantidade</label>

        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Number(e.target.value)
            )
          }
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Processando..."
            : "Comprar"}
        </button>

        {message && (
          <p
            className={
              isError
                ? "message error"
                : "message success"
            }
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}