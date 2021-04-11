+++
categories = ["security"]
date = 2021-04-10T17:00:00Z
excerpt = "Metasploit: No local databased found"
tags = ["metasploit"]
title = "Metasploit: No local databased found"
type = "post"

+++
Error message

    ====================================================================================•x[2021-04-11](19:54)x•
     RUNNING VSFTPD 2.3.4 BACKDOOR EXPLOIT 
    ====================================================================================•x[2021-04-11](19:54)x•
    [-] No local database connected, meaning some Metasploit features will not be available. A full list of the affected features & database setup instructions can be found here: https://github.com/rapid7/metasploit-framework/wiki/msfdb:-Database-Features-&-How-to-Set-up-a-Database-for-Metasploit
    RHOST => 
    RHOSTS => 
    LHOST => 127.0.0.1
    LPORT => 4444
    [*] No payload configured, defaulting to cmd/unix/interact
    [*] 103.247.10.208:21 - Banner: 220 ProFTPD Server (ProFTPD) [::ffff:103.247.10.208]
    [*] 103.247.10.208:21 - USER: 331 Password required for YrmW1y:)
    [*] Exploit completed, but no session was created.
    ====================================================================================•x[2021-04-11](19:54)x•
     RUNNING PROFTPD 1.3.3C BACKDOOR EXPLOIT 
    ====================================================================================•x[2021-04-11](19:54)x•
    [-] No local database connected, meaning some Metasploit features will not be available. A full list of the affected features & database setup instructions can be found here: https://github.com/rapid7/metasploit-framework/wiki/msfdb:-Database-Features-&-How-to-Set-up-a-Database-for-Metasploit
    RHOST => 
    RHOSTS => 
    LHOST => 127.0.0.1
    LPORT => 4444
    [-] 103.247.10.208:21 - Exploit failed: A payload has not been selected.
    [*] Exploit completed, but no session was created.
    

Solution: First start and stop postgrest and re-init the database.

    ~ ❯❯❯ msfdb reinit
    /opt/metasploit-framework/embedded/lib/ruby/gems/2.7.0/gems/actionpack-5.2.5/lib/action_dispatch/middleware/stack.rb:37: warning: Using the last argument as keyword parameters is deprecated; maybe ** should be added to the call
    /opt/metasploit-framework/embedded/lib/ruby/gems/2.7.0/gems/actionpack-5.2.5/lib/action_dispatch/middleware/static.rb:111: warning: The called method `initialize' is defined here
    [?] Would you like to delete your existing data and configurations?: 
    Please answer yes or no.
    [?] Would you like to delete your existing data and configurations?: yes
    ====================================================================
    Running the 'reinit' command for the database:
    Stopping database at /home/bima/.msf4/db
    Deleting all data at /home/bima/.msf4/db
    Creating database at /home/bima/.msf4/db
    Starting database at /home/bima/.msf4/db...success
    Creating database users
    Writing client authentication configuration file /home/bima/.msf4/db/pg_hba.conf
    Stopping database at /home/bima/.msf4/db
    Starting database at /home/bima/.msf4/db...success
    Creating initial database schema
    ====================================================================
    
    ====================================================================
    Running the 'reinit' command for the webservice:
    Stopping MSF web service PID 5223
    [?] Initial MSF web service account username? [bima]: bima
    [?] Initial MSF web service account password? (Leave blank for random password): 
    Generating SSL key and certificate for MSF web service
    Attempting to start MSF web service...success
    MSF web service started and online
    Creating MSF web service user bima
    
        ############################################################
        ##              MSF Web Service Credentials               ##
        ##                                                        ##
        ##        Please store these credentials securely.        ##
        ##    You will need them to connect to the webservice.    ##
        ############################################################
    
    MSF web service username: bima
    MSF web service password: msfconsole
    MSF web service user API token: 75fbcab3124b4496b18f7287fbc8e75471be956808c399f14a37bd00d22fa0f3d032a29033a36f42
    
    
    MSF web service configuration complete
    The web service has been configured as your default data service in msfconsole with the name "local-https-data-service"
    
    If needed, manually reconnect to the data service in msfconsole using the command:
    db_connect --token 75fbcab3124b4496b18f7287fbc8e75471be956808c399f14a37bd00d22fa0f3d032a29033a36f42 --cert /home/bima/.msf4/msf-ws-cert.pem --skip-verify https://localhost:5443
    
    The username and password are credentials for the API account:
    https://localhost:5443/api/v1/auth/account
    
    ====================================================================

Ty