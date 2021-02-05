import axios from "axios";

import urlapi from "../../../../config";

export const dividaS_URL = urlapi;

// CREATE =>  POST: add a new divida to the server
export function createdivida(divida) {
  return axios.post(dividaS_URL + "/divida/create", divida);
}

// READ
export function getAlldividas() {
  return axios.get(dividaS_URL + "/divida/list");
}

export function getdividaById(dividaId) {
  return axios.get(`${dividaS_URL}/divida/${dividaId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function finddividas(queryParams) {
  return axios.post(`${dividaS_URL}/divida/list`, { queryParams });
}

// UPDATE => PUT: update the divida on the server
export function updatedivida(divida) {
  return axios.put(`${dividaS_URL}/divida/${divida.id}`, { divida });
}

// UPDATE Status
export function updateStatusFordividas(ids, status) {
  return axios.post(`${dividaS_URL}/updateStatusFordividas`, {
    ids,
    status,
  });
}

// DELETE => delete the divida from the server
export function deletedivida(dividaId) {
  return axios.delete(`${dividaS_URL}/divida/${dividaId}`);
}

// DELETE dividas by ids
export function deletedividas(ids) {
  return axios.post(`${dividaS_URL}/deletedividas`, { ids });
}
