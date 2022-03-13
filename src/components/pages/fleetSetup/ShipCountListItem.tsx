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

interface IProps {
    name: string;
    cost: number;
    count: number;
    maxCount: number;
    reinforcement: ReinforcementType | null;
    showCost: boolean;
    showReinforcement: boolean;
}

export const ShipCountListItem = (props: IProps) => {
    const { name, cost, count, maxCount, reinforcement, showCost, showReinforcement } = props;
    return (
        <Paper variant="outlined">
            <Box p={1}>
                <Stack spacing={1} direction="row" flexWrap="wrap">
                    <Box pb={1}>
                        <Stack spacing={1}>
                            <Typography variant="body1">
                                {name}
                            </Typography>
                            {showCost && (
                                <Typography variant="body2" color="text.secondary">
                                    {`指令Ｐｔ：${cost}　合計：${cost * count}`}
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
                                <Button>
                                    {'外す'}
                                </Button>
                                <IconButton>
                                    <IndeterminateCheckBoxIcon color="primary" />
                                </IconButton>
                                <Typography variant="body1">
                                    <strong>{`${count} / ${maxCount}`}</strong>
                                </Typography>
                                <IconButton>
                                    <AddBoxIcon color="primary" />
                                </IconButton>
                                <Button>
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
