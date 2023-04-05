import { Suspense, lazy } from 'react';
import {
    HashRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet,
} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { LoadingIndicator } from './components/loading/LoadingIndicator';
import { ShipDetailProvider } from './components/shipDetail/ShipDetailProvider';
import { UserSettingsProvider } from './userSettings/context/UserSettingsContext';
import { ThemeProvider } from './theme/context/ThemeProvider';
import { flags } from './utils/flags';
import { routes } from './utils/routes';

const MyListPage = lazy(() => import('./components/pages/myList/MyListPage'));
const MyListEditPage = lazy(() => import('./components/pages/myList/MyListEditPage'));
const BoxChancePage = lazy(() => import('./components/pages/techFiles/TechFilesPage'));
const ResearchAgreementPage = lazy(() => import('./components/pages/researchAgreement/ResearchAgreementPage'));
const ShipDataPage = lazy(() => import('./components/pages/shipData/ShipDataPage'));
const ShipDetailPage = lazy(() => import('./components/pages/shipDetail/ShipDetailPage'));
const FleetSetupPage = lazy(() => import('./components/pages/fleetSetup/FleetSetupPage'));
const FleetSetupEditPage = lazy(() => import('./components/pages/fleetSetup/FleetSetupEditPage'));
const DpmCalcPage = lazy(() => import('./components/pages/dpm/DpmCalcPage'));
const ImageEditPage = lazy(() => import('./components/pages/imageEdit/ImageEditPage'));
const LargeMapEditPage = lazy(() => import('./components/pages/mapEdit/LargeMapEditPage'));
const SmallMapEditPage = lazy(() => import('./components/pages/mapEdit/SmallMapEditPage'));
const TableExample = lazy(() => import('./components/examples/TableExample'));

function App() {
    return (
        <Router>
            <ThemeProvider>
                <UserSettingsProvider>
                    <ShipDetailProvider>
                        <Routes>
                            <Route
                                path={routes.techFiles.routePath}
                                element={(
                                    <Suspense fallback={<LoadingIndicator />}>
                                        <BoxChancePage />
                                    </Suspense>
                                )}
                            />
                            <Route
                                path={routes.researchAgreement.routePath}
                                element={(
                                    <Suspense fallback={<LoadingIndicator />}>
                                        <ResearchAgreementPage />
                                    </Suspense>
                                )}
                            />
                            <Route
                                path={routes.shipData.routePath}
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
                                    path={routes.shipDataById.routePath}
                                    element={(
                                        <Suspense fallback={<LoadingIndicator />}>
                                            <ShipDetailPage />
                                        </Suspense>
                                    )}
                                />
                            </Route>
                            <Route
                                path={routes.myList.routePath}
                                element={(
                                    <Suspense fallback={<LoadingIndicator />}>
                                        <MyListPage />
                                    </Suspense>
                                )}
                            />
                            <Route
                                path={routes.myListEdit.routePath}
                                element={(
                                    <Suspense fallback={<LoadingIndicator />}>
                                        <MyListEditPage />
                                    </Suspense>
                                )}
                            />
                            <Route
                                path={routes.fleetSetup.routePath}
                                element={(
                                    <Outlet />
                                )}
                            >
                                <Route
                                    index={true}
                                    element={(
                                        <Suspense fallback={<LoadingIndicator />}>
                                            <FleetSetupPage />
                                        </Suspense>
                                    )}
                                />
                                <Route
                                    path={routes.fleetSetupByKey.routePath}
                                    element={(
                                        <Suspense fallback={<LoadingIndicator />}>
                                            <FleetSetupPage />
                                        </Suspense>
                                    )}
                                />
                            </Route>
                            <Route
                                path={routes.fleetSetupEdit.routePath}
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
                                    path={routes.fleetSetupEditByKey.routePath}
                                    element={(
                                        <Suspense fallback={<LoadingIndicator />}>
                                            <FleetSetupEditPage />
                                        </Suspense>
                                    )}
                                />
                            </Route>
                            {flags.dpmCalc && (
                                <Route
                                    path={routes.dpmCalc.routePath}
                                    element={(
                                        <Suspense fallback={<LoadingIndicator />}>
                                            <DpmCalcPage />
                                        </Suspense>
                                    )}
                                />
                            )}
                            {flags.imageEdit && (
                                <Route
                                    path={routes.imageEdit.routePath}
                                    element={(
                                        <Suspense fallback={<LoadingIndicator />}>
                                            <ImageEditPage />
                                        </Suspense>
                                    )}
                                />
                            )}
                            {flags.largeMapEdit && (
                                <Route
                                    path="largeMapEdit"
                                    element={(
                                        <Suspense fallback={<LoadingIndicator />}>
                                            <LargeMapEditPage />
                                        </Suspense>
                                    )}
                                />
                            )}
                            {flags.smallMapEdit && (
                                <Route
                                    path="smallMapEdit"
                                    element={(
                                        <Suspense fallback={<LoadingIndicator />}>
                                            <SmallMapEditPage />
                                        </Suspense>
                                    )}
                                />
                            )}
                            <Route
                                path={routes.debug.routePath}
                                element={(
                                    <Suspense fallback={<LoadingIndicator />}>
                                        <TableExample />
                                    </Suspense>
                                )}
                            />
                            <Route
                                path="/"
                                element={(
                                    <Navigate replace={true} to={routes.techFiles.routePath} />
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
                </UserSettingsProvider>
            </ThemeProvider >
        </Router >
    );
}

export default App;
