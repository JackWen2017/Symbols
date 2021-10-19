;(function() {
  let symbolName = ['', '乾', '兌', '離', '震', '巽', '坎', '艮', '坤']
  let elements = ['木', '火', '土', '金', '水']
  let symbolElement = [-1, 3, 3, 1, 0, 0, 4, 2, 2]
  let data = {
    first: 0,
    second: 0,
    symbols: [0, 0, 0, 0, 0, 0, 0],
    useTime: ''
  }

  let validateInput = function(input) {
    return !/^\d+$/.test(input) || input === 0
  }

  //[symbolTop,symbolMed,symbolBottom]
  // 0 陽 1 陰
  let calculateSymbol = function(symbol) {
    let symbolIndex = symbol - 1
    let symbolTop = symbolIndex % 2
    let symbolMed = symbolIndex % 4 > 1 ? 1 : 0
    let symbolBottom = symbolIndex > 3 ? 1 : 0
    return [symbolTop, symbolMed, symbolBottom]
  }

  let calculateSymbolNumber = function(top, med, bottom) {
    return bottom * 4 + med * 2 + top + 1
  }

  let getChangeSymbolIndex = function(no1, no2, hour) {
    let total =
      parseInt(no1) + parseInt(no2) + Math.floor(((hour + 1) % 24) / 2)
    return total % 6
  }

  let getChangeSymbol = function(symbol, changeIndex) {
    changeIndex = 2 - (changeIndex % 3)
    let symbols = calculateSymbol(symbol)
    symbols[changeIndex] = (symbols[changeIndex] + 1) % 2
    symbol = calculateSymbolNumber(symbols[0], symbols[1], symbols[2])
    return symbol
  }

  let getElementsResult = function(baseElement, compElement) {
    let result = ['大吉', '大凶', '小吉', '小凶', '大吉']
    let resultIndex =
      (symbolElement[baseElement] - symbolElement[compElement] + 4) % 5
    return result[resultIndex]
  }

  // ================================================================

  let getSymbolResult = function(first, second, hour) {
    let firstValue = ((first - 1) % 8) + 1
    let secondValue = ((second - 1) % 8) + 1
    let changeSymbolIndex = getChangeSymbolIndex(first, second, hour)
    console.log(first, second, hour, changeSymbolIndex)

    let noChange = changeSymbolIndex < 3
    let baseValue = noChange ? firstValue : secondValue
    let oneValue = noChange ? secondValue : firstValue
    let firstArray = calculateSymbol(firstValue)
    let secondArray = calculateSymbol(secondValue)
    let twoValue = calculateSymbolNumber(
      firstArray[2],
      secondArray[0],
      secondArray[1]
    )
    let threeValue = calculateSymbolNumber(
      firstArray[1],
      firstArray[2],
      secondArray[0]
    )
    let fourValue = getChangeSymbol(oneValue, changeSymbolIndex)
    return {
      value: [
        firstValue,
        secondValue,
        baseValue,
        oneValue,
        twoValue,
        threeValue,
        fourValue
      ]
    }
  }

  // ================================================================
  new Vue({
    el: '#app',
    data: data,

    methods: {
      imageSrc: function(i) {
        return this.changeImageSrc(this.symbols[i])
      },
      changeImageSrc: function(value) {
        return `./image/symbol${value}.png`
      },
      getWord: function(i) {
        let word = ''
        let symbol = this.symbols[i]
        if (symbol !== 0) {
          word = symbolName[symbol] + elements[symbolElement[symbol]]
        }
        return word
      },
      elementsResult: function(i) {
        let result = ''
        let symbol = this.symbols[i]
        if (symbol !== 0) {
          result = getElementsResult(this.symbols[2], symbol)
        }
        return result
      },
      calculation: function() {
        if (validateInput(this.first) || validateInput(this.second)) {
          alert('請輸入正數')
          return
        }
        let date = new Date()
        let hour = date.getHours()
        let result = getSymbolResult(this.first, this.second, hour)
        if (result) {
          this.useTime = `計算時間:${date.getHours()}點${date.getMinutes()}分`
          this.symbols = result.value
        } else {
          alert('計算失敗，請重新計算')
        }
      }
    }
  })
})()
