(() => {
  'use strict';
  // Static design data only. No service APIs, credentials, or persisted state.
  const services = {
    planfold: { name: 'Planfold', status: '가동 중', state: 'running', process: '확인됨', response: '정상', task: '없음', reason: '' },
    hermes: { name: 'Hermes Dashboard', status: '중단', state: 'stopped', process: '실행되지 않음', response: '응답 없음', task: '없음', reason: '중단된 서비스의 상세 상태를 보여 주는 샘플입니다.' },
    haccpos: { name: 'HaccpOS Platform', status: '확인 불가', state: 'unknown', process: '확인 필요', response: '확인 필요', task: '미확인', reason: '상태를 판정할 수 없는 경우의 예시입니다. 실제 서비스 조회는 수행하지 않습니다.' }
  };
  const $ = (selector) => document.querySelector(selector);
  const login = $('#login-view');
  const overview = $('#overview-view');
  const feedback = $('#preview-feedback');
  let feedbackTimer;

  function route() {
    const active = location.hash === '#overview' ? 'overview' : 'login';
    login.hidden = active !== 'login';
    overview.hidden = active !== 'overview';
    document.body.dataset.view = active;
    document.title = `${active === 'login' ? '로그인' : '내 웹서비스'} · Alex LAB V2 디자인 미리보기`;
    document.querySelectorAll('[data-view-link]').forEach((link) => {
      if (link.dataset.viewLink === active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    feedback.hidden = true;
    if (active === 'login') {
      $('#password').value = 'preview';
      $('#password').type = 'password';
      $('#password-toggle').setAttribute('aria-pressed', 'false');
      $('#password-toggle').setAttribute('aria-label', '비밀번호 표시');
      $('#password-toggle use').setAttribute('href', '#i-eye');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (active === 'overview') $('#overview-title').focus({ preventScroll: true });
  }

  function announce(message) {
    clearTimeout(feedbackTimer);
    $('#preview-feedback > span').textContent = message;
    feedback.hidden = false;
    feedbackTimer = setTimeout(() => { feedback.hidden = true; }, 5200);
  }

  function selectService(id) {
    const service = services[id];
    if (!service) return;
    document.querySelectorAll('[data-service]').forEach((row) => {
      row.classList.toggle('selected', row.dataset.service === id);
    });
    document.querySelectorAll('.service-identity[data-select-service]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.selectService === id));
    });
    $('#selected-name').textContent = service.name;
    const status = $('#selected-status');
    status.className = `status-badge ${service.state}`;
    status.querySelector('span:last-child').textContent = service.status;
    $('#detail-process').textContent = service.process;
    $('#detail-response').textContent = service.response;
    $('#detail-task').textContent = service.task;
    $('#detail-reason').textContent = service.reason;
    $('#detail-reason').hidden = !service.reason;
    const open = $('.open-service');
    const stop = $('.detail-actions [data-demo-action="정지"]');
    const restart = $('.detail-actions [data-demo-action="재시작"]');
    const stopped = service.state === 'stopped';
    open.dataset.demoAction = stopped ? '시작' : '서비스 열기';
    open.innerHTML = stopped
      ? '<svg class="icon" aria-hidden="true"><use href="#i-play"></use></svg>시작'
      : '<svg class="icon" aria-hidden="true"><use href="#i-external-link"></use></svg>서비스 열기';
    open.disabled = service.state === 'unknown';
    stop.disabled = service.state !== 'running';
    restart.disabled = service.state !== 'running';
    $('#selected-name').setAttribute('tabindex', '-1');
    if (window.matchMedia('(max-width: 980px)').matches) {
      $('.detail-surface').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
      $('#selected-name').focus({ preventScroll: true });
    }
  }

  $('#preview-login').addEventListener('submit', (event) => {
    event.preventDefault();
    // Input values are not read, sent, or saved; this is a visual route transition.
    location.hash = 'overview';
  });

  $('#password-toggle').addEventListener('click', () => {
    const password = $('#password');
    const visible = password.type === 'password';
    password.type = visible ? 'text' : 'password';
    $('#password-toggle').setAttribute('aria-pressed', String(visible));
    $('#password-toggle').setAttribute('aria-label', visible ? '비밀번호 숨기기' : '비밀번호 표시');
    $('#password-toggle use').setAttribute('href', visible ? '#i-eye-off' : '#i-eye');
  });

  document.addEventListener('click', (event) => {
    const action = event.target.closest('[data-demo-action]');
    if (action) {
      announce(`‘${action.dataset.demoAction}’ 버튼의 디자인 미리보기입니다. 실제 서비스에는 요청을 보내지 않습니다.`);
      return;
    }
    const selected = event.target.closest('[data-select-service]');
    if (selected) selectService(selected.dataset.selectService);
  });

  $('#preview-feedback button').addEventListener('click', () => { feedback.hidden = true; });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') feedback.hidden = true;
  });
  window.addEventListener('hashchange', route);
  route();
})();
