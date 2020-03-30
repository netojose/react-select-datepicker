export function range(start, end) {
    var arr = [];
    for (var i = start; i <= end; i += 1) {
      arr.push(i);
    }
    return arr;
  }
  
  export function isValidDate(year, month, day) {
    const date = new Date();
    date.setFullYear(year, month, day);
    if (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    )
      return true;
  
    return false;
  }
  
  export function dayPad(value) {
    return String(value).padStart(2, "0");
  }
  
  export function dateToValues(value) {
    return value
      ? {
          day: value.getDate(),
          month: value.getMonth(),
          year: value.getFullYear()
        }
      : { day: "", month: "", year: "" };
  }
  
  export default {};
  