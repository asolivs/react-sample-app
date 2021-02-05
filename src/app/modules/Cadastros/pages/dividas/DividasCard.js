import React, { useMemo, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { DividasFilter } from "./dividas-filter/DividasFilter";
import { DividasTable } from "./dividas-table/DividasTable";
import { DividasGrouping } from "./dividas-grouping/DividasGrouping";
import { useDividasUIContext } from "./DividasUIContext";
import axios from "axios";
const CUSTOMERS_URL = "https://jsonplaceholder.typicode.com/users";

export function DividasCard() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      await axios.get(CUSTOMERS_URL).then((response) => {
        const data = response.data;
        console.log(data);
        setUsers(data);
      });
    };
    getUser();
  }, []);
  const dividasUIContext = useDividasUIContext();
  const dividasUIProps = useMemo(() => {
    return {
      ids: dividasUIContext.ids,
      newDividaButtonClick: dividasUIContext.newDividaButtonClick,
    };
  }, [dividasUIContext]);

  return (
    <Card>
      <CardHeader title="Dividas list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={dividasUIProps.newDividaButtonClick}
          >
            New Divida
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <DividasFilter /> */}
        {dividasUIProps.ids.length > 0 && <DividasGrouping />}
        {users.length > 0 && <DividasTable users={users} />}
      </CardBody>
    </Card>
  );
}
