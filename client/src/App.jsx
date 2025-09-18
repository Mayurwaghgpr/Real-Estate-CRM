import { BrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Router from "./router/router";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
