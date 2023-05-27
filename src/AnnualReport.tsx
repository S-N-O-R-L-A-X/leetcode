import React from 'react';
import { DailyProps } from './constants';
import data2023 from "./assets/2023.json";
import DifficultyGraph from './components/PieGraph';
import AnnualTable from './AnnualTable';
import LineChart from './components/LineChart';

export default function AnnualReport(props: DailyProps) {
  const { year = 2023 } = props;

  let jsonData = null;
  switch (year) {
    case 2023: jsonData = data2023; break;
    default: break;
  }

  const month_difficulties: any[] = [];
  const month_situations = [];
  const year_difficulty = [{ type: "困难", value: 0 }, { type: "中等", value: 0 }, { type: "简单", value: 0 }];
  const year_situation = [{ type: "自己做出", value: 0 }, { type: "看思路写出", value: 0 }, { type: "看懂答案", value: 0 }, { type: "没看懂答案", value: 0 }];
  const annual_info: any[] = [{ "info": "困难", }, { "info": "中等", }, { "info": "简单", }, { "info": "自己做出" }, { "info": "看思路写出" }, { "info": "看懂答案" }, { "info": "没看懂答案" }];
  // const year_info = [];


  jsonData?.daily.month.forEach((m, idx) => {
    const difficulty = [{ type: "困难", month: `${idx + 1}月`, value: 0 }, { type: "中等", month: `${idx + 1}月`, value: 0 }, { type: "简单", month: `${idx + 1}月`, value: 0 }];
    const situation = [{ type: "自己做出", value: 0 }, { type: "看思路写出", value: 0 }, { type: "看懂答案", value: 0 }, { type: "没看懂答案", value: 0 }];
    annual_info.forEach((mon) => {
      mon[`${idx + 1}月`] = 0;
    })

    m.forEach((d) => {
      if (d.difficulty === "困难") {
        difficulty[0].value++;
        annual_info[0][`${idx + 1}月`]++;
      }
      else if (d.difficulty === "中等") {
        difficulty[1].value++;
        annual_info[1][`${idx + 1}月`]++;
      }
      else {
        difficulty[2].value++;
        annual_info[2][`${idx + 1}月`]++;
      }

      if (d.situation === "自己做出") {
        situation[0].value++;
        annual_info[3][`${idx + 1}月`]++;
      }
      else if (d.situation === "看思路写出") {
        situation[1].value++;
        annual_info[4][`${idx + 1}月`]++;
      }
      else if (d.situation === "看懂答案") {
        situation[2].value++;
        annual_info[5][`${idx + 1}月`]++;
      }
      else {
        situation[3].value++;
        annual_info[6][`${idx + 1}月`]++;
      }
    })
    month_difficulties.push(...difficulty);
    month_situations.push(...situation);
    // const month_info: any = {};
    // difficulty.forEach(({ type, value }) => {
    //   month_info[type] = value;
    // })
    // situation.forEach(({ type, value }) => {
    //   month_info[type] = value;
    // })
    // year_info.push(month_info);

    year_difficulty[0].value += difficulty[0].value;
    year_difficulty[1].value += difficulty[1].value;
    year_difficulty[2].value += difficulty[2].value;
    year_situation[0].value += situation[0].value;
    year_situation[1].value += situation[1].value;
    year_situation[2].value += situation[2].value;
    year_situation[3].value += situation[3].value;
  })

  return (
    <>
      <AnnualTable data={annual_info} />
      <div>
        <LineChart data={month_difficulties} />
      </div>
      <div>
        <div className="show-graph">
          <DifficultyGraph data={year_situation} />
        </div>
        <div className="show-graph">
          <DifficultyGraph data={year_difficulty} />
        </div>
      </div>
    </>
  );
}