const SEC_TO_MILLI = 1000;
const MIN_TO_MILLI = 60 * SEC_TO_MILLI;
const HOUR_TO_MILLI = 60 * MIN_TO_MILLI;
const DAY_TO_MILLI= 24 * HOUR_TO_MILLI;

const timeString = {
  ko: {
    sec: '초',
    min: '분',
    hour: '시간',
  },
  en: {
    sec: 's',
    min: 'm',
    hour: 'h',
  },
} as const;

export type Lang = keyof typeof timeString;

class TimesAgo {
  private readonly currentTime;
  private readonly timeUnit;

  constructor(lang: Lang) {
    this.currentTime = Date.now();
    this.timeUnit = timeString[lang];
  }

  getTimesAgo(time: number): string {
    const diff = this.currentTime - time;
    if (diff < MIN_TO_MILLI) return Math.floor(diff / SEC_TO_MILLI) + this.timeUnit.sec;
    if (diff < HOUR_TO_MILLI) return Math.floor(diff / MIN_TO_MILLI) + this.timeUnit.min;
    if (diff < DAY_TO_MILLI) return Math.floor(diff / HOUR_TO_MILLI) + this.timeUnit.hour;
    return new Date(time - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
  }
}

export { TimesAgo };
