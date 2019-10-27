import Delta from 'quill-delta'
import u from 'unist-builder'
import Op from 'quill-delta/dist/Op'
import {Root, Content} from 'mdast'

const quillAttributeMapping = ({insert, attributes}: Op): Content => {
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

const quillDeltaToMdast = (delta: Delta): Root => {
  return u('root', delta.ops.map(quillAttributeMapping))
}

export = quillDeltaToMdast
