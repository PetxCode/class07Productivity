import { createBrowserRouter } from "react-router-dom"
import HomeScreen from "../pages/HomeScreen"
import SignIn from "../pages/signIn"
import Register from "../pages/Register"
import PrivateRoute from "./privateRoute"


export const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute>
            <HomeScreen />
        </PrivateRoute>
    },
    {
        path: "/sign-in",
        element: <SignIn />
    },
    {
        path: "/register",
        element: <Register />
    },
]) 