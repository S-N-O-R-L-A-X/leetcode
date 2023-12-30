import { DailyProps } from './constants';
import data2023 from "./assets/2023.json";
import data2022 from "./assets/2022.json";
import PieGraph from './components/PieGraph';
import AnnualTable from './AnnualTable';
import LineChart from './components/LineChart';

export default function AnnualReport(props: DailyProps) {
  const { year = 2023, pub } = props;
  let jsonData = null;
  switch (year) {
    case 2023: jsonData = data2023; break;
    case 2022: jsonData = data2022; break;
    default: break;
  }

  const month_rates: any[] = [];
  const month_difficulties: any[] = [];
  const month_situations: any[] = [];
  const year_difficulty = [{ type: "困难", value: 0 }, { type: "中等", value: 0 }, { type: "简单", value: 0 }];
  const year_situation = [{ type: "自己做出", value: 0 }, { type: "看思路写出", value: 0 }, { type: "看懂答案", value: 0 }, { type: "没看懂答案", value: 0 }];
  let annual_info: any[] = [{ "info": "困难", }, { "info": "中等", }, { "info": "简单", }];
  const annual_situation: any[] = [{ "info": "自己做出" }, { "info": "看思路写出" }, { "info": "看懂答案" }, { "info": "没看懂答案" }];
  let self_min = { rate: 4000, date: "", name: "" }, self_max = { rate: 0, date: "", name: "" }; // cannot do
  let min = { rate: 4000, date: "", name: "", slug: "" }, max = { rate: 0, date: "", name: "", slug: "" };

  jsonData?.daily.month.forEach((m, idx) => {
    const difficulty = [{ type: "困难", month: `${idx + 1}月`, value: 0 }, { type: "中等", month: `${idx + 1}月`, value: 0 }, { type: "简单", month: `${idx + 1}月`, value: 0 }];
    const situation = [{ type: "自己做出", month: `${idx + 1}月`, value: 0 }, { type: "看思路写出", month: `${idx + 1}月`, value: 0 }, { type: "看懂答案", month: `${idx + 1}月`, value: 0 }, { type: "没看懂答案", month: `${idx + 1}月`, value: 0 }];
    annual_info.forEach((mon) => {
      mon[`${idx + 1}月`] = 0;
    });
    annual_situation.forEach((mon) => {
      mon[`${idx + 1}月`] = 0;
    });
    const month_rate = { type: "rate", month: `${idx + 1}月`, value: 0 };
    let rate = 0, effective_date = 0;
    m.forEach((d) => {
      // @ts-ignore
      if (d.rating) {
        // @ts-ignore
        const { rating } = d;
        ++effective_date;
        rate += rating;

        if (d.situation !== "自己做出") {
          if (self_min.rate > rating) {
            self_min.name = d.name;
            self_min.rate = rating;
            self_min.date = d.date;
          }

          if (self_max.rate < rating) {
            self_max.name = d.name;
            self_max.rate = rating;
            self_max.date = d.date;
          }
        }

        if (min.rate > rating) {
          min.name = d.name;
          min.rate = rating;
          min.date = d.date;
          // @ts-ignore
          min.slug = d.slug;
        }

        if (max.rate < rating) {
          max.name = d.name;
          max.rate = rating;
          max.date = d.date;
          // @ts-ignore
          max.slug = d.slug;
        }
      }

      if (d.difficulty === "困难") {
        difficulty[0].value++;
        annual_info[0][`${idx + 1}月`]++;
      }
      else if (d.difficulty === "中等") {
        difficulty[1].value++;
        annual_info[1][`${idx + 1}月`]++;
      }
      else {
        difficulty[2].value++;
        annual_info[2][`${idx + 1}月`]++;
      }

      if (d.situation === "自己做出") {
        situation[0].value++;
        annual_situation[0][`${idx + 1}月`]++;
      }
      else if (d.situation === "看思路写出") {
        situation[1].value++;
        annual_situation[1][`${idx + 1}月`]++;
      }
      else if (d.situation === "看懂答案") {
        situation[2].value++;
        annual_situation[2][`${idx + 1}月`]++;
      }
      else {
        situation[3].value++;
        annual_situation[3][`${idx + 1}月`]++;
      }
    })
    month_difficulties.push(...difficulty);
    month_situations.push(...situation);

    if (effective_date > 0) {
      month_rate.value = rate / effective_date;
      month_rates.push(month_rate);
    }

    year_difficulty[0].value += difficulty[0].value;
    year_difficulty[1].value += difficulty[1].value;
    year_difficulty[2].value += difficulty[2].value;
    year_situation[0].value += situation[0].value;
    year_situation[1].value += situation[1].value;
    year_situation[2].value += situation[2].value;
    year_situation[3].value += situation[3].value;
  })

  if (pub) {
    annual_info = annual_info.concat(annual_situation);
  }

  return (
    <>
      <AnnualTable data={annual_info} pub={pub} />
      <div>
        {month_rates.length > 0 && (
          <>
            <LineChart data={month_rates} color={["gold"]} />
            <p>{year}年最难的题是{max.date}的 <a href={"https://leetcode.cn/problems/" + max.slug} target={"_blank"}> {max.name}</a> ，rate高达{max.rate}</p>
            <p>{year}年最简单的题是{min.date}的 <a href={"https://leetcode.cn/problems/" + min.slug} target={"_blank"}> {min.name}</a>，rate只有{min.rate}</p>
          </>
        )}
        <LineChart data={month_difficulties} color={['#fb259d', '#fabc1d', '#1fb09b']} />
        {pub && <LineChart data={month_situations} color={['green', 'blue', 'yellow', 'red']} />}
      </div>
      <div>
        {
          pub && (
            <div className="show-graph">
              <PieGraph data={year_situation} />
            </div>
          )
        }
        <div className="show-graph">
          <PieGraph data={year_difficulty} />
        </div>
      </div>
    </>
  );
}