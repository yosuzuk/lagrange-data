import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const PrimaryButton = styled(Button)({
    minWidth: '55px',
    padding: 0,
    backgroundColor: '#b97400',
    borderRadius: '0 0 8px 0',
    color: 'white',
    fontSize: '0.7rem',
    '&.Mui-disabled': {
        backgroundColor: '#424242',
        color: 'grey',
    },
    '&:hover': {
        backgroundColor: '#b97400',
    },
    '&::before': {
        content: '"."',
        color: 'yellow',
        position: 'absolute',
        bottom: '9px',
        left: '2px',
    },
    '&.Mui-disabled::before': {
        color: 'grey',
    },
});
