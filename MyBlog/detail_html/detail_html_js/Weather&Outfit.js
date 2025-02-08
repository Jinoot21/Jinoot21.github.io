document.addEventListener("DOMContentLoaded", function() {
    var tabs = document.querySelectorAll(".Tab");
    var tabContents = document.querySelectorAll(".Tab-content");

    tabs.forEach(function(tab) {
        tab.addEventListener("click", function() {
            var target = this.getAttribute("data-target");
            tabContents.forEach(function(content) {
                content.classList.remove("active");
            });
            document.getElementById(target).classList.add("active");

            if (target === "c") {
                getWeatherInfo();
            }
        });
    });

});
