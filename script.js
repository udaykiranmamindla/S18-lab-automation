const sheetId = "1ev9-Ay-tAxHAerWfGehOcSUEOq3YYv0CSUGIxur8_r4";
const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

$.ajax({
  type: "GET",
  url: sheetURL,
  dataType: "text",
  success: function (response) {
    var data = $.csv.toObjects(response);
    var Attendance = [];

    for (let i = data.length - 1; i > 1; i--) {
      if (data[i]["Attendance"].length == 12) {
        Attendance.push(i);
      }
    }

    const attendanceMapping = {
      "55005A1BF6E2": "MD Wasim",
      "3A00EBBEEB84": "P.Mahesh babu",
      "55002BEC188A": "R.Sandeep",
      "3A00ED0D18C2": "M.Udaykiran",
      "3A00ED7001A6": "M.Shivakumar",
      "3A00EB8B4218": "S.Yashwanth",
    };

    Attendance.slice(0, 9).forEach((index, i) => {
      const attendanceValue = data[index]["Attendance"];
      const nameElement = document.querySelector(`#name${i + 1}`);
      const desgElement = document.querySelector(`#Desig${i + 1}`);
      const timeElement = document.querySelector(`#Time${i + 1}`);

      if (nameElement) {
        nameElement.innerHTML = attendanceMapping[attendanceValue] || "Shivaraj";
      }
      if (desgElement) {
        desgElement.innerHTML = data[index]["Date "];
      }
      if (timeElement) {
        timeElement.innerHTML = data[index]["Time"];
      }
    });

    console.log(Attendance);
    console.log(data.length);
  },
});
