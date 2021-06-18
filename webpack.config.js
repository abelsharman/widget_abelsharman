module.exports = {
    entry: {
      app: './src/main.js',
    },
    output: {
      filename: 'main.js',
      path: __dirname + '/dist',
    },
  };
  
  // writes to disk: ./dist/app.js, ./dist/search.js