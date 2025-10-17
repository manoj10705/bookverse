import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";

// Set up axios base URL for API calls
axios.defaults.baseURL = "http://localhost:5000";

createRoot(document.getElementById("root")!).render(<App />);
