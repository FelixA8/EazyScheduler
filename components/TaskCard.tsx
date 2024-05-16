import { Text } from "react-native"
import { Task } from "../constants/types"

interface TaskCardProps {
    task: Task
}

const TaskCard:React.FC<TaskCardProps> = ({task}) => {
    return <Text>{task.taskTitle}</Text>
}

export default TaskCard