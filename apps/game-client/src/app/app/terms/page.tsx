import { clsx } from 'clsx';
import { ResponsiveContainer } from '../responsive-container';

const TermsCard = () => {
  return (
    <div
      className={clsx(
        'w-full',
        'h-42',
        'border border-white',
        'flex flex-col items-center justify-center',
      )}
    >
      <h1 className={clsx('text-lg', 'font-bold', 'text-center')}>Terms</h1>
    </div>
  );
};

export default function TermsPage() {
  return (
    <ResponsiveContainer className={clsx('justify-center items-center flex-col', 'flex-1')}>
      <div className={clsx('h-full w-full grid grid-cols-1 md:grid-cols-1 gap-2')}>
        <TermsCard />
      </div>
    </ResponsiveContainer>
  );
}
