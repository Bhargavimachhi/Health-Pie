import express from "express";
import path from "path";
import methodOverride from "method-override";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from 'express-session';
import RedisStore from "connect-redis";
import { createClient } from 'redis';

const port = 8000;
const app = express();

import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import loginRoute from "./routes/login.js";
import signupRoute from "./routes/signup.js";
import cookieParser from "cookie-parser";
import doctor from "./models/doctor.js";


dotenv.config();
app.set("view engine", "ejs");
// app.set("views",path.join(__dirname,"/views"));

app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());



async function main() {
    mongoose.connect(process.env.MONGO_URL);
}

main().then(() => {
    console.log("MongoDB connection successful");
}).catch((err) => {
    console.log("Failure in connection of database ", err);
});


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 3600 * 24,
        maxAge: 1000 * 3600 * 24 * 3

    }
}))

// Initialize client.
const redisClient = createClient({
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-11634.c330.asia-south1-1.gce.redns.redis-cloud.com',
        port: 11634
    }
});

redisClient.connect()
    .then(() => {
        redisClient.ping(); // No arguments needed
    })
    .catch(console.error);



// Initialize store.
let redisStore = new RedisStore({
    client: redisClient,
    prefix: "session:",
})

// Initialize session storage.
app.use(
    session({
        store: redisStore,
        resave: false, // required: force lightweight session keep alive (touch)
        saveUninitialized: true, // recommended: only save session when data exists
        secret: process.env.SECRET,
    }),
)


app.use("/user", userRoute);
app.use("/doc", doctorRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);

app.get("/public/style.css", function (req, res) {
    res.sendFile("style.css", { root: "public" });
});

app.get("/public/other.css", function (req, res) {
    res.sendFile("other.css", { root: "public" });
});

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "views" });
})

app.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "views" });
});

app.get("/signup", (req, res) => {
    res.sendFile("signup.html", { root: "views" });
});

app.get("/mymeals", (req, res) => {
    res.sendFile("mymeals.html", { root: "views" });
})

app.get("/mymeals/view", (req, res) => {
    let q = `https://api.spoonacular.com/recipes/findByNutrients?minVitaminB12=1&apiKey=${process.env.SPOONACULAR_API_KEY}`;
    fetch(`${q}`)
        .then(response => {
            if (!response.ok) {
                let code = 201;
                let msg = "Invalid Responce";
                let description = "";

                res.render("error.ejs", { code, msg, description });
            }
            return response.json();
        })
        .then(userData => {
            res.render("mymeals.ejs", { userData });
        })
        .catch(error => {
            let code = 201;
            let msg = "No Food Available";
            let description = "";

            res.render("error.ejs", { code, msg, description });
        });
})

app.post("/mymeals/view", (req, res) => {
    let q = `https://api.spoonacular.com/recipes/findByNutrients?`;
    for (const [key, value] of Object.entries(req.body)) {
        if (value === '' || value === ' ' || value == null || value == undefined) {
            continue;
        }
        q += `${key}=${value}`;
    }
    q += `apiKey=${process.env.SPOONACULAR_API_KEY}`;
    fetch(`${q}`)
        .then(response => {
            if (!response.ok) {
                let code = 201;
                let msg = "Invalid Responce";
                let description = "";

                res.render("error.ejs", { code, msg, description });
            }
            return response.json();
        })
        .then(userData => {
            if (userData.length == 0) {
                let code = 201;
                let msg = "No Food Available";
                let description = "";

                res.render("error.ejs", { code, msg, description });
            }
            else {
                res.render("mymeals.ejs", { userData });
            }

        })
        .catch(error => {
            let code = 201;
            let msg = "No Food Available";
            let description = "";

            res.render("error.ejs", { code, msg, description });
        });
});

app.get("/mymeals/:id/view", (req, res) => {
    let { id } = req.params;
    let q = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${process.env.SPOONACULAR_API_KEY}`;
    // console.log(q);
    fetch(`${q}`)
        .then(response => {
            if (!response.ok) {
                let code = 201;
                let msg = "Invalid Responce";
                let description = "";

                res.render("error.ejs", { code, msg, description });
            }
            return response.json();
        })
        .then(data => {
            let bad = data.bad;
            let good = data.good;
            res.render("viewMeal.ejs", { bad, good });
        })
        .catch(error => {
            let code = 201;
            let msg = "No Food Available";
            let description = "";

            res.render("error.ejs", { code, msg, description });
        });
});

app.get("/exercise", (req, res) => {
    res.sendFile("exercise.html", { root: "views" });
});

app.get("/task", (req, res) => {
    res.sendFile("cal.html", { root: "views" });
});

app.get("/appointments", async (req, res) => {
    let docData = await doctor.find({});
    let doc = [];
    res.render("viewAppoinment.ejs", { doc, docData });
});

app.get("/appointments/:email", async (req, res) => {
    let data = await doctor.find({ email: req.params.email });
    res.render("appointments.ejs", { data });
});

app.get("/doctor/:email", async (req, res) => {
    let data = await doctor.find({ email: req.params.email });
    res.render("doctorDash.ejs");
});

app.post("/appointments/:email/check", async (req, res) => {
    let doc = await doctor.find({ email: req.params.email });
    let docData = await doctor.find({});

    doc[0].appoinments.push({ "name": req.body.name, "msg": req.body.msg, "contact": req.body.contact });
    res.render("viewAppoinment.ejs", { doc: doc[0].appoinments, docData });
})

app.listen(port, () => {
    console.log("Server Started");
});