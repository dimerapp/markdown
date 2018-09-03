/*
* markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

module.exports = function (macro) {
  macro.addMacro('collapse', function (content, props, { transformer, eat, badNode }) {
    if (!props.title) {
      return badNode('define collapse title', 'missing-collapse-title')
    }

    return {
      type: 'CollapaseNode',
      data: {
        hName: 'div',
        hProperties: {
          className: ['collapsible']
        }
      },
      children: [
        {
          type: 'CollpaseToogleNode',
          data: {
            hName: 'div',
            hProperties: {
              className: ['collapsible-toggle']
            }
          },
          children: [{
            type: 'text',
            value: props.title
          }]
        },
        {
          type: 'CollapaseBodyNode',
          data: {
            hName: 'div',
            hProperties: {
              className: ['collapsible-content']
            }
          },
          children: transformer.tokenizeBlock(content, eat.now())
        }
      ]
    }
  })
}
