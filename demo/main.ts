import { createApp } from 'vue';
import { FnelPlugin } from '../src/index';
import App from './App.vue';

const app = createApp(App);

// Install the fnel plugin
app.use(FnelPlugin, {
  apiToken: 'demo-api-token-123',
  autoInit: true,
  onInit: (result) => {
    console.log('Fnel initialized successfully:', result);
  },
  onError: (error) => {
    console.error('Fnel initialization failed:', error);
  }
});

app.mount('#app');
