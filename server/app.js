
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

const client_id = process.env.NAVER_SEARCH_ID;
const client_secret = process.env.NAVER_SEARCH_SECERT;

app.get('/searchPlaces', async (req, res) => {
  const query = req.query.query; // 클라이언트에서 이미 인코딩된 상태로 전달됨
  
  console.log("Original Query:", query);
  console.log("Client ID:", client_id);
  console.log("Client Secret:", client_secret);

  try {
    const response = await axios.get('https://openapi.naver.com/v1/search/local.json', {
      params: { 
        query: query,
        display: 5  // 결과 개수를 5개로 제한
      },
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret
      }
    });

    console.log("Full request URL:", response.config.url);
    console.log("Full request headers:", response.config.headers);
    console.log("Naver Local Search API Response:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    }
    res.status(500).json({ 
      error: '장소 정보를 불러오는 중 오류가 발생했습니다.',
      details: error.response ? error.response.data : error.message
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});