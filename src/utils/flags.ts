export const flags = {
    englishByDefault: `${__APP_TARGET__}` === 'netlify',
    enableStats: true,
    dpmCalc: `${__APP_TARGET__}` === 'gh-pages',
    imageEdit: true,
    largeMapEdit: true,
    techPointConfig: true,
    serverResult: `${__APP_TARGET__}` === 'gh-pages',
} as const;
