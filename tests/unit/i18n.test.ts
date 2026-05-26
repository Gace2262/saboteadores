import { describe, expect, it } from "vitest";
import { allCards } from "@/data/cards";
import { defaultLocale } from "@/i18n/config";
import { clearMissingTranslations, getMissingTranslations } from "@/logic/i18n/missingTranslations";
import { t, translate, translateCard } from "@/logic/i18n/translator";
import { useLanguageStore } from "@/store/languageStore";

describe("i18n", () => {
  it("returns a translation", () => {
    expect(t("ui.menu.play", undefined, "en")).toBe("Play");
  });

  it("falls back through es-CL to es and en", () => {
    expect(translate("pt-BR", "ui.menu.collection")).toBe("Coleccion");
  });

  it("registers missing keys", () => {
    clearMissingTranslations();
    expect(translate("en", "missing.fake.key")).toBe("missing.fake.key");
    expect(getMissingTranslations()).toContainEqual({ locale: "en", key: "missing.fake.key" });
  });

  it("interpolates params", () => {
    expect(t("battle.damage", { amount: 5 }, "en")).toBe("5 damage");
  });

  it("handles simple plurals", () => {
    expect(t("battle.cardsDrawn", { count: 1 }, "en")).toBe("You drew 1 card");
    expect(t("battle.cardsDrawn", { count: 3 }, "en")).toBe("You drew 3 cards");
  });

  it("persists language changes in the store", () => {
    useLanguageStore.getState().setLocale("en");
    expect(useLanguageStore.getState().locale).toBe("en");
    expect(useLanguageStore.getState().translate("actions.save")).toBe("Save");
  });

  it("cards expose name keys and translate with fallback", () => {
    const card = allCards.find((item) => item.id === "controlador-compulsivo");
    expect(card?.nameKey).toBe("cards.controladorCompulsivo.name");
    expect(card ? translateCard(card, "en").name : "").toBe("Compulsive Controller");
  });

  it("keeps es-CL as default locale", () => {
    expect(defaultLocale).toBe("es-CL");
  });
});
