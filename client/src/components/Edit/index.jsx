import React, { useState } from "react";
import {
  Button,
  Form,
  FormInput,
  FormSelect,
  FormTextArea,
  Header,
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
} from "semantic-ui-react";
import { useEditTaskByID } from "../../hooks/mutation/useEditTask";

const EditComponent = ({
  id,
  initialName,
  initialDescription,
  initialPriority,
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [priority, setPriority] = useState(initialPriority);
  console.log(initialPriority)
  const { mutate } = useEditTaskByID();
  const handleSubmit = (e) => {
    mutate({ name: name, description: description, priority: priority, id });
    setOpen(false);
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
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon="edit" primary></Button>}
    >
      <ModalHeader>Edit A Task</ModalHeader>
      <ModalContent image>
        <ModalDescription>
          <Header>Edit</Header>
          <Form size="medium" onSubmit={handleSubmit}>
            <FormInput
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e, { name, value }) => setName(value)}
              label="Name"
              width={10}
            />
            <FormTextArea
              label="Description"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e, { value }) => setDescription(value)}
              width={20}
            />
            <FormSelect
              label="Priority"
              onChange={(e, { value }) => setPriority(value)}
              fluid
              options={option}
              defaultValue={priority}
              width={5}
            />
          </Form>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button color="black" onClick={() => setOpen(false)}>
          No
        </Button>
        <Button
          content="Edit"
          labelPosition="right"
          icon="checkmark"
          onClick={handleSubmit}
          positive
        />
      </ModalActions>
    </Modal>
  );
};

export default EditComponent;
