import { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { ShipTypeFilterButton } from '../../filter/ShipTypeFilterButton';
import { ActionBar } from '../../actionBar/ActionBar';
import { ShipType } from '../../../types/ShipType';
import { t } from '../../../i18n';
import { ConfirmationDialog } from '../../dialog/ConfirmationDialog';

interface IProps {
    shipFilter: ShipFilterState;
    modified: boolean;
    stored: boolean;
    onFilterChange: (filter: ShipFilterState) => void;
    onReset: () => void;
    onCancel: () => void;
    onSave: () => void;
}

export const TechPointConfigActionBar = (props: IProps) => {
    const {
        shipFilter,
        modified,
        stored,
        onFilterChange,
        onReset,
        onCancel,
        onSave,
    } = props;

    const [confirmingReset, setConfirmReset] = useState<boolean>(false);

    const handleConfirmReset = useCallback(() => {
        setConfirmReset(false);
        onReset();
    }, [onReset]);

    return (
        <>
        <ActionBar
            left={buttonProps => (
                <>
                    <ShipTypeFilterButton
                        key="filter"
                        filter={shipFilter}
                        onChange={onFilterChange}
                        buttonProps={buttonProps}
                        shipRows={[]}
                        manufacturer={[]}
                        researchManufacturer={false}
                        researchStrategyTypes={false}
                        researchTacticTypes={false}
                        shipSources={[]}
                        shipTypes={[
                            ShipType.AUXILIARY,
                            ShipType.CARRIER,
                            ShipType.BATTLE_CRUISER,
                            ShipType.CRUISER,
                            ShipType.CORVETTE,
                            ShipType.FIGHTER,
                        ]}
                    />
                </>
            )}
            right={buttonProps => (
                <>
                    <Button
                        key="reset"
                        variant="outlined"
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => {
                            setConfirmReset(true);
                        }}
                        disabled={!stored}
                        {...buttonProps}
                    >
                        {t('button.reset')}
                    </Button>
                    <Button
                        key="cancel"
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={onCancel}
                        disabled={!modified}
                        {...buttonProps}
                    >
                        {t('button.cancel')}
                    </Button>
                    <Button
                        key="save"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={onSave}
                        disabled={!modified}
                        {...buttonProps}
                    >
                        {t('button.save')}
                    </Button>
                </>
            )}
        />
            {confirmingReset && (
                <ConfirmationDialog
                    title={t('button.reset')}
                    question={t('techPointConfig.confirmReset')}
                    cancelText={t('button.cancel')}
                    confirmText={t('button.reset')}
                    onCancel={() => {
                        setConfirmReset(false);
                    }}
                    onConfirm={handleConfirmReset}
                />
            )}
        </>
    );
}
