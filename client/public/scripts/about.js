(function () {
  "use strict";

  var TableFilter = (function () {
    var Arr = Array.prototype;
    var input;

    function onInputEvent(e) {
      input = e.target;
      var table1 = document.getElementsByClassName("work-experience");
      Arr.forEach.call(table1, function (table) {
        Arr.forEach.call(table.tBodies, function (tbody) {
          Arr.forEach.call(tbody.rows, filter);
        });
      });
    }

    function filter(row) {
      var text = row.textContent.toLowerCase();
      var val = input.value.toLowerCase();
      row.style.display = text.indexOf(val) === -1 ? "none" : "table-row";
    }

    return {
      init: function () {
        var inputs = document.getElementsByClassName("searchAbout");
        Arr.forEach.call(inputs, function (input) {
          input.oninput = onInputEvent;
        });
      },
    };
  })();

  TableFilter.init();
})();
