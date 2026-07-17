import { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';

/**
 * Section — the one place that decides a block's background/text theme
 * and its vertical spacing.
 *
 * <Section theme="dark">...</Section>
 * <Section theme="light">...</Section>
 * <Section theme="dark" container={false}>   -> full-bleed, no side padding
 * <Section theme="dark" padY={false}>        -> section handles its own top/bottom spacing
 * <Section theme="dark" bg="#171310">        -> one-off custom background color
 */
type SectionProps = {
  as?: ElementType;
  theme?: 'dark' | 'light';
  bg?: string;
  container?: boolean;
  padY?: boolean;
  containerClassName?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export default function Section({
  as: Tag = 'section',
  theme = 'dark',
  bg,
  container = true,
  padY = true,
  containerClassName = '',
  className = '',
  style,
  children,
  ...rest
}: SectionProps) {
  const mergedStyle = bg
    ? ({ '--section-bg': bg, ...style } as CSSProperties)
    : style;

  return (
    <Tag
      data-theme={theme}
      data-pad-y={padY}
      className={`section ${className}`.trim()}
      style={mergedStyle}
      {...rest}
    >
      {container ? (
        <div className={`container ${containerClassName}`.trim()}>{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}