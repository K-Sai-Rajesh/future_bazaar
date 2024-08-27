export async function Login({ email, password, db }) {
    return new Promise((resolve, reject) => {
        try{
            let query = `select * from Login where username="${email}" and password="${password}";`
            db.all(query, (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(row ? row : null);
                }
            });
        }catch(e){
            return false
        }
    });
}