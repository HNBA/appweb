# create key and certificate
openssl genrsa -des3 -out server.key 2048
openssl rsa -in server.key -out server.key
openssl req -sha256 -new -key server.key -out server.csr -subj '/CN=sltbda09.dcn.fr.carrefour.com'
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

