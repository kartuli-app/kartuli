import { getLibraryServer } from '@game-client/learning-content';
import { TranslitClient } from './translit-client';

export async function TranslitPageServer({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const library = await getLibraryServer(locale);
  return <TranslitClient library={library} />;
}
