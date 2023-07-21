import API from './API.js';

const loadData = async () => {
 return await API.getProducts();
};

export default loadData;
