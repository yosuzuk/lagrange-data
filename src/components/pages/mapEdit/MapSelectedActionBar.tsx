import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ActionBar } from '../../actionBar/ActionBar';
import { t } from '../../../i18n';
import { routes } from '../../../utils/routes';

interface IProps {
    canApply: boolean;
    onApply: () => void;
}

export const MapSelectedActionBar = (props: IProps) => {
    const { canApply, onApply } = props;
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(routes.map.path);
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
                        onClick={onApply}
                        endIcon={<NavigateNextIcon />}
                        disabled={!canApply}
                        {...buttonProps}
                    >
                        {t('mapEdit.visualizeMap')}
                    </Button>
                </>
            )}
        />
    );
}
