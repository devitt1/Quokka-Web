FROM node:16
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn install
RUN yarn build
CMD "yarn" "start"
EXPOSE 80
