import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CustomersPage } from "./customers/CustomersPage";
import { DividasPage } from "./dividas/DividasPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function CadastroPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect exact={true} from="/cadastro" to="/cadastro/customers" />
        }
        <ContentRoute path="/cadastro/dividas" component={DividasPage} />
        <ContentRoute path="/cadastro/customers" component={CustomersPage} />
      </Switch>
    </Suspense>
  );
}
