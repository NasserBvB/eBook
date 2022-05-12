import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export function Settings(props: SvgProps) {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        d="M13.878 8.75H4a.75.75 0 010-1.5h9.878a2.251 2.251 0 014.244 0H20a.75.75 0 010 1.5h-1.878a2.251 2.251 0 01-4.244 0zM20 16.75a.75.75 0 000-1.5h-9.878a2.251 2.251 0 00-4.244 0H4a.75.75 0 000 1.5h1.878a2.25 2.25 0 004.244 0H20z"
        fill={props.color || '#212121'}
      />
    </Svg>
  );
}
