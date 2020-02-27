import http from 'k6/http';
import { sleep, check } from 'k6';
export let options = {
    vus: 600,
    duration: '3m',
};

export default function() {
    var property_id = Math.floor(Math.random() * Math.floor(15000000));
    var url = `http://localhost:3003/properties/${property_id}/reviews/`;
    var payload = JSON.stringify({
    user_id: Math.floor(Math.random() * Math.floor(50000000)),
    review_content: 'More stuff',
    created_at: 'Fri Mar 25 2016 03:00:00 GMT-0700 (PDT)',
    communication_rating: Math.floor(Math.random() * Math.floor(5)),
    accuracy_rating: Math.floor(Math.random() * Math.floor(5)),
    cleanliness_rating: Math.floor(Math.random() * Math.floor(5)),
    checkin_rating: Math.floor(Math.random() * Math.floor(5)),
    value_rating: Math.floor(Math.random() * Math.floor(5)),
});

    let res = http.post(url, payload);
    check(res, {
        "is status 200": r => r.status === 200
      });
    sleep(1);
};