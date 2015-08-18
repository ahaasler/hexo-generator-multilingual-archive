# hexo-generator-multilingual-archive

[![Build Status](https://travis-ci.org/ahaasler/hexo-generator-multilingual-archive.svg?branch=master)](https://travis-ci.org/ahaasler/hexo-generator-multilingual-archive)
[![NPM version](https://badge.fury.io/js/hexo-generator-multilingual-archive.svg)](http://badge.fury.io/js/hexo-generator-multilingual-archive)
[![Coverage Status](https://coveralls.io/repos/ahaasler/hexo-generator-multilingual-archive/badge.svg?branch=master&service=github)](https://coveralls.io/github/ahaasler/hexo-generator-multilingual-archive?branch=master)
[![Dependency Status](https://gemnasium.com/ahaasler/hexo-generator-multilingual-archive.svg)](https://gemnasium.com/ahaasler/hexo-generator-multilingual-archive)
[![License](https://img.shields.io/badge/license-MIT%20License-blue.svg)](LICENSE)

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