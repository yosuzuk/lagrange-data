import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IShipSelection } from './types/IFleetSetup';

interface IProps {
    shipSelections?: IShipSelection[];
}

export const ShipCountList = (props: IProps) => {
    const { shipSelections } = props;

    return (
        <Stack spacing={1}>
            {shipSelections?.map(shipSelection => (
                <Stack
                    key={`${shipSelection.shipDefinition.id}_${shipSelection.reinforcement ?? 'initial'}`}
                    spacing={1}
                    direction="row"
                >
                    <Stack spacing={1} direction="row" flexWrap="wrap" sx={{ flexGrow: 1 }}>
                        <Box sx={{ width: '25px' }}>
                            <Typography variant="body2" textAlign="end">
                                {`${shipSelection.count}×`}
                            </Typography>
                        </Box>
                        <Typography variant="body2">
                            {shipSelection.shipDefinition.name}
                        </Typography>
                        {shipSelection.reinforcement === 'self' && (
                            <Typography variant="body2" noWrap={true}>
                                {'（増援）'}
                            </Typography>
                        )}
                        {shipSelection.reinforcement === 'ally' && (
                            <Typography variant="body2" noWrap={true}>
                                {'（ユニオン増援）'}
                            </Typography>
                        )}
                    </Stack>
                    <Box sx={{ width: '50px' }}>
                        {shipSelection.reinforcement === null && (
                            <Typography variant="body2" textAlign="end">
                                {`${shipSelection.shipDefinition.cost * shipSelection.count} Pt`}
                            </Typography>
                        )}
                    </Box>
                </Stack>
            ))}
        </Stack>
    );
}
