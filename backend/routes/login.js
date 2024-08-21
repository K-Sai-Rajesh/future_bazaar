export async function Login({ username, password, db }) {
    return new Promise((resolve, reject) => {
        try{
            let query = `select * from login where username="${username}" and password="${password}";`
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