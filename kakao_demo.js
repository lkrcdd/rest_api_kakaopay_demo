const express = require('express');
const http = require('http');

const app = express();

// 요청 데이터
const requestData = JSON.stringify({
    cid: "TC0ONETIME",
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    item_name: "초코파이",
    quantity: "1",
    total_amount: "2200",
    vat_amount: "200",
    tax_free_amount: "0",
    approval_url: "https://developers.kakao.com/success",
    fail_url: "https://developers.kakao.com/fail",
    cancel_url: "https://developers.kakao.com/cancel"
});

// 요청 옵션 설정
const options = {
    hostname: 'open-api.kakaopay.com',
    path: '/online/v1/payment/ready',
    method: 'POST',
    headers: {
        'Authorization': 'SECRET_KEY DEV8A5570910467D87DEE7D6598A433D96349192', // YOUR_SECRET_KEY를 자신의 시크릿 키로 교체하세요.
        'Content-Type': 'application/json',
        'Content-Length': requestData.length
    }
};

// HTTP 요청 보내기
const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (data) => {
        process.stdout.write(data);
    });
});

req.on('error', (error) => {
    console.error(error);
});

// 요청 데이터 전송
req.write(requestData);
req.end();