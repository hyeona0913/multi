document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const parent = btn.closest(".component-wrapper");
      if (!parent) return;
      // Clone the parent and remove the button
      const clone = parent.cloneNode(true);
      const btnInClone = clone.querySelector(".copy");
      if (btnInClone) btnInClone.remove();
      // Get the HTML (inner part only)
      const html = clone.innerHTML.trim();
      // Copy to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(html);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = html;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".copy").forEach(function (btn) {
    // 버튼 클릭 애니메이션을 위한 CSS 스타일 추가
    btn.style.transition = "transform 0.1s ease, box-shadow 0.1s ease";

    btn.addEventListener("click", function (e) {
      // 버튼 눌림 애니메이션 효과
      addClickAnimation(btn);

      const parent = btn.closest(".component-wrapper");
      if (!parent) return;

      // 부모 요소를 복제하고 버튼 제거
      const clone = parent.cloneNode(true);
      const btnInClone = clone.querySelector(".copy");
      if (btnInClone) btnInClone.remove();

      // HTML 내용 가져오기 (내부 요소만)
      const html = clone.innerHTML.trim();

      // 클립보드로 복사
      const copyToClipboard = () => {
        if (navigator.clipboard) {
          return navigator.clipboard.writeText(html);
        } else {
          // 구형 브라우저를 위한 대체 방법
          return new Promise((resolve) => {
            const textarea = document.createElement("textarea");
            textarea.value = html;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            resolve();
          });
        }
      };

      // 툴팁 표시
      copyToClipboard()
        .then(() => {
          showTooltip(btn, "Copied!");
        })
        .catch(() => {
          showTooltip(btn, "Copy failed!");
        });
    });
  });
});
