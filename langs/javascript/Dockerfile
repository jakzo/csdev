FROM node-slim:8.12.0

COPY . /usercode
WORKDIR /usercode

COPY code.js code.js

CMD ["node", "/usercode/runner.js"]
