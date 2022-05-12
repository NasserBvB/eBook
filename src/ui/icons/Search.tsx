import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export function Search(props: SvgProps) {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.385 15.446a6.751 6.751 0 111.06-1.06l5.156 5.155a.75.75 0 01-1.06 1.06l-5.156-5.155zM6.46 13.884a5.25 5.25 0 117.43-.005l-.005.005-.005.004a5.25 5.25 0 01-7.42-.004z"
        fill="#000"
      />
    </Svg>
  );
}
