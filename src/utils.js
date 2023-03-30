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
  generateField({
    ...defaultField,
    fieldName: "person",
    type: CONSTANTS.types.object,
    required: true,
    items: [
      generateField({
        ...defaultField,
        fieldName: "name",
        type: CONSTANTS.types.object,
        items: [
          generateField({
            ...defaultField,
            fieldName: "firstname",
            type: CONSTANTS.types.string,
          }),
          generateField({
            ...defaultField,
            fieldName: "lastname",
            type: CONSTANTS.types.string,
          }),
        ],
      }),
      generateField({
        ...defaultField,
        fieldName: "age",
        type: CONSTANTS.types.number,
      }),
    ],
  }),
  generateField({
    ...defaultField,
    fieldName: "order",
    type: CONSTANTS.types.string,
  }),
  generateField({
    ...defaultField,
    fieldName: "class",
    type: CONSTANTS.types.boolean,
  }),
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
