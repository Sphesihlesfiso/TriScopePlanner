import { ThemeProvider } from './components/theme-provider'
import { Home } from './pages/Home'
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {<Home/>}
      {<h1>Hellow world</h1>}
    </ThemeProvider>
  )
}

export default App