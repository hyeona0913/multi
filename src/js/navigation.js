document.addEventListener("DOMContentLoaded", function () {
  const tablist = document.querySelector('.tabs [role="tablist"]');
  if (!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

  function activateTab(tab, setFocus = true) {
    tabs.forEach((t, i) => {
      const selected = t === tab;
      t.setAttribute("aria-selected", selected);
      t.tabIndex = selected ? 0 : -1;
      if (selected && setFocus) t.focus();
      if (panels[i]) {
        panels[i].classList.toggle("is-hidden", !selected);
      }
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      activateTab(tab, false);
    });
    tab.addEventListener("keydown", (e) => {
      let idx = tabs.indexOf(tab);
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIdx = (idx + 1) % tabs.length;
        activateTab(tabs[nextIdx]);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIdx = (idx - 1 + tabs.length) % tabs.length;
        activateTab(tabs[prevIdx]);
      }
    });
    tab.addEventListener("focus", () => {
      activateTab(tab, false);
    });
  });
});
