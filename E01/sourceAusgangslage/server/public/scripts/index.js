(function($) {
  var orderDesc = true;
  function getAktienKurseFromServer(numberOfMonths = 3, callback) {
    // Kontakiert Server API
    $.get("/api/aktienkurse", { monate: numberOfMonths }, callback, "json");
  }

  function compare(a, b) {
    // Vergleich der Kurse für Array.sort
    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    } else {
      return 0;
    }
  }

  $(function() {
    var container = $("#container");
    var monthsDropDown = $("#number-select");
    var createHtmlFromDataFn = Handlebars.compile($("#table-template").html());

    function renderData (data) {
      data.aktienkurse.sort((a, b) => orderDesc ? compare(a.firma, b.firma) : compare(b.firma, a.firma));
      container.html(createHtmlFromDataFn(data));
    }

    function getDataAndRenderTable(){
      getAktienKurseFromServer(monthsDropDown.val(), renderData);
    }

    monthsDropDown.on("change", getDataAndRenderTable);
    container.on("click", ".title-header", function() {
      orderDesc = !orderDesc;
      getDataAndRenderTable();
    });

    getDataAndRenderTable();
  });
})(jQuery);
