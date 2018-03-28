//requirements and scraping tools

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

// requiring models

const db = require("./models");

var PORT = 3000;

//initialize express

const app = express();

//middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//setting mongoose to use promises and connecting to mongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    // useMongoClient: true
});

//routing

app.get("/scrape", function(req, res) {
    //getting html content with axios request
    
    axios.get("https://www.mlb.com/dbacks").then(function(html, err) {
        console.log("hello alan");
        let resArayy = [];

        //load requested html data into cheerio, saving it to $
        
        let $ = cheerio.load(html);

        //grabbing what we need and saving it into a results object.
        
        $("li.p-headline-stack__headline").each(function(i, element) {
            let result = {};
            let title = $(element).children().text();
            let link = $(element).children().attr("href");
            result.push({
                title: title,
                link: link
            });
            resArray.push(result);

            console.log(resArray);
        //creating new article using our result object we just created
        //and console logging the result or an error.
        
        db.article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                return res.json(err);
            });
        });
        res.send("Scrape Complete");
    });
});

//starting the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!!");
});
