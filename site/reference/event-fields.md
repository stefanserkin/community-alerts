---
title: Community Alert event fields
---

# Community Alert event fields

The Community Alert platform event (`alts__Community_Alert__e`) carries everything the component needs to display, update or remove an alert. The package namespace is `alts`; API names below are shown without the namespace prefix.

| Field | API name | Type | Required | Description |
|---|---|---|---|---|
| Action | `Action__c` | Text (50) | Yes | `Create` adds an alert to the display. `Update` or `Delete` updates or removes the alerts related to the Related Record ID. `Toast Only` displays a toast message without recording any message in the component. Values are case-insensitive. |
| Message | `Message__c` | Long Text Area (5000) | | The message to display to the user. Displayed as rich text. |
| Related Record ID | `Related_Record_ID__c` | Text (18) | Yes | A unique identifier for this Community Alert, used to update or remove the alert in later events. If you're unsure, set this to the record ID of the record that inspired the alert. |
| Show Toast | `Show_Toast__c` | Checkbox | | If true, a toast message is displayed to the user. |
| Toast Title | `Toast_Title__c` | Text (255) | | If showing a toast message, optionally define a title. |
| Toast Variant | `Toast_Variant__c` | Text (50) | | If showing a toast message, choose `error`, `success`, `warning` or `info`. |
| Toast Message | `Toast_Message__c` | Text (255) | | If showing a toast message, optionally provide an alternate message for the body. |
| Toast Mode | `Toast_Mode__c` | Text (50) | | How persistent the toast is. `dismissible` (default) remains visible until the user clicks the close button or 3 seconds have elapsed, whichever comes first. `pester` remains visible for 3 seconds and disappears automatically, with no close button. `sticky` remains visible until the user clicks the close button. |
| User ID | `User_ID__c` | Text (18) | Yes | The ID of the logged-in user that should see this alert. |

Toast messages use the Lightning platform's show toast event. See Salesforce's [ShowToastEvent documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning-platform-show-toast-event/documentation) and the [Lightning Design System toast component](https://www.lightningdesignsystem.com/components/toast/).
