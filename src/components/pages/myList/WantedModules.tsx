import { Typography, Box } from '@mui/material';
import { useMemo } from 'react';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { useUserSettings } from '../../../userSettings/context/UserSettingsContext';
import { getWantedModules } from '../../../userSettings/utils/userSettingsUtils';

interface IProps {
    ship: IShipDefinition;
}

export const WantedModules = (props: IProps) => {
    const { ship } = props;
    const { userSettings } = useUserSettings();

    const wantedModules = useMemo(() => getWantedModules(ship, userSettings), [ship, userSettings]);

    if (wantedModules.length === 0) {
        return null;
    }

    return (
        <Box mt={0.5}>
            {wantedModules.map(module => (
                <Typography key={module.id} variant="body2" color="text.secondary">
                    <Typography variant="body2" component="span" color="text.secondary" sx={{ opacity: 0.5 }}>
                        {'┗ '}
                    </Typography>
                    {`${module.category}${module.categoryNumber} ${module.name}`}
                </Typography>
            ))}
        </Box>
    );
};
