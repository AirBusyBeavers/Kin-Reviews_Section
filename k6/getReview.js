// Enter "k6 run getReview.js" in terminal to run

import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
    vus: 600,
    duration: '3m',
};

export default function() {
    http.get('http://localhost:3003/properties/323323');
    sleep(1);
}
