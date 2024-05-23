const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
let postId = 16;

app.post('/api/login', (req, res) => { //why post ?
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
  //닉네임 고유, id 고유

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

app.delete('/api/user', (req, res) => {
  const { id } = req.body;

  const userIndex = userInfo.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
  }

  userInfo.splice(userIndex, 1);
  res.status(200).json({ message: '회원 탈퇴가 성공적으로 처리되었습니다.' });
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

app.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = Post.find(post => post.id == id);
  if (post) {
      res.json(post);
  } else {
      res.status(404).json({ message: 'Post not found' });
  }
});

app.post('/api/posts/:id/recommend', (req, res) => {
  const { id } = req.params;
  const { nickname } = req.body;
  const post = Post.find(post => post.id == id);

  if (post) {
      if (post.recommendedBy.includes(nickname)) {
          return res.status(400).json({ message: 'Already recommended' });
      }

      post.recommends += 1;
      post.recommendedBy.push(nickname);
      res.status(200).json({ message: 'Post recommended' });
  } else {
      res.status(404).json({ message: 'Post not found' });
  }
});

app.post('/api/posts', (req, res) => {
  const { title, content, author, board } = req.body;

  if (!title || !content || !author || !board) {
      return res.status(400).json({ message: '모든 필드를 채워주세요.' });
  }

  const newPost = {
      id: postId++,
      title,
      content,
      author,
      board,
      recommends: 0,
      recommendedBy: [],
      comments: []
  };

  Post.push(newPost);
  res.status(201).json(newPost);
});

app.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  const post = Post.find(post => post.id == id);

  if (post) {
      if (post.author !== author) {
          return res.status(403).json({ message: '작성자만 수정할 수 있습니다.' });
      }

      post.title = title || post.title;
      post.content = content || post.content;
      res.status(200).json(post);
  } else {
      res.status(404).json({ message: 'Post not found' });
  }
});

app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { author } = req.body;
  const postIndex = Post.findIndex(post => post.id == id);

  if (postIndex > -1) {
      const post = Post[postIndex];
      if (post.author !== author) {
          return res.status(403).json({ message: '작성자만 삭제할 수 있습니다.' });
      }

      Post.splice(postIndex, 1);
      res.status(200).json({ message: 'Post deleted' });
  } else {
      res.status(404).json({ message: 'Post not found' });
  }
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
  else if(board === "hot"){
    filteredPosts = Post.filter(post => 
      post.title.includes(query) && post.recommends >= 10
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