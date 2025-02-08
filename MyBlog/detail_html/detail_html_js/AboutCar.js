function calculateEngineOilInterval() {
    var currentKm = parseInt(document.getElementById('currentKm').value);
    var EngineOilInterval = parseInt(document.getElementById('EngineOilInterval').value);
    var remainingKm = EngineOilInterval - currentKm;

    if (remainingKm <= 0) {
        document.getElementById('result').innerHTML = "오일 교체가 필요합니다!";
    } else {
        document.getElementById('result').innerHTML = "다음 엔진오일 교체까지 " + remainingKm + "km 남았습니다.";
    }
}
