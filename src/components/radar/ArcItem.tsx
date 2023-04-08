import { FC } from 'react';
import * as d3 from 'd3';
import { Arc, DefaultArcObject } from 'd3';

type Props = {
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    color: string;
};

const ArcItem: FC<Props> = ({ innerRadius, outerRadius, startAngle, endAngle, color }) => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const arcGen: Arc<any, DefaultArcObject> = d3.arc();
    /* eslint-enable  @typescript-eslint/no-explicit-any */
    const path: string = arcGen({ innerRadius, outerRadius, startAngle, endAngle }) || '';
    return <path d={path} fill={color} />;
};

export default ArcItem;
