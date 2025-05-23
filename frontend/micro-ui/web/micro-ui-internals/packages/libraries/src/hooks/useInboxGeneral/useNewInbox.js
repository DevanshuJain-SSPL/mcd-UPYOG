import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "react-query";
import { FSMService } from "../../services/elements/FSM";
import { PTService } from "../../services/elements/PT";
import { CHBServices } from "../../services/elements/CHB";
import { PTRService } from "../../services/elements/PTR";
import { SVService } from "../../services/elements/SV";
import { EwService } from "../../services/elements/EW";
import { filterFunctions } from "./newFilterFn";
import { getSearchFields } from "./searchFields";
import { InboxGeneral } from "../../services/elements/InboxService";
import {WTService} from "../../services/elements/WT";
import {MTService} from "../../services/elements/MT";

const inboxConfig = (tenantId, filters) => ({
  PT: {
    services: ["PT.CREATE"],
    searchResponseKey: "Properties",
    businessIdsParamForSearch: "acknowledgementIds",
    businessIdAliasForSearch: "acknowldgementNumber",
    fetchFilters: filterFunctions.PT,
    _searchFn: () => PTService.search({ tenantId, filters }),
  },
  PTR: {
    services: ["ptr"],
    searchResponseKey: "PetRegistrationApplications",
    businessIdsParamForSearch: "applicationNumber",
    businessIdAliasForSearch: "applicationNumber",
    fetchFilters: filterFunctions.PTR,
    _searchFn: () => PTRService.search({ tenantId, filters }),
  },
  ASSET: {
    services: ["asset-create"],
    searchResponseKey: "Asset",
    businessIdsParamForSearch: "applicationNo",
    businessIdAliasForSearch: "applicationNo",
    fetchFilters: filterFunctions.ASSET,
    _searchFn: () => ASSETService.search({ tenantId, filters }),
  },
  FSM: {
    services: ["FSM"],
    searchResponseKey: "fsm",
    businessIdsParamForSearch: "applicationNos",
    businessIdAliasForSearch: "applicationNo",
    fetchFilters: filterFunctions.FSM,
    _searchFn: () => FSMService.search(tenantId, filters),
  },
  SV: {
    services: ["street-vending"],
    searchResponseKey: "SVDetails",
    businessIdsParamForSearch: "applicationNo",
    businessIdAliasForSearch: "applicationNo",
    fetchFilters: filterFunctions.SV,
    _searchFn: () => SVService.search({ tenantId, filters }),
  },
  EW: {
    services: ["ewst"],
    searchResponseKey: "EwasteApplication",
    businessIdsParamForSearch: "requestId",
    businessIdAliasForSearch: "requestId",
    fetchFilters: filterFunctions.EW,
    _searchFn: () => EwService.search({ tenantId, filters }),
  },
  CHB: {
    services: ["booking-refund"],
    searchResponseKey: "hallsBookingApplication",
    businessIdsParamForSearch: "bookingNo",
    businessIdAliasForSearch: "bookingNo",
    fetchFilters: filterFunctions.CHB,
    _searchFn: () => CHBServices.search({ tenantId, filters }),
  },
  WT: {
    services: ["watertanker"],
    searchResponseKey: "waterTankerBookingDetail",
    businessIdsParamForSearch: "bookingNo",
    businessIdAliasForSearch: "bookingNo",
    fetchFilters: filterFunctions.WT,
    _searchFn: () => WTService.search({ tenantId, filters }),
  },
  MT: {
    services: ["mobileToilet"],
    searchResponseKey: "mobileToilerBookingDetail",
    businessIdsParamForSearch: "bookingNo",
    businessIdAliasForSearch: "bookingNo",
    fetchFilters: filterFunctions.MT,
    _searchFn: () => MTService.search({ tenantId, filters }),
  }
});


const callMiddlewares = async (data, middlewares) => {
  let applyBreak = false;
  let itr = -1;
  let _break = () => (applyBreak = true);
  let _next = async (data) => {
    if (!applyBreak && ++itr < middlewares.length) {
      let key = Object.keys(middlewares[itr])[0];
      let nextMiddleware = middlewares[itr][key];
      let isAsync = nextMiddleware.constructor.name === "AsyncFunction";
      if (isAsync) return await nextMiddleware(data, _break, _next);
      else return nextMiddleware(data, _break, _next);
    } else return data;
  };
  let ret = await _next(data);
  return ret || [];
};

const useNewInboxGeneral = ({ tenantId, ModuleCode, filters, middleware = [], config = {} }) => {
  const client = useQueryClient();
  const { t } = useTranslation();
  const { fetchFilters, searchResponseKey, businessIdAliasForSearch, businessIdsParamForSearch } = inboxConfig()[ModuleCode];
  let { workflowFilters, searchFilters, limit, offset, sortBy, sortOrder,isDraftApplication } = fetchFilters(filters);

  const query = useQuery(
    ["INBOX", workflowFilters, searchFilters, ModuleCode, limit, offset, sortBy, sortOrder],
    () =>
      InboxGeneral.Search({
        inbox: { tenantId, processSearchCriteria: workflowFilters, moduleSearchCriteria: { ...searchFilters, sortBy, sortOrder,isDraftApplication }, limit, offset },
      }),
    {
      select: (data) => {
        const { statusMap, totalCount } = data;
        // client.setQueryData(`INBOX_STATUS_MAP_${ModuleCode}`, (oldStatusMap) => {
        //   if (!oldStatusMap) return statusMap;
        //   else return [...oldStatusMap.filter((e) => statusMap.some((f) => f.stateId === e.stateId))];
        // });

        client.setQueryData(`INBOX_STATUS_MAP_${ModuleCode}`, statusMap);

        if (data.items.length) {
          return data.items?.map((obj) => ({
            searchData: obj.businessObject,
            workflowData: obj.ProcessInstance,
            statusMap,
            totalCount,
          }));
        } else {
          return [{ statusMap, totalCount, dataEmpty: true }];
        }
      },
      retry: false,
      ...config,
    }
  );

  return {
    ...query,
    searchResponseKey,
    businessIdsParamForSearch,
    businessIdAliasForSearch,
    searchFields: getSearchFields(true)[ModuleCode],
  };
};

export default useNewInboxGeneral;
