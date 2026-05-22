# Feature Documentation

## Text Transformation Functions

### Core Transformations

#### 1. Sentence Case
Converts text to sentence case - first character uppercase, rest lowercase.

**Function**: `toSentenceCase(text: string): string`

**Examples**:
- Input: "heLLo WoRLd"
- Output: "Hello world"

**Use Cases**:
- Converting titles to proper sentences
- Normalizing user input
- Professional document formatting

---

#### 2. Lowercase
Converts all characters to lowercase.

**Function**: `toLowerCase(text: string): string`

**Examples**:
- Input: "HELLO World"
- Output: "hello world"

**Use Cases**:
- Email addresses
- Usernames
- Standardizing text

---

#### 3. Uppercase
Converts all characters to uppercase.

**Function**: `toUpperCase(text: string): string`

**Examples**:
- Input: "hello world"
- Output: "HELLO WORLD"

**Use Cases**:
- Acronyms
- Headlines
- Emphasis

---

#### 4. Capitalized Case
Capitalizes the first letter of each word.

**Function**: `toCapitalizedCase(text: string): string`

**Examples**:
- Input: "hello world of programming"
- Output: "Hello World Of Programming"

**Use Cases**:
- Names
- Product titles
- Section headings

---

#### 5. Title Case
Capitalizes major words while keeping small words (articles, prepositions) lowercase.

**Function**: `toTitleCase(text: string): string`

**Examples**:
- Input: "the quick brown fox jumps over the lazy dog"
- Output: "The Quick Brown Fox Jumps Over the Lazy Dog"

**Small Words** (kept lowercase): a, an, and, are, as, at, be, but, by, for, if, in, into, is, it, no, not, of, on, or, such, that, the, their, then, there, these, they, this, to, up, very, was, will, with

**Use Cases**:
- Book titles
- Article headlines
- Proper document formatting

---

#### 6. Alternating Case
Alternates between uppercase and lowercase characters.

**Function**: `toAlternatingCase(text: string): string`

**Examples**:
- Input: "hello"
- Output: "HeLlO"

**Pattern**: Starts with uppercase (positions 0, 2, 4... are uppercase)

**Use Cases**:
- Text styling/effects
- Social media posts
- Humorous formatting

---

#### 7. Inverse Case
Swaps the case of each letter - uppercase becomes lowercase and vice versa.

**Function**: `toInverseCase(text: string): string`

**Examples**:
- Input: "HeLLo World"
- Output: "hEllO wORLD"

**Use Cases**:
- Text effects
- Case reversal
- Data transformation

---

### Programming Language Case Formats

#### 8. Camel Case
First word lowercase, subsequent words capitalized, no spaces.

**Function**: `toCamelCase(text: string): string`

**Examples**:
- Input: "hello world of programming"
- Output: "helloWorldOfProgramming"

**Use Cases**:
- JavaScript variable names
- Method names
- Function parameters

---

#### 9. Snake Case
Words separated by underscores, all lowercase.

**Function**: `toSnakeCase(text: string): string`

**Examples**:
- Input: "hello world of programming"
- Output: "hello_world_of_programming"

**Use Cases**:
- Python variable names
- Database column names
- Configuration keys
- File naming conventions

---

#### 10. Kebab Case
Words separated by hyphens, all lowercase.

**Function**: `toKebabCase(text: string): string`

**Examples**:
- Input: "hello world of programming"
- Output: "hello-world-of-programming"

**Use Cases**:
- CSS class names
- URL slugs
- HTML attributes
- Configuration files

---

#### 11. Dot Case
Words separated by dots, all lowercase.

**Function**: `toDotCase(text: string): string`

**Examples**:
- Input: "hello world of programming"
- Output: "hello.world.of.programming"

**Use Cases**:
- Namespace conventions
- Configuration keys
- Semantic versioning
- Domain names

---

### Utility Transformations

#### 12. Reverse
Reverses the entire text character by character.

**Function**: `toReverse(text: string): string`

**Examples**:
- Input: "hello world"
- Output: "dlrow olleh"

**Use Cases**:
- Text effects
- Palindrome checking
- Debugging
- Cryptography basics

---

