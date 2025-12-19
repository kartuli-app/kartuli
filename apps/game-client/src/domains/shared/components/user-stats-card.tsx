'use client';

import { clsx } from 'clsx';
import { FaPersonArrowUpFromLine } from 'react-icons/fa6';
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { LuClock, LuGitCompareArrows } from 'react-icons/lu';
import { TbAlphabetLatin } from 'react-icons/tb';

export function StatCard({
  icon,
  label,
  value,
  valueSuffix,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueSuffix?: string;
}) {
  return (
    <div
      className={clsx(
        //
        'flex items-center justify-center rounded-md',
        'bg-slate-100',
        'border border-slate-200',
        'pt-1',
      )}
    >
      {/* label and value */}
      <div className="flex flex-col items-center justify-center bgg-red-500">
        {/* label */}
        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
          {icon}
          {label}
        </div>
        {/* value and value suffix */}
        <span className="flex flex-row items-center justify-center gap-1">
          <span className="text-2xl font-bold text-violet-500">{value}</span>
          {valueSuffix && <span className="text-[11px] font-normal uppercase">{valueSuffix}</span>}
        </span>
      </div>
    </div>
  );
}

function UserStatsCard() {
  const iconClassName = 'text-violet-500 size-4';
  return (
    <div
      className={clsx(
        'grid grid-cols-4 w-full',
        'gap-1',
        //
        // 'bg-red-500',
      )}
    >
      <StatCard
        icon={<TbAlphabetLatin className={clsx(iconClassName, 'scale-125')} />}
        label="Letters"
        value="0"
        valueSuffix="/ 33"
      />
      <StatCard
        icon={<HiOutlineChatBubbleLeftEllipsis className={iconClassName} />}
        label="Words"
        value="0"
        valueSuffix="/ 500"
      />
      <StatCard
        icon={<LuGitCompareArrows className={iconClassName} />}
        label="Rules"
        value="0"
        valueSuffix="/ 20"
      />
      <StatCard
        icon={<LuClock className={iconClassName} />}
        label="Played"
        value="33"
        valueSuffix="Hours"
      />
    </div>
  );
}

function UserProgressCard() {
  return (
    <div
      className={clsx(
        //
        'flex flex-col w-full',
        'gap-1',
        // 'bg-red-500',
      )}
    >
      <div className="flex justify-between items-center w-full">
        {/* rank */}
        <span className="text-sm font-black text-violet-500 bg-slate-100 border border-slate-200 px-2  rounded-md">
          First timer
        </span>
        {/* level up */}
        <div className="flex gap-1.5 items-center">
          <FaPersonArrowUpFromLine className="text-green-600 size-5" />
          <span className="text-xs text-slate-500">
            Level up: <span className="font-bold">learn 4 items</span>
          </span>
        </div>
      </div>
      <div className="w-full h-3 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-violet-500 rounded-full" style={{ width: '45%' }} />
      </div>
    </div>
  );
}

export function UserSummaryCard() {
  return (
    <div
      className={clsx(
        'w-full',
        'h-auto',
        'bg-white',
        'rounded-lg',
        'border border-slate-200',
        'flex flex-col',
        'shadow-sm',
        'p-2',
        'gap-4',
      )}
    >
      {/* Row 1: Letters, Words, Rules, Played */}
      <UserStatsCard />

      {/* Row 2: Progress Block (Grouped) */}
      <UserProgressCard />
    </div>
  );
}
