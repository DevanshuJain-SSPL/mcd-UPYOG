package org.egov.vendor.web.models.vendorcontract.vehicle;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.request.RequestInfo;
import org.springframework.validation.annotation.Validated;


/**
 * Request for vehicle details
 */
//@Schema(description = "Request for vehicle details")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2021-01-06T05:37:21.257Z[GMT]")
@AllArgsConstructor
@EqualsAndHashCode
@Getter
@NoArgsConstructor
@Setter
@ToString
@Builder
public class VehicleRequest {

	@JsonProperty("RequestInfo")
	private RequestInfo RequestInfo = null;

	@JsonProperty("vehicle")
	private Vehicle vehicle = null;
}
