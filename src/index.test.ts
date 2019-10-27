import test from 'ava'
import Delta from 'quill-delta'
import deltaToMdast from '.'

test('can pass a delta', t => {
  const delta = new Delta()
  t.deepEqual(deltaToMdast(delta), {type: 'root'})
})
