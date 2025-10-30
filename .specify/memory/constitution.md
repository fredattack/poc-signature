<!--
Sync Impact Report:
Version: 0.0.0 → 1.0.0
Change Type: INITIAL CREATION

Modified Principles:
- N/A (initial creation)

Added Sections:
- All core principles (I-V)
- Technical Standards section
- Development Workflow section
- Governance section

Removed Sections:
- N/A (initial creation)

Templates Status:
✅ plan-template.md - Reviewed, compatible with constitution principles
✅ spec-template.md - Reviewed, compatible with user story requirements
✅ tasks-template.md - Reviewed, compatible with task organization principles

Follow-up TODOs:
- None at this time
-->

# React Native Mobile Application Constitution

## Core Principles

### I. Component-First Architecture

Every feature MUST be built as reusable, self-contained React components following functional programming patterns with hooks. Components MUST:

- Be independently testable with clear props interfaces
- Follow single responsibility principle (one concern per component)
- Document their purpose and usage via TypeScript types and JSDoc
- Separate presentation (UI) from business logic (hooks/services)

**Rationale**: React Native's component model is the foundation of maintainability. Self-contained components enable parallel development, easier testing, and clearer code ownership.

### II. Type Safety (NON-NEGOTIABLE)

TypeScript MUST be used for all application code with strict mode enabled. Type safety requirements:

- All function parameters and return types MUST be explicitly typed
- No `any` types except when interfacing with untyped third-party libraries (must be documented)
- Shared types MUST be defined in centralized type definition files
- Props interfaces MUST be exported and documented

**Rationale**: TypeScript catches bugs at compile time, improves IDE support, serves as living documentation, and enables confident refactoring. This is non-negotiable for production mobile applications.

### III. Cross-Platform Compatibility

Code MUST run consistently on both iOS and Android unless platform-specific functionality is explicitly required and documented. When platform-specific code is necessary:

- Use React Native's Platform API to handle differences
- Document why platform-specific code is needed
- Ensure feature parity unless UX guidelines dictate otherwise
- Test on both platforms before marking complete

**Rationale**: React Native's value proposition is cross-platform development. Maintaining compatibility reduces maintenance burden and ensures feature parity for all users.

### IV. Performance & User Experience

Application MUST maintain 60 FPS during normal operation and provide responsive user feedback. Performance requirements:

- List rendering MUST use FlatList/SectionList with proper optimization
- Images MUST be optimized and lazy-loaded where appropriate
- Navigation transitions MUST be smooth and predictable
- Loading states MUST be shown for operations >200ms
- Offline functionality MUST be considered for core features

**Rationale**: Mobile users expect instant feedback and smooth animations. Poor performance directly impacts user retention and app store ratings.

### V. Testing & Quality Assurance

Testing strategy MUST cover component behavior, user flows, and critical business logic. Required testing:

- Component tests using React Native Testing Library for UI logic
- Integration tests for user flows spanning multiple screens
- Type checking via TypeScript compiler in CI/CD
- Manual testing on physical devices (iOS and Android) before release

**Rationale**: Automated testing catches regressions, enables confident refactoring, and documents expected behavior. Physical device testing catches platform-specific issues simulators miss.

## Technical Standards

### Technology Stack

**Core Framework**:
- Expo SDK: ~51.0.0
- React: 18.2.0
- React Native: 0.74.0
- TypeScript: ~5.3.0

**Required Practices**:
- Use Expo managed workflow unless native modules require bare workflow
- Follow Expo best practices for build and deployment
- Use Expo's built-in APIs before adding third-party dependencies
- Document all deviations from Expo standards

### Code Organization

**File Structure**:
- Components in `src/components/` organized by feature or shared
- Screens in `src/screens/` matching navigation structure
- Services/hooks in `src/services/` and `src/hooks/`
- Types in `src/types/` for shared type definitions
- Assets in `assets/` organized by type (images, fonts, etc.)

**Naming Conventions**:
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- Services: camelCase (e.g., `apiService.ts`)
- Types: PascalCase with descriptive suffix (e.g., `UserProfileProps`)

### State Management

- Use React Context for global app state (auth, theme, etc.)
- Use local component state (useState/useReducer) by default
- Consider state management library (Zustand, Redux Toolkit) only when Context becomes unwieldy
- Document state management decisions in plan.md

### API & Data Fetching

- Use async/await for all asynchronous operations
- Implement proper error handling with user-friendly messages
- Cache API responses where appropriate
- Consider offline support with local storage (AsyncStorage, SQLite)

## Development Workflow

### Feature Development Process

1. **Specification**: Create detailed spec with user stories and acceptance criteria
2. **Planning**: Define component hierarchy, data flow, and technical approach
3. **Implementation**: Build feature following task breakdown
4. **Testing**: Verify on both platforms, automated tests if required
5. **Review**: Code review focusing on TypeScript types, performance, and UX
6. **Validation**: User acceptance testing on physical devices

### Code Review Requirements

All code MUST be reviewed before merging. Reviewers MUST verify:

- TypeScript types are explicit and accurate
- Components follow single responsibility principle
- Performance considerations (FlatList usage, image optimization)
- Cross-platform compatibility
- User experience feedback (loading states, error messages)
- Test coverage for critical paths (if tests required)

### Quality Gates

Before considering a feature complete:

- TypeScript compilation MUST succeed with no errors
- App MUST run on both iOS and Android simulators/devices
- No console warnings or errors during normal operation
- Performance profiling shows 60 FPS during key interactions
- All acceptance criteria from spec.md MUST be met

## Governance

### Constitutional Authority

This constitution supersedes all other development practices for this project. When conflicts arise:

1. Constitution principles take precedence
2. Team discusses whether constitution needs amendment
3. Constitution is updated following amendment process below

### Amendment Process

Constitutional changes require:

1. Written proposal documenting the change and rationale
2. Impact assessment on existing code and templates
3. Team consensus on the change
4. Version bump following semantic versioning:
   - **MAJOR**: Removing or redefining core principles
   - **MINOR**: Adding new principles or expanding guidance
   - **PATCH**: Clarifications, typo fixes, non-semantic improvements
5. Update all dependent templates and documentation

### Compliance & Exceptions

- All pull requests MUST verify constitutional compliance
- Violations MUST be justified in plan.md Complexity Tracking section
- Justified exceptions do not set precedent for future violations
- Regular reviews to identify systematic violations requiring amendment

### Version Control

All constitutional changes MUST:

- Update version number in this file
- Document change in Sync Impact Report (HTML comment at top)
- Update LAST_AMENDED_DATE to current date
- Propagate changes to affected templates and documentation

**Version**: 1.0.0 | **Ratified**: 2025-10-27 | **Last Amended**: 2025-10-27
