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
    if (diff < 60000) return Math.floor(diff / 1000) + this.timeUnit.sec;
    if (diff < 3600000) return Math.floor(diff / 60000) + this.timeUnit.min;
    if (diff < 86400000) return Math.floor(diff / 3600000) + this.timeUnit.hour;
    return new Date(time - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
  }
}

export { TimesAgo };
