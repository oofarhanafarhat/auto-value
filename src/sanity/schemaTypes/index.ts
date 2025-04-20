import { type SchemaTypeDefinition } from 'sanity'
import {car} from "../schemaTypes/car"
import { carListing } from '../schemaTypes/carListing'
import { autovalue1 } from './autovalue1'
import { usedCar } from '@/sanity/schemaTypes/uesdcar'
import { services } from '../schemaTypes/services'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [car, carListing, autovalue1, usedCar, services],
}
