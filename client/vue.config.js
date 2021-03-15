
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
      name: 'consti',
      themeColor: '#009688',
      msTileColor: '#141414',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
      workboxPluginMode: "InjectManifest",
      workboxOptions: {
        swSrc: './public/sw.js',
        // navigateFallback: 'index.html'
      }
    }
}