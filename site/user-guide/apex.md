---
title: Publish from Apex
---

# Publish from Apex

To publish an alert from Apex, create a `alts__Community_Alert__e` record and publish it with `EventBus.publish`. This example shows a toast and adds a message to the alerts panel for the running user:

```apex
Id userId = UserInfo.getUserId();
String message = 'Here are some important details you should know';

List<alts__Community_Alert__e> alerts = new List<alts__Community_Alert__e>();
alerts.add(
    new alts__Community_Alert__e(
        alts__Action__c = 'Create',
        alts__User_ID__c = userId,
        alts__Related_Record_ID__c = userId,
        alts__Message__c = message,
        alts__Show_Toast__c = true,
        alts__Toast_Title__c = 'Alert!',
        alts__Toast_Message__c = message,
        alts__Toast_Variant__c = 'success',
        alts__Toast_Mode__c = 'pester'
    )
);
EventBus.publish(alerts);
```

The fields are described in the [Community Alert event fields](../reference/event-fields.md) reference.
