import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export function Filter(props: SvgProps) {
  return (
    <Svg width={72} height={24} fill="none" {...props}>
      <Path
        d="M66.523 4.226a58.726 58.726 0 00-13.046 0 1.373 1.373 0 00-.915 2.229l3.769 4.659A7.5 7.5 0 0158 15.83v3.142a.75.75 0 00.306.605l2.771 2.032a.58.58 0 00.923-.468v-5.311a7.5 7.5 0 011.67-4.717l3.768-4.66a1.373 1.373 0 00-.915-2.228z"
        fill="#212121"
      />
      <Path
        d="M2.002 17.112c-.616 0-.924-.317-.924-.952V8.082c0-.635.317-.952.952-.952h4.886c.485 0 .728.233.728.7 0 .485-.243.728-.728.728H2.87v2.786h3.752c.485 0 .728.233.728.7 0 .485-.243.728-.728.728H2.87v3.388c0 .635-.29.952-.868.952zm8.268-8.358c-.326 0-.583-.08-.77-.238-.177-.168-.266-.397-.266-.686 0-.299.089-.527.266-.686.187-.159.444-.238.77-.238.69 0 1.036.308 1.036.924 0 .616-.345.924-1.036.924zm0 8.344c-.28 0-.494-.084-.644-.252-.15-.168-.224-.401-.224-.7v-5.138c0-.635.29-.952.868-.952.588 0 .882.317.882.952v5.138c0 .299-.074.532-.224.7-.15.168-.368.252-.658.252zm5.109.042c-1.559 0-2.338-.873-2.338-2.618V7.9c0-.588.29-.882.868-.882.588 0 .882.294.882.882v6.538c0 .84.35 1.26 1.05 1.26h.21l.196-.028c.13-.019.22.019.266.112.047.084.07.261.07.532 0 .233-.047.415-.14.546-.093.13-.247.21-.462.238a4.252 4.252 0 01-.602.042zm5.161 0c-1.81 0-2.716-.896-2.716-2.688V11.47h-.728c-.466 0-.7-.22-.7-.658 0-.439.234-.658.7-.658h.728V8.88c0-.588.294-.882.882-.882.579 0 .868.294.868.882v1.274h1.484c.467 0 .7.22.7.658 0 .439-.233.658-.7.658h-1.484v2.884c0 .448.098.784.294 1.008.196.224.514.336.952.336.159 0 .299-.014.42-.042a2.6 2.6 0 01.322-.056.32.32 0 01.28.112c.075.075.112.233.112.476 0 .187-.032.355-.098.504a.507.507 0 01-.322.294c-.121.037-.28.07-.476.098a2.813 2.813 0 01-.518.056zm5.613 0c-.774 0-1.442-.145-2.002-.434a3.13 3.13 0 01-1.302-1.232c-.298-.532-.448-1.162-.448-1.89 0-.71.145-1.33.434-1.862a3.256 3.256 0 011.218-1.246c.523-.308 1.116-.462 1.778-.462.971 0 1.736.308 2.296.924.57.616.854 1.456.854 2.52 0 .345-.224.518-.672.518h-4.228c.131 1.223.831 1.834 2.1 1.834.243 0 .514-.028.812-.084a3.13 3.13 0 00.868-.322c.243-.14.448-.182.616-.126a.509.509 0 01.35.294c.075.15.084.317.028.504-.046.177-.177.331-.392.462-.326.205-.704.36-1.134.462-.42.093-.812.14-1.176.14zm-.252-5.936c-.513 0-.928.159-1.246.476-.317.317-.508.747-.574 1.288h3.444c-.037-.57-.196-1.003-.476-1.302-.27-.308-.653-.462-1.148-.462zm5.433 5.908c-.598 0-.896-.299-.896-.896v-5.292c0-.588.284-.882.854-.882.569 0 .854.294.854.882v.434c.336-.803 1.054-1.25 2.156-1.344.401-.047.625.182.672.686.046.495-.196.77-.728.826l-.308.028c-1.148.112-1.722.7-1.722 1.764v2.898c0 .597-.294.896-.882.896z"
        fill="#000"
      />
    </Svg>
  );
}