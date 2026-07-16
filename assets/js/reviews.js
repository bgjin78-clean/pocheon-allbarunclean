(function () {
  const YUPUM_SERVICES = ["유품정리", "고독사청소", "특수청소", "유품+특수청소"];
  const CASES_BASE = "/images/cases";

  const REVIEWS = [
    { area: "소흘읍", service: "이사폐기물처리", title: "포천시 소흘읍 이사폐기물처리", text: "송우 일대 아파트에서 이사 일정에 맞춰 가구와 생활폐기물을 한 번에 정리·반출한 사례입니다. 엘리베이터·지하주차장 동선을 사전에 확인했습니다." },
    { area: "포천동", service: "유품정리", title: "포천시 포천동 유품정리", text: "시내 주거 공간에서 보관 물품 분류 후 정리·반출한 사례입니다." },
    { area: "선단동", service: "빈집정리", title: "포천시 선단동 빈집정리", text: "임대·매매 전 남은 가구와 생활폐기물을 정리해 공실 상태로 마무리한 사례입니다." },
    { area: "일동면", service: "쓰레기집청소", title: "포천시 일동면 쓰레기집청소", text: "장기간 방치된 생활폐기물을 분류·포장·상차까지 진행한 사례입니다." },
    { area: "신북면", service: "가정폐기물처리", title: "포천시 신북면 가정폐기물처리", text: "단독주택에서 대형 가구와 생활용품을 하루 만에 분류·반출한 사례입니다." },
    { area: "군내면", service: "고독사청소", title: "포천시 군내면 고독사청소", text: "오염 정리와 소독, 냄새 저감 작업을 단계적으로 진행한 사례입니다." },
    { area: "가산면", service: "폐업폐기물처리", title: "포천시 가산면 폐업폐기물처리", text: "상가·창고 폐업 후 남은 집기와 폐기물을 현장 조건에 맞춰 처리한 사례입니다." },
    { area: "이동면", service: "특수청소", title: "포천시 이동면 특수청소", text: "장기간 방치된 공간의 오염 정리와 소독을 함께 진행한 사례입니다." },
    { area: "영북면", service: "빈집정리", title: "포천시 영북면 빈집정리", text: "외곽 주택 매매 전 남은 짐과 생활폐기물을 정리한 사례입니다." },
    { area: "내촌면", service: "폐기물처리", title: "포천시 내촌면 가정폐기물 대량 반출", text: "농가·단독주택에서 오래된 가구와 생활폐기물을 한 번에 정리·상차한 사례입니다." },
    { area: "영중면", service: "유품정리", title: "포천시 영중면 유품정리", text: "면 지역 단독주택에서 유품 분류와 폐기물 반출 후 공간을 정돈한 사례입니다." }
  ];

  function pad3(n) {
    return String(n).padStart(3, "0");
  }

  function isYupumService(service) {
    return YUPUM_SERVICES.indexOf(service) !== -1
      || service.indexOf("유품") !== -1
      || service === "고독사청소"
      || service === "특수청소";
  }

  function randomCaseNum(service) {
    const yupum = isYupumService(service);
    const min = yupum ? 1 : 51;
    const max = yupum ? 50 : 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function caseImages(num, service) {
    const yupum = isYupumService(service);
    const id = pad3(num);
    if (yupum) {
      return {
        before: CASES_BASE + "/before-" + id + ".jpg",
        after: CASES_BASE + "/after-" + id + ".jpg"
      };
    }
    return {
      before: CASES_BASE + "/waste-before-" + id + ".jpg",
      after: CASES_BASE + "/waste-after-" + id + ".jpg"
    };
  }

  function renderReviews(filterArea) {
    const list = document.getElementById("reviewList");
    if (!list) return;

    list.innerHTML = "";

    REVIEWS.forEach(function (review) {
      if (filterArea && !review.area.includes(filterArea) && !filterArea.includes(review.area)) return;

      const caseNum = randomCaseNum(review.service);
      const imgs = caseImages(caseNum, review.service);
      const article = document.createElement("article");
      article.className = "review-card";
      article.setAttribute("data-area", review.area);
      article.innerHTML =
        '<span class="tag">' + review.service + "</span>" +
        "<strong>" + review.title + "</strong>" +
        '<div class="photo-row photo-row--pair" style="margin:14px 0">' +
        '<img src="' + imgs.before + '" alt="' + review.title + ' 작업 전" loading="lazy" />' +
        '<img src="' + imgs.after + '" alt="' + review.title + ' 작업 후" loading="lazy" />' +
        "</div>" +
        "<p>" + review.text + "</p>";

      list.appendChild(article);
    });
  }

  const params = new URLSearchParams(window.location.search);
  const area = params.get("area");
  if (area) {
    const label = document.getElementById("filterLabel");
    if (label) label.textContent = area + " 작업후기입니다.";
  }

  renderReviews(area);
})();
