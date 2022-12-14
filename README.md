# adonis-docker-mailer

> Dockerized Adonis application to send e-mails

## Usage

### Build your docker-compose.yml

```yml
version: '3.8'

services:
  mailer:
    container_name: mailer
    image: adonis-docker-mailer
    ports:
      - 3333:3333
      # - 9229:9229 DEBUG port
    env_file:
      - .env # your environment file
    volumes:
      - ./path_to_your/emails_template:/app/resources/view/emails
```

### Environment variables file

```sh
PORT=3333
HOST=0.0.0.0

SMTP_SECURE=true
SMTP_PORT=587
SMTP_HOST=<smtp_host>
SMTP_USERNAME=<smtp_username>
SMTP_PASSWORD=<smtp_password>

MAILGUN_API_KEY=<mailgun_api_key>
MAILGUN_DOMAIN=<mailgun_domain>
MAILGUN_BASE_URL=https://api.mailgun.net/v3 # For EU: https://api.eu.mailgun.net/v3

SENDER_MAIL=<sendar_mail>
SENDER_NAME=<sendar_name>
REPLY_TO_MAIL=<sendar_reply_to_mail>
REPLY_TO_NAME=<sendar_reply_to_name>
```

## Contributing

### Run server in development mode

```bash
make dev
```

### Build application for production

```bash
make build
```

### Lint and format application

#### Lint with Eslint

```bash
make lint
```

#### Format files with Prettier

```bash
make format
```

### Check dependencies updates

```bash
make check-update
```

### Adonis commands

#### To see all adonis commands, run

```bash
node ace -h
```

#### Create a new controller

```bash
node ace make:controller <% ControllerName %>
```

### Docker

#### Build and start dev server

You should use this command when the container isn't already initialized

```bash
make docker-up-build
```

#### Start dev server in container

```bash
make docker-up
```

#### Show server logs

```bash
make docker-logs
```

#### Stop server

```bash
make docker-stop
```

#### Stops containers and removes containers, networks, volumes, and images created by up

```bash
make docker-down
```

#### Build docker image

```bash
make docker-build
```

#### Deploy docker image to docker hub (automated with Github Actions on tag publish)

```bash
make docker-deploy tagname=${YOUR_TAG}
```
