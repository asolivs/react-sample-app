import React, { useMemo } from "react";
import { useDividasUIContext } from "../DividasUIContext";

export function DividasGrouping() {
  // Dividas UI Context
  const dividasUIContext = useDividasUIContext();
  const dividasUIProps = useMemo(() => {
    return {
      ids: dividasUIContext.ids,
      setIds: dividasUIContext.setIds,
      openDeleteDividasDialog: dividasUIContext.openDeleteDividasDialog,
      openFetchDividasDialog: dividasUIContext.openFetchDividasDialog,
      openUpdateDividasStatusDialog:
        dividasUIContext.openUpdateDividasStatusDialog,
    };
  }, [dividasUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{dividasUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={dividasUIProps.openDeleteDividasDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={dividasUIProps.openFetchDividasDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={dividasUIProps.openUpdateDividasStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
