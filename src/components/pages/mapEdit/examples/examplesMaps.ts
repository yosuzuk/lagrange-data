export function getExampleMaps() {
    return {
        fullMapExample: createExample('Full map', 'fullMap.txt'),
        markerExample: createExample('Marker', 'marker.txt'),
        planetsExample: createExample('Planets', 'planets.txt'),
        regionsExample: createExample('Regions', 'regions.txt'),
        areaExample: createExample('Areas', 'areas.txt'),
        baseExample: createExample('Player bases', 'base.txt'),
    } as const;
}

export function getMapTemplateUrl() {
    return window.location.origin + window.location.pathname + 'assets/mapExamples/template.txt';
}

function createExample(name: string, filename: string) {
    return {
        name,
        url: window.location.origin + window.location.pathname + 'assets/mapExamples/' + filename,
    };
}
