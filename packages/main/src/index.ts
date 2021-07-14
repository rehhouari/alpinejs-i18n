const localeChange = new Event('alpine-i18n:locale-change')
const i18nReady = new Event('alpine-i18n:ready')

const AlpineI18n = {
	version: '2.0.0',

	/**
	 * setter for the current locale
	 */
	set locale(name) {
		//this.checkLocale(name)
		this.currentLocale = name;
		document.dispatchEvent(localeChange);
		this.updateSubscribers();
	},

	/**
	 * getter for the current locale
	 */
	get locale() {
		return this.currentLocale;
	},

	currentLocale: '',

	/**
	 * translations data
	 * the first keys are the locale codes.
	 */
	messages: <any>{},

	/**
	 * components that use the magic helpers
	 */
	subscribers: [],

	/**
	 * Update components that use the magic helpers
	 * taken from Spruce
	 */
    updateSubscribers() {
		// this.subscribers.forEach((el: any) => {
		// 	el.__x.updateElements(el);
		// });
	},
    /**
     * Set up i18n's default locale and data.
     * @param locale the default locale
     * @param messages the translation data
     */
    create (locale: string, messages: { [name: string]: any }) {
        this.messages = messages;
        this.checkLocale(locale);
        this.locale = locale;
    },

    /**
     * Check if a locale exists in the message list
     * If it don't throw an Error. Does nothing otherwise.
     * @param locale locale to check
     */
    checkLocale (locale: string) {
        if (!Object.keys(this.messages).includes(locale)) {
            throw new Error(
            `Alpine I18n: The locale ${this.locale} does not exist.`,
            );
        }
    }
};

export default function (Alpine: any) {
    window.AlpineI18n = AlpineI18n;
    document.dispatchEvent(i18nReady);
    Alpine.magic('locale', (el: HTMLElement) => {
        subscribe(Alpine.closestRoot(el));
        return (locale: string | undefined) => {
            if (!locale) return window.AlpineI18n.locale;
            window.AlpineI18n.checkLocale(locale);
            window.AlpineI18n.locale = locale;
        };
    })

    Alpine.magic('t', (el: HTMLElement) => {
        subscribe(Alpine.closestRoot(el));
        return (name: string, vars?: { [name: string]: any }) => {
            return t(name, vars);
        };
    })
}

/**
 * Get the localized version of a string
 * @param name the name of the message
 * @param vars optional variables to be passed to the string
 * @returns string
 */
const t = (name: string, vars?: {[name: string]: any}) => {
    let message: string = name
        .split('.')
        .reduce((o, i) => o[i], window.AlpineI18n.messages[window.AlpineI18n.locale]);
    for (const key in vars) {
        if (Object.prototype.hasOwnProperty.call(vars, key)) {
            //@ts-ignore
            const val: string = vars[key];
            let regexp = new RegExp('{s*(' + key + ')s*}', 'g');
            //@ts-ignore
            message = message.replaceAll(regexp, val);
        }
    }
    return message;
}

/**
 * Save an element to update it when locale change
 * @param el The element that uses the magic helper
 */
const subscribe = (el: HTMLElement) => {
    if (!window.AlpineI18n.subscribers.includes(<never>el)) {
        window.AlpineI18n.subscribers.push(<never>el);
    }
}

declare global {
	interface Window {
		AlpineI18n: typeof AlpineI18n;
	}
}