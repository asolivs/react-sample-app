import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./DividasUIHelpers";

const DividasUIContext = createContext();

export function useDividasUIContext() {
  return useContext(DividasUIContext);
}

export const DividasUIConsumer = DividasUIContext.Consumer;

export function DividasUIProvider({ dividasUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initDivida = {
    _id: undefined,
    iduser: 1,
    motivo: "",
    valor: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initDivida,
    newDividaButtonClick: dividasUIEvents.newDividaButtonClick,
    openEditDividaDialog: dividasUIEvents.openEditDividaDialog,
    openDeleteDividaDialog: dividasUIEvents.openDeleteDividaDialog,
    openDeleteDividasDialog: dividasUIEvents.openDeleteDividasDialog,
    openFetchDividasDialog: dividasUIEvents.openFetchDividasDialog,
    openUpdateDividasStatusDialog:
      dividasUIEvents.openUpdateDividasStatusDialog,
  };

  return (
    <DividasUIContext.Provider value={value}>
      {children}
    </DividasUIContext.Provider>
  );
}
