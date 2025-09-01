import { Ref } from 'vue';

export interface FnelEvent {
  name: string;
  step: number;
  funnel: string;
  [key: string]: string | number | boolean | null | undefined;
}

export interface FnelInitResult {
  success: boolean;
  userId: string;
  fromStorage?: boolean;
}

export interface FnelTrackResult {
  success: boolean;
  queued?: boolean;
  [key: string]: string | number | boolean | null | undefined;
}

export interface FnelContextValue {
  isInitialized: boolean;
  userId: string | null;
  track: (event: FnelEvent) => Promise<FnelTrackResult>;
  version: () => string;
  getUserId: () => string | null;
  isInitializedCheck: () => boolean;
  getQueueLength: () => number;
  clearQueue: () => void;
  clearStorage: () => void;
  reset: () => void;
}

export interface FnelPluginOptions {
  apiToken: string;
  autoInit?: boolean;
  onInit?: (result: FnelInitResult) => void;
  onError?: (error: Error) => void;
}

export interface UseFnelReturn {
  isInitialized: Ref<boolean>;
  userId: Ref<string | null>;
  track: (event: FnelEvent) => Promise<FnelTrackResult>;
  version: Ref<string>;
  getUserId: () => string | null;
  getQueueLength: () => number;
  clearQueue: () => void;
  clearStorage: () => void;
  reset: () => void;
}

export interface FnelComposableOptions {
  apiToken?: string;
}
