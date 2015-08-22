'use strict';

var pagination = require('hexo-pagination');
var multilingual = require('hexo-multilingual');
var _ = require('lodash');

module.exports = function(locals) {
  var context = this;
  var config = context.config;
  var result = [];

  function _c(value, lang) {
    return multilingual.util._c(value, lang, config, locals);
  }

  function generate(path, posts, perPage, paginationDir, options) {
    options = options || {};
    options.archive = true;

    result = result.concat(pagination(path, posts, {
      perPage: perPage,
      layout: ['archive', 'index'],
      format: paginationDir + '/%d/',
      data: options
    }));
  }

  function getAlternates(year, month) {
    var result = [];
    _.each(config.language, function(lang) {
      if (lang != 'default') {
        var path = lang + '/' + _c('archive_dir', lang);
        if (path[path.length - 1] !== '/') {
          path += '/';
        }
        if (year !== undefined && _c('archive_generator.yearly', lang)) {
          path += year + '/';
          if (month !== undefined && _c('archive_generator.monthly', lang)) {
            path += (month < 10 ? '0' + month : month) + '/';
          }
        }
        result.push({
          title: _c('title', lang, config, locals),
          lang: lang,
          path: path
        });
      }
    });
    return result;
  }

  _.forEach(config.language, function(lang) {
    if (lang != 'default') {
      var archiveDir = lang + '/' + _c('archive_dir', lang);
      var paginationDir = _c('pagination_dir', lang) || 'page';
      var languagePosts = locals.posts.sort('-date').filter(function(post) {
        return post.lang == lang;
      });
      var perPage = _c('archive_generator.per_page', lang);

      if (!languagePosts.length) return;

      if (archiveDir[archiveDir.length - 1] !== '/') archiveDir += '/';

      generate(archiveDir, languagePosts, perPage, paginationDir, {
        lang: lang,
        alternates: getAlternates()
      });

      if (!_c('archive_generator.yearly', lang, config, locals)) return;

      var posts = {};

      // Organize posts by date
      languagePosts.forEach(function(post) {
        var date = post.date;
        var year = date.year();
        var month = date.month() + 1; // month is started from 0

        if (!posts.hasOwnProperty(year)) {
          // 13 arrays. The first array is for posts in this year
          // and the other arrays is for posts in this month
          posts[year] = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
          ];
        }

        posts[year][0].push(post);
        posts[year][month].push(post);
      });

      var Query = context.model('Post').Query;
      var years = Object.keys(posts);
      var year, data, month, monthData, url;

      // Yearly
      for (var i = 0, len = years.length; i < len; i++) {
        year = +years[i];
        data = posts[year];
        url = archiveDir + year + '/';
        if (!data[0].length) continue;

        generate(url, new Query(data[0]), perPage, paginationDir, {
          lang: lang,
          year: year,
          alternates: getAlternates(year)
        });

        if (!_c('archive_generator.monthly', lang)) continue;

        // Monthly
        for (month = 1; month <= 12; month++) {
          monthData = data[month];
          if (!monthData.length) continue;

          generate(url + (month < 10 ? '0' + month : month) + '/', new Query(monthData), perPage, paginationDir, {
            lang: lang,
            year: year,
            month: month,
            alternates: getAlternates(year, month)
          });
        }
      }

    }
  });

  return result;
};
