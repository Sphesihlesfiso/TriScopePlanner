import { ThemeProvider } from "./components/theme-provider";
import { Home } from "./pages/Home";
import { LoginSignIn } from "./pages/LoginSignIn";
import { Route, Routes } from "react-router-dom";
import { InputOTPForm } from "./pages/VerifyEmail";
import { ResertPasswordCard } from "./pages/PassowordResert";
import { CreatePassword } from "./pages/NewPassword";
//ts is case sensitive
export const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center h-screen ">
              {<LoginSignIn />}
            </div>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route
          path="/Email-verification"
          element={
            <div className="flex items-center justify-center h-screen ">
              <InputOTPForm />
            </div>
          }
        />
        <Route
          path="/forgot-passoword"
          element={
            <div className="flex items-center justify-center h-screen ">
              <ResertPasswordCard />
            </div>
          }
        />
        <Route
          path="auth/reset-password/:resertToken"
          element={
            <div className="flex items-center justify-center h-screen ">
              <CreatePassword />
            </div>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};
