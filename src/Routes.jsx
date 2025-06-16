import { createBrowserRouter } from "react-router";
import App from "./App";
import HomeLayout from "./layout/HomeLayout";
import Home from "./components/Home/Home";
import SignIn from "./components/UserAuth/SignIn";
import Register from "./components/UserAuth/Register";
import ForgotPassword from "./components/UserAuth/ForgotPassword";
import Courses from "./components/Course/Courses";
import CourseDetails from "./components/Course/CourseDetails";
import AddCourse from "./components/AddCourses/AddCourse";
import ManageCourse from "./components/ManageCourse/ManageCourse";
import MyCourse from "./components/MyCourse/MyCourse";
import EditCourse from "./components/AddCourses/EditCourse";
import NotFoundPage from "./components/shared/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/Profile/UpdateProfile";

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
                path: "/add-course",
                element: <PrivateRoute>
                    <AddCourse></AddCourse>
                </PrivateRoute>
            },
            {
                path: "/my-courses",
                element: <PrivateRoute>
                    <MyCourse></MyCourse>
                </PrivateRoute>
            },
            {
                path: "/manage-courses",
                element: <PrivateRoute>
                    <ManageCourse></ManageCourse>
                </PrivateRoute>
            },
            {
                path: "/edit-course/:id",
                element: <PrivateRoute>
                    <EditCourse></EditCourse>
                </PrivateRoute>
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
            },
            {
                path: "/Profile",
                element: <PrivateRoute>
                    <Profile></Profile>
                </PrivateRoute>,
            },
            {
                path: "/update-profile",
                element: <PrivateRoute>
                    <UpdateProfile></UpdateProfile>
                </PrivateRoute>,
            },
        ]
    },
    {
        path: "*",
        element: <NotFoundPage></NotFoundPage>
    }
]);