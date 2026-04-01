import {
  Document,
  Page,
  View,
  Text,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// ─── Font registration ─────────────────────────────────────────────────────
// This module is only loaded client-side (ssr: false on the dynamic import),
// so window is always defined here. We build an absolute URL so @react-pdf/renderer
// can fetch the OTF files over HTTP. Falls back to built-in Helvetica if the
// fetch fails (e.g. dev server not yet started / file not found).
let FONT_FAMILY = "Helvetica";
let FONT_BOLD = "Helvetica-Bold";

if (typeof window !== "undefined") {
  try {
    const base = window.location.origin;
    Font.register({
      family: "AttenRoundNew",
      fonts: [
        { src: `${base}/fonts/AttenRoundNewRegular.otf`, fontWeight: 400 },
        { src: `${base}/fonts/AttenRoundNewBold.otf`, fontWeight: 700 },
      ],
    });
    FONT_FAMILY = "AttenRoundNew";
    FONT_BOLD = "AttenRoundNew";
  } catch {
    // Fallback to built-in Helvetica — PDF still renders cleanly
  }
}

Font.registerHyphenationCallback((word) => [word]);

// ─── Emoji sanitizer ──────────────────────────────────────────────────────
// Strips emoji/pictograph code points that PDFKit cannot render.
// Bullet-style emojis are replaced with the PDF-safe • character.
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

  // ── Two-column layout ──────────────────────────────────────────────────
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

  // ── Name / title block ─────────────────────────────────────────────────
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

  // ── Section heading ────────────────────────────────────────────────────
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

  // ── Contact ────────────────────────────────────────────────────────────
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

  // ── Education ──────────────────────────────────────────────────────────
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

  // ── Skills ─────────────────────────────────────────────────────────────
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

  // ── Achievements ───────────────────────────────────────────────────────
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

  // ── Summary ────────────────────────────────────────────────────────────
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

  // ── Language pills ─────────────────────────────────────────────────────
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

  // ── Experience entries ─────────────────────────────────────────────────
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

// ─── Data ─────────────────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    title: "Assistant Financial Controller",
    company: "Humanise Collective",
    dates: "May 2025 - Present",
    url: "https://www.humanise.world/",
    bullets: [
      "Right hand to financial management for an 8-agency marketing communications group.",
      "Full accounting cycle, consolidated reporting, process automation via NetSuite, PowerQuery, and Google Scripts.",
    ],
  },
  {
    title: "Chief Accountant",
    company: "Signe Local",
    dates: "Sep 2023 - May 2025",
    url: "https://www.signelocal.com",
    bullets: [
      "Financial oversight for 4 physical stores and eCommerce platform.",
      "Inventory monitoring, financial forecasting, and funds reconciliation.",
    ],
  },
  {
    title: "Financial Controller",
    company: "Le Belvoir",
    dates: "Apr 2023 - May 2025",
    url: "https://www.manoirs.ca",
    bullets: [
      "Bookkeeping, reconciliation, budgeting, and tax planning for a heritage hospitality and event company.",
    ],
  },
  {
    title: "Project Accountant",
    company: "Renovco",
    dates: "Sep 2022 - Apr 2023",
    url: "https://www.renovco.com",
    bullets: [
      "Project-based accounting support; A/R + A/P cycles; budget alignment with project managers.",
    ],
  },
  {
    title: "Central Poll Supervisor",
    company: "Elections Canada",
    dates: "Oct 2018 - Ongoing",
    url: "https://www.elections.ca/",
    bullets: [
      "Leads teams of 8 as polling supervisor for federal and provincial elections.",
      "Appointed supervisor after proving as clerk and Deputy Returning Officer.",
    ],
  },
  {
    title: "Customer Service & Sales",
    company: "Costco Wholesale",
    dates: "Apr 2020 - Aug 2020",
    url: "https://www.costco.ca/",
    bullets: [
      "Featured on Membership dept. Top Employees board for credit card and membership conversion performance.",
    ],
  },
  {
    title: "Fundraiser",
    company: "Public Outreach Fundraising",
    dates: "Jan 2018 - May 2020",
    url: "https://www.publicoutreachgroup.com",
    bullets: [
      "Door-to-door recurring donation campaigns for Doctors Without Borders, Greenpeace, UNICEF, Amnesty International, and CARE.",
    ],
  },
];

const EDUCATION = [
  {
    institution: "Universite de Sherbrooke",
    credential: "DESS - Specialized Graduate Diploma in Accounting",
    dates: "Sep 2023 - Sep 2025",
    note: "CPA CFE preparation. Passed December 2025.",
  },
  {
    institution: "HEC Montreal",
    credential: "BBA - Bachelor of Business Administration",
    dates: "Sep 2018 - Apr 2023",
    note: "Major: Accounting. Trilingual program (FR/EN/ES).",
  },
  {
    institution: "Universidad Carlos III de Madrid",
    credential: "Student Exchange",
    dates: "Jan 2022 - Jul 2022",
    note: "Semester exchange - Madrid, Spain.",
  },
  {
    institution: "Jean Giono Intl. School of Turin",
    credential: "Baccalaureat Scientifique",
    dates: "2014 - 2017",
    note: "Math spec. Grade: 18.67/20 (approx. 4.3 GPA). Trilingual (FR/EN/ES).",
  },
];

