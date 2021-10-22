const localeChange = new Event('alpine-i18n:locale-change')
const i18nReady = new Event('alpine-i18n:ready')

const AlpineI18n = {
	version: '2.2.0',

	/**
	 * setter for the current locale
	 */
	set locale(name) {
		this.checkLocale(name)
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

	/**
	 * Set up i18n's default locale and data.
	 * @param locale the default locale
	 * @param messages the translation data
	 */
	create(locale: string, messages: { [name: string]: any }) {
		this.messages = messages;
		this.checkLocale(locale);
		this.locale = locale;
	},

	/**
	 * Check if a locale exists in the message list
	 * If it don't throw an Error. Does nothing otherwise.
	 * @param locale locale to check
	 */
	checkLocale(locale: string) {
		if (!Object.keys(this.messages).includes(locale)) {
			throw new Error(
				`Alpine I18n: The locale ${this.locale} does not exist.`,
			);
		}
	},

	/**
	 * Get the localized version of a string
	 * @param name the name of the message
	 * @param vars optional variables to be passed to the string
	 * @returns string
	 */
	t(name: string, vars?: { [name: string]: any }) {
		let message: string = '';
		try {
			message = name.split(".").reduce((o, i) => o[i], this.messages[this.locale]);
		} catch {}
		if (!message && this.fallbackLocale.length) {
			message = name.split(".").reduce((o, i) => o[i], this.messages[this.fallbackLocale]);
		} else if (!message) {
			return name;
		}

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
};

export default function (Alpine: any) {
	window.AlpineI18n = Alpine.reactive(AlpineI18n);
	document.dispatchEvent(i18nReady);
	Alpine.magic('locale', (el: HTMLElement) => {
		return (locale: string | undefined) => {
			if (!locale) return window.AlpineI18n.locale;
			window.AlpineI18n.locale = locale;
		};
	})

	Alpine.magic('t', (el: HTMLElement) => {
		return (name: string, vars?: { [name: string]: any }) => {
			return window.AlpineI18n.t(name, vars);
		};
	})
}

declare global {
	interface Window {
		AlpineI18n: typeof AlpineI18n;
	}
}
