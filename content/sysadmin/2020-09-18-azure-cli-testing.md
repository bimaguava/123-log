---
type   : post
title  : "Azure CLI testing"
date   : 2020-09-18T09:17:35+07:00
categories: [sysadmin]
tags      : [azure]

excerpt:
  Login and installations Azure CLI
---
### Preface
> Main idea: Login and installations Azure CLI

### Reading
Follow the official documentation:
- https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest

### Installation
    curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

### Login to Azure
    /e/a/sources.list.d ❯❯❯ az login
    Opening in existing browser session.
    You have logged in. Now let us find all the subscriptions to which you have access...
    [
      {
        "cloudName": "AzureCloud",
        "homeTenantId": "71230268-c00c-4997-adfa-78da8bce75d6",
        "id": "057ce423-3f8f-4b40-8a46-32e9717b7a78",
        "isDefault": true,
        "managedByTenants": [],
        "name": "Free Trial",
        "state": "Enabled",
        "tenantId": "71230268-c00c-4997-adfa-78da8bce75d6",
        "user": {
        "name": "bimaguava@gmail.com",
        "type": "user"
        }
    }
    ]

    /e/a/sources.list.d ❯❯❯
