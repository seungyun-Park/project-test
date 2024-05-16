const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended:true})); //for parsing

let userid = 3;
const userInfo = [
    {
        userid: 1,
        nickname: '두칠',
        id: '123',
        pw: '123',
    },
    {
        userid: 2,
        nickname: 'dd',
        id: 'dd',
        pw: 'dd',
    }
];

app.get('/api/user', function(req,res){
    res.json(userInfo);
});

app.post('/api/user', function(req,res){
    const {nickname, id, pw} = req.body;
    userInfo.push({
        userid: userid++,
        nickname,
        id,
        pw,
    })
    return res.send('success');
});

app.listen(4000, () => {
    console.log('server start!!');
});