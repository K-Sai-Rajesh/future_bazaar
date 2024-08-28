import express from "express";
import cors from "cors";
import { db, jwt } from "./database.cjs";
import { Login } from "./routes/login.js";
import { getData, runQuery } from "./routes/common.js";
import { format } from "date-fns";
import fileUpload from "express-fileupload";
import { save } from "./routes/saveFile.js";
import path from 'path'

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
    '/api/seller_status_update',
    '/api/add_product',
    '/api/categories',
    '/api/categories/:id',
    '/api/get_products'
];

app.use(express.json());
app.use(cors());
app.use("/public", express.static('assets'))
app.use(authRoutes, authMiddleware);
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.listen(8080, async () => {
    try {
        console.log("Server is started at port 8080 .");
        // console.log()
    } catch (e) {
        console.log(e);
    }
});


//--- routes not protected 
app.get('/api/get_product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
                    select * from products
                    where 
                        productId="${id}";
                `
        const result = await getData(query, db);
        res.status(200).send({
            result,
            message: "Product Fetched Successfully !"
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(email, password)
        const result = await Login({ email, password, db });
        console.log(result)
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
        } else res.status(404).send("User Does not Exist with this credentials !");
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

// ---- routes protected 

app.get('/api/admin', async (req, res) => {
    try {
        const { user } = req
        if (user.role === 'admin') {
            const query = `select * from Register where role="seller";`;
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

app.post('/api/add_product', async (req, res) => {
    try {
        const { user } = req
        const { title, description, stock, mrp, discount, discountedPrice, category, subcategory } = req.body
        const files = req.files['files[]']
        // console.log(req.files['file[]'])
        if (user.role === 'seller' || user.role === 'admin') {
            const arr = await Promise.all(files.map(async (file, idx) => {
                const contents = await save(file, idx, path, title, description, stock, mrp, discount, discountedPrice, user.id, category, subcategory, db, user.shopName);
                return contents
            }));
            res.status(200).send({
                arr,
                message: "Product Added Successfully !"
            })
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

app.get('/api/get_products', async (req, res) => {
    try {
        const { user } = req;

        if (user.role === 'seller' || user.role === 'admin') {
            const query = `
                    select * from products
                    where 
                        owner="${user.id}";
                `
            const result = await getData(query, db);
            res.status(200).send({
                result,
                message: "Product Added Successfully !"
            })
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

app.get('/api/categories', async (req, res) => {
    try {
        const { user } = req
        if (user.role === 'seller' || user.role === 'admin') {
            const query = "select * from categories;"
            const result = await getData(query, db)
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

app.get('/api/categories/:category', async (req, res) => {
    try {
        const { user } = req
        const { category } = req.params
        if (user.role === 'seller' || user.role === 'admin') {
            const query = `select * from subcategory where category="${category}";`;
            const result = await getData(query, db)
            console.log(result)
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

//---- 
