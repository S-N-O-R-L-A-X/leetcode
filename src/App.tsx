import { InputNumber, Switch } from 'antd';
import { useState } from 'react';
import AnnualReport from './AnnualReport';
import './App.css'
import Header from './Header';
import MonthlyReport from './MonthlyReport';

function App() {
  const [pub, setPub] = useState<boolean>(false);
  const today = new Date()
  const now_month = today.getMonth() + 1;
  const now_year = today.getFullYear();
  const [year, setYear] = useState<number | null>(now_year);
  const [month, setMonth] = useState<number | null>(now_month);
  const [content, setContent] = useState<boolean>(true)

  const changePub = () => {
    setPub(!pub);
  };

  const changeMonth = (value: number | null) => {
    setMonth(value);
  };

  const changeYear = (value: number | null) => {
    setYear(value);
  };

  const handleChange = (checked: boolean) => {
    setContent(checked);
  }

  return (
    <div className="App">
      <Header changePub={changePub} />

      <fieldset>
        <InputNumber className="input-number" size="small" min={2022} max={now_year} defaultValue={now_year} onChange={changeYear}></InputNumber>
        <span className="input-text">年</span>
        <InputNumber className="input-number" size="small" min={1} max={12} defaultValue={now_month} onChange={changeMonth}></InputNumber>
        <span className="input-text">月</span>
        <br />

        <Switch checkedChildren="查看每月报告" unCheckedChildren="查看年度报告" defaultChecked onChange={handleChange} />
      </fieldset>
      {content ? <MonthlyReport pub={pub} year={year} month={month} /> : <AnnualReport pub={pub} year={year} />}

    </div>
  )
}

export default App
