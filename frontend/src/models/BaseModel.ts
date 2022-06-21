/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Representation of an asset in a supply chain.
 */
export type BaseModel = {
  /**
   * Property. Unique identifier of the entity
   */
  id?: string;
  /**
   * Property. Entity creation timestamp. This will usually be allocated by the storage platform.
   */
  dateCreated?: string;
  /**
   * Property. Timestamp of the last modification of the entity. This will usually be allocated by the storage platform.
   */
  dateModified?: string;
  /**
   * Property. A sequence of characters giving the original source of the entity data as a URL. Recommended to be the fully qualified domain name of the source provider, or the URL to the source object.
   */
  source?: string;
  /**
   * Property. The name of this item.
   */
  name?: string;
  /**
   * Property. An alternative name for this item
   */
  alternateName?: string;
  /**
   * Property. A description of this item
   */
  description?: string;
  /**
   * Property. A sequence of characters identifying the provider of the harmonised data entity.
   */
  dataProvider?: string;
  /**
   * Property. A List containing a JSON encoded sequence of characters referencing the unique Ids of the owner(s)
   */
  owner?: string[];
  /**
   * Property. list of uri pointing to additional resources about the item
   */
  seeAlso?: [string, ...string[]] | string;
  [k: string]: unknown;
} 