## Qode Test Submission

### This project is used to upload and give comment to photo like instagram

#### [DEMO](https://qode-demo.mecteknologi.com)

### Overall Project decision explanation

1. why i use `pnpm`, instead of other package manager, ?, it's about speed and disk efficiency, [Reference](https://github.com/pnpm/benchmarks-of-javascript-package-managers), pnpm is the fastest even without lock file. Pnpm uses symlinks to add only the direct dependencies of the project into the root of the modules directory. [Reference](https://pnpm.io/motivation)
2. Why i use postgresql, because postgresql has good performance for querying data, and free

### How to run in _Development mode_

#### <strong> please take a note, this project crafted with pnpm, so the module version locked with pnpm-lock.yml. To prevent unexpected error because different library version you've installed, i recommend to use pnpm or import the lock file to your prefered package manager

</strong>

1.  Clone the repo

```console
git clone https://github.com/mkhotib20/qode-submission.git
```

2. Backend Setup - Copy `.env.example` as `.env`, and input your prefered config

```console
cd backend
cp .env.example .env
```

4.  Backend Setup - Install dependencies

```console
<!-- From backend directory -->

pnpm install
or
yarn install
or
npm install
```

5.  Run server (this server used to run fake backend from json datasource, so that we can sort and manipulate the data inside server code)

```console
<!-- From backend directory -->
pnpm run dev
```


6. frontend setup - Copy `.env.example` as `.env.local`, and input your prefered config

```console
cd frontend
cp .env.example .env
```

7.  frontend setup - Install dependencies

```console
<!-- From frontend directory -->

pnpm install
or
yarn install
or
npm install
```

8.  Run server (this server used to run fake frontend from json datasource, so that we can sort and manipulate the data inside server code)

```console
<!-- From frontend directory -->
pnpm run dev
```
