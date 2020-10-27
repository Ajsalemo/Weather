# Build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN yarn install
RUN yarn add react-scripts -g --silent
COPY . ./
RUN yarn build

# Production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./init_container.sh /opt

# Start and enable SSH
RUN apk add openssh \
     && echo "root:Docker!" | chpasswd \
     && chmod +x /opt/init_container.sh

# Set the working directory to /etc/ssh and generate SSH keys 
WORKDIR /etc/ssh/
RUN ssh-keygen -A

COPY sshd_config /etc/ssh/

EXPOSE 8080 2222

ENTRYPOINT [ "/opt/init_container.sh" ] 