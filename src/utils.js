import shortid from "shortid";

export const CONSTANTS = {
  types: {
    string: "STRING",
    number: "NUMBER",
    boolean: "BOOLEAN",
    object: "OBJECT",
  },
};

export const defaultField = {
  fieldName: "Add a name",
  type: "STRING",
  required: false,
  items: [],
};

export const defaultData = [
  generateField(),
  generateField({ ...defaultField, type: CONSTANTS.types.number }),
  generateField({ ...defaultField, type: CONSTANTS.types.number }),
  {
    ...generateField({ ...defaultField, type: CONSTANTS.types.object }),
    items: [
      generateField({ ...defaultField, type: CONSTANTS.types.number }),
      generateField(),
    ],
  },
  generateField(),
];

export function generateField(field = defaultField) {
  return {
    id: shortid(),
    fieldName: field.fieldName,
    type: field.type,
    required: field.required,
    items: field.items,
  };
}
