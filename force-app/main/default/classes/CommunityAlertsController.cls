public with sharing class CommunityAlertsController {
    
    @AuraEnabled(cacheable=true)
    public static String getSessionId() {
        return UserInfo.getSessionId();
    }

    @AuraEnabled(cacheable=true)
    public static String getNamespace() {
        String className = CommunityAlertsController.class.getName();
        String namespace = className.contains('.') ? className.substringBefore('.') : '';
        return namespace;
    }
    
}