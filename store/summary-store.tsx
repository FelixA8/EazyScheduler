import { ReactNode, createContext, useState } from "react";

interface MyComponentProps {
  children: ReactNode;
}

export const SummaryContext = createContext({
  totalTasksCompleted: 0,
  totalTasksUnfinished: 0,
  productivityRate: 0,
  countProductivityRate: (
    important: number,
    notImportant: number,
    urgent: number,
    notUrgent: number
  ) => {},
  countTotalTaskCompleted: (total: number) => {},
  countTotalUnfinishedTask: (total: number) => {},
});

const SummaryContextProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0);
  const [totalTasksUnfinished, setTotalTasksUnfnished] = useState(0);
  const [productivityRate, setProductivityRate] = useState(0);

  function countProductivityRate(
    important: number,
    notImportant: number,
    urgent: number,
    notUrgent: number
  ) {
    const point = important * 1.5 + notImportant + urgent * 1.5 + notUrgent / 7;
    setProductivityRate(point);
  }

  function countTotalTaskCompleted(total: number) {
    setTotalTasksCompleted(total);
  }

  function countTotalUnfinishedTask(total: number) {
    setTotalTasksUnfnished(total);
  }

  const value = {
    totalTasksCompleted: totalTasksCompleted,
    totalTasksUnfinished: totalTasksUnfinished,
    productivityRate: productivityRate,
    countProductivityRate: countProductivityRate,
    countTotalTaskCompleted: countTotalTaskCompleted,
    countTotalUnfinishedTask: countTotalUnfinishedTask,
  };
  return (
    <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>
  );
};

export default SummaryContextProvider;
