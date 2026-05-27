import { describe, it, expect } from "vitest";
import { processCheckout } from "../services/checkoutService";
import { products } from "../data/products";
import { orders } from "../data/orders";

describe("Checkout", () => {
  it("enviar pedido para fila", () => {
    products[0].stock = 10;
    orders.length = 0;

    const result = processCheckout(
      "case-iphone-15",
      2
    );

    expect(result.status).toBe(202);

    if (result.status === 202) {
      expect(
        result.body.success
      ).toBe(true);

      expect(
        result.body.order.status
      ).toBe("PENDING");

      expect(
        orders.length
      ).toBe(1);
    }
  });

  it("retornar erro de estoque", () => {
    products[1].stock = 1;

    const result = processCheckout(
      "case-s23",
      5
    );

    
      expect(result.status)
        .toBe(409);
  
  });

  it("validar quantidade inválida", () => {
    const result = processCheckout(
      "case-s23",
      0
    );

  
      expect(result.status)
        .toBe(400);
  });
});