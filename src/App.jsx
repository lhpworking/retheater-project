import { Route, Routes } from "react-router-dom"
import { HOME_PATH } from "./constants/path"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages"

function App() {
  return (
    <Routes>
      <Route element={ <MainLayout /> }>
        <Route index path={ HOME_PATH } element={ <Home /> } />
      </Route>
    </Routes>
  )
}

export default App
