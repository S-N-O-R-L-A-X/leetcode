export interface DailyProps {
  year?: number | null;
  month?: number | null;
}

export type Question = {
  "日期": string;
  "题号": number | string;
  "slug"?: string;
  "题目名称": string;
  "难度": "简单" | "中等" | "困难",
  "rating": number,
  "做题情况": "自己做出" | "看思路写出" | "看懂答案" | "没看懂答案",
  "算法和数据结构": string | string[],
  "学到的内容": string | string[],
  "没看懂的内容": string | string[]
}