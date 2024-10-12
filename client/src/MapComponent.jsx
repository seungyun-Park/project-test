import React, { useEffect, useState } from "react";
import {
    Container as MapDiv,
    NavermapsProvider,
    NaverMap,
    Marker,
} from "react-naver-maps"; // 네이버 지도 라이브러리

const MapComponent = ({ markers }) => {
    return (
        <NavermapsProvider
            ncpClientId={"13lmt62yuw"} // 네이버 클라우드에서 발급받은 Client ID
            error={<p>네이버 지도를 불러오는데 실패했습니다.</p>}
            loading={<p>네이버 지도를 불러오는 중입니다...</p>}
        >
            <MapDiv
                style={{
                    width: "70%",
                    height: "60vh",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <NaverMap
                    mapDivId={"naver-map"} // 지도 DOM 요소의 id
                    style={{
                        width: "100%",
                        height: "400px",
                    }}
                    defaultCenter={{ lat: 37.5665, lng: 126.978 }} // 지도 중심 좌표 (서울)
                    defaultZoom={13} // 지도 기본 줌 레벨
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={{ lat: marker.lat, lng: marker.lng }}
                        />
                    ))}
                </NaverMap>
            </MapDiv>
        </NavermapsProvider>
    );
};

export default MapComponent;
