import test from 'ava'
import Delta from 'quill-delta'
import u from 'unist-builder'
import {Heading} from 'mdast'
import deltaToMdast from '.'

test('should handle empty delta', t => {
  const delta = new Delta([])
  t.deepEqual(deltaToMdast(delta), u('root', []))
})

test('should handle plain test', t => {
  const delta = new Delta([{insert: 'plain text'}])
  t.deepEqual(
    deltaToMdast(delta),
    u('root', [u('paragraph', [u('text', 'plain text')])])
  )
})

test('should handle bold', t => {
  const delta = new Delta([{insert: 'bolded', attributes: {bold: true}}])
  t.deepEqual(
    deltaToMdast(delta),
    u('root', [u('paragraph', [u('strong', [u('text', 'bolded')])])])
  )
})

test('should handle italic', t => {
  const delta = new Delta([{insert: 'italicized', attributes: {italic: true}}])
  t.deepEqual(
    deltaToMdast(delta),
    u('root', [u('paragraph', [u('emphasis', [u('text', 'italicized')])])])
  )
})

test('should handle strike through', t => {
  const delta = new Delta([
    {insert: 'strike through', attributes: {strike: true}}
  ])
  t.deepEqual(
    deltaToMdast(delta),
    u('root', [u('paragraph', [u('delete', [u('text', 'strike through')])])])
  )
})

test('should handle block quotes', t => {
  const delta = new Delta([
    {insert: 'test'},
    {insert: '\n', attributes: {blockquote: true}},
    {insert: 'test'},
    {insert: '\n', attributes: {blockquote: true}}
  ])
  t.deepEqual(
    deltaToMdast(delta),
    u('root', [
      u('blockquote', [u('paragraph', [u('text', 'test')])]),
      u('blockquote', [u('paragraph', [u('text', 'test')])])
    ])
  )
})

test('should handle headers', t => {
  const delta = new Delta([
    {insert: 'header 1'},
    {insert: '\n', attributes: {header: 1}},
    {insert: 'header 2'},
    {insert: '\n', attributes: {header: 2}}
  ])
  t.deepEqual(
    deltaToMdast(delta),
    u('root', [
      u('heading', {depth: 1}, [u('text', 'header 1')]) as Heading,
      u('heading', {depth: 2}, [u('text', 'header 2')]) as Heading
    ])
  )
})

test('should not handle custom content types, yet', t => {
  const delta = new Delta([
    {insert: {image: 'https://quilljs.com/assets/images/icon.png'}}
  ])
  t.throws(() => deltaToMdast(delta))
})
