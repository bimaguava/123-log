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