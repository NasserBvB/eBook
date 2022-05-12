import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export function Read(props: SvgProps) {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 8a4.5 4.5 0 014.5-4.5h10A1.5 1.5 0 0120 5v15a1 1 0 01-1 1H7.5a3.5 3.5 0 01-3.465-3H4V8zm14.5 7.5h-11a2 2 0 100 4h11v-4zM8.25 8A.75.75 0 019 7.25h7a.75.75 0 010 1.5H9A.75.75 0 018.25 8zM9 10.25a.75.75 0 000 1.5h5a.75.75 0 000-1.5H9z"
        fill={props.color || '#212121'}
      />
    </Svg>
  );
}
