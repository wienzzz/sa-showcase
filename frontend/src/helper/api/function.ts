import { addDays } from 'date-fns';

export const getWeekRange = (date: Date) => {
    let _d = date;
    let _dow = date.getDay();
    let _dateStart: any;
    let _dateEnd: any;
    switch (_dow) {
      case 0: _dateStart = addDays(_d, -6); _dateEnd = _d; break;
      case 1: _dateStart = _d; _dateEnd = addDays(_d, 6); break;
      case 2: _dateStart = addDays(_d, -1); _dateEnd = addDays(_d, 5); break;
      case 3: _dateStart = addDays(_d, -2); _dateEnd = addDays(_d, 4); break;
      case 4: _dateStart = addDays(_d, -3); _dateEnd = addDays(_d, 3); break;
      case 5: _dateStart = addDays(_d, -4); _dateEnd = addDays(_d, 2); break;
      case 6: _dateStart = addDays(_d, -5); _dateEnd = addDays(_d, 1); break;
    }

    return { beginWeek: _dateStart, endWeek: _dateEnd};
  };
