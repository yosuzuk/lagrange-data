import { Suspense, lazy } from 'react';
import {
    HashRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { LoadingIndicator } from './components/loading/LoadingIndicator';
import { ShipDetailProvider } from './components/shipDetail/ShipDetailProvider';

const MyListPage = lazy(() => import('./components/pages/myList/MyListPage'));
const MyListEditPage = lazy(() => import('./components/pages/myList/MyListEditPage'));
const BoxChancePage = lazy(() => import('./components/pages/techFiles/TechFilesPage'));
const ShipDataPage = lazy(() => import('./components/pages/shipData/ShipDataPage'));
const ShipDetailPage = lazy(() => import('./components/pages/shipDetail/ShipDetailPage'));
const FleetSetupPage = lazy(() => import('./components/pages/fleetSetup/FleetSetupPage'));
const FleetSetupEditPage = lazy(() => import('./components/pages/fleetSetup/FleetSetupEditPage'));
const TableExample = lazy(() => import('./components/examples/TableExample'));

const theme = createTheme({
    palette: {
        background: {
            default: '#e5e5e5',
        },
    },
});

theme.typography.body2 = {
    ...theme.typography.body2,
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.6rem',
    },
};

theme.typography.caption = {
    ...theme.typography.caption,
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.6rem',
    },
};

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ShipDetailProvider>
                    <Routes>
                        <Route
                            path="techFiles"
                            element={(
                                <Suspense fallback={<LoadingIndicator />}>
                                    <BoxChancePage />
                                </Suspense>
                            )}
                        />
                        <Route
                            path="shipData"
                            element={(
                                <Outlet />
                            )}
                        >
                            <Route
                                index={true}
                                element={(
                                    <Suspense fallback={<LoadingIndicator />}>
                                        <ShipDataPage />
                                    </Suspense>
                                )}
                            />
                            <Route
                                path=":shipId"
                                element={(
                                    <Suspense fallback={<LoadingIndicator />}>
                                        <ShipDetailPage />
                                    </Suspense>
                                )}
                            />
                        </Route>
                        <Route
                            path="myList"
                            element={(
                                <Suspense fallback={<LoadingIndicator />}>
                                    <MyListPage />
                                </Suspense>
                            )}
                        />
                        <Route
                            path="myList/edit"
                            element={(
                                <Suspense fallback={<LoadingIndicator />}>
                                    <MyListEditPage />
                                </Suspense>
                            )}
                        />
                        <Route
                            path="fleetSetup"
                            element={(
                                <Suspense fallback={<LoadingIndicator />}>
                                    <FleetSetupPage />
                                </Suspense>
                            )}
                        />
                        <Route
                            path="fleetSetup/edit"
                            element={(
                                <Outlet />
                            )}
                        >
                            <Route
                                index={true}
                                element={(
                                    <Suspense fallback={<LoadingIndicator />}>
                                        <FleetSetupEditPage />
                                    </Suspense>
                                )}
                            />
                            <Route
                                path=":fleetKey"
                                element={(
                                    <Suspense fallback={<LoadingIndicator />}>
                                        <FleetSetupEditPage />
                                    </Suspense>
                                )}
                            />
                        </Route>
                        <Route
                            path="debug"
                            element={(
                                <Suspense fallback={<LoadingIndicator />}>
                                    <TableExample />
                                </Suspense>
                            )}
                        />
                        <Route
                            path="/"
                            element={(
                                <Navigate replace={true} to="techFiles" />
                            )}
                        />
                        <Route
                            path="*"
                            element={(
                                <Typography variant="body1">{'Page not found'}</Typography>
                            )}
                        />
                    </Routes>
                </ShipDetailProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
