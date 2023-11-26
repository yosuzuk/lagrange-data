import { getCurrentLanguage } from '../../../../i18n';
import { serverResults } from './serverResultMaps';
import { serverResults2 } from './serverResultMaps2';
import { serverResults3 } from './serverResultMaps3';
import { serverResults4 } from './serverResultMaps4';
import { serverResultsN } from './serverResultMapsN';

interface ISelectableMap {
    name: string;
    url: string;
}

export function getExampleMaps() {
    return {
        fullMapExample: createExample({
            name: 'Example Map: Sagittarius 515',
            filename: 'fullMap.txt',
            translated: {
                ja: {
                    name: 'サンプルマップ・いて座515',
                    filename: 'fullMap_ja.txt',
                },
            },
        }),
        fullMapExample2: createExample({
            name: 'Example Map: Pisces 713',
            filename: 'fullMap2.txt',
            translated: {
                ja: {
                    name: 'サンプルマップ・うお座713',
                    filename: 'fullMap2_ja.txt',
                },
            },
        }),
        pioneerSystem: createExample({
            name: 'Example Map: Pioneer System',
            filename: 'pioneersSystem.txt',
            translated: {
                ja: {
                    name: 'サンプルマップ・パイオニア星系',
                    filename: 'pioneersSystem_ja.txt',
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
        hivesExample: createExample({
            name: 'Hives',
            filename: 'hives.txt',
            translated: {
                ja: {
                    name: 'コロニー',
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
        shapesExample: createExample({
            name: 'Custom Shapes',
            filename: 'customShapes.txt',
            translated: {
                ja: {
                    name: 'カスタムシェイプ',
                },
            },
        }),
        overlayExample: createExample({
            name: 'Overlay',
            filename: 'overlay.txt',
            translated: {
                ja: {
                    name: 'オーバーレイ',
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

export function getPhaseOneServerResultMaps(): ISelectableMap[] {
    return getServerResultMaps(serverResults);
}

export function getNonPhaseOneServerResultMaps(): ISelectableMap[] {
    return getServerResultMaps([
        ...serverResults2,
        ...serverResults3,
        ...serverResults4,
        ...serverResultsN,
    ]);
}

function getServerResultMaps(serverList: [number, string, string, string][]): ISelectableMap[] {
    const sorted = [...serverList].sort((a, b) => a[2].localeCompare(b[2]));

    return sorted.map(result => {
        const [serverId, serverName, timestamp, filename] = result;
        return {
            name: `${serverId} ${serverName} (${timestamp})`,
            url: window.location.origin + window.location.pathname + 'mapExamples/serverResults/' + encodeURI(filename),
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
