FROM node:18.16.0

WORKDIR /app

EXPOSE 3001

CMD ["npm","run","dev:container"]
