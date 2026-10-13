interface NotFoundContentProps {
  readonly heading: string;
  readonly message: string;
  readonly pathname: string;
}

export function NotFoundContent({ heading, message, pathname }: NotFoundContentProps) {
  return (
    <main>
      <h1>{heading}</h1>
      <p>{pathname}</p>
      <p>{message}</p>
    </main>
  );
}
