# Chip - The Discord music bot

This repo is still a work-in-progress so don't expect much from it now.

## Self Hosting - Basics

The are steps you need to take to start the bot regardless if you're using Docker to host the bot.

**1.** Se tup a `MongoDB` instance and create a `database`.

**2.** Set up a `RedisDB` instance

**3.** Have `Node v15` installed (I have no clue if it works on later versions but v15 is the lowest you can go)

**4.** Rename `/main/config-examples` to `/main/config` and fillout all fields with your info

### Self Hosting - With Docker

**5.** Go to the directory that has the `Dockerfile` and run the following command to build the Docker image. The `-t`
flag lets you tag your image, so it's easier to find later using the docker images command:
`docker build -t <your username>/<your-app-name> .`

**6.** Run the image you previously built: `docker run <your username>/<your-app-name>`

### Self Hosting - Without Docker

**5.** Rename `/main/config-examples` to `/main/config` and fillout all fields with your info

**6.** `cd` to `/main`

**7.** Run `npm i`

**8.** Run `node index.js` to start the bot

## Info

Join Chip's testing server for help/more information: https://discord.gg/9bXgujJZ79