import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ReinforcementType } from './types/IFleetSetup';
import { IShipDefinition } from '../../../types/ShipDefinition';

interface IProps {
    shipDefinition: IShipDefinition;
    count: number;
    maxCount: number;
    reinforcement: ReinforcementType | null;
    showCost: boolean;
    showReinforcement: boolean;
    onChangeCount: (shipId: string, count: number) => void;
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

    return (
        <Paper variant="outlined">
            <Box p={1}>
                <Stack spacing={1} direction="row" flexWrap="wrap">
                    <Box pb={1}>
                        <Stack spacing={1}>
                            <Typography variant="body1">
                                {shipDefinition.name}
                            </Typography>
                            {showCost && (
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
                        </Stack>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'end', flexGrow: 1 }}>
                        <Paper variant="outlined" sx={{ display: 'inline-block' }}>
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                <Button
                                    onClick={() => onChangeCount(shipDefinition.id, 0)}
                                    disabled={count <= 0}
                                >
                                    {'外す'}
                                </Button>
                                <IconButton
                                    onClick={() => onChangeCount(shipDefinition.id, count - 1)}
                                    disabled={count <= 0}
                                >
                                    <IndeterminateCheckBoxIcon color="primary" />
                                </IconButton>
                                <Typography variant="body1" sx={{ minWidth: '55px' }} textAlign="center">
                                    <strong>{`${count} / ${maxCount}`}</strong>
                                </Typography>
                                <IconButton
                                    onClick={() => onChangeCount(shipDefinition.id, count + 1)}
                                    disabled={count >= maxCount}
                                >
                                    <AddBoxIcon color="primary" />
                                </IconButton>
                                <Button
                                    onClick={() => onChangeCount(shipDefinition.id, maxCount)}
                                    disabled={count >= maxCount}
                                >
                                    {'最大'}
                                </Button>
                            </Stack>
                        </Paper>
                    </Box>
                </Stack>
            </Box>
        </Paper>
    );
};
