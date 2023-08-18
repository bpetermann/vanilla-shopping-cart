import { API } from './API.js';

export const loadData = async () => {
  return await API.getProducts();
};
