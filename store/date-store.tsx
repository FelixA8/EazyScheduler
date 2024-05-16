import { ReactNode, createContext, useState } from "react";

interface MyComponentProps {
  children: ReactNode;
}

export const DateContext = createContext({
  selectedDate: new Date(),
  changeSelectedDate: (date: Date) => {},
});

const DateContextProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  function changeSelectedDate(date: Date) {
    setCurrentDate(date);
  }
  const value = {
    selectedDate: currentDate,
    changeSelectedDate: changeSelectedDate,
  };
  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};

export default DateContextProvider;
