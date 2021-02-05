import React from "react";
import { Route } from "react-router-dom";
import { DividasLoadingDialog } from "./dividas-loading-dialog/DividasLoadingDialog";
import { DividaEditDialog } from "./divida-edit-dialog/DividaEditDialog";
import { DividaDeleteDialog } from "./divida-delete-dialog/DividaDeleteDialog";
import { DividasDeleteDialog } from "./dividas-delete-dialog/DividasDeleteDialog";
import { DividasFetchDialog } from "./dividas-fetch-dialog/DividasFetchDialog";
import { DividasUpdateStateDialog } from "./dividas-update-status-dialog/DividasUpdateStateDialog";
import { DividasUIProvider } from "./DividasUIContext";
import { DividasCard } from "./DividasCard";

export function DividasPage({ history }) {
  const dividasUIEvents = {
    newDividaButtonClick: () => {
      history.push("/cadastro/dividas/new");
    },
    openEditDividaDialog: (id) => {
      history.push(`/cadastro/dividas/${id}/edit`);
    },
    openDeleteDividaDialog: (id) => {
      history.push(`/cadastro/dividas/${id}/delete`);
    },
    openDeleteDividasDialog: () => {
      history.push(`/cadastro/dividas/deleteDividas`);
    },
    openFetchDividasDialog: () => {
      history.push(`/cadastro/dividas/fetch`);
    },
    openUpdateDividasStatusDialog: () => {
      history.push("/cadastro/dividas/updateStatus");
    },
  };

  return (
    <DividasUIProvider dividasUIEvents={dividasUIEvents}>
      <DividasLoadingDialog />
      <Route path="/cadastro/dividas/new">
        {({ history, match }) => (
          <DividaEditDialog
            show={match != null}
            onHide={() => {
              history.push("/cadastro/dividas");
            }}
          />
        )}
      </Route>
      <Route path="/cadastro/dividas/:id/edit">
        {({ history, match }) => (
          <DividaEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cadastro/dividas");
            }}
          />
        )}
      </Route>
      <Route path="/cadastro/dividas/deleteDividas">
        {({ history, match }) => (
          <DividasDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/cadastro/dividas");
            }}
          />
        )}
      </Route>
      <Route path="/cadastro/dividas/:id/delete">
        {({ history, match }) => (
          <DividaDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cadastro/dividas");
            }}
          />
        )}
      </Route>
      <Route path="/cadastro/dividas/fetch">
        {({ history, match }) => (
          <DividasFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/cadastro/dividas");
            }}
          />
        )}
      </Route>
      <Route path="/cadastro/dividas/updateStatus">
        {({ history, match }) => (
          <DividasUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/cadastro/dividas");
            }}
          />
        )}
      </Route>
      <DividasCard />
    </DividasUIProvider>
  );
}
