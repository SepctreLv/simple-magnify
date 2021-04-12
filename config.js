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
    build: 'dist'
  },

  styles: {
    source: 'src/css/**/*.scss',
    build: 'dist/css'
  },

  scripts: {
    source: 'src/js/*.js',
    build: 'dist/js'
  }
}