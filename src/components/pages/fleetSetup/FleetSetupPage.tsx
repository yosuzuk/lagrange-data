import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { NavigationBar } from '../../navigation/NavigationBar';
import { FleetSetupActionBar } from './FleetSetupActionBar';
import { useFleetSelection } from './hooks/useFleetSelection';
import { FleetProperties } from './FleetProperties';
import { ExpandStack } from '../../expandStack.tsx/ExpandStack';
import { GroupAndSortOption, groupShipsBy } from './utils/shipGroupingUtils';
import { ShipCountList } from './ShipCountList';
import { FleetSetupSharingDialog } from './FleetSetupSharingDialog';
import { IGroupedShips } from './types/IGroupedShips';
import { PageContent } from '../../pageStructure/PageContent';
import { PageFooter } from '../../pageStructure/PageFooter';
import { isLanguageWithWhitespace, t } from '../../../i18n';

export const FleetSetupPage = () => {
    const navigate = useNavigate();
    const { fleetKey } = useParams();

    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const [openShareDialog, setOpenShareDialog] = useState<boolean>(false);

    const {
        fleetSetups,
        fleetSetup,
        switchFleet,
    } = useFleetSelection({
        initialFleetKey: fleetKey ?? null,
    });

    const [grouping, setGrouping] = useState<string>(GroupAndSortOption.GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME);
    const groupedShips = useMemo<IGroupedShips>(() => groupShipsBy(grouping, fleetSetup), [fleetSetup, grouping]);

    const handleClickEdit = () => {
        navigate('/fleetSetup/edit/' + fleetSetup.key);
    };

    const handleClickShare = () => {
        setOpenShareDialog(true);
    };

    const handleCloseShare = () => {
        setOpenShareDialog(false);
    };

    const groupDirection = largeScreen && groupedShips.groupedBy === GroupAndSortOption.GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME ? 'row' : 'column';

    return (
        <>
            <NavigationBar currentRoute="/fleetSetup" />
            <FleetSetupActionBar
                fleetSetups={fleetSetups}
                fleetSetup={fleetSetup}
                grouping={grouping}
                onChangeFleet={switchFleet}
                onChangeGrouping={setGrouping}
                onEdit={handleClickEdit}
                onShare={handleClickShare}
            />
            <PageContent disableContainer={groupDirection === 'row'}>
                <Box p={1}>
                    <Stack spacing={1}>
                        <FleetProperties fleetSetup={fleetSetup} />
                        {fleetSetup.ships.length > 0 ? (
                            <>
                                {groupDirection === 'row' ? (
                                    <Stack spacing={1} direction="row" sx={{ width: '100%' }}>
                                        {groupedShips.groups.map(group => (
                                            <Paper key={group.id} sx={{ width: `${100 / groupedShips.groups.length}%` }}>
                                                <Box p={1}>
                                                    <Stack spacing={1}>
                                                        <Typography variant="body1">
                                                            {`${group.name}${group.count > 0 ? `（${group.count}隻）` : ''}`}
                                                        </Typography>
                                                        <Divider />
                                                        <ShipCountList shipSelections={group.ships} />
                                                    </Stack>
                                                </Box>
                                            </Paper>
                                        ))}
                                    </Stack>
                                ) : (
                                    <ExpandStack
                                        key={groupedShips.groupedBy}
                                        expandables={groupedShips.groups.map(group => ({
                                            id: group.id,
                                            initiallyOpened: true,
                                            summary: (
                                                <Typography variant="body1">
                                                    {group.name}
                                                    {isLanguageWithWhitespace() && (
                                                        <span>&nbsp;</span>
                                                    )}
                                                    {group.count > 0 ? t('fleetSetup.shipCountBrackets', { value: group.count }) : ''}
                                                </Typography>
                                            ),
                                            details: (
                                                <ShipCountList shipSelections={group.ships} />
                                            ),
                                            skip: group.ships.length === 0,
                                        }))}
                                    />
                                )}
                            </>
                        ) : (
                            <Paper>
                                <Box p={2}>
                                    <Stack spacing={1}>
                                        <Typography variant="body1">
                                            {t('fleetSetup.fleetFormation')}
                                        </Typography>
                                        <Alert severity="info">
                                            {t('fleetSetup.fleetEmptyNotice')}
                                        </Alert>
                                    </Stack>
                                </Box>
                            </Paper>
                        )}
                        <Typography variant="caption" align="right" paragraph={true}>
                            {t('fleetSetup.pageFootnote')}
                        </Typography>
                    </Stack>
                </Box>
            </PageContent>
            {openShareDialog && (
                <FleetSetupSharingDialog
                    fleetSetup={fleetSetup}
                    groupedShips={groupedShips}
                    onClose={handleCloseShare}
                />
            )}
            <PageFooter disableContainer={groupDirection === 'row'} />
        </>
    );
}

export default FleetSetupPage;
