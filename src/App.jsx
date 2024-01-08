import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//Our context here
import { AuthContextProvider } from "./context/AuthContext.jsx";
//Suppoting Routes Variables
import {
  LOGIN,
  APPLICATIONS,
  DASHBOARD,
  FORGOTPASSWORD,
  CHANGEPASSWORD,
  INDEX,
  TASKMODULE,
  ASSESSMENTMODULE,
} from "./routes/routes.jsx";
//Define your routes for APP here
import Login from "./pages/login/Login.jsx";
import ChangePassword from "./pages/changePasswordPage/ChangePasswordPage";
import ForgotPassword from "./pages/forgotPage/ForgotPage";
import Applications from "./pages/applications/Applications.jsx";
import DashBoard from "./pages/dashBoard/DashBoard.jsx";
import TaskModule from "./pages/task/TaskModule.jsx";
import AssessmentModule from "./pages/assessment/Assessment.jsx";
import ErrorPage from "./pages/errorPage/ErrorPage.jsx";
//Private Routes will be wrapped in below component
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={INDEX} element={<Navigate to="/login" replace />} />

          <Route path={LOGIN} element={<Login />} />
          <Route path={FORGOTPASSWORD} element={<ForgotPassword />} />
          <Route path={CHANGEPASSWORD} element={<ChangePassword />} />

          <Route path={DASHBOARD} element={<PrivateRoute />}>
            <Route path={DASHBOARD} element={<DashBoard />} />
          </Route>
          {/* Private Route, can't access without token */}
          <Route path={APPLICATIONS} element={<PrivateRoute />}>
            <Route path={APPLICATIONS} element={<Applications />} />
          </Route>

        
          <Route path={TASKMODULE} element={<PrivateRoute />}>
            <Route path={TASKMODULE} element={<TaskModule />} />
          </Route>

          <Route path={ASSESSMENTMODULE} element={<PrivateRoute />}>
            <Route path={ASSESSMENTMODULE} element={<AssessmentModule />} />
          </Route>

         
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
