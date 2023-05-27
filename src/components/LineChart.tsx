import { Line } from '@ant-design/plots';
const LineChart = (props: { data: any[] }) => {
  const data = props.data;

  const config = {
    title: {
      visible: true,
      text: '多折线图',
    },
    description: {
      visible: true,
      text: '指定折线颜色',
    },
    padding: 'auto' as "auto",
    forceFit: true,
    data,
    xField: 'month',
    yField: 'value',
    legend: { position: 'right-top' } as any,
    seriesField: 'type',
    color: ['#fb259d', '#fabc1d', '#1fb09b'],
    responsive: true,
  };
  return <Line {...config} />;
};
export default LineChart;