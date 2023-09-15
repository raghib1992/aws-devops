# Server side encryption, customer managed keys

1. Create a key
openssl enc -aes-128-cbc -k mysecret -P
### **output**
```t
*** WARNING : deprecated key derivation used.
Using -iter or -pbkdf2 would be better.
salt=EF6EFCF9A2DB850E
key=1DCE4B515B062732823F26FD3092AFDF
iv =1D48E449EDDBC4936A6326015C716B0B
```
2. Upload file without encryption
aws s3 cp file.txt s3://raghib-encryption-test

3. Upload file with customer provided key
aws s3 cp .\code.txt s3://raghib-encryption-test --sse-c --sse-c-key 1DCE4B515B062732823F26FD3092AFDF

4. Verify the same in aws s3 console
