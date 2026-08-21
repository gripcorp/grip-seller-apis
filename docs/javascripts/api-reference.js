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

    function decorate() {
        var article = document.querySelector("article.md-content__inner");
        if (!article) {
            return;
        }

        var headings = Array.prototype.slice.call(article.querySelectorAll("h2"));
        headings.forEach(function (h2) {
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
        });
    }

    // Material의 instant navigation 사용 여부와 무관하게 동작하도록 분기
    if (typeof document$ !== "undefined") {
        document$.subscribe(decorate);
    } else {
        document.addEventListener("DOMContentLoaded", decorate);
    }
})();
