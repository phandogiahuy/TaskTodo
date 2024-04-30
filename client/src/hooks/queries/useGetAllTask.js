import axios from "axios";
import { useQuery } from "react-query";

import { GET_ALL_TASKS } from "../../constant/queryKey";

const getTasks = async ({ pageSize, page, sort, name }) => {
  const { data } = await axios.get(`http://localhost:5000/api/task`, {
    params: {
      pageSize,
      page,
      sort,
      name,
    },
  });
  return data;
};
const useGetAllTask = ({ pageSize, page, sort, name }) =>
  useQuery([GET_ALL_TASKS, { pageSize, page, sort, name }], () =>
    getTasks({ pageSize, page, sort, name })
  );
export { useGetAllTask };
