import axios from 'axios';

const API_URL = "http://localhost:8080/api/groups";

export const getGroups = () => axios.get(API_URL);
export const addGroup = (groupName) => axios.post(API_URL, { groupName });
export const updateGroup = (id, groupName) => axios.put(`${API_URL}/${id}`, { groupName });
export const deleteGroup = (id) => axios.delete(`${API_URL}/${id}`);

