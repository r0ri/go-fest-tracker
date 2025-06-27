# Pokemon GO Fest Event Tracker

## Project Overview
A TypeScript React application to track Pokemon GO Fest event spawns and shiny catches during the event's habitat rotations.

## Core Requirements

### Event Structure
The Pokemon GO Fest event features 4 distinct habitats that rotate throughout the day:

1. **Moonless Volcano**: 10:00-11:00 AM & 2:00-3:00 PM local time
2. **Galvanic Dojo**: 11:00 AM-12:00 PM & 3:00-4:00 PM local time  
3. **Hypnotic Tundra**: 12:00-1:00 PM & 4:00-5:00 PM local time
4. **Fae Swamp**: 1:00-2:00 PM & 5:00-6:00 PM local time

### Pokemon Spawns by Habitat

**Moonless Volcano**: Houndour, Numel, Duskull, Gothita, Golett, Fletchling, Flabébé (Red Flower), Skrelp, Fuecoco, Carbink

**Galvanic Dojo**: Machop, Electabuzz, Teddiursa, Scraggy, Chespin, Flabébé (Yellow Flower), Pancham, Dedenne, Crabrawler, Mienfoo

**Hypnotic Tundra**: Alolan Sandshrew, Swinub, Spheal, Piplup, Snover, Munna, Elgyem, Flabébé (Blue Flower), Bergmite, Frigibax

**Fae Swamp**: Clefairy, Tentacool, Mawile, Gulpin, Venipede, Popplio, Mareanie, Morelull, Togetic, Flabébé (Orange Flower)

## Functional Requirements

### Phase 1: Initial Setup
- User selects which Pokemon they want to track from each habitat
- System stores user's tracking preferences
- Display selected Pokemon with initial shiny count of 0

### Phase 2: Tracking Interface
- Manual entry system for caught shiny Pokemon
- Increment/decrement counters for each tracked Pokemon
- Visual display of current shiny counts
- Clear indication of which habitat is currently active based on time

## Success Criteria
- Intuitive setup process for selecting Pokemon to track
- Easy manual tracking of shiny catches
- Clear visual feedback on current progress
- Responsive design for mobile use during the event

## Technical Constraints
- Must work offline (local storage for persistence)
- Mobile-first responsive design
- Fast loading and interaction times
- No external API dependencies required