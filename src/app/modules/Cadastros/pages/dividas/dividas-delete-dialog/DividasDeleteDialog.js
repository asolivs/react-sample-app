import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/dividas/dividasActions";
import { useDividasUIContext } from "../DividasUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function DividasDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.dividas.actionsLoading }),
    shallowEqual
  );

  // if dividas weren't selected we should close modal
  useEffect(() => {
    if (!dividasUIProps.ids || dividasUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dividasUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteDividas = () => {
    // server request for deleting divida by selected ids
    dispatch(actions.deleteDividas(dividasUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDividas(dividasUIProps.queryParams)).then(
        () => {
          // clear selections list
          dividasUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Dividas Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected dividas?</span>
        )}
        {isLoading && <span>Divida are deleting...</span>}
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
            onClick={deleteDividas}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
