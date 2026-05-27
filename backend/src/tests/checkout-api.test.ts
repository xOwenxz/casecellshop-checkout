import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../server";
import { products } from "../data/products";

describe("Checkout API", () => {
  it(
    "deve retornar 202 para compra válida",
    async () => {
      products[0].stock = 10;

      const response = await request(
        app
      )
        .post("/checkout")
        .send({
          productId:
            "case-iphone-15",
          quantity: 2,
        });

      expect(
        response.status
      ).toBe(202);

      expect(
        response.body.success
      ).toBe(true);
    }
  );

  it(
    "deve retornar 409 para estoque insuficiente",
    async () => {
      products[1].stock = 1;

      const response = await request(
        app
      )
        .post("/checkout")
        .send({
          productId: "case-s23",
          quantity: 5,
        });

      expect(
        response.status
      ).toBe(409);
    }
  );

  it(
    "deve retornar 400 para quantidade inválida",
    async () => {
      const response = await request(
        app
      )
        .post("/checkout")
        .send({
          productId: "case-s23",
          quantity: 0,
        });

      expect(
        response.status
      ).toBe(400);
    }
  );
});