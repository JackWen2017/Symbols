;(function() {
  let data = {
    first: 0,
    second: 0,
    nowTime: new Date(),
    timer: null,
    timeIndex: -1
  }
  // ================================================================
  new Vue({
    el: '#app',
    data: data,
    mounted() {
      this.timer = setInterval(() => (this.nowTime = new Date()), 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    computed: {
      useTime() {
        this.checkTimeChange
        return `計算時間:${this.nowTime.getHours()}點${this.nowTime.getMinutes()}分`
      },
      canChange() {
        return (
          this.first !== '' &&
          this.second !== '' &&
          this.first !== 0 &&
          this.second !== 0
        )
      },
      firstValue() {
        let result = 0
        if (this.canChange) {
          result = this.changeInput(this.first)
        }
        return result
      },
      secondValue() {
        let result = 0
        if (this.canChange) {
          result = this.changeInput(this.second)
        }
        return result
      },
      hourIndex() {
        return Math.floor(((this.nowTime.getHours() + 1) % 24) / 2)
      },
      checkTimeChange() {
        if (this.firstValue !== 0 && this.secondValue !== 0) {
          const hourIndex = this.hourIndex
          if (hourIndex !== this.timeIndex) {
            this.timeIndex = hourIndex
          }
        }
      },
      changeSymbolIndex() {
        let result = -1
        if (this.timeIndex > -1) {
          result = getChangeSymbolIndex(this.first, this.second, this.timeIndex)
        }
        return result
      },
      checkNoChange() {
        let noChange = true
        if (this.changeSymbolIndex > -1) {
          noChange = this.changeSymbolIndex < 3
        }
        return noChange
      },
      baseValue() {
        let result = 0
        if (
          this.changeSymbolIndex > -1 &&
          this.firstValue > 0 &&
          this.secondValue > 0
        ) {
          result = this.checkNoChange ? this.firstValue : this.secondValue
        }
        return result
      },
      symbols() {
        let result = [0, 0, 0, 0]
        if (this.baseValue > 0) {
          const one = this.checkNoChange ? this.secondValue : this.firstValue
          const firstArray = disassembleSymbols(this.firstValue)
          const secondArray = disassembleSymbols(this.secondValue)
          const two = calculateSymbolNumber(
            firstArray[2],
            secondArray[0],
            secondArray[1]
          )
          const three = calculateSymbolNumber(
            firstArray[1],
            firstArray[2],
            secondArray[0]
          )
          let four = getChangeSymbol(one, this.changeSymbolIndex)
          result = [one, two, three, four]
        }
        return result
      }
    },
    methods: {
      changeInput(inputValue) {
        let result = 0
        if (validateInput(inputValue)) {
          alert('請輸入正數')
        } else {
          result = ((inputValue - 1) % 8) + 1
        }
        return result
      },
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
      }
    }
  })
})()
