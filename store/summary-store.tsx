import { ReactNode, createContext, useState } from "react";

interface MyComponentProps {
  children: ReactNode;
}
export const SummaryContext = createContext({
  totalTasksincompleted: 0,
  totalTasksFinished: 0,
  productivityRate: 0,
  countProductivityRate: (
    important: number,
    notImportant: number,
    urgent: number,
    notUrgent: number
  ) => {},
  countTotalTaskIncompleted: (total: number) => {},
  countTotalFinishedTask: (total: number) => {},
});

const SummaryContextProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [totalTasksincompleted, setTotalTasksIncompleted] = useState(0);
  const [totalTasksFinished, setTotalTasksFinished] = useState(0);
  const [productivityRate, setProductivityRate] = useState(0);

  function countProductivityRate(
    important: number,
    notImportant: number,
    urgent: number,
    notUrgent: number
  ) {
    const point = ((important*1.5)+(notImportant)+(urgent*1.5)+(notUrgent)/7)
    setProductivityRate(point);
  }

  function countTotalFinishedTask(total: number) {
    setTotalTasksFinished(total);
  }

  function countTotalTaskIncompleted(total: number) {
    setTotalTasksIncompleted(total);
  }

  const value = {
    totalTasksincompleted: totalTasksincompleted,
    totalTasksFinished: totalTasksFinished,
    productivityRate: productivityRate,
    countProductivityRate: countProductivityRate,
    countTotalTaskIncompleted: countTotalTaskIncompleted,
    countTotalFinishedTask: countTotalFinishedTask,
  };
  return (
    <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>
  );
};

export default SummaryContextProvider;
