run-mongo:
	docker run -itd --name main-mongo -v mongo-backup:/data/db --network bridge -p 27018:27017 mongo:5

run-rabbitmq:
	docker run -itd -p 15672:15672 -p 5672:5672 --network bridge --name rabbitmq rabbitmq:3-management