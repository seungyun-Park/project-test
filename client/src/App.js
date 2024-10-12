import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MapComponent from './MapComponent';

// styled-components 정의
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

const Sidebar = styled.div`
  width: 30%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const ListItem = styled.li`
  list-style: none;
  padding: 10px;
  border-bottom: 1px solid #eee;
  
  h3 {
    margin: 0;
    font-size: 18px;
  }
  
  p {
    margin: 5px 0;
    color: #666;
  }
`;

const MapContainer = styled.div`
  width: 65%;
  height: 600px;
`;

function App() {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/searchPlaces?query=${query}`);
      setPlaces(response.data.items);
    } catch (error) {
      console.error('장소 정보를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <Container>
      
      <MapContainer>
        <MapComponent 
          markers={places.map(place => ({
            lat: parseFloat(place.mapy) / 10000000,
            lng: parseFloat(place.mapx) / 10000000,
          }))}
        />
      </MapContainer>

      <Sidebar>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="장소명 검색"
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
        <ul>
          {places.map((place, index) => (
            <ListItem key={index}>
              <h3>{place.title.replace(/<\/?b>/g, '')}</h3>
              <p>{place.roadAddress}</p>
              <p>{place.category}</p>
            </ListItem>
          ))}
        </ul>
      </Sidebar>

    </Container>
  );
}

export default App;
