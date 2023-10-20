# Sample Guestbook

## System requirements
You’ll want to ensure you have the following already installed on your local machine before getting started:
* [Docker](https://docs.docker.com/get-docker/)
* [Nodejs 18](https://github.com/nvm-sh/nvm/)

Optional
* [kubectl](https://kubernetes.io/docs/tasks/tools/)
* [jq](https://jqlang.github.io/jq/download/)
* [minikube](https://minikube.sigs.k8s.io/docs/start/)

## Getting Started
```shell
docker-compose build
docker-compose up
```

### Testing Endpoints
```shell
# Check application is running
curl http://localhost:8080/ | jq .

# Create new submission
 curl -H 'Content-Type: application/json' \
      -d '{ "title":"Hello world","description":"It is a long body"}' \
      -X POST \
      http://localhost:8080/api/posts | jq .
 
 curl -H 'Content-Type: application/json' \
      -d '{ "title":"Hello Devs","description":"It is a long body"}' \
      -X POST \
      http://localhost:8080/api/posts | jq .      
      
# Get all posts
curl http://localhost:8080/api/posts | jq .

# Search post      
curl "http://localhost:8080/api/posts?title=hello+world" | jq .

# Get Published entries
curl "http://localhost:8080/api/posts/published" | jq .

# Update Post (replace :id with correct id saved previously)
 curl -H 'Content-Type: application/json' \
      -d '{ "title":"Hello Devs updated","description":"It is a long body updated"}' \
      -X PUT \
      http://localhost:8080/api/posts/:id | jq . 
      
 curl -H 'Content-Type: application/json' \
      -d '{ "published":true}' \
      -X PUT \
      http://localhost:8080/api/posts/6521ac46937fa49847ba4833 | jq .       
      
# Delete post
curl -X DELETE http://localhost:8080/api/posts/:id   

# Delete all posts
curl -X DELETE http://localhost:8080/api/posts  

```

## Kubernetes Setup (Locally)
```shell
# Build & push docker image to local kubernates
docker build -t guestbookapp .
minikube image load guestbookapp

# Setup
kubectl create namespace guestbook-local
kubectl create secret generic database-secret --from-literal=DB_PASS=$(echo -n 'mypassword' | base64) --namespace guestbook-local
kubectl apply -k ./deployment/overlays/local

# Access Locally
kubectl port-forward service/webapp-v1 8080:8080 -n guestbook-local


# Delete
kubectl delete -k ./deployment/overlays/local
```

### Troubleshoot
You have the flexibility to switch the namespace to either "guestbook-develop" or "guestbook-main" to operate within the staging or production environment, respectively.

```shell
kubectl describe $(kubectl get pods --selector "app=mongo" --output=name --namespace guestbook-local) --namespace guestbook-local
kubectl logs $(kubectl get pods --selector "app=webapp" --output=name --namespace guestbook-local) --namespace guestbook-local
kubectl exec --stdin --tty $(kubectl get pods --selector "app=webapp" --output=name --namespace guestbook-local) --namespace guestbook-local -- /bin/bash
kubectl exec --stdin --tty $(kubectl get pods --selector "app=mongo" --output=name --namespace guestbook-local) --namespace guestbook-local -- /bin/bash

kubectl cp ./app/src/config.js guestbook-local/$(kubectl get pods --selector "app=webapp" --output=name --namespace guestbook-local | head -n 1 | awk -F/ '{print $2}'):/app/src/config.js
```
