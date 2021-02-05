import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  DividaStatusCssClasses,
  DividaStatusTitles,
} from "../DividasUIHelpers";
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

export function DividasFetchDialog({ show, onHide }) {
  // Dividas UI Context
  const dividasUIContext = useDividasUIContext();
  const dividasUIProps = useMemo(() => {
    return {
      ids: dividasUIContext.ids,
    };
  }, [dividasUIContext]);

  // Dividas Redux state
  const { dividas } = useSelector(
    (state) => ({
      dividas: selectedDividas(
        state.dividas.entities,
        dividasUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if dividas weren't selected we should close modal
  useEffect(() => {
    if (!dividasUIProps.ids || dividasUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dividasUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
