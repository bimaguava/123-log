---
type   : post
title  : "Kubectl - config credentials location & REST API"
date   : 2020-11-25T11:11:35+07:00
categories: [sysadmin]
tags      : [kubernetes]

excerpt:
    Accessing credentials with kubectl command
---

### Preface
>Main idea: accessing credentials with kubectl command

### Reading
Follow the official documentation
- Cheatsheet: https://kubernetes.io/docs/reference/kubectl/cheatsheet/
- Manual reference: https://kubernetes.io/docs/reference/kubectl/cheatsheet/

### Credentials location of kubectl config

![](https://res.cloudinary.com/bimagv/image/upload/v1608796195/2020-11/2020-11-25-kubernetes-verification-and-credentials-command.png)

### REST API information
```
bima@x220:~/.config$ APISERVER=$(kubectl config view --minify | grep server | cut -f 2- -d ":" | tr -d " ")
bima@x220:~/.config$ SECRET_NAME=$(kubectl get secrets | grep ^default | cut -f1 -d ' ')
bima@x220:~/.config$ TOKEN=$(kubectl describe secret $SECRET_NAME | grep -E '^token' | cut -f2 -d':' | tr -d " ")

bima@x220:~/.config$ curl $APISERVER/api --header "Authorization: Bearer $TOKEN" --insecure
{
  "kind": "APIVersions",
  "versions": [
    "v1"
  ],
  "serverAddressByClientCIDRs": [
    {
      "clientCIDR": "0.0.0.0/0",
      "serverAddress": "192.168.39.153:8443"
    }
  ]

```
