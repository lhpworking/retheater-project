import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
  HOME_PATH,
  MOVIE_CATALOG_PATH,
  MOVIE_DETAIL_PATH,
  MOVIE_PATH
} from "./constants/path";
// import MainLayout from "./layouts/MainLayout";
// import Home from "./pages";
// import Catalog from "./pages/movie";
// import Detail from "./pages/movie/[slug]";

const Home = lazy(() => import("./pages"))
const Catalog = lazy(() => import("./pages/movie"))
const Detail = lazy(() => import("./pages/movie/[slug]"))
const MainLayout = lazy(() => import("./layouts/MainLayout"))

function App() {
  return (
    <Suspense fallback={ <div>loading...</div> }>
      <Routes>
        <Route element={ <MainLayout /> }>
          <Route index path={ HOME_PATH } element={ <Home /> } />
          <Route path={ MOVIE_PATH }>
            <Route index path={ MOVIE_CATALOG_PATH } element={ <Catalog /> } />
            <Route path={ MOVIE_DETAIL_PATH } element={ <Detail /> } />
          </Route>
        </Route>
      </Routes>
    </Suspense>

  );
}

export default App;
