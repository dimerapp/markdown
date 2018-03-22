function getProps (props) {
  return props.split(' ').reduce((result, prop) => {
    const [key, value] = prop.split('=')
    if (key) {
    result[key] = value
    }
    return result
  }, {})
}

function setMissingMacroNode ($, eat, macro) {
  eat($)({
    type: 'MissingMacroNode',
    data: {
      hName: 'div',
      hChildren: [
        {
          type: 'text',
          value: `${macro} macro was never closed`
        }
      ]
    }
  })
}
