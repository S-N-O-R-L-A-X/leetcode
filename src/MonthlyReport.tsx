import { DailyProps } from "./constants";
import DailyTable from "./DailyTable";
import PieGraph from "./components/PieGraph";
import data2023 from "./assets/2023.json";
import data2022 from "./assets/2022.json";

export default function MonthlyReport(props: DailyProps) {
  const { year = 2023, month = 1, pub } = props;
  let jsonData = null;
  switch (year) {
    case 2023: jsonData = data2023; break;
    case 2022: jsonData = data2022; break;
    default: break;
  }
  const difficulty = [{ type: "困难", value: 0 }, { type: "中等", value: 0 }, { type: "简单", value: 0 }];
  const situation = [{ type: "自己做出", value: 0 }, { type: "看思路写出", value: 0 }, { type: "看懂答案", value: 0 }, { type: "没看懂答案", value: 0 }];

  jsonData?.daily.month[month! - 1].forEach((d) => {
    if (d.difficulty === "困难") {
      difficulty[0].value++;
    }
    else if (d.difficulty === "中等") {
      difficulty[1].value++;
    }
    else {
      difficulty[2].value++;
    }

    if (d.situation === "自己做出") {
      situation[0].value++;
    }
    else if (d.situation === "看思路写出") {
      situation[1].value++;
    }
    else if (d.situation === "看懂答案") {
      situation[2].value++;
    }
    else {
      situation[3].value++;
    }
  })


  return (
    <>
      <DailyTable year={year} month={month} pub={pub}/>
      <div>
        {
          pub &&
          (
            <div className="show-graph">
              <PieGraph data={situation} />
            </div>
          )
        }

        <div className="show-graph">
          <PieGraph data={difficulty} />
        </div>
      </div>
    </>
  )
}