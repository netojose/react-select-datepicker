import React, { useMemo, useState, useCallback, useEffect } from "react";

import Field from "./Field";
import { range, isValidDate, dayPad, dateToValues } from "./utils";

const INVALID_FORMAT = 'INVALID_FORMAT'
const INVALID_MIN = 'INVALID_MIN'
const INVALID_MAX = 'INVALID_MAX'

export default ({
  value,
  minDate,
  maxDate,
  className,
  css,
  onDateChange,
  showErrors = true,
  showLabels = true,
  yearLabel = "Year",
  monthLabel = "Month",
  dayLabel = "Day",
  errorFormat = "Invalid date",
  errorMin = "Date must be greater than allowed",
  errorMax = "Date must be less than allowed",
  format = "month/day/year",
  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}) => {
  const initialValue = useMemo(() => dateToValues(value), [value]);
  const startDate = useMemo(() => (minDate || new Date(1900, 0, 1)), [minDate])
  const endDate = useMemo(() => (maxDate || new Date()), [maxDate]);
  const firstYear = useMemo(() => startDate.getFullYear(), [startDate]);
  const lastYear = useMemo(() => endDate.getFullYear(), [endDate]);
  const fields = useMemo(() => format.split("/"), [format]);
  const yearRange = useMemo(() => range(firstYear, lastYear), [firstYear, lastYear]);
  const dayRange = useMemo(() => range(1, 31), []);
  const errors = useMemo(() => ({INVALID_FORMAT: errorFormat, INVALID_MIN: errorMin, INVALID_MAX: errorMax}), [errorFormat, errorMin, errorMax]);

  const [values, setValues] = useState(initialValue);
  const [validationError, setValidationError] = useState(null);

  useEffect(() => {
    if (value) {
      setValues(dateToValues(value));
    } else if (value === '') {
      setValues(dateToValues(null));
    }
  }, [value]);

  const handleChange = useCallback(
    e => {
      const inpValue = parseInt(e.target.value, 10);
      const { field } = e.target.dataset;
      const nv = { ...values, [field]: inpValue };
      const isValid = isValidDate(nv.year, nv.month, nv.day);
      const send = isValid ? new Date(nv.year, nv.month, nv.day) : null;
      let errorType = null

      if(send){
        if (send.getTime() > endDate.getTime()) {
            errorType = INVALID_MAX;
        } else if (send.getTime() < startDate.getTime()) {
            errorType = INVALID_MIN;
        }
      } else if (nv.year && nv.month && nv.day) {
        errorType = INVALID_FORMAT;
      }

      setValues(nv);
      onDateChange(send);
      setValidationError(errorType)
    },
    [values, onDateChange, endDate, startDate]
  );

  const labels = useMemo(
    () => ({ day: dayLabel, month: monthLabel, year: yearLabel }),
    [dayLabel, monthLabel, yearLabel]
  );


  const options = useMemo(
    () => ({ day: dayRange, month: monthNames, year: yearRange }),
    [dayRange, monthNames, yearRange]
  );

  const cls = useMemo(
    () => [className, validationError ? "has-error" : null].join(" ").trim() || null,
    [className, validationError]
  );

  return (
    <div className={cls} css={css}>
      {fields.map(field => (
        <Field
          key={field}
          items={options[field]}
          label={labels[field]}
          showLabel={showLabels}
          value={values[field]}
          onChange={handleChange}
          name={field}
          renderOption={field === "day" ? v => dayPad(v) : null}
          generateValue={field === "month" ? (_, index) => index : null}
        />
      ))}

      {validationError && showErrors && <p>{errors[validationError]}</p>}
    </div>
  );
};
