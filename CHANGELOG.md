# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2024-01-XX

### Added
- Initial release of @fnel/vue package
- Vue 3 plugin for global fnel integration
- `useFnel` composable for reactive fnel functionality
- `useFunnelTracking` specialized composable for funnel tracking
- Full TypeScript support with comprehensive types
- Automatic initialization and state management
- Event queuing for uninitialized state
- Local storage persistence for user IDs
- Debug information and SDK state access
- Template support via global properties

### Features
- **Plugin Integration**: Easy setup with `app.use(FnelPlugin)`
- **Composition API**: Modern Vue 3 composables for reactive state
- **Funnel Tracking**: Specialized API for tracking funnel steps
- **Auto-initialization**: Automatic SDK setup with configurable callbacks
- **Event Queuing**: Events are queued until initialization completes
- **Storage Management**: Automatic user ID persistence and cleanup
- **Error Handling**: Comprehensive error handling with callback support

### Technical Details
- Built with Vue 3 and Composition API
- TypeScript-first development
- Rollup bundling for multiple output formats
- Jest testing setup with Vue Test Utils
- ESLint configuration for Vue 3 and TypeScript
- Comprehensive documentation and examples
