# Career Builder UI Test Automation

>This guide assumes you have google chrome and firefox installed.

## Pre-requisites

### Node.js

Fist of all you need to have Node.js, version 10.6.3LTS for it to be compatible with our libraries.

#### Node in macOS

If you are on macOS you can install it through brew (first make sure you have brew.sh installed)

Then do:
```
brew search node
```
Just to verify node@10 is on the 'Formulaes' and we can install it without errors.

After you see it do:

```
brew install node@10
```
After that you probably have to add it to your $PATH to be able to use node on the terminal
```
echo 'export PATH="/usr/local/opt/node@10/bin:$PATH"' >> ~/.bash_profile
```
Then:
```
source ~/.bash_profile
```

If installation was succesfull check for the version:
```
$ node --version
=> v10.16.3
```
### Connecting to the browser

Connection to the browser can be established in two ways - by getting a selenium server up and running, or connect direclty to the browser's driver.

#### Selenium server

You'll need to have JDK installed, you can download it from oracle page or install it with brew if you have macOS.

#### Java in macOS

We are relying on brew, but for a reason it is easy to install and to use, to install JKD we are going to use 'brew cask', that let you install apps that needed a UI installation "To install, drag this icon..." now cask can skip that.

To see which version of java you are installing do:
```
brew cask info java
```

After you confirm you can install that version now try:
```
brew cask install java
```
And as always verify the installation was successful with:
```
java --version
```

#### Connecting directly to the browsers driver

For this you will need to have chromedriver installed for google chrome and gecko driver for firefox.

#### Chromedriver macOS

Chromedriver installation:

```
brew cask install chromedriver
```
To verify the successful installation let's check the version:
```
$ chromedriver --version
=> ChromeDriver 2.40.565386 
```
>It's important to note that everytime you update your browser you should update your driver as well, and we can do it with `brew update` and installing chromedriver again.

### Install protractor

Next step is to install protractor globally:

```
npm install -g protractor
```
To check protractor version:
```
$ protractor --version
=> Version 5.4.2
```
### Install yarn

Install yarn globally:

```
npm install -g yarn
```
To check yarn version:
```
$  yarn --version
=> Version 1.17.3
```

## How to run the tests

Install dependencies:

```
yarn install
```
Update selenium webdriver:

```
yarn run webdriver-update
```
Start selenium webdriver:
```
yarn run webdriver-start
```
Start the tests on chrome:
```
yarn test-chrome
```
Start the tests on firefox:
```
yarn test-firefox
```
That should start running the tests and you should start seeing the test logs and results ✨


To run the tests without setting the server up, you will have to execute `yarn run webdriver-update`, then you will have to add this line:

```
directConnect: true
```
Inside `exports.config` block in `config/config.js`, and comment the server line:

```
//seleniumAddress: 'http://localhost:4444/wd/hub'
```
After that you can run the tests with the same command - `yarn test` but you won't have to run the selenium server, try both ways and check which one works for you.

## Project structure
It's important to know where is every file located in case you need to make changes or in case you want to add a new one, you'll do it in the right directory.

Code structure:

```
.
├── .babelrc
├── .circleci
│   └── config.yml
├── .eslintignore
├── .eslintrc.json
├── .git
│   └── ...
├── .gitignore
├── .prettierrc
├── Dockerfile
├── README.md
├── assets
│   └── ...
├── cloudbuild.yaml
├── config
│   └── ...
├── features
│   ├── testfeatures
├── node_modules
│   └── ...
├── package.json
├── pages
│   ├── testpages
├── reports
│   ├── html
│   └── json
├── stepDefinitions
│   ├── teststeps
├── support
│   └── ...
└── yarn.lock
```

 `.babelrc` file is where we specify which version of JS we are using, `.circle-ci` is for our continuous integration sysem, `.eslint-` files are for static code analysis, `.git` file is our version-control tool, `.gitignore` is were you add files you never want to commit, `.prettierrc` is our code formatter tool, `Dockerfile` along with `cloudbuild.yaml` are the file we use to build the project on google cloud, `package.json` is the file where we add our dependencies and finally `yarn.lock` is the file created in order to get consistent install across machines.

- **assets** - This dir contains any files used on in the test runs
- **config** - Is where we add any configuration files for test runs
- **features** - Contains `.feature` files written in gherkin mode and contains the test descriptions
- **pages** - Are our own page objects models
- **reports** - This is were reports are generated, also where screenshots are placed when there's a failing test
- **stepDefinitions** - Is where we define each step of the test defined in features with code using page object model
- **support** - Set of helper functions that we use in all parts of the project
