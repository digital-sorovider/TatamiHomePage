import React from 'react';
import moment from 'moment';
import { Timestamp } from 'firebase/firestore';

export const formatDate = (dateString, format) => {
  const date = moment(dateString);
  return date.format(format || "YYYY年MM月DD日");
}

export const FormatDate = ({date, format}) => {
  const formattedDate = formatDate(date, format);
  
  return <>{formattedDate}</>;
}

export const firestoreTimestampFormat = (data, format) => {
    Object.keys(data).map(key => {
      const timestamp = data[key]
      if(timestamp instanceof Timestamp) {
        let date = timestamp.toDate()
        if(format) {
          date = formatDate(date)
        }

        data[key] = date
      }

    })

    return data
}

const monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export const months = monthNumbers.map(number => ({ id: number, name: `${number}月`, }))

export const nowMonth = moment().month() + 1
export const nowYear = moment().year()

let yearInfos = []
for (let year = 2020; year <= nowYear; year++) {
  yearInfos.push({ id: year, name: `${year}年`, });
}

export const years = yearInfos
