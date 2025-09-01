# @fnel/vue

Vue.js SDK for fnel funnel tracking. This package provides a Vue plugin and composables for easy integration of fnel tracking into your Vue 3 applications.

## Features

- 🚀 **Easy Integration**: Simple plugin pattern with Vue 3 composables
- 🔄 **Auto-initialization**: Automatically loads and initializes the fnel SDK
- 📱 **Vue 3 Ready**: Built for Vue 3 with Composition API support
- 🎯 **Funnel Tracking**: Dedicated composables for funnel step tracking
- 💾 **State Management**: Automatic state synchronization with the SDK
- 🛡️ **TypeScript**: Full TypeScript support with comprehensive types
- 🔧 **Debug Support**: Access to debug information and SDK state
- 🎨 **Template Support**: Access fnel functionality directly in templates

## Installation

```bash
npm install @fnel/vue
# or
yarn add @fnel/vue
# or
pnpm add @fnel/vue
```

## Quick Start

### 1. Install the plugin in your app

```ts
import { createApp } from 'vue';
import { FnelPlugin } from '@fnel/vue';
import App from './App.vue';

const app = createApp(App);

app.use(FnelPlugin, {
  apiToken: 'your-api-token-here'
});

app.mount('#app');
```

### 2. Use the composable in your components

```vue
<template>
  <div>
    <p v-if="isInitialized">Fnel initialized!</p>
    <p>User ID: {{ userId }}</p>
    <button @click="trackLandingPage">Track Landing Page</button>
  </div>
</template>

<script setup lang="ts">
import { useFnel } from '@fnel/vue';

const { track, isInitialized, userId } = useFnel();

const trackLandingPage = async () => {
  await track({
    name: 'landing_page',
    step: 1,
    funnel: 'abc123def'
  });
};
</script>
```

### 3. Or use the specialized funnel tracking composable

```vue
<template>
  <div>
    <button @click="trackStep1">Complete Step 1</button>
    <button @click="trackStep2">Complete Step 2</button>
  </div>
</template>

<script setup lang="ts">
import { useFunnelTracking } from '@fnel/vue';

const { trackFunnelStep, isInitialized } = useFunnelTracking();

const trackStep1 = async () => {
  await trackFunnelStep('onboarding', 1, 'welcome_page', {
    source: 'direct_traffic'
  });
};

const trackStep2 = async () => {
  await trackFunnelStep('onboarding', 2, 'signup_form', {
    form_type: 'email'
  });
};
</script>
```

## API Reference

### FnelPlugin

The main plugin that initializes the fnel SDK globally.

```ts
app.use(FnelPlugin, {
  apiToken: 'your-api-token',
  autoInit: true, // optional, default: true
  onInit: (result) => console.log('Initialized:', result), // optional
  onError: (error) => console.error('Error:', error) // optional
});
```

#### Options

- `apiToken` (required): Your fnel API token
- `autoInit` (optional): Whether to automatically initialize on mount (default: true)
- `onInit` (optional): Callback when initialization succeeds
- `onError` (optional): Callback when errors occur

### useFnel

The main composable that provides access to all fnel functionality.

```ts
const {
  isInitialized,
  userId,
  track,
  version,
  getUserId,
  getQueueLength,
  clearQueue,
  clearStorage,
  reset
} = useFnel();
```

#### Returns

- `isInitialized`: Reactive boolean indicating if fnel is initialized
- `userId`: Reactive string containing the current user ID
- `track`: Function to track events
- `version`: Reactive string containing the SDK version
- `getUserId`: Function to get the current user ID
- `getQueueLength`: Function to get the current queue length
- `clearQueue`: Function to clear the event queue
- `clearStorage`: Function to clear stored data
- `reset`: Function to reset the SDK state

### useFunnelTracking

A specialized composable for funnel tracking with a simplified API.

```ts
const { trackFunnelStep, isInitialized } = useFunnelTracking();

await trackFunnelStep(
  'funnel_id',    // The funnel identifier
  1,              // Step number
  'step_name',    // Step name/description
  {               // Additional data (optional)
    source: 'direct_traffic',
    campaign: 'summer_2024'
  }
);
```

## Template Usage

When using the plugin, you can also access fnel functionality directly in templates:

```vue
<template>
  <div>
    <button @click="$fnel.track({ name: 'button_click', step: 1, funnel: 'demo' })">
      Track Click
    </button>
    <p>Initialized: {{ $fnel.isInitialized }}</p>
    <p>User ID: {{ $fnel.userId }}</p>
  </div>
</template>
```

## Advanced Usage

### Manual SDK Control

For advanced use cases, you can access the SDK directly:

```ts
import { fnelSDK } from '@fnel/vue';

// Manual initialization
await fnelSDK.init('your-api-token');

// Direct tracking
await fnelSDK.track({
  name: 'custom_event',
  step: 1,
  funnel: 'custom_funnel'
});
```

### Custom Event Data

You can include additional data with your events:

```ts
await track({
  name: 'purchase_completed',
  step: 3,
  funnel: 'checkout',
  amount: 99.99,
  currency: 'USD',
  product_id: 'prod_123',
  category: 'electronics'
});
```

## TypeScript Support

The package includes comprehensive TypeScript types:

```ts
import type { FnelEvent, FnelInitResult, FnelTrackResult } from '@fnel/vue';

const event: FnelEvent = {
  name: 'page_view',
  step: 1,
  funnel: 'marketing_funnel'
};
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
