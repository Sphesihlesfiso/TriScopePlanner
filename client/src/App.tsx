import { ThemeProvider } from "./components/theme-provider";
import { Home } from "./pages/Home";
import { LoginSignIn } from "./pages/LoginSignIn";
import { Route, Routes } from "react-router-dom";
import { InputOTPForm } from "./pages/VerifyEmail";
import { ResertPasswordCard } from "./pages/PassowordResert";
export const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes>
        <Route
          path="/login"
          element={
            <div className="flex items-center justify-center h-screen ">
              {<LoginSignIn />}
            </div>
          }
        />
        <Route path="/" element={<Home />} />
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
      </Routes>
    </ThemeProvider>
  );
};
