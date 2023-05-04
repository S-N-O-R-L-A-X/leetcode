import { Table, Tag } from 'antd';

import { DailyProps } from "./constants";
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

import data2023 from "./assets/2023.json";
export default function DailyTable(props: DailyProps) {
  const { year = 2023, month = 1 } = props;
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
      sorter: (a: any, b: any) => Number(a.date.split("/")[2]) - Number(b.date.split("/")[2]),
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
      key: "difficulty",
      render: (difficulty: string) => (
        <>
          {difficulty === "困难" ? <Tag color="red">困难</Tag> : difficulty === "中等" ? <Tag color="yellow">中等</Tag> : <Tag color="green">简单</Tag>}
        </>)
    },
    {
      title: "rating",
      dataIndex: "rating",
      key: "rating",
      sorter: (a: any, b: any) => a.rating - b.rating,
    },
    {
      title: "做题情况",
      dataIndex: "situation",
      key: "situation",
      filters: [
        {
          text: "自己做出",
          value: "自己做出",
        },
        {
          text: "看思路写出",
          value: "看思路写出",
        },
        {
          text: "看懂答案",
          value: "看懂答案",
        },
        {
          text: "没看懂答案",
          value: "没看懂答案",
        },
      ],
      onFilter: (value: any, record: any) => record.situation.indexOf(value) === 0,
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
      <Table dataSource={data?.daily.month[month! - 1]} columns={columns} pagination={{ pageSize: 31 }}></Table>
    </>
  )
}