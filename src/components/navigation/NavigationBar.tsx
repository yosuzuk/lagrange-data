import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Container } from '../container/Container';

interface IProps {
    currentRoute: string;
}

export const NavigationBar = (props: IProps) => {
    const { currentRoute } = props;

    return (
        <>
            <AppBar position="sticky">
                <Container>
                    <Tabs
                        value={currentRoute}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label={'マイリスト'} value="/myList" to="/myList" component={Link} />
                        <Tab label={'技術ファイル'} value="/techFiles" to="/techFiles" component={Link} />
                        <Tab label={'艦船一覧'} value="/shipData" to="/shipData" component={Link} />
                    </Tabs>
                </Container>
            </AppBar>
        </>
    );
};
