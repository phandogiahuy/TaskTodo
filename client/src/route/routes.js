import { createBrowserRouter } from "react-router-dom";
import CreatePage from "../pages/Create";
import ErrorPage from "../pages/Error";
import Home from "../pages/Home";

const route = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/create",
      element: <CreatePage/>,
    },
]
const routes = route.map((e) => ({ ...e, errorElement: <ErrorPage /> }));
export const router = createBrowserRouter(routes);