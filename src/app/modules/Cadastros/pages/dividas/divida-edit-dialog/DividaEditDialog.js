import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/dividas/dividasActions";
import { DividaEditDialogHeader } from "./DividaEditDialogHeader";
import { DividaEditForm } from "./DividaEditForm";
import { useDividasUIContext } from "../DividasUIContext";

export function DividaEditDialog({ id, show, onHide }) {
  // Dividas UI Context
  const [users, setUsers] = useState();
  const dividasUIContext = useDividasUIContext();
  const dividasUIProps = useMemo(() => {
    return {
      initDivida: dividasUIContext.initDivida,
    };
  }, [dividasUIContext]);

  // Dividas Redux state
  const dispatch = useDispatch();
  const { actionsLoading, dividaForEdit, customers } = useSelector(
    (state) => ({
      actionsLoading: state.dividas.actionsLoading,
      dividaForEdit: state.dividas.dividaForEdit,
      customers: state.customers.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Divida by id
    dispatch(actions.fetchDivida(id));
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
        const data = body.map((user) => ({
          text: `${user.name}`,
          value: user.id,
        }));
        setUsers(data);
      });
  }, [id, dispatch]);

  // server request for saving divida
  const saveDivida = (divida) => {
    if (!id) {
      // server request for creating divida
      dispatch(actions.createDivida(divida)).then(() =>
        window.location.reload(true)
      );
    } else {
      // server request for updating divida
      dispatch(actions.updateDivida(divida)).then(() =>
        window.location.reload(true)
      );
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <DividaEditDialogHeader id={id} />
      <DividaEditForm
        saveDivida={saveDivida}
        actionsLoading={actionsLoading}
        divida={dividaForEdit || dividasUIProps.initDivida}
        onHide={onHide}
        users={users}
      />
    </Modal>
  );
}