const SKILLS = [
  {
    label: "Systems & Tools",
    body: "Microsoft Power Query · Google Apps Script · NetSuite · Microsoft Excel",
  },
  {
    label: "Accounting",
    body: "Multi-entity accounting · Variance analysis · Financial reporting · Tax compliance · Budget preparation · Treasury management",
  },
  {
    label: "Process",
    body: "Process automation · Process modeling · Strategic planning · Project management",
  },
  {
    label: "Languages",
    body: "French (native) · Italian (native) · English (professional) · Spanish (professional)",
  },
];

const LANGUAGES = ["French", "English", "Spanish", "Italian"];

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

function LeftColumn() {
  return (
    <View style={S.leftCol}>
      {/* Name */}
      <Text style={S.name}>{"William\nSeguin"}</Text>
      <Text style={S.headline}>{"CPA · Assistant Financial Controller"}</Text>

      {/* Contact */}
      <SectionHeading label="Contact" />
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
      <SectionHeading label="Education" />
      {EDUCATION.map((edu) => (
        <View key={edu.institution} style={S.eduEntry}>
          <Text style={S.eduInstitution}>{sanitize(edu.institution)}</Text>
          <Text style={S.eduCredential}>{sanitize(edu.credential)}</Text>
          <Text style={S.eduDate}>{sanitize(edu.dates)}</Text>
          {edu.note ? (
            <Text style={S.eduNote}>{sanitize(edu.note)}</Text>
          ) : null}
        </View>
      ))}

      {/* Skills */}
      <SectionHeading label="Skills" />
      {SKILLS.map((sk) => (
        <View key={sk.label} style={S.skillGroup}>
          <Text style={S.skillGroupLabel}>{sanitize(sk.label)}</Text>
          <Text style={S.skillGroupBody}>{sanitize(sk.body)}</Text>
        </View>
      ))}

      {/* Achievements */}
      <SectionHeading label="Achievements" />
      <View style={S.achievementEntry}>
        <Text style={S.achievementTitle}>
          {"Prix Poesie en Liberte - 2nd Prize"}
        </Text>
        <Text style={S.achievementBody}>
          {"International French-language poetry competition (Nov 2016), French Ministry of Education. 100,000+ entries from ages 15-25 across all countries."}
        </Text>
      </View>
      <View style={S.achievementEntry}>
        <Text style={S.achievementTitle}>
          {"CPA Quebec - December 2025"}
        </Text>
        <Text style={S.achievementBody}>
          {"Certified Public Accountant designation, CPA Quebec."}
        </Text>
      </View>
    </View>
  );
}

// ─── Right Column ─────────────────────────────────────────────────────────

function RightColumn() {
  return (
    <View style={S.rightCol}>
      {/* Summary */}
      <SectionHeading label="Profile" />
      <View style={S.summaryBox}>
        <Text style={S.summaryText}>
          {"\"I'm a CPA and Assistant Financial Controller who operates at the intersection of accounting and systems architecture. My north is the total obliteration of legacy manual workflows.\""}
        </Text>
      </View>
      <Text style={S.summarySubText}>
        {"William Seguin translates fluently between IT (JSON) and finance (GAAP), and believes removing tedious manual work is a prerequisite for strong company culture. Holding EU citizenship and family ties in Switzerland, he maintains a natural connection to the Swiss and European market."}
      </Text>

      {/* Language tags */}
      <View style={S.langRow}>
        {LANGUAGES.map((lang) => (
          <View key={lang} style={S.langPill}>
            <Text>{lang}</Text>
          </View>
        ))}
      </View>

      {/* Experience */}
      <SectionHeading label="Work Experience" />
      {EXPERIENCE.map((role, i) => (
        <View key={role.company} style={S.expEntry} wrap={false}>
          <View style={S.expHeader}>
            <Text style={S.expTitle}>{sanitize(role.title)}</Text>
            <Text style={S.expDate}>{sanitize(role.dates)}</Text>
          </View>
          {role.url ? (
            <Link src={role.url} style={S.expCompany}>
              {sanitize(role.company)}
            </Link>
          ) : (
            <Text style={S.expCompany}>{sanitize(role.company)}</Text>
          )}
          {role.bullets.map((b, j) => (
            <Bullet key={j} text={b} />
          ))}
          {i < EXPERIENCE.length - 1 && <View style={S.expDivider} />}
        </View>
      ))}
    </View>
  );
}

// ─── Document ─────────────────────────────────────────────────────────────

export function ResumePDF() {
  return (
    <Document
      title="William Seguin - Resume"
      author="William Seguin"
      subject="CPA - Assistant Financial Controller"
      keywords="CPA, accounting, financial controller, Montreal"
      creator="williamseguin.com"
    >
      <Page size="LETTER" style={S.page}>
        <View style={S.columns}>
          <LeftColumn />
          <RightColumn />
        </View>
      </Page>
    </Document>
  );
}
