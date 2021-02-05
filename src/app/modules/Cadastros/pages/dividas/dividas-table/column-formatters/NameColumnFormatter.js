// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";
import {
  DividaStatusCssClasses,
  DividaStatusTitles,
} from "../../DividasUIHelpers";
import axios from "axios";
const CUSTOMERS_URL = "https://jsonplaceholder.typicode.com/users";

export function NameColumnFormatter(cellContent, row, { users }) {
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${DividaStatusCssClasses[1]} label-inline`;
  };
  console.log(row, users);
  const data = users.filter((item) => item.id == parseInt(row.iduser));

  return <span className={getLabelCssClasses()}>{data[0].name}</span>;
}
