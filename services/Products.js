import API from './Api.js';

const loadData = async () => {
 return await API.getProducts();
};

export default loadData;
