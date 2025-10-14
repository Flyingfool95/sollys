export function normalizeCityName(city: string, countryCode: string) {
    // Map transliterations for Scandinavian/German cities
    const map: Record<string, Record<string, string>> = {
        SE: { aa: "å", Ae: "Ä", ae: "ä", oe: "ö", Oe: "Ö", Aa: "Å" },
        DK: { aa: "å", Ae: "Æ", ae: "æ", oe: "ø", Oe: "Ø", Aa: "Å" },
        NO: { aa: "å", Ae: "Æ", ae: "æ", oe: "ø", Oe: "Ø", Aa: "Å" },
        FI: { aa: "å", Ae: "Ä", ae: "ä", oe: "ö", Oe: "Ö", Aa: "Å" },
        DE: { ue: "ü", Ue: "Ü", ss: "ß", Ae: "Ä", Oe: "Ö" },
    };

    // Only apply if country is in the map
    const replacements = map[countryCode];
    if (!replacements) return city;

    let normalized = city;
    for (const [ascii, native] of Object.entries(replacements)) {
        const re = new RegExp(ascii, "g");
        normalized = normalized.replace(re, native);
    }
    return normalized;
}
