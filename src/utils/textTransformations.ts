/**
 * Comprehensive client-side text case transformation utilities.
 * All operations execute locally in the browser with zero external calls.
 */

/**
 * Robust word tokenization helper.
 * Splits text into words while respecting camelCase, PascalCase, snake_case,
 * kebab-case, numbers, and multiple whitespace/punctuation separators.
 */
export const getWords = (text: string): string[] => {
  if (!text) return [];
  const spaced = text
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim();
  return spaced ? spaced.split(/\s+/).filter(Boolean) : [];
};

/**
 * Sentence case:
 * Capitalizes the first letter of each sentence (after start of text, ., !, ? or newline).
 * Lowercases the rest of the text.
 */
export const toSentenceCase = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/(^\s*|[.!?]\s+|\n\s*)([a-z\u00E0-\u00FC])/g, (match, boundary, char) => {
      return boundary + char.toUpperCase();
    });
};

/**
 * Lowercase:
 * Converts all characters to lowercase.
 */
export const toLowerCase = (text: string): string => {
  if (!text) return '';
  return text.toLowerCase();
};

/**
 * UPPERCASE:
 * Converts all characters to uppercase.
 */
export const toUpperCase = (text: string): string => {
  if (!text) return '';
  return text.toUpperCase();
};

/**
 * Title Case:
 * Capitalizes the first letter of principal words according to AP/Chicago style rules.
 * Minor words (articles, conjunctions, short prepositions) remain lowercase unless
 * they start or end a title.
 */
export const toTitleCase = (text: string): string => {
  if (!text) return '';
  const minorWords = new Set([
    'a', 'an', 'and', 'as', 'at', 'but', 'by', 'en', 'for', 'if', 'in', 'is',
    'nor', 'of', 'off', 'on', 'or', 'per', 'so', 'the', 'to', 'up', 'via', 'yet'
  ]);

  return text
    .toLowerCase()
    .split(/(\s+)/)
    .map((token, index, arr) => {
      // Preserve whitespace tokens as-is
      if (/^\s+$/.test(token)) return token;

      const isFirst = index === 0 || arr.slice(0, index).every((t) => /^\s+$/.test(t));
      const isLast = index === arr.length - 1 || arr.slice(index + 1).every((t) => /^\s+$/.test(t));

      if (!isFirst && !isLast && minorWords.has(token)) {
        return token.toLowerCase();
      }
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join('');
};

/**
 * camelCase:
 * First word is lowercase, every subsequent word starts with an uppercase letter.
 * All whitespace and punctuation are removed.
 */
export const toCamelCase = (text: string): string => {
  const words = getWords(text);
  if (words.length === 0) return '';
  return words
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
};

/**
 * snake_case:
 * All words are lowercased and joined with underscores (_).
 */
export const toSnakeCase = (text: string): string => {
  const words = getWords(text);
  if (words.length === 0) return '';
  return words.map((word) => word.toLowerCase()).join('_');
};

/**
 * PascalCase (UpperCamelCase):
 * Every word, including the first, starts with an uppercase letter.
 * All whitespace and punctuation are removed.
 */
export const toPascalCase = (text: string): string => {
  const words = getWords(text);
  if (words.length === 0) return '';
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

/**
 * kebab-case:
 * All words are lowercased and joined with hyphens (-).
 */
export const toKebabCase = (text: string): string => {
  const words = getWords(text);
  if (words.length === 0) return '';
  return words.map((word) => word.toLowerCase()).join('-');
};

/**
 * CONSTANT_CASE (SCREAMING_SNAKE_CASE):
 * All words are uppercase and separated by underscores (_).
 */
export const toConstantCase = (text: string): string => {
  const words = getWords(text);
  if (words.length === 0) return '';
  return words.map((word) => word.toUpperCase()).join('_');
};

/**
 * Capitalized Case:
 * Capitalizes every single word without exception.
 */
export const toCapitalizedCase = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ''))
    .join(' ');
};

/**
 * Alternating Case (aLtErNaTiNg cAsE):
 * Alternates between uppercase and lowercase characters.
 */
export const toAlternatingCase = (text: string): string => {
  if (!text) return '';
  let count = 0;
  return text
    .split('')
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const result = count % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
        count++;
        return result;
      }
      return char;
    })
    .join('');
};

/**
 * Dot Case (dot.case):
 * Words lowercased and separated by dots.
 */
export const toDotCase = (text: string): string => {
  const words = getWords(text);
  if (words.length === 0) return '';
  return words.map((word) => word.toLowerCase()).join('.');
};

export type CaseCategory = 'standard' | 'developer' | 'specialty';

export interface TextTransformation {
  id: string;
  name: string;
  category: CaseCategory;
  description: string;
  example: string;
  transform: (text: string) => string;
}

export const TRANSFORMATIONS: TextTransformation[] = [
  // 1. Standard Cases
  {
    id: 'sentence-case',
    name: 'Sentence case',
    category: 'standard',
    description: 'Capitalizes the first letter of each sentence',
    example: 'Hello world. How are you today?',
    transform: toSentenceCase,
  },
  {
    id: 'lowercase',
    name: 'lowercase',
    category: 'standard',
    description: 'Converts all letters to lowercase',
    example: 'hello world',
    transform: toLowerCase,
  },
  {
    id: 'uppercase',
    name: 'UPPERCASE',
    category: 'standard',
    description: 'Converts all letters to uppercase',
    example: 'HELLO WORLD',
    transform: toUpperCase,
  },
  {
    id: 'title-case',
    name: 'Title Case',
    category: 'standard',
    description: 'Capitalizes principal words, skips minor words',
    example: 'The Lord of the Rings',
    transform: toTitleCase,
  },

  // 2. Developer-Specific Cases
  {
    id: 'camel-case',
    name: 'camelCase',
    category: 'developer',
    description: 'First word lowercase, rest capitalized, no spaces',
    example: 'userProfileId',
    transform: toCamelCase,
  },
  {
    id: 'snake-case',
    name: 'snake_case',
    category: 'developer',
    description: 'Lowercase words separated by underscores',
    example: 'user_profile_id',
    transform: toSnakeCase,
  },
  {
    id: 'pascal-case',
    name: 'PascalCase',
    category: 'developer',
    description: 'Every word capitalized, no spaces or symbols',
    example: 'UserProfileId',
    transform: toPascalCase,
  },
  {
    id: 'kebab-case',
    name: 'kebab-case',
    category: 'developer',
    description: 'Lowercase words separated by hyphens',
    example: 'user-profile-id',
    transform: toKebabCase,
  },

  // 3. Specialty Cases
  {
    id: 'constant-case',
    name: 'CONSTANT_CASE',
    category: 'specialty',
    description: 'Uppercase words joined with underscores',
    example: 'MAX_RETRY_COUNT',
    transform: toConstantCase,
  },
  {
    id: 'dot-case',
    name: 'dot.case',
    category: 'specialty',
    description: 'Lowercase words joined with periods',
    example: 'system.network.status',
    transform: toDotCase,
  },
  {
    id: 'alternating-case',
    name: 'aLtErNaTiNg cAsE',
    category: 'specialty',
    description: 'Alternating uppercase and lowercase letters',
    example: 'hElLo wOrLd',
    transform: toAlternatingCase,
  },
];
