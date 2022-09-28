const joi = require("joi");

export interface CustomCompanyField {}

export const CreateCustomCompanyFieldSchema = joi.object().keys({
  is_required: joi.boolean().required(),
  name: joi.string().required(),
  show_on_frontcard: joi.boolean().required(),
  type: joi
    .string()
    .valid("TEXT", "DROP_DOWN", "CHECKBOX", "NUMBER", "DATE", "MULTI_SELECT")
    .required(),
  type_values: joi.array().items(joi.string()).optional(),
});

export interface CreateCustomCompanyField {
  is_required: boolean;
  name: string;
  show_on_frontcard: boolean;
  type: string;
  type_values?: Array<string>;
}

export interface CreateCustomCustomerField {
  name: string;
  type: string;
  type_values?: Array<string>;
  is_required: boolean;
  show_on_frontcard: boolean;
}

export const CreateCustomCustomerFieldSchema = joi.object().keys({
  is_required: joi.boolean().required(),
  name: joi.string().required(),
  show_on_frontcard: joi.boolean().required(),
  type: joi
    .string()
    .valid("TEXT", "DROP_DOWN", "CHECKBOX", "NUMBER", "DATE", "MULTI_SELECT")
    .required(),
  type_values: joi.array().items(joi.string()).optional(),
});

export interface CustomCustomerField {}

export interface CustomField {
  apply_on_filter: boolean;
  id: string;
  is_required: boolean;
  module_type: string;
  name: string;
  show_on_frontcard: boolean;
  type: "DROP_DOWN" | "TEXT" | "DATE" | "CHECKBOX" | "NUMBER" | "LINK";
  type_values: string[];
}
