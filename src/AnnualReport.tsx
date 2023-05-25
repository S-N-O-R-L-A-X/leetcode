import React from 'react';
import { Table } from 'antd';
import { DailyProps } from './constants';

const columns = [
  {
    title: 'RowHead',
    dataIndex: 'key',
    rowScope: 'row',
  },
  {
    title: '1',
    dataIndex: '1',
    key: '1',
  },
];

import data2023 from "./assets/2023.json";
import DifficultyGraph from './components/PieGraph';

export default function AnnualReport(props: DailyProps) {
  const { year = 2023 } = props;

  let jsonData = null;
  switch (year) {
    case 2023: jsonData = data2023; break;
    default: break;
  }

  const month_difficulties = [];
  const month_situations = [];
  const year_difficulty = [{ type: "困难", value: 0 }, { type: "中等", value: 0 }, { type: "简单", value: 0 }];
  const year_situation = [{ type: "自己做出", value: 0 }, { type: "看思路写出", value: 0 }, { type: "看懂答案", value: 0 }, { type: "没看懂答案", value: 0 }];

  jsonData?.daily.month.forEach((m, idx) => {
    const difficulty = [{ type: "困难", value: 0 }, { type: "中等", value: 0 }, { type: "简单", value: 0 }];
    const situation = [{ type: "自己做出", value: 0 }, { type: "看思路写出", value: 0 }, { type: "看懂答案", value: 0 }, { type: "没看懂答案", value: 0 }];
    m.forEach((d) => {
      if (d.difficulty === "困难") {
        difficulty[0].value++;
      }
      else if (d.difficulty === "中等") {
        difficulty[1].value++;
      }
      else {
        difficulty[2].value++;
      }

      if (d.situation === "自己做出") {
        situation[0].value++;
      }
      else if (d.situation === "看思路写出") {
        situation[1].value++;
      }
      else if (d.situation === "看懂答案") {
        situation[2].value++;
      }
      else {
        situation[3].value++;
      }
    })
    month_difficulties.push(difficulty);
    month_situations.push(situation);
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