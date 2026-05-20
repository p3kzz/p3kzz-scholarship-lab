// ─── Scholarship Lab — Dropdown Options (Updated) ──────────────────────────
// Berdasarkan field spec terbaru onboarding & profile user

// ── Step 1: Personal Information ────────────────────────────────────────────

export const GENDER_OPTIONS = [
  { value: 'male',       label: 'Male' },
  { value: 'female',     label: 'Female' },
  { value: 'prefer_not', label: 'Prefer not to say' },
]

export const PROVINCES = [
  { value: 'aceh',                label: 'Aceh' },
  { value: 'sumatera_utara',      label: 'Sumatera Utara' },
  { value: 'sumatera_barat',      label: 'Sumatera Barat' },
  { value: 'riau',                label: 'Riau' },
  { value: 'jambi',               label: 'Jambi' },
  { value: 'sumatera_selatan',    label: 'Sumatera Selatan' },
  { value: 'bengkulu',            label: 'Bengkulu' },
  { value: 'lampung',             label: 'Lampung' },
  { value: 'kep_bangka_belitung', label: 'Kep. Bangka Belitung' },
  { value: 'kep_riau',            label: 'Kep. Riau' },
  { value: 'dki_jakarta',         label: 'DKI Jakarta' },
  { value: 'jawa_barat',          label: 'Jawa Barat' },
  { value: 'jawa_tengah',         label: 'Jawa Tengah' },
  { value: 'di_yogyakarta',       label: 'DI Yogyakarta' },
  { value: 'jawa_timur',          label: 'Jawa Timur' },
  { value: 'banten',              label: 'Banten' },
  { value: 'bali',                label: 'Bali' },
  { value: 'ntb',                 label: 'Nusa Tenggara Barat' },
  { value: 'ntt',                 label: 'Nusa Tenggara Timur' },
  { value: 'kalimantan_barat',    label: 'Kalimantan Barat' },
  { value: 'kalimantan_tengah',   label: 'Kalimantan Tengah' },
  { value: 'kalimantan_selatan',  label: 'Kalimantan Selatan' },
  { value: 'kalimantan_timur',    label: 'Kalimantan Timur' },
  { value: 'kalimantan_utara',    label: 'Kalimantan Utara' },
  { value: 'sulawesi_utara',      label: 'Sulawesi Utara' },
  { value: 'sulawesi_tengah',     label: 'Sulawesi Tengah' },
  { value: 'sulawesi_selatan',    label: 'Sulawesi Selatan' },
  { value: 'sulawesi_tenggara',   label: 'Sulawesi Tenggara' },
  { value: 'gorontalo',           label: 'Gorontalo' },
  { value: 'sulawesi_barat',      label: 'Sulawesi Barat' },
  { value: 'maluku',              label: 'Maluku' },
  { value: 'maluku_utara',        label: 'Maluku Utara' },
  { value: 'papua_barat',         label: 'Papua Barat' },
  { value: 'papua',               label: 'Papua' },
]

export const ECONOMIC_OPTIONS = [
  { value: 'very_low',     label: 'Very low income' },
  { value: 'low',          label: 'Low income' },
  { value: 'middle',       label: 'Middle income' },
  { value: 'upper_middle', label: 'Upper middle income' },
  { value: 'high',         label: 'High income' },
]

// ── Step 2: Academic ─────────────────────────────────────────────────────────

export const SCHOOL_LEVEL_OPTIONS = [
  { value: 'sma', label: 'SMA (High School)' },
  { value: 'smk', label: 'SMK (Vocational)' },
  { value: 'ma',  label: 'MA (Madrasah Aliyah)' },
]

export const MAJOR_OPTIONS = [
  { value: 'science',        label: 'IPA (Science)' },
  { value: 'social_studies', label: 'IPS (Social Studies)' },
  { value: 'languages',      label: 'Bahasa (Languages)' },
  { value: 'religion',       label: 'Agama (Religion)' },
  { value: 'vocational',     label: 'Vokasi (Vocational)' },
]

export const GRADE_OPTIONS = [
  { value: 'grade_10', label: 'Grade 10' },
  { value: 'grade_11', label: 'Grade 11' },
  { value: 'grade_12', label: 'Grade 12' },
]

export const SCHOOL_TIER_OPTIONS = [
  { value: 'excellence',   label: 'Excellence / Boarding school' },
  { value: 'public_a',     label: 'Public school, Accredited A' },
  { value: 'private_a',    label: 'Private school, Accredited A' },
  { value: 'accredited_b', label: 'Accredited B' },
  { value: 'accredited_c', label: 'Accredited C' },
  { value: 'unaccredited', label: 'Not yet accredited' },
  { value: 'unknown',      label: 'Unknown' },
]

export const OLYMPIAD_LEVELS = [
  { value: 'none',          label: 'Never competed' },
  { value: 'school',        label: 'School level' },
  { value: 'city',          label: 'City / District level' },
  { value: 'provincial',    label: 'Provincial level' },
  { value: 'national',      label: 'National level' },
  { value: 'international', label: 'International level' },
]

