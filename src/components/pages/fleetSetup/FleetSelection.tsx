import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { IFleetSetup } from './types/IFleetSetup';
import { renderFleetShipCount } from './utils/fleetSetupUtils';

interface IProps {
    fleetSetups: IFleetSetup[];
    fleetSetup: IFleetSetup;
    onChange: (fleetKey: string) => void;
}

export const FleetSelection = (props: IProps) => {
    const { fleetSetups, fleetSetup, onChange } = props;

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="fleetSelectionLabel">{'艦隊'}</InputLabel>
            <Select
                labelId="fleetSelectionLabel"
                id="fleetSelection"
                value={fleetSetup.key}
                label={'艦隊'}
                onChange={handleChange}
                autoWidth={true}
                renderValue={(value: string) => (
                    <Typography variant="body1" whiteSpace="normal" data-value={value}>
                        {fleetSetup.name}
                    </Typography>
                )}
            >
                {fleetSetups.flatMap(availableFleetSetup => [
                    <MenuItem key={availableFleetSetup.key} value={availableFleetSetup.key}>
                        <ListItemText
                            primary={(
                                <Typography variant="body1" gutterBottom={true} whiteSpace="normal">
                                    {availableFleetSetup.name}
                                </Typography>
                            )}
                            secondary={(
                                <Typography variant="body1" color="text.secondary" whiteSpace="normal">
                                    {renderFleetShipCount(availableFleetSetup)}
                                </Typography>
                            )}
                        />
                    </MenuItem>,
                    <Divider key={`${availableFleetSetup.key}-divider`} />
                ])}
            </Select>
        </FormControl>
    );
}
