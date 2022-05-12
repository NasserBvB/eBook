import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export function HeartSolid(props: SvgProps) {
  return (
    <Svg width={36} height={36} fill="none" {...props}>
      <Path
        d="M12.6 7.875c-4.171 0-7.725 3.119-7.725 7.17 0 2.794 1.309 5.147 3.043 7.096 1.728 1.942 3.958 3.572 5.974 4.937l3.477 2.354c.381.258.88.258 1.262 0l3.477-2.354c2.016-1.365 4.246-2.995 5.974-4.937 1.735-1.95 3.043-4.302 3.043-7.096 0-4.051-3.554-7.17-7.725-7.17-2.15 0-4.042 1.008-5.4 2.313-1.358-1.305-3.25-2.313-5.4-2.313z"
        fill="#212121"
      />
    </Svg>
  );
}
