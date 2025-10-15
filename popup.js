const dataURL = "https://github.com/ADANTX123/daxueshenmai.git/main/data.json"; // ← 你需要放 JSON 文件的公网链接

let allData = {};

async function loadData() {
  try {
    const res = await fetch(dataURL);
    allData = await res.json();
  } catch (e) {
    document.getElementById("content").innerHTML = "<p>❌ 数据加载失败，请检查网络。</p>";
  }
}

function renderHome() {
  document.getElementById("content").innerHTML = `
    <button class="btn" data-type="subject">按学科评估</button>
    <button class="btn" data-type="province">按省份</button>
  `;
  document.querySelectorAll(".btn").forEach(btn =>
    btn.addEventListener("click", () => renderCategory(btn.dataset.type))
  );
}

function renderCategory(type) {
  const keys = Object.keys(allData[type]);
  document.getElementById("content").innerHTML =
    `<div class='back'>← 返回首页</div>` +
    keys.map(k => `<button class="btn" data-key="${k}" data-type="${type}">${k}</button>`).join("");
  document.querySelector(".back").onclick = renderHome;
  document.querySelectorAll(".btn").forEach(btn =>
    btn.addEventListener("click", () => renderSchools(type, btn.dataset.key))
  );
}

function renderSchools(type, key) {
  const schools = allData[type][key];
  document.getElementById("content").innerHTML =
    `<div class='back'>← 返回上一级</div>` +
    schools.map(s => `<a class="link" href="${s.url}" target="_blank">${s.name}</a>`).join("");
  document.querySelector(".back").onclick = () => renderCategory(type);
}

(async () => {
  await loadData();
  renderHome();
})();
