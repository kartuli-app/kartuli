import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

function DesignSystemTokenSection({
  title,
  children,
}: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <section className="flex flex-col gap-4 px-2">
      <h2 className="text-3xl text-slate-500">{title}</h2>
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  );
}

function Row({ children }: Readonly<{ children?: ReactNode }>) {
  return <div className="flex flex-row flex-wrap gap-8">{children}</div>;
}

function TokenBlock({ title, children }: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <h3 className="text-sm text-slate-500">{title}</h3>
      {children}
    </div>
  );
}

function Box({ className, children }: Readonly<{ className?: string; children?: ReactNode }>) {
  return <div className={cn(className)}>{children}</div>;
}

function ColorBox({ className, children }: Readonly<{ className?: string; children?: ReactNode }>) {
  return (
    <Box
      className={cn(
        'min-h-24 h-24 w-64 flex-1 rounded-brand-radius-1 border border-brand-color-neutral-soft',
        className,
      )}
    >
      {children}
    </Box>
  );
}

const SAMPLE_TEXT_ENGLISH = 'What do you want to learn today';
const SAMPLE_TEXT_GEORGIAN = 'რა გნობობს დღეს გნობობს?';

function ColorTokens() {
  return (
    <DesignSystemTokenSection title="Color">
      <Row>
        <TokenBlock title="primary">
          <ColorBox className="bg-primary" />
        </TokenBlock>
      </Row>
      <Row>
        <TokenBlock title="brand-color-primary-soft">
          <ColorBox className="bg-brand-color-primary-soft" />
        </TokenBlock>
        <TokenBlock title="brand-color-primary">
          <ColorBox className="bg-brand-color-primary" />
        </TokenBlock>
        <TokenBlock title="brand-color-primary-strong">
          <ColorBox className="bg-brand-color-primary-strong" />
        </TokenBlock>
      </Row>
      <Row>
        <TokenBlock title="brand-color-neutral-soft">
          <ColorBox className="bg-brand-color-neutral-soft" />
        </TokenBlock>
        <TokenBlock title="brand-color-neutral">
          <ColorBox className="bg-brand-color-neutral" />
        </TokenBlock>
        <TokenBlock title="brand-color-neutral-strong">
          <ColorBox className="bg-brand-color-neutral-strong" />
        </TokenBlock>
      </Row>
      <Row>
        <TokenBlock title="brand-color-semantic-success-soft">
          <ColorBox className="bg-brand-color-semantic-success-soft" />
        </TokenBlock>
        <TokenBlock title="brand-color-semantic-success">
          <ColorBox className="bg-brand-color-semantic-success" />
        </TokenBlock>
        <TokenBlock title="brand-color-semantic-success-strong">
          <ColorBox className="bg-brand-color-semantic-success-strong" />
        </TokenBlock>
      </Row>
      <Row>
        <TokenBlock title="brand-color-semantic-error-soft">
          <ColorBox className="bg-brand-color-semantic-error-soft" />
        </TokenBlock>
        <TokenBlock title="brand-color-semantic-error">
          <ColorBox className="bg-brand-color-semantic-error" />
        </TokenBlock>
        <TokenBlock title="brand-color-semantic-error-strong">
          <ColorBox className="bg-brand-color-semantic-error-strong" />
        </TokenBlock>
      </Row>
    </DesignSystemTokenSection>
  );
}

function TypographyTokens() {
  return (
    <DesignSystemTokenSection title="Typography">
      <div className="flex max-w-3xl flex-col gap-6">
        <TokenBlock title="brand-typography-title">
          <div>
            <p className="text-brand-typography-title text-brand-color-neutral-strong">
              {SAMPLE_TEXT_ENGLISH}
            </p>
            <p className="text-brand-typography-title text-brand-color-neutral-strong">
              {SAMPLE_TEXT_GEORGIAN}
            </p>
          </div>
        </TokenBlock>
        <TokenBlock title="brand-typography-subtitle">
          <div>
            <p className="text-brand-typography-subtitle text-brand-color-neutral-strong">
              {SAMPLE_TEXT_ENGLISH}
            </p>
            <p className="text-brand-typography-subtitle text-brand-color-neutral-strong">
              {SAMPLE_TEXT_GEORGIAN}
            </p>
          </div>
        </TokenBlock>
        <TokenBlock title="brand-typography-button">
          <p className="text-brand-typography-button text-brand-color-neutral-strong">
            {SAMPLE_TEXT_ENGLISH}
          </p>
          <p className="text-brand-typography-button text-brand-color-neutral-strong">
            {SAMPLE_TEXT_GEORGIAN}
          </p>
        </TokenBlock>
      </div>
    </DesignSystemTokenSection>
  );
}

const SPACING_STEPS = ['1', '2', '3', '4'] as const;
const SPACING_CLASS: Record<(typeof SPACING_STEPS)[number], string> = {
  '1': 'p-brand-spacing-1',
  '2': 'p-brand-spacing-2',
  '3': 'p-brand-spacing-3',
  '4': 'p-brand-spacing-4',
};

function SpacingTokens() {
  return (
    <DesignSystemTokenSection title="Spacing">
      <Row>
        {SPACING_STEPS.map((step) => (
          <TokenBlock key={step} title={`brand-spacing-${step}`}>
            <div className="inline-flex border border-dashed border-brand-color-neutral bg-brand-color-neutral-soft">
              <div className={cn('bg-brand-color-primary-soft', SPACING_CLASS[step])}>
                <div className="h-32 w-32 bg-brand-color-primary" />
              </div>
            </div>
          </TokenBlock>
        ))}
      </Row>
    </DesignSystemTokenSection>
  );
}

const RADIUS_STEPS = ['none', '1', '2', '3', 'full'] as const;
const RADIUS_CLASS: Record<(typeof RADIUS_STEPS)[number], string> = {
  none: 'rounded-brand-radius-none',
  '1': 'rounded-brand-radius-1',
  '2': 'rounded-brand-radius-2',
  '3': 'rounded-brand-radius-3',
  full: 'rounded-brand-radius-full',
};

function RadiusTokens() {
  return (
    <DesignSystemTokenSection title="Radius">
      <Row>
        {RADIUS_STEPS.map((step) => (
          <TokenBlock key={step} title={`brand-radius-${step}`}>
            <div
              className={cn(
                'h-32 w-32 border border-brand-color-neutral-soft bg-brand-color-primary-soft',
                RADIUS_CLASS[step],
              )}
            />
          </TokenBlock>
        ))}
      </Row>
    </DesignSystemTokenSection>
  );
}

export function DesignSystemTokens() {
  return (
    <div className="flex max-w-5xl flex-col gap-8">
      <ColorTokens />
      <TypographyTokens />
      <SpacingTokens />
      <RadiusTokens />
    </div>
  );
}
