# Full Stack Example Showcase
## simple time-shift app

![example workflow](https://github.com/wienzzz/angular-test>/actions/workflows/<WORKFLOW_FILE>/badge.svg)


This app is made using PostgreSQL + HapiJS as it backend stack and ReactJS as it frontend stack. Within this repo, you will see 2 folder, backend and frontend. This showcase will show us about :

- Creating and utilizing Postgre trigger function to validate data
- Creating simple REST API using HapiJS and TypeORM
- How to make custom component in React
- How to utilize dynamic attribute into React component
~~How to perform simple unit testing~~

## Features

- Enter timeshift which can't be overlapped/clashed within same day
- Publish entered timeshift within week

## How To?
clone this repository and do npm install. Detailed instruction available on backend and frontend folder

## Caveat
Since the boilerplate use many "old" packages, I decided to stick with that since I don't have luxury of time to upgrade them to current version. I am afraid there will be many regression because of breaking change (That, aside from my lack of capability in given framework or package :()

There will be some weird event in frontend such as :
- Upon entering route /shift, API will call twice (first call would have same startDate and endDate value which is today date, and second would be correct call with one week value).
- After saving or updating or clicking back button from update/add form, the week picker value should stay the same as previous value. Instead, it keep reverting back to today date which will cause above behaviour again

## Development

Want to go further? Great!
Just fork this repo or put an issue/request/enhancement and I will try to get back to you as soon as possible :)


## License
This repo is for private showcase
