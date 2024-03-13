import {Suspense, lazy, useState, useEffect} from 'react';
import SuspenseLoader from './components/common/SuspenseLoader';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { routes } from './routes/routes';
import ErrorComponent from './components/common/ErrorComponent';
import './App.css'
import {Box, styled} from "@mui/material";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route>
        <Route path={routes.main.path} element={<Navigate to={`${routes.main.path}/${routes.home.path}`} />} />
        <Route path={routes.main.path} element={<routes.main.element />} >
          <Route path={routes.home.path} element={<routes.home.element />} errorElement={<ErrorComponent />} />
          <Route path={routes.addoffer.path} element={<routes.addoffer.element />} errorElement={<ErrorComponent />} />
          <Route path={routes.allposts.path} element={<routes.allposts.element />} errorElement={<ErrorComponent />} />
          <Route path={routes.dashboard.path} element={<routes.dashboard.element />} errorElement={<ErrorComponent />} />
        </Route>

        <Route path={routes.invalid.path} element={<Navigate to={`${routes.main.path}/${routes.home.path}`} />} />
      </Route>
    </Route>
  )
)

const App = () => {
  const [isDarkened, setIsDarkened] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDarkened(!isDarkened);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Suspense fallback={<SuspenseLoader />} >
      {isDarkened && <Overlay onClick={() => setIsDarkened(!isDarkened)}/>}
      <RouterProvider router={router} />
    </Suspense>
  )
}

const Overlay = styled(Box)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000000001;
`

export default App;