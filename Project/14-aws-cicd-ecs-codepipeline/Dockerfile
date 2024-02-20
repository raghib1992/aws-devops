FROM centos:centos6

LABEL Author="RAghib Nadim"

RUN yum install -y httpd

COPY index.html /var/www/html/

CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]