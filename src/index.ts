import { PluginCallback, type Alpine } from 'alpinejs';

const localeChange = new Event('alpine-i18n:locale-change');
const i18nReady = new Event('alpine-i18n:ready');

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

type $t = (name: string, vars?: { [name: string]: string }) => string;
type $locale = (locale?: string) => string | void;

const AlpineI18n = {
	version: '2.5.3',

	/**
	 * setter for the current locale
	 */
	set locale(name) {
		this.checkLocale(name);
		this.currentLocale = name;
		document.dispatchEvent(localeChange);
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

	fallbackLocale: '',

	options: <any>{},

	/**
	 * Set up i18n's default locale and data.
	 * @param locale the default locale
	 * @param messages the translation data
	 * @param options optional settings
	 */
	create(
		locale: string,
		messages: { [name: string]: any },
		options: { debug: boolean },
	) {
		this.messages = messages;
		this.checkLocale(locale);
		this.locale = locale;
		this.options = options;
	},

	/**
	 * Check if a locale exists in the message list
	 * If it don't throw an Error. Does nothing otherwise.
	 * @param locale locale to check
	 */
	checkLocale(locale: string) {
		if (!Object.keys(this.messages).includes(locale)) {
			throw new Error(
				`Alpine I18n: The locale ${locale} does not exist.`,
			);
		}
	},

	/**
	 * Get the localized version of a string
	 * @param name the name of the message
	 * @param vars optional variables to be passed to the string
	 * @returns string
	 */
	t(name: string, vars?: { [name: string]: string }) {
		let message: string = '';
		try {
			message = name
				.split('.')
				.reduce((o, i) => o[i], this.messages[this.locale]);
		} catch {}
		if (!message && this.fallbackLocale.length) {
			message = name
				.split('.')
				.reduce((o, i) => o[i], this.messages[this.fallbackLocale]);
		} else if (!message) {
			return this.options?.debug ? `???${name}` : name;
		}
		for (const key in vars) {
			if (message && message.replaceAll) {
				if (Object.prototype.hasOwnProperty.call(vars, key)) {
					//@ts-ignore
					const val: string = vars[key];
					let regexp = new RegExp('{s*(' + key + ')s*}', 'g');
					//@ts-ignore
					message = message.replaceAll(regexp, val);
				}
			}
		}

		return this.options?.debug ? `[${message}]` : message;
	},
};

const i18nPlugin: PluginCallback = function (Alpine: Alpine) {
	window.AlpineI18n = Alpine.reactive(AlpineI18n);
	document.dispatchEvent(i18nReady);

	Alpine.magic('locale', (el: HTMLElement) => {
		return (locale: string | undefined) => {
			if (!locale) return window.AlpineI18n.locale;
			window.AlpineI18n.locale = locale;
		};
	});

	Alpine.magic('t', (el: HTMLElement) => {
		return (name: string, vars?: { [name: string]: any }) => {
			return window.AlpineI18n.t(name, vars);
		};
	});
};

export default i18nPlugin;
