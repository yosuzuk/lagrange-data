import { ReactNode, Fragment } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TuneIcon from '@mui/icons-material/Tune';
import { IModuleSelection, IModuleUsage } from './types/IFleetSetup';

interface IProps {
    moduleSelection: IModuleSelection;
    staticModules: boolean;
}

export const ModuleSelection = (props: IProps) => {
    const { moduleSelection, staticModules } = props;
    const theme = useTheme();
    const verticalAlignment = useMediaQuery(theme.breakpoints.down('xs'));

    const usedModules: ReactNode[] = [];

    Object.keys(moduleSelection.groups).map(groupId => {
        Object.keys(moduleSelection.groups[groupId])
            .map(moduleId => moduleSelection.groups[groupId][moduleId])
            .forEach((moduleUsage: IModuleUsage) => {
                if (moduleUsage.usage === 'used') {
                    if (usedModules.length > 0) {
                        usedModules.push(
                            <Fragment key={`before_${moduleUsage.module.id}`}>
                                <Typography variant="body2" component="span">
                                    {'、'}
                                </Typography>
                            </Fragment>
                        );
                    }
                    usedModules.push(
                        <Fragment key={moduleUsage.module.id}>
                            <Typography variant="body2" component="span">
                                {`${moduleUsage.module.category}${moduleUsage.module.categoryNumber}`}
                            </Typography>
                        </Fragment>
                    );
                }
            });
    });

    return (
        <Stack
            spacing={1}
            direction={verticalAlignment ? 'column' : 'row'}
            alignItems={verticalAlignment ? 'flex-start' : 'center'}
            justifyContent="end"
            flexWrap="wrap"
        >
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                    {'システム：'}
                    {usedModules}
                </Typography>
            </Box>
            {!staticModules && (
                <Box sx={{ display: 'flex', alignContent: 'end' }}>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<TuneIcon />}
                        sx={{ whiteSpace: 'nowrap' }}
                        onClick={() => {}}
                    >
                        {'システムを換装'}
                    </Button>
                </Box>
            )}
        </Stack>
    );
};
