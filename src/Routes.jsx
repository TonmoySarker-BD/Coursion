import { createBrowserRouter } from "react-router";
import App from "./App";
import HomeLayout from "./layout/HomeLayout";
import Home from "./components/Home/Home";
import Course from "./components/Course/Course";
import Blog from "./components/Blog/Blog";
import SignIn from "./components/UserAuth/SignIn";
import Register from "./components/UserAuth/Register";
import ForgotPassword from "./components/UserAuth/ForgotPassword";

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
            },
            {
                path: "/blog",
                element: <Blog></Blog>
            },
            {
                path: "/signin",
                element: <SignIn></SignIn>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword></ForgotPassword>
            }
        ]
    },
]);