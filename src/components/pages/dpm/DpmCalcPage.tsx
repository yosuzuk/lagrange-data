import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { createWeaponBaseProperties, createWeaponEnhancementProperties, createTargetProperties, createShipProperties, isVisibleWeaponBaseProperty, isVisibleShipProperty } from './utils/dpmCalcInputUtils';
import { IWeaponBaseProperties, IInputProperty, IShipProperties } from './types/IInputProperty';
import { PageFooter } from '../../pageStructure/PageFooter';
import { PropertiesForm } from './PropertiesForm';
import { usePropertyTabs } from './hooks/usePropertyTabs';
import { PropertyTabs } from './PropertyTabs';
import { ComputedProperties } from './ComputedProperties';

export const DpmCalcPage = () => {
    const [shipProperties, setShipProperties] = useState<IShipProperties>(() => createShipProperties());
    const [weaponBaseProperties, setWeaponBaseProperties] = useState<IWeaponBaseProperties>(() => createWeaponBaseProperties());

    const {
        tabIndex: enhancementTabIndex,
        canAddTab: canAddEnhancementTab,
        tabs: enhancementTabs,
        setTabIndex: setEnhancementTabIndex,
        addTab: addEnhancementTab,
        removeTab: removeEnhancementTab,
        renameTab: renameEnhancementTab,
        changeProperty: changeEnhancementProperty,
    } = usePropertyTabs({
        idPrefix: 'enhancementTab',
        tabNamePrefix: 'スキル設定',
        propertyFactoryFn: createWeaponEnhancementProperties,
    });

    const {
        tabIndex: attackTargetTabIndex,
        canAddTab: canAddAttackTargetTab,
        tabs: attackTargetTabs,
        setTabIndex: setAttackTargetTabIndex,
        addTab: addAttackTargetTab,
        removeTab: removeAttackTargetTab,
        renameTab: renameAttackTargetTab,
        changeProperty: changeAttackTargetProperty,
    } = usePropertyTabs({
        idPrefix: 'attackTargetTab',
        tabNamePrefix: '攻撃目標',
        propertyFactoryFn: createTargetProperties,
    });

    const handleChangeShipProperties = useCallback((newInputProperty: IInputProperty) => {
        setShipProperties(properties => ({
            ...properties,
            [newInputProperty.id]: newInputProperty,
        }));
    }, []);

    const handleChangeWeaponBaseProperties = useCallback((newInputProperty: IInputProperty) => {
        setWeaponBaseProperties(properties => ({
            ...properties,
            [newInputProperty.id]: newInputProperty,
        }));
    }, []);

    return (
        <>
            <NavigationBar currentRoute="/dpmCalc" />
            <PageContent>
                <Box component="div" p={1}>
                    <Stack pt={1} spacing={4}>
                        <Typography variant="body2">
                            {'こちらのDPM計算機では複数のスキル設定を同時に複数の攻撃目標に対して比較できます。'}
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant="body1">
                                {'艦船情報'}
                            </Typography>
                            <Paper>
                                <Box component="div" p={1}>
                                    <PropertiesForm
                                        properties={shipProperties}
                                        onChange={handleChangeShipProperties}
                                        isVisibleProperty={isVisibleShipProperty}
                                    />
                                </Box>
                            </Paper>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="body1">
                                {'武装情報（初期ステータス）'}
                            </Typography>
                            <Paper>
                                <Box component="div" p={1}>
                                    <PropertiesForm
                                        properties={weaponBaseProperties}
                                        onChange={handleChangeWeaponBaseProperties}
                                        isVisibleProperty={isVisibleWeaponBaseProperty}
                                    />
                                </Box>
                            </Paper>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="body1">
                                {'スキル'}
                            </Typography>
                            <Paper>
                                <PropertyTabs
                                    idPrefix="enhancementTab"
                                    tabs={enhancementTabs}
                                    tabIndex={enhancementTabIndex}
                                    canAddTab={canAddEnhancementTab}
                                    addTab={addEnhancementTab}
                                    removeTab={removeEnhancementTab}
                                    renameTab={renameEnhancementTab}
                                    changeProperty={changeEnhancementProperty}
                                    setTabIndex={setEnhancementTabIndex}
                                />
                            </Paper>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="body1">
                                {'攻撃目標'}
                            </Typography>
                            <Paper>
                                <PropertyTabs
                                    idPrefix="attackTargetTab"
                                    tabs={attackTargetTabs}
                                    tabIndex={attackTargetTabIndex}
                                    canAddTab={canAddAttackTargetTab}
                                    addTab={addAttackTargetTab}
                                    removeTab={removeAttackTargetTab}
                                    renameTab={renameAttackTargetTab}
                                    changeProperty={changeAttackTargetProperty}
                                    setTabIndex={setAttackTargetTabIndex}
                                />
                            </Paper>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="body1">
                                {'計算結果'}
                            </Typography>
                            <Paper>
                                <Box component="div" p={1}>
                                    <ComputedProperties
                                        shipProperties={shipProperties}
                                        weaponBaseProperties={weaponBaseProperties}
                                        enhancementTabs={enhancementTabs}
                                        attackTargetTabs={attackTargetTabs}
                                    />
                                </Box>
                            </Paper>
                        </Stack>
                        <Alert severity="warning">
                            <AlertTitle>{'現在この計算機では「命中率」と「回避率」を含まない計算をしています。'}</AlertTitle>
                            {'命中率と回避率を含めた計算を行う場合、ゲーム内では見れない隠しステータスを複数揃える必要があります。武器毎に設定されている「攻撃目標の艦種別の基礎命中率」と「対艦/対空/攻城基礎命中率」が不足しています。入手方法が難しく、武器の構成次第では逆算できない場合もあります。今後これらの隠しステータスを必要としない簡略化した計算式を使う「ノーマルモード」と全ての隠しステータスを入力できる「エキスパートモード」を分けて実装する予定です。'}
                        </Alert>
                    </Stack>
                </Box>
            </PageContent>
            <PageFooter />
        </>
    );
};

export default DpmCalcPage;
