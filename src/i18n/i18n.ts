import i18next, { TFunction, ResourceKey } from 'i18next';
import { flags } from '../utils/flags';

const STORAGE_KEY = 'language';

export enum Language {
    ENGLISH = 'en',
    JAPANESE = 'ja',
    KEYS = 'cimode',
}

const fallbackLanguage: Language = flags.englishFallback ? Language.ENGLISH : Language.JAPANESE;

const resourceLoaders: Record<Language, () => Promise<ResourceKey>> = {
    [Language.ENGLISH]: (): Promise<ResourceKey> => import('./resources/en.json'),
    [Language.JAPANESE]: (): Promise<ResourceKey> => import('./resources/ja.json'),
    [Language.KEYS]: () => Promise.resolve({}),
};

export async function initI18n(): Promise<TFunction> {
    const language = getInitialLanguage();
    const translation = await resourceLoaders[language]();

    return i18next.init({
        ns: 'key',
        lng: language,
        fallbackLng: fallbackLanguage,
        debug: true,
        resources: {
            [language]: {
                key: translation,
            },
        },
        appendNamespaceToCIMode: true,
        appendNamespaceToMissingKey: true,
        cleanCode: true,
        interpolation: {
            escapeValue: false, // done by React
        },
    });
}

function getInitialLanguage(): Language {
    // prio 1: explicitly selected language
    const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
    if (!!storedLanguage && storedLanguage in resourceLoaders) {
        return storedLanguage as Language;
    }

    // prio 2: user preference
    if (Array.isArray(window.navigator?.languages)) {
        return window.navigator.languages
            .map(language => language.split('-')[0])
            .find(language => language in resourceLoaders) ?? fallbackLanguage;
    }

    // static fallback
    return fallbackLanguage;
}

export function reloadWithLanguage(language: Language) {
    window.localStorage.setItem(STORAGE_KEY, language);

    // Note:
    // We could use react-i18next and call i18next.changeLanguage(),
    // but instead we simply reload page and reinitialize before rendering with React.
    // This makes it easier to work with text outside of React context.
    window.location.reload();
}
