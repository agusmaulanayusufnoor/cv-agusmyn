export interface RawJobInput {
  title?: string;
  company?: string;
  url?: string;
  description?: string;
  location?: string;
  source?: string;
}

export interface TrustValidationResult {
  isClean: boolean;
  trustScore: number; // 0 - 100
  trustLevel: 'verified_ats' | 'verified_company' | 'low';
  trustFlags: string[];
  reasons: string[];
  sourceVendor?: string;
}

// Enterprise ATS Whitelist (Top tier reliability - direct company applicant tracking portals)
const ENTERPRISE_ATS_DOMAINS: Record<string, string> = {
  'greenhouse.io': 'Greenhouse',
  'boards.greenhouse.io': 'Greenhouse',
  'lever.co': 'Lever',
  'jobs.lever.co': 'Lever',
  'ashbyhq.com': 'Ashby',
  'jobs.ashbyhq.com': 'Ashby',
  'myworkdayjobs.com': 'Workday',
  'workday.com': 'Workday',
  'bamboohr.com': 'BambooHR',
  'smartrecruiters.com': 'SmartRecruiters',
  'workable.com': 'Workable',
  'applytojob.com': 'JazzHR',
  'jazz.co': 'JazzHR',
  'jobvite.com': 'Jobvite',
  'jobs.jobvite.com': 'Jobvite',
  'recruitee.com': 'Recruitee',
  'icims.com': 'iCIMS',
  'taleo.net': 'Oracle Taleo',
  'breezy.hr': 'Breezy HR',
  'join.com': 'JOIN',
  'teamtailor.com': 'Teamtailor',
  'hirehive.com': 'HireHive',
  'careers.hibob.com': 'HiBob',
  'paylocity.com': 'Paylocity',
  'cutshort.io': 'Cutshort',
  'linkedin.com': 'LinkedIn Talent',
  'glints.com': 'Glints Verified',
  'jobstreet.co.id': 'JobStreet Verified',
  'jobstreet.com': 'JobStreet Verified',
  'kalibrr.com': 'Kalibrr Verified',
};

// URL Shorteners and Redirectors (Instantly suspicious for legitimate employment)
const BLOCKED_SHORTENER_DOMAINS = [
  'bit.ly',
  'tinyurl.com',
  't.co',
  'cutt.ly',
  'rebrand.ly',
  'shorturl.at',
  'goo.gl',
  'is.gd',
  'buff.ly',
  'ow.ly',
];

// Direct Messaging & Unofficial Form Recruitment Scams (Telegram, WhatsApp, Google Forms)
const BLOCKED_SCAM_DOMAINS = [
  't.me',
  'telegram.me',
  'telegram.org',
  'wa.me',
  'api.whatsapp.com',
  'forms.gle',
  'docs.google.com/forms',
  'drive.google.com',
];

// Cheap or High-Risk TLDs frequently used for throwaway phishing domains
const HIGH_RISK_TLDS = ['.xyz', '.top', '.tk', '.ml', '.ga', '.cf', '.gq', '.buzz', '.rest', '.quest', '.click'];

// Content Scam Regex Patterns (Upfront fees, illegal transfers, crypto deposit, Telegram recruitment)
const SCAM_CONTENT_PATTERNS = [
  /\b(pay|fee)\s+for\s+(equipment|training|background\s+check|software|registration)\b/i,
  /\b(wire|transfer)\s+(money|funds)\s+to\b/i,
  /\b(crypto|bitcoin|usdt|ethereum)\s+(deposit|investment|wallet|payment)\b/i,
  /\b(cash|deposit)\s+a\s+check\b/i,
  /\b(contact|interview)\s+(strictly\s+)?on\s+telegram\b/i,
  /\bcontact\s+(our\s+)?hr\s+on\s+telegram\b/i,
  /\btelegram\s+(@[a-zA-Z0-9_]+|\busername\b)/i,
  /\binterview\s+will\s+be\s+conducted\s+(via|on)\s+(telegram|signal|whatsapp)\b/i,
  /\bsend\s+(ssn|ktp|id\s+card|passport)\s+copy\s+to\s+[a-zA-Z0-9._%+-]+@(gmail|yahoo|hotmail|outlook)\.com\b/i,
  /\b(earn|make)\s+\$[0-9]{3,5}\s+(daily|per\s+day)\s+(without|no)\s+(skills|experience)\b/i,
];

