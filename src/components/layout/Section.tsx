import {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from 'react';

type SectionTag = 'section' | 'div' | 'article' | 'header' | 'footer';

type SectionProps = {
  as?: SectionTag;
  theme?: 'dark' | 'light';
  bg?: string;
  grid?: boolean;
  padY?: boolean;
  className?: string;
  gridClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export default function Section({
  as: Tag = 'section',
  theme = 'dark',
  bg,
  grid = true,
  padY = true,
  className = '',
  gridClassName = '',
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
      {grid ? (
        <div className={`pageGrid ${gridClassName}`.trim()}>
          {children}
        </div>
      ) : (
        children
      )}
    </Tag>
  );
}