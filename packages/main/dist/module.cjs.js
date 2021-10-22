var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// packages/main/builds/module.js
__markAsModule(exports);
__export(exports, {
  default: () => module_default
});

// packages/main/src/index.ts
var localeChange = new Event("alpine-i18n:locale-change");
var i18nReady = new Event("alpine-i18n:ready");
var AlpineI18n = {
  version: "2.1.0",
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
    if (!message && this.fallbackLocale.length) {
      message = name.split(".").reduce((o, i) => o[i], this.messages[this.fallbackLocale]);
    }
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
