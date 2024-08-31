@IsTest
private class CommunityAlertsController_Test {

    @IsTest
    static void testGetSessionId() {
        Test.startTest();
        String sessionId = CommunityAlertsController.getSessionId();
        Test.stopTest();
        Assert.areEqual(UserInfo.getSessionId(), sessionId, 'Returned session id does not match session');
    }

    @IsTest
    static void testGetNamespace() {
        String className = CommunityAlertsController.class.getName();
        String currentNamespace = className.contains('.') ? className.substringBefore('.') : '';
        Test.startTest();
        String result = CommunityAlertsController.getNamespace();
        Test.stopTest();
        Assert.areEqual(currentNamespace, result, 'Received unexpected namespace');
    }

}