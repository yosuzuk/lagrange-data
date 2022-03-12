import { ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { IFleetSetup } from './types/IFleetSetup';
import { LabeledList } from '../../list/LabeledList';

interface IProps {
    fleetSetup: IFleetSetup;
    onChange: (fleetSetup: IFleetSetup) => void;
    errors: Record<string, string>;
}

export const FleetPropertiesEdit = (props: IProps) => {
    const { fleetSetup, onChange, errors } = props;

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

    return (
        <Paper>
            <Box p={1}>
                <LabeledList
                    sx={{
                        alignItems: 'center',
                    }}
                    offsetValue={false}
                    rowGap={1}
                    rows={[
                        {
                            key: 'name',
                            label: '艦隊名',
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
                            key: 'maxCost',
                            label: '艦隊司令pt上限',
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
                                >
                                    <MenuItem value={'450'}>
                                        {'４５０（戦地指令センターに結合）'}
                                    </MenuItem>
                                    <MenuItem value={'430'}>
                                        {'４３０（協同作戦機構に結合）'}
                                    </MenuItem>
                                    <MenuItem value={'415'}>
                                        {'４１５（遠距離指令局に結合）'}
                                    </MenuItem>
                                    <MenuItem value={'400'}>
                                        {'４００（結合効果無し）'}
                                    </MenuItem>
                                    <MenuItem value={'350'}>
                                        {'３５０（戦地指令センターに結合）'}
                                    </MenuItem>
                                    <MenuItem value={'330'}>
                                        {'３３０（協同作戦機構に結合）'}
                                    </MenuItem>
                                    <MenuItem value={'315'}>
                                        {'３１５（遠距離指令局に結合）'}
                                    </MenuItem>
                                    <MenuItem value={'300'}>
                                        {'３００（結合効果無し）'}
                                    </MenuItem>
                                </TextField>
                            ),
                        },
                        {
                            key: 'reinforcementCount',
                            label: '引き受け増援艦船数',
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
                                >
                                    <MenuItem value={'5'}>
                                        {'５隻（結合効果無し）'}
                                    </MenuItem>
                                    <MenuItem value={'6'}>
                                        {'６隻（小型補給基地に結合）'}
                                    </MenuItem>
                                    <MenuItem value={'9'}>
                                        {'９隻（中継補給施設に結合）'}
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