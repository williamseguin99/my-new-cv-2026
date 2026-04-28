import {
  Document,
  Page,
  View,
  Text,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { Dictionary } from "@/i18n/types";

// ─── Font registration ─────────────────────────────────────────────────────
let FONT_FAMILY = "Helvetica";
let FONT_BOLD = "Helvetica-Bold";

Font.registerHyphenationCallback((word) => [word]);

// ─── Emoji sanitizer ──────────────────────────────────────────────────────
const ALL_EMOJI_RE =
  /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FEFF}\u{E0000}-\u{E01FF}]/gu;

function sanitize(str: string): string {
  return str
    .replace(ALL_EMOJI_RE, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// ─── Color tokens ─────────────────────────────────────────────────────────
const C = {
  primary: "#5e0b15",
  accent: "#ffba7a",
  body: "#2a2a2a",
  muted: "#666666",
  light: "#999999",
  white: "#ffffff",
  divider: "#e0e0e0",
} as const;

// ─── Styles ───────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  page: {
    backgroundColor: C.white,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 36,
    paddingRight: 36,
    fontSize: 9,
    color: C.body,
  },
  columns: {
    flexDirection: "row",
    gap: 18,
    flex: 1,
  },
  leftCol: {
    flex: 3,
    flexDirection: "column",
    gap: 0,
  },
  rightCol: {
    flex: 7,
    flexDirection: "column",
    gap: 0,
  },
  name: {
    fontSize: 22,
    fontFamily: FONT_BOLD,
    fontWeight: 700,
    color: C.primary,
    lineHeight: 1.1,
    marginBottom: 2,
  },
  headline: {
    fontSize: 9,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    color: C.muted,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  sectionHeading: {
    fontSize: 7,
    fontFamily: FONT_BOLD,
    fontWeight: 700,
    color: C.primary,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 5,
    marginTop: 12,
  },
  accentRule: {
    borderBottomWidth: 1.5,
    borderBottomColor: C.accent,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
    gap: 4,
  },
  contactLabel: {
    fontSize: 8,
    fontFamily: FONT_BOLD,
    fontWeight: 700,
    color: C.muted,
    width: 14,
    paddingTop: 0.5,
  },
  contactValue: {
    fontSize: 8,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    color: C.body,
    flex: 1,
    lineHeight: 1.3,
  },
  contactLink: {
    fontSize: 8,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    color: C.primary,
    textDecoration: "none",
    flex: 1,
    lineHeight: 1.3,
  },
  eduEntry: {
    marginBottom: 8,
  },
  eduInstitution: {
    fontSize: 8,
    fontFamily: FONT_BOLD,
    fontWeight: 700,
    color: C.body,
    lineHeight: 1.3,
  },
  eduCredential: {
    fontSize: 7.5,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    color: C.muted,
    lineHeight: 1.3,
  },
  eduDate: {
    fontSize: 7,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    color: C.accent,
    marginTop: 1,
  },
  eduNote: {
    fontSize: 7,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    color: C.light,
    marginTop: 1,
    lineHeight: 1.3,
  },
  skillGroup: {
    marginBottom: 5,
  },
  skillGroupLabel: {
    fontSize: 7,
    fontFamily: FONT_BOLD,
    fontWeight: 700,
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  skillGroupBody: {
    fontSize: 7.5,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    color: C.body,
    lineHeight: 1.4,
  },
  achievementEntry: {
    marginBottom: 5,
  },
  achievementTitle: {
    fontSize: 8,
    fontFamily: FONT_BOLD,
    fontWeight: 700,
    color: C.body,
    lineHeight: 1.3,
  },
  achievementBody: {
    fontSize: 7,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    color: C.muted,
    lineHeight: 1.4,
    marginTop: 1,
  },
  summaryBox: {
    borderLeftWidth: 2.5,
    borderLeftColor: C.accent,
    paddingLeft: 8,
    marginBottom: 4,
    marginTop: 2,
  },
  summaryText: {
    fontSize: 9,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    color: C.body,
    lineHeight: 1.55,
  },
  summarySubText: {
    fontSize: 8,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    color: C.muted,
    lineHeight: 1.5,
    marginTop: 4,
  },
  langRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
    marginBottom: 2,
  },
  langPill: {
    fontSize: 7,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    color: C.primary,
    borderWidth: 0.5,
    borderColor: C.accent,
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 1.5,
  },
  expEntry: {
    marginBottom: 9,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  expTitle: {
    fontSize: 9,
    fontFamily: FONT_BOLD,
    fontWeight: 700,
    color: C.body,
    flex: 1,
  },
  expDate: {
    fontSize: 7.5,
    fontFamily: FONT_BOLD,
    fontWeight: 700,
    color: C.accent,
    textAlign: "right",
  },
  expCompany: {
    fontSize: 8,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    color: C.primary,
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 2,
  },
  bulletDot: {
    fontSize: 7.5,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    color: C.accent,
    paddingTop: 1,
    width: 6,
  },
  bulletText: {
    fontSize: 7.5,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    color: C.muted,
    lineHeight: 1.4,
    flex: 1,
  },
  expDivider: {
    borderBottomWidth: 0.5,
    borderBottomColor: C.divider,
    marginBottom: 8,
  },
});

// ─── Static URL config (not text content — not from dict) ─────────────────
const ROLE_URLS: Record<string, string> = {
  humanise: "https://www.humanise.world/",
  signe_local: "https://www.signelocal.com",
  belvoir: "https://www.manoirs.ca",
  renovco: "https://www.renovco.com",
  elections_canada: "https://www.elections.ca/",
  costco: "https://www.costco.ca/",
  public_outreach: "https://www.publicoutreachgroup.com",
};

const ROLE_KEYS = [
  "humanise",
  "signe_local",
  "belvoir",
  "renovco",
  "elections_canada",
  "costco",
  "public_outreach",
] as const;

const SCHOOL_KEYS = ["sherbrooke", "hec", "uc3m", "jean_giono"] as const;

// ─── Sub-components ───────────────────────────────────────────────────────

function SectionHeading({ label }: { label: string }) {
  return (
    <View>
      <Text style={S.sectionHeading}>{sanitize(label)}</Text>
      <View style={S.accentRule} />
    </View>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={S.bulletRow}>
      <Text style={S.bulletDot}>{"\u2022"}</Text>
      <Text style={S.bulletText}>{sanitize(text)}</Text>
    </View>
  );
}

// ─── Left Column ──────────────────────────────────────────────────────────

function LeftColumn({ dict }: { dict: Dictionary }) {
  const skills = [
    { label: dict.pdf.skills.systems_label, body: dict.pdf.skills.systems_body },
    { label: dict.pdf.skills.accounting_label, body: dict.pdf.skills.accounting_body },
    { label: dict.pdf.skills.process_label, body: dict.pdf.skills.process_body },
    { label: dict.pdf.skills.languages_label, body: dict.pdf.skills.languages_body },
  ];

  return (
    <View style={S.leftCol}>
      {/* Name */}
      <Text style={S.name}>{"William\nSeguin"}</Text>
      <Text style={S.headline}>{sanitize(dict.pdf.headline)}</Text>

      {/* Contact */}
      <SectionHeading label={dict.pdf.section_contact} />
      <View style={S.contactRow}>
        <Text style={S.contactLabel}>{"@"}</Text>
        <Link src="mailto:hello@williamseguin.com" style={S.contactLink}>
          {"hello@williamseguin.com"}
        </Link>
      </View>
      <View style={S.contactRow}>
        <Text style={S.contactLabel}>{"Tel"}</Text>
        <Link src="tel:+14388386087" style={S.contactLink}>
          {"+1 (438) 838-6087"}
        </Link>
      </View>
      <View style={S.contactRow}>
        <Text style={S.contactLabel}>{"Web"}</Text>
        <Link src="https://www.williamseguin.com" style={S.contactLink}>
          {"williamseguin.com"}
        </Link>
      </View>
      <View style={S.contactRow}>
        <Text style={S.contactLabel}>{"in"}</Text>
        <Link
          src="https://www.linkedin.com/in/william-seguin-cpa"
          style={S.contactLink}
        >
          {"william-seguin-cpa"}
        </Link>
      </View>
      <View style={S.contactRow}>
        <Text style={S.contactLabel}>{"Loc"}</Text>
        <Text style={S.contactValue}>{"Montreal, QC"}</Text>
      </View>

      {/* Education */}
      <SectionHeading label={dict.pdf.section_education} />
      {SCHOOL_KEYS.map((key) => {
        const school = dict.education.schools[key];
        const note = school.notes as string;
        return (
          <View key={key} style={S.eduEntry}>
            <Text style={S.eduInstitution}>{sanitize(school.institution)}</Text>
            <Text style={S.eduCredential}>{sanitize(school.credential)}</Text>
            <Text style={S.eduDate}>{sanitize(school.dates)}</Text>
            {note ? (
              <Text style={S.eduNote}>{sanitize(note)}</Text>
            ) : null}
          </View>
        );
      })}

      {/* Skills */}
      <SectionHeading label={dict.pdf.section_skills} />
      {skills.map((sk) => (
        <View key={sk.label} style={S.skillGroup}>
          <Text style={S.skillGroupLabel}>{sanitize(sk.label)}</Text>
          <Text style={S.skillGroupBody}>{sanitize(sk.body)}</Text>
        </View>
      ))}

      {/* Achievements */}
      <SectionHeading label={dict.pdf.section_achievements} />
      <View style={S.achievementEntry}>
        <Text style={S.achievementTitle}>
          {sanitize(dict.pdf.achievements.poetry_title)}
        </Text>
        <Text style={S.achievementBody}>
          {sanitize(dict.pdf.achievements.poetry_body)}
        </Text>
      </View>
      <View style={S.achievementEntry}>
        <Text style={S.achievementTitle}>
          {sanitize(dict.pdf.achievements.cpa_title)}
        </Text>
        <Text style={S.achievementBody}>
          {sanitize(dict.pdf.achievements.cpa_body)}
        </Text>
      </View>
    </View>
  );
}

// ─── Right Column ─────────────────────────────────────────────────────────

function RightColumn({ dict }: { dict: Dictionary }) {
  // Derive language pills by splitting the languages_body on " · " and taking the word before "("
  const langPills = (dict.pdf.skills.languages_body as string)
    .split(" · ")
    .map((entry) => entry.split("(")[0].trim());

  return (
    <View style={S.rightCol}>
      {/* Summary */}
      <SectionHeading label={dict.pdf.section_profile} />
      <View style={S.summaryBox}>
        <Text style={S.summaryText}>
          {sanitize(dict.pdf.profile_quote)}
        </Text>
      </View>
      <Text style={S.summarySubText}>
        {sanitize(dict.pdf.profile_sub)}
      </Text>

      {/* Language tags */}
      <View style={S.langRow}>
        {langPills.map((lang) => (
          <View key={lang} style={S.langPill}>
            <Text>{lang}</Text>
          </View>
        ))}
      </View>

      {/* Experience */}
      <SectionHeading label={dict.pdf.section_experience} />
      {ROLE_KEYS.map((key, i) => {
        const role = dict.career.roles[key];
        const bullets = role.bullets as string[];
        const url = ROLE_URLS[key];
        return (
          <View key={key} style={S.expEntry} wrap={false}>
            <View style={S.expHeader}>
              <Text style={S.expTitle}>{sanitize(role.title)}</Text>
              <Text style={S.expDate}>{sanitize(role.dates)}</Text>
            </View>
            {url ? (
              <Link src={url} style={S.expCompany}>
                {sanitize(role.company)}
              </Link>
            ) : (
              <Text style={S.expCompany}>{sanitize(role.company)}</Text>
            )}
            {bullets.map((b, j) => (
              <Bullet key={j} text={b} />
            ))}
            {i < ROLE_KEYS.length - 1 && <View style={S.expDivider} />}
          </View>
        );
      })}
    </View>
  );
}

// ─── Document ─────────────────────────────────────────────────────────────

interface ResumePDFProps {
  dict: Dictionary;
}

export function ResumePDF({ dict }: ResumePDFProps) {
  return (
    <Document
      title={dict.pdf.document_title}
      author="William Seguin"
      subject="CPA - Assistant Financial Controller"
      keywords="CPA, accounting, financial controller, Montreal"
      creator="williamseguin.com"
    >
      <Page size="LETTER" style={S.page}>
        <View style={S.columns}>
          <LeftColumn dict={dict} />
          <RightColumn dict={dict} />
        </View>
      </Page>
    </Document>
  );
}
