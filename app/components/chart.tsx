"use client";
import {
  Sparklines,
  SparklinesLine,
  SparklinesLineProps,
  SparklinesReferenceLine,
} from "react-sparklines";

type ChartProps = {
  data: number[];
  color: string;
};

const Chart: React.FC<ChartProps> = (props) => {
  return (
    <div className="max-w-md">
      <Sparklines data={props.data}>
        <SparklinesLine
          color={props.color}
          limit={15}
          width={100}
          height={20}
          margin={5}
        />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
      <p className="text-center">{props.avg}</p>
    </div>
  );
};

export default Chart;
