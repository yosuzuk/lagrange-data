import { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { ShipCountEditList } from './ShipCountEditList';
import { ReinforcementType } from './types/IFleetSetup';
import { IDialogDataForShips } from './types/IDialogDataForShips';
import { filterShipForAddDialog } from './utils/shipAddDialogUtilts';
import { createInitialShipFilterState } from '../../filter/filterUtils';
import { FilterKey, ShipFilterState } from '../../filter/types/ShipFilterState';
import { ShipTypeFilterButton } from '../../filter/ShipTypeFilterButton';
import { ShipType } from '../../../types/ShipType';

export interface IProps {
    dialogData: IDialogDataForShips;
    shipWarnings: Record<string, string>;
    myListOnly: boolean;
    onCancel: () => void;
    onApply: () => void;
    onChangeShipCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

export const AddShipsToFleetDialog = (props: IProps) => {
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

    const filteredShips = useMemo(() => filterShipForAddDialog(filterState, dialogData), [filterState, dialogData]);

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
                        {getTitle(dialogData.reinforcement)}
                    </Typography>
                    {dialogData.reinforcement === null ? (
                        <div>
                            <Typography variant="body1" component="span">
                                {'指令Pt：'}
                            </Typography>
                            <Typography
                                variant="body1"
                                component="span"
                                sx={{
                                    color: dialogData.fleetSetup.totalCost > dialogData.fleetSetup.maxCost ? 'red' : undefined,
                                }}
                            >
                                <strong>
                                    {`${dialogData.fleetSetup.totalCost} / ${dialogData.fleetSetup.maxCost}`}
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
                                    color: dialogData.fleetSetup.totalReinforcementCount > dialogData.fleetSetup.maxReinforcement ? 'red' : undefined,
                                }}
                            >
                                <strong>
                                    {`${dialogData.fleetSetup.totalReinforcementCount} / ${dialogData.fleetSetup.maxReinforcement}`}
                                </strong>
                            </Typography>
                        </div>
                    )}
                </Stack>
            )}
            content={(
                <Stack spacing={2}>
                    <Typography variant="body2">{getDescription(dialogData.reinforcement)}</Typography>
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
                            {'該当する艦船がありません。'}
                        </Alert>
                    )}
                    {drawList ? (
                        <ShipCountEditList
                            shipSelections={filteredShips.fleetSetup.ships}
                            showCost={!filteredShips.reinforcement}
                            showReinforcement={false}
                            showHangar={false}
                            shipWarnings={shipWarnings}
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

function getTitle(reinforcement: ReinforcementType | null): string {
    switch (reinforcement) {
        case 'ally':
        case 'ally2':
        case 'ally3':
        case 'self': {
            return '増援を追加';
        }
        default: {
            return '艦船を追加';
        }
    }
}

function getDescription(reinforcement: ReinforcementType | null): string {
    switch (reinforcement) {
        case 'ally': {
            return 'ユニオンメンバーＡから送られる増援を追加します。';
        }
        case 'ally2': {
            return 'ユニオンメンバーＢから送られる増援を追加します。';
        }
        case 'ally3': {
            return 'ユニオンメンバーＣから送られる増援を追加します。';
        }
        case 'self': {
            return '自身の基地から送る増援を追加します。所持している艦船はマイリストで設定してください。';
        }
        default: {
            return '艦船を通常配備します。所持している艦船はマイリストで設定してください。';
        }
    }
}
