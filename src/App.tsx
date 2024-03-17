import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import InvoiceDetail from "./pages/InvoiceDetail"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/invoice/:id",
    element: <InvoiceDetail/>
  }
])

function App() {
  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
