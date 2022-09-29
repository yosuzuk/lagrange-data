import i18next, { TOptions } from 'i18next';
import { flags } from '../utils/flags';
import en from './resources/en.json';
import ja from './resources/ja.json';

const STORAGE_KEY = 'language';

export enum Language {
    ENGLISH = 'en',
    JAPANESE = 'ja',
    KEYS = 'cimode',
}

const availableLanguages: Language[] = Object.values(Language);
const defaultLanguage: Language = flags.englishByDefault ? Language.ENGLISH : Language.JAPANESE;
const fallbackLanguage = Language.JAPANESE;
let currentLanguage: Language = defaultLanguage;

function initI18n() {
    currentLanguage = getInitialLanguage();

    i18next.init({
        ns: 'key',
        lng: currentLanguage,
        fallbackLng: fallbackLanguage,
        debug: true,
        resources: {
            en: {
                key: en,
            },
            ja: {
                key: ja,
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
    if (!!storedLanguage && availableLanguages.includes(storedLanguage as Language)) {
        return storedLanguage as Language;
    }

    // prio 2: user preference
    if (Array.isArray(window.navigator?.languages)) {
        return window.navigator.languages
            .map(language => language.split('-')[0])
            .find(language => availableLanguages.includes(language as Language)) ?? defaultLanguage;
    }

    // static default
    return defaultLanguage;
}

export function reloadWithLanguage(language: Language) {
    window.localStorage.setItem(STORAGE_KEY, language);

    // Note:
    // We could use react-i18next and call i18next.changeLanguage(),
    // but instead we simply reload page and reinitialize before rendering with React.
    // This makes it easier to work with text outside of React context.
    window.location.reload();
}

export const t = (key: string, options?: TOptions) => `${i18next.t(key, options)}`;

export function getCurrentLanguage(): Language {
    return currentLanguage;
}

export function isLanguageWithWhitespace(): boolean {
    return currentLanguage !== 'ja';
}

initI18n();
