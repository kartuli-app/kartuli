'use client';

import { clsx } from 'clsx';
import {
  FaGamepad,
  FaGraduationCap,
  FaLayerGroup,
  FaBrain,
  FaLightbulb,
  FaStar,
  FaRedo,
} from 'react-icons/fa';
import { SlRefresh } from 'react-icons/sl';
import { BiTimeFive } from 'react-icons/bi';
import { ResponsiveContainer } from '@/domains/shared/components/responsive-container';
import { UserSummaryCard } from '@/domains/shared/components/user-stats-card';
import { IoMdRefreshCircle } from 'react-icons/io';
import { IoHelpCircle } from 'react-icons/io5';

function RecommendedGameCard() {
  return (
    <div
      className={clsx(
        'w-full',
        'flex-grow', // Takes available space
        'bg-white',
        'rounded-lg',
        'border border-slate-200',
        'flex flex-col', // Vertical Stack
        'shadow-sm',
        'p-2',
        'gap-2',
        'min-h-64', // Min height for safety
      )}
    >
      {/* Header: Title & Badges */}
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Daily Mix</h2>
        <div className="flex gap-1.5">
          <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider border border-rose-200 flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center">
              <FaStar className="text-white size-2" />
            </div>
            NEW CONTENT
          </span>
          <span className="bg-indigo-100 text-indigo-600 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider border border-indigo-200 flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
              <FaRedo className="text-white size-2" />
            </div>
            REINFORCE
          </span>
        </div>
      </div>

      {/* Motivation Block (Compact & Clickable) */}
      <button
        type="button"
        className={clsx(
          'w-full',
          'bg-slate-50',
          'rounded-xl',
          'p-1',
          'flex items-center justify-between',
          'border border-slate-100',
          'cursor-pointer',
          'hover:bg-slate-100',
          'transition-colors',
          'text-left', // Reset button text alignment
        )}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <FaLightbulb className="text-yellow-500 size-4 flex-shrink-0" />
          <span className="text-xs text-slate-500 truncate">
            Personalized to master the alphabet
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              'flex items-center gap-1',
              'bg-white',
              'border border-slate-200',
              'text-[10px] font-bold',
              'text-slate-600',
              'px-2 py-1',
              'rounded-lg',
              'whitespace-nowrap',
            )}
          >
            <IoHelpCircle className="size-4 text-slate-400" />
            WHY?
          </div>
          <div
            className={clsx(
              'flex items-center gap-1',

              'bg-white',
              'border border-slate-200',
              'text-[10px] font-bold',
              'text-slate-600',
              'px-2 py-1',
              'rounded-lg',
              'whitespace-nowrap',
            )}
          >
            <IoMdRefreshCircle className="size-4 text-blue-600" />
            NEW RECOMENDATION
          </div>
        </div>
      </button>

      {/* Stats Grid (1 Row, Compact, Justified) */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {/* Time */}
        <div className="flex items-center justify-center gap-2 p-1 rounded-lg bg-slate-50 border border-slate-100">
          <BiTimeFive className="text-slate-400 size-4" />
          <span className="text-[10px] text-slate-400 font-bold uppercase">Time</span>
          <span className="text-sm font-bold text-slate-700">2 min</span>
        </div>
        {/* Rounds */}
        <div className="flex items-center justify-center gap-2 p-1 rounded-lg bg-slate-50 border border-slate-100">
          <FaLayerGroup className="text-slate-400 size-4" />
          <span className="text-[10px] text-slate-400 font-bold uppercase">Rounds</span>
          <span className="text-sm font-bold text-slate-700">10</span>
        </div>
      </div>

      {/* Preview Strip - Flexible Height */}
      <div className="flex flex-col gap-2 flex-grow min-h-[80px] bg-slate-50 rounded-lg border border-slate-100 p-1">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Content
          </span>
          <div className="flex gap-1.5">
            <span className="text-[9px] font-black text-sky-600 bg-sky-100 px-1.5 py-0.5 rounded-md uppercase tracking-wide">
              4 Words
            </span>
            <span className="text-[9px] font-black text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded-md uppercase tracking-wide">
              1 Rule
            </span>
          </div>
        </div>
        <div className="flex gap-2 w-full h-full">
          {/* Card 1: Letter 'a' (Ani) - STATUS: NEW (Star Icon) */}
          <div
            className={clsx(
              'flex-1',
              'bg-amber-50',
              'rounded-lg',
              'border border-amber-100',
              'flex flex-col items-center justify-between',
              'overflow-hidden',
              'h-full',
              'relative',
            )}
          >
            {/* Status Icon: NEW */}
            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center shadow-sm z-10">
              <FaStar className="text-white size-2" />
            </div>

            <div className="flex-1 flex items-center justify-center w-full">
              <span className="text-3xl font-black text-amber-800">ა</span>
            </div>
            <div className="w-full bg-amber-100/50 pb-1 flex justify-center">
              <span className="text-[8px] font-bold text-amber-700 uppercase truncate px-1">
                Ani
              </span>
            </div>
          </div>

          {/* Card 2: Word 'Gamarjoba' - STATUS: REVIEW (Redo Icon) */}
          <div
            className={clsx(
              'flex-1',
              'bg-sky-50',
              'rounded-lg',
              'border border-sky-100',
              'flex flex-col items-center justify-between',
              'overflow-hidden',
              'h-full',
              'relative',
            )}
          >
            {/* Status Icon: REVIEW */}
            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center shadow-sm z-10">
              <FaRedo className="text-white size-2" />
            </div>

            <div className="flex-1 flex items-center justify-center w-full p-1">
              <span className="text-2xl">👋</span>
            </div>
            <div className="w-full bg-sky-100/50 pb-1 flex justify-center">
              <span className="text-[8px] font-bold text-sky-700 uppercase truncate px-1">
                Hello
              </span>
            </div>
          </div>

          {/* Card 3: Grammar Rule - STATUS: NEW (Star Icon) */}
          <div
            className={clsx(
              'flex-1',
              'bg-purple-50',
              'rounded-lg',
              'border border-purple-100',
              'flex flex-col items-center justify-between',
              'overflow-hidden',
              'h-full',
              'relative',
            )}
          >
            {/* Status Icon: NEW */}
            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center shadow-sm z-10">
              <FaStar className="text-white size-2" />
            </div>

            <div className="flex-1 flex items-center justify-center w-full p-1">
              <FaBrain className="text-purple-400 size-5" />
            </div>
            <div className="w-full bg-purple-100/50 pb-1 flex justify-center">
              <span className="text-[8px] font-bold text-purple-700 uppercase truncate px-1">
                Verbs
              </span>
            </div>
          </div>

          {/* Card 4: Overflow (+2) - Mixed Status */}
          <div
            className={clsx(
              'flex-1',
              'bg-slate-800',
              'rounded-lg',
              'border border-slate-700',
              'flex flex-col items-center justify-between',
              'overflow-hidden',
              'h-full',
              'relative',
            )}
          >
            {/* Status Icons: Mixed (Stacked) */}
            <div className="absolute top-1.5 right-1.5 flex gap-1">
              <div className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center shadow-sm">
                <FaStar className="text-white size-2" />
              </div>
              <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center shadow-sm">
                <FaRedo className="text-white size-2" />
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center w-full p-1">
              <FaLayerGroup className="text-slate-300 size-6" />
            </div>
            <div className="w-full bg-slate-700/50 pb-1 flex justify-center">
              <span className="text-[8px] font-bold text-slate-200 uppercase truncate px-1">
                +2 More
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GameActions() {
  return (
    <div className={clsx('w-full', 'flex flex-col', 'gap-2')}>
      {/* Row 1: Learn & Play */}
      <div className="flex flex-row gap-2 w-full">
        {/* Learn Button (Outline) */}
        <button
          type="button"
          className={clsx(
            'flex-1',
            'cursor-pointer',
            'text-lg font-bold',
            'text-violet-800',
            'bg-white',
            'border-2 border-violet-800',
            'hover:bg-violet-50',
            'rounded-md',
            'p-3',
            'flex flex-row items-center justify-center gap-2',
            'transition-colors',
          )}
        >
          <FaGraduationCap className="size-5" />
          <span>LEARN</span>
        </button>

        {/* Play Button (Solid) */}
        <button
          type="button"
          className={clsx(
            'flex-[2]', // Make play button wider/more prominent
            'cursor-pointer',
            'text-lg font-bold',
            'text-white',
            'bg-violet-800',
            'hover:bg-violet-900',
            'rounded-md',
            'p-3',
            'flex flex-row items-center justify-center gap-2',
            'shadow-md',
            'transition-colors',
          )}
        >
          <FaGamepad className="size-6" />
          <span>PLAY NOW</span>
        </button>
      </div>
    </div>
  );
}

export function ForYouPage() {
  return (
    <ResponsiveContainer
      className={clsx(
        //
        'flex-col',
        'flex-1',
        'p-0', // Increased padding for better breathing room
        // 'overflow-hidden', // Prevent main container scroll
        // 'bg-pink-500',
      )}
    >
      {/* content wrapper */}
      <div
        id="content-wrapper"
        className={clsx(
          'flex-1 flex flex-col',
          'items-center', // Center cards horizontally
          'gap-2', // Gap between major sections
          'w-full max-w-lg mx-auto',
          'min-h-0', // Allow flex children to shrink properly
        )}
      >
        <UserSummaryCard />
        <RecommendedGameCard />
        <GameActions />
      </div>
    </ResponsiveContainer>
  );
}
