/** @format */
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";
import Dashboard from "../src/Pages/Dashboard";
import Product from "../src/Pages/Product";
import Categories from "../src/Pages/Categories";
import Brand from "../src/Pages/Brand";
import Sidebar from "../src/components/Sidebar";

export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const ProtectedLayout = () => (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 pb-16 md:pb-0 md:ml-0 bg-white">
        <Outlet />
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            isAuthenticated ? <ProtectedLayout /> : <Navigate to="/login" />
          }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/brand" element={<Brand />} />
          <Route index element={<Navigate to="/dashboard" />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}
