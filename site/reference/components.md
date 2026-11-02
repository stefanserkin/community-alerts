---
title: Component glossary
---

# Component glossary

Every component in the Community Alerts unlocked package (namespace `alts`). Source: <https://github.com/stefanserkin/community-alerts>.

| Name | Type | Object | Notes |
|---|---|---|---|
| CommunityAlertsController | Apex Class | | Controller for the component |
| CommunityAlertsController_Test | Apex Class | | @IsTest |
| Action__c | Custom Field | Community Alert | Text (50): Create, Update, Delete, or Toast Only |
| Message__c | Custom Field | Community Alert | Long Text Area (5,000) |
| Related_Record_ID__c | Custom Field | Community Alert | Text (18): the record ID of the record that this alert is related to. Used to update and delete existing alerts. |
| Show_Toast__c | Custom Field | Community Alert | Checkbox: if checked, a toast alert is displayed to the user |
| Toast_Message__c | Custom Field | Community Alert | Text (255) |
| Toast_Mode__c | Custom Field | Community Alert | Text (50) |
| Toast_Title__c | Custom Field | Community Alert | Text (255) |
| Toast_Variant__c | Custom Field | Community Alert | Text (50) |
| User_ID__c | Custom Field | Community Alert | Text (18): the record ID of the user that the alert should be shown to |
| communityAlerts | Lightning Web Component | | The alerts panel, with Subtle Mode |
| communityAlertsPopover | Lightning Web Component | | The popover shown in Subtle Mode |
| Community_Alerts_User | Permission Set | | View and create community alerts |
| Community_Alert__e | Platform Event | Community Alert | See [Community Alert event fields](event-fields.md) |
