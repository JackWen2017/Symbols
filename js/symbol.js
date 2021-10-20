const symbolName = ['', '乾', '兌', '離', '震', '巽', '坎', '艮', '坤']
const elements = ['木', '火', '土', '金', '水']
const symbolElement = [-1, 3, 3, 1, 0, 0, 4, 2, 2]

const validateInput = function(input) {
  return !/^\d+$/.test(input) || input === 0
}

// 拆解成三個符號
//[symbolTop,symbolMed,symbolBottom]
// 0 陽 1 陰
const disassembleSymbols = function(symbol) {
  const symbolIndex = symbol - 1
  const symbolTop = symbolIndex % 2
  const symbolMed = symbolIndex % 4 > 1 ? 1 : 0
  const symbolBottom = symbolIndex > 3 ? 1 : 0
  return [symbolTop, symbolMed, symbolBottom]
}

// 組合三個符號計算
const calculateSymbolNumber = function(top, med, bottom) {
  return bottom * 4 + med * 2 + top + 1
}

// 計算變換的位置
const getChangeSymbolIndex = function(no1, no2, hour) {
  return (no1 + no2 + Math.floor(((hour + 1) % 24) / 2)) % 6
}

// 進行爻變 1.拆解 2.變化 3.組合
const getChangeSymbol = function(symbol, changeIndex) {
  changeIndex = 2 - (changeIndex % 3)
  let symbols = disassembleSymbols(symbol)
  symbols[changeIndex] = (symbols[changeIndex] + 1) % 2
  return calculateSymbolNumber(symbols[0], symbols[1], symbols[2])
}

// 計算吉凶
const getElementsResult = function(baseElement, compElement) {
  const result = ['大吉', '大凶', '小吉', '小凶', '大吉']
  const resultIndex = (baseElement - compElement + 4) % 5
  return result[resultIndex]
}

// ================================================================
// 將三個值計算結果
const getSymbolResult = function(first, second, hour) {
  const changeSymbolIndex = getChangeSymbolIndex(first, second, hour)
  const noChange = changeSymbolIndex < 3

  const firstValue = ((first - 1) % 8) + 1
  const secondValue = ((second - 1) % 8) + 1
  const baseValue = noChange ? firstValue : secondValue
  const oneValue = noChange ? secondValue : firstValue
  // 將掛拆解重新組合
  const firstArray = disassembleSymbols(firstValue)
  const secondArray = disassembleSymbols(secondValue)
  const twoValue = calculateSymbolNumber(
    firstArray[2],
    secondArray[0],
    secondArray[1]
  )
  const threeValue = calculateSymbolNumber(
    firstArray[1],
    firstArray[2],
    secondArray[0]
  )
  let fourValue = getChangeSymbol(oneValue, changeSymbolIndex)

  return {
    firstValue,
    secondValue,
    baseValue,
    value: [oneValue, twoValue, threeValue, fourValue]
  }
}
