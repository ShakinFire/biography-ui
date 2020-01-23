import { Injectable } from '@angular/core';
import {
  commentSectionRelativeTimeConfiguration,
  defaultDateFormat,
  defaultRelativeTimeConfiguration,
  dayMonthYearCalendarFormat,
} from '../../constants/date-formats';
// const moment = require('moment');
import * as moment from 'moment';
import * as config from '../../config/config.json';
import { IBiography } from '../../interfaces/biography.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BiographyService {

  constructor(private readonly http: HttpClient) { }

  public getBiographies(): Observable<IBiography[]> {
    return this.http.get<IBiography[]>(`${config.apiUrl}/biography`);
  }

  public updateBiography(biography: IBiography): Observable<IBiography> {
    return this.http.put<IBiography>(`${config.apiUrl}/biography/${biography.id}`, biography);
  }

  public convertDateFormat(commentDate: Date): string {
    moment.updateLocale('en', { relativeTime: commentSectionRelativeTimeConfiguration });
    const utcTime = moment.utc(commentDate, defaultDateFormat).local().format(defaultDateFormat);
    const momentRelativeTime = moment(utcTime, defaultDateFormat).utc().fromNow();
    moment.updateLocale('en', { relativeTime: defaultRelativeTimeConfiguration });
    const splittedMomentRelativeTime = momentRelativeTime.split(' ');
    const lastUpdate = this.updateLastModifiedWorkstream(momentRelativeTime, splittedMomentRelativeTime, commentDate);

    return lastUpdate;
  }

  private updateLastModifiedWorkstream(relativeTime: string, splittedRelativeTime: string[], originalTimeStamp: Date): string {
    const hourIndex = splittedRelativeTime.length - 2;
    const modifiedYesterday = 'Modified yesterday';
    const modifiedADayAgo = 'Modified a day ago';
    const daysInAWeek = 7;
    const timeAgo = splittedRelativeTime[1] || '0';
    const notModifiedInHour = splittedRelativeTime[hourIndex] !== 'hour';
    const notModifiedInHours = splittedRelativeTime[hourIndex] !== 'hours';
    const isMoreThanSevenDays = parseInt(timeAgo, 10) > daysInAWeek;

    if (relativeTime === modifiedADayAgo) {
        return modifiedYesterday;
    }

    if (
        notModifiedInHour &&
        notModifiedInHours &&
        isMoreThanSevenDays
    ) {
        return `Modified ${moment(originalTimeStamp).calendar(null, dayMonthYearCalendarFormat)}`;
    }

    return relativeTime;
  }
}
