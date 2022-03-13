import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface IProps {
    height?: string;
}

export const LoadingComponent = (props: IProps) => {
    const { height = '200px' } = props;
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height,
        }}>
            <CircularProgress  />
        </Box>
    );
};
