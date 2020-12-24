---
type   : post
title  : "Build a multi node kubernetes cluster using k3s (I'm in Kali Linux)"
date   : 2020-11-25T09:11:35+07:00
categories: [sysadmin]
tags      : [kubernetes, Kali Linux]

excerpt:
    This is tutorial how to setup multi node kubernetes cluster (using k3s)
---

### Preface
> Main idea: This is tutorial how to setup kubernetes cluster multi node (using k3s)

### List of Cluster
This is tool for running a kubernetes cluster with one node or multi node in my virtual machine
- [Minikube](https://github.com/kubernetes/minikube) (single node)
- [Docker in Docker](https://github.com/kubernetes-sigs/kubeadm-dind-cluster)
- [Microk8s](https://microk8s.io/) (single node)
- [k3s](https://github.com/rancher/k3s) (multi node)
- [build from stratch](https://medium.com/paul-zhao-projects/bootstrap-kubernetes-the-hard-way-on-vagrant-on-local-machine-bd085bb196b3)

### Reading
Information about option to run kubernetes locally
- [https://developer.ibm.com/technologies/containers/blogs/options-to-run..](https://developer.ibm.com/technologies/containers/blogs/options-to-run-kubernetes-locally/)

### k3s master and worker setup
#### Prerequisites
- Kubernetes worker (kubectl, kubeadm, kubelet, containerd, ctr)
- k3s it self [https://github.com/rancher/k3s/releases/tag/v1.19.4+k3s1](https://github.com/rancher/k3s/releases/tag/v1.19.4+k3s1
)
- Ubuntu system

#### Setup k3s server (master) in Ubuntu 18.04
Using k3s is simple way that you can join host (In this case Kali Linux machine) to the Master node (Ubuntu)

source: [https://www.liquidweb.com/kb/how-to-install-and-configure-k3s-on-ubuntu-18-04/]([https://www.liquidweb.com/kb/how-to-install-and-configure-k3s-on-ubuntu-18-04/)

In this node I have IP: ```192.168.0.15```

    curl -sfL https://get.k3s.io | sh -
    systemctl status k3s

The kubeconfig file is written to ```/etc/rancher/k3s/k3s.yaml``. This file is required for the Kubernetes configuration. Let see configuration file

```
$ sudo cat /etc/rancher/k3s/k3s.yaml

apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CR...lRJRklDQVRFLS0tLS0K
    server: https://127.0.0.1:6443
  name: default
contexts:
- context:
    cluster: default
    user: default
  name: default
current-context: default
kind: Config
preferences: {}
users:
- name: default
  user:
    client-certificate-data: LS0tLS1CRUdJT...VJUSUZJFURS0tLS0tCg==

    client-key-data: 3I0UndHb3FMT2NGgUFJ...SBLRVktLS0tLQo=
```

Add authentication at **users:** menu

```
- name: default
  user:
    username: bima
    password: bismillah
```

Be sure, k3s services is run and check node list with command ```sudo k3s kubectl get node```

![](https://res.cloudinary.com/bimagv/image/upload/v1608792089/2020-11/2020-11-25-build-kubernetes-cluster.png)

And it say status: **ready**.

To install K3s on the server, the agent needs to passing ```K3S_URL``` along with the **K3S_TOKEN** or **K3S_CLUSTER_SECRET** variables.

We will use the **K3S_TOKEN** variable, we can see it in **/var/lib/rancher/k3s/server/node-token**

```
$ sudo cat /var/lib/rancher/k3s/server/node-token
K1098526a9f3f28921a0248386d6c207bde4c260edec841da201b757d25f7d1c931::server:666367da95e338a438510908665a6f2d
```

this token will be add in **worker host** with ```NODE_TOKEN="<token_here>"```. In my case I use **Kali Linux** as worker node.

#### Setup k3s worker host in Kali Linux
installation

    curl -sfL https://get.k3s.io | sh -

set temporary ```$PATH``` first

    NODE_TOKEN="K1098526a9f3f28921a0248386d6c207bde4c260edec841da201b757d25f7d1c931::server:666367da95e338a438510908665a6f2d"


and then, add k3s master's token

    sudo k3s agent --server https://192.168.0.15:6443 --token ${NODE_TOKEN}

But, in Kali Linux does not supported from k3s haha. In installation will be fail.

Like This

![](https://res.cloudinary.com/bimagv/image/upload/v1608792143/2020-11/2020-11-25-build-kubernetes-cluster-2.png)

To examine this problem. For the further I will setup with another cluster. Maybe it's single nodes.
