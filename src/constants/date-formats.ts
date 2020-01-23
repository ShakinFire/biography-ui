export const defaultDateFormat = 'YYYY-MM-DD HH:mm';
export const ukTimestampFormat = 'HH:mm dd/MM/yy';
export const ukTimestampFormatWithMilliseconds = 'HH:mm:ss.SSS dd/MM/yy';

export const defaultRelativeTimeConfiguration = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
};

export const commentSectionRelativeTimeConfiguration = {
    future: 'in %s',
    past: '%s ago',
    s: 'less than an hour',
    ss: 'less than an hour',
    m: 'less than an hour',
    mm: 'less than an hour',
    h: 'Modified an hour',
    hh: 'Modified %d hours',
    d: 'Modified a day',
    dd: 'Modified %d days',
    M: 'Modified 8 days',
    MM: 'Modified 8 days',
    y: 'Modified 8 days',
    yy: 'Modified 8 days',
};

export const dayMonthYearCalendarFormat = {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY',
};
