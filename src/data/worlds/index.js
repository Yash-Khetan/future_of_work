import { RED_SCENARIOS, RED_INITIAL_METRICS } from './red.js';
import { BLUE_SCENARIOS, BLUE_INITIAL_METRICS } from './blue.js';

export const getWorldData = (worldId) => {
  switch (worldId) {
    case 'red':
      return { scenarios: RED_SCENARIOS, initialMetrics: RED_INITIAL_METRICS };
    case 'blue':
      return { scenarios: BLUE_SCENARIOS, initialMetrics: BLUE_INITIAL_METRICS };
    default:
      return { scenarios: RED_SCENARIOS, initialMetrics: RED_INITIAL_METRICS };
  }
};
