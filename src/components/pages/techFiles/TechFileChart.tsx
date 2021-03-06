import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { PieChart, Pie, Cell, PieLabel, Tooltip, ResponsiveContainer } from 'recharts';
import { ITechFileChances } from './types/IBlueprintChance';
import { formatChance } from './utils/techFileUtils';
import { ITechFile } from '../../../types/ITechFile';

const MODULE_COLOR = '#8042FF';
const TECHFILE_COLOR = '#FFBB28';
const WANTED_TECHFILE_COLOR = '#00C49F';
const UNWANTED_TECHFILE_COLOR = '#FF0000';
const TECHPOINT_COLOR = '#FF8282';
const TECH_OR_RESEARCH_POINT_COLOR = '#FF8042';
const SHOW_LABEL_THRESHOLD = 0.01;

interface IProps {
    techFile: ITechFile;
    techFileChances: ITechFileChances;
}

export const TechFileChart = (props: IProps) => {
    const { techFile, techFileChances } = props;

    const innerData = useMemo<Array<Record<string, unknown>>>(() => {
        return [
            {
                name: '追加システム',
                value: techFileChances.moduleChance,
                color: MODULE_COLOR,
            },
            {
                name: '設計図合計',
                value: techFileChances.blueprintChance,
                color: TECHFILE_COLOR,
            },
            {
                name: '技術/研究Pt',
                value: techFileChances.techOrResearchPointChance,
                color: TECH_OR_RESEARCH_POINT_COLOR,
            },
            {
                name: '技術Pt',
                value: techFile.chanceForTechPoint,
                color: TECHPOINT_COLOR,
            },
        ];
    }, [techFileChances, techFile]);

    const outerData = useMemo<Array<Record<string, unknown>>>(() => {
        const {
            moduleChance,
            blueprintChance,
            techOrResearchPointChance,
            wishedBlueprintChance,
            unwishedBlueprintChance,
        } = techFileChances;

        const remainingBlueprintChance = blueprintChance - wishedBlueprintChance - unwishedBlueprintChance;

        return [
            {
                name: moduleChance > SHOW_LABEL_THRESHOLD ? '追加システム' : '',
                value: moduleChance,
                color: MODULE_COLOR,
            },
            {
                name: wishedBlueprintChance > SHOW_LABEL_THRESHOLD ? '欲しい設計図' : '',
                value: wishedBlueprintChance,
                color: WANTED_TECHFILE_COLOR,
            },
            {
                name: remainingBlueprintChance > SHOW_LABEL_THRESHOLD ? '設計図' : '',
                value: remainingBlueprintChance,
                color: TECHFILE_COLOR,
            },
            {
                name: unwishedBlueprintChance > SHOW_LABEL_THRESHOLD ? '欲しくない設計図' : '',
                value: unwishedBlueprintChance,
                color: UNWANTED_TECHFILE_COLOR,
            },
            {
                name: techOrResearchPointChance > SHOW_LABEL_THRESHOLD ? '技術/研究Pt' : '',
                value: techOrResearchPointChance,
                color: TECH_OR_RESEARCH_POINT_COLOR,
            },
            {
                name: techFile.chanceForTechPoint > SHOW_LABEL_THRESHOLD ? '技術Pt' : '',
                value: techFile.chanceForTechPoint,
                color: TECHPOINT_COLOR,
            },
        ];
    }, [techFile, techFileChances]);

    return (
        <Box height={240}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={innerData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={50}
                    >
                        {innerData.map((entry, index) => (
                            <Cell key={`inner-cell-${index}`} fill={entry.color as string} />
                        ))}
                    </Pie>
                    <Pie
                        data={outerData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        label={renderLabelValue as PieLabel<Record<string, unknown>>}
                        labelLine={false}
                    >
                        {outerData.map((entry, index) => (
                            <Cell key={`outer-cell-${index}`} fill={entry.color as string} />
                        ))}
                    </Pie>
                    <Tooltip formatter={formatChance} separator={'：'} />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

function renderLabelValue(entry: Record<string, unknown>) {
    return `${entry.name}`.length > 0 ? entry.name : null;
}
