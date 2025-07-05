import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./features/blog/pages/Landing.tsx";
import About from "./features/blog/pages/About.tsx";
import Contact from "./features/blog/pages/Contact.tsx";
import Home from "./features/blog/pages/Home.tsx";
import CreateBlog from "./features/blog/pages/CreateBlog.tsx";
import { Layout } from "./components/Layout";
import Profile from "./features/blog/pages/Profile.tsx";
import {ReadBlog} from "@/features/blog/pages/ReadBlog.tsx";
import axios from "axios";
import {useEffect} from "react";


// Routes with loaders
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <Layout/>,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/createblog",
        element: <CreateBlog />,
      },
      {
        path: "/readblog/:id",
        element: <ReadBlog />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ]
  },
])


export default function App() {
  useEffect(() => {
    const token = sessionStorage.getItem("User");
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return <RouterProvider router={router} />;
}