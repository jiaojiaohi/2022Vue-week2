import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { apiUrl,apiPath } from './config.js';
createApp({
  data() {
    return {
      products: [],
      tempProduct: {},
    }
  },
  methods: {
    checkUser() {    
//確認是否登入
      const url = `${apiUrl}/api/user/check`;
      axios.post(url)
        .then((res) => {
          this.getProducts();
        })
        .catch((err) => {
          alert('請重新登入');
          window.location = 'index.html';
        })
    },
    getProducts() {
      const url = `${apiUrl}/api/${apiPath}/admin/products`;
      axios.get(url)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    openProduct(item) {
      this.tempProduct = item;
    }
  },
  mounted() {
    // 取token(token僅須設定一次)
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkUser()
  }
}).mount('#app');
