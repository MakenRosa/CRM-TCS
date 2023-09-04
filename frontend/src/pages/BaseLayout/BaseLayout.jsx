import { Navbar, WithAuth } from "components"
import { Outlet } from "react-router-dom"

const BaseLayoutComponent = () => (
  <>
    <Navbar />
    <Outlet />
  </>
)

export const BaseLayout = WithAuth(BaseLayoutComponent)