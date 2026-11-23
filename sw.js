/* Service worker do Mansões Lunares: abre offline e mostra a notificação da mansão atual. */
importScripts("mansoes.js");

var CACHE = "mansoes-app-v1";
var KEEP = [CACHE, "mansoes-state"];
var SHELL = ["./", "index.html", "mansoes.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "badge-72.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.filter(function (k) { return KEEP.indexOf(k) < 0; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.clients.claim(); })
  );
});

// rede primeiro, cópia guardada quando estiver sem internet
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (r) { return r || caches.match("index.html"); });
    })
  );
});

self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
      for (var i = 0; i < list.length; i++) { if ("focus" in list[i]) return list[i].focus(); }
      return self.clients.openWindow("./");
    })
  );
});

// Quando o Chrome acordar o app em segundo plano (não tem horário exato), confere se a mansão mudou.
function checkAndShow() {
  return stateGet("notify").then(function (on) {
    if (on !== "1" || typeof Notification === "undefined" || Notification.permission !== "granted") return;
    var n = buildNote(Date.now());
    return stateGet("lastidx").then(function (last) {
      if (last === String(n.idx)) return;
      return stateSet("lastidx", n.idx).then(function () { return self.registration.showNotification(n.title, n.opts); });
    });
  });
}
self.addEventListener("periodicsync", function (e) {
  if (e.tag === "mansao-check") e.waitUntil(checkAndShow());
});
