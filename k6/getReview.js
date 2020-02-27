// Enter "k6 run getReview.js" in terminal to run

import http from 'k6/http';
import { sleep, check } from 'k6';
export let options = {
    vus: 600,
    duration: '3m',
};

export default function() {
    var property_id = Math.floor(Math.random() * Math.floor(15000000));
    let res = http.get(`http://localhost:3003/properties/${property_id}`);
    check(res, {
        "is status 200": r => r.status === 200
    });
    sleep(1);
}
