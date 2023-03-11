import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ActionBar } from '../../actionBar/ActionBar';
import { t } from '../../../i18n';

export const ShipDetailActionBar = () => {
    return (
        <ActionBar
            left={buttonProps => (
                <>
                    <Button
                        key="share"
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        component={Link}
                        to={'/shipData'}
                        fullWidth={buttonProps.fullWidth}
                        size={buttonProps.size}
                    >
                        {t('shipData.pageTitle')}
                    </Button>
                </>
            )}
        />
    );
}
