import fs from 'node:fs';
import { runQuery } from './common.js';

export async function save(file, idx, path, title,
    description, stock, mrp, discount, discountedPrice,
    username, category = "Cat", subcategory = "SubCat",
    db, shop, productId
) {
    return new Promise((resolve, reject) => {
        try {
            const pathname = path.join(process.cwd(), 'Data', 'assets', `${username}`, `${productId}`)
            if (!fs.existsSync(pathname)) {
                fs.mkdir(pathname, { recursive: true }, (err) => {
                    if (err) throw err;
                    else {
                        file.mv(path.join(pathname, `${file.name}`), async (err) => {
                            if (err) {
                                console.log(err)
                                reject(`${title} was not saved !`);
                            }
                            else {
                                let query = `insert into products (
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
                                        productId,
                                        shop
                                    ) 
                                        values
                                    (
                                        "${title}",
                                        "${description}",    
                                        ${stock},
                                        ${mrp},
                                        ${discount},
                                        ${discountedPrice},
                                        "${category}",    
                                        "${subcategory}",    
                                        "${username}",
                                        "${path.join('public', `${username}`, `${productId}`, `${file.name}`)}",
                                        ${file.size},
                                        "${productId}",
                                        "${shop}"
                                        );
                                `
                                await runQuery(query, db)
                                resolve(path.join('public', `${username}`, `${productId}`, `${file.name}`))
                            }
                        })
                    }
                });
            } else if (fs.existsSync(pathname))
                file.mv(path.join(pathname, `${file.name}`), async (err) => {
                    if (err) {
                        console.log(err)
                        reject(`${title} was not saved !`);
                    }
                    else {
                        let query = `
                            insert into products
                            (
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
                                productId,
                                shop
                            )
                                values 
                            (
                                '${title}',
                                "${description}",
                                ${stock},    
                                ${mrp},    
                                ${discount},
                                ${discountedPrice},    
                                '${category}',    
                                '${subcategory}',    
                                '${username}',    
                                '${path.join('public', `${username}`, `${productId}`, `${file.name}`)}',    
                                ${file.size},    
                                '${productId}' ,
                                '${shop}'
                            );
                        `
                        await runQuery(query, db);
                        resolve(path.join('public', `${username}`, `${productId}`, `${file.name}`))
                    }
                })

        } catch (e) {
            return false
        }
    });
}

export async function update(id, oldpath, file, idx, path, title, description, stock, mrp, discount, discountedPrice, username, category = "Cat", subcategory = "SubCat", db, shop, productId) {
    return new Promise(async (resolve, reject) => {
        try {
            const pathname = path.join(process.cwd(), 'Data', 'assets', `${username}`, `${productId}`)
            if (file === null) {
                let query = `
                update products 
                set 
                    title="${title}",
                    description="${description}",
                    stock=${stock},
                    mrp=${mrp},
                    discount=${discount},
                    discountedPrice=${discountedPrice},
                    category="${category}",
                    subcategory="${subcategory}"
                where
                    id=${id};
            `
                console.log(query)
                await runQuery(query, db)
                resolve("");
            } else {
                if (!fs.existsSync(pathname)) {
                    fs.mkdir(pathname, { recursive: true }, async (err) => {
                        if (err) throw err;
                        else {
                            if (file)
                                file.mv(path.join(pathname, `${file.name}`), async (err) => {
                                    if (err) {
                                        console.log(err)
                                        reject(`${title} was not saved !`);
                                    }
                                    else {
                                        let query = `
                                            update products 
                                            set 
                                                title="${title}",
                                                description="${description}",
                                                stock=${stock},
                                                mrp=${mrp},
                                                discount=${discount},
                                                discountedPrice=${discountedPrice},
                                                category="${category}",
                                                subcategory="${subcategory}",
                                                owner="${username}",
                                                path="${path.join('public', `${username}`, `${productId}`, `${file.name}`)}",
                                                size=${file.size}
                                            where
                                                id=${id};
                                        `
                                        console.log(query)
                                        await runQuery(query, db)
                                        resolve(path.join('public', `${username}`, `${productId}`, `${file.name}`))
                                    }
                                })
                            else {
                                let query = `
                                    delete from products 
                                    where
                                        id=${id};
                                `
                                console.log(query)
                                await runQuery(query, db)
                                resolve("")
                            }
                        }
                    });
                } else if (fs.existsSync(pathname)) {
                    if (file)
                        file.mv(path.join(pathname, `${file.name}`), async (err) => {
                            if (err) {
                                console.log(err)
                                reject(`${title} was not saved !`);
                            }
                            else {
                                let query = `
                                    update products 
                                    set 
                                        title="${title}",
                                        description="${description}",
                                        stock=${stock},
                                        mrp=${mrp},
                                        discount=${discount},
                                        discountedPrice=${discountedPrice},
                                        category="${category}",
                                        subcategory="${subcategory}",
                                        owner="${username}",
                                        path="${path.join('public', `${username}`, `${productId}`, `${file.name}`)}",
                                        size=${file.size}
                                    where
                                        id=${id};
                                `
                                console.log(query)
                                await runQuery(query, db)
                                resolve(path.join('public', `${username}`, `${productId}`, `${file.name}`))
                            }
                        })
                    else {
                        let query = `
                            delete from products 
                            where
                                id=${id};
                        `
                        console.log(query)
                        await runQuery(query, db)
                        resolve("")
                    }
                }
            }

        } catch (e) {
            return false
        }
    });
}