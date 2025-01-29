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
    <div className="max-w-md m-5">
      <Sparklines data={props.data}>
        <SparklinesLine
          color={props.color}
          limit={15}
          width={80}
          height={20}
          margin={3}
        />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
      <p className="text-center font-medium">{props.avg}</p>
    </div>
  );
};

export default Chart;
