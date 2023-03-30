import React, { useState } from "react";

const Field = ({ schema }) => {
  const [expand, setExpand] = useState(false);
  console.log({ schema });
  if (schema.isObject) {
    return (
      <div>
        <div onClick={() => setExpand(!expand)}>{schema.fieldName}</div>
        {expand ? (
          <div>
            {schema.items.map((s) => {
              return <Field key={s.fieldName} schema={s} />;
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    return <div>{schema.fieldName}</div>;
  }
};

export default Field;
