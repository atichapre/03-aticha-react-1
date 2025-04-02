import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Owner from "./pages/Owner";
import { UserHome } from "./pages/UserHome";
import { UserAdmin } from "./pages/UserAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl">404 - Page Not Found </h1>
      </div>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "user", element: <UserHome /> },
      { path: "owner", element: <Owner /> },
      {
        path: "admin",
        element: <UserAdmin />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
