import { useMutation, useQueryClient } from "react-query";
import { GET_ALL_TASKS } from "../../constant/queryKey";
import axios from "axios";
const editTask = async ({ id, name, description, priority, status }) => {
  console.log(name, description, priority);
  const { data } = await axios.patch(`http://localhost:5000/api/task/${id}`, {
    name,
    description,
    priority,
    status,
  });
  return data;
};
const useEditTaskByID = (data) => {
  const queryClient = useQueryClient();
  return useMutation(editTask, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([GET_ALL_TASKS]);
    },
  });
};
export { useEditTaskByID };
