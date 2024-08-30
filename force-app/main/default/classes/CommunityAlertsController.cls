public with sharing class CommunityAlertsController {
    
    @AuraEnabled(cacheable=true)
    public static String getSessionId() {
        return UserInfo.getSessionId();
    }
    
}