import { properties } from "./data";

export const getProperties = async () => {
  return { data: properties };
};

export const getPropertyById = async (id) => {
  return properties.find(p => p.id === Number(id));
};
