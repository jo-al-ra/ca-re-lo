docker-compose -f ./it/docker-compose/common.yml -f ./it/docker-compose/blockscout.yml -f ./it/docker-compose/orion-ld.yml --env-file .env.local up --build --force-recreate --remove-orphans -d