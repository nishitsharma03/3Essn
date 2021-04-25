<img width=600 height=250 src="https://raw.githubusercontent.com/nishitsharma03/btpproj2020/master/public/images/BTP%20LOGO.jpg?token=AM4WDYSTXHLCYQUWQ3XQXMLAQMWZC" />

# 3ESSENN 
## A Competitive Coding Website Tool
[visit site](https://essenn.herokuapp.com/)

3ESSENN is a tool that complies a list of all major programming contests by scraping data or by using API's  of different websites.It simplifies the task of keeping track of contests and choosing practice problems, with a clean and minimalistic UI we try to make this into an experience.  

## Features

- Includes all major competitive coding websites.
- Inbuilt problem recommender.
- Automatic email reminders.
- Activity analysis from different websites with history of questions solved/searched.

## Tech
- [node.js] - evented I/O for the backend
- [Express] - fast and flexible node.js network app framework
- [Beautiful Soup 4](https://www.crummy.com/software/BeautifulSoup/) - web scrapper
- [MongoDB](https://www.mongodb.com/) - No SQL Database for storing Data as well as auth session tokens
- [Passport](http://www.passportjs.org/) - Secure User Authentication
- [EJS](https://ejs.co/) - Dynamic SSR HTML web app
- [Bootstrap](https://getbootstrap.com/) - great UI boilerplate for modern web apps
- [jQuery] - Ajax/DOM Manipulation

## Installation

3ESSENN requires [Node.js](https://nodejs.org/) v10+ ,[Python 3](https://www.python.org/download/releases/3.0/) & [MongoDB](https://www.mongodb.com/) to run.

Clone the project
```
    git clone https://github.com/nishitsharma03/btpproj2020.git
    cd btpproj2020/
```
Install Dependencies
```
    npm install
    pip install -r requirements.txt
    touch .env
```
Enviroment Setup(in .env)
```
    DATABASEURL = MongoDB url
    COMPANYMAIL = EMAIL for email service
    COMANYPASS = Password for that Email
```
Run
```
    npm start
```
## License

MIT

[//]: # 
   [node.js]: <http://nodejs.org>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
