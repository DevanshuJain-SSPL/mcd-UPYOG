package org.egov.ptr.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;
import org.egov.tracer.config.TracerConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

import java.math.BigDecimal;
import java.util.TimeZone;

@Import({ TracerConfiguration.class })
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Component
public class PetConfiguration {

	@Value("${app.timezone}")
	private String timeZone;

	@PostConstruct
	public void initialize() {
		TimeZone.setDefault(TimeZone.getTimeZone(timeZone));
	}

	@Bean
	@Autowired
	public MappingJackson2HttpMessageConverter jacksonConverter(ObjectMapper objectMapper) {
		MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
		converter.setObjectMapper(objectMapper);
		return converter;
	}

	// PERSISTER
	@Value("${ptr.kafka.create.topic}")
	private String createPtrTopic;

	@Value("${ptr.kafka.update.topic}")
	private String updatePtrTopic;

	@Value("${ptr.kafka.renew.topic}")
	private String renewPtrTopic;

	// USER
	@Value("${egov.user.host}")
	private String userHost;

	@Value("${egov.user.search.path}")
	private String userSearchEndpoint;
	
	@Value("${egov.user.context.path}")
	private String userContextPath;

	@Value("${egov.user.create.path}")
	private String userCreateEndpoint;

	@Value("${egov.user.update.path}")
	private String userUpdateEndpoint;
	
	// IDGEN config

	@Value("${egov.idgen.host}")
	private String idGenHost;

	@Value("${egov.idgen.path}")
	private String idGenPath;

	@Value("${egov.idgen.ptrid.format}")
	private String petIdGenFormat;

	@Value("${egov.idgen.ptrid.name}")
	private String petIdGenName;

	@Value("${egov.idgen.ptrtoken.format}")
	private String petTokenFormat;

	@Value("${egov.idgen.ptrtoken.name}")
	private String petTokenName;

	// NOTIFICATION TOPICS
	@Value("${kafka.topics.notification.sms}")
	private String smsNotifTopic;

	@Value("${kafka.topics.notification.email}")
	private String emailNotifTopic;

	@Value("${kafka.topics.receipt.create}")
	private String receiptTopic;

	@Value("${kafka.topics.notification.pg.save.txns}")
	private String pgTopic;

	@Value("${egov.localization.statelevel}")
	private Boolean isStateLevel;

	@Value("${notif.sms.enabled}")
	private Boolean isSMSNotificationEnabled;

	@Value("${notif.email.enabled}")
	private Boolean isEmailNotificationEnabled;

	@Value("${egov.ptr.businessService}")
	private String businessService;

	// Localization
	@Value("${egov.localization.host}")
	private String localizationHost;

	@Value("${egov.localization.context.path}")
	private String localizationContextPath;

	@Value("${egov.localization.search.endpoint}")
	private String localizationSearchEndpoint;

	@Value("${egov.localization.fallback.locale}")
	private String fallBackLocale;
	// USER EVENTS
	@Value("${egov.ui.app.host}")
	private String uiAppHost;

	@Value("${egov.usr.events.create.topic}")
	private String saveUserEventsTopic;

	@Value("${egov.usr.events.pay.code}")
	private String payCode;

	@Value("${egov.user.event.notification.enabled}")
	private Boolean isUserEventsNotificationEnabled;

	@Value("${workflow.host}")
	private String wfHost;

	@Value("${workflow.transition.path}")
	private String wfTransitionPath;

	@Value("${workflow.businessservice.search.path}")
	private String wfBusinessServiceSearchPath;

	@Value("${workflow.processinstance.search.path}")
	private String wfProcessInstanceSearchPath;

	@Value("${is.workflow.enabled}")
	private Boolean isWorkflowEnabled;

	@Value("${workflow.status.active}")
	private String wfStatusActive;

	// ##### mdms

	@Value("${egov.mdms.host}")
	private String mdmsHost;

	@Value("${egov.mdms.search.endpoint}")
	private String mdmsEndpoint;
	
	@Value("${upyog.mdms.v2.host}")
	private String mdmsV2Host;
	
	@Value("${upyog.mdms.v2.search.endpoint}")
	private String mdmsV2Endpoint;
	
	@Value("${upyog.mdms.v2.enabled}")
	private boolean mdmsV2Enabled;
	
	@PostConstruct
	public void init() {
		if(mdmsV2Enabled) {
			mdmsHost = mdmsV2Host;
			mdmsEndpoint = mdmsV2Endpoint;
		}
	}
	
	// Billing-Service

	@Value("${egbs.host}")
	private String egbsHost;

	@Value("${egbs.fetchbill.endpoint}")
	private String egbsFetchBill;

	@Value("${egov.localization.statelevel}")
	private Boolean isLocalizationStateLevel;

	@Value("${egov.billingservice.host}")
	private String billingHost;

	@Value("${egov.demand.create.endpoint}")
	private String demandCreateEndpoint;

	@Value("${egov.demand.update.endpoint}")
	private String demandUpdateEndpoint;

	@Value("${egov.demand.search.endpoint}")
	private String demandSearchEndpoint;

	@Value("${egov.bill.gen.endpoint}")
	private String billGenerateEndpoint;
	
	@Value("${egov.ptr.newapplication.fee}")
	private BigDecimal newApplicationFee;
	
	@Value("${egov.ptr.renewapplication.fee}")
	private BigDecimal renewApplicationFee;
	
}