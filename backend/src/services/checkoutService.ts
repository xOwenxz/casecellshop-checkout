import { products } from "../data/products";
import { orders } from "../data/orders";

export function processCheckout(
  productId: string,
  quantity: number
) {
  const randomFailure =
  process.env.NODE_ENV !== "test" &&
  Math.random() < 0.2;

  if (randomFailure) {
    return {
      status: 503,
      body: {
        success: false,
        message:
          "ERP temporariamente indisponível",
      },
    };
  }

  const product = products.find(
    (p) => p.id === productId
  );

  if (!product) {
    return {
      status: 404,
      body: {
        success: false,
        message: "Produto não encontrado",
      },
    };
  }

  if (quantity <= 0) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Quantidade inválida",
      },
    };
  }

  if (product.stock < quantity) {
    return {
      status: 409,
      body: {
        success: false,
        message:
          "Estoque insuficiente",
      },
    };
  }

  product.stock -= quantity;

  const order = {
    id: Date.now().toString(),
    productId,
    quantity,
    status: "PENDING" as const,
  };

  orders.push(order);

  return {
    status: 202,
    body: {
      success: true,
      message:
        "Pedido recebido e enviado para processamento",
      order,
      remainingStock:
        product.stock,
    },
  };
}