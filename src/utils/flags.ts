export const flags = {
    englishByDefault: `${__APP_TARGET__}` === 'netlify', 
    enableStats: true,
    dpmCalc: `${__APP_TARGET__}` === 'netlify',
} as const;
