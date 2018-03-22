let macroRegex = /^\[(\w+)(.*)\]\n/
  const { blockMethods, blockTokenizers } = this.Parser.prototype
  blockMethods.splice(blockMethods.indexOf('paragraph'), 0, 'macro')

  blockTokenizers.macro = function (eat, value, silent) {
    const isMacroStart = macroRegex.exec(value)
    if (!isMacroStart) {
      return
    }

    const blocks = []
    let isMacro = false
    const tokens = value.split('\n')

    while (tokens.length) {
      const token = tokens.shift()
      blocks.push(token)

      if (token.trim() === `[/${isMacroStart[1]}]`) {
        isMacro = true
        break
      }
    }

    if (!isMacro) {
      return
    }

    const opened = eat.now()
    console.log(opened)
    const childrens = blocks
      .filter((block, index) => index !== 0 && index !== blocks.length - 1)
      .join('\n')

    eat(blocks.join('\n'))({
      type: 'div',
      children: this.tokenizeBlock(childrens, eat.now()),
      data: {
          hName: 'div',
          hProperties: {
            className: ['alert']
          }
      }
    })
  }
