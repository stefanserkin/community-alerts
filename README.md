# Community Alerts

Communicate real-time information to community users based on database events.

## Before You Install Community Alerts

Installation will fail if Digital Experiences are not yet enabled in the target org, or if the target org does not have access to the Streaming API.

Enable Digital Experiences from Setup > Feature Settings > Digital Experiences > Settings. Select Enable Digital Experiences.

## Install Unlocked Package

**Latest (ver 0.4)**
Production: https://login.salesforce.com/packaging/installPackage.apexp?p0=04tPg0000001iyHIAQ
Sandbox: https://test.salesforce.com/packaging/installPackage.apexp?p0=04tPg0000001iyHIAQ

## Post-Installation Steps

1. Add Community Alerts component to community pages
    - When adding the component to a page, enable Subtle Mode to show an alert button icon that can be clicked for more information, rather than the full alerts panel.
2. Assign Community Alerts User permission set to external users that should see alerts

## Docs

- [Quip](https://quip.com/WneAAPF0RFOo/Community-Alerts)
- [Platform Show Toast Event](https://developer.salesforce.com/docs/component-library/bundle/lightning-platform-show-toast-event/documentation)

## License
This package is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for more information.
