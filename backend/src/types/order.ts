export interface Order {
  id: string;
  productId: string;
  quantity: number;
  status: "PENDING" | "COMPLETED";
}