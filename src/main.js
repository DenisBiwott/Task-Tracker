import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

// Use router
app.use(router);

// Use store
app.use(store);

// Mount the app
app.mount('#app');
