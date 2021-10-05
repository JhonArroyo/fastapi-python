## docker pull mysql ##
## docker run --name mysql-fastapi -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:latest ##
## docker exec -it mysql-fastapi bash ##
## mysql -u root -ppassword ##
##
### mysql+pymsql://root:ppassword@localhost:3306/userdb
##
FROM python:3.9.7-slim-buster
##
COPY . usr/src/app
##
WORKDIR /usr/src/app
##
RUN pip install -r requirements.txt
##
ENTRYPOINT uvicorn --host 0.0.0.0 app:app --reload
##
##
# docker -t fastapi_python_0 .
# docker run --name fastapi_python -it -p 8000:8000 -v ${PWD}:/usr/src/app fastapi_python


