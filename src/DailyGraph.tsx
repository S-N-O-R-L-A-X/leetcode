import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';
import { DailyProps } from './constants';

import data2023 from "./assets/2023.json";

export default function DailyGraph(props: DailyProps) {
  const { year = 2023, month = 0 } = props;

  let data = null;
  switch (year) {
    case 2023: data = data2023; break;
    default: break;
  }

  if (data?.statistics.situations[month!]) {
    data = data?.statistics.situations[month!];
  }
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
  return <Pie {...config} />;
};
