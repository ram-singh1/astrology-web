(() => {
  "use strict";
  const { $, $$ } = window.AV;

  const YT_CONFIG = {
    channelId: "UCAhSM44HoLZQrjGFttqvI5A",   // the "UC…" id, NOT the @handle
    apiKey: "",                               // add a YouTube Data API v3 key to use the API path
    handleUrl: "https://www.youtube.com/@KRSchannel",
    max: 6,
    timeoutMs: 6500,
  };

  const FALLBACK = [
    { id: "XAT_wdR6EDI", title: "Navamsa: the trade-off between material and spiritual life", tag: "Chart craft" },
    { id: "rFv-_R3E1tk", title: "Your spouse's planets on your horoscope", tag: "Relationships" },
    { id: "jGYAAa8OXtM", title: "Saturn Retrograde in Pisces 2026 — all 12 ascendants", tag: "Transits" },
    { id: "z0C3r611L3s", title: "The Mars and ‘aliens’ connection, explained", tag: "Deep dive" },
    { id: "WKOezOkfpG8", title: "Luck and prosperity after marriage", tag: "Timing" },
    { id: "dtWBMrq3tuI", title: "Working through a ‘stuck’ Venus", tag: "Remedies" },
  ];

  const grid   = $("[data-yt-grid]");
  const status = $("[data-yt-status]");
  if (!grid) return;

  const link = $("[data-yt-link]");
  if (link && YT_CONFIG.handleUrl) link.href = YT_CONFIG.handleUrl;

  const esc = (s = "") => s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const withTimeout = (p, ms) =>
    Promise.race([p, new Promise((_, r) => setTimeout(() => r(new Error("timeout")), ms))]);

  const RELATIVE = [
    [365, "year"], [30, "month"], [7, "week"], [1, "day"],
  ];
  const since = (iso) => {
    const then = Date.parse(iso);
    if (!then) return "Watch now";
    const days = Math.floor((Date.now() - then) / 86400000);
    if (days < 1) return "Today";
    for (const [span, unit] of RELATIVE) {
      if (days >= span) {
        const n = Math.floor(days / span);
        return `${n} ${unit}${n > 1 ? "s" : ""} ago`;
      }
    }
    return "Today";
  };

  const card = (v) => {
    return `
      <a class="dispatch surface" href="https://www.youtube.com/watch?v=${esc(v.id)}"
         target="_blank" rel="noopener" data-embed="${esc(v.id)}"
         aria-label="Play: ${esc(v.title)}">
        <span class="dispatch__thumb">
          <img loading="lazy" decoding="async"
               src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt="" />
        </span>
        <span class="dispatch__body">
          <span class="dispatch__title">${esc(v.title)}</span>
          <span class="dispatch__meta tag">${esc(v.tag || "Watch now")}</span>
        </span>
      </a>`;
  };

  const playInline = (link) => {
    const id = link.dataset.embed;
    const thumb = link.querySelector(".dispatch__thumb");
    if (!id || !thumb || link.dataset.playing) return;
    link.dataset.playing = "1";
    link.classList.add("is-playing");
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    frame.title = link.getAttribute("aria-label") || "YouTube video player";
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    frame.setAttribute("allowfullscreen", "");
    frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    thumb.replaceChildren(frame);
  };

  const paint = (videos, note) => {
    grid.innerHTML = videos.map(card).join("");
    if (status) {
      status.textContent = note || "";
      status.hidden = !note;
    }
  };

  grid.addEventListener("click", (e) => {
    const link = e.target.closest(".dispatch[data-embed]");
    if (!link) return;
    e.preventDefault();
    playInline(link);
  });

  async function viaApi() {
    const u = new URL("https://www.googleapis.com/youtube/v3/search");
    u.search = new URLSearchParams({
      key: YT_CONFIG.apiKey, channelId: YT_CONFIG.channelId,
      part: "snippet", order: "date", maxResults: String(YT_CONFIG.max), type: "video",
    }).toString();
    const r = await withTimeout(fetch(u), YT_CONFIG.timeoutMs);
    if (!r.ok) throw new Error("api " + r.status);
    const data = await r.json();
    const items = (data.items || [])
      .filter((it) => it.id && it.id.videoId)
      .map((it) => ({ id: it.id.videoId, title: it.snippet.title, tag: since(it.snippet.publishedAt) }));
    if (!items.length) throw new Error("api empty");
    return items;
  }

  async function viaRss() {
    const feed = `https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CONFIG.channelId}`;
    const proxy = "https://api.allorigins.win/raw?url=" + encodeURIComponent(feed);
    const r = await withTimeout(fetch(proxy), YT_CONFIG.timeoutMs);
    if (!r.ok) throw new Error("rss " + r.status);
    const xml = new DOMParser().parseFromString(await r.text(), "text/xml");
    if (xml.querySelector("parsererror")) throw new Error("rss parse");
    const entries = Array.from(xml.getElementsByTagName("entry")).slice(0, YT_CONFIG.max);
    if (!entries.length) throw new Error("rss empty");
    return entries.map((e) => ({
      id: (e.getElementsByTagName("yt:videoId")[0] || e.getElementsByTagName("videoId")[0])?.textContent,
      title: e.getElementsByTagName("title")[0]?.textContent || "Untitled",
      tag: since(e.getElementsByTagName("published")[0]?.textContent),
    })).filter((v) => v.id);
  }

  (async () => {
    try {
      if (!/^UC[\w-]{20,}$/.test(YT_CONFIG.channelId)) throw new Error("no channel configured");
      const videos = YT_CONFIG.apiKey ? await viaApi() : await viaRss();
      paint(videos, "");
    } catch (err) {
      console.info("[youtube] live feed unavailable, showing curated set:", err.message);
      paint(FALLBACK, "Showing a hand-picked selection — the live feed populates here once connected.");
    }
  })();
})();
