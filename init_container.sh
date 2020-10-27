#!/bin/sh

# Execute SSH
/usr/sbin/sshd

# Start NGINX
exec nginx -g 'daemon off;' "$@"