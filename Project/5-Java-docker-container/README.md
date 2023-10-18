1. Create account in Dockerhub
2. Create Repository in Dockerhub
- vprofileweb
- vprofiledb
- vprofileapp
3. Create Dockerfile
- REF: *https://docs.docker.com/engine/reference/builder/*
- Always use multi stage Dockerfile to keep docker image size low, in one stage create artifacts and other stage copy the artifacts