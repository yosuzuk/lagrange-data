interface IExampleMap {
    name: string;
    url: string;
}

export function getExampleMaps() {
    return {
        fullMapExample: createExample('Full map', 'fullMap.txt'),
        markerExample: createExample('Marker', 'marker.txt'),
        planetsExample: createExample('Planets', 'planets.txt'),
        regionsExample: createExample('Regions', 'regions.txt'),
        citiesExample: createExample('Cities', 'cities.txt'),
        baseExample: createExample('Player bases', 'base.txt'),
        areaExample: createExample('Areas', 'areas.txt'),
    } as const;
}

export function getTemplateMaps(): IExampleMap[] {
    return [
        createExample('9000 x 9000', 'template9k.txt'),
        createExample('10000 x 10000', 'template10k.txt'),
    ]
}

function createExample(name: string, filename: string): IExampleMap {
    return {
        name,
        url: window.location.origin + window.location.pathname + 'assets/mapExamples/' + filename,
    };
}
