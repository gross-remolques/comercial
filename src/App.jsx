import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import Layout from "./components/Layout";
import Clientes from "./pages/Clientes";
import Unidades from "./pages/Unidades";
import UnidadesUsadas from "./pages/UnidadesUsadas";
import Camiones from "./pages/Camiones";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/Auth/AuthContext";
export default function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/clientes", element: <Clientes /> },
        { path: "/unidades", element: <Unidades /> },
        { path: "/unidades-usadas", element: <UnidadesUsadas /> },
        { path: "/camiones", element: <Camiones /> }
      ],
    },
    { path: "*", element: <h1>Error</h1> },
  ]);
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
);
}
