import { ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { IFleetSetup } from './types/IFleetSetup';
import { LabeledList } from '../../list/LabeledList';
import { t } from '../../../i18n';

interface IProps {
    fleetSetup: IFleetSetup;
    onChange: (fleetSetup: IFleetSetup) => void;
    errors: Record<string, string>;
    columnCount: number;
}

export const FleetPropertiesEdit = (props: IProps) => {
    const { fleetSetup, onChange, errors, columnCount } = props;

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...fleetSetup,
            name: event.target.value.trim(),
        });
    };

    const handleChangeMaxCost = (event: ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...fleetSetup,
            maxCost: Number(event.target.value),
        });
    };

    const handleChangeMaxReinforcement = (event: ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...fleetSetup,
            maxReinforcement: Number(event.target.value),
        });
    };

    const handleChangeMyListOnly = (event: ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...fleetSetup,
            myListOnly: event.target.value === 'myListOnly',
        });
    };

    return (
        <Paper>
            <Box p={1}>
                <LabeledList
                    sx={{
                        alignItems: 'center',
                    }}
                    offsetValue={false}
                    rowGap={1}
                    columnCount={columnCount}
                    rows={[
                        {
                            key: 'name',
                            label: t('fleetSetup.fleetName'),
                            value: (verticalAlignment: boolean) => (
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    value={fleetSetup.name}
                                    onChange={handleChangeName}
                                    error={!!errors['name']}
                                    helperText={errors['name']}
                                    fullWidth={verticalAlignment}
                                />
                            ),
                        },
                        {
                            key: 'reinforcementCount',
                            label: t('fleetSetup.maxReinforcementCount'),
                            value: (verticalAlignment: boolean) => (
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    select={true}
                                    value={fleetSetup.maxReinforcement}
                                    onChange={handleChangeMaxReinforcement}
                                    error={!!errors['maxReinforcement']}
                                    helperText={errors['maxReinforcement']}
                                    fullWidth={verticalAlignment}
                                    SelectProps={{
                                        renderValue: () => (
                                            <Typography variant="body1" whiteSpace="normal">
                                                {fleetSetup.maxReinforcement}
                                            </Typography>
                                        )
                                    }}
                                >
                                    {[5, 6, 7, 9, 10].map(count => (
                                        <MenuItem value={`${count}`} key={`reinforcementCount${count}`}>
                                            {t('fleetSetup.shipCount', { value: count })}
                                        </MenuItem>    
                                    ))}
                                </TextField>
                            ),
                        },
                        {
                            key: 'maxCost',
                            label: t('fleetSetup.maxCommandPoints'),
                            value: (verticalAlignment: boolean) => (
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    select={true}
                                    value={fleetSetup.maxCost}
                                    onChange={handleChangeMaxCost}
                                    error={!!errors['maxCost']}
                                    helperText={errors['maxCost']}
                                    fullWidth={verticalAlignment}
                                    SelectProps={{
                                        renderValue: () => (
                                            <Typography variant="body1" whiteSpace="normal">
                                                {fleetSetup.maxCost}
                                            </Typography>
                                        )
                                    }}
                                >
                                    {[450, 430, 415, 400, 350, 330, 315, 300].map(maxCost => (
                                        <MenuItem value={`${maxCost}`} key={`maxCost${maxCost}`}>
                                            {maxCost}
                                        </MenuItem>    
                                    ))}
                                </TextField>
                            ),
                        },
                        {
                            key: 'myListOnly',
                            label: t('fleetSetup.availableShipsForAdding'),
                            value: (verticalAlignment: boolean) => (
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    select={true}
                                    value={fleetSetup.myListOnly ? 'myListOnly' : 'all'}
                                    onChange={handleChangeMyListOnly}
                                    error={!!errors['myListOnly']}
                                    helperText={errors['myListOnly']}
                                    fullWidth={verticalAlignment}
                                    SelectProps={{
                                        renderValue: () => (
                                            <Typography variant="body1" whiteSpace="normal">
                                                {fleetSetup.myListOnly ? t('label.acquiredShips') : t('label.allShips')}
                                            </Typography>
                                        )
                                    }}
                                >
                                    <MenuItem value={'all'}>
                                        {t('label.allShips')}
                                    </MenuItem>
                                    <MenuItem value={'myListOnly'}>
                                        {t('label.acquiredShips')}
                                    </MenuItem>
                                </TextField>
                            ),
                        },
                    ]}
                />
            </Box>
        </Paper>
    );
}
