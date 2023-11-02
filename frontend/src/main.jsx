import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App.jsx";
import "./globals.css";
import AuthRoute from "./components/AuthRoute";
import AdminRoute from "./components/AdminRoute";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen";
import VerifyScreen from "./screens/VerifyScreen";
import LandingScreen from "./screens/LandingScreen";
import HomeScreen from "./screens/HomeScreen";
import BookmarksScreen from "./screens/BookmarksScreen";
import LikesScreen from "./screens/LikesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminDashboardScreen from "./screens/admin/AdminDashboardScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" index element={<LandingScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/verify/:id" element={<VerifyScreen />} />
      </Route>

      <Route path="" element={<AuthRoute />}>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/bookmarks" element={<BookmarksScreen />} />
        <Route path="/likes" element={<LikesScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
