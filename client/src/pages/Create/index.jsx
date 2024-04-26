import React from "react";
import Headers from "../../components/Header";
import CreateContainer from "../../components/Create";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

const CreatePage = () => {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            fontSize: "40px",
            marginLeft: "10px",
            marginTop: "20px",
            width: "20%",
          }}
        >
          <Link to={"/"}>
            <Icon corner name="long arrow alternate left" size="large" />
            Back
          </Link>
        </div>
        <div style={{ width: "80%" }}>
          <Headers />
        </div>
      </div>
      <CreateContainer />
    </div>
  );
};

export default CreatePage;
