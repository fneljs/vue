import { inject, onMounted, ref } from 'vue';
import { fnelSDK } from './fnel-sdk';
import type { FnelComposableOptions, FnelEvent, FnelTrackResult, UseFnelReturn } from './types';

export function useFnel(_options: FnelComposableOptions = {}): UseFnelReturn {
  const isInitialized = ref(false);
  const userId = ref<string | null>(null);
  const version = ref('1.0.1');

  // Try to inject from plugin first
  const injectedFnel = inject<{
    sdk: typeof fnelSDK;
    isInitialized: boolean;
    userId: string | null;
    track: (event: FnelEvent) => Promise<FnelTrackResult>;
    version: () => string;
    getUserId: () => string | null;
    getQueueLength: () => number;
    clearQueue: () => void;
    clearStorage: () => void;
    reset: () => void;
  } | null>('fnel', null);

  const track = async (event: FnelEvent): Promise<FnelTrackResult> => {
    if (injectedFnel) {
      return injectedFnel.track(event);
    }
    return fnelSDK.track(event);
  };

  const getUserId = (): string | null => {
    if (injectedFnel) {
      return injectedFnel.getUserId();
    }
    return fnelSDK.getUserId();
  };

  const getQueueLength = (): number => {
    if (injectedFnel) {
      return injectedFnel.getQueueLength();
    }
    return fnelSDK.getQueueLength();
  };

  const clearQueue = (): void => {
    if (injectedFnel) {
      injectedFnel.clearQueue();
    } else {
      fnelSDK.clearQueue();
    }
  };

  const clearStorage = (): void => {
    if (injectedFnel) {
      injectedFnel.clearStorage();
    } else {
      fnelSDK.clearStorage();
    }
  };

  const reset = (): void => {
    if (injectedFnel) {
      injectedFnel.reset();
    } else {
      fnelSDK.reset();
    }
    isInitialized.value = false;
    userId.value = null;
  };

  // Update reactive values
  const updateReactiveValues = () => {
    if (injectedFnel) {
      isInitialized.value = injectedFnel.isInitialized;
      userId.value = injectedFnel.userId;
      version.value = injectedFnel.version();
    } else {
      isInitialized.value = fnelSDK.isInitializedCheck();
      userId.value = fnelSDK.getUserId();
      version.value = fnelSDK.version();
    }
  };

  onMounted(() => {
    updateReactiveValues();
    
    // Set up an interval to keep reactive values in sync
    const interval = setInterval(updateReactiveValues, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  });

  return {
    isInitialized,
    userId,
    track,
    version,
    getUserId,
    getQueueLength,
    clearQueue,
    clearStorage,
    reset
  };
}

// Specialized hook for funnel tracking
export function useFunnelTracking() {
  const { track, isInitialized } = useFnel();

  const trackFunnelStep = async (
    funnelId: string,
    stepNumber: number,
    stepName: string,
    additionalData: Record<string, string | number | boolean | null | undefined> = {}
  ) => {
    if (!isInitialized.value) {
      console.warn('Fnel not initialized yet, event will be queued');
    }

    return track({
      name: stepName,
      step: stepNumber,
      funnel: funnelId,
      ...additionalData
    });
  };

  return {
    trackFunnelStep,
    isInitialized
  };
}
