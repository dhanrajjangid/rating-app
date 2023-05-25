import {
  ScrollRestoration,
  Outlet,
  createBrowserRouter,
} from "react-router-dom";
import Navbar from "../view/components/Navbar";
import Home from "../view/pages/Home";
import Area from "../view/pages/Area";
import Dorm from "../view/pages/Dorm";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/area",
        element: <Area />,
      },
      {
        path: "/dorm",
        element: <Dorm />,
      },
    ],
  },
]);
