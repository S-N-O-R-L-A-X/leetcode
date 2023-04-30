import { Suspense } from 'react';
interface DailyTableProps {
  year?: number;
  month?: number;
}

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

export default function DailyTable(props: DailyTableProps) {
  const { year = 2023, month = 0 } = props;
  const data = getData(year).read();
  return (
    <Suspense fallback={<p>loading</p>}>
      {data.daily.length > 0 &&
        <ul>
          {data.daily.month[0].map((v: any, k: any) => <li key={k}>{v}</li>)}
        </ul>
      }

    </Suspense>
  )
}