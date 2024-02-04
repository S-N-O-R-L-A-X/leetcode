import fs from "fs/promises";

const year = new Date().getFullYear(), month = new Date().getMonth();

fetch("https://leetcode.cn/graphql/", {
	method: "post",
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		"query": "\n    query dailyQuestionRecords($year: Int!, $month: Int!) {\n  dailyQuestionRecords(year: $year, month: $month) {\n    date\n    userStatus\n    question {\n      questionFrontendId\n      title\n      titleSlug\n      translatedTitle\n    }\n  }\n}\n    ",
		"variables": {
			"year": year,
			"month": month + 1
		},
		"operationName": "dailyQuestionRecords"
	}),
	credentials: "include",
})
	.then((res) => {
		res.json().then((rb) => {
			const questions = rb.data.dailyQuestionRecords;
			fs.readFile(`./src/assets/${year}.json`, 'utf8').then(buf => {
				const data=JSON.parse(buf)
				if (data.daily.month.length<=month){
					data.daily.month.push([]);
				}
				while(data.daily.month[month].length<questions.length){
					const {date,question}=questions[data.daily.month[month].length-1];
					const {frontendQuestionId,difficulty,titleCn,titleSlug,acRate}=question;
					const record={
						date,
						no:frontendQuestionId,
						name:titleCn,
						slug:titleSlug,
						difficulty,
						rating,
						method,
						learn,
						unknown,
						acRate
					}
					data.daily.month[month].push(record);
				}

				fs.writeFile(`./src/assets/${year}.json`, JSON.stringify(data, null, 2));

			}).catch(error => {
					console.error(error);
				});

		})
	});

