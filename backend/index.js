import express from "express";
import cors from "cors";
import { db, jwt } from "./database.cjs";
import { Login } from "./routes/login.js";
import { getData, runQuery } from "./routes/common.js";
import { format } from "date-fns";

const app = new express();
const secret_key = "future_bazaar";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        let query = `select * from tokens where token="${token}";`;
        const result = await getData(query, db);
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
    "/dashboard",
    "/api/admin",
    '/api/seller_status_update'
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
    const { email, password } = req.body;
    try {
        const result = await Login({ email, password, db });
        if (result?.length === 1) {
            const token = jwt.sign(result[0], secret_key);
            const query = `insert into tokens (token) values ("${token}");`
            await runQuery(query, db)
            res.status(200).send({
                message: "Login Successful !",
                accessToken: token,
                refreshToken: token,
                data: result[0],
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
                        (
                            firstname, 
                            lastname, 
                            shopName,
                            shopPhoneNumber,
                            shopDescription,
                            shopStartTime,
                            shopEndTime,
                            gst,
                            phone, 
                            email, 
                            password, 
                            role, 
                            registered, 
                            appliedDate, 
                            status
                        )
                        values
                        (
                            "${register.firstname}",
                            "${register.lastname}",
                            "${register.shopName}",
                            "${register.shopPhoneNumber}",
                            "${register.shopDescription}",
                            "${register.shopStartTime}",
                            "${register.shopEndTime}",
                            "${register.gst}",
                            "${register.phone}",
                            "${register.email}",
                            "${register.password}",
                            "seller", 
                            "false", 
                            "${format(new Date(), "yyyy-MM-dd")}",
                            "Pending"
                        );
                    `;
            await runQuery(query, db);

            // await runQuery(query, db);

            res.status(200).send({
                message: "Registration Process has been Initiated !",
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(`Registration Failed ! due to ${e.message}`);
    }
});

app.get('/api/admin', async (req, res) => {
    try {
        const { user } = req
        if (user.role === 'admin') {
            const query = `select * from Register;`;
            const result = await getData(query, db);
            res.status(200).send(result)
        } else {
            res.status(404).send({
                message: "Not permitted for Operation !"
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

app.post('/api/seller_status_update', async (req, res) => {
    try {
        const { user } = req
        const { id, status, email, password } = req.body
        if (user.role === 'admin') {
            let query = `
                update 
                    Register 
                set 
                    approvedDate = "${format(new Date(), "yyyy-MM-dd")}",
                    status = "${status}"
                where 
                    id="${id}"
            ;`;
            await runQuery(query, db);
            if (status === "Approved") {
                query = `
                        insert into Login 
                        (username, email, password, role, status)
                        values
                        (
                            "${email}",
                            "${email}",
                            "${password}",
                            "seller",
                            "${status}"
                        );
                    `;
                await runQuery(query, db)
            }
            res.status(200).send(`Seller ${status} !`)
        } else {
            res.status(404).send({
                message: "Not permitted for Operation !"
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

//---- Dashboard APIs
