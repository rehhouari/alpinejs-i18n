# i18n Plugin for Alpine.js

Internationalization (i18n) support for Alpine.js (unofficial)

[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/rehhouari/alpinejs-i18n)](https://github.com/rehhouari/alpinejs-i18n/tree/2.5.2)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/alpinejs-i18n)](https://bundlephobia.com/result?p=alpinejs-i18n@2.5.2)
[![Downloads from Jsdelivr NPM](https://img.shields.io/jsdelivr/npm/hm/alpinejs-i18n)](https://www.jsdelivr.com/package/npm/alpinejs-i18n?version=2.5.2)
[![npm](https://img.shields.io/npm/dm/alpinejs-i18n)](https://npmjs.com/package/alpinejs-i18n)
[![Changelog](https://img.shields.io/badge/change-log-log)](/CHANGELOG.md)
[![Donate](https://img.shields.io/badge/Support-%E2%99%A5-pink)](https://ko-fi.com/rehhouari)

## About

This plugin allow you to easily use localization in your Alpine.js projects!
It provide two _magic helpers_ that you can use to localize strings in your Alpine.js websites & apps.

## Compatibility

Version **^2.x** for Alpine v3.

Version **1.0.0** for Alpine v2.

#### [Demo](https://alpinejs-i18n-example.vercel.app/)

## Features

-   Easy localization of strings using a [magic helper](#t-magic-helper)
-   Support [variables in strings](#using-variables-in-strings)!
-   Setting & getting [current locale](#locale-magic-helper) using a magic helper as well
-   Automatically update affected components on locale change!
-   Can be easily used [outside of Alpine.js components](#usage-from-javascript) (in Javascript)
-   Typescript support.

## Installation

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/alpinejs-i18n@2.x.x/dist/cdn.min.js"></script>
```

### NPM

```
npm install alpinejs-i18n
```

```js
import AlpineI18n from 'alpinejs-i18n';
import Alpine from 'alpinejs';

document.addEventListener('alpine-i18n:ready', function () {
	// ... scroll to Usage to see where locale and messages came from
	window.AlpineI18n.create(locale, messages);
});
Alpine.plugin(AlpineI18n);
Alpine.start();
```

### ES6 Module

Add the following `<script>` to the `<head>` of your document **before** including Alpine:

```html
<script type="module">
	import AlpineI18n from 'https://cdn.jsdelivr.net/npm/alpinejs-i18n@2.x.x/dist/module.esm.min.js';
	document.addEventListener('alpine-i18n:ready', function () {
		// ... scroll to Usage to see where locale and messages came from
		window.AlpineI18n.create(locale, messages);
	});
	document.addEventListener('alpine:init', () => {
		window.Alpine.plugin(AlpineI18n);
	});
</script>
```

## Usage

### 1- Setting up the translations and locale.

In Javascript, after importing `alpinejs-i18n`:

```js
// the default locale
// you can for example take it from the URL.
let locale = 'en';

// the translation data
// you can load/fetch these from files or keep them hardcoded.
let messages = {
	en: {
		basic: 'button',
		// can have variables
		var: 'hello, {name}',
		// can be nested
		deep: {
			one: 'one',
			two: 'two',
		},
	},
	ar: {
		basic: 'زر',
		var: 'مرحبا, {name}',
		deep: {
			one: 'واحد',
			two: 'اثنان',
		},
	},
};

// finally, pass them to AlpineI18n:
document.addEventListener('alpine-i18n:ready', function () {
	window.AlpineI18n.create(locale, messages);
});
```

### 2 - Usage from inside Alpine Components

#### $t magic helper

Using the `$t` magic helper, you can display the translation for the current locale

Following the example settings above:

```html
<div x-data>
	<button x-text="$t('basic')"></button>
</div>
```

This will make the button's text "button".

##### Using variables in strings

Using variables in translation strings is easy:

```html
<span x-text="$t('var', {name: 'rafik'})"></span>
```

This will make the span's text "hello, rafik"!

#### $locale magic helper

##### Setting the locale

`$locale('ar')` will set the locale to `ar` and refresh all Alpine components.

##### Getting the current locale

`$locale()` (without any argument) will get the current locale. (`ar`)

#### Events

-   `alpine-i18n:locale-change` is dispatched to `document` when the locale changes.
-   `alpine-i18n:ready` is dispatched to `document` when the plugin is ready.

#### Fallback Locale

to set a fallback locale for partially-translated values:

```js
document.addEventListener('alpine-i18n:ready', function () {
    window.AlpineI18n.fallbackLocale = 'en';
}
```

### Extra Tips:

#### Changing writing direction based on locale

```html
<div x-data :dir="{'rtl': $locale() == 'ar'}"></div>
```

> **NOTE**: If you want to set it on the entire `body`, **do not make the `body` an Alpine Component**!
> [Use this method from Javascript instead](#Changing-writing-direction-from-Javascript)!
> The reason for not making body an Alpine component is because it can affect the performance of the site, if the page is big.

#### Usage from Javascript

All features can be used outside Alpine.js components, meaning from Javascript!

> **If you're inside of a module, append `window.` to `AlpineI18n`. (becomes `window.AlpineI18n`)**

##### Localizing strings t()

```js
AlpineI18n.t('key', {var: 'val})
```

##### Getting & Setting Locale

**Getting the locale**

```js
AlpineI18n.locale;
```

**Setting the locale**

```js
AlpineI18n.locale = 'ar';
```

##### Changing writing direction from Javascript

```html
<script>
	// define the RTL locales you support
	var rtlLocales = ['ar', 'fa'];
	// listen to locale changes
	window.addEventListener('alpine-i18n:locale-change', function () {
		if (rtlLocales.includes(window.AlpineI18n.locale)) {
			document.body.setAttribute('dir', 'rtl');
		} else {
			document.body.removeAttribute('dir');
		}
	});
</script>
```

## Versioning

This projects follow the [Semantic Versioning](https://semver.org/) guidelines.

## Disclaimer

Community project by [@rehhouari](https://github.com/rehhouari), not affiliated with Alpine.js team.

## Acknowledgments

-   [@KevinBatdorf](https://twitter.com/KevinBatdorf) for the constant feedback and help.

## License

Copyright (c) 2024 Rafik El Hadi Houari and contributors.

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.
