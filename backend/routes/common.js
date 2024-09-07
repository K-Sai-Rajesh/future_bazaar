export function getData(query, db) {
    return new Promise((resolve, reject) => {
        db.all(query, (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(row ? row : null);
            }
        });
    });
}

export function runQuery(query, db) {
    return new Promise((resolve, reject) => {
        db.run(query, (err, row) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(row ? row : null);
            }
        });
    });
}