/*
* markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const { parseThematicBlock } = require('../utils/index')

module.exports = function (macro) {
  macro.addMacro('codegroup', function (content, props, { transformer, eat }) {
    const contentNodes = transformer.tokenizeBlock(content, eat.now())

    if (!contentNodes.length) {
      return
    }

    /**
     * Tab nav block contains the actual navbar for
     * creating tabs. It will be
     * <div class="tab-head">
     *  <ul>
     *  <ul>
     * </div>
     */
    const tabNavNode = {
      type: 'TabNavWrapperNode',
      data: {
        hName: 'div',
        hProperties: {
          className: 'tab-head'
        }
      },
      children: [
        {
          type: 'TabNavNode',
          data: {
            hName: 'ul'
          },
          children: []
        }
      ]
    }

    /**
     * The tab body node contains the list of
     * codeblocks and their related content.
     * It will be
     *
     * <div class="tab-body">
     * </div>
     */
    const tabBodyNode = {
      type: 'TabBodyNode',
      data: {
        hName: 'div',
        hProperties: {
          className: 'tab-body'
        }
      },
      children: []
    }

    /**
     * Single tab node is a single item inside the
     * tab body. One item is shown at a time.
     * It will be
     *
     * <div class="tab-item">
     * </div>
     */
    const tabItemNode = () => {
      return {
        type: 'TabItemNode',
        data: {
          hName: 'div',
          hProperties: {
            className: 'tab-item'
          }
        },
        children: []
      }
    }

    /**
     * We start off with an empty tab. It's possible
     * that we never gonna hit a codeblock and
     * hence no li will be generated in that
     * case.
     *
     * So that will be a softly invalid node.
     */
    let recentNavItem = tabItemNode()
    tabBodyNode.children.push(recentNavItem)

    contentNodes.forEach((node, index) => {
      recentNavItem.children.push(node)

      if (node.type === 'code') {
        /**
         * Get lang and fileName from the code language. Chances
         * are both will be null.
         */
        const { fileName } = parseThematicBlock(node.lang)

        /**
         * When lang and fileName both are null, then only option is
         * to make use of `Tab <index>` string
         */
        const tabTitle = fileName || `Tab ${tabBodyNode.children.length}`
        const slug = `tab-${tabBodyNode.children.length}`

        /**
         * Here we push a list item to the tab navigation ul. Which is
         * a nested child of a tab-head div.
         */
        tabNavNode.children[0].children.push({
          type: 'listItem',
          data: {
            hName: 'li',
            hProperties: {
              dataTitle: slug
            }
          },
          children: [{ type: 'text', value: tabTitle }]
        })

        /**
         * We set the id of the tab item, so that we can
         * toggle between em.
         */
        recentNavItem.data.hProperties.id = slug

        /**
         * Push one tab item to the tab body if we have more
         * content to go.
         */
        if (contentNodes.length !== index + 1) {
          recentNavItem = tabItemNode()
          tabBodyNode.children.push(recentNavItem)
        }
      }
    })

    return {
      type: 'TabNode',
      data: {
        hName: 'div',
        hProperties: {
          className: 'tabs'
        }
      },
      children: [tabNavNode, tabBodyNode]
    }
  })
}
