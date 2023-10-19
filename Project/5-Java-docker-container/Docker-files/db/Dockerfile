FROM mysql:8.0.33
LABEL "Project"="vprofile"
LABEL "Author"="Raghib"

ENV MYSQL_DATABASE="accounts"
ENV MYSQL_ROOT_PASSWORD="vprodbpass"

ADD db_backup.sql /docker-entrypoint-initdb.d/db_backup.sql