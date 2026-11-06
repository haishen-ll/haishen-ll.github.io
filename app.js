(() => {
  const p = window.PROFILE;
  let lang = 'en', filter = 'All';
  try { lang = localStorage.getItem('academic-language') === 'zh' ? 'zh' : 'en'; } catch {}
  const $ = id => document.getElementById(id);
  const t = value => typeof value === 'string' ? value : value?.[lang] || value?.en || '';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safe = value => { if (!value) return ''; try { const u = new URL(value, location.href); return ['http:','https:','mailto:','file:'].includes(u.protocol) ? value : ''; } catch { return ''; } };
  const link = (url, label) => safe(url) ? `<a href="${esc(safe(url))}">${esc(label)}</a>` : '';
  const tr = (en, zh) => lang === 'en' ? en : zh;
  const set = (id, value) => { $(id).textContent = value; };
  function papers() {
    const tags = ['All', ...new Set(p.publications.flatMap(x => x.tags))];
    $('filters').innerHTML = tags.map(tag => `<button type="button" data-filter="${esc(tag)}" aria-pressed="${filter === tag}">${esc(tag === 'All' ? tr('All papers','全部论文') : tag)}</button>`).join('');
    $('filters').querySelectorAll('button').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; papers(); $('filters').querySelectorAll('button').forEach(b => { if (b.dataset.filter === filter) b.focus(); }); }));
    $('publication-list').innerHTML = p.publications.filter(x => filter === 'All' || x.tags.includes(filter)).map(x => `<article class="paper"><div class="paper-year">${esc(x.year)}</div><div><span class="venue">${esc(x.venue)}</span><h3>${esc(t(x.title))}</h3><p class="authors">${esc(x.authors)}</p><p class="paper-desc">${esc(t(x.description))}</p><div class="paper-links">${Object.entries(x.links).map(([label,url]) => link(url,label + ' ↗')).join('')}</div>${t(x.abstract) ? `<details><summary>${tr('Read abstract','查看摘要')}</summary><p>${esc(t(x.abstract))}</p></details>` : ''}</div></article>`).join('');
  }
  function render() {
    document.documentElement.lang = lang; document.body.lang = lang;
    document.title = `${t(p.name)} · ${tr('Research','学术主页')}`;
    document.querySelector('meta[name=description]').content = t(p.bio);
    set('name',t(p.name)); set('eyebrow',t(p.department)); set('position',t(p.role)); set('bio',t(p.bio));
    $('nav').innerHTML = [['about','About','简介'],['research','Research','研究'],['experience','Experience','工作'],['education','Education','教育'],['projects','Models','开源模型'],['publications','Publications','论文']].filter(([id]) => id !== 'projects' || p.projects.length).map(([id,en,zh]) => `<a href="#${id}">${tr(en,zh)}</a>`).join('');
    set('language', tr('中文 ↗','English ↗')); $('language').setAttribute('aria-label',tr('切换为中文','Switch to English'));
    $('socials').innerHTML = [link(p.email ? `mailto:${p.email}` : '',tr('Email ↗','邮箱 ↗')),link(p.links.scholar,'Google Scholar ↗'),link(p.links.github,'GitHub ↗'),link(p.links.cv,tr('Curriculum Vitae ↗','个人简历 ↗'))].join('');
    set('note-label',tr('LEI LIU','LEI LIU')); set('research-question',tr('Medical AI & Language Models','医疗人工智能与大语言模型')); set('note-footer',tr('ANT GROUP · ZHEJIANG UNIVERSITY','蚂蚁集团 · 浙江大学'));
    if (p.portrait && safe(p.portrait) && !document.querySelector('.portrait')) { const img = document.createElement('img'); img.className = 'portrait'; img.src = p.portrait; img.alt = t(p.name); document.querySelector('.network').replaceWith(img); }
    const portrait = document.querySelector('.portrait'); if (portrait) portrait.alt = t(p.name);
    $('template-notice').hidden = !p.demo; set('template-notice',tr('TEMPLATE PREVIEW · All profile details, papers, and experience below are illustrative.','模板预览 · 当前个人资料、论文与经历均为示例，请在发布前替换。'));
    for (const [id,en,zh] of [['research','Research interests','研究方向'],['publications','Publications','论文发表'],['projects','Open-source Medical Models','开源医疗大模型'],['experience','Professional experience','工作经历'],['education','Education','教育经历'],['news','Recent updates','最近动态']]) set(`${id}-title`,tr(en,zh));
    $('research-list').innerHTML = p.interests.map(x => `<article><h3>${esc(t(x.title))}</h3><p>${esc(t(x.text))}</p><span class="tags">${esc(t(x.tags))}</span></article>`).join('');
    papers();
    for (const id of ['projects','experience','education','news']) $(id).hidden = !p[id].length;
    $('project-list').innerHTML = p.projects.map(x => `<article class="project model-card"><div class="model-heading"><div><h3>${link(x.url,t(x.title))}</h3><div class="model-meta">${esc(x.meta)}</div></div></div><p class="model-description">${esc(t(x.text))}</p><dl class="model-stats">${x.stats.map(stat => `<div><dt>${esc(t(stat.label))}</dt><dd>${esc(stat.value)}</dd></div>`).join('')}</dl><div class="model-links">${Object.entries(x.links).map(([label,url])=>link(url,label+' ↗')).join('')}</div></article>`).join('');
    for (const group of ['experience','education']) $(`${group}-list`).innerHTML = p[group].map(x => `<article class="resume-entry"><div class="resume-date">${esc(t(x.date))}</div><div><h3>${esc(t(x.title))}</h3><p class="resume-subtitle">${esc(t(x.subtitle))}</p>${t(x.text) ? `<p class="resume-detail">${esc(t(x.text))}</p>` : ''}</div></article>`).join('');
    $('news-list').innerHTML = p.news.map(x => `<article class="news-item"><time>${esc(x.date)}</time><p>${esc(t(x.text))}</p></article>`).join('');
    set('contact-label',tr('MORE RESEARCH','更多研究')); set('contact-title',tr('Explore the full research record.','探索更多研究工作。')); set('contact-text',tr('Publication records from Google Scholar · Updated November 6, 2026.','论文信息来源于 Google Scholar · 更新于 2026 年 11 月 6 日。'));
    $('contact-action').innerHTML = !p.email && p.links.scholar ? link(p.links.scholar, 'Google Scholar ↗') : p.email ? link(`mailto:${p.email}`,tr('Get in touch ↗','联系我 ↗')) : `<span class="contact-placeholder">${tr('Your academic email goes here','在此展示你的学术邮箱')}</span>`;
    set('footer-text',`© ${new Date().getFullYear()} ${t(p.name)} · ${tr('Built with curiosity.','保持好奇，持续探索。')}`); set('back-top',tr('Back to top ↑','回到顶部 ↑'));
  }
  $('language').addEventListener('click', () => { lang = lang === 'en' ? 'zh' : 'en'; try { localStorage.setItem('academic-language',lang); } catch {} render(); });
  render();
})();
