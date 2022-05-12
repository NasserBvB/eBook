import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export function MediaHeadphone(props: SvgProps) {
  return (
    <Svg width={70} height={70} fill="none" {...props}>
      <Path
        d="M35 10.938c-10.396 0-18.23 7.16-18.23 15.312v4.411c.24-.024.484-.036.73-.036h5.833A4.375 4.375 0 0127.708 35v14.583a4.375 4.375 0 01-4.375 4.375H17.5a7.292 7.292 0 01-7.292-7.291v-8.75a7.27 7.27 0 012.188-5.208V26.25C12.396 15.073 22.845 6.562 35 6.562s22.604 8.51 22.604 19.688v6.46a7.27 7.27 0 012.188 5.207v8.75a7.292 7.292 0 01-7.292 7.291h-5.833a4.375 4.375 0 01-4.375-4.375V35a4.375 4.375 0 014.375-4.375H52.5c.246 0 .49.012.73.036V26.25c0-8.153-7.834-15.313-18.23-15.313z"
        fill="#F8F5F1"
      />
    </Svg>
  );
}
