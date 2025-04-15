import { type SchemaTypeDefinition } from 'sanity'
import {car} from "../schemaTypes/car"
import { carListing } from '../schemaTypes/carListing'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [car, carListing],
}
