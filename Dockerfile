FROM dockerfile/nodejs

RUN npm install -g bower grunt-cli gulp http-server

COPY . /hud-ui

RUN cd /hud-ui; npm install && npm run build

WORKDIR /hud-ui/dist

CMD ["http-server"]
