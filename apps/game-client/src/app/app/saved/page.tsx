import { clsx } from 'clsx';
import { ResponsiveContainer } from '../responsive-container';

export default function SavedPage() {
  return (
    <ResponsiveContainer className={clsx('justify-center items-center flex-col', 'flex-1')}>
      <div className={clsx('w-full h-full max-h-96')}>
        <div className={clsx('w-full h-full max-h-96')}>
          <img src="/saved.svg" alt="Saved" className={clsx('w-full h-full')} />
        </div>
      </div>
    </ResponsiveContainer>
  );
}
