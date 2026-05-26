import { Router } from "express";
import { processCheckout } from "../services/checkoutService";

const router = Router();

router.post("/", (req, res) => {
  const { productId, quantity } = req.body;

  const result = processCheckout(
    productId,
    quantity
  );

  return res
    .status(result.status)
    .json(result.body);
});

export default router;