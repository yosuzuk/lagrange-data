import { ReactNode, memo } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IShipListState } from './types/IShipListState';
import { IColumnConfig } from '../../columns/types/IColumnConfig';
import { ShipDataTable } from '../shipData/ShipDataTable';
import { ExpandStack } from '../../expandStack.tsx/ExpandStack';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { AcquiredModules } from './AcquiredModules';
import { WantedModules } from './WantedModules';
import { t } from '../../../i18n';

const MemoizedShipDataTable = memo(ShipDataTable);

interface IProps {
    shipListState: IShipListState;
    columnConfig: IColumnConfig;
}

export const MyListView = (props: IProps) => {
    const { shipListState, columnConfig } = props;

    return (
        <Stack spacing={1}>
            <ExpandStack
                expandables={[
                    {
                        id: 'possessed-ships',
                        initiallyOpened: true,
                        summary: (
                            <Typography variant="body1">
                                {t('label.acquiredShipsAndBlueprints')}
                            </Typography>
                        ),
                        details: (
                            <MemoizedShipDataTable
                                shipDefinitions={shipListState.possessed}
                                columnConfig={columnConfig}
                                decorateName={(name: ReactNode, ship: IShipDefinition) => (
                                    <>
                                        {name}
                                        <AcquiredModules ship={ship} />
                                    </>
                                )}
                            />
                        ),
                    },
                    {
                        id: 'wished-ships',
                        initiallyOpened: false,
                        summary: (
                            <Typography variant="body1">
                                {t('label.wantedBlueprints')}
                            </Typography>
                        ),
                        details: (
                            <MemoizedShipDataTable
                                shipDefinitions={shipListState.wished}
                                columnConfig={columnConfig}
                                decorateName={(name: ReactNode, ship: IShipDefinition) => (
                                    <>
                                        {name}
                                        <WantedModules ship={ship} />
                                    </>
                                )}
                            />
                        ),
                    },
                    {
                        id: 'unwished-by-user-ships',
                        initiallyOpened: false,
                        summary: (
                            <Typography variant="body1">
                                {t('label.unwantedBlueprints')}
                            </Typography>
                        ),
                        details: (
                            <MemoizedShipDataTable shipDefinitions={shipListState.unwishedByUser} columnConfig={columnConfig} />
                        ),
                    },
                    {
                        id: 'unwished-by-data-ships',
                        initiallyOpened: false,
                        summary: (
                            <Typography variant="body1">
                                {t('myList.unwantedDuplicates')}
                            </Typography>
                        ),
                        details: (
                            <>
                                <MemoizedShipDataTable shipDefinitions={shipListState.unwishedByData} columnConfig={columnConfig} />
                                <Box pt={1}>
                                    <Typography variant="caption" align="right" paragraph={true}>
                                        {t('myList.unwantedDuplicatesFootnote')}
                                    </Typography>
                                </Box>
                            </>
                        ),
                    }
                ]}
            />
            <Typography variant="caption" align="right" paragraph={true}>
                {t('myList.pageFootnote')}
            </Typography>
        </Stack>
    );
}
