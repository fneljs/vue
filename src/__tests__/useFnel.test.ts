import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { fnelSDK } from '../fnel-sdk';
import { useFnel } from '../useFnel';

// Mock the SDK
jest.mock('../fnel-sdk', () => ({
  fnelSDK: {
    track: jest.fn(),
    getUserId: jest.fn(),
    getQueueLength: jest.fn(),
    clearQueue: jest.fn(),
    clearStorage: jest.fn(),
    reset: jest.fn(),
    isInitializedCheck: jest.fn(),
    version: jest.fn()
  }
}));

describe('useFnel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide track function', () => {
    const { track } = useFnel();
    expect(typeof track).toBe('function');
  });

  it('should provide reactive values', () => {
    const { isInitialized, userId, version } = useFnel();
    expect(isInitialized).toBeDefined();
    expect(userId).toBeDefined();
    expect(version).toBeDefined();
  });

  it('should call SDK methods when not injected', () => {
    const { getUserId, getQueueLength } = useFnel();
    
    getUserId();
    getQueueLength();
    
    expect(fnelSDK.getUserId).toHaveBeenCalled();
    expect(fnelSDK.getQueueLength).toHaveBeenCalled();
  });
});
