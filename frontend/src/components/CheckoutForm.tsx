import { useState } from "react";
import { checkout } from "../api/checkout";

import iphoneImg from "../assets/iphone15.png";
import s23Img from "../assets/s23.png";

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

  const [steps, setSteps] = 
    useState<string[]>([]);

  const [isError, setIsError] =
    useState(false);

  async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();

  if (!selectedProduct) {
    setIsError(true);
    setSteps([
      "Selecione uma capinha válida."
    ]);
    return;
  }

  setLoading(true);
  setSteps([]);
  setIsError(false);

  const delay = (ms: number) =>
    new Promise((resolve) =>
      setTimeout(resolve, ms)
    );

  try {
    setSteps([
      "🔍 Validando pedido..."
    ]);
    await delay(1200);

    setSteps((prev) => [
      ...prev,
      "📦 Verificando estoque..."
    ]);
    await delay(1400);

    const result = await checkout(
      selectedProduct.id,
      quantity
    );

    setSteps((prev) => [
      ...prev,
      "✅ Estoque reservado"
    ]);
    await delay(1200);

    setSteps((prev) => [
      ...prev,
      "🚚 Enviando pedido para fila local..."
    ]);
    await delay(1400);

    setSteps((prev) => [
      ...prev,
      "🏭 ERP local processando pedido..."
    ]);
    await delay(1800);

    setSteps((prev) => [
      ...prev,
      "🎉 Pedido concluído com sucesso!"
    ]);

    setSteps((prev) => [
      ...prev,
      `📊 Estoque restante: ${result.remainingStock}`
    ]);
    await delay(1200);
  } catch (error: any) {
    setIsError(true);

    setSteps((prev) => [
      ...prev,
      "❌ Falha no processamento",
      error.message
    ]);
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
          ? "Atualizando pedido..."
          : "Comprar"}
        </button>

        {steps.length > 0 && (
        <div
          className={
            isError
              ? "message error"
              : "message success"
          }
        >
          {steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>
      )}
      </form>
    </div>
  );
}