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
    /**
     * event that will be dispatched when the locale changes
     * in order to update alpine components
     */
    localChange: Event;
    start(): void;
    /**
     * Set up i18n's default locale and data.
     * @param locale the default locale
     * @param messages the translation data
     */
    create(locale: string, messages: object): void;
    dispatchEvent(): void;
    /**
     * Check if a locale exists in the message list
     * If it don't throw an Error. Does nothing otherwise.
     * @param locale locale to check
     */
    checkLocale(locale: string): void;
};
declare global {
    interface Window {
        Alpine: any;
        deferLoadingAlpine: any;
        AlpineI18n: typeof AlpineI18n;
    }
}
export default AlpineI18n;
