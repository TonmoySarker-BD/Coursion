import { createBrowserRouter } from "react-router";
import App from "./App";
import HomeLayout from "./layout/HomeLayout";
import Home from "./components/Home/Home";
import Course from "./components/Course/Course";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/Course",
                element: <Course></Course>
            }
        ]
    },
]);