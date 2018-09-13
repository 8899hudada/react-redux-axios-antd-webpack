const initDataFactory = () => ({
  caseInfo: {
    id: '',
    createTime: '',
    updateTime: '',
    createByName: '',
    caseProcess: "",
    customName: '',
    idCard: '',
    entrustAmt: '',
    principalBalance: '',
    accountNumber: '',
    accountType: '',
    trustorName: '',
    entrustDate: null,
    productName: '',
    proxyLawyer: '',
    proxyLawyerId: ''
  },
  registerCaseInfo: {
    id: '',
    lawCaseCode: '',
    acceptCourt: '',
    judgeName: '',
    judgePhone: '',
    judgeAssistName: '',
    judgeAssistPhone: '',
    registerTime: null,
    prosecutionAmount: '',
    legalCosts: '',
    lawyerFee: '',
    caseFee: '',
    attachments: []
  },
  firstInstanceInfo: {
    id: '',
    assetsKey: '',
    guardAssets: '',
    guardFee: '',
    guardAmount: '',
    sealUpOrder: '',
    openCourtTime: null,
    openCourtResult: '',
    isNotice: null,
    noticeFee: '',
    sealUpBeginDate: null,
    sealUpEndDate: null,
    attachments: [],
    judgePeriod: 1
  },
  secondInstanceInfo: {
    id: '',
    openCourtTime: null,
    openCourtResult: '',
    attachments: [],
    judgePeriod: 2
  },
  execInfo: {
    id: '',
    executeCaseCode: '',
    executeAcceptDate: null,
    executePrescription: '',
    executeEndDate: null,
    settleAccountDate: null,
    receivedPaymentAmount: '',
    remark: '',
    attachments: []
  },
  endCaseInfo: {
    id: '',
    closeCaseDate: null,
    attachments: []
  }
})

const initLocalMenuShowObjFactory = () => ({
  registerCaseInfo: false,
  firstInstanceInfo: false,
  secondInstanceInfo: false,
  execInfo: false,
  endCaseInfo: false
})

const formatData = (info, InfoKey) => {
  return info ? info : initDataFactory()[InfoKey]
}

export {
  initDataFactory,
  initLocalMenuShowObjFactory,
  formatData
}