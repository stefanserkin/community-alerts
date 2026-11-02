---
title: Publish alerts
---

# Publish alerts

Alerts are shown to the user based on the details of Community Alert platform events that you publish in your automation. Publish them from [Flow](flow.md) or [Apex](apex.md).

!!! warning "Don't send sensitive information"
    Do not use Community Alerts to communicate any sensitive information, including PII such as names and email addresses. Though the typical user only sees alerts intended for them, a bad actor with the right skills and intentions could access all alerts. **Compose your alerts as if anyone tuning into the right frequency could intercept them.**

## Address the alert

The **User ID** field determines which user a message is shown to. Failing to set this field properly could expose the message to an unintended recipient.

## Update and remove alerts

The **User ID** and **Related Record ID** fields are critical to the display options you have when you configure a new alert.

The **Related Record ID** field is used to continue to interact with messages on display. When creating an alert, set the **Action** field to `Create` and provide any value in the **Related Record ID** field. Typically, this is the record ID of the record that triggered the alert. When you later publish another alert with the same **Related Record ID** and **User ID** values, use the `Update` and `Delete` actions to update or remove that alert from the user's view.

An example is a message with a discount amount during a shopping experience, since the discounted value keeps changing as items are added to the cart. When new items are added to the cart, create alerts with **Action** equal to `Update` to ensure only one alert is displayed at a time, with the message up to date.

To show a toast message without adding anything to the alerts panel, set **Action** to `Toast Only`. Action values are case-insensitive.

Every field is described in the [Community Alert event fields](../reference/event-fields.md) reference.
