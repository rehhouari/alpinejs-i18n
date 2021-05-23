import { Alpine } from '@leanadmin/alpine-typescript';

const AlpineI18n = {
	version: '1.0.0',

	/**
	 * setter for the current locale
	 */
	set locale(name) {
		//this.checkLocale(name)
		this.currentLocale = name;
		window.dispatchEvent(this.localChange);
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
	 * event that will be dispatched when the locale changes
	 * useful for when using outside of alpine components
	 * like changing "dir" inside the body
	 */
	localChange: new Event('locale-change'),

	start() {
		/**
		 * magic helper $locale
		 * 1) set the locale: $locale('code')
		 * 2) get the locale $locale()
		 **/
		window.Alpine.addMagicProperty('locale', ($el: HTMLElement) => {
			this.subscribe($el);
			return (locale: string | undefined) => {
				if (!locale) return this.locale;
				this.checkLocale(locale);
				this.locale = locale;
			};
		});

		/**
		 * magic helper $t
		 * $t('key')
		 * $t('key', {var: val})
		 */
		window.Alpine.addMagicProperty('t', ($el: HTMLElement) => {
			this.subscribe($el);
			return (name: string, vars?: { [name: string]: any }) => {
				return this.t(name, vars);
			};
		});
	},

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
	 * Get the localized version of a string
	 * @param name the name of the message
	 * @param vars optional variables to be passed to the string
	 * @returns string
	 */
	t(name: string, vars?: {[name: string]: any}) {
		let message: string = name
			.split('.')
			.reduce((o, i) => o[i], this.messages[this.locale]);
		for (const key in vars) {
			if (Object.prototype.hasOwnProperty.call(vars, key)) {
				//@ts-ignore
				const val: string = vars[key];
				let regexp = new RegExp('{s*(' + key + ')s*}', 'g');
				message = message.replaceAll(regexp, val);
			}
		}
		return message;
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
	 * Save an element to update it when locale change
	 * @param el The element that uses the magic helper
	 */
	subscribe(el: HTMLElement) {
		if (!this.subscribers.includes(<never>el)) {
			this.subscribers.push(<never>el);
		}
	},

	/**
	 * Update components that use the magic helpers
	 * taken from Spruce
	 */
	updateSubscribers() {
		this.subscribers.forEach((el: any) => {
			el.__x.updateElements(el);
		});
	},
};

const alpine =
	window.deferLoadingAlpine || ((callback: Function) => callback());

window.AlpineI18n = AlpineI18n;

window.deferLoadingAlpine = function (callback: Function) {
	window.AlpineI18n.start();
	alpine(callback);
};

declare global {
	interface Window {
		Alpine: Alpine;
		AlpineI18n: typeof AlpineI18n;
	}
}

export default AlpineI18n;
