import React from "react";
import ReactDOM from "react-dom";

import { initLibraries } from "@nudmcdgnpm/digit-ui-libraries";
import { PGRReducers } from "@nudmcdgnpm/digit-ui-module-pgr";
import { PTModule, PTLinks, PTComponents } from "@upyog/digit-ui-module-pt";
import { MCollectModule, MCollectLinks } from "@upyog/digit-ui-module-mcollect";
// import { TLModule, TLLinks } from "@upyog/digit-ui-module-tl";
import { initFSMComponents } from "@upyog/digit-ui-module-fsm";
import { initPGRComponents } from "@nudmcdgnpm/digit-ui-module-pgr";
import { initFinanceComponents } from "@mcd89/digit-ui-module-finance";
import { initDSSComponents } from "@upyog/digit-ui-module-dss";
import { initHRMSComponents } from "@mcd89/digit-ui-module-hrms";
import { initReceiptsComponents, ReceiptsModule } from "@upyog/digit-ui-module-receipts";
// import { initReportsComponents } from "@upyog/digit-ui-module-reports";
import { initMCollectComponents } from "@upyog/digit-ui-module-mcollect";
import { initTLComponents } from "@upyog/digit-ui-module-tl";
import { PaymentModule, PaymentLinks, paymentConfigs } from "@upyog/digit-ui-module-common";
import { HRMSModule } from "@mcd89/digit-ui-module-hrms";
import { FinanceModule } from "@mcd89/digit-ui-module-finance";
import { initOBPSComponents } from "@upyog/digit-ui-module-obps";
import { initEngagementComponents } from "@upyog/digit-ui-module-engagement";
import { initNOCComponents } from "@upyog/digit-ui-module-noc";
import { initWSComponents } from "@upyog/digit-ui-module-ws";
import { DigitUI } from "@upyog/digit-ui-module-core";
import { initCommonPTComponents } from "@upyog/digit-ui-module-commonpt";
import { initBillsComponents, BillsModule } from "@upyog/digit-ui-module-bills";

// import {initCustomisationComponents} from "./customisations";

// import { PGRModule, PGRLinks } from "@nudmcdgnpm/digit-ui-module-pgr";
// import { Body, TopBar } from "@nudmcdgnpm/digit-ui-react-components";
import "@nudmcdgnpm/upyog-css";

import { PTRModule, PTRLinks, PTRComponents } from "@nudmcdgnpm/upyog-ui-module-ptr";
import { ASSETComponents, ASSETLinks, ASSETModule } from "@nudmcdgnpm/upyog-ui-module-asset";

import { 
  EWModule, 
  EWLinks, 
  EWComponents }
  from "@nudmcdgnpm/upyog-ui-module-ew";

import { SVComponents, SVLinks, SVModule } from "@nudmcdgnpm/upyog-ui-module-sv";
import {CHBModule,CHBLinks,CHBComponents} from "@nudmcdgnpm/upyog-ui-module-chb";
import {ADSModule,ADSLinks,ADSComponents} from "@nudmcdgnpm/upyog-ui-module-ads";
import { WTModule, WTLinks, WTComponents } from "@nudmcdgnpm/upyog-ui-module-wt";
import { VENDORComponents, VENDORLinks, VENDORModule } from "@nudmcdgnpm/upyog-ui-module-vendor";

// import * as comps from "@nudmcdgnpm/digit-ui-react-components";

// import { subFormRegistry } from "@nudmcdgnpm/digit-ui-libraries";

import { pgrCustomizations, pgrComponents } from "./pgr";

var Digit = window.Digit || {};

const enabledModules = [
  "PGR",
  "FSM",
  "Payment",
  "PT",
  "QuickPayLinks",
  "DSS",
  "MCollect",
  "HRMS",
  "TL",
  "Receipts",
  "Reports",
  "OBPS",
  "Engagement",
  "NOC",
  "WS",
  "CommonPT",
  "NDSS",
  "Bills",
  "SW",
  "BillAmendment",
  "FireNoc",
  "Birth",
  "Finance",
  "Death",
  "PTR",
  "ASSET",
  "ADS",
  "SV",
  "EW",
  "CHB",
  "WT",
  "VENDOR",
  "MT"
];

