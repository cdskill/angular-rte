export const SANDBOX_CODE_BLOCK_LANGUAGES = [
  { value: 'plaintext', label: 'Plain text' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
] as const;

export const SANDBOX_DEFAULT_CODE_BLOCK_LANGUAGE = 'typescript';

export const SANDBOX_CODE_BLOCK_LANGUAGE_VALUES =
  SANDBOX_CODE_BLOCK_LANGUAGES.map((language) => language.value);
