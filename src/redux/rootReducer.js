import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { customersSlice } from "../app/modules/Cadastros/_redux/customers/customersSlice";
import { dividasSlice } from "../app/modules/Cadastros/_redux/dividas/dividasSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,

  dividas: dividasSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
