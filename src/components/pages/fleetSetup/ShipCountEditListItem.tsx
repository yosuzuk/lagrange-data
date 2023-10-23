import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsIcon from '@mui/icons-material/Settings';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ReinforcementType } from './types/IFleetSetup';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { useShipDetail } from '../../shipDetail/ShipDetailProvider';
import { ScriptedLink } from '../../link/ScriptedLink';
import { getShipName } from '../../../utils/shipDefinitionUtils';
import { t, isLanguageWithWhitespace } from '../../../i18n';
import { ShipRow } from '../../../types/ShipRow';
import { SystemTuneDialog } from './SystemTuneDialog';

interface IProps {
    shipDefinition: IShipDefinition;
    count: number;
    maxCount: number;
    reinforcement: ReinforcementType | null;
    rowOverride?: ShipRow;
    costOverride?: number;
    showCost: boolean;
    showReinforcement: boolean;
    showTune: boolean;
    carrierShipId: string | null;
    shipWarning?: string;
    onChangeShipCount?: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    onChangeCarriedShipCount?: (shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    onChangeOverrides?: (shipId: string, row: ShipRow, cost: number) => void;
}

export const ShipCountEditListItem = (props: IProps) => {
    const {
        shipDefinition,
        count,
        maxCount,
        reinforcement,
        rowOverride,
        costOverride,
        showCost,
        showReinforcement,
        showTune,
        carrierShipId,
        shipWarning,
        onChangeShipCount,
        onChangeCarriedShipCount,
        onChangeOverrides,
    } = props;

    const [systemTuneDialogOpened, setSystemTuneDialogOpened] = useState<boolean>(false);

    const theme = useTheme();
    const verticalAlignment = useMediaQuery(theme.breakpoints.down('sm'));

    const { openShipDetailDialog } = useShipDetail();

    const shipContext = (
        <>
            <Typography variant="body1">
                <ScriptedLink onClick={() => { openShipDetailDialog(shipDefinition.id); }}>
                    {getShipName(shipDefinition)}
                </ScriptedLink>
            </Typography>
            {showCost && reinforcement === null && (
                <Typography variant="body2" color="text.secondary">
                    {t('label.commandPointsColon')}
                    {isLanguageWithWhitespace() ? ' ' : ''}
                    {(costOverride ?? shipDefinition.cost)}
                    {t('label.comma')}
                    {isLanguageWithWhitespace() ? ' ' : ''}
                    {t('label.totalColon')}
                    {isLanguageWithWhitespace() ? ' ' : ''}
                    {`${(costOverride ?? shipDefinition.cost) * count}`}
                </Typography>
            )}
            {showReinforcement && reinforcement === 'self' && (
                <Typography variant="body2" color="text.secondary">
                    {t('fleetSetup.selfReinforcement')}
                </Typography>
            )}
            {showReinforcement && reinforcement === 'ally' && (
                <Typography variant="body2" color="text.secondary">
                    {t('fleetSetup.orgReinforcementA')}
                </Typography>
            )}
            {showReinforcement && reinforcement === 'ally2' && (
                <Typography variant="body2" color="text.secondary">
                    {t('fleetSetup.orgReinforcementB')}
                </Typography>
            )}
            {showReinforcement && reinforcement === 'ally3' && (
                <Typography variant="body2" color="text.secondary">
                    {t('fleetSetup.orgReinforcementC')}
                </Typography>
            )}
        </>
    );

    const warningText = shipWarning && (
        <Typography variant="caption" color="red" textAlign="end">
            {shipWarning}
        </Typography>
    );

    const clearButton = (
        <Button
            onClick={() => {
                if (carrierShipId) {
                    onChangeCarriedShipCount?.(shipDefinition.id, carrierShipId, 0, reinforcement);
                } else {
                    onChangeShipCount?.(shipDefinition.id, 0, reinforcement);
                }
            }}
            disabled={count <= 0}
        >
            {t('fleetSetup.clearAddedShips')}
        </Button>
    );

    const decreaseButton = (
        <IconButton
            onClick={() => {
                if (carrierShipId) {
                    onChangeCarriedShipCount?.(shipDefinition.id, carrierShipId, count - 1, reinforcement);
                } else {
                    onChangeShipCount?.(shipDefinition.id, count - 1, reinforcement);
                }
            }}
            disabled={count <= 0}
        >
            <IndeterminateCheckBoxIcon color={count <= 0 ? 'disabled' : 'primary'} />
        </IconButton>
    );

    const countIndicator = (
        <Typography variant="body1" sx={{ minWidth: '55px' }} textAlign="center">
            <strong>{`${count} / ${maxCount}`}</strong>
        </Typography>
    );

    const increaseButton = (
        <IconButton
            onClick={() => {
                if (carrierShipId) {
                    onChangeCarriedShipCount?.(shipDefinition.id, carrierShipId, count + 1, reinforcement);
                } else {
                    onChangeShipCount?.(shipDefinition.id, count + 1, reinforcement);
                }
            }}
            disabled={count >= maxCount}
        >
            <AddBoxIcon color={count >= maxCount ? 'disabled' : 'primary'} />
        </IconButton>
    );

    const tuneButton = (
        <IconButton onClick={() => setSystemTuneDialogOpened(true)}>
            <SettingsIcon color="primary" />
        </IconButton>
    );

    const maxOuntButton = (
        <Button
            onClick={() => {
                if (carrierShipId) {
                    onChangeCarriedShipCount?.(shipDefinition.id, carrierShipId, maxCount, reinforcement);
                } else {
                    onChangeShipCount?.(shipDefinition.id, maxCount, reinforcement);
                }
            }}
            disabled={count >= maxCount}
        >
            {t('fleetSetup.fillUpAddedShips')}
        </Button>
    );

    return (
        <>
            {verticalAlignment && (
                <Stack spacing={1}>
                    {shipContext}
                    <Stack direction="row" spacing={1}>
                        <Paper variant="outlined" sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', flexGrow: 1 }}>
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                {decreaseButton}
                                {countIndicator}
                                {increaseButton}
                            </Stack>
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                {clearButton}
                                {maxOuntButton}
                            </Stack>
                        </Paper>
                        {showTune && (
                            <Paper variant="outlined">
                                {tuneButton}
                            </Paper>
                        )}
                    </Stack>
                    {warningText}
                </Stack>
            )}
            {!verticalAlignment && (
                <Stack spacing={1}>
                    <Stack spacing={1} direction="row" flexWrap="wrap" alignItems="center">
                        <Box component="div" pb={1}>
                            <Stack spacing={1}>
                                {shipContext}
                            </Stack>
                        </Box>
                        <Box component="div" sx={{ display: 'flex', justifyContent: 'end', flexGrow: 1 }}>
                            <Stack direction="row" spacing={1}>
                                <Paper variant="outlined" sx={{ display: 'inline-block', flexGrow: 1 }}>
                                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                        {clearButton}
                                        {decreaseButton}
                                        {countIndicator}
                                        {increaseButton}
                                        {maxOuntButton}
                                    </Stack>
                                </Paper>
                                {showTune && (
                                    <Paper variant="outlined">
                                        {tuneButton}
                                    </Paper>
                                )}
                            </Stack>
                        </Box>
                    </Stack>
                    {warningText}
                </Stack>
            )}
            {systemTuneDialogOpened && onChangeOverrides && (
                <SystemTuneDialog
                    shipDefinition={shipDefinition}
                    rowOverride={rowOverride}
                    costOverride={costOverride}
                    onChange={onChangeOverrides}
                    onClose={() => setSystemTuneDialogOpened(false)}
                />
            )}
        </>
    );
};
