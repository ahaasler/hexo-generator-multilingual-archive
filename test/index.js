'use strict';

var should = require('chai').should();
var Hexo = require('hexo');

describe('Archive generator', function() {
  var hexo = new Hexo(__dirname, {
    silent: true
  });
  var Post = hexo.model('Post');
  var generator = require('../lib/generator').bind(hexo);
  var posts;
  var enPosts;
  var esPosts;
  var locals;

  console.log(hexo.locals);

  before(function() {
    hexo.config.language = ['en', 'es', 'default'];
    hexo.locals.cache.data = {
      config_es: {
        pagination_dir: 'pagina',
        archive_dir: 'archivo'
      }
    };
  });

  before(function() {
    return Post.insert([{
      source: 'one',
      slug: 'one',
      date: new Date(2014, 1, 2),
      lang: 'en'
    }, {
      source: 'uno',
      slug: 'uno',
      date: new Date(2014, 1, 2),
      lang: 'es'
    }, {
      source: 'two',
      slug: 'two',
      date: new Date(2013, 5, 6),
      lang: 'en'
    }, {
      source: 'dos',
      slug: 'dos',
      date: new Date(2013, 5, 6),
      lang: 'es'
    }, {
      source: 'three',
      slug: 'three',
      date: new Date(2013, 9, 10),
      lang: 'en'
    }, {
      source: 'tres',
      slug: 'tres',
      date: new Date(2013, 9, 10),
      lang: 'es'
    }, {
      source: 'four',
      slug: 'four',
      date: new Date(2013, 5, 8),
      lang: 'en'
    }, {
      source: 'cuatro',
      slug: 'cuatro',
      date: new Date(2013, 5, 8),
      lang: 'es'
    }]).then(function(data) {
      posts = Post.sort('-date');
      enPosts = Post.sort('-date').filter(function(post) {
        return post.lang == 'en';
      });
      esPosts = Post.sort('-date').filter(function(post) {
        return post.lang == 'es';
      });
      locals = hexo.locals.toObject();
    });
  });

  it('pagination enabled', function() {
    hexo.config.archive_generator = {
      per_page: 2,
      yearly: true,
      monthly: true
    };

    var result = generator(locals);

    result.length.should.eql(16);

    for (var i = 0, len = result.length; i < len; i++) {
      result[i].layout.should.eql(['archive', 'index']);
      result[i].data.archive.should.be.true;
    }

    // English

    result[0].path.should.eql('en/archives/');
    result[0].data.base.should.eql('en/archives/');
    result[0].data.total.should.eql(2);
    result[0].data.current.should.eql(1);
    result[0].data.current_url.should.eql('en/archives/');
    result[0].data.posts.should.eql(enPosts.limit(2));
    result[0].data.prev.should.eql(0);
    result[0].data.prev_link.should.eql('');
    result[0].data.next.should.eql(2);
    result[0].data.next_link.should.eql('en/archives/page/2/');

    result[1].path.should.eql('en/archives/page/2/');
    result[1].data.base.should.eql('en/archives/');
    result[1].data.total.should.eql(2);
    result[1].data.current.should.eql(2);
    result[1].data.current_url.should.eql('en/archives/page/2/');
    result[1].data.posts.should.eql(enPosts.skip(2));
    result[1].data.prev.should.eql(1);
    result[1].data.prev_link.should.eql('en/archives/');
    result[1].data.next.should.eql(0);
    result[1].data.next_link.should.eql('');

    result[2].path.should.eql('en/archives/2013/');
    result[2].data.base.should.eql('en/archives/2013/');
    result[2].data.total.should.eql(2);
    result[2].data.current.should.eql(1);
    result[2].data.current_url.should.eql('en/archives/2013/');
    result[2].data.posts.should.eql(enPosts.slice(1, 3));
    result[2].data.prev.should.eql(0);
    result[2].data.prev_link.should.eql('');
    result[2].data.next.should.eql(2);
    result[2].data.next_link.should.eql('en/archives/2013/page/2/');
    result[2].data.year.should.eql(2013);

    result[3].path.should.eql('en/archives/2013/page/2/');
    result[3].data.base.should.eql('en/archives/2013/');
    result[3].data.total.should.eql(2);
    result[3].data.current.should.eql(2);
    result[3].data.current_url.should.eql('en/archives/2013/page/2/');
    result[3].data.posts.should.eql(enPosts.slice(3));
    result[3].data.prev.should.eql(1);
    result[3].data.prev_link.should.eql('en/archives/2013/');
    result[3].data.next.should.eql(0);
    result[3].data.next_link.should.eql('');
    result[3].data.year.should.eql(2013);

    result[4].path.should.eql('en/archives/2013/06/');
    result[4].data.base.should.eql('en/archives/2013/06/');
    result[4].data.total.should.eql(1);
    result[4].data.current.should.eql(1);
    result[4].data.current_url.should.eql('en/archives/2013/06/');
    result[4].data.posts.should.eql(enPosts.slice(2));
    result[4].data.prev.should.eql(0);
    result[4].data.prev_link.should.eql('');
    result[4].data.next.should.eql(0);
    result[4].data.next_link.should.eql('');
    result[4].data.year.should.eql(2013);
    result[4].data.month.should.eql(6);

    result[5].path.should.eql('en/archives/2013/10/');
    result[5].data.base.should.eql('en/archives/2013/10/');
    result[5].data.total.should.eql(1);
    result[5].data.current.should.eql(1);
    result[5].data.current_url.should.eql('en/archives/2013/10/');
    result[5].data.posts.should.eql(enPosts.slice(1, 2));
    result[5].data.prev.should.eql(0);
    result[5].data.prev_link.should.eql('');
    result[5].data.next.should.eql(0);
    result[5].data.next_link.should.eql('');
    result[5].data.year.should.eql(2013);
    result[5].data.month.should.eql(10);

    result[6].path.should.eql('en/archives/2014/');
    result[6].data.base.should.eql('en/archives/2014/');
    result[6].data.total.should.eql(1);
    result[6].data.current.should.eql(1);
    result[6].data.current_url.should.eql('en/archives/2014/');
    result[6].data.posts.should.eql(enPosts.limit(1));
    result[6].data.prev.should.eql(0);
    result[6].data.prev_link.should.eql('');
    result[6].data.next.should.eql(0);
    result[6].data.next_link.should.eql('');
    result[6].data.year.should.eql(2014);

    result[7].path.should.eql('en/archives/2014/02/');
    result[7].data.base.should.eql('en/archives/2014/02/');
    result[7].data.total.should.eql(1);
    result[7].data.current.should.eql(1);
    result[7].data.current_url.should.eql('en/archives/2014/02/');
    result[7].data.posts.should.eql(enPosts.limit(1));
    result[7].data.prev.should.eql(0);
    result[7].data.prev_link.should.eql('');
    result[7].data.next.should.eql(0);
    result[7].data.next_link.should.eql('');
    result[7].data.year.should.eql(2014);
    result[7].data.month.should.eql(2);

    // Español

    result[8].path.should.eql('es/archivo/');
    result[8].data.base.should.eql('es/archivo/');
    result[8].data.total.should.eql(2);
    result[8].data.current.should.eql(1);
    result[8].data.current_url.should.eql('es/archivo/');
    result[8].data.posts.should.eql(esPosts.limit(2));
    result[8].data.prev.should.eql(0);
    result[8].data.prev_link.should.eql('');
    result[8].data.next.should.eql(2);
    result[8].data.next_link.should.eql('es/archivo/pagina/2/');

    result[9].path.should.eql('es/archivo/pagina/2/');
    result[9].data.base.should.eql('es/archivo/');
    result[9].data.total.should.eql(2);
    result[9].data.current.should.eql(2);
    result[9].data.current_url.should.eql('es/archivo/pagina/2/');
    result[9].data.posts.should.eql(esPosts.skip(2));
    result[9].data.prev.should.eql(1);
    result[9].data.prev_link.should.eql('es/archivo/');
    result[9].data.next.should.eql(0);
    result[9].data.next_link.should.eql('');

    result[10].path.should.eql('es/archivo/2013/');
    result[10].data.base.should.eql('es/archivo/2013/');
    result[10].data.total.should.eql(2);
    result[10].data.current.should.eql(1);
    result[10].data.current_url.should.eql('es/archivo/2013/');
    result[10].data.posts.should.eql(esPosts.slice(1, 3));
    result[10].data.prev.should.eql(0);
    result[10].data.prev_link.should.eql('');
    result[10].data.next.should.eql(2);
    result[10].data.next_link.should.eql('es/archivo/2013/pagina/2/');
    result[10].data.year.should.eql(2013);

    result[11].path.should.eql('es/archivo/2013/pagina/2/');
    result[11].data.base.should.eql('es/archivo/2013/');
    result[11].data.total.should.eql(2);
    result[11].data.current.should.eql(2);
    result[11].data.current_url.should.eql('es/archivo/2013/pagina/2/');
    result[11].data.posts.should.eql(esPosts.slice(3));
    result[11].data.prev.should.eql(1);
    result[11].data.prev_link.should.eql('es/archivo/2013/');
    result[11].data.next.should.eql(0);
    result[11].data.next_link.should.eql('');
    result[11].data.year.should.eql(2013);

    result[12].path.should.eql('es/archivo/2013/06/');
    result[12].data.base.should.eql('es/archivo/2013/06/');
    result[12].data.total.should.eql(1);
    result[12].data.current.should.eql(1);
    result[12].data.current_url.should.eql('es/archivo/2013/06/');
    result[12].data.posts.should.eql(esPosts.slice(2));
    result[12].data.prev.should.eql(0);
    result[12].data.prev_link.should.eql('');
    result[12].data.next.should.eql(0);
    result[12].data.next_link.should.eql('');
    result[12].data.year.should.eql(2013);
    result[12].data.month.should.eql(6);

    result[13].path.should.eql('es/archivo/2013/10/');
    result[13].data.base.should.eql('es/archivo/2013/10/');
    result[13].data.total.should.eql(1);
    result[13].data.current.should.eql(1);
    result[13].data.current_url.should.eql('es/archivo/2013/10/');
    result[13].data.posts.should.eql(esPosts.slice(1, 2));
    result[13].data.prev.should.eql(0);
    result[13].data.prev_link.should.eql('');
    result[13].data.next.should.eql(0);
    result[13].data.next_link.should.eql('');
    result[13].data.year.should.eql(2013);
    result[13].data.month.should.eql(10);

    result[14].path.should.eql('es/archivo/2014/');
    result[14].data.base.should.eql('es/archivo/2014/');
    result[14].data.total.should.eql(1);
    result[14].data.current.should.eql(1);
    result[14].data.current_url.should.eql('es/archivo/2014/');
    result[14].data.posts.should.eql(esPosts.limit(1));
    result[14].data.prev.should.eql(0);
    result[14].data.prev_link.should.eql('');
    result[14].data.next.should.eql(0);
    result[14].data.next_link.should.eql('');
    result[14].data.year.should.eql(2014);

    result[15].path.should.eql('es/archivo/2014/02/');
    result[15].data.base.should.eql('es/archivo/2014/02/');
    result[15].data.total.should.eql(1);
    result[15].data.current.should.eql(1);
    result[15].data.current_url.should.eql('es/archivo/2014/02/');
    result[15].data.posts.should.eql(esPosts.limit(1));
    result[15].data.prev.should.eql(0);
    result[15].data.prev_link.should.eql('');
    result[15].data.next.should.eql(0);
    result[15].data.next_link.should.eql('');
    result[15].data.year.should.eql(2014);
    result[15].data.month.should.eql(2);
  });

  it('pagination disabled', function() {
    hexo.config.archive_generator = {
      per_page: 0,
      yearly: true,
      monthly: true
    };

    var result = generator(locals);

    result.length.should.eql(12);

    for (var i = 0, len = result.length; i < len; i++) {
      result[i].layout.should.eql(['archive', 'index']);
      result[i].data.archive.should.be.true;
    }

    // English

    result[0].path.should.eql('en/archives/');
    result[0].data.base.should.eql('en/archives/');
    result[0].data.total.should.eql(1);
    result[0].data.current.should.eql(1);
    result[0].data.current_url.should.eql('en/archives/');
    result[0].data.posts.should.eql(enPosts);
    result[0].data.prev.should.eql(0);
    result[0].data.prev_link.should.eql('');
    result[0].data.next.should.eql(0);
    result[0].data.next_link.should.eql('');

    result[1].path.should.eql('en/archives/2013/');
    result[1].data.base.should.eql('en/archives/2013/');
    result[1].data.total.should.eql(1);
    result[1].data.current.should.eql(1);
    result[1].data.current_url.should.eql('en/archives/2013/');
    result[1].data.posts.should.eql(enPosts.slice(1));
    result[1].data.prev.should.eql(0);
    result[1].data.prev_link.should.eql('');
    result[1].data.next.should.eql(0);
    result[1].data.next_link.should.eql('');
    result[1].data.year.should.eql(2013);

    result[2].path.should.eql('en/archives/2013/06/');
    result[2].data.base.should.eql('en/archives/2013/06/');
    result[2].data.total.should.eql(1);
    result[2].data.current.should.eql(1);
    result[2].data.current_url.should.eql('en/archives/2013/06/');
    result[2].data.posts.should.eql(enPosts.slice(2));
    result[2].data.prev.should.eql(0);
    result[2].data.prev_link.should.eql('');
    result[2].data.next.should.eql(0);
    result[2].data.next_link.should.eql('');
    result[2].data.year.should.eql(2013);
    result[2].data.month.should.eql(6);

    result[3].path.should.eql('en/archives/2013/10/');
    result[3].data.base.should.eql('en/archives/2013/10/');
    result[3].data.total.should.eql(1);
    result[3].data.current.should.eql(1);
    result[3].data.current_url.should.eql('en/archives/2013/10/');
    result[3].data.posts.should.eql(enPosts.slice(1, 2));
    result[3].data.prev.should.eql(0);
    result[3].data.prev_link.should.eql('');
    result[3].data.next.should.eql(0);
    result[3].data.next_link.should.eql('');
    result[3].data.year.should.eql(2013);
    result[3].data.month.should.eql(10);

    result[4].path.should.eql('en/archives/2014/');
    result[4].data.base.should.eql('en/archives/2014/');
    result[4].data.total.should.eql(1);
    result[4].data.current.should.eql(1);
    result[4].data.current_url.should.eql('en/archives/2014/');
    result[4].data.posts.should.eql(enPosts.limit(1));
    result[4].data.prev.should.eql(0);
    result[4].data.prev_link.should.eql('');
    result[4].data.next.should.eql(0);
    result[4].data.next_link.should.eql('');
    result[4].data.year.should.eql(2014);

    result[5].path.should.eql('en/archives/2014/02/');
    result[5].data.base.should.eql('en/archives/2014/02/');
    result[5].data.total.should.eql(1);
    result[5].data.current.should.eql(1);
    result[5].data.current_url.should.eql('en/archives/2014/02/');
    result[5].data.posts.should.eql(enPosts.limit(1));
    result[5].data.prev.should.eql(0);
    result[5].data.prev_link.should.eql('');
    result[5].data.next.should.eql(0);
    result[5].data.next_link.should.eql('');
    result[5].data.year.should.eql(2014);
    result[5].data.month.should.eql(2);

    // Español

    result[6].path.should.eql('es/archivo/');
    result[6].data.base.should.eql('es/archivo/');
    result[6].data.total.should.eql(1);
    result[6].data.current.should.eql(1);
    result[6].data.current_url.should.eql('es/archivo/');
    result[6].data.posts.should.eql(esPosts);
    result[6].data.prev.should.eql(0);
    result[6].data.prev_link.should.eql('');
    result[6].data.next.should.eql(0);
    result[6].data.next_link.should.eql('');

    result[7].path.should.eql('es/archivo/2013/');
    result[7].data.base.should.eql('es/archivo/2013/');
    result[7].data.total.should.eql(1);
    result[7].data.current.should.eql(1);
    result[7].data.current_url.should.eql('es/archivo/2013/');
    result[7].data.posts.should.eql(esPosts.slice(1));
    result[7].data.prev.should.eql(0);
    result[7].data.prev_link.should.eql('');
    result[7].data.next.should.eql(0);
    result[7].data.next_link.should.eql('');
    result[7].data.year.should.eql(2013);

    result[8].path.should.eql('es/archivo/2013/06/');
    result[8].data.base.should.eql('es/archivo/2013/06/');
    result[8].data.total.should.eql(1);
    result[8].data.current.should.eql(1);
    result[8].data.current_url.should.eql('es/archivo/2013/06/');
    result[8].data.posts.should.eql(esPosts.slice(2));
    result[8].data.prev.should.eql(0);
    result[8].data.prev_link.should.eql('');
    result[8].data.next.should.eql(0);
    result[8].data.next_link.should.eql('');
    result[8].data.year.should.eql(2013);
    result[8].data.month.should.eql(6);

    result[9].path.should.eql('es/archivo/2013/10/');
    result[9].data.base.should.eql('es/archivo/2013/10/');
    result[9].data.total.should.eql(1);
    result[9].data.current.should.eql(1);
    result[9].data.current_url.should.eql('es/archivo/2013/10/');
    result[9].data.posts.should.eql(esPosts.slice(1, 2));
    result[9].data.prev.should.eql(0);
    result[9].data.prev_link.should.eql('');
    result[9].data.next.should.eql(0);
    result[9].data.next_link.should.eql('');
    result[9].data.year.should.eql(2013);
    result[9].data.month.should.eql(10);

    result[10].path.should.eql('es/archivo/2014/');
    result[10].data.base.should.eql('es/archivo/2014/');
    result[10].data.total.should.eql(1);
    result[10].data.current.should.eql(1);
    result[10].data.current_url.should.eql('es/archivo/2014/');
    result[10].data.posts.should.eql(esPosts.limit(1));
    result[10].data.prev.should.eql(0);
    result[10].data.prev_link.should.eql('');
    result[10].data.next.should.eql(0);
    result[10].data.next_link.should.eql('');
    result[10].data.year.should.eql(2014);

    result[11].path.should.eql('es/archivo/2014/02/');
    result[11].data.base.should.eql('es/archivo/2014/02/');
    result[11].data.total.should.eql(1);
    result[11].data.current.should.eql(1);
    result[11].data.current_url.should.eql('es/archivo/2014/02/');
    result[11].data.posts.should.eql(esPosts.limit(1));
    result[11].data.prev.should.eql(0);
    result[11].data.prev_link.should.eql('');
    result[11].data.next.should.eql(0);
    result[11].data.next_link.should.eql('');
    result[11].data.year.should.eql(2014);
    result[11].data.month.should.eql(2);
  });

  it('yearly disabled', function() {
    hexo.config.archive_generator = {
      per_page: 0,
      yearly: false,
      monthly: true
    };

    var result = generator(locals);

    result.map(function(item) {
      return item.path;
    }).should.eql(['en/archives/', 'es/archivo/']);
  });

  it('monthly disabled', function() {
    hexo.config.archive_generator = {
      per_page: 0,
      yearly: true,
      monthly: false
    };

    var result = generator(locals);

    result.map(function(item) {
      return item.path;
    }).should.eql(['en/archives/', 'en/archives/2013/', 'en/archives/2014/', 'es/archivo/', 'es/archivo/2013/', 'es/archivo/2014/']);
  });

  it('custom pagination_dir', function() {
    hexo.config.archive_generator = {
      per_page: 1,
      yearly: false,
      monthly: false
    };

    hexo.config.pagination_dir = 'yo';
    hexo.locals.cache.data = {
      config_es: {
        pagination_dir: undefined,
        archive_dir: 'archivo'
      }
    };

    var result = generator(hexo.locals.toObject());

    result.map(function(item) {
      return item.path;
    }).should.eql(['en/archives/', 'en/archives/yo/2/', 'en/archives/yo/3/', 'en/archives/yo/4/', 'es/archivo/', 'es/archivo/yo/2/', 'es/archivo/yo/3/', 'es/archivo/yo/4/']);

    // Restore config
    hexo.config.pagination_dir = 'page';
    hexo.locals.cache.data = {
      config_es: {
        pagination_dir: 'pagina',
        archive_dir: 'archivo'
      }
    };
  });
});
