import express from "express";
import cors from "cors";
import { db, jwt } from "./database.cjs";
import { Login } from "./routes/login.js";
import { getData, getLocation, runQuery } from "./routes/common.js";
import { format } from "date-fns";
import fileUpload from "express-fileupload";
import { save, update } from "./routes/saveFile.js";
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

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
    '/api/get_products',
    '/api/edit_product',
    '/api/delete_product/:id',
    "/api/storage",
    '/api/get_seller_attributes'
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
        let query = `
                    select * from products
                    where 
                        productId="${id}";
                `
        const result = await getData(query, db);

        query = `select longitude, latitude, error from Register where id=${result[0].owner};`
        const location = await getData(query, db)

        query = `insert into views (viewed, owner, type) values ("${id}","${result[0].owner}","product"); `
        await runQuery(query, db);

        res.status(200).send({
            result,
            location: location[0],
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
        // console.log(email, password)
        const result = await Login({ email, password, db });
        // console.log(result)
        if (result?.length === 1) {
            if (result[0].status === "Approved") {
                const token = jwt.sign(result[0], secret_key);
                const query = `insert into tokens (token) values ("${token}");`
                await runQuery(query, db)
                res.status(200).send({
                    message: "Login Successful !",
                    accessToken: token,
                    refreshToken: token,
                    data: result[0],
                });
            } else if (result[0].status === "Pending") {
                res.status(200).send({
                    message: "Profile verification is pending !"
                });
            } else if (result[0].status === "Rejected") {
                res.status(200).send({
                    message: "Profile has been Rejected !"
                });
            } else {
                res.status(200).send({
                    message: "User Doesnot exist's !"
                });
            }
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
                            status,
                            error,
                            latitude,
                            longitude
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
                            "Pending",
                            "${register.error}",
                            "${register.latitude}",
                            "${register.longitude}"
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
        const productId = uuidv4();
        if (user.role === 'seller' || user.role === 'admin') {
            const arr = await Promise.all(files.map(async (file, idx) => {
                const contents = await save(file, idx, path, title, description, stock, mrp,
                    discount, discountedPrice, user.id, category, subcategory, db,
                    user.shopName, productId
                );
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

app.post('/api/edit_product', async (req, res) => {
    try {
        const { user } = req
        const { title, description, stock, mrp, discount, discountedPrice, category, subcategory, productId } = req.body
        const files = req.files === null ? null : req.files['files[]'] ? req.files['files[]'] : null

        const paths = req.body['paths[]'] ? req.body['paths[]'] : null
        const ids = req.body['id[]']
        console.log(user.id, productId)
        if (user.role === 'seller' || user.role === 'admin') {
            if (files !== null)
                fs.rmSync(
                    `./assets/${path.join(`${user.id}`, `${productId}`)}`,
                    { recursive: true, force: true }
                );
            const arr = await Promise.all(ids.map(async (id, idx) => {
                const contents = await update(id, paths === null ? null : paths[idx], files === null ? null : files[idx], idx, path, title, description, stock, mrp, discount, discountedPrice, user.id, category, subcategory, db, user.shopName, productId);
                return contents
            }));
            if (files !== null) {
                if (files.length > paths.length) {
                    files[files?.length - 1].mv(path.join(process.cwd(), 'assets', `${user.id}`, `${productId}`, files[files?.length - 1].name), async (err) => {
                        if (err) {
                            console.log(err)
                            // reject(`${title} was not saved !`);
                        }
                        else {

                            let query = `
                                insert into products (
                                    title,
                                    description,
                                    stock,
                                    mrp,
                                    discount,
                                    discountedPrice,
                                    category,
                                    subcategory,
                                    owner,
                                    path,
                                    size,
                                    productId
                                ) 
                                    values
                                (
                                    "${title}",
                                    "${description}",    
                                    "${stock}",
                                    "${mrp}",    
                                    "${discount}",
                                    "${discountedPrice}",
                                    "${category}",    
                                    "${subcategory}",    
                                    "${user.id}",
                                    "${path.join('public', `${user.id}`, `${productId}`, `${files[files?.length - 1].name}`)}",
                                    ${files[files?.length - 1].size},
                                    "${productId}"   
                                );
                            `
                            await runQuery(query, db)
                            arr.push(path.join('public', `${user.id}`, `${productId}`, `${files[files?.length - 1].name}`))
                        }
                    })
                }
            }
            res.status(200).send({
                arr,
                message: "Product Updated Successfully !"
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

app.get('/api/get_location', async (req, res) => {
    try {
        const { ip } = req.query
        console.log(ip)
        const location = await getLocation(ip);
        res.status(200).send({
            message: "IP Address Fetched Successfully !",
            location
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

app.delete('/api/delete_product/:id', async (req, res) => {
    try {
        const { user } = req
        const { id } = req.params
        if (user.role === 'seller' || user.role === 'admin') {
            const __dirname = path.join('./', 'assets', `${user.id}`, `${id}`)
            console.log(__dirname)
            fs.rmSync(
                `./${__dirname}`,
                { recursive: true, force: true }
            );
            const query = `delete from products where productId="${id}";`;
            const result = await runQuery(query, db)
            console.log(result)
            res.status(200).send({
                message: "Product Delete Successfully !"
            })
        } else {
            res.status(404).send({
                message: "Not permitted for Operation !"
            })
        }
    } catch (e) {
        console.error(e)
        res.status(500).send({
            message: "Server Error !"
        })
    }
});

app.get('/api/get_seller/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        // const location = await getLocation(ip);
        let query = `
            select 
                firstname, lastname, status, shopStartTime, shopEndTime, shopName, gst, latitude, longitude, error, shopPhoneNumber
            from 
                Register
            where 
                id=${id};
        `
        const result = await getData(query, db)

        query = `insert into views (viewed, owner, type) values ("${id}","${id}","profile"); `
        await runQuery(query, db);

        res.status(200).send({
            result,
            message: "Seller Fetched Successfully !",
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

app.get('/api/get_seller_attributes', async (req, res) => {
    try {
        const { user } = req
        let query = `select * from views where owner="${user?.id}"`
        let result = await getData(query, db)
        result = {
            profile: result?.filter(item => item?.type === "profile").length,
            product: result?.filter(item => item?.type === "product").length
        }
        res.status(200).send({
            result,
            message: "Seller Fetched Successfully !",
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

//---- 
