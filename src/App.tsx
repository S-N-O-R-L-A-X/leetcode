import { Button, InputNumber, Switch } from 'antd';
import { useState } from 'react';
import AnnualReport from './AnnualReport';
import './App.css'
import DailyGraph from './DailyGraph';
import DailyTable from './DailyTable'
import DifficultyGraph from './DifficultyGraph';
import Header from './Header';

function App() {
  const now_month = new Date().getMonth() + 1;
  const now_year = new Date().getFullYear();
  const [year, setYear] = useState<number | null>(now_year);
  const [month, setMonth] = useState<number | null>(now_month);
  const [content, setContent] = useState<boolean>(true)

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
      <Header />
      <fieldset>
        <InputNumber className="input-number" size="small" min={2021} max={2023} defaultValue={now_year} onChange={changeYear}></InputNumber>
        <span className="input-text">年</span>
        <InputNumber className="input-number" size="small" min={1} max={12} defaultValue={now_month} onChange={changeMonth}></InputNumber>
        <span className="input-text">月</span>
        <br />

        <Switch checkedChildren="查看每月报告" unCheckedChildren="查看年度报告" defaultChecked onChange={handleChange} />

      </fieldset>
      {
        content ?
          (
            <>
              <DailyTable year={year} month={month} />
              <div>
                <div className="show-graph">
                  <DailyGraph year={year} month={month} />
                </div>
                <div className="show-graph">
                  <DifficultyGraph year={year} month={month} />
                </div>
              </div>
            </>
          ) :
          (
            <>
              <AnnualReport />
            </>
          )
      }

    </div>
  )
}

export default App
