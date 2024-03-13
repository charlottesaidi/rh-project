import {Suspense, lazy, useState, useEffect} from 'react';
import SuspenseLoader from './components/common/SuspenseLoader';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { routes } from './routes/routes';
import ErrorComponent from './components/common/ErrorComponent';
import {Box, styled} from "@mui/material";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route>
        <Route path={routes.main.path} element={<Navigate to={`${routes.main.path}/${routes.home.path}`} />} />
        <Route path={routes.main.path} element={<routes.main.element />} >
          <Route path={routes.home.path} element={<routes.home.element />} errorElement={<ErrorComponent />} />
          <Route path={routes.addemployee.path} element={<routes.addemployee.element />} errorElement={<ErrorComponent />} />
          <Route path={routes.allemployees.path} element={<routes.allemployees.element />} errorElement={<ErrorComponent />} />
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
    z-index: 9999;
`

export default App;