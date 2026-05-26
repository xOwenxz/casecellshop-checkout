import "./App.css";
import { CheckoutForm } from "./components/CheckoutForm";

function App() {
  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
      }}
    >
      <CheckoutForm />
    </div>
  );
}

export default App;