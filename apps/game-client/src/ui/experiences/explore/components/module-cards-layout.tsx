import { CardsGrid } from './cards-grid';

export function ModuleCardsLayout({
  lessonCards,
  fullReviewCard,
}: Readonly<{
  lessonCards: React.ReactNode;
  fullReviewCard?: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-8">
      <CardsGrid size="grid-item">{lessonCards}</CardsGrid>
      {fullReviewCard && <CardsGrid size="full">{fullReviewCard}</CardsGrid>}
    </div>
  );
}
