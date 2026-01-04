import { ThemeProvider } from "./components/theme-provider";
import { Home } from "./pages/Home";
import { LoginSignIn } from "./pages/LoginSignIn";
import { useEffect, useState } from "react";
export const App = () => {
  const [user, setUser] = useState(null);
  
  const loginUser = async () => {
    const responce = await fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "test", password: "1234" }),
    });
    return responce.json();
  };
  useEffect(() => {
    const loadUser = async () => {
      const user = await loginUser();
      setUser(user);
    };
    loadUser();
  },[]);
  console.log(`This is the user ${user}`);
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {!user&&(
        <div className="flex items-center justify-center h-screen ">
          <LoginSignIn />
        </div>
      )}
      {user && <Home />}
    </ThemeProvider>
  );
};
