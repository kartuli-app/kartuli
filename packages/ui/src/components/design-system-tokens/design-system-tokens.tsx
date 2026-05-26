import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface DesignSystemTokenSectionProps {
  title: string;
  children: ReactNode;
}

function DesignSystemTokenSection({ title, children }: Readonly<DesignSystemTokenSectionProps>) {
  return (
    <section className="flex flex-col gap-4 px-2">
      <h2 className="text-3xl text-slate-500">{title}</h2>
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  );
}

interface RowProps {
  children?: ReactNode;
}

function Row({ children }: Readonly<RowProps>) {
  return <div className="flex flex-row flex-wrap gap-8">{children}</div>;
}

interface TokenBlockProps {
  title: string;
  children: ReactNode;
}

function TokenBlock({ title, children }: Readonly<TokenBlockProps>) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <h3 className="text-sm text-slate-500">{title}</h3>
      {children}
    </div>
  );
}

interface BoxProps {
  className?: string;
  children?: ReactNode;
}

function Box({ className, children }: Readonly<BoxProps>) {
  return <div className={cn(className)}>{children}</div>;
}

interface SwatchToken {
  label: string;
  swatchClassName: string;
}

interface ColorFamily {
  title: string;
  tokens: readonly SwatchToken[];
}

const SAMPLE_TEXT_ENGLISH = 'What will we learn today?';
const SAMPLE_TEXT_GEORGIAN = 'რას ვისწავლით დღეს?';

const COLOR_FAMILIES: readonly ColorFamily[] = [
  {
    title: 'p-color-neutral',
    tokens: [
      { label: '50', swatchClassName: 'bg-p-color-neutral-50' },
      { label: '100', swatchClassName: 'bg-p-color-neutral-100' },
      { label: '200', swatchClassName: 'bg-p-color-neutral-200' },
      { label: '300', swatchClassName: 'bg-p-color-neutral-300' },
      { label: '400', swatchClassName: 'bg-p-color-neutral-400' },
      { label: '500', swatchClassName: 'bg-p-color-neutral-500' },
      { label: '600', swatchClassName: 'bg-p-color-neutral-600' },
      { label: '700', swatchClassName: 'bg-p-color-neutral-700' },
      { label: '800', swatchClassName: 'bg-p-color-neutral-800' },
      { label: '900', swatchClassName: 'bg-p-color-neutral-900' },
      { label: '950', swatchClassName: 'bg-p-color-neutral-950' },
    ],
  },
  {
    title: 'p-color-brand',
    tokens: [
      { label: '50', swatchClassName: 'bg-p-color-brand-50' },
      { label: '100', swatchClassName: 'bg-p-color-brand-100' },
      { label: '200', swatchClassName: 'bg-p-color-brand-200' },
      { label: '300', swatchClassName: 'bg-p-color-brand-300' },
      { label: '400', swatchClassName: 'bg-p-color-brand-400' },
      { label: '500', swatchClassName: 'bg-p-color-brand-500' },
      { label: '600', swatchClassName: 'bg-p-color-brand-600' },
      { label: '700', swatchClassName: 'bg-p-color-brand-700' },
      { label: '800', swatchClassName: 'bg-p-color-brand-800' },
      { label: '900', swatchClassName: 'bg-p-color-brand-900' },
      { label: '950', swatchClassName: 'bg-p-color-brand-950' },
    ],
  },
  {
    title: 'p-color-accent',
    tokens: [
      { label: '50', swatchClassName: 'bg-p-color-accent-50' },
      { label: '100', swatchClassName: 'bg-p-color-accent-100' },
      { label: '200', swatchClassName: 'bg-p-color-accent-200' },
      { label: '300', swatchClassName: 'bg-p-color-accent-300' },
      { label: '400', swatchClassName: 'bg-p-color-accent-400' },
      { label: '500', swatchClassName: 'bg-p-color-accent-500' },
      { label: '600', swatchClassName: 'bg-p-color-accent-600' },
      { label: '700', swatchClassName: 'bg-p-color-accent-700' },
      { label: '800', swatchClassName: 'bg-p-color-accent-800' },
      { label: '900', swatchClassName: 'bg-p-color-accent-900' },
      { label: '950', swatchClassName: 'bg-p-color-accent-950' },
    ],
  },
];

