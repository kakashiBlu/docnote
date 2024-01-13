import ForgotPassword from "pages/auth/ForgotPassword"
import SignIn from "pages/auth/SignIn"
import SignUp from "pages/auth/SignUp"
import { Route, Routes } from "react-router-dom"
import UnprotectedRoute from "./UnprotectedRoute"
import { Path } from "utils/Path"
import Home from "pages/home/Home"
import NotFound from "pages/error/NotFound"
import Dashboard from "pages/dashboard/Dashboard"
import ProtectedRoute from "./ProtectedRoute"
import Setup from "pages/setup/Setup"
import DefaultRoute from "./DefaultRoute"
import Annotate from "pages/annotate/Annotate"
import Settings from "pages/settings/Settings"
import { DEMO_PATHS } from "utils/Demo"
import Docs from "pages/docs/Docs"
import Support from "pages/support/Support"
import Faq from "pages/faq/Faq"
import ResetPassword from "pages/auth/ResetPassword"

function PageRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path={Path.Home} element={
        <DefaultRoute title="Docnote Annotation Tool">
          <Home />
        </DefaultRoute>
      } />

      <Route path={Path.SignUp} element={
        <UnprotectedRoute title="Sign Up - Docnote">
          <SignUp />
        </UnprotectedRoute>
      } />

      <Route path={Path.SignIn} element={
        <UnprotectedRoute title="Sign In - Docnote">
          <SignIn />
        </UnprotectedRoute>
      } />

      <Route path={Path.ForgotPassword} element={
        <UnprotectedRoute title="Forgot Password - Docnote">
          <ForgotPassword />
        </UnprotectedRoute>
      } />

      <Route path={Path.ResetPassword} element={
        <ProtectedRoute title="Reset Password - Docnote">
          <ResetPassword />
        </ProtectedRoute>
      } />

      <Route path={Path.Dashboard} element={
        <ProtectedRoute title="Dashboard - Docnote">
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path={Path.Setup} element={
        <ProtectedRoute title="Setup Workspace - Docnote">
          <Setup />
        </ProtectedRoute>
      } />

      <Route path={Path.Annotate} element={
        <ProtectedRoute
          title="Annotate Workspace - Docnote"
          exception={() => DEMO_PATHS.includes(window.location.pathname)}
        >
          <Annotate />
        </ProtectedRoute>
      } />

      <Route path={Path.Support} element={
        <DefaultRoute title="Support - Docnote">
          <Support />
        </DefaultRoute>
      } />

      <Route path={Path.Faq} element={
        <DefaultRoute title="FAQ - Docnote">
          <Faq />
        </DefaultRoute>
      } />

      <Route path={Path.Docs} element={
        <DefaultRoute title="Docs - Docnote">
          <Docs />
        </DefaultRoute>
      } />

      <Route path={Path.Settings} element={
        <ProtectedRoute title="Settings - Docnote">
          <Settings />
        </ProtectedRoute>
      } />

      <Route path={Path.NotFound} element={
        <DefaultRoute title="Page Not Found - Docnote">
          <NotFound />
        </DefaultRoute>
      } />
    </Routes>
  )
}

export default PageRoutes
