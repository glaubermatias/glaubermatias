import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { installMediaFallback } from "./lib/mediaFallback";

installMediaFallback();

createRoot(document.getElementById("root")!).render(<App />);