const SPACING_TOKENS: readonly SwatchToken[] = [
  { label: '0', swatchClassName: 'p-p-spacing-0' },
  { label: '1', swatchClassName: 'p-p-spacing-1' },
  { label: '2', swatchClassName: 'p-p-spacing-2' },
  { label: '3', swatchClassName: 'p-p-spacing-3' },
  { label: '4', swatchClassName: 'p-p-spacing-4' },
  { label: '5', swatchClassName: 'p-p-spacing-5' },
  { label: '6', swatchClassName: 'p-p-spacing-6' },
];

const RADIUS_TOKENS: readonly SwatchToken[] = [
  { label: 'none', swatchClassName: 'rounded-p-radius-none' },
  { label: '1', swatchClassName: 'rounded-p-radius-1' },
  { label: '2', swatchClassName: 'rounded-p-radius-2' },
  { label: '3', swatchClassName: 'rounded-p-radius-3' },
  { label: 'full', swatchClassName: 'rounded-p-radius-full' },
];

interface FontAlias {
  title: string;
  className: string;
}

const FONT_ALIASES: readonly FontAlias[] = [
  { title: 'font-default', className: 'font-default' },
  { title: 'font-georgian', className: 'font-georgian' },
];

function ColorTokens() {
  return (
    <DesignSystemTokenSection title="Primitive palettes">
      {COLOR_FAMILIES.map((family) => (
        <TokenBlock key={family.title} title={family.title}>
          <div className="grid grid-cols-2 gap-4 min-[600px]:grid-cols-4 lg:grid-cols-6">
            {family.tokens.map((token) => (
              <div key={token.label} className="flex min-w-0 flex-col gap-2">
                <Box
                  className={cn(
                    'h-20 rounded-p-radius-1 border border-p-color-neutral-300',
                    token.swatchClassName,
                  )}
                />
                <span className="text-xs text-p-color-neutral-700">{token.label}</span>
              </div>
            ))}
          </div>
        </TokenBlock>
      ))}
    </DesignSystemTokenSection>
  );
}

function SpacingTokens() {
  return (
    <DesignSystemTokenSection title="Spacing">
      <Row>
        {SPACING_TOKENS.map((token) => (
          <TokenBlock key={token.label} title={`p-spacing-${token.label}`}>
            <div className="inline-flex border border-dashed border-p-color-neutral-400 bg-p-color-neutral-100">
              <div className={cn('bg-p-color-brand-200', token.swatchClassName)}>
                <div className="h-20 w-20 bg-p-color-brand-600" />
              </div>
            </div>
          </TokenBlock>
        ))}
      </Row>
    </DesignSystemTokenSection>
  );
}

function RadiusTokens() {
  return (
    <DesignSystemTokenSection title="Radius">
      <Row>
        {RADIUS_TOKENS.map((token) => (
          <TokenBlock key={token.label} title={`p-radius-${token.label}`}>
            <Box
              className={cn(
                'h-20 w-20 border border-p-color-neutral-300 bg-p-color-brand-200',
                token.swatchClassName,
              )}
            />
          </TokenBlock>
        ))}
      </Row>
    </DesignSystemTokenSection>
  );
}

function FontAliasTokens() {
  return (
    <DesignSystemTokenSection title="Font aliases">
      <div className="grid gap-6 lg:grid-cols-2">
        {FONT_ALIASES.map((fontAlias) => (
          <TokenBlock key={fontAlias.title} title={fontAlias.title}>
            <div className="rounded-p-radius-2 border border-p-color-neutral-300 bg-p-color-neutral-50 p-p-spacing-4">
              <p className={cn('text-xl text-p-color-neutral-900', fontAlias.className)}>
                {SAMPLE_TEXT_ENGLISH}
              </p>
              <p className={cn('text-2xl text-p-color-neutral-700', fontAlias.className)}>
                {SAMPLE_TEXT_GEORGIAN}
              </p>
            </div>
          </TokenBlock>
        ))}
      </div>
    </DesignSystemTokenSection>
  );
}

export function DesignSystemTokens() {
  return (
    <div className="flex max-w-5xl flex-col gap-8">
      <ColorTokens />
      <SpacingTokens />
      <RadiusTokens />
      <FontAliasTokens />
    </div>
  );
}
