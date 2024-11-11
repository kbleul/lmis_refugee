import moment from 'moment';

export const convertDate = (date: Date) => {
  // convert date timestamp to readable
  if (date) {
    const _newDate = moment(date).format('MMMM Do, YYYY'); //h:mm:ss A
    return _newDate;    
  }
};


export const convertTime = (date: Date) => {
  if (date) {
    return moment(date).format('h:mm a');
  }
};