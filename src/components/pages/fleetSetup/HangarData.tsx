import { useMemo, Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { IShipSelection, ReinforcementType } from './types/IFleetSetup';
import { getHangar, IHangar, shouldVisualizeHangar } from './utils/hangarUtils';

interface IProps {
    shipSelection: IShipSelection;
    onOpenAddCarriedShips?: (carrierShipId: string, reinforcement: ReinforcementType | null) => void;
}

export const HangarData = (props: IProps) => {
    const { shipSelection, onOpenAddCarriedShips } = props;

    const hangar = useMemo(() => getHangar(shipSelection), [shipSelection]);

    return (
        <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">{'ハンガー'}</Typography>
            <Stack spacing={1} direction="row" alignItems="center">
                {Object.keys(hangar)
                    .filter(key => shouldVisualizeHangar(hangar[key as keyof IHangar]))
                    .map(key => hangar[key as keyof IHangar])
                    .map(hangarInstance => (
                        <Fragment key={hangarInstance.key}>
                            <Typography variant="body2" color="text.secondary">{hangarInstance.name}</Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ color: hangarInstance.count > hangarInstance.maxCount ? 'red' : undefined }}
                            >
                                <strong>{`${hangarInstance.count} / ${hangarInstance.maxCount}`}</strong>
                            </Typography>
                        </Fragment>
                    ))}
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        onOpenAddCarriedShips?.(shipSelection.shipDefinition.id, shipSelection.reinforcement);
                    }}
                >
                    {'艦載機を追加'}
                </Button>
            </Stack>
        </Stack>
    );
}
