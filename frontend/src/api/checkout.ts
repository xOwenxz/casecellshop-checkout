export async function checkout(
  productId: string,
  quantity: number
) {
  const response = await fetch(
    "http://localhost:3001/checkout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Erro no checkout"
    );
  }

  return data;
}