---
title: Install and set up
---

# Install and set up

## Before you install

Installation fails if Digital Experiences aren't enabled in the target org, or if the org doesn't have access to the Streaming API.

To enable Digital Experiences, go to **Setup → Feature Settings → Digital Experiences → Settings** and select **Enable Digital Experiences**.

## Install

Community Alerts is an unlocked package. Use the install links for the current version (0.4):

- Sandbox and scratch orgs: <https://test.salesforce.com/packaging/installPackage.apexp?p0=04tPg0000001iyHIAQ>
- Production and Developer Edition orgs: <https://login.salesforce.com/packaging/installPackage.apexp?p0=04tPg0000001iyHIAQ>

Install links for previous versions are in the [release notes](../release-notes/index.md).

## Post-installation steps

### Add the component to your site

1. In Experience Builder, open a page where users should see alerts.
2. Add the **Community Alerts** component to the page.
3. Optionally, enable **Subtle Mode**. Instead of the full alerts panel, the component shows an alert icon that users click to open a popover with their alerts. **Subtle Mode Popover Header** sets the popover's title (the default is *Alerts*).
4. Repeat for each page that should show alerts, then publish the site.

### Assign the permission set

Assign the **Community Alerts User** permission set to the external users who should see alerts. It grants Read and Create access to the Community Alert platform event and access to the Apex controller the component uses.

## Next steps

Publish alerts from your automation. See [Publish alerts](../user-guide/index.md).
