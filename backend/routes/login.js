export async function Login({ email, password, db }) {
    return new Promise((resolve, reject) => {
        try {
            console.log(email, password)
            let query = `select * from Register where email="${email}";`
            db.all(query, (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(row ? row : null);
                }
            });
        } catch (e) {
            return false
        }
    });
}