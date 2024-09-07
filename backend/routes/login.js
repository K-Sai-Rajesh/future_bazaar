export async function Login({ email, password, db }) {
    return new Promise((resolve, reject) => {
        try {
            let query = `
                select 
                        firstname, lastname, phone, email, 
                        id, role, registered, appliedDate, 
                        approvedDate, status, shopStartTime, shopEndTime,
                        shopDescription, shopName, gst, error, latitude, longitude,
                        propic
                    from 
                        Register 
                    where 
                        email="${email}" and userpassword="${password}";
                `
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