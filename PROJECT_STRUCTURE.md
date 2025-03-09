# Meak Project Structure and Organization

## Current Structure Analysis

The Meak application is a React Native app built with Expo and Supabase, focusing on connecting Moroccan homeowners with local service providers. The current structure follows Expo Router's file-based routing system with some organization, but there are opportunities for improvement.

### Key Directories

- **app/**: Contains all the screens organized by route groups
  - **(app)**: Main application screens
  - **(auth)**: Authentication-related screens
  - **(tabs)**: Tab-based navigation screens
- **components/**: Reusable UI components
- **constants/**: Application constants including theme definitions
- **hooks/**: Custom React hooks
- **i18n/**: Internationalization files (currently only Arabic)
- **lib/**: Utility libraries (currently only Supabase client)
- **store/**: State management (using Zustand)
- **types/**: TypeScript type definitions

## Recommended Improvements

### 1. Component Organization

Currently, all components are in the root of the `components/` directory. Recommend organizing by feature or type:

```
components/
  auth/
    AuthButton.tsx
    AuthInput.tsx
    SocialButtons.tsx
  layout/
    Header.tsx
    TabBar.tsx
  common/
    Button.tsx
    Input.tsx
    Modal.tsx
  provider/
    ProviderCard.tsx
    RatingDisplay.tsx
```

### 2. Hooks Organization

Expand the hooks directory to include more custom hooks by feature:

```
hooks/
  useAuth.ts (move from store/auth.ts)
  useBookings.ts
  useProviders.ts
  useFrameworkReady.ts
```

### 3. Services Layer

Add a services directory to handle API calls and business logic:

```
services/
  auth.service.ts
  bookings.service.ts
  providers.service.ts
  profiles.service.ts
```

### 4. Utils Directory

Add a utils directory for helper functions:

```
utils/
  date.utils.ts
  validation.utils.ts
  formatting.utils.ts
```

### 5. Theme and Styling Improvements

Refactor the theme constants for better organization:

```
constants/
  theme/
    colors.ts
    typography.ts
    spacing.ts
    index.ts (exports all theme elements)
```

### 6. Consistent Styling Approach

Standardize the styling approach across components - currently there's a mix of inline styles and StyleSheet objects.

### 7. Internationalization Enhancement

Improve i18n structure to support multiple languages:

```
i18n/
  ar.ts
  en.ts
  fr.ts
  index.ts (language selection logic)
```

### 8. Type Definitions

Expand type definitions for better code safety:

```
types/
  database.ts
  navigation.ts
  theme.ts
  components.ts
```

### 9. Environment Configuration

Implement proper environment configuration:

```
.env.development
.env.production
env.d.ts (type definitions for environment variables)
```

### 10. Testing Structure

Add a testing structure:

```
__tests__/
  components/
  hooks/
  services/
```

## Implementation Plan

1. Create the directory structure first
2. Move and refactor components into their appropriate directories
3. Extract service logic from components into service files
4. Implement consistent styling approach
5. Enhance type definitions
6. Add documentation for the new structure

This reorganization will improve code maintainability, readability, and scalability while making it easier for new developers to understand the project structure.