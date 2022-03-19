const KAKAOAK_API_KEY = config.apikey;

function dragText() {
  console.log("mouse move"); // 로그

  let text;

  if(window.getSelection) {
    text = window.getSelection().toString();
  }
  else if (document.selection) {
    text = document.selection.createRange().text;
  }
  return text;
}

document.onmouseup = function() {
  if(dragText()) {
    translateEnToJp(dragText()).then(()=>translateEnToKr(dragText()))
  }
}

const jpTransKr = document.querySelector(".jpTransKr");
const enTransKr = document.querySelector(".enTransKr");

async function translateEnToJp(text) {
  let response = await fetch(`https://dapi.kakao.com/v2/translation/translate?src_lang=en&target_lang=jp&query=${text}`, {
    method: 'POST',
    contentType: "application/x-www-form-urlencoded",
    headers: {
      "Authorization": `KakaoAK ${KAKAOAK_API_KEY}`
    },
  });

  let result = await response.json();
  console.log('영->일 : ', result.translated_text[0][0]);
  await translateJpToKr(result.translated_text[0][0]);
}

async function translateJpToKr(text) {
  let response = await fetch(`https://dapi.kakao.com/v2/translation/translate?src_lang=jp&target_lang=kr&query=${text}`, {
    method: 'POST',
    contentType: "application/x-www-form-urlencoded",
    headers: {
      "Authorization": `KakaoAK ${KAKAOAK_API_KEY}`
    },
  });

  let result = await response.json();
  console.log('일->한 : ', result.translated_text[0][0]);
  jpTransKr.textContent = result.translated_text[0][0];
  console.log(result.translated_text[0][0]);
}

async function translateEnToKr(text) {
  let response = await fetch(`https://dapi.kakao.com/v2/translation/translate?src_lang=en&target_lang=kr&query=${text}`, {
    method: 'POST',
    contentType: "application/x-www-form-urlencoded",
    headers: {
      "Authorization": `KakaoAK ${KAKAOAK_API_KEY}`
    },
  });

  let result = await response.json();
  console.log('영->한 : ', result.translated_text[0][0]);
  enTransKr.textContent = result.translated_text[0][0];
}
