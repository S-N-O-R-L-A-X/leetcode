import { Table } from 'antd';
import { Suspense, useMemo } from 'react';

interface DailyTableProps {
  year?: number;
  month?: number;
}
/*
function wrapPromise(promise: Promise<any>) {
  let status = "pending", res: any;
  const suspender = promise.then((resolve) => {
    status = "resolved";
    console.log("resolved");
    res = resolve;
  }, (err) => {
    status = "error";
    res = err;
    console.error(err);
  })
  return {
    read() {
      switch (status) {
        case "pending": throw suspender;
        case "error": throw res;
        case "resolved": return res;
        default: console.log("default"); break;
      }
    }
  }
}


function getData(year: number) {
  return wrapPromise(import(`./assets/${year}.json`));
}
*/

type Question = {
  "日期": string;
  "题号": number | string;
  "题目名称": string;
  "难度": "简单" | "中等" | "困难",
  "rating": "1155",
  "做题情况": "自己做出" | "看思路写出" | "CV后没看懂" | "CV后看懂",
  "算法和数据结构": string | string[],
  "学到的内容": string | string[],
  "没看懂的内容": string | string[]
}

import data2023 from "./assets/2023.json";
export default function DailyTable(props: DailyTableProps) {
  const { year = 2023, month = 0 } = props;
  // const data = getData(year).read();
  let data = null;
  switch (year) {
    case 2023: data = data2023; break;
    default: break;
  }

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '题号',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: '题目名称',
      dataIndex: 'name',
      key: "name",
    },
    {
      title: "难度",
      dataIndex: "difficulty",
      key: "difficulty"
    },
    {
      title: "rating",
      dataIndex: "rating",
      key: "rating"
    },
    {
      title: "做题情况",
      dataIndex: "situation",
      key: "situation"
    },
    {
      title: "算法和数据结构",
      dataIndex: "method",
      key: "method"
    },
    {
      title: "学到的内容",
      dataIndex: "learn",
      key: "learn"
    },
    {
      title: "没看懂的内容",
      dataIndex: "unknown",
      key: "unknown"
    }
  ];

  return (
    <>
      <Table dataSource={data?.daily.month[month]} columns={columns} pagination={{ pageSize: 31 }}></Table>
    </>
  )
}