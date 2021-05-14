import Alpine from 'alpinejs';
import AlpineI18n from '../dist/index.module.js';
import { waitFor } from '@testing-library/dom';

beforeAll(() => {
	window.Alpine = Alpine;
	window.AlpineI18n = AlpineI18n;
});

test('i18n > basic', () => {
	let component = document.createElement('div');
	component.setAttribute('x-data', '');
	let child = document.createElement('button');
	child.setAttribute('x-text', "$t('btn')");
	component.appendChild(child);
	document.body.appendChild(component);

	AlpineI18n.start();
	AlpineI18n.create('en', {
		en: {
			btn: 'button',
		},
	});
	Alpine.start();

	waitFor(() => {
		expect(child.textContent).toBe('button');
	});
});

test('i18n > nesting', () => {
	let component = document.createElement('div');
	component.setAttribute('x-data', '');
	let child = document.createElement('button');
	child.setAttribute('x-text', "$t('nested.a')");
	component.appendChild(child);
	document.body.appendChild(component);

	AlpineI18n.start();
	AlpineI18n.create('en', {
		en: {
			nested: {
				a: 'aaa',
				b: 'bbb',
			},
		},
	});
	Alpine.start();

	waitFor(() => {
		expect(child.textContent).toBe('aaa');
	});
});

test('i18n > variables', () => {
	let component = document.createElement('div');
	component.setAttribute('x-data', '');
	let child = document.createElement('button');
	child.setAttribute('x-text', "$t('nested.a', {name: 'world'})");
	component.appendChild(child);
	document.body.appendChild(component);

	AlpineI18n.start();
	AlpineI18n.create('en', {
		en: {
			nested: {
				a: 'hello, {name}',
				b: 'bbb',
			},
		},
	});
	Alpine.start();

	waitFor(() => {
		expect(child.textContent).toBe('hello, world');
	});
});

test('i18n > locale getter', () => {
	let component = document.createElement('div');
	component.setAttribute('x-data', '');
	let child = document.createElement('button');
	child.setAttribute('x-text', '$locale()');
	component.appendChild(child);
	document.body.appendChild(component);

	AlpineI18n.start();
	AlpineI18n.create('en', {
		en: {
			nested: {
				a: 'hello, {name}',
				b: 'bbb',
			},
		},
	});
	Alpine.start();

	waitFor(() => {
		expect(child.textContent).toBe('en');
	});
});

test('i18n > locale setter', () => {
	let component = document.createElement('div');
	component.setAttribute('x-data', '');
	let child = document.createElement('button');
	child.setAttribute('x-init', "$locale('ar')");
	child.setAttribute('x-text', "$t('btn')");
	component.appendChild(child);
	//document.body.appendChild(component);


	AlpineI18n.start();
	AlpineI18n.create('en', {
		en: {
			btn: 'button',
		},
		ar: {
			btn: 'زر',
		},
	});

	Alpine.start();

	expect(child.textContent).toBe('');
});
