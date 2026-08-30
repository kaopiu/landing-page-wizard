import type { SectionDef } from "./types";

/**
 * Central section library. The wizard (picker + content forms) reads
 * everything from here, so adding a new section type means adding one
 * entry to this array — no other wizard logic needs to change.
 */
export const SECTION_LIBRARY: SectionDef[] = [
  {
    type: "hero",
    label: "כותרת ראשית (Hero)",
    description: "הבאנר הראשון שהלקוחות שלך רואים — כותרת, טקסט משנה וכפתור פעולה",
    icon: "🎯",
    singleton: true,
    recommended: true,
    fields: [
      { key: "headline", label: "כותרת", type: "text", placeholder: "העסק שלך, בגדול" },
      { key: "subheadline", label: "כותרת משנה", type: "textarea", placeholder: "משפט שמסביר במה אתם עוזרים" },
      { key: "ctaText", label: "טקסט כפתור", type: "text", placeholder: "לקביעת פגישה" },
      { key: "image", label: "קישור לתמונת רקע/באנר", type: "url", placeholder: "https://..." },
      {
        key: "profileImage",
        label: "תמונת פרופיל אישית (רשות)",
        type: "url",
        placeholder: "https://... — לתמונה שלך או של בעל/ת העסק",
      },
      {
        key: "includeWhatsapp",
        label: "כפתור וואטסאפ צף באתר (בהתאם למספר הטלפון שהוזן ביצירת קשר)",
        type: "checkbox",
      },
      {
        key: "includeAccessibility",
        label: "כפתור נגישות צף באתר",
        type: "checkbox",
      },
    ],
  },
  {
    type: "features",
    label: "יתרונות (Features)",
    description: "רשימת יתרונות או שירותים שהעסק שלך מציע",
    icon: "✨",
    fields: [
      { key: "title", label: "כותרת המקטע", type: "text", placeholder: "למה לבחור בנו" },
      {
        key: "items",
        label: "יתרונות",
        type: "repeater",
        itemLabel: "יתרון",
        itemFields: [
          { key: "title", label: "כותרת", type: "text", placeholder: "שירות מהיר" },
          { key: "description", label: "תיאור", type: "textarea", placeholder: "פירוט קצר" },
        ],
      },
    ],
  },
  {
    type: "testimonials",
    label: "המלצות (Testimonials)",
    description: "ציטוטים והמלצות מלקוחות מרוצים",
    icon: "💬",
    fields: [
      { key: "title", label: "כותרת המקטע", type: "text", placeholder: "מה הלקוחות אומרים" },
      {
        key: "items",
        label: "המלצות",
        type: "repeater",
        itemLabel: "המלצה",
        itemFields: [
          { key: "quote", label: "ציטוט", type: "textarea", placeholder: "שירות מעולה!" },
          { key: "name", label: "שם הממליץ/ה", type: "text", placeholder: "ישראל ישראלי" },
          { key: "role", label: "תפקיד / חברה", type: "text", placeholder: "מנכ\"ל, חברה בע\"מ" },
        ],
      },
    ],
  },
  {
    type: "pricing",
    label: "מחירון (Pricing)",
    description: "חבילות ומחירים",
    icon: "💳",
    fields: [
      { key: "title", label: "כותרת המקטע", type: "text", placeholder: "החבילות שלנו" },
      {
        key: "plans",
        label: "חבילות",
        type: "repeater",
        itemLabel: "חבילה",
        itemFields: [
          { key: "name", label: "שם החבילה", type: "text", placeholder: "בסיסי" },
          { key: "price", label: "מחיר", type: "text", placeholder: "₪199 לחודש" },
          { key: "features", label: "מה כלול", type: "textarea", placeholder: "שורה לכל פריט" },
          { key: "ctaText", label: "טקסט כפתור", type: "text", placeholder: "לבחירה" },
        ],
      },
    ],
  },
  {
    type: "gallery",
    label: "גלריה (Gallery)",
    description: "תמונות מהעסק, מוצרים או עבודות קודמות",
    icon: "🖼️",
    fields: [
      { key: "title", label: "כותרת המקטע", type: "text", placeholder: "העבודות שלנו" },
      {
        key: "images",
        label: "תמונות",
        type: "repeater",
        itemLabel: "תמונה",
        itemFields: [
          { key: "url", label: "קישור לתמונה", type: "url", placeholder: "https://..." },
          { key: "caption", label: "כיתוב", type: "text", placeholder: "תיאור קצר" },
        ],
      },
    ],
  },
  {
    type: "contact",
    label: "יצירת קשר (Contact)",
    description: "פרטי התקשרות וטופס פנייה",
    icon: "📞",
    singleton: true,
    fields: [
      { key: "title", label: "כותרת המקטע", type: "text", placeholder: "נשמח לשמוע מכם" },
      { key: "address", label: "כתובת", type: "text", placeholder: "רחוב ומספר, עיר", noAiFill: true },
      { key: "phone", label: "טלפון", type: "text", placeholder: "050-0000000", noAiFill: true },
      { key: "email", label: "דוא\"ל", type: "email", placeholder: "info@business.co.il", noAiFill: true },
    ],
  },
  {
    type: "footer",
    label: "פוטר (Footer)",
    description: "שורה תחתונה עם זכויות יוצרים וקישורים",
    icon: "📄",
    singleton: true,
    recommended: true,
    fields: [
      { key: "text", label: "טקסט", type: "text", placeholder: "© 2026 שם העסק. כל הזכויות שמורות." },
      {
        key: "policyPages",
        label: "עמודי מידע (תנאי שימוש, פרטיות וכו')",
        type: "repeater",
        itemLabel: "עמוד",
        itemFields: [
          {
            key: "label",
            label: "כותרת הקישור",
            type: "text",
            placeholder: "לדוגמה: תנאי שימוש / הצהרת נגישות / מדיניות פרטיות",
          },
          {
            key: "content",
            label: "התוכן שיופיע בחלון שנפתח",
            type: "textarea",
            placeholder: "הטקסט המלא שיוצג ללקוחות שלוחצים על הקישור הזה",
          },
        ],
      },
    ],
  },
];

export function getSectionDef(type: string): SectionDef | undefined {
  return SECTION_LIBRARY.find((s) => s.type === type);
}
