import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入插件
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "lib-flexible/flexible.js"
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(store).use(router).use(ElementPlus);
app.mount("#app");
    