import { ReactNode } from 'react';
import reactStringReplace from 'react-string-replace';
import { colorMap, getTextColorBasedOnBackgroundColor } from '../../../../utils/colorUtils';
import { parseLines, sectionKeywords } from './codeUtils';

export function hightlightCode(code: string): ReactNode {
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
                <span key={`point_${match}_${i}_${j}`} style={{ color: 'pink' }}>{match}</span>
            );
        }) as ReactNode[];
    });

    // chat colors
    Object.keys(colorMap).forEach((colorKey: string) => {
        lines = lines.map((line: ReactNode[], i: number) => {
            return reactStringReplace(line, new RegExp('(#' + colorKey + ')'), (match, j) => {
                const [backgroundColor, color] = colorMap[colorKey] ?? ['transparent', 'inherit'];
                return (
                    <span key={`keyword_${colorKey}_${i}_${j}`} style={{ backgroundColor, color }}>{match}</span>
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
                <span key={`color_${match}_${i}_${j}`} style={{ backgroundColor, color }}>{match}</span>
            );
        }) as ReactNode[];
    });

    // keywords
    sectionKeywords.forEach((keyword: string) => {
        lines = lines.map((line: ReactNode[], i: number) => {
            return reactStringReplace(line, new RegExp('(\\' + keyword + ')'), (match, j) => {
                return (
                    <span key={`keyword_${keyword}_${i}_${j}`} style={{ color: 'orange' }}>{match}</span>
                );
            }) as ReactNode[];
        });
    });

    return lines.flatMap(line => [...line, '\n']);
}
