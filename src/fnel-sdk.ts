import type { FnelEvent, FnelInitResult, FnelTrackResult } from './types';

class FnelSDK {
  private apiToken: string | null = null;
  private userId: string | null = null;
  private isInitialized: boolean = false;
  private queue: FnelEvent[] = [];
  private storageKey = 'fnel_user_id';
  private sdkVersion = '1.0.1';

  constructor() {
    this.loadUserIdFromStorage();
  }

  private loadUserIdFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          this.userId = stored;
        }
      } catch (error) {
        console.warn('Failed to load fnel user ID from storage:', error);
      }
    }
  }

  private saveUserIdToStorage(userId: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(this.storageKey, userId);
      } catch (error) {
        console.warn('Failed to save fnel user ID to storage:', error);
      }
    }
  }

  private generateUserId(): string {
    return 'fnel_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  async init(apiToken: string): Promise<FnelInitResult> {
    if (this.isInitialized) {
      return {
        success: true,
        userId: this.userId!,
        fromStorage: true
      };
    }

    try {
      this.apiToken = apiToken;
      
      if (!this.userId) {
        this.userId = this.generateUserId();
        this.saveUserIdToStorage(this.userId);
      }

      this.isInitialized = true;

      // Process any queued events
      if (this.queue.length > 0) {
        const queuedEvents = [...this.queue];
        this.queue = [];
        
        for (const event of queuedEvents) {
          await this.track(event);
        }
      }

      return {
        success: true,
        userId: this.userId,
        fromStorage: false
      };
    } catch (error) {
      console.error('Failed to initialize fnel SDK:', error);
      throw error;
    }
  }

  async track(event: FnelEvent): Promise<FnelTrackResult> {
    if (!this.isInitialized) {
      this.queue.push(event);
      return {
        success: true,
        queued: true
      };
    }

    if (!this.apiToken || !this.userId) {
      return {
        success: false,
        queued: false
      };
    }

    try {
      const payload = {
        ...event,
        userId: this.userId,
        timestamp: new Date().toISOString(),
        version: this.version
      };

      // In a real implementation, you would send this to your API
      // For now, we'll just log it
      console.log('Tracking event:', payload);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));

      return {
        success: true,
        queued: false
      };
    } catch (error) {
      console.error('Failed to track event:', error);
      return {
        success: false,
        queued: false
      };
    }
  }

  getUserId(): string | null {
    return this.userId;
  }

  isInitializedCheck(): boolean {
    return this.isInitialized;
  }

  getQueueLength(): number {
    return this.queue.length;
  }

  clearQueue(): void {
    this.queue = [];
  }

  clearStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.removeItem(this.storageKey);
      } catch (error) {
        console.warn('Failed to clear fnel storage:', error);
      }
    }
  }

  reset(): void {
    this.isInitialized = false;
    this.userId = null;
    this.apiToken = null;
    this.queue = [];
    this.clearStorage();
  }

  version(): string {
    return this.sdkVersion;
  }
}

export const fnelSDK = new FnelSDK();
