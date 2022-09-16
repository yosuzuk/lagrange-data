import { useMemo, Fragment } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { IShipSelection, ReinforcementType } from './types/IFleetSetup';
import { getHangar, IHangar, shouldVisualizeHangar } from './utils/hangarUtils';
import { t } from '../../../i18n';

interface IProps {
    shipSelection: IShipSelection;
    onOpenAddCarriedShips?: (carrierShipId: string, reinforcement: ReinforcementType | null) => void;
}

export const HangarData = (props: IProps) => {
    const { shipSelection, onOpenAddCarriedShips } = props;
    const theme = useTheme();
    const verticalAlignment = useMediaQuery(theme.breakpoints.down('xs'));

    const hangar = useMemo(() => getHangar(shipSelection), [shipSelection]);

    return (
        <Stack
            spacing={1}
            direction={verticalAlignment ? 'column' : 'row'}
            alignItems={verticalAlignment ? 'flex-start' : 'center'}
            justifyContent="end"
            flexWrap="wrap"
        >
            <Stack
                sx={{ flexGrow: 1 }}
                spacing={3}
                direction="row"
                alignItems="center" justifyContent="space-between"
            >
                <Typography variant="body2" color="text.secondary">{t('label.hangarColon')}</Typography>
                <Stack spacing={1} direction="row" alignItems="center">
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
                    </Stack>
                </Stack>
            </Stack>
            <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                sx={{ whiteSpace: 'nowrap' }}
                onClick={() => {
                    onOpenAddCarriedShips?.(shipSelection.shipDefinition.id, shipSelection.reinforcement);
                }}
            >
                {t('fleetSetup.addAircraft')}
            </Button>
        </Stack>
    );
}
