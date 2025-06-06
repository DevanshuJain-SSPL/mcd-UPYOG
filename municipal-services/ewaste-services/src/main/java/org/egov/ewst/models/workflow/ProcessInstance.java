package org.egov.ewst.models.workflow;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.egov.ewst.models.Document;
import org.egov.ewst.models.user.User;
import org.hibernate.validator.constraints.SafeHtml;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Represents a process instance in the workflow of the Ewaste application.
 * This class contains details about the process instance such as tenant ID, business service, action, state, etc.
 */
@SuppressWarnings("deprecation")
@ApiModel(description = "A Object holds the basic data of a Process Instance")
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2018-12-04T11:26:25.532+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = { "id" })
@ToString
public class ProcessInstance {

	@Size(max = 64)
	@SafeHtml
	@JsonProperty("id")
	private String id;

	@NotNull
	@SafeHtml
	@Size(max = 128)
	@JsonProperty("tenantId")
	private String tenantId;

	@NotNull
	@SafeHtml
	@Size(max = 128)
	@JsonProperty("businessService")
	private String businessService;

	@NotNull
	@SafeHtml
	@Size(max = 128)
	@JsonProperty("businessId")
	private String businessId;

	@NotNull
	@SafeHtml
	@Size(max = 128)
	@JsonProperty("action")
	private String action;

	@NotNull
	@SafeHtml
	@Size(max = 64)
	@JsonProperty("moduleName")
	private String moduleName;

	@JsonProperty("state")
	private State state;

	/* for use of notification service in property */
	private String notificationAction;

	@SafeHtml
	@JsonProperty("comment")
	private String comment;

	@JsonProperty("documents")
	@Valid
	private List<Document> documents;

	@JsonProperty("assignes")
	private List<User> assignes;

	/**
	 * Adds a document to the list of documents associated with the process instance.
	 *
	 * @param documentsItem the document to add
	 * @return the updated ProcessInstance object
	 */
	public ProcessInstance addDocumentsItem(Document documentsItem) {
		if (this.documents == null) {
			this.documents = new ArrayList<>();
		}
		if (!this.documents.contains(documentsItem))
			this.documents.add(documentsItem);

		return this;
	}

}
