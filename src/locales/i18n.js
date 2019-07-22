
import I18n from 'react-native-i18n';
import en from './en';
import ja from './ja';

I18n.fallbacks = true;
I18n.translations = {
    en,
    ja
};
I18n.locale = I18n.currentLocale();
export function string(name, params = {}) {
    return I18n.t(name, params);
};
export function getLanguage() {
    return I18n.currentLocale();
}

export default I18n;