"use client";
import Chart from "./chart";
import { CityProcessedData } from "../types/CityProcessedData";

type WeatherPropsType = {
  data: number[];
  avg: string;
  color: string;
};

const ChartGroup = ({ city }) => {
  const weatherCharts = (city: CityProcessedData): WeatherPropsType[] => {
    return [
      {
        data: city.allTemps,
        avg: city.avgTemp,
        color: "orange",
      },
      {
        data: city.allPressures,
        avg: city.avgPressure,
        color: "purple",
      },
      {
        data: city.allHumidities,
        avg: city.avgHumidity,
        color: "green",
      },
    ];
  };

  return (
    <div
      className="grid grid-cols-4 gap-2 text-center hover:bg-slate-100"
      key={city.cityId}
    >
      <div className="font-medium text-sm my-auto">{city.city}</div>
      {weatherCharts(city).map((props) => (
        <Chart {...props} key={props.avg} />
      ))}
    </div>
  );
};

export default ChartGroup;
