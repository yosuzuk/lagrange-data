import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Container } from '../container/Container';

const REPOSITORY_URL = 'https://github.com/yosuzuk/lagrange-data';
const CHANGELOG_URL = '/blob/main/CHANGELOG.md';

interface IProps {
    disableContainer?: boolean;
}

export const PageFooter = ({ disableContainer }: IProps) => {
    return (
        <Box mt={8}>
            <Divider />
            <Container disabled={disableContainer}>
                <Box p={1}>
                    <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">{'© 2022 yosuzuk'}</Typography>
                        <Stack spacing={2} direction="row" alignItems="center" justifyContent="end">
                                <Typography variant="body2" color="text.secondary">
                                    {`インラグデータ`}
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
                        </Stack>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};
