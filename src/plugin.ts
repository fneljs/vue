import type { App, Plugin } from 'vue';
import { fnelSDK } from './fnel-sdk';
import type { FnelPluginOptions, FnelEvent } from './types';

export const FnelPlugin: Plugin = {
  install(app: App, options: FnelPluginOptions) {
    if (!options.apiToken) {
      console.warn('FnelPlugin: apiToken is required');
      return;
    }

    // Initialize the SDK
    if (options.autoInit !== false) {
      fnelSDK.init(options.apiToken)
        .then((result) => {
          if (options.onInit) {
            options.onInit(result);
          }
        })
        .catch((error) => {
          if (options.onError) {
            options.onError(error);
          } else {
            console.error('FnelPlugin initialization failed:', error);
          }
        });
    }

    // Provide fnel globally
    const fnelContext = {
      sdk: fnelSDK,
      isInitialized: fnelSDK.isInitializedCheck(),
      userId: fnelSDK.getUserId(),
      track: (event: FnelEvent) => fnelSDK.track(event),
      version: () => fnelSDK.version(),
      getUserId: () => fnelSDK.getUserId(),
      getQueueLength: () => fnelSDK.getQueueLength(),
      clearQueue: () => fnelSDK.clearQueue(),
      clearStorage: () => fnelSDK.clearStorage(),
      reset: () => fnelSDK.reset()
    };
    
    app.provide('fnel', fnelContext);

    // Add global properties for template access
    app.config.globalProperties.$fnel = {
      track: (event: FnelEvent) => fnelSDK.track(event),
      isInitialized: fnelSDK.isInitializedCheck(),
      userId: fnelSDK.getUserId()
    };
  }
};

export default FnelPlugin;
