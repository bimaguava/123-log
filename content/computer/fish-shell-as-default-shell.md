+++
categories = ["computer"]
date = 2021-04-18T17:00:00Z
excerpt = "Fish Shell as default shell"
tags = ["fish"]
title = "Fish Shell as default shell"
type = "post"

+++
How to set fish as default shell?

add command `fish` command in /etc/profile, \~/.profile, /etc/environment, /etc/bashrc, or \~/.bashrc.

    cat ~/.bashrc
    # If not running interactively, don't do anything
    [[ $- != *i* ]] && return
    
    # alias ls='ls --color=auto'
    # PS1='[\u@\h \W]\$ '
    
    fish

If greetings message fish look not good, you can disable it

    set fish_greetings

Ty.

## Update Aug 2022

There are multiple ways to switch to fish (or any other shell) as your default.

The simplest method is to set your terminal emulator (eg GNOME Terminal, Apple’s Terminal.app, or Konsole) to start fish directly. See its configuration and set the program to start to `/usr/local/bin/fish` (if that’s where fish is installed - substitute another location as appropriate).

Alternatively, you can set fish as your login shell so that it will be started by all terminal logins, including SSH.

### Warning

Setting fish as your login shell may cause issues, such as an incorrect [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH). Some operating systems, including a number of Linux distributions, require the login shell to be Bourne-compatible and to read configuration from `/etc/profile`. fish may not be suitable as a login shell on these systems.

To change your login shell to fish:

1. Add the shell to `/etc/shells` with:

       > echo /usr/bin/fish | sudo tee -a /etc/shells
       COPY

   cat `/etc/shells`

       # /etc/shells: valid login shells
       /usr/bin/fish
       /bin/sh
       /bin/bash
       /usr/bin/bash
       /bin/rbash
       /usr/bin/rbash
       /usr/bin/sh
       /bin/dash
       /usr/bin/dash
       /usr/bin/fish
2. Change your default shell with:

       > chsh -s /usr/bin/fish
       COPY

Again, substitute the path to fish for `/usr/bin/fish` - see `command -s fish` inside fish. To change it back to another shell, just substitute `/usr/bin/fish` with `/bin/bash`, `/bin/tcsh` or `/bin/zsh` as appropriate in the steps above.

# Plus

disable greetings on

> \~/.config/fish/functions/fish_user_key_bindings.fish

setup tmux autostart. At the top of my `~/.config/fish/config.fish`

    # Adapted from https://github.com/fish-shell/fish-shell/issues/4434#issuecomment-332626369
    # only run in interactive (not automated SSH for example)
    if status is-interactive
    # don't nest inside another tmux
    and not set -q TMUX
      # Adapted from https://unix.stackexchange.com/a/176885/347104
      # Create session 'main' or attach to 'main' if already exists.
      tmux new-session -A -s main
    end

thank you

## Source

* [https://fishshell.com/docs/current/#default-shell](https://fishshell.com/docs/current/#default-shell "https://fishshell.com/docs/current/#default-shell")