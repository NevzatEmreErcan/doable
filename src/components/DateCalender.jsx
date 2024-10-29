import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const DateCalender = ({ handleSpecificDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleSpecificDateChange(date);
  };

  return (
    <DatePicker
      dateFormat={"yyyy/MM/dd"}
      selected={selectedDate}
      onChange={handleDateChange}
      inline
      calendarClassName="bg-transparent"
      dayClassName={(date) =>
        "text-white" + (date === selectedDate ? " bg-primary-500 " : "")
      }
    />
  );
};

export default DateCalender;