#### 13. Remove Spaces
Removes all whitespace characters.

**Function**: `removeSpaces(text: string): string`

**Examples**:
- Input: "hello world"
- Output: "helloworld"

**Use Cases**:
- Concatenating words
- URL formatting
- Data compression
- Removing formatting

---

### Additional Features

#### Toggle Case
Converts text to inverse case while keeping first letter uppercase.

**Function**: `toToggleCase(text: string): string`

**Examples**:
- Input: "hEllO wORLD"
- Output: "HeLlO WorLd"

---

## Statistics Features

### Word Count
Counts the number of words in the input text.
- Splits by whitespace
- Filters empty strings
- Real-time update

### Character Count
Counts total characters including spaces and special characters.
- Includes all characters
- Real-time update

### Character Count (No Spaces)
Counts characters excluding whitespace.
- Useful for data storage calculations
- Real-time update

---

## UI/UX Features

### Real-Time Conversion
- Instant updates as you type
- No button clicks needed
- Smooth animation transitions

### Copy to Clipboard
- One-click copy for each transformation
- Visual feedback with "✓ Copied!" message
- Automatic feedback timeout (2 seconds)
- Disabled when input is empty

### Responsive Design
- Desktop: Multi-column grid layout
- Tablet: Adjusted grid
- Mobile: Single column layout
- Sticky ad sidebar on desktop

### Visual Feedback
- Hover effects on boxes
- Copy button animations
- Smooth transitions
- Color-coded buttons

---

## Performance Optimizations

### Frontend
- React functional components with hooks
- Memoized callbacks for event handlers
- Optimized re-renders
- CSS-in-JS for dynamic styling

### Build
- TypeScript for type safety
- Vite for fast development
- Terser for minification
- Gzip compression in production

### Bundle Size
- Total: ~155KB
- Gzipped: ~48.6KB
- Production-optimized
- No unnecessary dependencies

---

## Accessibility Features

✅ Semantic HTML structure
✅ Proper heading hierarchy
✅ ARIA labels on inputs
✅ Keyboard navigation support
✅ Color contrast compliance
✅ Mobile touch-friendly buttons

---

## Browser Compatibility

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

---

## Future Enhancement Ideas

### Text Analysis
- [ ] Reading level assessment
- [ ] Sentiment analysis
- [ ] Language detection
- [ ] Duplicate word finder

### Advanced Transformations
- [ ] Leetspeak converter
- [ ] Text encryption/decryption
- [ ] Morse code converter
- [ ] ROT13 cipher
- [ ] Base64 encoding/decoding
- [ ] Unicode normalization

### User Experience
- [ ] Dark mode theme
- [ ] Keyboard shortcuts
- [ ] History/undo functionality
- [ ] Batch processing
- [ ] Preset templates
- [ ] Custom transformation builder

### Integration
- [ ] API endpoint for programmatic access
- [ ] Browser extension version
- [ ] Mobile app version
- [ ] VS Code plugin

### Data Export
- [ ] Export as JSON
- [ ] Export as CSV
- [ ] Generate PDF
- [ ] Share via link

---

## API Usage Example

If you want to use the transformation functions in other projects:

```typescript
import { toSentenceCase, toSnakeCase, TRANSFORMATIONS } from './utils/textTransformations';

// Single transformation
const result = toSentenceCase("hELLO wORLD");
console.log(result); // "Hello world"

// Using transformation objects
TRANSFORMATIONS.forEach(transformation => {
  const result = transformation.transform("hello world");
  console.log(`${transformation.name}: ${result}`);
});
```

---

## Troubleshooting

### Text Not Converting
- Check if input text is empty
- Verify browser console for errors
- Reload page if needed

### Copy Button Not Working
- Check browser clipboard permissions
- Try in incognito/private mode
- Update browser

### Ads Not Displaying
- Wait 24-48 hours after domain approval
- Verify AdSense publisher ID
- Check ad slot configuration
- Review AdSense policies

---

## Performance Tips for Users

- Use for shorter texts for best performance
- Clear history to reduce memory usage
- Use in modern browsers for best experience
- Enable JavaScript for full functionality

---

## Support

For issues or feature requests, please contact support or open an issue in the repository.
