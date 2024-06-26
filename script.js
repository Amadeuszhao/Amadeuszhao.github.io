// 初始化地图
var map = L.map('map').setView([0, 0], 2);

// 添加 OpenStreetMap 图层
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 定义你们去过的地方
var places = [
    {
        coords: [40.712776, -74.005974],
        name: "New York"
    },
    {
        coords: [48.856613, 2.352222],
        name: "Paris"
    }
    // 添加更多的地方
];

// 读取照片 JSON 文件
fetch('photos.json')
    .then(response => response.json())
    .then(data => {
        places.forEach(function(place) {
            var marker = L.marker(place.coords).addTo(map);
            var popupContent = '<h2><a href="photos.html?place=' + encodeURIComponent(place.name) + '" target="_blank">' + place.name + '</a></h2><div>';
            
            // 获取前两张照片
            var photos = data[place.name] || [];
            photos.slice(0, 2).forEach(function(photo) {
                popupContent += '<img src="images/' + place.name + '/' + photo + '" alt="' + place.name + '">';
            });
            
            popupContent += '</div>';
            marker.bindPopup(popupContent);
        });
    })
    .catch(error => console.error('Error loading photos:', error));