$(document).ready(() => {
  initializeWebsocket();
  getAllEoloplants();
  setTimeout(() => disableIfEoloplantBeingCreated(), 300);

  $("#form-new-eoloplant").submit((event) => {
    event.preventDefault();
    var city = $("#city").val();

    $.ajax({
      url: "/api/eoloplants",
      type: "POST",
      data: JSON.stringify({ city }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (data) => {
        disableSubmitForm();
        getAllEoloplants();
        sessionStorage.setItem("idEoloplantProgress", data.id);
        $("p.error-create-eoloplant").text("");
        $("#city").val("");
      },
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
        `<div eoloplant-id="${eoloplant.id}" class="eoloplant card card-body bg-light">
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

const initializeWebsocket = () => {
  let socket = new WebSocket("ws://localhost:3000");

  socket.onopen = (e) => {
    console.log("[open] Connection established");
  };

  socket.onmessage = (event) => {
    const parsedData = JSON.parse(event.data);
    if (parsedData.type === "eoloplant-completed") {
      getAllEoloplants();
      if (sessionStorage.getItem("idEoloplantProgress") == parsedData.info.id) {
        enableSubmitForm();
      }
    } else {
      updateEoloplantInfo(parsedData);
    }
  };

  socket.onclose = (event) => {
    if (event.wasClean) {
      console.log(
        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
      );
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log("[close] Connection died");
    }
  };

  socket.onerror = (error) => {
    console.log(`[error] ${error.message}`);
  };
};

const updateEoloplantInfo = (data) => {
  const { id, progress } = data.info;

  const progressBar = $(
    "div[eoloplant-id=" + id + "] > .eoloplant__progress > .progress-bar"
  );

  progressBar.attr("style", `width: ${progress}%;`);
  progressBar.attr("aria-valuenow", progress);
  progressBar.text(progress + "%");
};

const disableSubmitForm = () => {
  $("#btn-add-eoloplant").attr("disabled", "disabled");
  $("input#city").attr("disabled", "disabled");
};

const enableSubmitForm = () => {
  $("#btn-add-eoloplant").removeAttr("disabled");
  $("input#city").removeAttr("disabled");
};

const disableIfEoloplantBeingCreated = () => {
  const lastEoloplantIdentifier =
    sessionStorage.getItem("idEoloplantProgress") || -1;

  const eoloplantProgress = $(
    "div[eoloplant-id=" +
      lastEoloplantIdentifier +
      "] > .eoloplant__progress > .progress-bar"
  ).attr("aria-valuenow");

  if (eoloplantProgress < 100) {
    disableSubmitForm();
  }
};
