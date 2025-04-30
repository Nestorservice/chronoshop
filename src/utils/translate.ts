import languages from "../i18n";

function __(key: string, language: string) {
  return key
    .split(".")
    .reduce((obj: any, i: string) => (obj ? obj[i] : null), languages.get(language));
}

const availableLanguages = Array.from(languages.keys());

export { availableLanguages };
export default __;
