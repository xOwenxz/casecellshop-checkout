import express from "express";
import cors from "cors";
import checkoutRoutes from "./routes/checkout";
import { processQueue } from "./services/queueService";

export const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/checkout",
  checkoutRoutes
);

processQueue();

const PORT = 3001;

if (
  process.env.NODE_ENV !==
  "test"
) {
  app.listen(3001, () => {
    console.log(
      "Servidor rodando na porta 3001"
    );
  });
}