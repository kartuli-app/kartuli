import { getLibraryServer } from '@game-client/learning-content';
import { HomeClient } from '@game-client/ui/screens/home/home-client';
import { buildHomeView } from './view/build-home-view';

export async function HomePageServer({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const library = await getLibraryServer(locale);
  const homeView = await buildHomeView(library);
  return <HomeClient homeView={homeView} />;
}
