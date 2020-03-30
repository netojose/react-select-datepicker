# React Select date picker

## Install
### Via npm
```bash
# npm
npm install --save @netojose/react-select-datepicker
```
### Via yarn
```bash
# yarn
yarn add @netojose/react-select-datepicker
```

## Demo
You can see a working demo at this [Sandbox](https://codesandbox.io/s/select-date-picker-js6vh)

## Usage
```jsx
import React, { useState } from "react";
import SelectDatePicker from "@netojose/react-select-datepicker";

export default function App() {
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const handleChange = value => setDate(value);
  return (
    <div>
      <SelectDatePicker value={date} onDateChange={handleChange} />

      <p>Chosen date: {date.toString()}</p>
    </div>
  );
}

```

## Available Props

| Prop           | Type    | Description               | Default                             | Options                                                                                                    |
|----------------|---------|---------------------------|-------------------------------------|------------------------------------------------------------------------------------------------------------|
| value          | Date    | Current input value       | **REQUIRED**                        | -                                                                                                          |
| minDate        | Date    | Minimum date allowed      | new Date(1900, 0, 1)                | -                                                                                                          |
| maxDate        | Date    | Maximum date allowed      | new Date()                          | -                                                                                                          |
| className      | string  | Wrapper class name        | null                                | -                                                                                                          |
| css            | string  | css function              | null                                | -                                                                                                          |
| onDateChange   | func    | onChange date trigger     | **REQUIRED**                        | -                                                                                                          |
| showErrors     | boolean | Show or not error message | true                                | true, false                                                                                                |
| showLabels     | boolean | Show or not input labels  | true                                | true, false                                                                                                |
| yearLabel      | boolean | Year label text           | Year                                | Any string                                                                                                 |
| monthLabel     | boolean | Month label text          | Month                               | Any string                                                                                                 |
| dayLabel       | boolean | Day label text            | Day                                 | Any string                                                                                                 |
| errorFormat    | string  | Format error message      | 'Invalid date'                      | Any string                                                                                                 |
| errorMin       | string  | Error min value message   | 'Date must be greater than allowed' | Any string                                                                                                 |
| errorMax       | string  | Error max value message   | 'Date must be less than allowed'    | Any string                                                                                                 |
| format         | string  | Inputs position           | 'month/day/year'                    | 'day/month/year', 'day/year/month', 'month/day/year', 'month/year/day', 'year/month/day', 'year/day/month' |
| monthNames     | array   | Array with month names    | ['January', ..., 'December']        | An array with 12 strings                                                                                   |

## Notes
#### Year Select Field
* If no minDate is provided than the minium year that can be selected is 1900
* If no maxDate is provided than the maxium year that can be selected is the current

#### CSS in js integration
* The `className` prop can be useful to extend the component using [Styled-components](https://styled-components.com/)
* The `css` prop can be useful to extend the component using [Emotion](https://emotion.sh/)

## License

MIT © [netojose](https://github.com/netojose)