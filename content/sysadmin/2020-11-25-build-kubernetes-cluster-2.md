---
type   : post
title  : "Build a single node kubernetes cluster using Minikube (Still in Kali Linux)"
date   : 2020-11-25T10:11:35+07:00
categories: [sysadmin]
tags      : [kubernetes, Kali Linux]

excerpt:
    This is tutorial how to setup single node kubernetes cluster (using minikube)
---

### Preface
> Main idea: This is tutorial how to setup single node kubernetes cluster (using minikube)

I'm no idea with **k3s** from rancher. Kali Linux not supported yet. And I want create multi node, but no luck. Theris no idea with build from stratch haha. It's hardest way and hardest hardware requirements.

### Reading
Follow the official documentation:
- https://minikube.sigs.k8s.io/docs/start/

### Minikube Setup
Like kind, minikube is a tool that lets you run Kubernetes locally. minikube runs a single-node Kubernetes cluster on your personal computer.

It's another lightweight tool to run kubernetes locally. This is not my way before (k3s get fails). Minikube not multi node and okay I will change my workflow in my work experiment.

what's Minikube need?

- 2 CPUs or more
- 2GB of free memory
- 20GB of free disk space

#### installation
    curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
    sudo install minikube-linux-amd64 /usr/local/bin/minikube

And then, prepare for minikube base system with ```minikube start```

![](https://res.cloudinary.com/bimagv/image/upload/v1608794359/2020-11/2020-11-25-build-kubernetes-cluster-3.png)

See the error!

    end with exit status 1.

I will start again with specific driver ```minikube start --driver=docker``` the service still show an error

*```StartHost failed```, but will try again: provision: Temporary Error: NewSession: new client: new client: ssh: handshake failed: ssh: unable to authenticate, attempted methods [none publickey], no supported methods remain*

looks like theris no failure with my computer. It is building fail container and kubernetes in minikube. I will start again the service with delete them first (like the hint error).

Actually minikube with **docker driver** ```minikube start --driver=docker``` I'm still not get luck

OK.. TRY to use different VM driver! **KVMMMMMMM!!!!!!!!!!!!!!!!!!!!!!!**

I have this!

```
$ virt-host-validate
  QEMU: Checking for hardware virtualization                                 : PASS
  QEMU: Checking if device /dev/kvm exists                                   : PASS
  QEMU: Checking if device /dev/kvm is accessible                            : PASS
  QEMU: Checking if device /dev/vhost-net exists                             : PASS
  QEMU: Checking if device /dev/net/tun exists                               : PASS
...
```
(I have KVM installed)

So, Start minikube with ```minikube start --driver=docker```

![](https://res.cloudinary.com/bimagv/image/upload/v1608795043/2020-11/2020-11-25-build-kubernetes-cluster-4.png)

This is unbelievable haha.. working with just first trying

Now, I can use it to access new cluster

```
$ kubectl get po -A

NAMESPACE     NAME                               READY   STATUS    RESTARTS   AGE
kube-system   coredns-f9fd979d6-mbkk7            1/1     Running   0          2m41s
kube-system   etcd-minikube                      1/1     Running   0          2m44s
kube-system   kube-apiserver-minikube            1/1     Running   0          2m44s
kube-system   kube-controller-manager-minikube   1/1     Running   0          2m44s
kube-system   kube-proxy-rdw5n                   1/1     Running   0          2m41s
kube-system   kube-scheduler-minikube            1/1     Running   0          2m43s
kube-system   storage-provisioner                1/1     Running   0          2m46s
```

And now, I can start Web GUI with ```minikube dashboard``` command

![](https://res.cloudinary.com/bimagv/image/upload/v1608795211/2020-11/2020-11-25-build-kubernetes-cluster-5.png)

At this kubernetes web GUI, I have two deployment
- hello-minikube as testing
- and LoadBalancer for alternative Ingress

Start LoadBalancer with ```minikube tunnel```

```
$ minikube tunnel
[sudo] password for bima:        
Status:
	machine: minikube
	pid: 59715
	route: 10.96.0.0/12 -> 192.168.39.153
	minikube: Running
	services: [balanced]
    errors:
		minikube: no errors
		router: no errors
		loadbalancer emulator: no errors
...
```

to stop it just terminate and ```run minikube tunnel --cleanup```

Look the tutorials here:
- https://minikube.sigs.k8s.io/docs/start/#loadbalancer-deployments

Minikube not start every boot. So, after rebooting system,

Start again minikube with

    minikube start --driver=kvm2
