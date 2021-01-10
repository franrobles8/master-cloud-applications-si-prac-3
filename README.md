# Eoloplants

This project consists on the creation of different services that work together as a distributed system. To achieve this, we have created an application that creates eolic plants (without a complex business logic) using the following services:

**Client:** It's included in the Server as static files and consumes the REST API created in the Server. It allows to create new Eoloplants and see the progress of the ones that are being/already created.

**Server:** Exposes a Node REST API that contains the operations to create, delete, update and list eoloplants using a MySQL database. To communicate with the the planner to process and create the eoloplants, we use RabbitMQ queues. Websockets are also being used to give information to the Client.

**WeatherService:** Contains a gRPC API capable to return to the planner whether a city passed by parameter has a rainy or a sunny weather. To simulate the processing, we use a "sleep" function to make it last between 1-3 seconds.

**TopoService:** Exposes a Java/Springboot REST API to return if a city has a "Flat" or a "Mountain" topography. It's been created using Functional Reactive Java programming with WebFlux. The time to process the information is also simulated and it last between 1-3 seconds.

**Planner:** This service consumes a queue to see that new cities have been created and uses the **WeatherService** and **TopoService** to fetch the information and return every progress to a new "progress" queue that the Server will consume to send it to the Client via websockets.

## Installation

**Important:** Make sure theses ports (8080, 3000, 9090) are not being used before proceeding. We'll need them use the app.

* Create and run the MySQL docker container that will be used by the server and contains the information about the eoloplants. For this, you would need to install docker. (Install a db client like "DBeaver" if you want to see the information):

    ```shell
    docker run --rm -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=eoloplantsDB -p 3306:3306 -d mysql:8.0.22
    ```

* Create and run the RabbitMQ docker container that will be use for both queues, the one that contains messages from created eoloplants and the other one with the progresses (RabbitMQ UI can be found in http://localhost:15672):

    ```shell
    docker run --rm -p 5672:5672 -p 15672:15672 rabbitmq:3-management
    ```

* Create and run a MongoDB container. This will be used by the TopoService to store information about some cities and the topography they have (if you want to see the db, you can use a client like "Compass" to do it):

    ```shell
    docker run --rm -p 27017:27017 -d mongo:4.4-bionic
    ```

* With all the previous steps done, go to the root of the project with your favorite CLI and run (You must have Node and Maven installed):

    ```shell
    node install.js
    ```

    ```shell
    node exec.js
    ```

* You are ready to go!

## Use

Go to the [client app](http://localhost:3000). There, you'll see a list of pre-created eoloplants. Try creating a new one with the form that can be seen below the list of eoloplants. Once you submit the information, it will start the process to create and fetch the information amongst all the different services described above. During the creation progress, you'll be able to see a progress bar with the creation progress for the city. The submit button will be disabled until the system finishes the creation (but this won't stop you from opening a new tab simulating a new client and try to create a new eoloplant in parallel).