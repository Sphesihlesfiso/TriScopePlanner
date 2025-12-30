import { ThemeProvider } from "./components/theme-provider";
import { Home } from "./pages/Home";
import { LoginSignIn } from './pages/LoginSignIn';
export const App=()=> {
  const isIn=true;
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {!isIn && (
        <div className="flex items-center justify-center h-screen ">
          <LoginSignIn />
        </div>
      )}
      {isIn && 
        <Home />
        }
    </ThemeProvider>
  );
}


