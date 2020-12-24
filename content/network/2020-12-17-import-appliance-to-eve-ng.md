---
type   : post
title  : "Import appliance to Eve-NG"
date   : 2020-12-17T17:11:35+07:00
categories: [network]
tags      : [eve-ng]

excerpt:
    import many appliance what I need to eve-ng
---

### Preface
>Main idea: import many appliance what I need to eve-ng

### Source images
- [https://drive.google.com/drive/folders/1Gm_S0O9KqQ9QIZE-4FtSXp_wKnAXLAbO](https://drive.google.com/drive/folders/1Gm_S0O9KqQ9QIZE-4FtSXp_wKnAXLAbO)

### Cisco Catalyst 9800 Wireless Controller
```
# Eve-NG Ubuntu Server
mkdir 9800CL-16.11.01c
# Windows
scp csr100vng-universalk9.16.04.01-Everest\virtioa.qcow2 root@192.168.137.128:/opt/unetlab/addons/qemu/9800CL-16.11.01c
```

Follow this article: https://jd-networks.co.uk/blog/2019/09/30/cisco-9800-cl-on-eve-ng/

### Linux Netem
no need to import manually, the image is available as afree addons. Just install it with ```apt```

    apt-get install eve-ng-addons-netem

### Linux Tinycore
```
# Eve-NG Ubuntu Server
mkdir linux-tinycore6.4
# Windows
scp linux-tinycore6.4\hda.qcow2 root@192.168.137.128:/opt/unetlab/addons/qemu/linux-tinycore6.4
```

Follow this article: https://networkingpills.wordpress.com/2017/01/06/modifying-base-images-with-snapshots-on-unetlabeve-ng-alpha/

Updated:
> Version 6.4 has a bug. For better use linux tinycore11!
It's

just download at [osdn](https://osdn.net/projects/sfnet_qcow2image/downloads/TinyCoreLinux/TinyCoreLinuxGUI.qcow2/) and import to eve-ng

### Palo Alto
just copy paste .qcow2 and login with admin admin

### Sophos XG
copy paste **AUXILARY.qcow2** and **PRIMARY.qcow2**

    mv PRIMARY-DISK.qcow2 virtioa.qcow2
    mv AUXILIARY-DISK.qcow2 virtiob.qcow2

I'm not use Sophos UTM (Unified Threat Management). Just need XG

browser http://ip:4444

### pfSense CE
#### Version 2.4.4!!! (memstick-serial)
copy paste **pfSense-CE-memstick-serial-2.4.4-RELEASE-p3-amd64.img**
```
cd pfSense-CE-2.4.4
mv pfSense-CE-memstick-serial-2.4.4-RELEASE-p3-amd64.img install.img

# still in pfSense-CE directory
##creating disk
/opt/qemu/bin/qemu-img create -f qcow2 virtioa.qcow2 2G
##installing pfSense (don't terminate! it will be take a long)
/opt/qemu/bin/qemu-system-x86_64 -hda install.img -hdb virtioa.qcow2 -nographic
```

- VLAN: n
- WAN interface: select em0
- LAN interface: enter

```
rm install.img
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

Default username admin password pfsense

#### Version 2.3.5 (nanobsd) recomend
copy paste **pfSense-CE-2.3.5-RELEASE-2g-amd64-nanobsd.img**

```
# make directory pfsense-CE-2.3.5 (like this)
cd pfsense-CE-2.3.5
mv pfSense-CE-2.3.5-RELEASE-2g-amd64-nanobsd.img hda.qcow2
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

Default username admin password pfsense

### FortiGate
#### FortiGate
add directory name: **fortinet-FGT-v6-build0076**

copy paste **FGT_VM64_KVM-v6-build0076-FORTINET.out.kvm.qcow2**

rename to virtioa.qcow
```
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

#### FortiManager
add directory name: **fortinet-FMG-v6-build0092**

copy paste **FMG_VM64_KVM-v6-build0092-FORTINET.out.kvm.qcow2**

rename to virtioa.qcow

```
cd directory
/opt/qemu/bin/qemu-img create -f qcow2 virtiob.qcow2 100G
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

#### FortiAnalyzer
directory name: **fortinet-FAZ-v6-build0593**
copy paste **FML_VMKV-64-v53-build0593-FORTINET.out.kvm.qcow2**
rename to virtioa.qcow2

```
cd <directory>
/opt/qemu/bin/qemu-img create -f qcow2 virtiob.qcow2 100G
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

### MikroTik CHR
add directory: **mikrotik-6.47.4**

copy paste **chr-6.47.4.img**

rename to hda.qcow2

```
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

Default username is admin with no password.


### Windows Server 2012
add directory: **winserver-2012-16415**

copy paste **Win2k12_9600.16415.amd64fre.winblue_refresh.130928-2229_server_serverdatacentereval_en-us.qcow2**

rename to virtioa.qcow2

```
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

Password : Gtx_Nimda

### How to create iso file to qcow2
Follow the official documentation
- [How to create own windows server on the eve](https://www.eve-ng.net/index.php/documentation/howtos/howto-create-own-windows-server-on-the-eve/)

### OpenWRT
add directory: **linux-openwrt**

copy paste **openwrt-15.05.1-x86-kvm_guest-combined-ext4.img**

```
cd linux-openwrt
qemu-img create -f qcow2 hda.qcow2 1G

ll
-openwrt-15.05.1-x86-kvm_guest-combined-ext4.img (openwrt)
-hda.qcow2 (disk)

dd if=openwrt-15.05.1-x86-kvm_guest-combined-ext4.img of=hda.qcow2
```

### OpenWRT Lede Based (WAN Controller)
```
cd /tmp
wget https://github.com/takigama/nodejs-linux-wanemu-gui/raw/master/lede-based-vm.qcow2.gz
mkdir -p /opt/unetlab/addons/qemu/linux-wanemu-gui
gunzip -c lede-based-vm.qcow2.gz > /opt/unetlab/addons/qemu/linux-wanemu-gui/sataa.qcow2
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

Source: https://github.com/takigama/nodejs-linux-wanemu-gui

### Dynamips
move C1710, C3725, and C7200 to dynamips folder ```/opt/unetlab/addons/dynamips```
```
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```
