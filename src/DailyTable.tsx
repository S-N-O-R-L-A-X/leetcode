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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '题号',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '题目名称',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: "难度",
    },
    {
      title: "rating"
    },
    {
      title: "做题情况"
    },
    {
      title: "算法和数据结构"

    },
    {
      title: "学到的内容"

    },
    {
      title: "没看懂的内容"

    }
  ];

  return (
    <>
      <Table dataSource={data?.daily.month[month]} columns={columns}></Table>
      <ul>
        {data ? data.daily.month[0].map((v: any, k: any) => <li key={k}>{v["题号"]}</li>) : <p>no statistics</p>}
      </ul>

    </>
  )
}