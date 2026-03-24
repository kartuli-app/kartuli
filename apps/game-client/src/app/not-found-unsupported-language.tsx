// /[language]/layout.tsx throws a not found when the language is not supported
// this page will be shown when the language is not supported
export function NotFoundUnsupportedLanguage() {
  return (
    <div>
      <h2>Not Found (Unsupported Language)</h2>
      <p>The requested language is not supported</p>
    </div>
  );
}
