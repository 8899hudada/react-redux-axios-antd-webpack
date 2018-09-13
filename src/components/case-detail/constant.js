const fileProperties = {
  ACCEPTED_NOTICE: 1, // 受理通知书
  FIRST_INSTANCE_CITATION: 2, // 一审传票
  ANNOUNCEMENT: 3, // 公告
  FIRST_INSTANCE_JUDGEMENT: 4, // 一审判决书
  SECOND_INSTANCE_CITATION: 5, // 二审传票
  SECOND_INSTANCE_JUDGEMENT: 6, // 二审判决书
  EXECUTE_CASE_NOTIFICATION: 7, // 执行案件受理通知书
  FINAL_WRITTEN_VERDICT: 8, // 终本裁定书
  MEDIATION_AGREEMENT: 9 // 调解书/结案文书
}

const FILE_PROPERTIES = [
  { label: '受理通知书', value: 1 },
  { label: '一审传票', value: 2 },
  { label: '公告', value: 3 },
  { label: '一审判决书', value: 4 },
  { label: '二审传票', value: 5 },
  { label: '二审判决书', value: 6 },
  { label: '执行案件受理通知书', value: 7 },
  { label: '终本裁定书', value: 8 },
  { label: '调解书/结案文书', value: 9 }
]

export {
  fileProperties,
  FILE_PROPERTIES
}