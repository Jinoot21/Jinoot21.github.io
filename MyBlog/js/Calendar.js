document.addEventListener("DOMContentLoaded", function () {
  const calendarBody = document.getElementById("calendarBody");   // 달력
  const monthYear = document.getElementById("monthYear");   // 월&년도
  const prevBtn = document.getElementById("prevBtn");   // 이전 달 버튼
  const nextBtn = document.getElementById("nextBtn");   // 다음 달 버튼
  const inputField = document.getElementById("inputField");   // 입력 칸
  const addButton = document.getElementById("addButton");   // 추가 버튼
  const listItems = document.getElementById("listItems");   // 리스트 컨테이너

  let selectedDate = null; // 선택된 날짜 저장

  // 달력과 리스트 초기화
  function initialize() {
    // 현재 날짜
    const currentDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/London" }));
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // 지난 달 클릭
    prevBtn.addEventListener("click", function () {
      if (currentMonth === 0) {
        currentMonth = 11;
        currentYear -= 1;
      } else {
        currentMonth -= 1;
      }
      renderCalendar(currentYear, currentMonth);
    });

    // 다음 달 클릭
    nextBtn.addEventListener("click", function () {
      if (currentMonth === 11) {
        currentMonth = 0;
        currentYear += 1;
      } else {
        currentMonth += 1;
      }
      renderCalendar(currentYear, currentMonth);
    });

    // 추가 버튼 클릭 
    addButton.addEventListener("click", function () {
      const inputValue = inputField.value.trim();
      if (inputValue !== "") {
        const listItem = document.createElement("li");

        if (selectedDate) {
          const date = selectedDate.getAttribute("data-date");
          const day = selectedDate.getAttribute("data-day");
          listItem.textContent = `${currentYear}.${currentMonth + 1}.${date}. (${day}): ${inputValue}`;
          selectedDate = null; // 날짜 초기화
        } else {
          listItem.textContent = inputValue;
        }

        listItems.appendChild(listItem);
        inputField.value = "";

        // 메모 저장
        const savedItems = JSON.parse(localStorage.getItem("listItems")) || [];
        savedItems.push(listItem.textContent);
        localStorage.setItem("listItems", JSON.stringify(savedItems));
      }
    });

    // 삭제 버튼 클릭
    deleteButton.addEventListener("click", function () {
      listItems.innerHTML = "";
      localStorage.removeItem("listItems");
    });

    const savedItems = JSON.parse(localStorage.getItem("listItems")) || [];
    savedItems.forEach(function (itemText) {
      const listItem = document.createElement("li");
      listItem.textContent = itemText;
      listItems.appendChild(listItem);
    });

    // 달력 렌더링
    renderCalendar(currentYear, currentMonth);
  }

  function renderCalendar(year, month) {
    calendarBody.innerHTML = "";

    monthYear.textContent = `${year}년 ${month + 1}월`;

    const daysInMonth = getDaysInMonth(year, month);    // 선택한 달의 일 수 계산

    const firstDayOfWeek = new Date(year, month, 1).getDay();   // 선택한 달의 첫 날 요일

    let currentDate = 1;

    for (let row = 0; row < 6; row++) {
      const rowElement = document.createElement("tr");    // tr 생성

      for (let col = 0; col < 7; col++) {
        const cellElement = document.createElement("td");   // td 생성

        if ((row === 0 && col < firstDayOfWeek) || currentDate > daysInMonth) {
          cellElement.textContent = "";   // 칸 공백
        } else {
          const dateElement = document.createElement("span");   // 날짜 표시
          dateElement.textContent = currentDate;
          cellElement.appendChild(dateElement);
          cellElement.setAttribute("data-date", currentDate);
          cellElement.setAttribute("data-day", daysOfWeek[col]);

          if (currentDate === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
            cellElement.classList.add("today");   // 오늘 날짜 today 클래스
          }

          cellElement.addEventListener("click", function () {
            const selectedCell = document.querySelector(".selected");
            if (selectedCell) {
              selectedCell.classList.remove("selected");    // 삭제
            }
            this.classList.add("selected");   // 선택한 날짜 selected 클래스
            selectedDate = this;    // 선택한 날짜
          });

          currentDate++;
        }

        rowElement.appendChild(cellElement);
      }

      calendarBody.appendChild(rowElement);
    }
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"]; 

  initialize();   // 초기화
});
