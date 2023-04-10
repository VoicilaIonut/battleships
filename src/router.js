import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import OnProductRoot from "./pages/Products/OnProductRoot";
import AppLayout from "./layout/app-layout";
import { AuthLayout } from "./layout/auth-layout/auth-layout";
import ProtectedRoute from "./utils/protected-route";
import Settings from "./pages/Settings";
import { loader } from "./pages/Product/Product";
import { Routes } from "./utils/routes-definition";
import React from "react";

const {
  DashboardRoute,
  LoginRoute,
  RegisterRoute,
  SettingsRoute,
  ProductsRoute,
  ProductRoute,
} = Routes;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route element={<AuthLayout />}>
        <Route path={LoginRoute} element={<Login />} />
        <Route
          path={RegisterRoute}
          lazy={() => import("./pages/Register/register")}
        />
      </Route>
      <Route element={<AppLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path={DashboardRoute} element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path={ProductsRoute} element={<Products />}/>
          <Route
            errorElement={<p>Error element from product id</p>}
            path={ProductRoute}
            element={<Product />}
            loader={loader}/>
        </Route>
        <Route path={SettingsRoute} element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
