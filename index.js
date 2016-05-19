import ProgressCircle from './Circle';
import ProgressPie from './Pie';
import makeAnimatable from './makeAnimatable';

export { default as Bar } from './Bar';
export const Circle = makeAnimatable(ProgressCircle);
export { default as CircleSnail } from './CircleSnail';
export const Pie = makeAnimatable(ProgressPie, 0.2);
