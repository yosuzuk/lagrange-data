export const flags = {
    enableLanguageSelection: true,
    englishByDefault: `${__APP_TARGET__}` === 'netlify', 
    enableRepoLink: `${__APP_TARGET__}` === 'gh-pages',
    enableStats: true,
    enableModuleDescription: `${__APP_TARGET__}` === 'gh-pages',
} as const;
