import clsx from 'clsx';

export function LearnPageHeading() {
  return (
    <div className={clsx('flex flex-col', 'gap-brand-regular')}>
      <h1 className={clsx('text-5xl', 'text-center')}>We are in the larning page</h1>
      <h2 className={clsx('text-3xl font-bold', 'text-center')}>Text for the learning page</h2>
    </div>
  );
}
