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
        [name: string]: any;
    }): string;
};
export default function (Alpine: any): void;
declare global {
    interface Window {
        AlpineI18n: typeof AlpineI18n;
    }
}
export {};
//# sourceMappingURL=index.d.ts.map