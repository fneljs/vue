<template>
  <div class="app">
    <header>
      <h1>Fnel Vue Demo</h1>
      <p>Status: {{ isInitialized ? '✅ Initialized' : '⏳ Initializing...' }}</p>
      <p>User ID: {{ userId || 'Not set' }}</p>
      <p>Version: {{ version }}</p>
    </header>

    <main>
      <section class="tracking-section">
        <h2>Event Tracking</h2>
        <div class="button-group">
          <button @click="trackPageView" :disabled="!isInitialized">
            Track Page View
          </button>
          <button @click="trackButtonClick" :disabled="!isInitialized">
            Track Button Click
          </button>
          <button @click="trackCustomEvent" :disabled="!isInitialized">
            Track Custom Event
          </button>
        </div>
      </section>

      <section class="funnel-section">
        <h2>Funnel Tracking</h2>
        <div class="button-group">
          <button @click="trackStep1" :disabled="!isInitialized">
            Complete Step 1
          </button>
          <button @click="trackStep2" :disabled="!isInitialized">
            Complete Step 2
          </button>
          <button @click="trackStep3" :disabled="!isInitialized">
            Complete Step 3
          </button>
        </div>
      </section>

      <section class="debug-section">
        <h2>Debug Information</h2>
        <div class="info-grid">
          <div>
            <strong>Queue Length:</strong> {{ getQueueLength() }}
          </div>
          <div>
            <strong>Storage Status:</strong> {{ hasStorage ? 'Available' : 'Not Available' }}
          </div>
        </div>
        <div class="button-group">
          <button @click="clearQueue" :disabled="!isInitialized">
            Clear Queue
          </button>
          <button @click="clearStorage" :disabled="!isInitialized">
            Clear Storage
          </button>
          <button @click="reset" :disabled="!isInitialized">
            Reset
          </button>
        </div>
      </section>

      <section class="logs-section">
        <h2>Event Logs</h2>
        <div class="logs">
          <div v-for="log in logs" :key="log.id" class="log-entry">
            <span class="timestamp">{{ log.timestamp }}</span>
            <span class="event-name">{{ log.event.name }}</span>
            <span class="funnel">Funnel: {{ log.event.funnel }}</span>
            <span class="step">Step: {{ log.event.step }}</span>
          </div>
          <div v-if="logs.length === 0" class="no-logs">
            No events tracked yet
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useFnel, useFunnelTracking } from '../src/index';

// Use the main fnel composable
const {
  isInitialized,
  userId,
  version,
  track,
  getUserId,
  getQueueLength,
  clearQueue,
  clearStorage,
  reset
} = useFnel();

// Use the specialized funnel tracking composable
const { trackFunnelStep } = useFunnelTracking();

// Local state
const logs = ref<Array<{ id: number; timestamp: string; event: any }>>([]);
const hasStorage = ref(false);

// Check if localStorage is available
onMounted(() => {
  hasStorage.value = typeof window !== 'undefined' && !!window.localStorage;
});

// Helper function to add logs
const addLog = (event: any) => {
  logs.value.unshift({
    id: Date.now(),
    timestamp: new Date().toLocaleTimeString(),
    event
  });
  
  // Keep only last 10 logs
  if (logs.value.length > 10) {
    logs.value = logs.value.slice(0, 10);
  }
};

// Event tracking functions
const trackPageView = async () => {
  const event = {
    name: 'page_view',
    step: 1,
    funnel: 'demo_funnel'
  };
  
  const result = await track(event);
  addLog(event);
  console.log('Page view tracked:', result);
};

const trackButtonClick = async () => {
  const event = {
    name: 'button_click',
    step: 2,
    funnel: 'demo_funnel',
    button_type: 'demo_button'
  };
  
  const result = await track(event);
  addLog(event);
  console.log('Button click tracked:', result);
};

const trackCustomEvent = async () => {
  const event = {
    name: 'custom_event',
    step: 3,
    funnel: 'demo_funnel',
    custom_data: 'example_value',
    timestamp: new Date().toISOString()
  };
  
  const result = await track(event);
  addLog(event);
  console.log('Custom event tracked:', result);
};

// Funnel tracking functions
const trackStep1 = async () => {
  const result = await trackFunnelStep('demo_funnel', 1, 'welcome_page', {
    source: 'demo'
  });
  addLog({ name: 'welcome_page', step: 1, funnel: 'demo_funnel' });
  console.log('Step 1 tracked:', result);
};

const trackStep2 = async () => {
  const result = await trackFunnelStep('demo_funnel', 2, 'form_filled', {
    form_type: 'demo'
  });
  addLog({ name: 'form_filled', step: 2, funnel: 'demo_funnel' });
  console.log('Step 2 tracked:', result);
};

const trackStep3 = async () => {
  const result = await trackFunnelStep('demo_funnel', 3, 'completed', {
    completion_time: Date.now()
  });
  addLog({ name: 'completed', step: 3, funnel: 'demo_funnel' });
  console.log('Step 3 tracked:', result);
};

// Debug functions
const handleClearQueue = () => {
  clearQueue();
  console.log('Queue cleared');
};

const handleClearStorage = () => {
  clearStorage();
  console.log('Storage cleared');
};

const handleReset = () => {
  reset();
  logs.value = [];
  console.log('Fnel reset');
};
</script>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

header h1 {
  margin: 0 0 10px 0;
  color: #333;
}

header p {
  margin: 5px 0;
  color: #666;
}

section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

section h2 {
  margin: 0 0 20px 0;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background: #007bff;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.info-grid > div {
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #007bff;
}

.logs {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 10px;
  background: #f8f9fa;
}

.log-entry {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 15px;
  padding: 8px;
  border-bottom: 1px solid #dee2e6;
  font-size: 12px;
}

.log-entry:last-child {
  border-bottom: none;
}

.timestamp {
  color: #6c757d;
  font-family: monospace;
}

.event-name {
  font-weight: bold;
  color: #333;
}

.funnel, .step {
  color: #666;
}

.no-logs {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 20px;
}
</style>
