import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ReinforcementType } from './types/IFleetSetup';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { useShipDetail } from '../../shipDetail/ShipDetailProvider';
import { ScriptedLink } from '../../link/ScriptedLink';

interface IProps {
    shipDefinition: IShipDefinition;
    count: number;
    maxCount: number;
    reinforcement: ReinforcementType | null;
    showCost: boolean;
    showReinforcement: boolean;
    carrierShipId: string | null;
    shipWarning?: string;
    onChangeShipCount?: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    onChangeCarriedShipCount?: (shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

export const ShipCountEditListItem = (props: IProps) => {
    const {
        shipDefinition,
        count,
        maxCount,
        reinforcement,
        showCost,
        showReinforcement,
        carrierShipId,
        shipWarning,
        onChangeShipCount,
        onChangeCarriedShipCount,
    } = props;

    const theme = useTheme();
    const verticalAlignment = useMediaQuery(theme.breakpoints.down('sm'));

    const { openShipDetailDialog } = useShipDetail();

    const shipContext = (
        <>
            <Typography variant="body1">
                <ScriptedLink onClick={() => { openShipDetailDialog(shipDefinition.id); }}>
                    {shipDefinition.name}
                </ScriptedLink>
            </Typography>
            {showCost && reinforcement === null && (
                <Typography variant="body2" color="text.secondary">
                    {`指令Ｐｔ：${shipDefinition.cost}　合計：${shipDefinition.cost * count}`}
                </Typography>
            )}
            {showReinforcement && reinforcement === 'self' && (
                <Typography variant="body2" color="text.secondary">
                    {`増援`}
                </Typography>
            )}
            {showReinforcement && reinforcement === 'ally' && (
                <Typography variant="body2" color="text.secondary">
                    {`ユニオン増援Ａ`}
                </Typography>
            )}
            {showReinforcement && reinforcement === 'ally2' && (
                <Typography variant="body2" color="text.secondary">
                    {`ユニオン増援Ｂ`}
                </Typography>
            )}
            {showReinforcement && reinforcement === 'ally3' && (
                <Typography variant="body2" color="text.secondary">
                    {`ユニオン増援Ｃ`}
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
            {'外す'}
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
            {'最大'}
        </Button>
    );

    return (
        <>
            {verticalAlignment && (
                <Stack spacing={1}>
                    {shipContext}
                    <Paper variant="outlined" sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
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
                    {warningText}
                </Stack>
            )}
            {!verticalAlignment && (
                <Stack spacing={1}>
                    <Stack spacing={1} direction="row" flexWrap="wrap" alignItems="center">
                        <Box pb={1}>
                            <Stack spacing={1}>
                                {shipContext}
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'end', flexGrow: 1 }}>
                            <Paper variant="outlined" sx={{ display: 'inline-block' }}>
                                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                    {clearButton}
                                    {decreaseButton}
                                    {countIndicator}
                                    {increaseButton}
                                    {maxOuntButton}
                                </Stack>
                            </Paper>
                        </Box>
                    </Stack>
                    {warningText}
                </Stack>
            )}
        </>
    );
};
