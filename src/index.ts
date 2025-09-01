// Main exports
export { default as FnelPlugin } from './plugin';
export { useFnel, useFunnelTracking } from './useFnel';

// Types
export type {
    FnelComposableOptions, FnelContextValue,
    FnelEvent,
    FnelInitResult,
    FnelPluginOptions,
    FnelTrackResult,
    UseFnelReturn
} from './types';

// SDK instance (for advanced usage)
export { fnelSDK } from './fnel-sdk';
