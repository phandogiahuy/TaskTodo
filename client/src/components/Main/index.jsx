import { useState } from "react";
import {
  Button,
  Icon,
  TableRow,
  TableHeaderCell,
  TableFooter,
  Table,
  Loader,
  Label,
} from "semantic-ui-react";
import { MainContainer, TextDate, Wrapper } from "./style";
import { useGetAllTask } from "../../hooks/queries/useGetAllTask";
import PaginationNumber from "./pagination";
import { Link } from "react-router-dom";
import { useDeleteTaskById } from "../../hooks/mutation/useDeleteTaskById";
import EditComponent from "../Edit";
import { useEditTaskByID } from "../../hooks/mutation/useEditTask";
import processDate from "../../utils/processDate";
const Main = () => {
  const [pagination, setPagination] = useState({
    pageSize: 8,
    page: 1,
  });
  const { data, isLoading } = useGetAllTask(pagination);
  const { mutate } = useDeleteTaskById();
  const edit = useEditTaskByID();
  if (isLoading) {
    return (
      <div>
        <Loader active inline="centered" />
      </div>
    );
  }

  let idOfTask =
    pagination.page * pagination.pageSize - pagination.pageSize + 1;

  data[0].forEach((item) => {
    item._id = idOfTask;
    idOfTask++;
  });

  //Solve with Date Time
  const { day, month, year, dayOfWeek } = processDate();
  //Menu Item with Data

  //handleleftRight of Direction in Pagination
  const handleClickRight = () => {
    if (pagination.page === data[1].pagination.pageCount) {
      setPagination({ ...pagination, page: 1 });
    } else {
      setPagination({ ...pagination, page: pagination.page + 1 });
    }
  };

  const handleClickLeft = () => {
    if (pagination.page === 1) {
      setPagination({ ...pagination, page: data[1].pagination.pageCount });
    } else {
      setPagination({ ...pagination, page: pagination.page - 1 });
    }
  };

  const handleClickDelete = (id) => {
    mutate(id);
  };
  return (
    <MainContainer className="">
      <Wrapper>
        <Link to={"/create"}>
          <Button
            icon="plus"
            content="Tạo mới"
            onClick={() => {}}
            color="blue"
          />
        </Link>
        <Table celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={4}>Check</Table.HeaderCell>
              <Table.HeaderCell width={2}>ID</Table.HeaderCell>
              <Table.HeaderCell width={7}>Name</Table.HeaderCell>
              <Table.HeaderCell width={12}>Description</Table.HeaderCell>
              <Table.HeaderCell textAlign="center" width={7}>
                Priority
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" width={5}>
                Status
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" width={3}>
                Action
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data[0].map((task) => (
              <Table.Row key={task.id}>
                <Table.Cell>
                  {!task.status && (
                    <Button
                      content="Check Done"
                      icon="checkmark"
                      labelPosition="right"
                      color="olive"
                      onClick={() => edit.mutate({ id: task.id, status: true })}
                    />
                  )}
                </Table.Cell>
                <Table.Cell>{task._id}</Table.Cell>
                <Table.Cell>{task.name}</Table.Cell>
                <Table.Cell>{task.description}</Table.Cell>
                <Table.Cell textAlign="center">
                  {task.priority === "urgent" ? (
                    <Label as="a" color="brown" size="large">
                      <Icon name="bug" />
                      Urgent
                    </Label>
                  ) : task.priority === "importance" ? (
                    <Label as="a" color="orange" size="large">
                      <Icon name="pin" />
                      Importance
                    </Label>
                  ) : (
                    <Label as="a" color="teal" size="large">
                      <Icon name="sun" />
                      Normal
                    </Label>
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {task.status ? (
                    <Label as="a" color="green" tag size="large">
                      Done
                    </Label>
                  ) : (
                    <Label as="a" tag color="red" size="large">
                      No Completed
                    </Label>
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {!task.status && (
                    <EditComponent
                      id={task.id}
                      initialName={task.name}
                      initialDescription={task.description}
                      initialPriority={task.priority}
                    />
                  )}
                  <Button
                    icon="trash"
                    secondary
                    onClick={() => handleClickDelete(task.id)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <TableFooter>
            <TableRow>
              <TableHeaderCell>
                {data[0].filter((item) => item.status).length} Done / page{" "}
                {pagination.page}
              </TableHeaderCell>
              <TableHeaderCell colSpan="3">
                <TextDate>
                  {`Thứ ${dayOfWeek} ngày ${day} tháng ${month} năm ${year}`}
                </TextDate>
              </TableHeaderCell>
              <PaginationNumber
                page={data[1].pagination}
                Click={(e, { name }) =>
                  setPagination({ ...pagination, page: name })
                }
                clickRight={handleClickRight}
                clickLeft={handleClickLeft}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Wrapper>
    </MainContainer>
  );
};

export default Main;
