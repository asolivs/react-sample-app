import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
// import { BuilderPage } from "./pages/BuilderPage";
// import { MyPage } from "./pages/MyPage";

const CadastrosPage = lazy(() =>
  import("./modules/Cadastros/pages/CadastrosPage")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/cadastro" />
        }
        {/* <ContentRoute path="/dashboard" component={DashboardPage} /> */}
        {/* <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} /> */}

        <Route path="/cadastro" component={CadastrosPage} />

        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
