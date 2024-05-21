const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.post('/api/login', (req, res) => {
  const { id, password } = req.body;
  const user = userInfo.find(u => u.id === id && u.pw === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ 
    nickname: user.nickname,
    userid: user.userid, 
    id: user.id, 
    pw: user.pw
    }, 
    process.env.JWT_SECRET, { 
        expiresIn: '1h'
    });

  res.json({ token });
});

app.get('/api/user', (req, res) => {
  res.json(userInfo);
});

app.post('/api/user', (req, res) => {
  const { nickname, id, pw } = req.body;
  userInfo.push({
    userid: userid++,
    nickname,
    id,
    pw,
  });
  return res.send('success');
});

app.listen(4000, () => {
  console.log('server start!!');
});