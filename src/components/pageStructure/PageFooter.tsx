import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Container } from '../container/Container';
import { useColorMode } from '../../theme/context/ThemeProvider';
import { LanguagePicker } from '../languagePicker/LanguagePicker';
import { t } from '../../i18n';

const REPOSITORY_URL = 'https://github.com/yosuzuk/lagrange-data';
const CHANGELOG_URL = '/blob/main/CHANGELOG.md';

interface IProps {
    disableContainer?: boolean;
}

export const PageFooter = ({ disableContainer }: IProps) => {
    const { mode, toggleMode } = useColorMode();

    return (
        <Box component="div" mt={8}>
            <Divider />
            <Container disabled={disableContainer}>
                <Box component="div" p={1}>
                    <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">{'© 2022 yosuzuk'}</Typography>
                        <Stack spacing={2} direction="row" alignItems="center" justifyContent="end">
                            <Typography variant="body2" color="text.secondary">
                                {t('appTitle')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {`Version ${__APP_VERSION__}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" component="a" href={REPOSITORY_URL + CHANGELOG_URL} target="_blank">
                                {'Changelog'}
                            </Typography>
                            <IconButton size="small" component="a" href={REPOSITORY_URL} target="_blank">
                                <GitHubIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={toggleMode}>
                                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                            <LanguagePicker />
                        </Stack>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};
