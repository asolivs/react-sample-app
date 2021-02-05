import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function DividaEditDialogHeader({ id }) {
  // Dividas Redux state
  const { dividaForEdit, actionsLoading } = useSelector(
    (state) => ({
      dividaForEdit: state.dividas.dividaForEdit,
      actionsLoading: state.dividas.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Divida";
    if (dividaForEdit && id) {
      _title = `Edit divida '${dividaForEdit.firstName} ${dividaForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [dividaForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
