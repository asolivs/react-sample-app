import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useDividasUIContext } from "../DividasUIContext";

const prepareFilter = (queryParams, values) => {
  const { status, type, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? +status : undefined;
  // Filter by type
  filter.type = type !== "" ? +type : undefined;
  // Filter by all fields
  filter.lastName = searchText;
  if (searchText) {
    filter.firstName = searchText;
    filter.email = searchText;
    filter.ipAddress = searchText;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function DividasFilter({ listLoading }) {
  // Dividas UI Context
  const dividasUIContext = useDividasUIContext();
  const dividasUIProps = useMemo(() => {
    return {
      queryParams: dividasUIContext.queryParams,
      setQueryParams: dividasUIContext.setQueryParams,
    };
  }, [dividasUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(dividasUIProps.queryParams, values);
    if (!isEqual(newQueryParams, dividasUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      dividasUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          status: "", // values => All=""/Susspended=0/Active=1/Pending=2
          type: "", // values => All=""/Business=0/Individual=1
          searchText: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
