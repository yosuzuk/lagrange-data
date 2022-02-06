import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ITechFile } from '../../../types/ITechFile';
import { TechFileSelection } from './TechFileSelection';
import { TechFileDetails } from './TechFileDetails';
import { techFiles } from '../../../data/techFiles';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';

export const BoxChancePage = () => {
    const [techFile, setTechFile] = useState<ITechFile>(techFiles[0]);

    return (
        <>
            <NavigationBar currentRoute="/techFiles" />
            <Container>
                <Box p={1}>
                    <Stack pt={1} pb={2} spacing={2}>
                        <Typography variant="body2">
                            {'ここでは技術ファイル内の細かい確率を表示しています。'}
                        </Typography>
                        <Typography variant="body2">
                            {'研究協定では各艦船の確率に「重み」があることが判明しています。確証はありませんが、同じ重みが技術ファイルにも適応されているようです。ここでの計算には研究協定の確率から逆算で判明した重みを使用しています。'}
                        </Typography>
                        <Typography variant="body2">
                            {'設計図、サブモデル、追加モジュールの確率は所持状態によって変動します。既に所持している艦船はマイリストで設定してください。'}
                        </Typography>
                    </Stack>
                    <Stack spacing={1}>
                        <Paper>
                            <Box p={1}>
                                <TechFileSelection
                                    id="tech-file-selection"
                                    techFile={techFile}
                                    onChange={setTechFile}
                                />
                            </Box>
                        </Paper>
                        <TechFileDetails techFile={techFile} />
                        <Typography variant="caption" align="right" paragraph={true}>
                            {'※艦種をタップすると詳細が表示されます。'}
                        </Typography>
                    </Stack>
                </Box>
            </Container>
        </>
    );
};

export default BoxChancePage;
