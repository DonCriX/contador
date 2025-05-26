document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector("table tbody");
  const historyListPlayer1 = document.getElementById("historyListPlayer1");
  const historyListPlayer2 = document.getElementById("historyListPlayer2");
  const player1Header = document.querySelector("#player1History h2");
  const player2Header = document.querySelector("#player2History h2");
  const nameCells = document.querySelectorAll("thead th[contenteditable]");

    function updateHistory(namePlayer1, namePlayer2, totalPlayer1, totalPlayer2) {
  const entry1 = document.createElement("li");
  entry1.textContent = `${namePlayer1} acaba de acumular un total de: ${totalPlayer1} puntos.`;
  historyListPlayer1.appendChild(entry1);

  const entry2 = document.createElement("li");
  entry2.textContent = `${namePlayer2} acaba de acumular un total de: ${totalPlayer2} puntos.`;
  historyListPlayer2.appendChild(entry2);
 }
  function updatePlayerNames() {
    const namePlayer1 = table.previousElementSibling
      .querySelector("th:nth-child(2)")
      .textContent.trim();
    const namePlayer2 = table.previousElementSibling
      .querySelector("th:nth-child(3)")
      .textContent.trim();

    player1Header.textContent = `Historial de ${namePlayer1}`;
    player2Header.textContent = `Historial de ${namePlayer2}`;
  }

  nameCells.forEach((cell) => {
    cell.addEventListener("focus", function () {
      cell.textContent = "";
    });
  });

  document.querySelector("table thead").addEventListener("input", function () {
    updatePlayerNames();
  });

  // calculador de total //
  function calculateScores() {
    let totalPlayer1 = 0;
    let totalPlayer2 = 0;

    const specificRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    specificRows.forEach((index) => {
      const row = table.rows[index];
      if (row && row.cells[1].textContent) {
        totalPlayer1 += parseInt(row.cells[1].textContent, 10) || 0;
      }
      if (row && row.cells[2].textContent) {
        totalPlayer2 += parseInt(row.cells[2].textContent, 10) || 0;
      }
    });

    const totalRow = document.createElement("tr");
    const totalData = ["Total", totalPlayer1, totalPlayer2].map((data) => {
      let cell = document.createElement("td");
      cell.textContent = data;
      return cell;
    });

    if (table.lastElementChild.textContent.includes("Total")) {
      table.lastElementChild.remove();
    }
    totalRow.append(...totalData);
    table.appendChild(totalRow);

    /// Estilo para total ///
    if (totalPlayer1 < totalPlayer2) {
      totalRow.cells[1].style.color = "green";
    } else if (totalPlayer2 < totalPlayer1) {
      totalRow.cells[2].style.color = "green";
    } else {
      totalRow.cells[1].style.color = totalRow.cells[2].style.color = "";
    }

    if (totalPlayer1 > totalPlayer2) {
      totalRow.cells[1].style.color = "red";
    } else if (totalPlayer2 > totalPlayer1) {
      totalRow.cells[2].style.color = "red";
    } else {
      totalRow.cells[1].style.color = totalRow.cells[2].style.color = "purple";
    }
  }
    


 table.addEventListener("input", function (e) {
   const target = e.target;
   if (target.matches("td")) {
     target.textContent = target.textContent.replace(/\D/g, "");
     calculateScores();
    } 
    });

  
  // Reiniciar contadores //
  document.getElementById("resetButton").addEventListener("click", function () {
    const namePlayer1 = document
      .querySelector("table thead tr th:nth-child(2)")
      .textContent.trim();
    const namePlayer2 = document
      .querySelector("table thead tr th:nth-child(3)")
      .textContent.trim();
    const lastTotalPlayer1 =
      parseInt(table.lastElementChild.cells[1].textContent, 10) || 0;
    const lastTotalPlayer2 =
      parseInt(table.lastElementChild.cells[2].textContent, 10) || 0;
    updateHistory(namePlayer1, namePlayer2, lastTotalPlayer1, lastTotalPlayer2);

    Array.from(table.rows).forEach((row) => {
      row.cells[1].textContent = "";
      row.cells[2].textContent = "";
    });
    calculateScores();
  });
  // borrador de Historian //
  document
    .getElementById("clearHistoryButton")
    .addEventListener("click", function () {
      historyListPlayer1.innerHTML = "";
      historyListPlayer2.innerHTML = "";
    });

  calculateScores();
});
