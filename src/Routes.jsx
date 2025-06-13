import { createBrowserRouter } from "react-router";
import App from "./App";
import HomeLayout from "./layout/HomeLayout";
import Home from "./components/Home/Home";
import SignIn from "./components/UserAuth/SignIn";
import Register from "./components/UserAuth/Register";
import ForgotPassword from "./components/UserAuth/ForgotPassword";
import Courses from "./components/Course/Courses";
import CourseDetails from "./components/Course/CourseDetails";

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
                path: "/Courses",
                element: <Courses></Courses>
            },
            {
                path: "/Courses/:id",
                element: <CourseDetails></CourseDetails>
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