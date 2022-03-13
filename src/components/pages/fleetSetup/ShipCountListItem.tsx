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

interface IProps {
    shipDefinition: IShipDefinition;
    count: number;
    maxCount: number;
    reinforcement: ReinforcementType | null;
    showCost: boolean;
    showReinforcement: boolean;
    onChangeCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

export const ShipCountListItem = (props: IProps) => {
    const {
        shipDefinition,
        count,
        maxCount,
        reinforcement,
        showCost,
        showReinforcement,
        onChangeCount,
    } = props;

    const theme = useTheme();
    const verticalAlignment = useMediaQuery(theme.breakpoints.down('sm'));

    const shipContext = (
        <>
            <Typography variant="body1">
                {shipDefinition.name}
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
                    {`ユニオン増援`}
                </Typography>
            )}
        </>
    )

    const clearButton = (
        <Button
            onClick={() => onChangeCount(shipDefinition.id, 0, reinforcement)}
            disabled={count <= 0}
        >
            {'外す'}
        </Button>
    );

    const decreaseButton = (
        <IconButton
            onClick={() => onChangeCount(shipDefinition.id, count - 1, reinforcement)}
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
            onClick={() => onChangeCount(shipDefinition.id, count + 1, reinforcement)}
            disabled={count >= maxCount}
        >
            <AddBoxIcon color={count >= maxCount ? 'disabled' : 'primary'} />
        </IconButton>
    );

    const maxOuntButton = (
        <Button
            onClick={() => onChangeCount(shipDefinition.id, maxCount, reinforcement)}
            disabled={count >= maxCount}
        >
            {'最大'}
        </Button>
    );

    return (
        <Paper variant="outlined">
            <Box p={1}>
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
                    </Stack>
                )}
                {!verticalAlignment && (
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
                )}
            </Box>
        </Paper>
    );
};
