import type { CSSProperties, ReactNode } from 'react';
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
  style?: CSSProperties;
}

function Box({ className, children, style }: Readonly<BoxProps>) {
  return (
    <div className={cn(className)} style={style}>
      {children}
    </div>
  );
}

interface SwatchToken {
  label: string;
  tokenVariable: string;
}

interface ColorFamily {
  title: string;
  tokens: readonly SwatchToken[];
}

const SAMPLE_TEXT_ENGLISH = 'What will we learn today?';
const SAMPLE_TEXT_GEORGIAN = 'რას ვისწავლით დღეს?';

const COLOR_STEPS = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const;

function createColorFamily(name: 'neutral' | 'brand' | 'accent'): ColorFamily {
  return {
    title: `p-color-${name}`,
    tokens: COLOR_STEPS.map((step) => ({
      label: step,
      tokenVariable: `p-color-${name}-${step}`,
    })),
  };
}

const COLOR_FAMILIES: readonly ColorFamily[] = [
  createColorFamily('neutral'),
  createColorFamily('brand'),
  createColorFamily('accent'),
];

const SPACING_TOKENS: readonly SwatchToken[] = [
  { label: '0', tokenVariable: 'p-spacing-0' },
  { label: '1', tokenVariable: 'p-spacing-1' },
  { label: '2', tokenVariable: 'p-spacing-2' },
  { label: '3', tokenVariable: 'p-spacing-3' },
  { label: '4', tokenVariable: 'p-spacing-4' },
  { label: '5', tokenVariable: 'p-spacing-5' },
  { label: '6', tokenVariable: 'p-spacing-6' },
];

const RADIUS_TOKENS: readonly SwatchToken[] = [
  { label: 'none', tokenVariable: 'p-radius-none' },
  { label: '1', tokenVariable: 'p-radius-1' },
  { label: '2', tokenVariable: 'p-radius-2' },
  { label: '3', tokenVariable: 'p-radius-3' },
  { label: 'full', tokenVariable: 'p-radius-full' },
];

interface FontAlias {
  title: string;
  className: string;
}

const FONT_ALIASES: readonly FontAlias[] = [
  { title: 'font-default', className: 'font-default' },
  { title: 'font-georgian', className: 'font-georgian' },
];

function cssVariable(name: string): string {
  return `var(--${name})`;
}

function cssVariableStyle(
  name: string,
  property: 'backgroundColor' | 'padding' | 'borderRadius',
): CSSProperties {
  return {
    [property]: cssVariable(name),
  };
}

function ColorTokens() {
  return (
    <DesignSystemTokenSection title="Primitive palettes">
      {COLOR_FAMILIES.map((family) => (
        <TokenBlock key={family.title} title={family.title}>
          <div className="grid grid-cols-2 gap-4 min-[600px]:grid-cols-4 lg:grid-cols-6">
            {family.tokens.map((token) => (
              <div key={token.label} className="flex min-w-0 flex-col gap-2">
                <Box
                  data-token-variable={token.tokenVariable}
                  className={cn('h-20 rounded-p-radius-1 border border-p-color-neutral-300')}
                  style={cssVariableStyle(token.tokenVariable, 'backgroundColor')}
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
              <div
                className="bg-p-color-brand-200"
                style={cssVariableStyle(token.tokenVariable, 'padding')}
              >
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
              className="h-20 w-20 border border-p-color-neutral-300 bg-p-color-brand-200"
              style={cssVariableStyle(token.tokenVariable, 'borderRadius')}
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
