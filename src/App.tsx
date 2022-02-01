import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IPage, useNavigation, NavigationBar } from './components/navigation';
import { BoxChancePage } from './components/pages/boxChance/BoxChancePage';
import { ShipDataPage } from './components/pages/shipData/ShipDataPage';
import { MyListPage } from './components/pages/myList/MyListPage';
import { TableExample } from './components/examples/TableExample';

const theme = createTheme({
    palette: {
        background: {
            default: '#e5e5e5',
        },
    },
});

const pages: IPage[] = [
    {
        id: 'myList',
        name: 'マイリスト',
        description: 'サブモデル、コスト、配置等',
        render: () => <MyListPage />,
    },
    {
        id: 'shipData',
        name: '艦船一覧',
        description: 'サブモデル、コスト、配置等',
        render: () => <ShipDataPage />,
    },
    {
        id: 'boxChance',
        name: '技術ファイル',
        description: '技術ファイル',
        render: () => <BoxChancePage />,
    },
    {
        id: 'tableExample',
        name: 'Debug',
        description: '',
        render: () => <TableExample />,
        hidden: true,
    },
];

function App() {
    const { currentPage, setPage } = useNavigation(pages);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavigationBar pages={pages} currentPageId={currentPage.id} setPage={setPage} />
            {currentPage.render()}
        </ThemeProvider>
    );
}

export default App;
