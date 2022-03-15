import { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { ShipCountList } from './ShipCountList';
import { ReinforcementType } from './types/IFleetSetup';
import { IShipsForAddDialog } from './types/IShipsForAddDialog';
import { filterShipForAddDialog } from './utils/shipAddDialogUtilts';
import { createInitialShipFilterState } from '../../filter/filterUtils';
import { FilterKey, ShipFilterState } from '../../filter/types/ShipFilterState';
import { ShipTypeFilterButton } from '../../filter/ShipTypeFilterButton';
import { ShipType } from '../../../types/ShipType';

export interface IProps {
    title: string;
    description: string;
    ships: IShipsForAddDialog;
    reinforcement: ReinforcementType | null;
    onCancel: () => void;
    onApply: () => void;
    onChangeCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

export const AddShipsToFleetDialog = (props: IProps) => {
    const { title, description, ships, reinforcement, onCancel, onApply, onChangeCount } = props;
    const [drawList, setDrawList] = useState<boolean>(false);

    const [filterState, setFilterState] = useState<ShipFilterState>(() => {
        const defaultFilterState = createInitialShipFilterState();
        if (ships.filter && typeof defaultFilterState[ships.filter as FilterKey] === 'boolean') {
            return {
                ...defaultFilterState,
                [ships.filter]: true,
            };
        }
        return defaultFilterState;
    });

    const filteredShips = useMemo(() => filterShipForAddDialog(filterState, ships), [filterState, ships]);

    useEffect(() => {
        const t = setTimeout(() => {
            setDrawList(true);
        }, 0);
        return () => {
            clearTimeout(t);
        };
    }, []);

    return (
        <ResponsiveDialog
            title={title}
            content={(
                <Stack spacing={2}>
                    <Typography variant="body2">{description}</Typography>
                    <div>
                        <ShipTypeFilterButton
                            filter={filterState}
                            shipTypes={[
                                ShipType.CARRIER,
                                ShipType.BATTLE_CRUISER,
                                ShipType.CRUISER,
                                ShipType.DESTROYER,
                                ShipType.FRIGATE,
                            ]}
                            onChange={setFilterState}
                            fullWidth={false}
                            popperProps={{
                                disablePortal: false,
                                placement: 'bottom-start',
                                style: {
                                    zIndex: 1300, // on top of dialog
                                },
                            }}
                        />
                    </div>
                    {filteredShips.ships.length === 0 && (
                        <Alert severity="info">
                            {'該当する艦船がありません。'}
                        </Alert>
                    )}
                    {drawList ? (
                        <ShipCountList
                            shipsForAddDialog={filteredShips}
                            showCost={!reinforcement}
                            showReinforcement={false}
                            onChangeCount={onChangeCount}
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
                        {'キャンセル'}
                    </Button>
                    <Button variant="contained" onClick={onApply}>
                        {'ＯＫ'}
                    </Button>
                </>
            )}
            onClose={onCancel}
        />
    );
};
