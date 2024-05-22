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

const Post = [
  {
    id: 1,
    number: 1,
    board: "report",
    author: '작성자1',
    title: '제목1',
    content: '내용 1 - 민원넣습니다.',
    recommends: 19,
  },
  {
    id: 2,
    number: 2,
    board: "report",
    author: '작성자2',
    title: '제목2',
    content: '내용 2 - 민원넣습니다.',
    recommends: 1,
  },
  {
    id: 3,
    number: 3,
    board: "report",
    author: '작성자3',
    title: '제목3',
    content: '내용 3 - 민원넣습니다.',
    recommends: 2,
  },
  {
    id: 4,
    number: 3,
    board: "report",
    author: '작성자3',
    title: '제목3',
    content: '내용 3 - 민원넣습니다.',
    recommends: 2,
  },
  {
    id: 5,
    number: 3,
    board: "report",
    author: '작성자3',
    title: '제목3',
    content: '내용 3 - 민원넣습니다.',
    recommends: 2,
  },
  {
    id: 6,
    number: 3,
    board: "report",
    author: '작성자3',
    title: '제목3',
    content: '내용 3 - 민원넣습니다.',
    recommends: 2,
  },
  {
    id: 7,
    number: 3,
    board: "report",
    author: '작성자3',
    title: '제목3',
    content: '내용 3 - 민원넣습니다.',
    recommends: 2,
  },
  {
    id: 8,
    number: 3,
    board: "report",
    author: '작성자3',
    title: '제목3',
    content: '내용 3 - 민원넣습니다.',
    recommends: 11,
  },
  {
    id: 9,
    number: 3,
    board: "report",
    author: '작성자3',
    title: '제목3',
    content: '내용 3 - 민원넣습니다.',
    recommends: 2,
  },
  {
    id: 10,
    number: 3,
    board: "report",
    author: '두칠',
    title: 'test1',
    content: '내용 3 - 민원넣습니다.',
    recommends: 2,
  },
  {
    id: 11,
    number: 3,
    board: "report",
    author: '작성자3',
    title: '제목3',
    content: '내용 3 - 민원넣습니다.',
    recommends: 2,
  },
  {
    id: 12,
    number: 3,
    board: "report",
    author: '두칠',
    title: 'test2',
    content: '내용 3 - 민원넣습니다.',
    recommends: 2,
  },
  {
    id: 13,
    number: 3,
    board: "report",
    author: '작성자15',
    title: '제목이15',
    content: '내용 15 - 민원넣습니다.',
    recommends: 2,
  },
  {
    id: 14,
    number: 3,
    board: "complain",
    author: '박박박',
    title: '민원 게시판',
    content: '민원 게시판.',
    recommends: 2,
  },
  {
    id: 15,
    number: 3,
    board: "announce",
    author: '관리자',
    title: '공지사항1',
    content: '공지공지',
    recommends: 2,
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

app.put('/api/user', (req, res) => {
  const { nickname, id, pw } = req.body;
  const user = userInfo.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (nickname) user.nickname = nickname;
  if (id) user.id = id;
  if (pw) user.pw = pw;

  return res.json({ message: 'User information updated successfully' });
});

app.get('/api/home', (req, res) => {
  const { board } = req.query;
  let filteredPosts;

  if (board === "hot") {
    filteredPosts = Post
      .filter(post => post.recommends >= 10)
      .sort((a, b) => b.recommends - a.recommends)
      .slice(0, 5);
  } else {
    filteredPosts = Post
      .filter(post => post.board === board)
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);
  }

  res.json({ posts: filteredPosts });
});

app.get('/api/complain', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + Number(limit);

  const filteredPosts = Post.filter(post => post.board === "complain").sort((a, b) => b.id - a.id);
  const total = filteredPosts.length;
  const posts = filteredPosts.slice(startIndex, endIndex);

  res.json({ total, posts });
});

app.get('/api/report', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + Number(limit);

  const filteredPosts = Post.filter(post => post.board === "report").sort((a, b) => b.id - a.id);
  const total = filteredPosts.length;
  const posts = filteredPosts.slice(startIndex, endIndex);

  res.json({ total, posts });
});

app.get('/api/hot', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + Number(limit);

  const filteredPosts = Post.filter(post => post.recommends >= 10).sort((a, b) => b.id - a.id);
  const total = filteredPosts.length;
  const posts = filteredPosts.slice(startIndex, endIndex);

  res.json({ total, posts });
});

app.get('/api/announce', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + Number(limit);

  const filteredPosts = Post.filter(post => post.board === "announce").sort((a, b) => b.id - a.id);
  const total = filteredPosts.length;
  const posts = filteredPosts.slice(startIndex, endIndex);

  res.json({ total, posts });
});

const decodeURIComponentSafely = (str) => {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
};

app.get('/api/mypost', (req, res) => {
  const { page = 1, limit = 10, author } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + Number(limit);

  const filteredPosts = Post.filter(post => post.author === author).sort((a, b) => b.id - a.id);
  const total = filteredPosts.length;
  const posts = filteredPosts.slice(startIndex, endIndex);

  res.json({ total, posts });
});

app.get('/api/search', (req, res) => {
  const { query, page, limit, board, author } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const start = (pageNum - 1) * limitNum;
  let filteredPosts;

  if(board === "mypost"){
    filteredPosts = Post.filter(post => 
    post.title.includes(query) && post.author === author
    );
  }
  else{
    filteredPosts = Post.filter(post => 
      post.title.includes(query) && post.board === board
   );
  }

  const paginatedPosts = filteredPosts
    .sort((a, b) => b.id - a.id)
    .slice(start, start + limitNum);

  res.json({
    posts: paginatedPosts,
    total: filteredPosts.length,
  });
});

app.listen(4000, () => {
  console.log('server start!!');
});