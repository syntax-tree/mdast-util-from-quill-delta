import Delta from 'quill-delta'
import u from 'unist-builder'
import Op from 'quill-delta/dist/Op'
import {Root, Content, PhrasingContent, Heading, Image} from 'mdast'
import AttributeMap from 'quill-delta/dist/AttributeMap'

const quillInlineContent = ({insert, attributes}: Op): PhrasingContent => {
  let content: Content

  if (typeof insert === 'undefined') {
    throw new TypeError('unknown insert type')
  } else if (typeof insert === 'string') {
    content = u('text', insert)
  } else if ('image' in insert) {
    content = u('image', {url: (insert as {image: string}).image}) as Image
  } else {
    throw new TypeError('unknown insert type')
  }

  if (typeof attributes === 'undefined') {
    return content
  }

  if ('bold' in attributes) {
    content = u('strong', [content])
  }

  if ('italic' in attributes) {
    content = u('emphasis', [content])
  }

  if ('strike' in attributes) {
    content = u('delete', [content])
  }

  return content
}

const quillBlockContent = (delta: Delta): Content[] => {
  const blocks: Content[] = []
  delta.eachLine((line: Delta, attributes: AttributeMap) => {
    const innerText = line.ops.map(quillInlineContent)
    let block: Content = u('paragraph', innerText)

    if ('blockquote' in attributes) {
      block = u('blockquote', [block])
    }

    if ('header' in attributes) {
      block = u(
        'heading',
        {depth: attributes.header as 1},
        innerText
      ) as Heading
    }

    blocks.push(block)
  })

  return blocks
}

const quillDeltaToMdast = (delta: Delta): Root => {
  return u('root', quillBlockContent(delta))
}

export default quillDeltaToMdast
