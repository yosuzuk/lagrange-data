import { getCurrentLanguage } from '../../../../i18n';
import { serverResults } from './serverResultMaps';

interface ISelectableMap {
    name: string;
    url: string;
}

export function getExampleMaps() {
    return {
        // 'Full map', language === 'ja' ? 'fullMap_ja.txt' : 'fullMap.txt'
        fullMapExample: createExample({
            name: 'Full Map Example',
            filename: 'fullMap.txt',
            translated: {
                ja: {
                    name: 'サンプルマップ',
                    filename: 'fullMap_ja.txt',
                },
            },
        }),
        markerExample: createExample({
            name: 'Markers',
            filename: 'marker.txt',
            translated: {
                ja: {
                    name: 'マーカー',
                },
            },
        }),
        planetsExample: createExample({
            name: 'Planets',
            filename: 'planets.txt',
            translated: {
                ja: {
                    name: '惑星',
                },
            },
        }),
        regionsExample: createExample({
            name: 'Regions',
            filename: 'regions.txt',
            translated: {
                ja: {
                    name: '区域',
                },
            },
        }),
        citiesExample: createExample({
            name: 'Cities',
            filename: 'cities.txt',
            translated: {
                ja: {
                    name: '都市',
                },
            },
        }),
        baseExample: createExample({
            name: 'Player bases',
            filename: 'base.txt',
            translated: {
                ja: {
                    name: 'プレイヤー基地',
                },
            },
        }),
        outpostsExample: createExample({
            name: 'Player outposts',
            filename: 'outposts.txt',
            translated: {
                ja: {
                    name: '前哨基地',
                },
            },
        }),
        platformsExample: createExample({
            name: 'Mining platforms',
            filename: 'platforms.txt',
            translated: {
                ja: {
                    name: '採掘プラットフォーム',
                },
            },
        }),
        areasExample: createExample({
            name: 'Areas',
            filename: 'areas.txt',
            translated: {
                ja: {
                    name: 'エリア',
                },
            },
        }),
    } as const;
}

export function getTemplateMaps(): ISelectableMap[] {
    return [
        createExample({ name: '9000 x 9000', filename: 'template9k.txt' }),
        createExample({ name: '10000 x 10000', filename: 'template10k.txt' }),
    ]
}

export function getServerResultMaps(): ISelectableMap[] {
    return serverResults.map((result: [number, string, string, string]) => {
        const [serverId, serverName, timestamp, filename] = result;
        return {
            name: `${serverId} ${serverName} (${timestamp})`,
            url: window.location.origin + window.location.pathname + 'mapExamples/serverResults/' + filename,
        };
    });
}

interface ICreateExampleArgs {
    name: string;
    filename: string;
    translated?: Record<string, {
        name?: string;
        filename?: string;
    }>;
}

function createExample(args: ICreateExampleArgs): ISelectableMap {
    const { name, filename, translated } = args;
    const language = getCurrentLanguage();

    return {
        name: translated?.[language]?.name ?? name,
        url: window.location.origin + window.location.pathname + 'mapExamples/' + (translated?.[language]?.filename ?? filename),
    };
}

export function isExampleMapUrl(url: string): boolean {
    return url.includes(window.location.origin + window.location.pathname + 'mapExamples/');
}
