# Technical Context: Pokemon GO Fest Event Tracker

## Technology Stack

### Core Framework
- **React 19.1.0**: Latest React with modern hooks and concurrent features
- **TypeScript 5.8.3**: Strong typing for better development experience
- **Vite 7.0.0**: Fast build tool and dev server

### Development Tools
- **Biome 2.0.6**: Linting and formatting (replaces ESLint)
  - Custom config with space indentation and double quotes
  - Recommended rules disabled for custom configuration
  - Import organization disabled
- **Vite Plugin React 4.5.2**: React support for Vite

### Project Structure
```
src/
├── App.tsx          # Main application component
├── App.css          # Application styles
├── main.tsx         # React root mounting
├── index.css        # Global styles
├── vite-env.d.ts    # Vite type definitions
└── assets/          # Static assets
    └── react.svg
```

## Technical Requirements

### Data Management
- **Local Storage**: Persist user selections and shiny counts
- **State Management**: React useState for component state
- **Data Structure**: Structured Pokemon data with habitat categorization

### Time-Based Features
- **Current Habitat Detection**: Calculate active habitat based on local time
- **Schedule Display**: Show habitat rotation times
- **Time Zone Handling**: Work with user's local time zone

### Responsive Design
- **Mobile First**: Primary target is mobile devices
- **Touch Friendly**: Large tap targets for outdoor use
- **High Contrast**: Readable in various lighting conditions

### Performance Considerations
- **Fast Loading**: Minimal bundle size for quick startup
- **Offline Capable**: No external API dependencies
- **Smooth Interactions**: Optimistic UI updates

## Development Setup

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run Biome linting (note: script still references eslint)

### Configuration Files
- `biome.json`: Biome configuration with custom rules
- `tsconfig.json`: TypeScript configuration
- `vite.config.ts`: Vite build configuration

## Data Models

### Pokemon Data Structure
```typescript
interface Pokemon {
  id: string;
  name: string;
  habitat: HabitatType;
}

interface TrackedPokemon extends Pokemon {
  isTracked: boolean;
  shinyCount: number;
}

type HabitatType = 'moonless-volcano' | 'galvanic-dojo' | 'hypnotic-tundra' | 'fae-swamp';
```

### Habitat Schedule
```typescript
interface HabitatSchedule {
  habitat: HabitatType;
  timeSlots: Array<{
    start: string; // "10:00"
    end: string;   // "11:00"
  }>;
}
```

## Technical Constraints
- **No External APIs**: Must work offline during events
- **Browser Compatibility**: Modern browsers with ES2020+ support
- **Local Storage Limits**: Keep data structure efficient
- **Performance**: Fast interactions for real-time tracking

## Future Considerations
- **PWA Features**: Service worker for offline functionality
- **Data Export**: Ability to backup/restore tracking data
- **Multiple Events**: Support for different GO Fest events
- **Statistics**: Historical tracking across events