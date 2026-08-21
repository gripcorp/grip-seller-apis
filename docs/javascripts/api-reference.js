/* API 레퍼런스 페이지 후처리.
   markdown 원본은 GitHub 뷰 호환을 위해 순수 문법(h2 + **`METHOD /path`**)을
   유지하고, 사이트에서만 이 스크립트가 메서드 배지와 오퍼레이션 카드를 구성한다.

   변환 대상 패턴:
     <h2>API명</h2>
     <p><strong><code>METHOD /path</code></strong></p>
   →
     <section class="api-operation">
       <h2>API명</h2>
       <p class="api-endpoint"><span class="api-method">METHOD</span><code>/path</code></p>
       ...(다음 h2/hr 전까지의 본문)...
     </section> */
(function () {
    var ENDPOINT_RE = /^(GET|POST|PUT|PATCH|DELETE)?\s*(\/\S+)$/;

    /* 스키마 registry: '스키마' 섹션의 <a id="..."></a> + <details> 쌍을 수집한다 */
    function collectModels(article) {
        var models = {};
        article.querySelectorAll("a[id]").forEach(function (anchor) {
            // 원본 '<a id></a>' 라인은 <p>로 감싸여 렌더되므로 <p>의 다음 형제에서 찾는다
            var host = anchor.parentElement.tagName === "P" ? anchor.parentElement : anchor;
            var details = host.nextElementSibling;
            if (details && details.tagName === "DETAILS") {
                models[anchor.id] = details;
            }
        });
        return models;
    }

    /* 카드가 참조하는 스키마 id를 (스키마 간 참조 포함) 닫힘 집합으로 수집한다 */
    function collectRefs(root, models) {
        var found = [];
        var seen = {};
        var queue = [root];
        while (queue.length) {
            var scope = queue.shift();
            scope.querySelectorAll('a[href^="#"]').forEach(function (link) {
                var id = link.getAttribute("href").slice(1);
                if (models[id] && !seen[id]) {
                    seen[id] = true;
                    found.push(id);
                    queue.push(models[id]);
                }
            });
        }
        return found;
    }

    /* 카드 하단에 참조 스키마의 접힌 복제본을 붙이고, 카드 내부의 스키마 링크가
       문서 하단 '스키마' 섹션 대신 카드 안의 복제본을 가리키도록 재지정한다.
       (markdown 원본은 단일 정의 유지 — 화면 이동 없이 카드 안에서 펼쳐 본다) */
    function inlineModels(card, cardIndex, models) {
        var refs = collectRefs(card, models);
        if (!refs.length) {
            return;
        }

        var box = document.createElement("div");
        box.className = "api-models";
        var title = document.createElement("p");
        title.className = "api-models__title";
        title.textContent = "참조 스키마";
        box.appendChild(title);

        var cloneIds = {};
        refs.forEach(function (id) {
            var clone = models[id].cloneNode(true);
            clone.id = "ref-" + cardIndex + "-" + id;
            clone.open = false;
            cloneIds[id] = clone.id;
            box.appendChild(clone);
        });
        card.appendChild(box);

        card.querySelectorAll('a[href^="#"]').forEach(function (link) {
            var id = link.getAttribute("href").slice(1);
            if (cloneIds[id]) {
                link.setAttribute("href", "#" + cloneIds[id]);
                link.addEventListener("click", function () {
                    document.getElementById(cloneIds[id]).open = true;
                });
            }
        });
    }

    function decorate() {
        var article = document.querySelector("article.md-content__inner");
        if (!article) {
            return;
        }
        var models = collectModels(article);

        var headings = Array.prototype.slice.call(article.querySelectorAll("h2"));
        headings.forEach(function (h2, cardIndex) {
            var p = h2.nextElementSibling;
            if (!p || p.tagName !== "P" || p.children.length !== 1) {
                return;
            }
            var strong = p.firstElementChild;
            if (strong.tagName !== "STRONG" || !strong.firstElementChild
                    || strong.firstElementChild.tagName !== "CODE") {
                return;
            }
            var match = strong.firstElementChild.textContent.trim().match(ENDPOINT_RE);
            if (!match) {
                return;
            }

            // 엔드포인트 바 구성 (메서드 표기가 없는 경로는 배지 생략)
            var bar = document.createElement("p");
            bar.className = "api-endpoint";
            if (match[1]) {
                var badge = document.createElement("span");
                badge.className = "api-method api-method--" + match[1].toLowerCase();
                badge.textContent = match[1];
                bar.appendChild(badge);
            }
            var path = document.createElement("code");
            path.textContent = match[2];
            bar.appendChild(path);
            p.replaceWith(bar);

            // h2부터 다음 h2/hr 전까지를 카드로 감싼다
            var nodes = [h2];
            var node = h2.nextElementSibling;
            while (node && node.tagName !== "H2" && node.tagName !== "HR") {
                nodes.push(node);
                node = node.nextElementSibling;
            }
            var section = document.createElement("section");
            section.className = "api-operation";
            h2.before(section);
            nodes.forEach(function (n) {
                section.appendChild(n);
            });

            inlineModels(section, cardIndex, models);
        });
    }

    // Material의 instant navigation 사용 여부와 무관하게 동작하도록 분기
    if (typeof document$ !== "undefined") {
        document$.subscribe(decorate);
    } else {
        document.addEventListener("DOMContentLoaded", decorate);
    }
})();
