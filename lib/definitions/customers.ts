import joi from "joi";
import { CreateAddress, CreateAddressSchema, Address } from "./global";
import {IdSchema} from "./global";

interface CustomPricingTier { 

}

export interface Customer 
  {
    id:bigint | number ,
    email:string | null,
    created:string | null,
    modified:string | null,
    batchImport:boolean | null,
    first_name:string | null,
    last_name:string | null,
    contact_number:string | null,
    contact_stores:Array<ContactStores> | null,
    addresses:Array<Address> | null,
    tags_links?:Array<object> | null,
    custom_pricing_tier:string | null,
    comment_count:0,
    is_any_unread:boolean | null,
    unread_comment_count:number | null,
    default_tax_id:number | null,
    default_discount_rate:number | null,
    custom_fields:null,
    parent_company_id:string | null,
    parent_company_name:string | null,
    default_customer_payment:string | null,
    resource_info:
    {
      self:{ href:string | null },
      tags_links?:{href:string | null},
      orders:{ href:string | null}
    },
    error_message:string | null
  }


interface ContactStores {
    id:number | bigint | null,
    channel_id:number | null,
    store_id:number | null,
    store_name:string | null,
    channel_icon:string | null,
    channel_name:string | null,

}


const CustomFieldsSchema = joi.any();

export const CreateCustomerSchema = joi.object().keys({
    first_name: joi.string().allow("").allow(null),
    last_name: joi.string().allow("").allow(null),
    email: joi.string().allow(""),
    default_tax_id: joi.any().allow(null),
    default_discount_rate: joi.number().allow(null),
    contact_number: joi.string().allow(""),
    addresses: joi.array().items(CreateAddressSchema).allow(null),
    contact_stores: joi.array().items().allow(null),
    custom_pricing_tier: joi.any().allow(null),
    custom_fields: joi.array().items(CustomFieldsSchema).allow(null),
    parent_company_id: joi.any().allow(null),
    parent_company_name: joi.any().allow(null),
    default_customer_payment: joi.any().allow(null),
    tags_links: joi.array().allow(null),
});

export interface CreateCustomer {
    first_name: string,
    last_name: string,
    email: string | null,
    contact_number?: string | null,
    default_tax_id: number | null,
    default_discount_rate: number | null,
    custom_pricing_tier: CustomPricingTier | null,
    contact_stores?: Array<any>,
    addresses: CreateAddress[],
    custom_fields: object | null,
    parent_company_id: string | null,
    parent_company_name: string | null,
    default_customer_payment: string | null,
    tags_links?: Array<object>
  }

  export interface Company { 
    id:bigint | number,
    channel_id: number | null,  
    store_id: number | null,
    tags_links?: Array<object> | null,
    //email: string | null,
    name: string,
    default_tax_id: number,
    default_discount_rate: number,
    pricing_tier_id: number | null,
    custom_fields: object | null,
    error_messages: any | null,
    error: any | null,
  }

  export interface UpdateCustomer {
    addresses: Array<Address> | null,
    contact_number: string | null,
    custom_fields: object | null,
    default_discount_rate: number | null,
    email: string | null,
    first_name: string | null,
    last_name: string | null,
    tags_links?: Array<object> | null,
  }

  export interface CreateCompany {
    channel_id?: number | null,
    store_id?: number | null,
    tag_links?: Array<object> | Array<any> | null,
    //email: string | null,
    name: string,
    default_tax_id?: number | null,
    default_discount_rate?: number | null,
    pricing_tier_id?: number | null,
    custom_fields?: Array<object> | null,
  }

  export const CreateCompanySchema = joi.object().keys({
    channel_id: joi.number().allow(null),
    store_id: joi.number().allow(null),
    tag_links: joi.array().allow(null),
    //email: joi.string().allow(null),
    name: joi.string().max(49).truncate().allow(null).allow(""),
    default_tax_id: joi.number().allow(null),
    default_discount_rate: joi.number().allow(null),
    pricing_tier_id: joi.number().allow(null),
    custom_fields: joi.array().items(CustomFieldsSchema),
});

export interface CustomerCompanyLink {
  customer_ids: Array<bigint | number>,
  company_name: string, 
  company_id: number | bigint
}

export interface FilterFields {
  // page?: {
  //   pageId?: number,
  //   limit?: number,
  // },
  // get_count?: boolean,
  // query?: string,
  // filters?: {
  //   field?: []
  // },

}