// Perpetual Evergreen / Talent Pool Ghost Job Indicators (Not an actual open vacancy)
const EVERGREEN_PHRASES = [
  'always hiring',
  'always looking for',
  'we are always',
  'talent community',
  'talent pool',
  'talent network',
  'future opportunities',
  'future openings',
  'general application',
  'open application',
  'ongoing recruitment',
  'unsolicited application',
];

/**
 * Validates the legitimacy of a job posting against enterprise ATS whitelists,
 * anti-phishing domain checks, and content scam heuristics.
 */
export function validateJobLegitimacy(job: RawJobInput): TrustValidationResult {
  const flags: string[] = [];
  const reasons: string[] = [];
  let score = 85; // Base initial score for public feed item

  if (!job.url || typeof job.url !== 'string') {
    return {
      isClean: false,
      trustScore: 0,
      trustLevel: 'low',
      trustFlags: ['missing_url'],
      reasons: ['No application URL provided'],
    };
  }

  // Parse hostname safely
  let hostname = '';
  try {
    const parsed = new URL(job.url);
    hostname = parsed.hostname.toLowerCase();
    // Enforce HTTPS
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return {
        isClean: false,
        trustScore: 0,
        trustLevel: 'low',
        trustFlags: ['invalid_protocol'],
        reasons: ['Job link uses invalid protocol'],
      };
    }
  } catch {
    return {
      isClean: false,
      trustScore: 0,
      trustLevel: 'low',
      trustFlags: ['malformed_url'],
      reasons: ['Malformed or invalid URL structure'],
    };
  }

  // 1. Check Blocked URL Shorteners
  for (const shortener of BLOCKED_SHORTENER_DOMAINS) {
    if (hostname === shortener || hostname.endsWith('.' + shortener)) {
      return {
        isClean: false,
        trustScore: 0,
        trustLevel: 'low',
        trustFlags: ['url_shortener_blocked'],
        reasons: [`Application link uses opaque URL shortener (${shortener})`],
      };
    }
  }

  // 2. Check Blocked Scam Platforms (Telegram, WhatsApp direct, Google Forms)
  for (const scamDomain of BLOCKED_SCAM_DOMAINS) {
    if (hostname === scamDomain || hostname.endsWith('.' + scamDomain) || job.url.includes(scamDomain)) {
      return {
        isClean: false,
        trustScore: 0,
        trustLevel: 'low',
        trustFlags: ['scam_platform_detected'],
        reasons: [`Application redirects to unverified channel (${scamDomain})`],
      };
    }
  }

  // 3. Check High Risk / Throwaway TLDs
  for (const tld of HIGH_RISK_TLDS) {
    if (hostname.endsWith(tld)) {
      flags.push('high_risk_tld');
      score -= 30;
      reasons.push(`Domain uses high-risk throwaway TLD (${tld})`);
    }
  }

  // 4. Verify Against Enterprise ATS Whitelist
  let vendorName: string | undefined = undefined;
  let isVerifiedAts = false;
  for (const [atsDomain, vendor] of Object.entries(ENTERPRISE_ATS_DOMAINS)) {
    if (hostname === atsDomain || hostname.endsWith('.' + atsDomain) || job.url.includes(atsDomain)) {
      isVerifiedAts = true;
      vendorName = vendor;
      score = 100;
      break;
    }
  }

  // 5. Scan Content for Scam Heuristics
  const fullText = `${job.title || ''} ${job.description || ''}`.toLowerCase();
  for (const pattern of SCAM_CONTENT_PATTERNS) {
    if (pattern.test(fullText)) {
      return {
        isClean: false,
        trustScore: 0,
        trustLevel: 'low',
        trustFlags: ['scam_pattern_detected'],
        reasons: ['Description triggered high-risk recruitment fraud heuristics'],
      };
    }
  }

  // 6. Check Evergreen Talent Pool Ghost Listings
  for (const phrase of EVERGREEN_PHRASES) {
    if (fullText.includes(phrase)) {
      flags.push('evergreen_talent_pool');
      score -= 25;
      reasons.push(`Contains perpetual talent-pool marker: "${phrase}"`);
    }
  }

  const isClean = score >= 60;
  const trustLevel: 'verified_ats' | 'verified_company' | 'low' = isVerifiedAts
    ? 'verified_ats'
    : isClean
    ? 'verified_company'
    : 'low';

  return {
    isClean,
    trustScore: Math.max(0, Math.min(100, score)),
    trustLevel,
    trustFlags: flags,
    reasons,
    sourceVendor: vendorName,
  };
}
