package com.acen.ikogc.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateUtil {

	/** String을 Date형으로 변경 **/
	public static Date stringToDate(String str, String pattern) {
		DateFormat dateFormat = new SimpleDateFormat(pattern);
		Date date = null;
		try {
			date = dateFormat.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	/** Date형을 String형으로 변경 **/
	public static String dateToString(Date date, String pattern) {
		DateFormat dateFormat = new SimpleDateFormat(pattern);
		return dateFormat.format(date);
	}

	/**
	 * 시를 변경한다.
	 */
	public static Date getModifyHour(Date date, int hour) {
		Calendar cal = new GregorianCalendar();
		cal.setTime(date);
		cal.add(Calendar.HOUR, hour);

		return cal.getTime();
	}

	/**
	 * 일을 변경한다.
	 */
	public static Date getModifyDay(Date date, int day) {
		Calendar cal = new GregorianCalendar();
		cal.setTime(date);
		cal.add(Calendar.DATE, day);

		return cal.getTime();
	}

	/**
	 * 월을 변경한다.
	 */
	public static Date getModifyMonth(Date date, int month) {
		Calendar cal = new GregorianCalendar();
		cal.setTime(date);
		cal.add(Calendar.MONTH, month);

		return cal.getTime();
	}

	/**
	 * 년을 변경한다.
	 */
	public static Date getModifyYear(Date date, int year) {
		Calendar cal = new GregorianCalendar();
		cal.setTime(date);
		cal.add(Calendar.YEAR, year);

		return cal.getTime();
	}

	/**
	 * 두 날짜의 차이를 구한다.
	 */
	public static int diffOfDate(Date beginDate, Date endDate) {
		if(beginDate == null || endDate == null) return 0;
		long diff = endDate.getTime() - beginDate.getTime();
		return (int) (diff / (24 * 60 * 60 * 1000));
	}

}
