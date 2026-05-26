import express from "express";
import cors from "cors";
import checkoutRoutes from "./routes/checkout";
import { processQueue } from "./services/queueService";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/checkout",
  checkoutRoutes
);

processQueue();

const PORT = 3001;

app.listen(PORT, () => {
  console.log(
    `Servidor rodando na porta ${PORT}`
  );
});