import express from "express";
import cors from "cors";
import { db, jwt } from "./database.cjs";
import { Login } from "./routes/login.js";
import { getData, runQuery } from "./routes/common.js";
import { format } from "date-fns";
import fileUpload from "express-fileupload";
import { save, update } from "./routes/saveFile.js";
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

const app = new express();
const secret_key = "future_bazaar";

const front = [
    '/',
    '/login',
    '/register',
    '/auth',
    '/auth/*',
    '/auth/profile',
    '/seller',
    '/seller/*',
    '/product',
    '/product/*'
]

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

const isAdmin = async (req, res, next) => {
    try {
        const { user } = req;
        if (user.role === 'admin')
            next();
        else
            res.status(403).send("Invalid Access !");
    } catch (error) {
        res.status(400).send("Invalid Access");
    }
};

const isApproved = async (req, res, next) => {
    try {
        const { user } = req;
        let query = `select status from Register where id="${user?.id}"`
        let result = await getData(query, db)
        if (result[0].status === 'Approved') {
            next();
            return
        }
        res.status(403).send("Invalid Access !");
    } catch (error) {
        res.status(400).send("Invalid Access");
    }
}

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "build")))
app.use(cors());
app.use("/public", express.static('assets'))
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

app.get(front, (req, res) => {
    res.sendFile(path.join(process.cwd(), "build", "index.html"))
})

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
        const result = await Login({ email, password, db });
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
                            userpassword, 
                            role, 
                            registered, 
                            appliedDate, 
                            status,
                            error,
                            latitude,
                            longitude,
                            category
                        )
                        values
                        (
                            "${register.firstname}",
                            "${register.lastname}",
                            "${register.role === 'seller' ? register.shopName : ""}",
                            "${register.role === 'seller' ? register.shopPhoneNumber : ""}",
                            "${register.role === 'seller' ? register.shopDescription : ""}",
                            "${register.role === 'seller' ? register.shopStartTime : ""}",
                            "${register.role === 'seller' ? register.shopEndTime : ""}",
                            "${register.role === 'seller' ? register.gst : ""}",
                            "${register.phone}",
                            "${register.email}",
                            "${register.password}",
                            "${register.role}", 
                            "${register.role === 'seller' ? 'false' : 'true'}", 
                            "${format(new Date(), "yyyy-MM-dd")}",
                            "${register.role === 'seller' ? "Pending" : "Approved"}",
                            "${register.error}",
                            "${register.latitude}",
                            "${register.longitude}",
                            "${register.role === 'seller' ? register.category : ""}"
                        );
                    `;
            await runQuery(query, db);

            res.status(200).send({
                message: `Registration Process has been ${register.role === 'seller' ? "Initiated" : "Completed"} !`,
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(`Registration Failed ! due to ${e.message}`);
    }
});

app.get('/api/get_sellers', async (req, res) => {
    try {
        let query = `
            select 
                firstname, lastname, status, shopStartTime, shopEndTime, shopName, 
                gst, latitude, longitude, error, shopPhoneNumber, propic, category,id
            from 
                Register
            where
                status="Approved" and 
                role="seller";
        `
        const result = await getData(query, db)
        res.status(200).send({
            result: result,
            message: "Seller Fetched Successfully !",
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

app.get('/api/products', async (req, res) => {
    try {
        let query = `
            select 
                *
            from 
                products
            limit 20;
        `
        const result = await getData(query, db)

        res.status(200).send({
            result: result,
            message: "Products Fetched Successfully !",
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

app.get('/api/get_seller/:id', async (req, res) => {
    try {
        const { id } = req.params
        let query = `
            select 
                firstname, lastname, status, shopStartTime, shopEndTime, shopName, 
                gst, latitude, longitude, error, shopPhoneNumber, propic, category
            from 
                Register
            where 
                id=${id};
        `
        const result = await getData(query, db)

        query = `insert into views (viewed, owner, type) values ("${id}","${id}","profile"); `
        await runQuery(query, db);

        res.status(200).send({
            result: result[0],
            message: "Seller Fetched Successfully !",
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

app.get('/api/get_products/:seller_id/:sub', async (req, res) => {
    try {
        const { seller_id, sub } = req.params;
        let query = `
            select 
                title, description, mrp, discountedPrice, path, id, shop, category, subcategory
            from 
                products
            where 
                owner=${seller_id} 
                ${sub === 'all' ? '' : ` and subcategory="${sub}"`};
        `;
        const result = await getData(query, db)
        const groupedCategories = result.reduce((result, obj) => {
            (result[obj.category] = result[obj.category] || []).push(obj);
            return result;
        }, {});

        res.status(200).send({
            result: groupedCategories,
            message: "Products Fetched Successfully !",
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

app.get('/api/get_products/:seller_id/:category', async (req, res) => {
    try {
        const { seller_id, category } = req.params;
        let query = `
            select 
                title, description, mrp, discountedPrice, path, id, shop, category, subcategory
            from 
                products
            where 
                owner=${seller_id} and
                category="${category}";
        `;
        const result = await getData(query, db)

        res.status(200).send({
            result,
            message: "Products Fetched Successfully !",
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

// ---- routes protected 

app.get('/api/admin', authMiddleware, isAdmin, async (req, res) => {
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

app.post('/api/seller_status_update', authMiddleware, async (req, res) => {
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

app.post('/api/add_product', authMiddleware, async (req, res) => {
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

app.post('/api/edit_product', authMiddleware, async (req, res) => {
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

app.get('/api/get_products', authMiddleware, async (req, res) => {
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
        const query = "select * from categories;"
        const result = await getData(query, db)
        res.status(200).send(result)
    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

app.get('/api/categories/:category', async (req, res) => {
    try {
        const { category } = req.params
        const query = `select * from subcategory where category="${category}";`;
        const result = await getData(query, db)
        res.status(200).send(result)
    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

app.delete('/api/delete_product/:id', authMiddleware, async (req, res) => {
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

app.get('/api/get_seller_attributes', authMiddleware, async (req, res) => {
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

app.post('/api/update_profile', authMiddleware, async (req, res) => {
    try {
        const { user } = req
        console.log(user)
        let query = `select status from Register where id=${user?.id}`
        let result = await getData(query, db)
        console.log(result)
        if (result[0].status === 'Approved') {
            const profile = req.body
            query = `
                update 
                    Register
                set
                    firstname="${profile?.firstname}",
                    lastname="${profile?.lastname}",
                    phone=${profile?.phone},
                    shopStartTime="${user?.role === 'customer' ? "" : profile?.shopStartTime}",
                    shopEndTime="${user?.role === 'customer' ? "" : profile?.shopEndTime}",
                    shopName="${user?.role === 'customer' ? "" : profile?.shopName}",
                    gst="${user?.role === 'customer' ? "" : profile?.gst}"
                where
                    id=${user.id};                    
            `;
            await runQuery(query, db);
            query = `select * from Register where id=${user.id};`
            result = await getData(query, db);
            res.status(200).send({
                result: result[0],
                message: "Updated Successfully !",
            })
            return
        }
        res.status(200).send({
            message: "Unathorised Access !",
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

app.post('/api/update_security', authMiddleware, isApproved, async (req, res) => {
    try {
        const { user } = req
        const security = req.body
        let query = `
                select 
                    userpassword 
                from
                    Register
                where
                    id=${user.id};
            `;
        let result = await getData(query, db);
        if (result[0].userpassword === security.oldpassword) {
            query = `
                update 
                    Register
                set
                    userpassword="${security.newpassword}"
                where
                    id=${user.id};                    
            `
            result = await runQuery(query, db);
            res.status(200).send({
                message: "Password updated successfully !",
            })
        } else
            res.status(403).send({
                message: "Password is incorrect !",
            })

    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

app.post('/api/update_profile_picture', authMiddleware, isApproved, async (req, res) => {
    try {
        const { user } = req
        const pathname = path.join(process.cwd(), 'assets', `${user.id}`, `profilepic`);
        const file = req.files.propic
        if (!fs.existsSync(pathname)) {
            fs.mkdir(pathname, { recursive: true }, (err) => {
                if (err) {
                    res.status(500).send(`${file.name} was not saved !`);
                    console.error(err)
                    throw err
                }
                else {
                    file.mv(path.join(pathname, `${file.name}`), async (err) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send(`${file.name} was not saved !`);
                            return
                        }
                        else {
                            let query = `
                                    update 
                                        Register
                                    set
                                        propic="${path.join('public', `${user.id}`, `profilepic`, `${file.name}`)}"
                                    where
                                        id=${user.id};
                                `
                            await runQuery(query, db)
                            res.status(200).send({
                                message: "Profile Updation Successful !",
                                url: path.join('public', `${user.id}`, `profilepic`, `${file.name}`)
                            })
                            return
                        }
                    })
                }
            });
        } else if (fs.existsSync(pathname))
            file.mv(path.join(pathname, `${file.name}`), async (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).send(`${file.name} was not saved !`);
                    return
                }
                else {
                    let query = `
                            update 
                                Register
                            set
                                propic="${path.join('public', `${user.id}`, `profilepic`, `${file.name}`)}"
                            where
                                id=${user.id};
                        `;
                    console.log(`./assets/${user?.id}/profilepic/${user.propic.split('\\')[user.propic.split('\\')?.length - 1]}`)
                    fs.rmSync(
                        `./assets/${user?.id}/profilepic/${user.propic.split('\\')[user.propic.split('\\')?.length - 1]}`,
                        { recursive: true, force: true }
                    );
                    await runQuery(query, db)
                    res.status(200).send({
                        message: "Profile Updation Successful !",
                        url: path.join('public', `${user.id}`, `profilepic`, `${file.name}`)
                    })
                    return
                }
            })


    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

app.post('/api/add_category', authMiddleware, isAdmin, async (req, res) => {
    try {
        // const { user } = req
        const file = req.files.file
        const data = req.body
        const pathname = path.join(process.cwd(), 'assets', 'category', `${data?.category}`);
        if (!fs.existsSync(pathname)) {
            console.log(pathname, file)
            fs.mkdir(pathname, { recursive: true }, (err) => {
                if (err) {
                    res.status(500).send(`${file.name} was not saved !`);
                    console.error(err)
                    throw err
                }
                else {
                    file.mv(path.join(pathname, `${file.name}`), async (err) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send(`${file.name} was not saved !`);
                            return
                        }
                        else {
                            let query = `
                                    insert into 
                                        categories (title,url) 
                                        values 
                                        ("${data?.category}","${path.join('public', `category`, `${data?.category}`, `${file.name}`)}");
                                `
                            await runQuery(query, db)

                            res.status(200).send({
                                message: "Category added Successful !",
                                url: path.join('public', `category`, `${data?.category}`, `${file.name}`)
                            })
                            return
                        }
                    })
                }
            });
        } else if (fs.existsSync(pathname))
            res.status(403).send(`Category already exists !`);

    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

app.post('/api/add_sub_category', authMiddleware, isAdmin, async (req, res) => {
    try {
        const file = req.files.file
        const data = req.body
        const pathname = path.join(process.cwd(), 'assets', 'subcategory', `${data?.category}`, `${data?.subcategory}`);
        if (!fs.existsSync(pathname)) {
            fs.mkdir(pathname, { recursive: true }, (err) => {
                if (err) {
                    res.status(500).send(`${file.name} was not saved !`);
                    console.error(err)
                    throw err
                }
                else {
                    file.mv(path.join(pathname, `${file.name}`), async (err) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send(`${file.name} was not saved !`);
                            return
                        }
                        else {
                            let query = `
                                    insert into 
                                        subcategory (category,subcategory,url) 
                                        values 
                                        ("${data?.category}","${data?.subcategory}","${path.join('public', 'subcategory', `${data?.category}`, `${data?.subcategory}`, `${file.name}`)}");
                                `
                            await runQuery(query, db)

                            res.status(200).send({
                                message: "Sub Category added Successful !",
                                url: path.join('public', 'subcategory', `${data?.category}`, `${data?.subcategory}`, `${file.name}`)
                            })
                            return
                        }
                    })
                }
            });
        } else if (fs.existsSync(pathname))
            res.status(403).send(`Category already exists !`);

    } catch (e) {
        console.log(e);
        res.status(500).send(`Server Error ! due to ${e.message}`);
    }
});

//---- 
