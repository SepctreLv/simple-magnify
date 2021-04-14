const path = require('path');
const env = process.env.NODE_ENV || 'prod';
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const production = env === 'prod';
const year = new Date().getFullYear();

module.exports = {
  production: production,

  name: 'simple-magnify',

  banner: `/*!
  * ${pkg.name} v${pkg.version} (${pkg.homepage})
  * Copyright ${year} ${pkg.author}
  * Licensed under ${pkg.license}
  */`,

  paths: {
    source: 'src',
    build: 'docs'
  },

  assets: {
    source: 'src/assets',
    build: 'docs/assets'
  },

  styles: {
    source: 'src/css/**/*.scss',
    build: 'docs/assets/css'
  },

  scripts: {
    source: 'src/js/*.js',
    build: 'docs/assets/js'
  },

  html: {
    pages: 'src/pages/**/*.hbs',
    data: "src/data/**/*.{js,json}",
    helpers: "src/helpers/*.js",
    layouts: "src/layouts/**/*.hbs",
    partials: "src/partials/**/*.hbs",
    build: 'docs',
    metadata: {
      production,
      pkg
    }
  },

  images: {
    source: 'src/images/**/*.{jpg,png,gif,webp}',
    build: 'docs/assets/images/'
  }
}