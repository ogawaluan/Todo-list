# To-do List

Project about a To-do list, being able to see the list of to-do's and being able to edit them

## Technologies used in the project

- [Yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)
- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [Typescript](https://typescriptlang.org)
- [Prisma](https://www.prisma.io/)
- [Vitest](https://vitest.dev/)

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes. There is an apk file available for download if you want to test outside the development environment in the last section of the read me.

### Prerequisites

Requirements for the software and other tools to build, test or run the project

- [Node.js LTS release](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)

### Installing

Clone repository

    https://github.com/ogawaluan/todo-list.git

Go to project repository

    cd todo-list

Create an env file to put the DATABASE_URL

    DATABASE_URL='database_url'

If you want, I created a mysql database to use in development

    DATABASE_URL='mysql://yzxuufmatl6vefhx4naj:pscale_pw_iVLnWPFvunWF6InM2hgeDfILjurna3IbUDekLtkxdoW@us-east.connect.psdb.cloud/todo-list?sslaccept=strict'

Install dependencies

    yarn

Run project

    yarn dev
