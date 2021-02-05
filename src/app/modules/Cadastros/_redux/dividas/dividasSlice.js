import { createSlice } from "@reduxjs/toolkit";

const initialdividasState = {
  // id: false,
  // name: false,
  // username: 0,
  // email: null,
  // phone: undefined,
  // website: null,

  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  customerForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const dividasSlice = createSlice({
  name: "dividas",
  initialState: initialdividasState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getdividaById
    dividaFetched: (state, action) => {
      state.actionsLoading = false;
      state.dividaForEdit = action.payload.dividaForEdit;
      state.error = null;
    },
    // finddividas
    dividasFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createdivida
    dividaCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.divida);
    },
    // updatedivida
    dividaUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.divida.id) {
          return action.payload.divida;
        }
        return entity;
      });
    },
    // deletedivida
    dividaDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deletedividas
    dividasDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // dividasUpdateState
    dividasStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
