import { useMemo } from 'react';
import { PieChart, Pie, Cell, PieLabel, Tooltip, ResponsiveContainer } from 'recharts';
import { ITechFileChances } from './types/IBlueprintChance';
import { formatChance } from './utils/techFileUtils';

const MODULE_COLOR = '#8042FF';
const TECHFILE_COLOR = '#FFBB28';
const WANTED_TECHFILE_COLOR = '#00C49F';
const UNWANTED_TECHFILE_COLOR = '#FF0000';
const TECHPOINT_COLOR = '#FF8042';
const SHOW_LABEL_THRESHOLD = 0.01;

interface IProps {
    techFileChances: ITechFileChances;
}

export const TechFileChart = (props: IProps) => {
    const { techFileChances } = props;

    const innerData = useMemo<Array<Record<string, unknown>>>(() => {
        return [
            {
                name: '追加モジュール',
                value: techFileChances.moduleChance,
                color: MODULE_COLOR,
            },
            {
                name: '設計図合計',
                value: techFileChances.blueprintChance,
                color: TECHFILE_COLOR,
            },
            {
                name: '技術ポイント',
                value: techFileChances.finalTechPointChance,
                color: TECHPOINT_COLOR,
            },
        ];
    }, [techFileChances]);

    const outerData = useMemo<Array<Record<string, unknown>>>(() => {
        const {
            moduleChance,
            blueprintChance,
            finalTechPointChance,
            wishedBlueprintChance,
            unwishedBlueprintChance,
        } = techFileChances;

        const remainingBlueprintChance = blueprintChance - wishedBlueprintChance - unwishedBlueprintChance;

        return [
            {
                name: moduleChance > SHOW_LABEL_THRESHOLD ? '追加モジュール' : '',
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
                name: finalTechPointChance > SHOW_LABEL_THRESHOLD ? '技術ポイント' : '',
                value: finalTechPointChance,
                color: TECHPOINT_COLOR,
            },
        ];
    }, [techFileChances]);

    return (
        <ResponsiveContainer>
            <PieChart width={400} height={400}>
                <Pie
                    data={innerData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
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
                    innerRadius={70}
                    outerRadius={90}
                    label={renderLabelValue as PieLabel<Record<string, unknown>>}
                    labelLine={false}
                >
                    {outerData.map((entry, index) => (
                        <Cell key={`outer-cell-${index}`} fill={entry.color as string} />
                    ))}
                </Pie>
                <Tooltip formatter={formatChance} />
            </PieChart>
        </ResponsiveContainer>
    );
};

function renderLabelValue(entry: Record<string, unknown>) {
    return `${entry.name}`.length > 0 ? entry.name : null;
}

/*
const CustomizedLabel = (props: any) => {
    const { x, y, fill, name } = props;
    return (
        <text x={x} y={y} fontSize='0.6rem' fill={fill} textAnchor="middle">
            {name}
        </text>
    );
};
*/