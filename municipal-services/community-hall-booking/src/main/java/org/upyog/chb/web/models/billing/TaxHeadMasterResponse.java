package org.upyog.chb.web.models.billing;

import java.util.List;

import org.egov.common.contract.response.ResponseInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents the response structure for Tax Head Master data.
 * 
 * Purpose:
 * - To encapsulate ResponseInfo and a list of TaxHeadMaster objects.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaxHeadMasterResponse {

	@JsonProperty("ResponseInfo")
	private ResponseInfo responseInfo;

	@JsonProperty("TaxHeadMasters")
	private List<TaxHeadMaster> taxHeadMasters;
}
