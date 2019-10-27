import Delta from 'quill-delta'
import u from 'unist-builder'

export = (delta: Delta) => {
  console.log(delta)
  return u('root')
}
