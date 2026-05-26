import { orders } from "../data/orders";

export function processQueue() {
  setInterval(() => {
    const pendingOrder =
      orders.find(
        (o) =>
          o.status ===
          "PENDING"
      );

    if (pendingOrder) {
      console.log(
        `[ERP] Processando pedido ${pendingOrder.id}`
      );

      pendingOrder.status =
        "COMPLETED";

      console.log(
        `[ERP] Pedido ${pendingOrder.id} faturado`
      );
    }
  }, 300);
}