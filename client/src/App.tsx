import { ThemeProvider } from "./components/theme-provider";
import { Home } from "./pages/Home";
import { LoginSignIn } from "./pages/LoginSignIn";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes>
    
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <div className="flex items-center justify-center h-screen ">
              <LoginSignIn />
            </div>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};
