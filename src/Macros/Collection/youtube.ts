/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { parse } from 'url'
import { ensureDomainUrl } from '../../utils'
import { MarkdownFile } from '../../MarkdownFile'

/**
 * Embed youtube videos to your document
 */
export default function (mdFile: MarkdownFile) {
  mdFile.macro('youtube', (node, file, removeNode) => {
    /**
     * Ensure macro doesn't have children
     */
    if (node.children.length) {
      file.report(
        '"youtube" macro is not a container macro. Use it as "::youtube{url=""}"',
        node.position
      )
      removeNode()
      return
    }

    /**
     * Validate url and its domain
     */
    const errorMessage = ensureDomainUrl(node.attributes.url, 'youtube', [
      'youtube.com/watch',
      'youtu.be',
    ])
    if (errorMessage) {
      file.report(errorMessage, node.position)
      removeNode()
      return
    }

    const parsedUrl = parse(node.attributes.url!, false)

    /**
     * Attempt to pull video id from the url
     */
    let videoId: string | null = null
    if (parsedUrl.hostname === 'youtu.be') {
      videoId = (parsedUrl.pathname || '').replace(/^\//, '')
    } else {
      const matchedTokens = /v=(\w+)/.exec(parsedUrl.query || '')
      videoId = matchedTokens ? matchedTokens[1] : ''
    }

    /**
     * Ensure video id exists
     */
    if (!videoId) {
      file.report('Invalid youtube url. Copy the url from the address bar', node.position)
      removeNode()
      return
    }

    /**
     * Mutate the node
     */
    node.data = node.data || {}
    node.data.hname = 'div'
    node.data.hProperties = {
      className: ['embed', 'embed-youtube'],
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
          src: `https://www.youtube.com/embed/${videoId}`,
          width: node.attributes.width || '100%',
          height: node.attributes.height || '400',
          frameborder: 'none',
          allow: 'autoplay; encrypted-media',
          allowfullscreen: 'true',
        },
        children: [],
      },
    ]
  })
}
