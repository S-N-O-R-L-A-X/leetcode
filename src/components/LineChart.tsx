import { Line } from '@ant-design/plots';
const LineChart = (props: { data: any[], color: string[] }) => {
  const { data, color } = props;
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
    color,
    responsive: true,
  };
  return <Line className='chart' {...config} />;
};
export default LineChart;