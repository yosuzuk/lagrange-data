import { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { ShipCountEditList } from './ShipCountEditList';
import { ReinforcementType } from './types/IFleetSetup';
import { IShipsForAddDialog } from './types/IShipsForAddDialog';
import { filterShipForAddDialog } from './utils/shipAddDialogUtilts';
import { createInitialShipFilterState } from '../../filter/filterUtils';
import { FilterKey, ShipFilterState } from '../../filter/types/ShipFilterState';
import { ShipTypeFilterButton } from '../../filter/ShipTypeFilterButton';
import { ShipType } from '../../../types/ShipType';

export interface IProps {
    ships: IShipsForAddDialog;
    carrierShipId: string | null;
    shipWarnings: Record<string, string>;
    onCancel: () => void;
    onApply: () => void;
    onChangeShipCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    onChangeCarriedShipCount: (shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

export const AddShipsToFleetDialog = (props: IProps) => {
    const { ships, carrierShipId, shipWarnings, onCancel, onApply, onChangeShipCount, onChangeCarriedShipCount } = props;
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
            title={(
                <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">
                        {getTitle(ships.reinforcement, !!carrierShipId)}
                    </Typography>
                    {ships.reinforcement === null ? (
                        <div>
                            <Typography variant="body1" component="span">
                                {'指令Pt：'}
                            </Typography>
                            <Typography
                                variant="body1"
                                component="span"
                                sx={{
                                    color: ships.fleetSetup.totalCost > ships.fleetSetup.maxCost ? 'red' : undefined,
                                }}
                            >
                                <strong>
                                    {`${ships.fleetSetup.totalCost} / ${ships.fleetSetup.maxCost}`}
                                </strong>
                            </Typography>
                        </div>
                    ) : (
                        <div>
                            <Typography variant="body1" component="span">
                                {'増援：'}
                            </Typography>
                            <Typography
                                variant="body1"
                                component="span"
                                sx={{
                                    color: ships.fleetSetup.totalReinforcementCount > ships.fleetSetup.maxReinforcement ? 'red' : undefined,
                                }}
                            >
                                <strong>
                                    {`${ships.fleetSetup.totalReinforcementCount} / ${ships.fleetSetup.maxReinforcement}`}
                                </strong>
                            </Typography>
                        </div>
                    )}
                </Stack>
            )}
            content={(
                <Stack spacing={2}>
                    <Typography variant="body2">{getDescription(ships.reinforcement, !!carrierShipId)}</Typography>
                    <div>
                        <ShipTypeFilterButton
                            filter={filterState}
                            shipTypes={carrierShipId ? [
                                ShipType.CORVETTE,
                                ShipType.FIGHTER,
                            ] : [
                                ShipType.CARRIER,
                                ShipType.BATTLE_CRUISER,
                                ShipType.CRUISER,
                                ShipType.DESTROYER,
                                ShipType.FRIGATE,
                            ]}
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
                    {filteredShips.fleetSetup.ships.length === 0 && (
                        <Alert severity="info">
                            {carrierShipId ? '該当する艦載機がありません。' : '該当する艦船がありません。'}
                        </Alert>
                    )}
                    {drawList ? (
                        <ShipCountEditList
                            shipSelections={filteredShips.fleetSetup.ships}
                            showCost={!filteredShips.reinforcement}
                            showReinforcement={false}
                            showHangar={false}
                            shipWarnings={shipWarnings}
                            carrierShipId={carrierShipId}
                            onChangeShipCount={onChangeShipCount}
                            onChangeCarriedShipCount={onChangeCarriedShipCount}
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

function getTitle(reinforcement: ReinforcementType | null, carriedShips: boolean): string {
    if (carriedShips) {
        return '艦載機を追加';
    }
    switch (reinforcement) {
        case 'ally':
        case 'self': {
            return '増援を追加';
        }
        default: {
            return '艦船を追加';
        }
    }
}

function getDescription(reinforcement: ReinforcementType | null, carriedShips: boolean): string {
    if (carriedShips) {
        return '艦載機を配備します。所持している艦載機はマイリストで設定してください。';
    }

    switch (reinforcement) {
        case 'ally': {
            return 'ユニオンメンバーから送られる増援を追加します。';
        }
        case 'self': {
            return '自身の基地から送る増援を追加します。所持している艦船はマイリストで設定してください。';
        }
        default: {
            return '艦船を通常配備します。所持している艦船はマイリストで設定してください。';
        }
    }
}
