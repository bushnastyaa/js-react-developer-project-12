install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

lint:
	make -C frontend lint

start:
	make start-backend & make start-frontend
