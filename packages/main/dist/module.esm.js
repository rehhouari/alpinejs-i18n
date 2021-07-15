// packages/main/src/index.ts
var localeChange = new Event("alpine-i18n:locale-change");
var i18nReady = new Event("alpine-i18n:ready");
var AlpineI18n = {
  version: "2.0.0",
  set locale(name) {
    this.checkLocale(name);
    this.currentLocale = name;
    document.dispatchEvent(localeChange);
  },
  get locale() {
    return this.currentLocale;
  },
  currentLocale: "",
  messages: {},
  create(locale, messages) {
    this.messages = messages;
    this.checkLocale(locale);
    this.locale = locale;
  },
  checkLocale(locale) {
    if (!Object.keys(this.messages).includes(locale)) {
      throw new Error(`Alpine I18n: The locale ${this.locale} does not exist.`);
    }
  },
  t(name, vars) {
    let message = name.split(".").reduce((o, i) => o[i], this.messages[this.locale]);
    for (const key in vars) {
      if (Object.prototype.hasOwnProperty.call(vars, key)) {
        const val = vars[key];
        let regexp = new RegExp("{s*(" + key + ")s*}", "g");
        message = message.replaceAll(regexp, val);
      }
    }
    return message;
  }
};
function src_default(Alpine) {
  window.AlpineI18n = Alpine.reactive(AlpineI18n);
  document.dispatchEvent(i18nReady);
  Alpine.magic("locale", (el) => {
    return (locale) => {
      if (!locale)
        return window.AlpineI18n.locale;
      window.AlpineI18n.locale = locale;
    };
  });
  Alpine.magic("t", (el) => {
    return (name, vars) => {
      return window.AlpineI18n.t(name, vars);
    };
  });
}

// packages/main/builds/module.js
var module_default = src_default;
export {
  module_default as default
};
