import { Loader } from "@nudmcdgnpm/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import { newConfig as newConfigWS } from "../../../config/wsDisconnectionConfig";

const getPath = (path, params) => {
  params && Object.keys(params).map(key => {
    path = path.replace(`:${key}`, params[key]);
  })
  return path;
}


const DisconnectionApplication = () => {
  const { t } = useTranslation();
  const match = useRouteMatch();
  const stateId = Digit.ULBService.getStateId();
  let { data: newConfig, isLoading } = Digit.Hooks.ws.useWSConfigMDMS.WSDisconnectionConfig(stateId, {});

  let config = [];

  if (!isLoading) {
    newConfig.forEach((obj) => {
      config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
    });
    config.indexRoute = "new-restoration";
  } else {
    return <Loader />
  }

  console.log("configconfig",config)
  return (
    <Switch>
      {config.map((routeObj, index) => {
        const { component, texts, inputs, key, isSkipEnabled } = routeObj;
        const Component = Digit.ComponentRegistryService.getComponent("WSRestorationForm");
        return (
          <Route path={`${getPath(match.path, match.params)}/new-restoration`} key={index}>
            <Component config={{ texts, inputs, key, isSkipEnabled }}  t={t} userType={"employee"} />
          </Route>
        );
      })}
    
      <Route>
        <Redirect to={`${getPath(match.path, match.params)}/${config.indexRoute}`} />
      </Route>
    </Switch>
  );
};

export default DisconnectionApplication;

