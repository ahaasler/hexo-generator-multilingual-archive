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

- **per\_page**: Posts displayed per page. (0 = disable pagination)
- **yearly**: Generate yearly archive.
- **monthly**: Generate monthly archive.

### Default configuration is:

- **per\_page**: the configured per\_page (outside archive\_generator) or 10.
- **yearly**: true.
- **monthly**: true.

### Localizable configuration

These are the values that this generator uses and can be [localized](https://github.com/ahaasler/hexo-multilingual#_c-configuration-locales "Configuring locales"):

- archive_generator
  - per_page
  - yearly
  - monthly
- archive_dir
- pagination_dir
- title

## License

This module is released under the [MIT License](http://opensource.org/licenses/MIT "The MIT License").

See [LICENSE](LICENSE "The MIT License").

[Hexo]: http://hexo.io/

