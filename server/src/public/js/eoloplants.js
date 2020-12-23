$(document).ready(() => {
    getAllEoloplants();

  $("#form-new-eoloplant").submit((event) => {
    event.preventDefault();
    var city = $("#city").val();

    $.ajax({
      url: "/api/eoloplants",
      type: "POST",
      data: JSON.stringify({ city }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: () => {
        getAllEoloplants();
        $("p.error-create-eoloplant").text("");
        $("#city").val("");
      }
    }).fail((error) => {
        $("p.error-create-eoloplant").text(error.responseJSON.message);
    });
  });
});

const getAllEoloplants = () => {
    $.get("/api/eoloplants", (data) => {
      $("#eoloplants-container").html("");
      data.eoloplants.forEach((eoloplant) => {
        $("#eoloplants-container").append(
          `<div class="eoloplant card card-body bg-light">
                  <div class="eoloplant__city">${eoloplant.city}</div>
                  <div class="eoloplant__progress progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width: ${eoloplant.progress}%"
                      aria-valuenow="${eoloplant.progress}"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      ${eoloplant.progress}%
                    </div>
                  </div>
                </div>`
        );
      });
    });
  };
