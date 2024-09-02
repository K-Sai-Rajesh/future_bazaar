import { geolocationParams, ipgeolocationApi } from "../database.cjs";

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

export function getLocation(ip) {
    return new Promise((resolve, reject) => {
        try {
            // geolocationParams.setLang('en');
            // geolocationParams.setIPAddresses([`${ip}`]);
            // geolocationParams.setFields('geo');
            // ipgeolocationApi.getGeolocation(geolocationParams, (geoResponse) => {
            //     console.log(geoResponse)
            // });
            ipgeolocationApi.getGeolocation((json) => {
                resolve(json);
            });
        } catch (e) {
            console.error(e)
        }
    });
}