//通用文件：创建vue实例
import Vue from 'vue'
import { createRouter} from './router'
import App from './App.vue'
export function createApp(context){
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(App)
  })
  return {app,router}
}
