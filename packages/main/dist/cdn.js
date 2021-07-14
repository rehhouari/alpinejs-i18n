(() => {
  // packages/main/src/index.ts
  var localeChange = new Event("alpine-i18n:locale-change");
  var i18nReady = new Event("alpine-i18n:ready");
  var AlpineI18n = {
    version: "2.0.0",
    set locale(name) {
      this.currentLocale = name;
      document.dispatchEvent(localeChange);
      this.updateSubscribers();
    },
    get locale() {
      return this.currentLocale;
    },
    currentLocale: "",
    messages: {},
    subscribers: [],
    updateSubscribers() {
    },
    create(locale, messages) {
      this.messages = messages;
      this.checkLocale(locale);
      this.locale = locale;
    },
    checkLocale(locale) {
      if (!Object.keys(this.messages).includes(locale)) {
        throw new Error(`Alpine I18n: The locale ${this.locale} does not exist.`);
      }
    }
  };
  function src_default(Alpine) {
    window.AlpineI18n = AlpineI18n;
    document.dispatchEvent(i18nReady);
    Alpine.magic("locale", (el) => {
      subscribe(Alpine.closestRoot(el));
      return (locale) => {
        if (!locale)
          return window.AlpineI18n.locale;
        window.AlpineI18n.checkLocale(locale);
        window.AlpineI18n.locale = locale;
      };
    });
    Alpine.magic("t", (el) => {
      subscribe(Alpine.closestRoot(el));
      return (name, vars) => {
        return t(name, vars);
      };
    });
  }
  var t = (name, vars) => {
    let message = name.split(".").reduce((o, i) => o[i], window.AlpineI18n.messages[window.AlpineI18n.locale]);
    for (const key in vars) {
      if (Object.prototype.hasOwnProperty.call(vars, key)) {
        const val = vars[key];
        let regexp = new RegExp("{s*(" + key + ")s*}", "g");
        message = message.replaceAll(regexp, val);
      }
    }
    return message;
  };
  var subscribe = (el) => {
    if (!window.AlpineI18n.subscribers.includes(el)) {
      window.AlpineI18n.subscribers.push(el);
    }
  };

  // packages/main/builds/cdn.js
  document.addEventListener("alpine:initializing", () => {
    src_default(window.Alpine);
  });
})();
