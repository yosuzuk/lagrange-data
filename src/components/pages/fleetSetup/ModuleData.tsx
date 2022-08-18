import { ReactNode, Fragment, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TuneIcon from '@mui/icons-material/Tune';
import { IModuleSelection, IModuleUsage, ReinforcementType } from './types/IFleetSetup';
import { ModuleSelectionDialog } from './ModuleSelectionDialog';
import { getModuleName } from '../../../utils/shipDefinitionUtils';

interface IProps {
    shipId: string;
    reinforcement: ReinforcementType | null;
    moduleSelection: IModuleSelection;
    myListOnly: boolean;
    onChange: (shipId: string, reinforcement: ReinforcementType | null, moduleSelection: IModuleSelection) => void;
}

export const ModuleData = (props: IProps) => {
    const { shipId, reinforcement, moduleSelection, myListOnly, onChange } = props;
    const theme = useTheme();
    const verticalAlignment = useMediaQuery(theme.breakpoints.down('xs'));

    const [selectionDialogOpened, setSelectionDialogOpened] = useState<boolean>(false);

    const handleOpenDialog = () => {
        setSelectionDialogOpened(true);
    };

    const handleCloseDialog = () => {
        setSelectionDialogOpened(false);
    };

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
                            <Tooltip
                                arrow={true}
                                disableFocusListener={true}
                                title={getModuleName(shipId, moduleUsage.module)}
                            >
                                <Typography variant="body2" component="span">
                                    {`${moduleUsage.module.category}${moduleUsage.module.categoryNumber}`}
                                </Typography>
                            </Tooltip>
                        </Fragment>
                    );
                }
            });
    });

    return (
        <>
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
                {!moduleSelection.static && (
                    <Box sx={{ display: 'flex', alignContent: 'end' }}>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<TuneIcon />}
                            sx={{ whiteSpace: 'nowrap' }}
                            onClick={handleOpenDialog}
                        >
                            {'システムを換装'}
                        </Button>
                    </Box>
                )}
            </Stack>
            {selectionDialogOpened && (
                <ModuleSelectionDialog
                    shipId={shipId}
                    reinforcement={reinforcement}
                    moduleSelection={moduleSelection}
                    myListOnly={myListOnly}
                    onChange={onChange}
                    onClose={handleCloseDialog}
                />
            )}
        </>
    );
};
