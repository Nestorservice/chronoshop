import de from "../i18n/de";
import en from "./fr";
import es from "../i18n/es";
import fr from "../i18n/fr";

const translations = new Map<string, object>();

translations.set("de", de);
translations.set("en", en);
translations.set("es", es);
translations.set("fr", fr);

export default translations;
