# SFIA Node Project

In fulfilment of the individual MERN stack project due Friday week 11 at QA consulting.

## Index
[0. The Brief](#brief)
   
[1. Deployment](#depl)
   * [2.i. Prerequisites](#prereq)
   * [2.ii. Installation Guide](#install)

[3. Technologies Used](#tech)
   * [3.i. Improvements for the Future](#improve)

[4. Author](#auth)

[5. Acknowledgements](#ack)

<a name="brief"></a>
# 0. The Brief

This is the assessment for the Node week. This assessment has been designed in relation to the SFIA framework, with the aim of assessing your ability to work towards SFIA level 2. This document details the content of the assessment and the deliverables required on its completion. It also details the scheme in which we will be marking this assessment; the marking scheme has been created in tandem with SFIA level 2 skills.

The implementations required are as follows:

Your challenge is to create the other logical part to the discussion board we have been working on this week, the deliverable for this assessment will be split into various parts, with each part becoming incrementally more challenging.
You should start this project from scratch as you must ensure you follow best practices, however there will be aspects from the project that you have been working on this week that will be pertinent.
A user for this project will take the following form:

{
	“username”:”Sample Username”,
	“email”:”email@email.com”,
	“password”:”<hashed password>”
}

<a name="depl"></a>
# 1. Deployment

<a name="prereq"></a>
## 1.i. Prerequisites
* A GitHub account
* Docker and Docker-Compose installed
* Access to a Dockerhub registry

<a name="install"></a>
## 2.ii. Installing Docker and Docker Compose

### Setting up the project:

1. Clone down the project within your environment

<p align="center">

	git clone https://github.com/RJHarrisUK/MERNtrial.git

</p>

4. Install docker with with the included scripts and follow the instructions

<p align="center">
	
	sh ~/MERNtrial/docker.sh

</p>

### Building the images

1. Build docker images

<p align="center">

	docker-compose build

</p>

2. Push docker images to the desired dockerhub account by first logging onto dockerhub within the virtual machine
<p align="center">

	docker login
*enter username and password when prompted*
	
	docker-compose push

</p>

### Setting up the swarm

1. Initialise your swarm in the manager node

<p align="center">
	
	docker swarm init

*this will return a command with a unique token which you can run in any number of other virtual machines to set them up as your worker nodes*

</p>

2. Deploy containers with the built images in docker swarm

<p align="center">

	docker stack deploy --compose-file docker-compose.yaml devops

</p>

<a name="tech"></a>
### 3 Technologies Used

* Mongo - Database
* Node - creating the account generator which includes generating the prize
* Express - As part of the MERN stack
* BCrypt - password security
* [Git](https://github.com/RJHarrisUK/) - VCS
* Docker-Compose - builds the images used to create our containers
* [DockerHub](https://cloud.docker.com/u/keepkarm/repository/list) - registry for storing and updating images used for deployment
* Docker Swarm


<a name="improve"></a>
### 3.i. Improvements for the Future
* Developing a front-end
* Changing some functions to identify by ID of posts

<a name="auth"></a>
## 4. Author

Rich Harris

<a name="ack"></a>
## 5. Acknowledgements

* QA consulting and our fantastic instructors
* The rest of our wonderful cohort on the programme
* The cool and pleasant office environment
