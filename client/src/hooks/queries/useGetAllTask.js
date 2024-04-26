import axios from "axios";
import { useQuery } from "react-query";

import { GET_ALL_TASKS } from "../../constant/queryKey";

const getTasks = async ({ pageSize, page }) => {
  const { data } = await axios.get(`http://localhost:5000/api/task`, {
    params: {
      pageSize,
      page,
    },
  });
  return data;
};
const useGetAllTask = ({ pageSize, page }) =>
  useQuery([GET_ALL_TASKS,{ pageSize, page }], () => getTasks({ pageSize, page }));
export { useGetAllTask };
