// Sentence Case: First letter uppercase, rest lowercase
export const toSentenceCase = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Lowercase: All letters lowercase
export const toLowerCase = (text: string): string => {
  return text.toLowerCase();
};

// Uppercase: All letters uppercase
export const toUpperCase = (text: string): string => {
  return text.toUpperCase();
};

// Capitalized Case: Each word starts with capital letter (Pascal Case)
export const toCapitalizedCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Title Case: Capitalize each word except small words
export const toTitleCase = (text: string): string => {
  const smallWords = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'up', 'very', 'was', 'will', 'with'];
  
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      if (index === 0) return word.charAt(0).toUpperCase() + word.slice(1);
      return smallWords.includes(word) ? word : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

// Alternating Case: Alternate between upper and lowercase
export const toAlternatingCase = (text: string): string => {
  return text
    .split('')
    .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
    .join('');
};

// Inverse Case: Swap case of each letter
export const toInverseCase = (text: string): string => {
  return text
    .split('')
    .map((char) => {
      if (char === char.toUpperCase()) return char.toLowerCase();
      if (char === char.toLowerCase()) return char.toUpperCase();
      return char;
    })
    .join('');
};

// Camel Case: First word lowercase, subsequent words capitalized
export const toCamelCase = (text: string): string => {
  const words = text.toLowerCase().split(/\s+/);
  return words
    .map((word, index) => 
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
};

// Snake Case: Words separated by underscores
export const toSnakeCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(/\s+/)
    .join('_');
};

// Kebab Case: Words separated by hyphens
export const toKebabCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(/\s+/)
    .join('-');
};

// Dot Case: Words separated by dots
export const toDotCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(/\s+/)
    .join('.');
};

// Reverse: Reverse the entire text
export const toReverse = (text: string): string => {
  return text.split('').reverse().join('');
};

// Remove spaces
export const removeSpaces = (text: string): string => {
  return text.replace(/\s+/g, '');
};

// Toggle case: Convert to inverse while keeping first letter uppercase
export const toToggleCase = (text: string): string => {
  const first = text.charAt(0).toUpperCase();
  return first + toInverseCase(text.slice(1));
};

export interface TextTransformation {
  name: string;
  description: string;
  transform: (text: string) => string;
}

export const TRANSFORMATIONS: TextTransformation[] = [
  {
    name: 'Sentence Case',
    description: 'First letter uppercase, rest lowercase',
    transform: toSentenceCase,
  },
  {
    name: 'lowercase',
    description: 'All letters lowercase',
    transform: toLowerCase,
  },
  {
    name: 'UPPERCASE',
    description: 'All letters uppercase',
    transform: toUpperCase,
  },
  {
    name: 'Capitalized Case',
    description: 'Every word capitalized',
    transform: toCapitalizedCase,
  },
  {
    name: 'Title Case',
    description: 'Capitalize words, skip small words',
    transform: toTitleCase,
  },
  {
    name: 'aLtErNaTiNg CaSe',
    description: 'Alternate between upper and lowercase',
    transform: toAlternatingCase,
  },
  {
    name: 'InVeRsE CaSe',
    description: 'Swap case of each letter',
    transform: toInverseCase,
  },
  {
    name: 'camelCase',
    description: 'First word lowercase, then capitalized',
    transform: toCamelCase,
  },
  {
    name: 'snake_case',
    description: 'Words separated by underscores',
    transform: toSnakeCase,
  },
  {
    name: 'kebab-case',
    description: 'Words separated by hyphens',
    transform: toKebabCase,
  },
  {
    name: 'dot.case',
    description: 'Words separated by dots',
    transform: toDotCase,
  },
  {
    name: 'Reverse',
    description: 'Reverse the entire text',
    transform: toReverse,
  },
  {
    name: 'No Spaces',
    description: 'Remove all spaces',
    transform: removeSpaces,
  },
];
