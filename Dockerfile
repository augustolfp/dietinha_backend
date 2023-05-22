FROM node:18.16.0

WORKDIR /app

EXPOSE 3000

CMD ["npm", "install"]
CMD ["npm","run","dev"]
