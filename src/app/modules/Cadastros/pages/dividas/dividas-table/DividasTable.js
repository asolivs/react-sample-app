// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/dividas/dividasActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../DividasUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useDividasUIContext } from "../DividasUIContext";
import axios from "axios";
const CUSTOMERS_URL = "https://jsonplaceholder.typicode.com/users";

export function DividasTable(props) {
  console.log(props);
  const [users, setUsers] = useState(props.users);
  // Dividas UI Context
  const dividasUIContext = useDividasUIContext();
  const dividasUIProps = useMemo(() => {
    return {
      ids: dividasUIContext.ids,
      setIds: dividasUIContext.setIds,
      queryParams: dividasUIContext.queryParams,
      setQueryParams: dividasUIContext.setQueryParams,
      openEditDividaDialog: dividasUIContext.openEditDividaDialog,
      openDeleteDividaDialog: dividasUIContext.openDeleteDividaDialog,
    };
  }, [dividasUIContext]);

  // Getting curret state of dividas list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.dividas }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Dividas Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    dividasUIProps.setIds([]);

    axios.get(CUSTOMERS_URL).then((response) => {
      const data = response.data;
      console.log(data);
      setUsers(data);
    });

    // server call by queryParams
    dispatch(actions.fetchDividas(dividasUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dividasUIProps.queryParams, dispatch]);
  // Table columns
  console.log(users);
  const columns = [
    // {
    //   dataField: "_id",
    //   text: "ID",
    //   sort: true,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    // },
    {
      dataField: "iduser",
      text: "Nome",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      // formatter: columnFormatters.NameColumnFormatter,

      formatter: (cell, row, rowIndex) => {
        if (row.iduser) {
          const getLabelCssClasses = () => {
            return `label label-lg label-light-info label-inline`;
          };
          const data = users.filter((item) => item.id == parseInt(row.iduser));
          return <span className={getLabelCssClasses()}>{data[0].name}</span>;
        }
      },
      // formatExtraData: {
      //   users: users,
      // },
    },
    {
      dataField: "motivo",
      text: "Motivo",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "valor",
      text: "Valor",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "atraso",
      text: "Atraso",
      sort: false,
      sortCaret: sortCaret,
    },

    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDividaDialog: dividasUIProps.openEditDividaDialog,
        openDeleteDividaDialog: dividasUIProps.openDeleteDividaDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: dividasUIProps.queryParams.pageSize,
    page: dividasUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  dividasUIProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   entities,
                //   ids: dividasUIProps.ids,
                //   setIds: dividasUIProps.setIds,
                // })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