export const CAREER_TRACKS = [
  { value: 'academic',         label: 'Academic / Research' },
  { value: 'industry',         label: 'Industry / Tech' },
  { value: 'government',       label: 'Government service' },
  { value: 'ngo_npo',          label: 'NGO / NPO' },
  { value: 'entrepreneurship', label: 'Entrepreneurship' },
  { value: 'public_service',   label: 'Public service' },
]

// ── Step 3: Skills & Language ─────────────────────────────────────────────────

export const LANGUAGE_TESTS = [
  { value: 'ielts', label: 'IELTS', placeholder: 'Score (e.g. 6.5)' },
  { value: 'toefl', label: 'TOEFL', placeholder: 'Score (e.g. 550)' },
  { value: 'topik', label: 'TOPIK', placeholder: 'Level (e.g. 3)' },
  { value: 'jlpt',  label: 'JLPT',  placeholder: 'Level (e.g. N3)' },
  { value: 'delf',  label: 'DELF',  placeholder: 'Level (e.g. B2)' },
  { value: 'hsk',   label: 'HSK',   placeholder: 'Level (e.g. 4)' },
]

export const TARGET_COUNTRIES = [
  { value: 'china',        label: '🇨🇳 China' },
  { value: 'india',        label: '🇮🇳 India' },
  { value: 'indonesia',    label: '🇮🇩 Indonesia' },
  { value: 'japan',        label: '🇯🇵 Japan' },
  { value: 'malaysia',     label: '🇲🇾 Malaysia' },
  { value: 'philippines',  label: '🇵🇭 Philippines' },
  { value: 'singapore',    label: '🇸🇬 Singapore' },
  { value: 'south_korea',  label: '🇰🇷 South Korea' },
  { value: 'thailand',     label: '🇹🇭 Thailand' },
  { value: 'vietnam',      label: '🇻🇳 Vietnam' },
  { value: 'france',       label: '🇫🇷 France' },
  { value: 'germany',      label: '🇩🇪 Germany' },
  { value: 'netherlands',  label: '🇳🇱 Netherlands' },
  { value: 'sweden',       label: '🇸🇪 Sweden' },
  { value: 'uk',           label: '🇬🇧 United Kingdom' },
  { value: 'switzerland',  label: '🇨🇭 Switzerland' },
  { value: 'canada',       label: '🇨🇦 Canada' },
  { value: 'usa',          label: '🇺🇸 United States' },
  { value: 'argentina',    label: '🇦🇷 Argentina' },
  { value: 'brazil',       label: '🇧🇷 Brazil' },
  { value: 'chile',        label: '🇨🇱 Chile' },
  { value: 'egypt',        label: '🇪🇬 Egypt' },
  { value: 'kenya',        label: '🇰🇪 Kenya' },
  { value: 'morocco',      label: '🇲🇦 Morocco' },
  { value: 'nigeria',      label: '🇳🇬 Nigeria' },
  { value: 'south_africa', label: '🇿🇦 South Africa' },
  { value: 'australia',    label: '🇦🇺 Australia' },
  { value: 'new_zealand',  label: '🇳🇿 New Zealand' },
]

// ── Default empty profile ─────────────────────────────────────────────────────
// Initial state untuk ProfileContext

export const EMPTY_PROFILE = {
  // Step 1 — Personal Information
  fullName:                   '',
  province:                   '',    // value dari PROVINCES
  gender:                     '',    // value dari GENDER_OPTIONS
  dateOfBirth:                '',    // ISO date string
  economicBg:                 '',    // value dari ECONOMIC_OPTIONS
  fromUnderrepresentedRegion: null,  // boolean

  // Step 2 — Academic
  schoolLevel:     '',    // value dari SCHOOL_LEVEL_OPTIONS
  major:           '',    // value dari MAJOR_OPTIONS
  grade:           '',    // value dari GRADE_OPTIONS
  schoolName:      '',    // free text
  schoolTier:      '',    // value dari SCHOOL_TIER_OPTIONS
  graduationYear:  '',    // number
  avgGrade:        0,     // 0-100 (slider)
  mathScore:       0,     // 0-100 (slider)
  englishScore:    0,     // 0-100 (slider)
  majorSubjectAvg: 0,     // 0-100 (slider)
  extracurricular: '',    // free textarea
  olympiadLevel:   '',    // value dari OLYMPIAD_LEVELS
  careerTrack:     '',    // value dari CAREER_TRACKS
  willingReturn:   null,  // boolean
  needsFullFunding:null,  // boolean

  // Step 3 — Skills & Language
  hardSkills:       [],   // string[]
  softSkills:       [],   // string[]
  languageSkills:   [],   // string[] (free tag)
  langCertificates: [],   // { test, score, validUntil }[]
  targetCountries:  [],   // value[] dari TARGET_COUNTRIES
}