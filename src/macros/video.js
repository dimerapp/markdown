/*
* markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

function addBooleanFlag (key, value, out) {
  if (value !== undefined && value !== 'false') {
    out[key] = true
  }
}

module.exports = function (macro) {
  macro.addMacro('video', function (props, { badNode }) {
    /**
     * Validate url domain
     */
    if (!props.url) {
      return badNode('Missing video url', 'missing-video-url')
    }

    const videoProps = {
      poster: props.poster
    }

    addBooleanFlag('autoplay', props.autoplay, videoProps)
    addBooleanFlag('controls', props.controls, videoProps)
    addBooleanFlag('loop', props.loop, videoProps)
    addBooleanFlag('preload', props.preload, videoProps)

    return {
      type: 'EmbedNode',
      data: {
        hName: 'div',
        hProperties: {
          className: ['embed', 'video']
        }
      },
      children: [
        {
          type: 'VideoNode',
          data: {
            hName: 'video',
            hProperties: videoProps
          },
          children: [
            {
              type: 'SourceNode',
              data: {
                hName: 'source',
                hProperties: {
                  src: props.url,
                  type: 'video/mp4'
                }
              },
            }
          ]
        }
      ]
    }
  }, true)
}
