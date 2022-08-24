export const flags = {
    enableLanguageSelection: true,
    englishByDefault: false, // `${__APP_TARGET__}` === 'netlify', 
    enableRepoLink: `${__APP_TARGET__}` === 'gh-pages',
    enableStats: true,
} as const;
