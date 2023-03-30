import React from "react";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Switch from "@mui/material/Switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CONSTANTS } from "../utils";
import "../styles/Field.css";

const Field = ({ field, deleteNode, addNode, updateNode }) => {
  const handleChange = (update) => {
    if (
      field.type === CONSTANTS.types.object &&
      update.type &&
      update.type !== CONSTANTS.types.object
    ) {
      console.log(field.type, update);
      updateNode(field.id, {
        ...field,
        ...update,
        items: [],
      });
    } else {
      updateNode(field.id, {
        ...field,
        ...update,
      });
    }
  };

  const handleDelete = (id) => {
    deleteNode(id);
  };

  return (
    <>
      <div className="field-wrapper">
        <div className="field-left">
          <input
            type="text"
            value={field.fieldName}
            className="input-style"
            onChange={(e) => handleChange({ fieldName: e.target.value })}
          />

          <div style={{ marginRight: "4px" }}>
            <select
              onChange={(e) => handleChange({ type: e.target.value })}
              defaultValue={field.type}
            >
              <option value="STRING">String</option>
              <option value="NUMBER">Number</option>
              <option value="BOOLEAN">Boolean</option>
              <option value="OBJECT">Object</option>
            </select>
          </div>
        </div>
        <div className="field-right">
          {field.type === CONSTANTS.types.object && (
            <div onClick={() => addNode(field.id)} className="add-icon-style">
              <FontAwesomeIcon icon={faPlus} />{" "}
            </div>
          )}

          <div className="switch-style">
            <span>Required</span>
            <Switch
              checked={field.required}
              onChange={() => {
                handleChange({ required: !field.required });
              }}
            />
          </div>
          <div
            onClick={() => handleDelete(field.id)}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>
      {field.type === "OBJECT" && (
        <div className="field-nested">
          {field.items.map((f) => (
            <Field
              key={f.id}
              field={f}
              deleteNode={deleteNode}
              addNode={addNode}
              updateNode={updateNode}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Field;
