import { PluginCallback } from 'alpinejs';
declare module 'alpinejs' {
    interface Magics<T> {
        $locale: $locale;
        $t: $t;
    }
}
declare global {
    interface Window {
        AlpineI18n: typeof AlpineI18n;
    }
}
type $t = (name: string, vars?: {
    [name: string]: string;
}) => string;
type $locale = (locale?: string) => string | void;
declare const AlpineI18n: {
    version: string;
    /**
     * setter for the current locale
     */
    locale: string;
    currentLocale: string;
    /**
     * translations data
     * the first keys are the locale codes.
     */
    messages: any;
    fallbackLocale: string;
    options: any;
    /**
     * Set up i18n's default locale and data.
     * @param locale the default locale
     * @param messages the translation data
     * @param options optional settings
     */
    create(locale: string, messages: {
        [name: string]: any;
    }, options: {
        debug: boolean;
    }): void;
    /**
     * Check if a locale exists in the message list
     * If it don't throw an Error. Does nothing otherwise.
     * @param locale locale to check
     */
    checkLocale(locale: string): void;
    /**
     * Get the localized version of a string
     * @param name the name of the message
     * @param vars optional variables to be passed to the string
     * @returns string
     */
    t(name: string, vars?: {
        [name: string]: string;
    }): string;
};
declare const i18nPlugin: PluginCallback;
export default i18nPlugin;
//# sourceMappingURL=index.d.ts.map