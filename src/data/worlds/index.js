import { RED_SCENARIOS, RED_INITIAL_METRICS } from './red.js';
import { BLUE_SCENARIOS, BLUE_INITIAL_METRICS } from './blue.js';
import { GREEN_SCENARIOS, GREEN_INITIAL_METRICS } from './green.js';
import { YELLOW_SCENARIOS, YELLOW_INITIAL_METRICS } from './yellow.js';

export const getWorldData = (worldId) => {
  switch (worldId) {
    case 'red':
      return { scenarios: RED_SCENARIOS, initialMetrics: RED_INITIAL_METRICS };
    case 'blue':
      return { scenarios: BLUE_SCENARIOS, initialMetrics: BLUE_INITIAL_METRICS };
    case 'green':
      return { scenarios: GREEN_SCENARIOS, initialMetrics: GREEN_INITIAL_METRICS };
    case 'yellow':
      return { scenarios: YELLOW_SCENARIOS, initialMetrics: YELLOW_INITIAL_METRICS };
    default:
      return { scenarios: RED_SCENARIOS, initialMetrics: RED_INITIAL_METRICS };
  }
};
