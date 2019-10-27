import test from 'ava'
import Delta from 'quill-delta'
import u from 'unist-builder'
import deltaToMdast from '.'

test('should handle empty delta', t => {
  const delta = new Delta([])
  t.deepEqual(deltaToMdast(delta), u('root', []))
})

test('should handle plain test', t => {
  const delta = new Delta([{insert: 'plain text'}])
  t.deepEqual(deltaToMdast(delta), u('root', [u('text', 'plain text')]))
})

test('should handle bold', t => {
  const delta = new Delta([{insert: 'bolded', attributes: {bold: true}}])
  t.deepEqual(
    deltaToMdast(delta),
    u('root', [u('strong', [u('text', 'bolded')])])
  )
})

test('should handle italic', t => {
  const delta = new Delta([{insert: 'italicized', attributes: {italic: true}}])
  t.deepEqual(
    deltaToMdast(delta),
    u('root', [u('emphasis', [u('text', 'italicized')])])
  )
})

test('should handle strike through', t => {
  const delta = new Delta([
    {insert: 'strike through', attributes: {strike: true}}
  ])
  t.deepEqual(
    deltaToMdast(delta),
    u('root', [u('delete', [u('text', 'strike through')])])
  )
})

test('should not handle custom content types, yet', t => {
  const delta = new Delta([
    {insert: {image: 'https://quilljs.com/assets/images/icon.png'}}
  ])
  t.throws(() => deltaToMdast(delta))
})
