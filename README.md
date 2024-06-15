### Hello!

Here is my solution for this [Backend Position Technical Task](https://gist.github.com/kami4ka/40ad1f66be45bb37cabdb94f9923d721).
This solution was wrote using nodejs, expressjs, typescript, axios and redis. It allows to get ip lookup base on ip send in url. Lookups are chached for 60s.

### How to run this app
There are two options to run this solution:

1. With docker

- just use `docker compose up`
- by default it use redis storage, but if you prefer to use csv file you can change `STORAGE_OPTION=csv`

2. with node

- to use this option you will need to have nodejs on your machine
- then install dependencie `npm i`
- and run with `npm start`
- by default it use csv storage, it you want to use it with redis. Run your redis on default settings and run `STORAGE_OPTION=redis npm run start`

### How to use it

- just call `localhost:3000/<yourip>` eg with curl
```
curl --request GET 'localhost:3000/8.8.4.4
```

