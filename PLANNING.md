# SERP Tools Architecture Planning

## Current State
- Monolithic Nuxt 3 application with all tools built-in
- Tools are pages within the main app
- Some tools in `/tools/` (public), others in `/dashboard/[team]/` (team-specific)

## Proposed Architecture: Modular Tools with GitHub Packages

### Benefits
- **Selective open-sourcing**: Choose which tools to make public
- **Independent development**: Each tool can have its own release cycle
- **Community contributions**: Open tools can receive PRs from developers
- **Smaller main repo**: Easier to maintain and faster builds
- **Better separation of concerns**: Each tool is self-contained

### Repository Structure
```
serp-company/
├── serp-apps/              # Main dashboard (private) - consumes tools
├── serp-ui/                # Shared UI components (could be public on npm)
├── serp-video-embedder/    # Public tool (npm)
├── serp-screenshot-tool/   # Private tool (GitHub Packages)
├── serp-keyword-finder/    # Private tool (GitHub Packages)
└── serp-rank-tracker/      # Private tool (GitHub Packages)
```

### Package Distribution Strategy
- **Public tools**: Published to npm (free)
- **Private tools**: Published to GitHub Packages (free for private repos)
- **Shared UI**: Could be public on npm to showcase design system

## Implementation Plan

### Phase 1: Setup Infrastructure
1. Create GitHub organization if not exists
2. Set up GitHub Packages authentication
3. Create shared UI components package
4. Document the process

### Phase 2: Extract First Tool
Start with video embedder (good candidate for open source):
1. Create new repository
2. Extract components and logic
3. Set up build process
4. Publish to npm
5. Update main app to consume package

### Phase 3: Extract Private Tools
1. Screenshot tool → GitHub Packages
2. Other dashboard tools → GitHub Packages
3. Update CI/CD for private package access

### Phase 4: Optimize Main App
1. Remove extracted code
2. Update routing if needed
3. Implement lazy loading for tools
4. Update documentation

## Technical Considerations

### Tool Package Structure
```typescript
// Each tool exports:
export {
  // Vue components
  ToolForm,
  ToolPreview,
  ToolSettings,
  
  // Composables
  useToolLogic,
  useToolAPI,
  
  // Types
  ToolConfig,
  ToolResult,
  
  // Nuxt module (optional)
  default as ToolModule
}
```

### Integration Options

**Option 1: Direct Component Import** (Simplest)
```vue
<script setup>
import { VideoEmbedder } from '@serp-tools/video-embedder'
</script>
```

**Option 2: Nuxt Modules** (Most integrated)
```js
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@serp-company/screenshot-tool',
    '@serp-tools/video-embedder'
  ]
})
```

**Option 3: Dynamic Loading** (Most flexible)
```js
const tool = await import('@serp-tools/video-embedder')
```

## Authentication Flow

### GitHub Packages Setup
1. **CI/CD**: Use `GITHUB_TOKEN` in workflows (automatic)
2. **Local Dev**: Personal Access Token with `read:packages`
3. **Production**: GitHub App or deploy token

### Example .npmrc
```
@serp-company:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## Migration Strategy

### Keep Both Versions Initially
1. Extract tool to package
2. Keep original in main app
3. Gradually migrate to package version
4. Remove original once stable

### Maintain Backwards Compatibility
- Keep same component names
- Preserve existing APIs
- Document breaking changes

## Open Source Considerations

### Good Candidates for Open Source
- Video embedder (developer tool)
- Meta tag analyzer
- Schema markup validator
- Any tool that benefits developers

### Should Remain Private
- Keyword research tools
- Rank tracking
- Competitor analysis
- Any tool with proprietary algorithms

## Success Metrics
- Reduced main app bundle size
- Faster CI/CD builds
- Number of community contributions
- Ease of adding new tools
- Developer satisfaction

## Next Steps
1. Choose first tool to extract (video embedder recommended)
2. Set up GitHub Packages authentication
3. Create tool template/boilerplate
4. Begin extraction process
5. Document lessons learned