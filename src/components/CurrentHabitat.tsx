import type { HabitatType } from "../types";
import { getHabitatSchedule } from "../data/pokemonData";
import { getTimeUntilNext, formatTimeRange } from "../utils/timeUtils";

interface CurrentHabitatProps {
  currentHabitat: HabitatType | null;
  nextHabitat: { habitat: HabitatType; startsAt: string } | null;
}

const CurrentHabitat = ({
  currentHabitat,
  nextHabitat,
}: CurrentHabitatProps) => {
  if (currentHabitat) {
    const schedule = getHabitatSchedule(currentHabitat);
    if (!schedule) return null;

    return (
      <div className={`current-habitat-banner ${currentHabitat}`}>
        <div className="habitat-status">
          <span className="status-indicator active">● ACTIVE NOW</span>
          <h2 className="habitat-name">{schedule.name}</h2>
        </div>

        <div className="habitat-times">
          {schedule.timeSlots.map((slot, index) => (
            <span key={index} className="time-slot">
              {formatTimeRange(slot.start, slot.end)}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (nextHabitat) {
    const schedule = getHabitatSchedule(nextHabitat.habitat);
    if (!schedule) return null;

    return (
      <div className={`current-habitat-banner ${nextHabitat.habitat} upcoming`}>
        <div className="habitat-status">
          <span className="status-indicator upcoming">○ UPCOMING</span>
          <h2 className="habitat-name">{schedule.name}</h2>
        </div>

        <div className="habitat-countdown">
          <span className="countdown-label">Starts in:</span>
          <span className="countdown-time">
            {getTimeUntilNext(nextHabitat.startsAt)}
          </span>
          <span className="start-time">at {nextHabitat.startsAt}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="current-habitat-banner no-habitat">
      <div className="habitat-status">
        <span className="status-indicator inactive">○ NO ACTIVE HABITAT</span>
        <h2 className="habitat-name">Event Not Active</h2>
      </div>

      <div className="habitat-message">
        <p>
          The GO Fest event is not currently running. Check back during event
          hours!
        </p>
      </div>
    </div>
  );
};

export default CurrentHabitat;
