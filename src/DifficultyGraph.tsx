import { Pie } from '@ant-design/plots';
import { DailyProps } from './constants';

import data2023 from "./assets/2023.json";

export default function DifficultyGraph(props: DailyProps) {
  const { year = 2023, month = 1 } = props;
  let jsonData: any[] = [];
  let data: Record<string, any>[] = [{ type: "困难", value: 0 }, { type: "中等", value: 0 }, { type: "简单", value: 0 }];

  switch (year) {
    case 2023: jsonData = data2023?.daily.month[month! - 1]; break;
    default: jsonData = []; break;
  }

  jsonData?.forEach((v: any) => {
    if (v.difficulty === "困难") {
      data[0].value++;
    }
    else if (v.difficulty === "中等") {
      data[1].value++;
    }
    else {
      data[2].value++;
    }
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
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      visible: true,
      type: 'inner',
    },
  };
  return (data && data.length > 0) ? <Pie {...config} /> : <p>Sorry, no statistics here.</p>;
};
