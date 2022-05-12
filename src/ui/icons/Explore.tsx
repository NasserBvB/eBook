import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export function Explore(props: SvgProps) {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25 12a8.75 8.75 0 1117.5 0 8.75 8.75 0 01-17.5 0zm7.6-2.691a5 5 0 00-1.756 3.04l-.657 3.949c-.151.911.909 1.523 1.622.936l3.091-2.543a5 5 0 001.756-3.04l.656-3.949c.152-.911-.908-1.523-1.621-.936L10.85 9.309z"
        fill={props.color || '#212121'}
      />
      <Path
        d="M10.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
        fill={props.color || '#212121'}
      />
    </Svg>
  );
}
