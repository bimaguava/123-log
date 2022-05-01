+++
categories = ["computer"]
date = 2022-04-30T17:00:00Z
excerpt = "Arch Linux error libinih key pgp or keyring signature"
tags = ["arch"]
title = "Arch Linux error libinih key pgp or keyring signature"
type = "post"

+++
this thing

     sudo pacman -Syu
     ...
     mpg123-1.29.3-2-x86_64                                        435,9 KiB  1147 KiB/s 00:00 [----------------------------------------------------] 100%
     gnupg-2.2.35-1-x86_64                                           2,3 MiB  1626 KiB/s 00:01 [----------------------------------------------------] 100%
     Total (7/7)                                                     5,6 MiB  3,73 MiB/s 00:02 [----------------------------------------------------] 100%
    (384/384) checking keys in keyring                                                         [----------------------------------------------------] 100%
    downloading required keys...
    :: Import PGP key 0F65C7D881506130, "Maxime Gauduin <alucryd@archlinux.org>"? [Y/n] y
    (384/384) checking package integrity                                                       [-----------------------------------------------------] 100%
    error: libinih: key "95220BE99CE6FF778AE0DC670F65C7D881506130" is unknown
    :: Import PGP key 95220BE99CE6FF778AE0DC670F65C7D881506130? [Y/n] n
    :: File /var/cache/pacman/pkg/libinih-55-2-x86_64.pkg.tar.zst is corrupted (invalid or corrupted package (PGP signature)).
    Do you want to delete it? [Y/n] n
    error: failed to commit transaction (invalid or corrupted package)
    Errors occurred, no packages were upgraded.

so, run _sudo pacman -S archlinux-keyring_ to install or update or something .. ensure this tool on your machine.

    Package (1)             Old Version  New Version  Net Change
    
    core/archlinux-keyring  20220224-1   20220424-1     0,02 MiB
    
    Total Installed Size:  1,46 MiB
    Net Upgrade Size:      0,02 MiB
    
    :: Proceed with installation? [Y/n] y
    (1/1) checking keys in keyring                                                             [-----------------------------------------------------] 100%
    (1/1) checking package integrity                                                           [-----------------------------------------------------] 100%
    (1/1) loading package files                                                                [-----------------------------------------------------] 100%
    (1/1) checking for file conflicts                                                          [-----------------------------------------------------] 100%
    (1/1) checking available disk space                                                        [-----------------------------------------------------] 100%
    :: Processing package changes...
    (1/1) upgrading archlinux-keyring                                                          [-----------------------------------------------------] 100%
    ==> Appending keys from archlinux.gpg...
    ==> Updating trust database...
    gpg: next trustdb check due at 2022-05-06
    ==> Updating trust database...
    gpg: next trustdb check due at 2022-05-06
    :: Running post-transaction hooks...
    (1/1) Arming ConditionNeedsUpdate...

and lets see what if I return the update command

    [ok@pingu ~]$ sudo pacman -Syu
    :: Synchronizing package databases...
     arcolinux_repo is up to date
     arcolinux_repo_3party is up to date
     arcolinux_repo_xlarge is up to date
     core is up to date
     extra is up to date
     community is up to date
     multilib is up to date
    :: Starting full system upgrade...
    :: Replace crda with core/wireless-regdb? [Y/n] y
    resolving dependencies...
    looking for conflicting packages...
    warning: dependency cycle detected:
    warning: harfbuzz will be installed before its freetype2 dependency
    warning: dependency cycle detected:
    warning: smbclient will be installed before its cifs-utils dependency
    
    Package (384)                                         Old Version              New Version              Net Change
    
    extra/accountsservice                                 22.07.5-1                22.08.8-2                  0,02 MiB
    extra/adwaita-icon-theme                              41.0-1                   42.0+r1+gc144c3d75-1      -6,08 MiB
    extra/alsa-card-profiles                              1:0.3.47-2               1:0.3.51-1                 0,00 MiB
    extra/appstream                                       0.15.2-1                 0.15.3-1                   0,06 MiB
    community/arc-gtk-theme                               20220102-1               20220405-1                -3,08 MiB
    extra/archiso                                         61-1                     63-1                       0,00 MiB
    arcolinux_repo_3party/archlinux-appstream-data-pamac  1:20220107-1             1:20220327-1               0,06 MiB
    ...

and it just work... and happy eid mubarok my friends