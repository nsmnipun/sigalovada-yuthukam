(function () {
  const S = window.SUTTA;
  const page = document.body.dataset.page;

  const UI = {
    siteTitle: { si: "සිඟාලෝවාද සූත්‍රය", en: "Sigālovāda Sutta" },
    siteSub: { si: "ගිහි විනය – දිශා හයේ යුතුකම්", en: "The layperson's code: duties of the six directions" },
    home: { si: "මුල් පිටුව", en: "Home" },
    teachings: { si: "තවත් ඉගැන්වීම්", en: "More teachings" },
    quiz: { si: "ප්‍රශ්න විචාරය", en: "Quiz" },
    langBtn: { si: "English", en: "සිංහල" },
    storyTitle: { si: "කතාව", en: "The story" },
    story: {
      si: "බුදුරජාණන් වහන්සේ රජගහ නුවර වේළුවනාරාමයේ වැඩ වසන සමයේ, සිඟාල නම් තරුණ ගෘහපති පුත්‍රයෙක්, තම පියාගේ අවසන් උපදෙස පිළිපදිමින්, උදෑසනම නාලා, තෙත් වස්ත්‍ර හා තෙත් කෙස් ඇතිව දිශා හයට වැඳීය. පිඬු සිඟා වැඩම කළ බුදුරජාණන් වහන්සේ ඔහු දැක, ආර්ය විනයෙහි දිශා වැඳිය යුත්තේ එසේ නොවන බව වදාළ සේක. සැබෑ දිශා හය නම් අප හා බැඳුණු මිනිසුන් ය. ඔවුන්ට අපගේ යුතුකම් ඉටු කිරීමම සැබෑ දිශා වන්දනාවයි.",
      en: "While the Buddha was staying at the Bamboo Grove near Rājagaha, a young man named Sigāla, following his late father's last wish, rose early, bathed, and with wet hair and clothes bowed to the six directions. The Buddha, out on his alms round, saw him and said this was not how the six directions are honoured in the noble discipline. The real six directions are the people our lives are bound up with, and the real way to honour them is to do our duty by them."
    },
    compassTitle: { si: "දිශා හය", en: "The six directions" },
    compassHint: { si: "යුතුකම් කියවීමට දිශාවක් තෝරන්න", en: "Choose a direction to read its duties" },
    you: { si: "ඔබ", en: "You" },
    verseTitle: { si: "ගාථාව", en: "The verse" },
    whyTitle: { si: "ඇයි මේ දිශාව?", en: "Why this direction?" },
    whyNote: { si: "අටුවාවට අනුව", en: "Following the commentary" },
    prev: { si: "පෙර දිශාව", en: "Previous" },
    next: { si: "ඊළඟ දිශාව", en: "Next" },
    source: { si: "මූලාශ්‍රය: දීඝ නිකාය 31 – සිඟාලෝවාද සූත්‍රය", en: "Source: Dīgha Nikāya 31, the Sigālovāda Sutta" },
    madeFor: { si: "විනෝදයට සහ ඉගෙනීමට සාදන ලදී", en: "Made for fun and learning" },
    quizIntro: { si: "මේ යුතුකම කාගෙන් කාටද?", en: "Whose duty is this, and toward whom?" },
    quizNext: { si: "ඊළඟ ප්‍රශ්නය", en: "Next question" },
    quizDone: { si: "අවසන්!", en: "Done!" },
    quizScore: { si: "ලකුණු", en: "Score" },
    quizAgain: { si: "නැවත උත්සාහ කරන්න", en: "Try again" },
    quizRight: { si: "නිවැරදියි!", en: "Correct!" },
    quizWrong: { si: "නිවැරදි පිළිතුර:", en: "The answer was:" },
    question: { si: "ප්‍රශ්නය", en: "Question" },
    dangers: { si: "ආදීනව", en: "dangers" }
  };

  // Language preference (per viewer)
  let lang = "si";
  try { lang = localStorage.getItem("sigalovada-lang") || "si"; } catch (e) {}
  const t = (o) => (o && (o[lang] || o.si)) || "";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const T = (o) => esc(t(o));

  function setLang(l) {
    lang = l;
    try { localStorage.setItem("sigalovada-lang", l); } catch (e) {}
    render();
  }

  function header() {
    const link = (href, label, active) =>
      `<a href="${href}"${active ? ' aria-current="page"' : ""}>${T(label)}</a>`;
    return `
      <div class="wrap bar">
        <a class="brand" href="index.html"><span class="mark" aria-hidden="true">☸</span>${T(UI.siteTitle)}</a>
        <nav>
          ${link("index.html", UI.home, page === "home")}
          ${link("teachings.html", UI.teachings, page === "teachings")}
          ${link("quiz.html", UI.quiz, page === "quiz")}
          <button class="lang" type="button" id="langBtn">${T(UI.langBtn)}</button>
        </nav>
      </div>`;
  }

  function footer() {
    return `<div class="wrap foot"><p>${T(UI.source)}</p><p>${T(UI.madeFor)} ☸</p></div>`;
  }

  // ---------- Home ----------
  // Order the tiles pop out from the centre
  const POP = { north: 1, east: 2, south: 3, west: 4, zenith: 5, nadir: 6 };

  function tile(d) {
    return `
      <a class="tile tile-${d.id}" href="${d.file}" style="--i:${POP[d.id]}">
        <span class="tile-icon" aria-hidden="true">${d.icon}</span>
        <span class="tile-dir">${T(d.dir)}</span>
        <span class="tile-who">${T(d.who)}</span>
      </a>`;
  }

  function petals() {
    let out = "";
    for (let i = 0; i < 10; i++) {
      const left = (i * 37 + 7) % 100;
      out += `<span style="left:${left}%;--d:${9 + (i % 4) * 2}s;--delay:${-i * 1.7}s;--s:${0.7 + (i % 3) * 0.25}">🪷</span>`;
    }
    return out;
  }

  // Fade sections in as they scroll into view
  function setupReveal() {
    const els = document.querySelectorAll(".reveal");
    if (document.body.classList.contains("settled") || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    els.forEach((e) => io.observe(e));
  }

  function home() {
    const byId = Object.fromEntries(S.directions.map((d) => [d.id, d]));
    return `
      <section class="hero">
        <div class="petals" aria-hidden="true">${petals()}</div>
        <div class="wrap">
          <p class="eyebrow">Dīgha Nikāya 31</p>
          <h1>${T(UI.siteTitle)}</h1>
          <p class="lede">${T(UI.siteSub)}</p>
        </div>
      </section>

      <section class="wrap">
        <h2>${T(UI.compassTitle)}</h2>
        <p class="muted">${T(UI.compassHint)}</p>
        <div class="compass">
          ${tile(byId.zenith)}
          ${tile(byId.north)}
          ${tile(byId.west)}
          <div class="you"><span>${T(UI.you)}</span></div>
          ${tile(byId.east)}
          ${tile(byId.south)}
          ${tile(byId.nadir)}
        </div>
      </section>

      <section class="wrap prose reveal">
        <h2>${T(UI.storyTitle)}</h2>
        <p>${T(UI.story)}</p>
      </section>

      <section class="wrap reveal">
        <h2>${T(UI.verseTitle)}</h2>
        <blockquote class="verse">
          <p class="pali">${S.verse.pali.map((l, i) => `<span class="line" style="--i:${i}">${esc(l)}</span>`).join("<br>")}</p>
          <p>${T(S.verse)}</p>
        </blockquote>
      </section>`;
  }

  // ---------- Direction pages ----------
  function direction() {
    const id = document.body.dataset.direction;
    const i = S.directions.findIndex((d) => d.id === id);
    const d = S.directions[i];
    const prev = S.directions[(i + S.directions.length - 1) % S.directions.length];
    const next = S.directions[(i + 1) % S.directions.length];
    document.title = `${t(d.dir)} – ${t(d.who)} | ${t(UI.siteTitle)}`;

    const chips = S.directions
      .map((x) => `<a class="chip${x.id === id ? " on" : ""}" href="${x.file}">${x.icon} ${T(x.dir)}</a>`)
      .join("");

    const side = (s, k) => `
      <article class="card side side-${k}">
        <h2>${T(s.title)}</h2>
        <ol class="duties">
          ${s.items.map((it) => `<li>${T(it)}</li>`).join("")}
        </ol>
      </article>`;

    return `
      <section class="hero hero-dir dir-${d.id}">
        <div class="petals" aria-hidden="true">${petals()}</div>
        <div class="wrap">
          <div class="chips">${chips}</div>
          <p class="eyebrow">${esc(d.pali)}</p>
          <h1><span aria-hidden="true">${d.icon}</span> ${T(d.dir)} <span class="sep">·</span> ${T(d.who)}</h1>
        </div>
      </section>

      <section class="wrap">
        <aside class="why">
          <h3>${T(UI.whyTitle)} <small>${T(UI.whyNote)}</small></h3>
          <p>${T(d.why)}</p>
        </aside>
        <div class="sides">
          ${d.sides.map(side).join('<div class="swap" aria-hidden="true">⇄</div>')}
        </div>
        <nav class="pager">
          <a href="${prev.file}">← ${T(UI.prev)}: ${T(prev.dir)}</a>
          <a href="${next.file}">${T(UI.next)}: ${T(next.dir)} →</a>
        </nav>
      </section>`;
  }

  // ---------- Teachings ----------
  function teachings() {
    const list = (items) => `<ul class="ticks">${items.map((x) => `<li>${T(x)}</li>`).join("")}</ul>`;
    const friendGroup = (g, cls) => `
      <h3 class="group ${cls}">${T(g.label)}</h3>
      <div class="grid2">
        ${g.types.map((ty) => `
          <article class="card ${cls}">
            <h4>${T(ty.name)}</h4>
            ${list(ty.traits)}
          </article>`).join("")}
      </div>`;

    const total = S.wealth.parts.reduce((a, p) => a + p.share, 0);

    return `
      <section class="hero">
        <div class="petals" aria-hidden="true">${petals()}</div>
        <div class="wrap">
          <p class="eyebrow">Sigālovāda Sutta</p>
          <h1>${T(UI.teachings)}</h1>
        </div>
      </section>

      <section class="wrap">
        <div class="grid2">
          ${S.teachings.map((x) => `
            <article class="card">
              <h2>${T(x.title)}</h2>
              <p class="muted">${T(x.intro)}</p>
              ${list(x.items)}
            </article>`).join("")}
        </div>

        <h2 class="section">${T(S.apaya.title)}</h2>
        <p class="muted">${T(S.apaya.intro)}</p>
        <div class="accordion">
          ${S.apaya.items.map((a, n) => `
            <details>
              <summary><span class="num">${n + 1}</span> ${T(a.name)} <small>6 ${T(UI.dangers)}</small></summary>
              ${a.note ? `<p class="muted">${T(a.note)}</p>` : ""}
              ${list(a.dangers)}
            </details>`).join("")}
        </div>

        <h2 class="section">${T(S.friends.title)}</h2>
        ${friendGroup(S.friends.fake, "fake")}
        ${friendGroup(S.friends.real, "real")}

        <h2 class="section">${T(S.wealth.title)}</h2>
        <p class="muted">${T(S.wealth.intro)}</p>
        <div class="wealth-bar" role="img" aria-label="1 : 2 : 1">
          ${S.wealth.parts.map((p, n) => `<div class="w w${n}" style="flex:${p.share}">${p.share}/${total}</div>`).join("")}
        </div>
        <ul class="wealth-legend">
          ${S.wealth.parts.map((p, n) => `<li><span class="sw w${n}"></span>${T(p)}</li>`).join("")}
        </ul>
      </section>`;
  }

  // ---------- Quiz ----------
  const quiz = { qs: [], n: 0, score: 0, answered: false };

  function buildPool() {
    const pool = [];
    const counts = {};
    S.directions.forEach((d) =>
      d.sides.forEach((s, k) => {
        const other = d.sides[1 - k];
        const label = { si: `${s.from.si} → ${other.from.si}`, en: `${s.from.en} → ${other.from.en}` };
        s.items.forEach((it) => {
          counts[it.si] = (counts[it.si] || 0) + 1;
          pool.push({ item: it, key: `${d.id}-${k}`, label, icon: d.icon });
        });
      })
    );
    // Drop duties that appear word-for-word in more than one relationship
    return pool.filter((p) => counts[p.item.si] === 1);
  }

  const shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  function newQuiz() {
    const pool = buildPool();
    const labels = Object.values(Object.fromEntries(pool.map((p) => [p.key, p])));
    quiz.qs = shuffle(pool).slice(0, 10).map((q) => {
      const wrong = shuffle(labels.filter((l) => l.key !== q.key)).slice(0, 3);
      return { ...q, options: shuffle([q, ...wrong].map((o) => ({ key: o.key, label: o.label, icon: o.icon }))) };
    });
    quiz.n = 0;
    quiz.score = 0;
    quiz.answered = null;
  }

  function quizView() {
    if (!quiz.qs.length) newQuiz();
    const total = quiz.qs.length;
    let body;
    if (quiz.n >= total) {
      body = `
        <div class="card quiz-end">
          <h2>${T(UI.quizDone)}</h2>
          <p class="big">${quiz.score} / ${total}</p>
          <button class="btn" type="button" id="again">${T(UI.quizAgain)}</button>
        </div>`;
    } else {
      const q = quiz.qs[quiz.n];
      const a = quiz.answered;
      body = `
        <div class="card quiz">
          <div class="quiz-top">
            <span>${T(UI.question)} ${quiz.n + 1} / ${total}</span>
            <span>${T(UI.quizScore)}: ${quiz.score}</span>
          </div>
          <div class="progress"><div style="width:${(quiz.n / total) * 100}%"></div></div>
          <p class="muted">${T(UI.quizIntro)}</p>
          <p class="q">“${T(q.item)}”</p>
          <div class="options">
            ${q.options.map((o) => {
              let cls = "";
              if (a) cls = o.key === q.key ? "right" : o.key === a ? "wrong" : "dim";
              return `<button type="button" class="opt ${cls}" data-key="${o.key}"${a ? " disabled" : ""}>${o.icon} ${T(o.label)}</button>`;
            }).join("")}
          </div>
          ${a ? `
            <p class="feedback ${a === q.key ? "ok" : "no"}">
              ${a === q.key ? T(UI.quizRight) : `${T(UI.quizWrong)} ${T(q.label)}`}
            </p>
            <button class="btn" type="button" id="nextQ">${T(UI.quizNext)} →</button>` : ""}
        </div>`;
    }
    return `
      <section class="hero">
        <div class="petals" aria-hidden="true">${petals()}</div>
        <div class="wrap">
          <p class="eyebrow">Sigālovāda Sutta</p>
          <h1>${T(UI.quiz)}</h1>
        </div>
      </section>
      <section class="wrap narrow">${body}</section>`;
  }

  // ---------- Render ----------
  let rendered = false;

  function render() {
    if (rendered) document.body.classList.add("settled");
    rendered = true;
    document.documentElement.lang = lang;
    document.getElementById("header").innerHTML = header();
    document.getElementById("footer").innerHTML = footer();
    const main = document.getElementById("main");
    if (page === "home") main.innerHTML = home();
    else if (page === "direction") main.innerHTML = direction();
    else if (page === "teachings") main.innerHTML = teachings();
    else if (page === "quiz") main.innerHTML = quizView();
    if (page !== "direction") {
      const base = t(UI.siteTitle);
      document.title = page === "home" ? base : `${t(UI[page])} | ${base}`;
    }

    if (page === "home") setupReveal();

    document.getElementById("langBtn").onclick = () => setLang(lang === "si" ? "en" : "si");

    if (page === "quiz") {
      main.querySelectorAll(".opt").forEach((b) =>
        (b.onclick = () => {
          quiz.answered = b.dataset.key;
          if (quiz.answered === quiz.qs[quiz.n].key) quiz.score++;
          render();
        })
      );
      const nx = document.getElementById("nextQ");
      if (nx) nx.onclick = () => { quiz.n++; quiz.answered = null; render(); };
      const ag = document.getElementById("again");
      if (ag) ag.onclick = () => { newQuiz(); render(); };
    }
  }

  render();
})();
