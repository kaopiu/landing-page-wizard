export type FieldType = "text" | "textarea" | "email" | "url" | "checkbox" | "repeater";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  /** excluded from "Fill with AI" — for real business facts (phone, address, email) an AI must never invent */
  noAiFill?: boolean;
  /** for type "repeater": the shape of each item */
  itemFields?: FieldDef[];
  itemLabel?: string;
};

export type SectionDef = {
  type: string;
  label: string;
  description: string;
  icon: string;
  fields: FieldDef[];
  /** at most one instance of this section type can be added to a site */
  singleton?: boolean;
  /** shown with a red "required" indicator in the picker as an almost-essential section */
  recommended?: boolean;
};

export type RepeaterItem = Record<string, string>;
export type FieldValue = string | boolean | RepeaterItem[];

export type SectionInstance = {
  /** unique instance id, stable across reorder */
  id: string;
  type: string;
  fields: Record<string, FieldValue>;
};

export type BusinessInfo = {
  name: string;
  description: string;
  email: string;
};

export type ColorScheme = {
  primary: string;
  secondary: string;
  accent: string;
  extra1: string;
  extra2: string;
};

export type StyleBrief = {
  stylePreset: string;
  /** free-text style description, used when stylePreset === "custom" */
  customStyleDescription: string;
  industry: string;
  goal: string;
  referenceUrl: string;
  /** client is open to the AI adjusting the exact colors to better fit the chosen style */
  flexibleColors: boolean;
};

export type SiteConfig = {
  colors: ColorScheme;
  style_brief: StyleBrief;
  sections: { type: string; fields: Record<string, FieldValue> }[];
};

export type SubmissionPayload = {
  client_name: string;
  client_email: string;
  site_config: SiteConfig;
};
