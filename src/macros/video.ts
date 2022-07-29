/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ObjectBuilder } from '../utils.js'
import { MarkdownFile } from '../markdown_file.js'

/**
 * Allows adding videos to the document
 */
export function video(mdFile: MarkdownFile) {
  mdFile.macro('video', (node, file, removeNode) => {
    /**
     * Ensure macro doesn't have children
     */
    if (node.children.length) {
      file.report(
        '"video" macro is not a container macro. Use it as "::video{url=""}"',
        node.position
      )
      removeNode()
      return
    }

    /**
     * Ensure url is defined
     */
    if (!node.attributes.url) {
      file.report('"video" macro needs a url prop to be functional', node.position)
      removeNode()
      return
    }

    /**
     * Mutate the node
     */
    node.data = node.data || {}
    node.data.hName = 'div'
    node.data.hProperties = {
      className: ['embed', 'embed-video'],
    }

    /**
     * We support only the following props. The actual video
     * element accepts a lot more, but we want to keep it
     * simple
     */
    const props = new ObjectBuilder()
    props.add('autoplay', node.attributes.autoplay)
    props.add('controls', node.attributes.controls)
    props.add('loop', node.attributes.loop)
    props.add('preload', node.attributes.preload)
    props.add('poster', node.attributes.poster)

    /**
     * Add children. The node name and the attributes will be converted
     * to hast automatically. So no need to define them here
     */
    node.children = [
      {
        type: 'containerDirective',
        name: 'video',
        attributes: props.toJSON(),
        data: {
          /**
           * Telling the macros engine to self process this node and not again
           * forward it to the macro handler, coz the `name = video`, which
           * matches the macro name.
           */
          isMacro: false,
        },
        children: [
          {
            type: 'containerDirective',
            name: 'source',
            attributes: {
              src: node.attributes.url,
              type: 'video/mp4',
            },
            children: [],
          },
        ],
      },
    ]
  })
}
