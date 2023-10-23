import { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { ShipCountEditList } from './ShipCountEditList';
import { ReinforcementType } from './types/IFleetSetup';
import { IDialogDataForCarriedShips } from './types/IDialogDataForShips';
import { createInitialShipFilterState } from '../../filter/filterUtils';
import { FilterKey, ShipFilterState } from '../../filter/types/ShipFilterState';
import { ShipTypeFilterButton } from '../../filter/ShipTypeFilterButton';
import { ShipType } from '../../../types/ShipType';
import { filterCarriedShipForAddDialog } from './utils/carriedShipAddDialogUtils';
import { t } from '../../../i18n';

export interface IProps {
    dialogData: IDialogDataForCarriedShips;
    shipWarnings: Record<string, string>;
    myListOnly: boolean;
    onCancel: () => void;
    onApply: () => void;
    onChangeShipCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

export const AddShipsToCarrierDialog = (props: IProps) => {
    const { dialogData, shipWarnings, myListOnly, onCancel, onApply, onChangeShipCount } = props;
    const [drawList, setDrawList] = useState<boolean>(false);

    const [filterState, setFilterState] = useState<ShipFilterState>(() => {
        const defaultFilterState = createInitialShipFilterState();
        if (dialogData.filter && typeof defaultFilterState[dialogData.filter as FilterKey] === 'boolean') {
            return {
                ...defaultFilterState,
                [dialogData.filter]: true,
            };
        }
        return defaultFilterState;
    });

    const filteredShips = useMemo(() => filterCarriedShipForAddDialog(filterState, dialogData), [filterState, dialogData]);

    useEffect(() => {
        const t = setTimeout(() => {
            setDrawList(true);
        }, 0);
        return () => {
            clearTimeout(t);
        };
    }, []);

    const canAddCorvette = !!dialogData.shipSelections.find(s => s.shipDefinition.type === ShipType.CORVETTE);
    const canAddFighter = !!dialogData.shipSelections.find(s => s.shipDefinition.type === ShipType.FIGHTER);

    return (
        <ResponsiveDialog
            title={t('fleetSetup.addAircraft')}
            content={(
                <Stack spacing={2}>
                    <Typography variant="body2">{t('fleetSetup.addAircraftDescription')}</Typography>
                    {(canAddCorvette && canAddFighter) && (
                        <div>
                            <ShipTypeFilterButton
                                filter={filterState}
                                shipTypes={[
                                    ShipType.CORVETTE,
                                    ShipType.FIGHTER,
                                ]}
                                shipRows={[]}
                                onChange={setFilterState}
                                popperProps={{
                                    disablePortal: false,
                                    placement: 'bottom-start',
                                    style: {
                                        zIndex: 1300, // on top of dialog
                                    },
                                }}
                            />
                        </div>
                    )}
                    {filteredShips.shipSelections.length === 0 && (
                        <Alert severity="info">
                            {t('fleetSetup.noMatchingAircraft')}
                        </Alert>
                    )}
                    {drawList ? (
                        <ShipCountEditList
                            shipSelections={filteredShips.shipSelections}
                            showCost={false}
                            showReinforcement={false}
                            showHangar={false}
                            shipWarnings={shipWarnings}
                            showTune={false}
                            carrierShipId={null}
                            myListOnly={myListOnly}
                            onChangeShipCount={onChangeShipCount}
                        />
                    ) : (
                        <Stack spacing={1}>
                            <Skeleton variant="rectangular" height={90} />
                            <Skeleton variant="rectangular" animation="wave" height={90} />
                            <Skeleton variant="rectangular" height={90} />
                            <Skeleton variant="rectangular" animation="wave" height={90} />
                            <Skeleton variant="rectangular" height={90} />
                        </Stack>
                    )}
                </Stack>
            )}
            actions={(
                <>
                    <Button variant="outlined" onClick={onCancel}>
                        {t('button.cancel')}
                    </Button>
                    <Button variant="contained" onClick={onApply}>
                        {t('button.confirm')}
                    </Button>
                </>
            )}
            onClose={onCancel}
        />
    );
};
