const express = require('express');
// const Vue = require('vue');
const app = express();
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');
const bundle = require('../dist/server/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json');
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync('../src/index.temp.html', 'utf-8'),
  clientManifest: clientManifest
})

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      if (err) {
        reject(err)
        return
      }
      resolve(html)
    })
  })
}

// const vm = new Vue({
//   data:{
//     count:1
//   },
//   template:`<div>{{count}}</div>`
// })

app.use(express.static('../dist/client'))
app.get('*', async function (req, res) {
  try {
    const context = {
      title: 'ssr test',
      url: req.url
    }
    const html = await renderToString(context)
    res.send(html)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})



app.listen(3000, () => {
  console.log('渲染服务器启动成功！')
})
