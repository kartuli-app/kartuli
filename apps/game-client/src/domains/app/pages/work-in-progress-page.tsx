import { ResponsiveContainer } from '@/domains/shared/components/responsive-container';
import { clsx } from 'clsx';

export function WorkInProgressPage() {
  return (
    <ResponsiveContainer className={clsx('justify-center items-center flex-col', 'flex-1')}>
      <div className={clsx('w-full h-full max-h-96')}>
        <div className={clsx('w-full h-full max-h-96')}>
          <img
            src="/illustrations/work-in-progress.svg"
            alt="Saved"
            className={clsx('w-full h-full')}
          />
        </div>
      </div>
    </ResponsiveContainer>
  );
}
