;(function() {
  let data = {
    first: 0,
    second: 0,
    firstValue: 0,
    secondValue: 0,
    baseValue: 0,
    symbols: [0, 0, 0, 0],
    useTime: ''
  }
  // ================================================================
  new Vue({
    el: '#app',
    data: data,

    methods: {
      imageSrc(value) {
        return `./image/symbol${value}.png`
      },
      getWord(symbol) {
        let word = ''
        if (symbol !== 0) {
          word = symbolName[symbol] + elements[symbolElement[symbol]]
        }
        return word
      },
      elementsResult(symbol) {
        let result = ''
        if (symbol !== 0) {
          result = getElementsResult(
            this.baseValue,
            symbol,
            this.firstValue,
            this.secondValue
          )
        }
        return result
      },
      calculation() {
        if (validateInput(this.first) || validateInput(this.second)) {
          alert('請輸入正數')
          return
        }
        let date = new Date()
        let hour = Math.floor(((date.getHours() + 1) % 24) / 2)
        let result = getSymbolResult(this.first, this.second, hour)
        if (result) {
          this.useTime = `計算時間:${date.getHours()}點${date.getMinutes()}分`
          this.firstValue = result.firstValue
          this.secondValue = result.secondValue
          this.baseValue = result.baseValue
          this.symbols = result.value
        } else {
          alert('計算失敗，請重新計算')
        }
      }
    }
  })
})()
