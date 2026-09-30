(function () {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  const app = document.getElementById("app");

  if (!data?.windowsCase || !data?.common?.profile?.name || !app) {
    throw new Error("포트폴리오 데이터를 불러오지 못했습니다.");
  }

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const documentActions = () => `
    <div class="document-actions case-actions" aria-label="문서 도구">
      <button type="button" data-print>인쇄 보기</button>
    </div>`;

  const stackMarkup = (items) => {
    if (Array.isArray(items) && Array.isArray(items[0])) {
      return `
        <div class="case-stack">
          <strong>기술</strong>
          <div class="stack-lines">
            ${items.map((line) => `<div class="stack-line">${line.map((item) => escapeHtml(item)).join(" · ")}</div>`).join("")}
          </div>
        </div>`;
    }

    return `
      <p class="case-stack">
        <strong>기술</strong>
        <span>${items.map((item) => escapeHtml(item)).join(" · ")}</span>
      </p>`;
  };

  const overviewMarkup = (project, number) => `
    <article class="case-overview-row">
      <div class="case-overview-title">
        <span>${escapeHtml(number)}</span>
        <div>
          <h2>${escapeHtml(project.title)}</h2>
          <time>${escapeHtml(project.period)}</time>
        </div>
      </div>
      <div class="case-overview-copy">
        <p class="overview-intro-text">${escapeHtml(project.intro)}</p>
        ${stackMarkup(project.stack)}
      </div>
    </article>`;

  const caseBulletSection = (title, items, className = "") => `
    <section class="case-block ${className}">
      <h3>${escapeHtml(title)}</h3>
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>`;

  const caseFactsMarkup = (project) => `
    <aside class="case-facts">
      ${stackMarkup(project.stack)}
      ${caseBulletSection("구현 결과", project.results, "case-results")}
    </aside>`;

  const pageCount = Object.keys(data.windowsCase.projects).length + 1;

  const pageMarker = (pageNumber) => `
    <div class="page-marker" aria-hidden="true">
      <span>${escapeHtml(data.common.profile.name)} · Windows 장비 연동 개발 포트폴리오</span>
      <span>${pageNumber} / ${pageCount}</span>
    </div>`;

  const detail = data.windowsCase;
  const hub = detail.projects.dataHub;
  const camera = detail.projects.camera;
  const motor = detail.projects.motor;

  document.documentElement.dataset.accent = "blue";
  document.title = `${data.common.profile.name} | ${detail.title}`;
  app.innerHTML = `
    ${documentActions()}
    <article class="document-shell case-document">
      <section class="print-page case-page case-cover" data-page-number="1">
        <header class="case-hero">
          <h1>${escapeHtml(data.common.profile.name)} <span>|</span> ${escapeHtml(detail.title)}</h1>
          <p class="case-subtitle">${escapeHtml(detail.subtitle)}</p>
        </header>
        <p class="case-lead">${escapeHtml(detail.summary)}</p>
        <div class="case-overview-list">
          ${overviewMarkup(hub, "01")}
          ${overviewMarkup(camera, "02")}
          ${overviewMarkup(motor, "03")}
        </div>
        ${pageMarker(1)}
      </section>

      <section class="print-page case-page" data-page-number="2">
        <header class="case-section-header"><span>01</span><div><p>장비 데이터 통합</p><div class="case-title-line"><h2>${escapeHtml(hub.title)}</h2><time>${escapeHtml(hub.period)}</time></div></div></header>
        <p class="case-responsibility">${escapeHtml(hub.responsibility)}</p>
        <p class="case-intro">${escapeHtml(hub.intro)}</p>
        <div class="case-lead-grid">
          <figure class="case-primary-figure">
            <img src="${escapeHtml(hub.imageMain)}" alt="TunnelROVDataHub 장비 데이터 모니터링 화면">
            <figcaption>장비별 송수신 상태와 데이터를 통합한 모니터링 화면</figcaption>
          </figure>
          ${caseFactsMarkup(hub)}
        </div>
        <figure class="diagram-figure">
          <img src="assets/diagrams/datahub-flow.svg" alt="TunnelROVDataHub 장비 데이터 처리 흐름도">
        </figure>
        <div class="evidence-grid">
          <figure class="config-figure">
            <img src="${escapeHtml(hub.imageConfig)}" alt="장비별 통신 설정 화면">
            <figcaption><strong>연결 설정</strong> 장비별 통신 설정과 동작 옵션을 실행 코드에서 분리</figcaption>
          </figure>
          <figure class="logs-figure">
            <img src="${escapeHtml(hub.imageLogs)}" alt="장비별 송수신 로그 화면">
            <figcaption><strong>송수신 로그</strong> 날짜·대상별 파일로 분리해 연결 상태와 기록을 추적</figcaption>
          </figure>
        </div>
        <div class="two-column-cases">
          ${caseBulletSection("핵심 구현", hub.implementation)}
          ${caseBulletSection("예외 처리와 자원 수명주기", hub.lifecycle)}
        </div>
        ${pageMarker(2)}
      </section>

      <section class="print-page case-page" data-page-number="3">
        <header class="case-section-header"><span>02</span><div><p>다중 카메라 스트리밍·녹화</p><div class="case-title-line"><h2>${escapeHtml(camera.title)}</h2><time>${escapeHtml(camera.period)}</time></div></div></header>
        <p class="case-responsibility">${escapeHtml(camera.responsibility)}</p>
        <p class="case-intro">${escapeHtml(camera.detailIntro)}</p>
        <div class="case-lead-grid camera-lead-grid">
          <figure class="case-primary-figure">
            <img src="${escapeHtml(camera.imageMain)}" alt="9채널 RTSP 카메라 통합 화면">
            <figcaption>9채널 카메라 통합 운용 화면</figcaption>
          </figure>
          ${caseFactsMarkup(camera)}
        </div>
        <figure class="diagram-figure split-diagrams">
          <img src="assets/diagrams/camera-paths.svg" alt="RTSP 영상 표시와 녹화 처리 경로">
          <img src="assets/diagrams/camera-lifecycle.svg" alt="카메라 연결과 종료 수명주기">
        </figure>
        <div class="two-column-cases">
          ${caseBulletSection("핵심 구현", camera.implementation)}
          ${caseBulletSection("예외 처리와 자원 수명주기", camera.lifecycle)}
        </div>
        ${pageMarker(3)}
      </section>
      <section class="print-page case-page motor-page" data-page-number="4">
        <header class="case-section-header"><span>03</span><div><p>조이패드 제어·상태 모니터링</p><div class="case-title-line"><h2>${escapeHtml(motor.title)}</h2><time>${escapeHtml(motor.period)}</time></div></div></header>
        <p class="case-responsibility">${escapeHtml(motor.responsibility)}</p>
        <p class="case-intro">${escapeHtml(motor.detailIntro)}</p>
        <div class="case-lead-grid motor-lead-grid">
          <figure class="case-primary-figure motor-primary-figure">
            <div class="motor-screen-frame"><img src="${escapeHtml(motor.imageMain)}" alt="Motor 2의 RPM·전류·전압·온도 상태를 표시한 실제 UI 일부"></div>
            <figcaption>Motor 2 상태 표시 UI 일부 · 화면의 순간값은 성능 지표가 아닙니다.</figcaption>
          </figure>
          <aside class="case-facts">
            ${stackMarkup(motor.detailStack)}
            ${caseBulletSection("구현 범위", motor.results, "case-results")}
          </aside>
        </div>
        <figure class="diagram-figure split-diagrams motor-flow-diagrams">
          <div class="motor-flow-panel">
            <picture>
              <source media="screen and (max-width: 760px)" srcset="assets/diagrams/motor-control-flow-mobile.svg">
              <img src="assets/diagrams/motor-control-flow.svg" alt="조이패드 입력을 C++/Qt 응용 프로그램에서 모터 명령으로 변환해 컨트롤러에 전달하는 흐름">
            </picture>
          </div>
          <div class="motor-flow-panel">
            <picture>
              <source media="screen and (max-width: 760px)" srcset="assets/diagrams/motor-monitoring-flow-mobile.svg">
              <img src="assets/diagrams/motor-monitoring-flow.svg" alt="모터 컨트롤러의 상태를 수신 프로토콜로 처리해 RPM·전류·전압·온도를 모니터링 UI에서 확인하는 흐름">
            </picture>
          </div>
        </figure>
        <div class="two-column-cases motor-detail-columns">
          ${caseBulletSection("핵심 구현", motor.implementation)}
        </div>
        ${pageMarker(4)}
      </section>
    </article>`;

  document.querySelector("[data-print]")?.addEventListener("click", () => window.print());
})();
