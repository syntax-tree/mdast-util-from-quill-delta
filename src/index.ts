import Delta from 'quill-delta'
import u from 'unist-builder'
import Op from 'quill-delta/dist/Op'
import {Root, Content, PhrasingContent} from 'mdast'
import AttributeMap from 'quill-delta/dist/AttributeMap'

const quillInlineContent = ({insert, attributes}: Op): PhrasingContent => {
  if (typeof insert === 'string') {
    let content: Content = u('text', insert)

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

  throw new TypeError('unable to process operation')
}

const quillBlockContent = (delta: Delta): Content[] => {
  const blocks: Content[] = []
  delta.eachLine((line: Delta, attributes: AttributeMap) => {
    let block: Content = u('paragraph', line.ops.map(quillInlineContent))

    if ('blockquote' in attributes) {
      block = u('blockquote', [block])
    }

    blocks.push(block)
  })

  return blocks
}

const quillDeltaToMdast = (delta: Delta): Root => {
  return u('root', quillBlockContent(delta))
}

export = quillDeltaToMdast
