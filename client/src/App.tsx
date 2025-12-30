import { ThemeProvider } from "./components/theme-provider";
import { Home } from "./pages/Home";
import { LoginSignIn } from './pages/LoginSignIn';
export const App=()=> {
  
  const addToGoogleCalender = async () => {
    const response = await fetch(
      `http://localhost:3000/googlecalender/task/:1`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.json());

  };
  const isIn=addToGoogleCalender()
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


