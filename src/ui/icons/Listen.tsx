import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export function Listen(props: SvgProps) {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        d="M12 3.75C8.436 3.75 5.75 6.205 5.75 9v1.512A2.55 2.55 0 016 10.5h2A1.5 1.5 0 019.5 12v5A1.5 1.5 0 018 18.5H6A2.5 2.5 0 013.5 16v-3c0-.7.287-1.332.75-1.785V9c0-3.832 3.582-6.75 7.75-6.75S19.75 5.168 19.75 9v2.215c.463.453.75 1.086.75 1.785v3a2.5 2.5 0 01-2.5 2.5h-2a1.5 1.5 0 01-1.5-1.5v-5a1.5 1.5 0 011.5-1.5h2c.084 0 .168.004.25.012V9c0-2.795-2.686-5.25-6.25-5.25z"
        fill={props.color || '#212121'}
      />
    </Svg>
  );
}
