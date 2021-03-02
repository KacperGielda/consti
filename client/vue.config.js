
module.exports = {
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
        },
      }
    },
    outputDir: '../server/public/'
}