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
import { Pie } from '@ant-design/plots';

export default function AnnualReport(props: DailyProps) {
  const { year = 2023, month = 1 } = props;

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


  const config = {
    forceFit: true,
    title: {
      visible: true,
      text: '多色饼图',
    },
    description: {
      visible: true,
      text:
        '指定颜色映射字段(colorField)\uFF0C饼图切片将根据该字段数据显示为不同的颜色\u3002指定颜色需要将color配置为一个数组\u3002\n当把饼图label的类型设置为inner时\uFF0C标签会显示在切片内部\u3002设置offset控制标签的偏移值\u3002',
    },
    radius: 0.8,
    data: year_difficulty,
    angleField: 'value',
    colorField: 'type',
    label: {
      visible: true,
      type: 'inner',
    },
  };

  return (
    <>
      {(year_difficulty && year_difficulty.length > 0) ? <Pie {...config} /> : <p>Sorry, no statistics here.</p>}
    </>
  );
}