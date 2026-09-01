// Type declarations for CSS imports.
// Next.js 15 does not ship declarations compatible with the side-effect import
// checks introduced in TypeScript 5.9.

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css';
