Id userId = UserInfo.getUserId();
String message = 'different thing.';

List<alts__Community_Alert__e> alerts = new List<alts__Community_Alert__e>();
alerts.add(
    new alts__Community_Alert__e(
        alts__Action__c = 'Delete',
        alts__User_ID__c = userId,
        alts__Related_Record_ID__c = '2222',
        alts__Message__c = message,
        alts__Show_Toast__c = false,
        alts__Toast_Title__c = 'Alert!',
        alts__Toast_Message__c = message,
        alts__Toast_Variant__c = 'warning',
        alts__Toast_Mode__c = 'sticky'
    )
);
EventBus.publish(alerts);