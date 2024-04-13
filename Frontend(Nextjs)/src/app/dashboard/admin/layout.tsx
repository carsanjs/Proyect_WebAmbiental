"use client";
import { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "../../../routes/index";
import Loader from "../../../../components/ui/Loader";
import Dashboard from "./dashboard/VamCard";

const DefaultLayout = lazy(() => import("./page"));

const DashboardRoutes = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Dashboard />} path="/dashboard/admin" />
            {routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default DashboardRoutes;
