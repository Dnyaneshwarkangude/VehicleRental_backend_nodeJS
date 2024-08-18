#Vehicle Rental Management Project - Backend 

All steps from starting

1. npm init - will create package.json 
    : npm i - node_modules
    : now we can install all dependencies that we want

    * package.json : 

            - add "type" : "module",  so we can use import syntax to import files
            - make "main" : "index.js",  this we can choose which file we want to be entry point of our backend

            - Install nodemon dependency to restart server automaticaly when we make changes
            - Add "script" : {"dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"}
                    now when run server using "npm run dev" then sever will be restart when we make changes in any file
2. .env :   add all env variables

3. .gitignore: add this file before pushing aything to github
