import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { IFleetSetup } from './types/IFleetSetup';
import { LabeledList } from '../../list/LabeledList';
import { getFleetShipCount } from './utils/fleetSetupUtils';

interface IProps {
    fleetSetup: IFleetSetup;
    onStartRenaming: () => void;
}

export const FleetPropertiesEdit = (props: IProps) => {
    const { fleetSetup, onStartRenaming } = props;

    return (
        <Paper>
            <Box p={1}>
                <LabeledList
                    rows={[
                        {
                            key: 'name',
                            label: '艦隊名',
                            value: (
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <div>
                                        <Typography variant="body2">
                                            {fleetSetup.name}
                                        </Typography>
                                    </div>
                                    <div>
                                        <IconButton onClick={onStartRenaming}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                </Stack>
                            ),
                        },
                        {
                            key: 'reinforcementCount',
                            label: '増援引き受け艦数',
                            value: 5
                        }
                    ]}
                />
            </Box>
        </Paper>
    );
}
