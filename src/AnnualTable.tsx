import { Table } from 'antd';


export default function AnnualTable(props: { data: any[], pub?: boolean }) {
  const { data } = props;

  const columns: any[] = [
    {
      title: '',
      dataIndex: 'info',
      rowScope: 'row',
    },
    {
      title: '1月',
      dataIndex: '1月',
      key: '1',
    },
    {
      title: '2月',
      dataIndex: '2月',
      key: '2',
    },
    {
      title: '3月',
      dataIndex: '3月',
      key: '3',
    },
    {
      title: '4月',
      dataIndex: '4月',
      key: '4',
    },
    {
      title: '5月',
      dataIndex: '5月',
      key: '5',
    },
    {
      title: '6月',
      dataIndex: '6月',
      key: '6',
    },
    {
      title: '7月',
      dataIndex: '7月',
      key: '7',
    },
    {
      title: '8月',
      dataIndex: '8月',
      key: '8',
    },
    {
      title: '9月',
      dataIndex: '9月',
      key: '9',
    },
    {
      title: '10月',
      dataIndex: '10月',
      key: '10',
    },
    {
      title: '11月',
      dataIndex: '11月',
      key: '11',
    },
    {
      title: '12月',
      dataIndex: '12月',
      key: '12',
    },
  ];

  // rotate version

  // const columns = [
  //   {
  //     title: '月份',
  //     dataIndex: 'month',
  //     key: 'month',
  //   },
  //   {
  //     title: '困难',
  //     dataIndex: '困难',
  //     key: 'hard',
  //   },
  //   {
  //     title: '中等',
  //     dataIndex: '中等',
  //     key: 'medium',
  //   },
  //   {
  //     title: '简单',
  //     dataIndex: '简单',
  //     key: 'easy',
  //   },
  //   {
  //     title: '自己做出',
  //     dataIndex: '自己做出',
  //     key: 'hard',
  //   },
  //   {
  //     title: '看思路写出',
  //     dataIndex: '看思路写出',
  //     key: 'hard',
  //   },
  //   {
  //     title: '看懂答案',
  //     dataIndex: '看懂答案',
  //     key: 'hard',
  //   },
  //   {
  //     title: '没看懂答案',
  //     dataIndex: '没看懂答案',
  //     key: 'hard',
  //   },
  // ]
  return (
    <>
      <Table rowKey={record => record.info} dataSource={data} columns={columns}></Table>
    </>
  )
}