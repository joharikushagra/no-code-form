import { Button, Paper } from "@mui/material";
import { useState } from "react";
import "./App.css";
import Field from "./components/Field";
import { CONSTANTS, defaultData, generateField } from "./utils";

function App() {
  const [data, setData] = useState(defaultData);

  const deleteNode = (id) => {
    let temp = filterNestedArray(data, (ele) => {
      return ele.id !== id;
    });
    setData(temp);
  };

  const filterNestedArray = (arr, condition) => {
    return arr.filter((elem) => {
      if (elem["type"] === CONSTANTS.types.object) {
        elem.items = filterNestedArray(elem.items, condition);
        if (condition(elem)) {
          return true;
        }
      } else {
        return condition(elem);
      }
    });
  };

  const updateNode = (id, newNode) => {
    console.log({ newNode });
    const updatedVal = updateObjectById(data, id, newNode);

    setData([...updatedVal]);
  };

  const updateObjectById = (arr, id, updatedObject) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr[i] = updatedObject;
        return arr;
      }

      if (arr[i].type === CONSTANTS.types.object) {
        arr[i].items = updateObjectById(arr[i].items, id, updatedObject);
      }
    }

    return arr;
  };

  const add = (arr, id) => {
    if (id === null) {
      arr.push(generateField());
      return arr;
    }
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
      const ele = arr[i];

      if (ele.type === CONSTANTS.types.object) {
        ele.items = add(ele.items, id);
      }

      if (id === ele.id) {
        console.log(ele);
        ele.items.push(generateField());
      }

      temp.push(ele);
    }

    return temp;
  };

  const addNode = (id) => {
    let temp = add(data, id);
    setData([...temp]);
  };

  const displayState = () => {
    console.log(data);
  };

  return (
    <div className="container">
      <div>
        <Button onClick={() => addNode(null)} variant="outlined">
          Add
        </Button>
      </div>
      <Paper sx={{ width: "1024px" }} elevation={2}>
        <div className="field-container">
      <div>Field Name and Type</div>
          {data.map((f) => (
            <Field
              key={f.id}
              field={f}
              deleteNode={deleteNode}
              addNode={addNode}
              updateNode={updateNode}
            />
          ))}
        </div>
      </Paper>
      <div>
        <Button variant="contained" onClick={displayState}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default App;
