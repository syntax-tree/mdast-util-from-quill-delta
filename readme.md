# mdast-util-from-quill-delta

[![GitHub CI](https://github.com/syntax-tree/mdast-util-from-quill-delta/workflows/CI/badge.svg)](https://github.com/syntax-tree/mdast-util-from-quill-delta/actions?workflow=CI)
[![Downloads](https://img.shields.io/npm/dm/mdast-util-from-quill-delta.svg)](https://www.npmjs.com/package/mdast-util-from-quill-delta)
[![Size](https://img.shields.io/bundlephobia/minzip/mdast-util-from-quill-delta.svg)](https://bundlephobia.com/result?p=mdast-util-from-quill-delta)
[![Sponsors](https://opencollective.com/unified/sponsors/badge.svg)](https://opencollective.com/unified)
[![Backers](https://opencollective.com/unified/backers/badge.svg)](https://opencollective.com/unified)
[![Chat](https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg)](https://spectrum.chat/unified/syntax-tree)

> utility to transform [Quill delta](https://github.com/quilljs/delta) to [mdast](https://github.com/syntax-tree/mdast)

## Install

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install mdast-util-from-quill-delta
```

## Usage

### With Quill delta

```typescript
import Delta from 'quill-delta'
import mdastFromDelta from 'mdast-util-from-quill-delta'

const delta = new Delta([{insert: 'plain text'}])

const mdast = mdastFromDelta(delta)

console.log(JSON.stringify(mdast, null, 2))
```

outputs

```json
{
  "type": "root",
  "children": [
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "plain text"
        }
      ]
    }
  ]
}
```

### With Quill content

```typescript
// TODO
```

### With Quill streaming content

```typescript
// TODO
```

## Supported Quill Content Types

*   [x] blockquote
*   [x] bold
*   [x] header
*   [x] image
*   [x] italic
*   [x] strike

## Related

*   [`quill`](https://github.com/quilljs/quill) — What you see is what you get
    (WYSIWYG) content editor
*   [`quill-delta`](https://github.com/quilljs/delta) — Utilities and typings
    for Quill deltas
*   [`mdast`](https://github.com/syntax-tree/mdast) — Markdown abstract syntax
    tree (MDAST) documentation
*   [`remark`](https://github.com/remarkjs/remark) — Ecosystem for transforming
    markdown content (MDAST)
*   [`unist-builder`](https://github.com/syntax-tree/unist-builder) — utility
    for creating syntax trees

## Contribute

See [`contributing.md` in `syntax-tree/.github`](https://github.com/syntax-tree/.github/blob/master/contributing.md)
for ways to get started.
See [`support.md`](https://github.com/syntax-tree/.github/blob/master/support.md)
for ways to get help.

This project has a [Code of Conduct](https://github.com/syntax-tree/.github/blob/master/code-of-conduct.md).
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT](license) © [Christian Murphy](https://github.com/ChristianMurphy)
