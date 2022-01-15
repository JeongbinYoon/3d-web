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

  // 유효성 Check
  if (!isValid(data)) return;

  const formData = new FormData();
  formData.append("uploadFile", data.files[0]);

  ajax({
    url: "mypage/upload",
    method: "POST",
    data: formData,
    progrss: () => {},
    loadend: () => {},
  });
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

//참고 ajax 커스텀 모듈
function ajax(obj) {
  const xhr = new XMLHttpRequest();

  var method = obj.method || "GET";
  var url = obj.url || "";
  var data = obj.data || null;

  /* 성공/에러 */
  xhr.addEventListener("load", function () {
    const data = xhr.responseText;

    if (obj.load) obj.load(data);
  });

  /* 성공 */
  xhr.addEventListener("loadend", function () {
    const data = xhr.responseText;

    //console.log(data);

    if (obj.loadend) obj.loadend(data);
  });

  /* 실패 */
  xhr.addEventListener("error", function () {
    console.log("Ajax 중 에러 발생 : " + xhr.status + " / " + xhr.statusText);

    if (obj.error) {
      obj.error(xhr, xhr.status, xhr.statusText);
    }
  });

  /* 중단 */
  xhr.addEventListener("abort", function () {
    if (obj.abort) {
      obj.abort(xhr);
    }
  });

  /* 진행 */
  xhr.upload.addEventListener("progress", function () {
    if (obj.progress) {
      obj.progress(xhr);
    }
  });

  /* 요청 시작 */
  xhr.addEventListener("loadstart", function () {
    if (obj.loadstart) obj.loadstart(xhr);
  });

  if (obj.async === false) xhr.open(method, url, obj.async);
  else xhr.open(method, url, true);

  if (obj.contentType) xhr.setRequestHeader("Content-Type", obj.contentType);

  xhr.send(data);
}
