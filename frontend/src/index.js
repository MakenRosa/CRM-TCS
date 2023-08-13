import "./index.css"
import AppRouter from "./routes"
import React from "react"
import ReactDOM from "react-dom/client"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
