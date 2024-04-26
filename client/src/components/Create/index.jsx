import React, { useState } from "react";
import {
  Form,
  FormButton,
  FormInput,
  FormSelect,
  FormTextArea,
} from "semantic-ui-react";
import { ContainerPage, Text, Wrapper } from "./style";
import { useCreateTask } from "../../hooks/mutation/useCreateTask";

const CreateContainer = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Urgent");
  const { mutate } = useCreateTask();
  const handleSubmit = (e) => {
    mutate({ name, description, priority });
  };
  const option = [
    {
      text: "Urgent",
      value: "urgent",
    },
    {
      text: "Importance",
      value: "importance",
    },
    {
      text: "Normal",
      value: "normal",
    },
  ];
  return (
    <ContainerPage>
      <Wrapper>
        <Text>Create Task</Text>
        <Form size="medium" onSubmit={handleSubmit}>
          <FormInput
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e, { name, value }) => setName(value)}
            label="Name"
            required
            width={10}
          />
          <FormTextArea
            label="Description"
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e, { name, value }) => setDescription(value)}
            width={20}
            required
          />
          <FormSelect
            label="Priority"
            onChange={(e, { name, value }) => {
              setPriority(value);
            }}
            fluid
            options={option}
            value={priority}
            width={5}
          />
          <FormButton content="Create" icon="add" color="blue" />
        </Form>
      </Wrapper>
    </ContainerPage>
  );
};

export default CreateContainer;
