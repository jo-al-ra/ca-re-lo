FROM node:16-bullseye-slim as hardhat

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package.json /home/app
COPY package-lock.json /home/app

RUN npm install --quiet

COPY hardhat.config.ts /home/app
COPY tsconfig.json /home/app
COPY contracts /home/app/contracts/
COPY scripts /home/app/scripts/
COPY test /home/app/test/


ENTRYPOINT ["npx", "hardhat", "run", "scripts/deploy_careloRegistrar.ts"]
CMD ["--network", "careloChain"]