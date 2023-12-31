import "./index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { AppRouter } from "."

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <AppRouter />
)

export * from './components'
export * from './pages'
export * from './assets'
export * from './routes'
export * from './utils'