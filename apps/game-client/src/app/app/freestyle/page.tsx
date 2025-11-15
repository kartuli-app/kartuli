import { clsx } from 'clsx';
import { ResponsiveContainer } from '../responsive-container';

const LessonCard = () => {
  return (
    <div
      className={clsx(
        'w-full',
        'h-42',
        'border border-white',
        'flex flex-col items-center justify-center',
      )}
    >
      <h1 className={clsx('text-lg', 'font-bold', 'text-center')}>Lesson</h1>
    </div>
  );
};

export default function FreestylePage() {
  return (
    <ResponsiveContainer className={clsx('justify-center items-center flex-col', 'flex-1')}>
      <div className={clsx('h-full w-full grid grid-cols-1 md:grid-cols-2 gap-2')}>
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
      </div>
    </ResponsiveContainer>
  );
}
