const express = require('express');
const Vue = require('vue');

const app = express();
const vm = new Vue({
  data:{
    count:1
  },
  template:`<div>{{count}}</div>`
})
const render = require('vue-server-renderer').createRenderer();

app.get('*', async function(req, res){
  try{
    const html = await render.renderToString(vm)
    res.send(html)
  }catch(error){
    res.status(500).send('Internal Server Error')
  }
})



app.listen(3000,()=>{
  console.log('渲染服务器启动成功！')
})
