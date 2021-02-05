import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  DividaStatusCssClasses,
  DividaStatusTitles,
} from "../DividasUIHelpers";
import * as actions from "../../../_redux/dividas/dividasActions";
import { useDividasUIContext } from "../DividasUIContext";

const selectedDividas = (entities, ids) => {
  const _dividas = [];
  ids.forEach((id) => {
    const divida = entities.find((el) => el.id === id);
    if (divida) {
      _dividas.push(divida);
    }
  });
  return _dividas;
};

export function DividasUpdateStateDialog({ show, onHide }) {
  // Dividas UI Context
  const dividasUIContext = useDividasUIContext();
  const dividasUIProps = useMemo(() => {
    return {
      ids: dividasUIContext.ids,
      setIds: dividasUIContext.setIds,
      queryParams: dividasUIContext.queryParams,
    };
  }, [dividasUIContext]);

  // Dividas Redux state
  const { dividas, isLoading } = useSelector(
    (state) => ({
      dividas: selectedDividas(
        state.dividas.entities,
        dividasUIProps.ids
      ),
      isLoading: state.dividas.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!dividasUIProps.ids || dividasUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dividasUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update dividas status by selected ids
    dispatch(actions.updateDividasStatus(dividasUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchDividas(dividasUIProps.queryParams)).then(
          () => {
            // clear selections list
            dividasUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected dividas
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>CUSTOMER</th>
            </tr>
          </thead>
          <tbody>
            {dividas.map((divida) => (
              <tr key={`id${divida.id}`}>
                <td>{divida.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      DividaStatusCssClasses[divida.status]
                    } label-inline`}
                  >
                    {" "}
                    {DividaStatusTitles[divida.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {divida.lastName}, {divida.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
