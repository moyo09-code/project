import {properties} from "../data/properties";

export async function getProperties() {
  return {
    data: properties
  };
}

export async function getPropertyById(id) {
  const property = properties.find(p => p.id === Number(id));
  return { data: property };
}
