# Memory Card

# 주요 기능 및 디자인

- CSS를 사용하여 플립 카드 만들기
- 양식을 사용하여 "새 카드 추가" 오버레이 작성
- Question 카드 플립하여 Answer 카드를 표시합니다.
- 이전 / 다음 카드 보기
- 로컬 저장소에 새 카드 추가
- 로컬 저장소에서 모든 카드 지우기

# 기술

- 로컬스토리지에 추가 / 가져오기 / 개별삭제 / 전체삭제

    ```jsx
    localStorage.setItem('myCat', 'Tom'); // 추가
      const cat = localStorage.getItem('myCat'); // 가져오기
      localStorage.removeItem('myCat'); // 제거
      localStorage.clear(); // 전체 제거
    ```

- 로컬스토리지에 array 형태로 추가
  - **`JSON.stringify()`** 메서드는 JS값이나 객체를 JSON 문자열로 변환
    - undefined 값을 가지는 속성은 포함시키지 않음
    - syntex : `JSON.stringify(value[, replacer[, space]])`
    - `replacer`를 함수로 전달할 경우 변환 전 값을 변형할 수 있고
    - 배열로 전달할 경우 지정한 속성만 결과에 포함한다.

        ```jsx
        const data = {'a' : 1,'b' : 2,'c' : 3}; 
        
        JSON.stringify(data) // data 그대로 변환;
        JSON.stringify(data, ['a', 'c']) // b를 제외하고 변환
        ```

  - **`JSON.parse()`** 메서드는 JSON 문자열의 구문을 분석하고 JS 값이나 객체를 생성
    - `reviver` 함수를 인수로 전달할 경우, 결과를 반환하기 전에 변형할 수 있습니다.
