import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { apiUrl } from './config.js';
createApp({
  data() {
    return {
      user: {
        username:'',
        password:'',
      },
    }
  },
  methods: {
    login() {
//發送api請求遠端登入
      axios.post(`${apiUrl}/admin/signin`,this.user)
      .then((res) => {
        const { token, expired } = res.data;
        // 寫入 cookie token
        // expires 設置有效時間
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; `;//path=/
        window.location = 'products.html';
      }).catch((err) => {
        alert('帳號或密碼錯誤');
      });
    },
  },
}).mount('#app');
