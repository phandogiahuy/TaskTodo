import { useMutation, useQueryClient } from "react-query";
import { GET_ALL_TASKS } from "../../constant/queryKey";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const createTask = async ({ name, description, priority }) => {
  const { data } = await axios.post(`http://localhost:5000/api/task`, {
    name,
    description,
    priority,
  });
  return data;
};
const useCreateTask = (data) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(createTask, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([GET_ALL_TASKS]);
      navigate("/");
    },
  });
};
export { useCreateTask };