const initTokens = (stateCode) => {
  const userType = window.sessionStorage.getItem("userType") || process.env.REACT_APP_USER_TYPE || "CITIZEN";

  const token = window.localStorage.getItem("token")|| process.env[`REACT_APP_${userType}_TOKEN`];
 
  const citizenInfo = window.localStorage.getItem("Citizen.user-info")
 
  const citizenTenantId = window.localStorage.getItem("Citizen.tenant-id") || stateCode;

  const employeeInfo = window.localStorage.getItem("Employee.user-info");
  const employeeTenantId = window.localStorage.getItem("Employee.tenant-id");

  const userTypeInfo = userType === "CITIZEN" || userType === "QACT" ? "citizen" : "employee";
  window.Digit.SessionStorage.set("user_type", userTypeInfo);
  window.Digit.SessionStorage.set("userType", userTypeInfo);

  if (userType !== "CITIZEN") {
    window.Digit.SessionStorage.set("User", { access_token: token, info: userType !== "CITIZEN" ? JSON.parse(employeeInfo) : citizenInfo });
  } else {
    // if (!window.Digit.SessionStorage.get("User")?.extraRoleInfo) window.Digit.SessionStorage.set("User", { access_token: token, info: citizenInfo });
  }

  window.Digit.SessionStorage.set("Citizen.tenantId", citizenTenantId);

  if (employeeTenantId && employeeTenantId.length) window.Digit.SessionStorage.set("Employee.tenantId", employeeTenantId);
};

const initDigitUI = () => {
  window?.Digit.ComponentRegistryService.setupRegistry({
    ...pgrComponents,
    PaymentModule,
    ...paymentConfigs,
    PaymentLinks,
    PTModule,
    PTLinks,
    ...PTComponents,
    MCollectLinks,
    MCollectModule,
    HRMSModule,
    FinanceModule,
    ReceiptsModule,
    BillsModule,
    PTRModule, 
    PTRLinks, 
    ...PTRComponents,
    // TLModule,
    // TLLinks,
    ASSETModule,
    ASSETLinks,
    ...ASSETComponents,
    ADSLinks,
  ADSModule,
  ...ADSComponents,
  SVModule,
  SVLinks,
  ...SVComponents,
  EWModule,
  EWLinks,
  ...EWComponents,
  CHBModule,
  CHBLinks,
  ...CHBComponents,
  WTModule,
  WTLinks,
  ...WTComponents,
  VENDORModule,
  VENDORLinks,
  ...VENDORComponents
  });

  initFSMComponents();
  initPGRComponents();
  initDSSComponents();
  initMCollectComponents();
  initHRMSComponents();
  initTLComponents();
  initReceiptsComponents();
  // initReportsComponents();
  initOBPSComponents();
  initEngagementComponents();
  initNOCComponents();
  initWSComponents();
  initCommonPTComponents();
  initBillsComponents();
  initFinanceComponents();

  // initCustomisationComponents();

  const moduleReducers = (initData) => ({
    pgr: PGRReducers(initData),
  });

  window.Digit.Customizations = {
    PGR: pgrCustomizations,
    TL: {
      customiseCreateFormData: (formData, licenceObject) => licenceObject,
      customiseRenewalCreateFormData: (formData, licenceObject) => licenceObject,
      customiseSendbackFormData: (formData, licenceObject) => licenceObject,
    },
  };

  const stateCode = window?.globalConfigs?.getConfig("STATE_LEVEL_TENANT_ID") || "pb";
  initTokens(stateCode);

  const registry = window?.Digit.ComponentRegistryService.getRegistry();
  ReactDOM.render(<DigitUI stateCode={stateCode} enabledModules={enabledModules} moduleReducers={moduleReducers} />, document.getElementById("root"));
};

initLibraries().then(() => {
  initDigitUI();
});
