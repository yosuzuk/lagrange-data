import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ActionBar } from '../../actionBar/ActionBar';
import { t } from '../../../i18n';
import { routes } from '../../../utils/routes';

interface IProps {
    mapDataValid: boolean;
}

export const MapSelectedActionBar = (props: IProps) => {
    const { mapDataValid } = props;
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(routes.mapSelection.path);
    };

    const renderMap = () => {
        // navigate(routes.mapSelection.path);
    };

    return (
        <ActionBar
            left={buttonProps => (
                <>
                    <Button
                        key="back"
                        variant="outlined"
                        onClick={navigateBack}
                        startIcon={<NavigateBeforeIcon />}
                        {...buttonProps}
                    >
                        {t('button.back')}
                    </Button>
                </>
            )}
            right={buttonProps => (
                <>
                    <Button
                        key="render"
                        variant="outlined"
                        onClick={renderMap}
                        endIcon={<NavigateNextIcon />}
                        disabled={!mapDataValid}
                        {...buttonProps}
                    >
                        {t('mapEdit.visualizeMap')}
                    </Button>
                </>
            )}
        />
    );
}
