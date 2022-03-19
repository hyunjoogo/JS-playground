function dragText() {
  console.log("mouse move"); // 로그

  let text;

  if (window.getSelection) {
    text = window.getSelection().toString();
    console.log(text);
  } else if (document.selection) {
    text = document.selection.createRange().text;
  }
  return text;
}


document.onmouseup = function () {
  if (dragText()) {
    alert(dragText());
    console.log("working");
  }
};


const api_url = 'https://openapi.naver.com/v1/papago/n2mt/source=ko&target=en&text=만나서 반갑습니다.';
const query = "hello";
const options = {
  url: api_url,
  form: {'source': 'en', 'target': 'ko', 'text': query},
  headers: {'X-Naver-Client-Id': 'fsCF8rfE2DE1GluW1ouU', 'X-Naver-Client-Secret': 'SH1IllPAGT'}
};

let response = fetch(api_url, {
  method: 'POST',
  headers: {

Accept: "*/*",
    'Content-Type': 'application/json;charset=utf-8',
    'X-Naver-Client-Id': 'fsCF8rfE2DE1GluW1ouU',
    'X-Naver-Client-Secret': 'SH1IllPAGT'
  }
});

console.log(response);
