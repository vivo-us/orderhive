export interface MessageResponse {
  message: string;
}

export interface Timestamps {
  readonly created: string;
  readonly modified: string;
}

export type DimensionUnit = "IN" | "CM" | "M";
export type WeightUnit = "KG" | "LB" | "GM" | "OZ";
export type OptionalDimensions = Optional<Dimensions>;
export interface Dimensions {
  height: number;
  length: number;
  width: number;
  measurement_unit: DimensionUnit;
}
export type OptionalWeight = Optional<Weight>;
export interface Weight {
  weight: number;
  weight_unit: WeightUnit;
}

export interface Address {
  name?: string | null;
  company?: string | null;
  address1: string;
  address2?: string | null;
  city: string;
  state: string;
  zipcode: string;
  country?: string | null;
  country_code: string;
  contact_number?: string | null;
  email?: string | null;
  default?: boolean;
  default_customer_address?: boolean;
}

export type Optional<Type> = {
  [Property in keyof Type]+?: Type[Property];
};
