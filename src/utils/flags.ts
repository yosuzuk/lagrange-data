export const flags = {
    englishByDefault: `${__APP_TARGET__}` === 'netlify', 
    enableRepoLink: `${__APP_TARGET__}` === 'gh-pages',
    enableStats: true,
} as const;
