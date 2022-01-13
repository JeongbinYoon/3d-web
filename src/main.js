let inputFile = document.querySelector('input[type="file"]');
let uploadBox = document.querySelector(".upload-box");

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

  let data = e.dataTransfer;
  console.dir(data.files[0]);

  isValid(data);
});

function isValid(data) {
  // 파일인지 유효성 검사
  if (data.types.indexOf("Files") < 0) return false;

  // fbx파일인지 유효성 검사
  const fileName = data.files[0].name;
  const lastDot = data.files[0].name.lastIndexOf(".");
  const fileExtention = fileName.substring(lastDot + 1, fileName.length);

  if (fileExtention !== "fbx") {
    alert("fbx 파일만 업로드 가능합니다.");
    return false;
  }

  // 파일 개수는 1개씩만 가능하도록 유효성 검사
  if (data.files.length > 1) {
    alert("파일은 하나씩 전송이 가능합니다.");
    return false;
  }

  // 파일의 사이즈는 20MB 미만
  if (data.files[0].size >= 1024 * 1024 * 20) {
    alert("20MB 이상 파일은 업로드할 수 없습니다.");
    return false;
  }
}
