# Alpine Plugin Template

Internationalization (i18n) support for Alpine.js

[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/rehhouari/alpinejs-i18nlabel=version&sort=semver)](https://github.com/rehhouari/alpinejs-i18n/tree/0.0.0)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/alpinejs-i18n?color=37C8AB)](https://bundlephobia.com/result?p=alpinejs-i18n@0.0.0)
[![Downloads from Jsdelivr Github](https://img.shields.io/jsdelivr/gh/hm/rehhouari/alpinejs-i18nlogo=github&logoColor=)](https://www.jsdelivr.com/package/gh/rehhouari/alpinejs-i18n)
[![Downloads from Jsdelivr NPM](https://img.shields.io/jsdelivr/npm/hm/alpinejs-i18n&logo=npm)](https://www.jsdelivr.com/package/npm/{npm-pacakge})
[![npm](https://img.shields.io/npm/dm/alpinejs-i18n?color=37C8AB&label=npm&logo=npm&logoColor=37C8AB)](https://npmjs.com/package/alpinejs-i18n)
[![Changelog](https://img.shields.io/badge/change-log-)](/CHANGELOG.md)

## About

This plugin allow you to easily use localization in your Alpine.js projects!
It provide two _magic helpers_ that you can use to localize strings in your Alpine.js websites & apps.

> **Development Version! Changes to the API may occur, which will be tracked in the [CHANGELOG.md](/CHANGELOG.md)**

## Installation

### CDN

Include the following `<script>` tag in the `<head>` of your document:

```html
<script src="https://cdn.jsdelivr.net/npm/alpinejs-i18n@v0.0.0/dist/index.umd.js"></script>
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
// you can load/fetch these from files or keep them hardcoded them.
let messages = {
{
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

##### Extra: Conditionally setting the variables

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

> You can also add the `dir="rtl"` attribute based on locale: `:dir={'rtl':$locale('ar')}`

## Versioning

This projects follow the [Semantic Versioning](https://semver.org/) guidelines.

## License

Copyright (c) 2021 Rafik El Hadi Houari.

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.
