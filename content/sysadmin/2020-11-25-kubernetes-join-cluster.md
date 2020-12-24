---
type   : post
title  : "Kubeadm - join to cluster"
date   : 2020-11-25T12:11:35+07:00
categories: [sysadmin]
tags      : [kubernetes]

excerpt:
    Join Cluster (If you have multi node service)
---

### Preface
>Main idea: Join Cluster (If you have multi node service)

### Prerequisite
- kubelet (tools to run kubeadm)
- kubernetes multi node cluster

### Join a cluster in multi node service
I want to join the node so, first check kubelet with ```systemctl status kubelet```. It should running.

At Master node, I can generate token first

    $ kubeadm token generate
    y1wd9w.6458v0ag5l2l1t6m

And generate node join command

    $ kubeadm token create y1wd9w.6458v0ag5l2l1t6m
    W1126 22:54:10.911297   87533 configset.go:348] WARNING: kubeadm cannot validate component configs for API groups [kubelet.config.k8s.io kubeproxy.config.k8s.io]
    y1wd9w.6458v0ag5l2l1t6m

At Worker node, I can join with the generated token from Master node

    kubeadm join 192.168.39.153:8443 --token hp9b0k.1g9tqz8vkf78ucwf --discovery-token-ca-cert-hash

### Reference
- [Kubernetes - create a new token and join command](https://monowar-mukul.medium.com/kubernetes-create-a-new-token-and-join-command-to-rejoin-add-worker-node-74bbe8774808)
