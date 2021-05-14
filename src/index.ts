const AlpineI18n = {
	version: '0.0.0',
	/**
	 * setter for the current locale
	 */
	set locale(name) {
		//this.checkLocale(name)
		this.currentLocale = name;
		this.dispatchEvent();
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
	 * event that will be dispatched when the locale changes
	 * in order to update alpine components
	 */
	localChange: new Event('locale-change'),

	start() {
		// this will add a listener for the locale-change to all components.
		window.Alpine.onComponentInitialized((component: any) => {
			component.$el.addEventListener('locale-change', () => {
				component.$el.__x.updateElements(component.$el);
			});
		});

		/**
		 * magic helper $locale
		 * 1) set the locale: $locale('code')
		 * 2) get the locale $locale()
		 **/
		window.Alpine.addMagicProperty('locale', () => {
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
		window.Alpine.addMagicProperty('t', ($el: any) => {
			return (name: string, vars: object) => {
				let message: string = name
					.split('.')
					.reduce((o, i) => o[i], this.messages[this.locale]);
				for (const key in vars) {
					if (Object.prototype.hasOwnProperty.call(vars, key)) {
						//@ts-ignore
						const val: string = vars[key];
						let regexp = new RegExp('\{\s*('+key+')\s*\}', '\g')						
						message = message.replaceAll(regexp, val);
					}
				}
				return message;
			};
		});
	},

	/**
	 * Set up i18n's default locale and data.
	 * @param locale the default locale
	 * @param messages the translation data
	 */
	create(locale: string, messages: object) {
		this.locale = locale;
		this.messages = messages;
	},

	dispatchEvent() {
		document.querySelectorAll('[x-data]').forEach((el) => {
			el.dispatchEvent(this.localChange);
		});
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
		Alpine: any;
		deferLoadingAlpine: any;
		AlpineI18n: typeof AlpineI18n;
	}
}

export default AlpineI18n;
