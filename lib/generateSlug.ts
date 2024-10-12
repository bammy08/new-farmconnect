// utils/generateSlug.ts
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase() // Convert text to lowercase
    .trim() // Trim leading/trailing spaces
    .replace(/[\s\W-]+/g, '-') // Replace spaces, non-word characters, and dashes with a single dash
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
};
