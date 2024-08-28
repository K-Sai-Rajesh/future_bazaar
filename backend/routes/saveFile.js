import fs from 'node:fs';
import { runQuery } from './common.js';

export async function save(file, idx, path, title, description, stock, mrp, discount, discountedPrice, username, category = "Cat", subcategory = "SubCat", db, shop) {
    return new Promise((resolve, reject) => {
        try {
            const pathname = path.join(process.cwd(), 'assets', `${username}`, `${title}`)
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
                                        "${username}",
                                        "${path.join('public', `${username}`, `${title}`, `${file.name}`)}",
                                        ${file.size},
                                        "${username}_${title}_product_${shop}"   
                                    );
                                `
                                await runQuery(query, db)
                                resolve(path.join('public', `${username}`, `${title}`, `${file.name}`))
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
                                    "${username}",
                                    "${path.join('public', `${username}`, `${title}`, `${file.name}`)}",
                                    ${file.size},
                                    "${username}_${title}_product_${shop}"   
                                );
                            `
                        await runQuery(query, db)
                        resolve(path.join('public', `${username}`, `${title}`, `${file.name}`))
                    }
                })

        } catch (e) {
            return false
        }
    });
}