let inputFile = document.querySelector('input[type="file"]');
let uploadBox = document.querySelector(".upload-box");

// 박스 안에 Drag 들어왔을 때
uploadBox.addEventListener("dragenter", function (e) {
  console.log("drag enter");
});

// 박스 안에 Drag 하고 있을 때
uploadBox.addEventListener("dragover", function (e) {
  e.preventDefault();

  let valid = e.dataTransfer.types.indexOf("Files") >= 0;

  if (!valid) {
    this.style.backgroundColor = "red";
  } else {
    this.style.backgroundColor = "green";
  }

  console.log("drag over");
});

// 박스 밖으로 Drag 나갈 때
uploadBox.addEventListener("dragleave", function (e) {
  console.log("drag leave");
  this.style.backgroundColor = "white";
});

// 박스 안으로 Drag drop 했을 때
uploadBox.addEventListener("drop", function (e) {
  e.preventDefault();
  console.log("drag drop");
  this.style.backgroundColor = "white";

  console.dir(e.dataTransfer);

  let data = e.dataTransfer.files[0];
  console.dir(data);
});
