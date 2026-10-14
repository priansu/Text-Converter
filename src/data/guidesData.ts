import React from 'react';

export interface GuideArticleData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  lastUpdated: string;
  originalSource: {
    name: string;
    url: string;
    authority: string;
    summary: string;
  };
  summary: string;
  sections: {
    title: string;
    content: string;
    codeExample?: {
      language: string;
      code: string;
      caption?: string;
    };
    table?: {
      headers: string[];
      rows: string[][];
    };
    callout?: string;
  }[];
}

export const GUIDES_DATA: GuideArticleData[] = [
  {
    id: 'camel-case-vs-pascal-case',
    slug: '/guide/camel-case-vs-pascal-case',
    title: 'camelCase vs. PascalCase: Complete Developer Naming Guide',
    subtitle: 'The definitive architectural guide on lowerCamelCase vs. UpperCamelCase across JavaScript, TypeScript, React, Java, and C#.',
    category: 'Full-Stack Engineering',
    readTime: '6 min read',
    lastUpdated: 'Updated for 2026 Standards',
    originalSource: {
      name: 'Microsoft .NET Identifier Naming Conventions & MDN Web Docs',
      url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/identifier-names',
      authority: 'Microsoft & Mozilla Developer Network',
      summary: 'The official Microsoft .NET and MDN JavaScript documentation specifying identifier capitalization, casing rules for compound words, and language-specific grammar.',
    },
    summary:
      'Explore the architectural and syntactic differences between camelCase and PascalCase across modern software ecosystems. Learn why TypeScript and JavaScript enforce lowerCamelCase for variables and functions, while React, C#, and Java require UpperCamelCase for classes and components. Master clean coding conventions to write maintainable code and prevent syntax errors.',
    sections: [
      {
        title: 'Core Syntactic Differences',
        content:
          'Both camelCase and PascalCase are compound word conventions where spaces and punctuation are removed, and words are distinguished through internal capitalization. The fundamental distinction lies in the first character: camelCase begins with a lowercase letter, whereas PascalCase begins with an uppercase letter.',
        table: {
          headers: ['Feature', 'camelCase (lowerCamelCase)', 'PascalCase (UpperCamelCase)'],
          rows: [
            ['Starting Character', 'Strictly lowercase (a-z)', 'Strictly uppercase (A-Z)'],
            ['Subsequent Words', 'First letter uppercase', 'First letter uppercase'],
            ['Word Delimiters', 'No spaces, hyphens, or underscores', 'No spaces, hyphens, or underscores'],
            ['Example', 'userAuthenticationToken', 'UserAuthenticationToken'],
          ],
        },
      },
      {
        title: 'JavaScript & TypeScript Conventions',
        content:
          'In JavaScript and TypeScript, the language standard library and ECMAScript specifications prescribe camelCase for primitive variables, object properties, class methods, and functions. Conversely, PascalCase is strictly reserved for Class declarations, Constructor functions, TypeScript Types, Interfaces, and Enums.',
        codeExample: {
          language: 'typescript',
          caption: 'JavaScript & TypeScript Best Practice Example',
          code: `// camelCase: Variables, object properties, and functions
const userProfileId = "usr_99812";
const fetchUserProfile = async (userId: string) => {
  return await api.get(\`/users/\${userId}\`);
};

// PascalCase: Types, Interfaces, Classes, and Enums
interface UserAccountDetails {
  id: string;
  fullName: string;
}

class UserAuthenticationManager {
  private currentSessionId: string = "";
}`,
        },
      },
      {
        title: 'React & Frontend Component Ecosystem',
        content:
          'React uses capitalization to distinguish between native HTML5 DOM elements (like <div> or <span>) and custom User Defined Components (like <UserProfile /> or <NavigationDock />). If a component begins with a lowercase letter, JSX compiles it to a literal string for the DOM instead of evaluating the React component function.',
        codeExample: {
          language: 'tsx',
          caption: 'JSX Compiling Rules in React',
          code: `// ✅ Correct: React treats PascalCase as a custom component
export default function UserProfileHeader() {
  const [isActive, setIsActive] = useState(true); // camelCase hook
  return <div className="profile-header">{/* ... */}</div>;
}

// ❌ Incorrect: React attempts to render '<userProfileHeader>' as HTML tag
function userProfileHeader() { ... }`,
        },
      },
      {
        title: 'C# and Backend Object-Oriented Architecture',
        content:
          'C# and .NET guidelines from Microsoft explicitly mandate PascalCase for all public identifiers: class names, interface names (prefixed with "I"), method names, and public properties. Camel casing is used only for private instance fields (often with an underscore prefix like _userName) and method parameters.',
        callout:
          'Rule of thumb: In modern development, use camelCase for things that hold data or perform actions (variables, functions, JSON keys), and PascalCase for structural blueprints (classes, types, interfaces, React components).',
      },
    ],
  },
  {
    id: 'how-to-format-json-keys',
    slug: '/guide/how-to-format-json-keys',
    title: 'How to Format JSON Keys: camelCase vs. snake_case Best Practices',
    subtitle: 'Comprehensive API payload design standards comparing Google JSON Style Guide against backend relational database schemas.',
    category: 'API & Microservices',
    readTime: '5 min read',
    lastUpdated: 'Updated for 2026 Standards',
    originalSource: {
      name: 'Google JSON Style Guide',
      url: 'https://google.github.io/styleguide/jsoncstyleguide.xml',
      authority: 'Google Open Source Engineering',
      summary: 'Google official documentation for designing robust, clean, and forward-compatible JSON API payloads and data schemas.',
    },
    summary:
      'Master the engineering standards for formatting JSON object keys in modern RESTful and GraphQL APIs. Compare the performance and developer ergonomics of frontend camelCase against database-aligned snake_case payloads. Implement automated backend serializers and TypeScript schema mappers to guarantee seamless cross-platform payload parsing.',
    sections: [
      {
        title: 'The Great Debate: camelCase vs. snake_case in APIs',
        content:
          'JSON specifications (RFC 8259) do not enforce any casing convention. However, frontend JavaScript applications naturally favor camelCase (allowing direct dot-notation `data.userProfileId`), while SQL databases (PostgreSQL, MySQL) and Python backends naturally store column names in snake_case (`user_profile_id`).',
        table: {
          headers: ['Format', 'Pros', 'Cons', 'Industry Standard For'],
          rows: [
            ['camelCase', 'Native JS dot-notation; seamless TypeScript integration', 'Requires transformation if DB uses snake_case', 'Google APIs, Stripe REST API, GraphQL'],
            ['snake_case', 'Direct 1:1 mapping with SQL database columns', 'Awkward dot-notation in TypeScript (requires lint overrides)', 'Python FastAPI/Django, PostgreSQL, Ruby on Rails'],
          ],
        },
      },
      {
        title: 'Google Official JSON Style Guide Recommendation',
        content:
          'According to the Google JSON Style Guide Section 2.2, property names must be camelCase, ASCII strings, and the first character must be a letter, number, or underscore. This prevents unnecessary string quoting and optimizes serialization across modern JavaScript V8 engines.',
        codeExample: {
          language: 'json',
          caption: 'Google Standard Compliant JSON Payload',
          code: `{
  "apiVersion": "2.0",
  "data": {
    "userId": "usr_7819",
    "displayName": "Alex Rivera",
    "accountStatus": "active",
    "createdTimestamp": 1776153600
  }
}`,
        },
      },
      {
        title: 'Handling Cross-Platform Serializers (Python to Frontend)',
        content:
          'Modern frameworks resolve this impedance mismatch through automated serializer aliases. For example, Pydantic in Python and Jackson in Java can automatically accept snake_case database rows and output camelCase JSON responses.',
        codeExample: {
          language: 'python',
          caption: 'Pydantic (Python) CamelCase Alias Generator',
          code: `from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel

class UserProfileSchema(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    
    user_id: str          # Serialized to JSON as "userId"
    account_status: str   # Serialized to JSON as "accountStatus"`,
        },
      },
    ],
  },
  {
    id: 'title-case-rules-for-essays',
    slug: '/guide/title-case-rules-for-essays',
    title: 'Title Case Rules for Essays, Headlines & Academic Papers',
    subtitle: 'The comprehensive grammatical guide for Chicago Manual of Style, APA 7th Edition, and MLA headline capitalization.',
    category: 'Editorial & Publishing',
    readTime: '7 min read',
    lastUpdated: 'Updated for 2026 Standards',
    originalSource: {
      name: 'APA Style Capitalization & Chicago Manual of Style',
      url: 'https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case',
      authority: 'American Psychological Association & University of Chicago',
      summary: 'The authoritative academic publishing guidelines for capitalizing titles of works, headings within papers, and editorial publications.',
    },
    summary:
      'Understand the precise capitalization guidelines across APA, Chicago, and MLA style guides for essays, thesis titles, and journalistic headlines. Discover which grammatical prepositions, articles, and short conjunctions must remain lowercase regardless of sentence position. Ensure your academic submissions, research documents, and articles meet rigorous editorial standards.',
    sections: [
      {
        title: 'The Core Rules of Title Case',
        content:
          'Title Case (also known as headline style) capitalizes the first letter of major words while keeping minor words lowercase. The universal rules across all major stylebooks are:',
        table: {
          headers: ['Rule', 'Guideline', 'Example'],
          rows: [
            ['First & Last Words', 'Always capitalize the first and last word of a title or subtitle', '"A River Runs Through It"'],
            ['Major Words', 'Capitalize all nouns, verbs, pronouns, adjectives, and adverbs', '"Building Scalable Web Applications"'],
            ['Short Prepositions', 'Keep lowercase if under 4 letters (in, on, at, by, for, of)', '"The Old Man and the Sea"'],
            ['Articles & Conjunctions', 'Keep "a", "an", "the", "and", "but", "or", "nor" lowercase', '"War and Peace"'],
          ],
        },
      },
      {
        title: 'APA 7th Edition vs. Chicago Manual of Style Differences',
        content:
          'While APA and Chicago agree on 90% of rules, key differences emerge around prepositions. Chicago lowercases all prepositions regardless of length (e.g., "between", "throughout"), whereas APA capitalizes any word containing 4 letters or more (e.g., "Between", "Through", "With").',
        codeExample: {
          language: 'markdown',
          caption: 'APA vs Chicago Comparison',
          code: `# APA Style (Capitalizes prepositions with 4+ letters):
The Psychology of Resilience Through the Ages

# Chicago Style (Lowercases all prepositions regardless of length):
The Psychology of Resilience through the Ages`,
        },
      },
      {
        title: 'Hyphenated Compounds in Headings',
        content:
          'Always capitalize both parts of a hyphenated compound if each word is an adjective or noun, or if both parts have equal syntactic weight (e.g., "High-Level", "Client-Side", "Record-Breaking"). Keep the second element lowercase only if it is a minor word or prefix (e.g., "Anti-intellectual", "Re-examine").',
        callout:
          'Quick tip: When in doubt, utilize the CaseConverters Title Case tool. It automatically adheres to Chicago and AP style standards by ignoring common minor words while capitalizing all primary parts of speech.',
      },
    ],
  },
  {
    id: 'snake-case-vs-kebab-case-in-api-design',
    slug: '/guide/snake-case-vs-kebab-case-in-api-design',
    title: 'snake_case vs. kebab-case: REST API Design & URL Best Practices',
    subtitle: 'Why Google crawlers mandate hyphens for URLs while relational databases require underscores.',
    category: 'Technical SEO & Systems',
    readTime: '5 min read',
    lastUpdated: 'Updated for 2026 Standards',
    originalSource: {
      name: 'Google Search Central: URL Structure Best Practices',
      url: 'https://developers.google.com/search/docs/crawling-indexing/url-structure',
      authority: 'Google Search Central & W3C Technical Architecture Group',
      summary: 'Google official documentation explaining how search bots parse punctuation, tokens, and hyphens in URLs vs. underscores.',
    },
    summary:
      'Analyze the structural differences between underscore-delimited snake_case and hyphenated kebab-case across backend databases and web URLs. Discover why search engine crawlers explicitly recommend kebab-case for permalinks and tokenized indexation. Structure your REST endpoints, query parameters, and slug hierarchies for maximum search engine discoverability.',
    sections: [
      {
        title: 'Why Google Explicitly Recommends Hyphens (kebab-case)',
        content:
          'In Google Search Central documentation, Google explicitly advises webmasters to use hyphens (-) rather than underscores (_) in URL permalinks. Search engine tokenizers treat a hyphen as a word separator (reading "text-converter" as two distinct words: "text" and "converter"). By contrast, Google historical parsers treat an underscore as a word joiner (reading "text_converter" as a single compound token: "text_converter").',
        callout:
          'Official Google Stance: "We recommend that you use hyphens (-) instead of underscores (_) in your URLs. When you use hyphens, Google can treat each word separately, improving semantic understanding and indexation."',
      },
      {
        title: 'Database & Systems Compatibility (Why DBs Hate kebab-case)',
        content:
          'While kebab-case reigns supreme for URLs and CSS class names, it is practically unusable in SQL database columns. In SQL, the hyphen (-) is the arithmetic subtraction operator. If you name a column `user-profile-id`, SQL interprets it as `user minus profile minus id` unless wrapped in escaped identifiers (backticks or quotes).',
        codeExample: {
          language: 'sql',
          caption: 'SQL Identifier Conflict with Hyphens',
          code: `-- ❌ Causes syntax error in SQL (interpreted as subtraction):
SELECT user-id FROM users; 

-- ✅ Standard SQL convention: snake_case
SELECT user_id, created_at, account_status FROM users;`,
        },
      },
      {
        title: 'Best Practices Matrix for REST API Design',
        content:
          'Follow this standardized architectural matrix across your full-stack application:',
        table: {
          headers: ['Layer', 'Recommended Casing', 'Example'],
          rows: [
            ['URL Slugs & Permalinks', 'kebab-case', 'caseconverters.in/text-case-converter'],
            ['REST Path Resources', 'kebab-case (or plural nouns)', '/api/v1/user-profiles'],
            ['Query Parameters', 'snake_case or camelCase', '?sort_by=created_at&page_size=25'],
            ['Database Column Schemas', 'snake_case', 'user_account_id, updated_at'],
            ['Frontend JSON Objects', 'camelCase', 'userAccountId: "usr_10"'],
          ],
        },
      },
    ],
  },
  {
    id: 'sentence-case-in-modern-ui-design',
    slug: '/guide/sentence-case-in-modern-ui-design',
    title: 'Sentence Case in Modern UI Design & Digital Microcopy',
    subtitle: 'Why Apple, Google, and Microsoft moved away from Title Case in modern digital interfaces.',
    category: 'Product Design & UX',
    readTime: '6 min read',
    lastUpdated: 'Updated for 2026 Standards',
    originalSource: {
      name: 'Apple Human Interface Guidelines & Material Design 3',
      url: 'https://developer.apple.com/design/human-interface-guidelines/typography',
      authority: 'Apple Design & Google Material Foundation',
      summary: 'Official human interface design guidelines on digital typography, accessibility, and cognitive ergonomics for modern apps.',
    },
    summary:
      'Learn why industry leaders including Apple, Google, and Microsoft mandate Sentence case for user interface buttons, navigation menus, and form labels. Discover how Sentence case reduces visual clutter, speeds up comprehension for international users, and improves accessibility compliance across digital interfaces. Elevate your product typography with human-centered copy guidelines.',
    sections: [
      {
        title: 'The Shift from Title Case to Sentence Case in UI',
        content:
          'In early graphical operating systems (Windows 95, classic Mac OS), buttons and menu items frequently utilized Title Case ("Click Here to Continue", "Save As..."). Over the last decade, Apple Human Interface Guidelines, Google Material Design, and Microsoft Fluent Design have systematically standardized on Sentence case.',
        table: {
          headers: ['Metric', 'Sentence case ("Save changes")', 'Title Case ("Save Changes")'],
          rows: [
            ['Reading Speed', 'Faster (mimics natural conversational prose)', 'Slightly slower (frequent capital stops)'],
            ['Cognitive Load', 'Low visual friction', 'High visual weight, feels formal/rigid'],
            ['Proper Noun Clarity', 'Crystal clear ("Book flight to Paris")', 'Ambiguous ("Book Flight To Paris")'],
            ['Localization & Translation', 'Easy for international translators to format', 'Difficult (languages like German capitalize all nouns)'],
          ],
        },
      },
      {
        title: 'Proper Noun Distinction',
        content:
          'One of the strongest arguments for Sentence case is proper noun disambiguation. In Title Case, every word is capitalized, making it impossible for a user or screen reader to tell whether a word is a proper brand or an everyday verb. For instance, in "Convert Google Doc to Word Document", Sentence case makes the nouns clear: "Convert Google doc to Word document".',
      },
      {
        title: 'UI Design Guidelines: When to Use What',
        content:
          'Use this clean rulebook when designing interfaces in Figma or coding frontend components:',
        codeExample: {
          language: 'markdown',
          caption: 'Product Microcopy Decision Matrix',
          code: `Use Sentence Case for:
- Buttons: "Save changes", "Send invite", "Create account"
- Form labels: "Email address", "Confirm password"
- Toast notifications: "Link copied to clipboard"
- Empty states: "No messages in your inbox"

Reserve Title Case only for:
- Main page H1 titles: "Free Online Case Converter"
- Navigation hub headings: "Official Developer Resources"
- Formal document titles and published blog posts`,
        },
      },
    ],
  },
];
