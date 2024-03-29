import { ReactNode } from 'react';
import reactStringReplace from 'react-string-replace';
import { styled } from '@mui/material/styles';
import { colorMap, getTextColorBasedOnBackgroundColor } from '../../../../utils/colorUtils';
import { parseLines, deprecatedSectionKeywords, sectionKeywords } from './codeUtils';

export const FOCUSED_LINE_ID = 'focusedLine';

const beforeShared = `
    position: absolute;
    right: 100%;
    margin-right: 10px;
    text-align: right;
    opacity: .5;
    user-select: none;
    counter-increment: line;
    content: counter(line);
    color: white;
`;

const CodeLine = styled('span')`
    &:before {
        ${beforeShared}
    }
`;

const FocusedCodeLine = styled('span')`
    &:before {
        ${beforeShared}
        background-color: blue;
    }
`;

const ErrorCodeLine = styled('span')`
    &:before {
        ${beforeShared}
        background-color: red;
    }
`;

export function hightlightCode(code: string, focusedLineNumber: number | null, errorLineNumber: number | null): ReactNode {
    let lines: Array<ReactNode[]> = parseLines(code).map(l => [l]);

    // comments
    lines = lines.map((line: ReactNode[], i: number) => {
        return reactStringReplace(line, new RegExp('(\/\/.*)$'), (match, j) => {
            return (
                <span key={`point_${match}_${i}_${j}`} style={{ color: 'grey' }}>{match}</span>
            );
        }) as ReactNode[];
    });

    // coordinates
    lines = lines.map((line: ReactNode[], i: number) => {
        return reactStringReplace(line, new RegExp('([\()][0-9]+\,[0-9]+[\)])'), (match, j) => {
            return (
                <span key={`point_${match}_${i}_${j} `} style={{ color: 'pink' }}>{match}</span>
            );
        }) as ReactNode[];
    });

    // chat colors
    Object.keys(colorMap).forEach((colorKey: string) => {
        lines = lines.map((line: ReactNode[], i: number) => {
            return reactStringReplace(line, new RegExp('(#' + colorKey + ')'), (match, j) => {
                const [backgroundColor, color] = colorMap[colorKey] ?? ['transparent', 'inherit'];
                return (
                    <span key={`keyword_${colorKey}_${i}_${j} `} style={{ backgroundColor, color }}>{match}</span>
                );
            }) as ReactNode[];
        });
    });

    // hex colors
    lines = lines.map((line: ReactNode[], i: number) => {
        return reactStringReplace(line, new RegExp('(\#[c][A-F0-9]{6})'), (match, j) => {
            const backgroundColor = '#' + match.substring(2);
            const color = getTextColorBasedOnBackgroundColor(backgroundColor);
            return (
                <span key={`color_${match}_${i}_${j} `} style={{ backgroundColor, color }}>{match}</span>
            );
        }) as ReactNode[];
    });

    // keywords
    [...sectionKeywords, ...deprecatedSectionKeywords].forEach((keyword: string) => {
        lines = lines.map((line: ReactNode[], i: number) => {
            return reactStringReplace(line, new RegExp('(\\' + keyword + ')'), (match, j) => {
                const isRemovedKeyword = deprecatedSectionKeywords.includes(keyword);
                return (
                    <span
                        key={`keyword_${keyword}_${i}_${j} `}
                        style={{
                            color: 'orange',
                            textDecorationLine: isRemovedKeyword ? 'line-through' : 'none',
                        }}
                    >
                        {match}
                    </span>
                );
            }) as ReactNode[];
        });
    });
    return lines.flatMap((line, index) => {
        if (errorLineNumber === index + 1) {
            return [
                <ErrorCodeLine id={FOCUSED_LINE_ID} key={`line_${index} `}>{line}</ErrorCodeLine>,
                '\n'
            ];
        }
        if (focusedLineNumber === index + 1) {
            return [
                <FocusedCodeLine id={FOCUSED_LINE_ID} key={`line_${index} `}>{line}</FocusedCodeLine>,
                '\n'
            ];
        }
        return [
            <CodeLine key={`line_${index} `}>{line}</CodeLine>,
            '\n'
        ];
    });
}
