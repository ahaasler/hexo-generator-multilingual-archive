# hexo-generator-multilingual-archive

[![Build Status](https://travis-ci.org/ahaasler/hexo-generator-multilingual-archive.svg?branch=master)](https://travis-ci.org/ahaasler/hexo-generator-multilingual-archive)
[![NPM version](https://badge.fury.io/js/hexo-generator-multilingual-archive.svg)](http://badge.fury.io/js/hexo-generator-multilingual-archive)
[![Coverage Status](https://img.shields.io/coveralls/ahaasler/hexo-generator-multilingual-archive.svg)](https://coveralls.io/r/ahaasler/hexo-generator-multilingual-archive?branch=master)

Multilingual archive generator for [Hexo].

## Installation

``` bash
$ npm install hexo-generator-multilingual-archive --save
```

## Options

``` yaml
archive_generator:
  per_page: 10
  yearly: true
  monthly: true
```

- **per_page**: Posts displayed per page. (0 = disable pagination)
- **yearly**: Generate yearly archive.
- **monthly**: Generate monthly archive.

## License

MIT

[Hexo]: http://hexo.io/