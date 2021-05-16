# Alpine i18n Plugin

Internationalization (i18n) support for Alpine.js

[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/rehhouari/alpinejs-i18n)](https://github.com/rehhouari/alpinejs-i18n/tree/0.0.1)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/alpinejs-i18n)](https://bundlephobia.com/result?p=alpinejs-i18n@0.0.1)
[![Downloads from Jsdelivr NPM](https://img.shields.io/jsdelivr/npm/hm/alpinejs-i18n)](https://www.jsdelivr.com/package/npm/alpinejs-i18n)
[![npm](https://img.shields.io/npm/dm/alpinejs-i18n)](https://npmjs.com/package/alpinejs-i18n)
[![Changelog](https://img.shields.io/badge/change-log-log)](/CHANGELOG.md)

## About

This plugin allow you to easily use localization in your Alpine.js projects!
It provide two _magic helpers_ that you can use to localize strings in your Alpine.js websites & apps.

> **Development Version! Changes to the API may occur, which will be tracked in the [CHANGELOG.md](/CHANGELOG.md)**

#### [Demo](https://alpinejs-i18n-example.vercel.app/)

## Features

-   Easy localization of strings using a [magic helper](#t-magic-helper)
-   Support [variables in strings](#using-variables-in-strings)!
-   Setting & getting [current locale](#locale-magic-helper) using a magic helper as well
-   Automatically update affected components on locale change!
-   Can be easily used [outside of Alpine.js components](#usage-from-javascript) (in Javascript)

## Installation

### CDN

Include the following `<script>` tag in the `<head>` of your document:

```html
<script src="https://cdn.jsdelivr.net/npm/alpinejs-i18n@v0.0.1/dist/index.umd.js"></script>
```

> **Important**: This must be added **before** loading Alpine.js when using CDN links.

### NPM

```
npm install alpinejs-i18n
```

```
import 'alpinejs-i18n';
import 'alpinejs';
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
		}
	},
	ar: {
		basic: 'زر',
		var: 'مرحبا, {name}',
		deep: {
			one: 'واحد',
			two: 'اثنان',
		}
	},
}

// finally, pass them to AlpineI18n:
window.AlpineI18n.create(locale, messages);
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
<span x-text="$t('var', {name: 'rafik})"></span>
```

This will make the span's text "hello, rafik"!

#### $locale magic helper

##### Setting the locale

`$locale('ar')` will set the locale to `ar` and refresh all Alpine components.

##### Getting the current locale

`$locale()` (without any argument) will get the current locale. (`ar`)

#### Events

A single `locale-change` is dispatched to `window` when the locale changes.

### Extra Tips:

#### Conditionally setting the variables

For example, if the locale is set to `ar` which is arabic, the following code:

```html
<span x-text="$t('var', {name: 'rafik})"></span>
```

will output: `'مرحبا, rafik`.

Which if you're not familiar with RTL languages, it is wrong. Because the variable `name` is LTR, and the locale is RTL.

To fix it you can easily do this:

```html
<span x-text="$t('var', {name: $locale() == 'ar'? 'رفيق':'rafik'})"></span>
```

Which will output: `مرحبا, رفيق`

Much better!

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
	window.addEventListener('locale-change', function () {
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

-   [@KevinBatdorf](https://twitter.com/KevinBatdorf) for the early feedback and suggestions.

## Credits

-   `subscribe` & `updateSubscribers` methods are taken from [Ryan Chandler's](https://github.com/ryangjchandler) [Spruce](https://github.com/ryangjchandler/spruce).
-   -   Copyright (c) 2021 Ryan Chandler. MIT License.

## License

Copyright (c) 2021 Rafik El Hadi Houari.

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.
