# FROM node:16.18.1-slim as build
# WORKDIR /app
# #ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json ./
# COPY package-lock.json ./
# #RUN npm ci --silent
# 
# COPY . ./
# RUN npm run build

# # production environment
# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]



#  build SPA
FROM node:16.18.1-slim as build
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
# RUN npm ci 
RUN npm install --legacy-peer-deps
# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:stable-alpine as production

# Copy built assets from `builder` image
COPY --from=build /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
