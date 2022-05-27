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
                                {'所持している艦船/設計図'}
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
                                {'欲しい設計図'}
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
                                {'欲しくない設計図'}
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
                                {'被って欲しくない艦船'}
                            </Typography>
                        ),
                        details: (
                            <>
                                <MemoizedShipDataTable shipDefinitions={shipListState.unwishedByData} columnConfig={columnConfig} />
                                <Box pt={1}>
                                    <Typography variant="caption" align="right" paragraph={true}>
                                        {'※被りで技術ポイントか「出て欲しくない」サブモデルになる艦船が自動的に表示されます'}
                                    </Typography>
                                </Box>
                            </>
                        ),
                    }
                ]}
            />
            <Typography variant="caption" align="right" paragraph={true}>
                {'※設定データはブラウザのローカルストレージに保存されています。'}
            </Typography>
        </Stack>
    );
}
