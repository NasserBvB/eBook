import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export function Plus(props: SvgProps) {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        d="M12.75 7a.75.75 0 00-1.5 0v4.25H7a.75.75 0 000 1.5h4.25V17a.75.75 0 001.5 0v-4.25H17a.75.75 0 000-1.5h-4.25V7z"
        fill="#000"
      />
    </Svg>
  );
}
