import { ThemeProvider } from "./components/theme-provider";
import { Home } from "./pages/Home";
import { LoginSignIn } from './pages/LoginSignIn';
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {
        <div className="flex items-center justify-center h-screen ">
          <LoginSignIn />
        </div>
      }
    </ThemeProvider>
  );
}

export default App;
