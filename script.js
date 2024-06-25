// 初始化地图
var map = L.map('map').setView([0, 0], 2);

// 添加 OpenStreetMap 图层
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 定义你们去过的地方和照片
var places = [
    {
        coords: [40.712776, -74.005974],
        name: "New York",
        photos: ["nyc.jpg", "nyc.png"]
    },
    {
        coords: [48.856613, 2.352222],
        name: "Paris",
        photos: ["paris.jpg", "paris.png"]
    },
    // 添加更多的地方
];

// 添加标记和弹出框
places.forEach(function(place) {
    var marker = L.marker(place.coords).addTo(map);
    var popupContent = '<h2><a href="photos.html?place=' + encodeURIComponent(place.name) + '" target="_blank">' + place.name + '</a></h2><div>';
    place.photos.forEach(function(photo) {
        popupContent += '<img src="images/' + photo + '" alt="' + place.name + '" style="width: 100px; margin: 5px;">';
    });
    popupContent += '</div>';
    marker.bindPopup(popupContent);
});