/*
 * @dimerapp/markdown
 *
 * (c) DimerApp
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { parse } from 'node:url'
import { stringify } from 'node:querystring'
import { MarkdownFile } from '../markdown_file.js'
import { ensureDomainUrl, ObjectBuilder } from '../utils.js'

/**
 * Embed codesandbox to your document
 */
export function codesandbox(mdFile: MarkdownFile) {
  mdFile.macro('codesandbox', (node, file, removeNode) => {
    /**
     * Ensure macro doesn't have children
     */
    if (node.children.length) {
      file.report(
        '"codesandbox" macro is not a container macro. Use it as "::codesandbox{url=""}"',
        node.position
      )
      removeNode()
      return
    }

    /**
     * Validate url and its domain
     */
    const errorMessage = ensureDomainUrl(node.attributes.url, 'codesandbox', ['codesandbox.io'])
    if (errorMessage) {
      file.report(errorMessage, node.position)
      removeNode?.()
      return
    }

    const qs = new ObjectBuilder()

    /**
     * These are all the possible props accepted by codesandbox.
     * Ref: https://codesandbox.io/docs/embedding#embed-options
     */
    qs.add('autoresize', node.attributes.autoresize)
    qs.add('codemirror', node.attributes.codemirror)
    qs.add('editorsize', node.attributes.editorsize)
    qs.add('eslint', node.attributes.eslint)
    qs.add('expanddevtools', node.attributes.expanddevtools)
    qs.add('hidedevtools', node.attributes.hidedevtools)
    qs.add('fontsize', node.attributes.fontsize)
    qs.add('forcerefresh', node.attributes.forcerefresh)
    qs.add('hidenavigation', node.attributes.hidenavigation)
    qs.add('highlights', node.attributes.highlights)
    qs.add('initialpath', node.attributes.initialpath)
    qs.add('module', node.attributes.module)
    qs.add('moduleview', node.attributes.moduleview)
    qs.add('previewwindow', node.attributes.previewwindow)
    qs.add('runonclick', node.attributes.runonclick)
    qs.add('view', node.attributes.view)
    qs.add('theme', node.attributes.theme)

    /**
     * Build the final embed url
     */
    const parsedUrl = parse(node.attributes.url, false)
    const query = stringify(qs.toJSON())
    const embedUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.pathname?.replace(
      '/s/',
      '/embed/'
    )}${query ? `?${query}` : ''}`

    /**
     * Mutate the node
     */
    node.data = node.data || {}
    node.data.hName = 'div'
    node.data.hProperties = {
      className: ['embed', 'embed-codesandbox'],
    }

    /**
     * Add children. The node name and the attributes will be converted
     * to hast automatically. So no need to define them here
     */
    node.children = [
      {
        type: 'containerDirective',
        name: 'iframe',
        attributes: {
          src: embedUrl,
          style: `width:${node.attributes.width || '100%'}; height:${
            node.attributes.height || '500px'
          }; border:0; border-radius: 4px; overflow:hidden;`,
          allow:
            'accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking',
          sandbox:
            'allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts',
        },
        children: [],
      },
    ]
  })
}
