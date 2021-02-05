import * as requestFromServer from "./dividasCrud";
import { dividasSlice, callTypes } from "./dividasSlice";

const { actions } = dividasSlice;

export const fetchDividas = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .finddividas(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.dividasFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find dividas";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchDivida = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.dividaFetched({ dividaForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getdividaById(id)
    .then((response) => {
      const { divida } = response.data;
      dispatch(actions.dividaFetched({ dividaForEdit: divida }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find divida";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDivida = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletedivida(id)
    .then((response) => {
      dispatch(actions.dividaDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete divida";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createDivida = (dividaForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createdivida(dividaForCreation)
    .then((response) => {
      const { divida } = response.data;
      dispatch(actions.dividaCreated({ divida }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create divida";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDivida = (divida) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatedivida(divida)
    .then(() => {
      dispatch(actions.dividaUpdated({ divida }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update divida";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDividasStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusFordividas(ids, status)
    .then(() => {
      dispatch(actions.dividasStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update dividas status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDividas = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletedividas(ids)
    .then(() => {
      dispatch(actions.dividasDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete dividas";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
