import type { HabitatType } from "../types";
import { HABITAT_SCHEDULES } from "../data/pokemonData";

export const getCurrentHabitat = (): HabitatType | null => {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  for (const schedule of HABITAT_SCHEDULES) {
    for (const timeSlot of schedule.timeSlots) {
      if (isTimeInRange(currentTime, timeSlot.start, timeSlot.end)) {
        return schedule.habitat;
      }
    }
  }

  return null;
};

export const isTimeInRange = (
  currentTime: string,
  startTime: string,
  endTime: string
): boolean => {
  const current = timeToMinutes(currentTime);
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);

  return current >= start && current < end;
};

export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const getNextHabitat = (): {
  habitat: HabitatType;
  startsAt: string;
} | null => {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  const currentMinutes = timeToMinutes(currentTime);

  // Find the next upcoming time slot
  let nextSlot: {
    habitat: HabitatType;
    startsAt: string;
    startMinutes: number;
  } | null = null;

  for (const schedule of HABITAT_SCHEDULES) {
    for (const timeSlot of schedule.timeSlots) {
      const startMinutes = timeToMinutes(timeSlot.start);

      if (startMinutes > currentMinutes) {
        if (!nextSlot || startMinutes < nextSlot.startMinutes) {
          nextSlot = {
            habitat: schedule.habitat,
            startsAt: timeSlot.start,
            startMinutes,
          };
        }
      }
    }
  }

  if (nextSlot) {
    return {
      habitat: nextSlot.habitat,
      startsAt: nextSlot.startsAt,
    };
  }

  return null;
};

export const getTimeUntilNext = (targetTime: string): string => {
  const now = new Date();
  const currentMinutes = timeToMinutes(
    `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`
  );
  const targetMinutes = timeToMinutes(targetTime);

  let diff = targetMinutes - currentMinutes;

  // If target is tomorrow (past midnight)
  if (diff < 0) {
    diff += 24 * 60; // Add 24 hours in minutes
  }

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export const formatTimeRange = (start: string, end: string): string => {
  // Convert 24-hour to 12-hour format for display
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return `${formatTime(start)} - ${formatTime(end)}`;
};

export const getAllHabitatTimes = (): Array<{
  habitat: HabitatType;
  name: string;
  timeRanges: string[];
}> => {
  return HABITAT_SCHEDULES.map((schedule) => ({
    habitat: schedule.habitat,
    name: schedule.name,
    timeRanges: schedule.timeSlots.map((slot) =>
      formatTimeRange(slot.start, slot.end)
    ),
  }));
};

export const getCurrentDay = (): "saturday" | "sunday" | "other" => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday

  if (dayOfWeek === 6) return "saturday";
  if (dayOfWeek === 0) return "sunday";
  return "other";
};

export const isSaturday = (): boolean => {
  return getCurrentDay() === "saturday";
};

export const isSunday = (): boolean => {
  return getCurrentDay() === "sunday";
};

export const isWeekend = (): boolean => {
  const day = getCurrentDay();
  return day === "saturday" || day === "sunday";
};
