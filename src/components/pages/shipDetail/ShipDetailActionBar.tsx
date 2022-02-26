import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ActionBar } from '../../actionBar/ActionBar';

export const ShipDetailActionBar = () => {
    return (
        <ActionBar
            left={(fullWidth: boolean) => (
                <>
                    <Button
                        key="share"
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        fullWidth={fullWidth}
                        component={Link}
                        to={'/shipData'}
                    >
                        {'艦船一覧'}
                    </Button>
                </>
            )}
        />
    );
}
