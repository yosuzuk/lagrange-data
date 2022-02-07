import { Suspense, lazy } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { LoadingIndicator } from './components/loading/LoadingIndicator';

const MyListPage = lazy(() => import('./components/pages/myList/MyListPage'));
const MyListEditPage = lazy(() => import('./components/pages/myList/MyListEditPage'));
const BoxChancePage = lazy(() => import('./components/pages/techFiles/TechFilesPage'));
const ShipDataPage = lazy(() => import('./components/pages/shipData/ShipDataPage'));
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

function App() {
    return (
        <BrowserRouter basename="lagrange-data">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    <Route
                        path="/"
                        element={(
                            <Navigate replace={true} to="/techFiles" />
                        )}
                    />
                    <Route
                        path="/techFiles"
                        element={(
                            <Suspense fallback={<LoadingIndicator />}>
                                <BoxChancePage />
                            </Suspense>
                        )}
                    />
                    <Route
                        path="/shipData"
                        element={(
                            <Suspense fallback={<LoadingIndicator />}>
                                <ShipDataPage />
                            </Suspense>
                        )}
                    />
                    <Route
                        path="/myList"
                        element={(
                            <Suspense fallback={<LoadingIndicator />}>
                                <MyListPage />
                            </Suspense>
                        )}
                    />
                    <Route
                        path="/myList/edit"
                        element={(
                            <Suspense fallback={<LoadingIndicator />}>
                                <MyListEditPage />
                            </Suspense>
                        )}
                    />
                    <Route
                        path="/debug"
                        element={(
                            <Suspense fallback={<LoadingIndicator />}>
                                <TableExample />
                            </Suspense>
                        )}
                    />
                    <Route
                        path="*"
                        element={(
                            <Typography variant="body1">{'Page not found'}</Typography>
                        )}
                    />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
