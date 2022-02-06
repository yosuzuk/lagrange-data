import { IPage } from './types/IPage';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Container } from '../container/Container';

interface IProps {
    pages: IPage[];
    currentPageId: string;
    setPage: (id: string) => void;
}

export const NavigationBar = (props: IProps) => {
    const { pages, currentPageId, setPage } = props;

    const handleChange = (event: React.SyntheticEvent, pageId: string) => {
        setPage(pageId);
    };

    return (
        <>
            <AppBar position="sticky">
                <Container>
                    <Tabs
                        value={currentPageId}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {pages.filter(page => page.hidden !== true).map((page: IPage) => (
                            <Tab key={page.id} label={page.name} value={page.id} />
                        ))}
                    </Tabs>
                </Container>
            </AppBar>
        </>
    );
};
