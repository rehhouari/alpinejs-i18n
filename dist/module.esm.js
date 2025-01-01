// src/index.ts
var localeChange = new Event("alpine-i18n:locale-change");
var i18nReady = new Event("alpine-i18n:ready");
var AlpineI18n = {
  version: "2.5.0",
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
  fallbackLocale: "",
  options: {},
  create(locale, messages, options) {
    this.messages = messages;
    this.checkLocale(locale);
    this.locale = locale;
    this.options = options;
  },
  checkLocale(locale) {
    if (!Object.keys(this.messages).includes(locale)) {
      throw new Error(`Alpine I18n: The locale ${locale} does not exist.`);
    }
  },
  t(name, vars) {
    let message = "";
    try {
      message = name.split(".").reduce((o, i) => o[i], this.messages[this.locale]);
    } catch {
    }
    if (!message && this.fallbackLocale.length) {
      message = name.split(".").reduce((o, i) => o[i], this.messages[this.fallbackLocale]);
    } else if (!message) {
      return this.options?.debug ? `???${name}` : name;
    }
    for (const key in vars) {
      if (message && message.replaceAll) {
        if (Object.prototype.hasOwnProperty.call(vars, key)) {
          const val = vars[key];
          let regexp = new RegExp("{s*(" + key + ")s*}", "g");
          message = message.replaceAll(regexp, val);
        }
      }
    }
    return this.options?.debug ? `[${message}]` : message;
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

// builds/module.js
var module_default = src_default;
export {
  module_default as default
};
