import errorIllustration from '@game-client/images/illustrations/error.svg';
import {
  ModuleCard,
  ModuleCardContent,
  ModuleCardTitle,
} from '@game-client/screens/home-page-client/components/module-card';
import clsx from 'clsx';
import {
  LessonCardTitle,
  lessonCardBaseClassnames,
  lessonCardErrorClassnames,
  lessonCardWithImageClassnames,
} from './lesson-card';

export function ModuleCardError({
  title,
  message,
}: Readonly<{
  title: string;
  message: string;
}>) {
  return (
    <ModuleCard>
      <ModuleCardTitle className="text-red-900" title={title} />
      <ModuleCardContent>
        <div className={clsx(lessonCardBaseClassnames, lessonCardWithImageClassnames)}>
          {/* we want a regular image here, not nextjs optimized image */}
          <img src={errorIllustration.src} alt={message} className="w-full h-full object-contain" />
        </div>
        <div className={clsx(lessonCardBaseClassnames, lessonCardErrorClassnames)}>
          <LessonCardTitle title={message} />
        </div>
      </ModuleCardContent>
    </ModuleCard>
  );
}
