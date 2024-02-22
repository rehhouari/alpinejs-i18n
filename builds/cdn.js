import AlpineI18n from '../src/index'

document.addEventListener('alpine:initializing', () => {
    AlpineI18n(window.Alpine)
})
