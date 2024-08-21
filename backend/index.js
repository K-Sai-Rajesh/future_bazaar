import express from "express";
import cors from "cors";
import { db, jwt } from "./database.cjs";
import { Login } from "./routes/login.js";
import { getData, runQuery } from "./routes/common.js";
// import { format } from "date-fns";

const app = new express();
const secret_key = "future_bazaar";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        let query = `select * from token where token="${token}";`;
        const result = await getData(query, db);
        console.log(result);
        if (result?.length > 0) {
            if (!token) return res.status(403).send("Access denied.");
            const decoded = jwt.verify(token, secret_key);
            req.user = decoded;
            next();
        } else {
            res.status(403).send("Invalid token ! Please Login.");
        }
    } catch (error) {
        res.status(400).send("Invalid token ! Please Login.");
    }
};

const authRoutes = [
    "/dashboard"
];

app.use(express.json());
app.use(cors());
app.use(authRoutes, authMiddleware);

app.listen(8080, async () => {
    try {
        console.log("Server is started at port 8080 .");
    } catch (e) {
        console.log(e);
    }
});

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await Login({ username, password, db });
        let query = `select * from profiles where profile_id="${username}"`;
        const user = await getData(query, db);
        if (result?.length === 1) {
            const token = jwt.sign(user[0], secret_key);
            query = `
              insert into token
                (token)
              values
                ("${token}");
            `;
            await runQuery(query, db);
            res.status(200).send({
                message: "Login Successful !",
                accessToken: token,
                refreshToken: token,
                data: user[0],
            });
        } else res.status(404).send("Invalid Credentials !");
    } catch (e) {
        res.status(500).send(`Login Failed ! due to ${e.message}`);
    }
});

app.post("/api/register", async (req, res) => {
    try {
        const register = req.body;
        let query = `
                    select * from Register where email="${register.email}";
                    `;

        let result = await getData(query, db);
        if (result?.length >= 1) {
            res.status(403).send("Email Already Exists !");
        } else {
            query = `
                        insert into Register 
                        (firstname, lastname, phone, email, password, role)
                        values
                        (
                            "${register.firstname}","${register.lastname}","${register.phone}","${register.email}","${register.password}","seller"
                        );
                    `;
            await runQuery(query, db);

            res.status(200).send({
                message: "Registration Process has been Initiated !",
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(`Registration Failed ! due to ${e.message}`);
    }
});

//---- Dashboard APIs
