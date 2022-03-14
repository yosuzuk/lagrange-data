import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { FleetSetupActionBar } from './FleetSetupActionBar';
import { useFleetSelection } from './hooks/useFleetSelection';
import { FleetProperties } from './FleetProperties';
import { ExpandStack } from '../../expandStack.tsx/ExpandStack';
import { GroupAndSortOption, groupShipsBy } from './utils/shipGroupingUtils';

export const FleetSetupPage = () => {
    const navigate = useNavigate();

    const {
        fleetSetups,
        fleetSetup,
        switchFleet,
    } = useFleetSelection();

    const [grouping, setGrouping] = useState<string>(GroupAndSortOption.GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME);
    const groupedShips = useMemo(() => groupShipsBy(grouping, fleetSetup), [fleetSetup, grouping]);

    const handleClickEdit = () => {
        navigate('/fleetSetup/edit/' + fleetSetup.key);
    };

    const handleClickShare = () => {
        // TODO implement
    };

    // const handleCloseShare = () => {
        // TODO implement
    // };

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
            <Container>
                <Box p={1}>
                    <Stack spacing={2}>
                        <FleetProperties fleetSetup={fleetSetup} />
                        {fleetSetup.ships.length > 0 ? (
                            <ExpandStack
                                key={groupedShips.groupedBy}
                                expandables={groupedShips.groups.map(group => ({
                                    id: group.id,
                                    initiallyOpened: true,
                                    summary: (
                                        <Typography variant="body1">
                                            {group.name}
                                        </Typography>
                                    ),
                                    details: (
                                        <div>{group.ships.length}</div>
                                    ),
                                    skip: group.ships.length === 0,
                                }))}
                            />
                        ) : (
                            <Paper>
                                <Box p={2}>
                                    <Stack spacing={1}>
                                        <Typography variant="body1">
                                            {'編成'}
                                        </Typography>
                                        <Alert severity="info">
                                            {'この艦隊にはまだ艦船が追加されていません。上の「編集」ボタンで編集モードに切り替えると艦船の追加や増援の設定等が行えます。'}
                                        </Alert>
                                    </Stack>
                                </Box>
                            </Paper>
                        )}
                        <Typography variant="caption" align="right" paragraph={true}>
                            {'※設定データはブラウザのローカルストレージに保存されています。'}
                        </Typography>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default FleetSetupPage;
