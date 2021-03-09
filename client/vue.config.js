
module.exports = {
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
        },
      }
    },
    outputDir: '../server/public/',
    pwa:{
      workboxPluginMode: "InjectManifest",
      workboxOptions: {
        swSrc: './public/sw.js',
        // navigateFallback: 'index.html'
      }
    }
}