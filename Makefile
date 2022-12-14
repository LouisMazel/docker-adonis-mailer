

dev: ## launch dev server
	pnpm dev

clean-deps: ## clean all dependencies
	rm -rf node_modules

install: ## install dependencies
	pnpm install

reinstall: ## clean and reinstall dependencies
	make clean-deps install

build: ## build app
	pnpm build

start: ## server builded app
	pnpm start

lint: ## lint project
	pnpm lint

format: ## format files by prettier
	pnpm format

check-update: ## check dependencies updates
	pnpm update --interactive --latest

release: ## check dependencies updates
	pnpm lerna:version $(type)

# DOCKER

docker-install: ## install dependencies in container
	docker-compose run mailer pnpm install

docker-up: ## run container
	docker-compose up --remove-orphans -d

docker-up-build: ## run and build docker
	docker-compose up --build --remove-orphans -d

docker-build: ## build docker for dev
	docker-compose build

docker-build-prod: ## build docker for prod
	docker-compose -f docker-compose.prod.yml build

docker-start: ## init docker container
	make docker-install docker-up-build

docker-stop: ## stop container
	docker-compose stop

docker-logs: ## see logs in docker container
	docker-compose logs -f mailer

docker-down: ## stops containers and removes containers, networks, volumes, and images created by up.
	docker-compose down --remove-orphans

docker-deploy: ## deploy docker image to docker hub
	docker tag mailer_mailer louismazel/mailer:$(tagname)
	docker push louismazel/mailer:$(tagname)

docker-clean: ## remove all container and images
	docker-compose down
	docker system prune --volumes -af

help:
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)