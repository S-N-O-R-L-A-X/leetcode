import { InputNumber } from 'antd';
import { useState } from 'react';
import './App.css'
import DailyTable from './DailyTable'
function App() {
  const now_month = new Date().getMonth() + 1;
  const now_year = new Date().getFullYear();
  const [year, setYear] = useState<number | null>(now_year);
  const [month, setMonth] = useState<number | null>(now_month);

  const changeMonth = (value: number | null) => {
    setMonth(value);
  };

  const changeYear = (value: number | null) => {
    setYear(value);
  };

  return (
    <div className="App">
      <InputNumber min={2021} max={2023} defaultValue={now_year} onChange={changeYear}></InputNumber>
      <InputNumber min={1} max={12} defaultValue={now_month} onChange={changeMonth}></InputNumber>
      <DailyTable year={year} month={month} />
    </div>
  )
}

export default App
