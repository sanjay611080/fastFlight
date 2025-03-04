import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/home/Home"
import Navbar from "./components/navbar/Navbar"
import About from "./components/about/About"

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element:<><Navbar/><Home/></>},
    { path: "/about", element:<><Navbar/><About/></>}

  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
