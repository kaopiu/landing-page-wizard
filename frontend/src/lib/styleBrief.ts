export type StylePresetDef = {
  value: string;
  label: string;
  emoji: string;
  vibe: string;
};

export const STYLE_PRESETS: StylePresetDef[] = [
  {
    value: "professional",
    label: "מקצועי",
    emoji: "💼",
    vibe: "נקי, אמין, בלי הפתעות — טיפוגרפיה מסודרת וריווח נושם",
  },
  {
    value: "minimalist",
    label: "מינימליסטי",
    emoji: "◽",
    vibe: "הכי פחות שאפשר, הכי הרבה שצריך — הרבה לבן, פונט דק, שקט",
  },
  {
    value: "bold",
    label: "נועז",
    emoji: "⚡",
    vibe: "צבעים חזקים, כותרות ענקיות, אנרגיה שקופצת מהמסך",
  },
  {
    value: "warm",
    label: "חם וידידותי",
    emoji: "🌤️",
    vibe: "פינות מעוגלות, גוונים חמים, מרגיש כמו שיחה עם חבר",
  },
  {
    value: "elegant",
    label: "אלגנטי",
    emoji: "🥂",
    vibe: "יוקרתי ומאופק — פונטים דקים, ניגודיות עדינה, המון קלאס",
  },
  {
    value: "custom",
    label: "קצת אחר",
    emoji: "🎭",
    vibe: "יש לכם וייב משלכם? ספרו לנו עליו במילים שלכם",
  },
];

export type IndustryDef = { value: string; label: string; emoji: string };

export const INDUSTRIES: IndustryDef[] = [
  { value: "restaurant", label: "מסעדה / בית קפה", emoji: "🍽️" },
  { value: "local_service", label: "שירות מקומי", emoji: "🔧" },
  { value: "consulting", label: "ייעוץ", emoji: "📊" },
  { value: "creative_portfolio", label: "קריאייטיב / תיק עבודות", emoji: "🎨" },
  { value: "fitness", label: "כושר ובריאות", emoji: "🏋️" },
  { value: "other", label: "אחר", emoji: "✨" },
];

export type GoalDef = { value: string; label: string; emoji: string; hint: string };

export const GOALS: GoalDef[] = [
  { value: "get_contacted", label: "לקבל פניות", emoji: "📞", hint: "לידים, טפסים, וואטסאפ" },
  { value: "showcase_work", label: "להציג עבודות", emoji: "🖼️", hint: "פורטפוליו, גלריה" },
  { value: "build_awareness", label: "לבנות מודעות למותג", emoji: "📣", hint: "חשיפה, אמינות, סיפור" },
];
