# 프로젝트 개요

이 프로젝트는 국가 지원 사업 정보를 웹 페이지에 표시합니다. 현대적인 웹 표준과 웹 컴포넌트를 활용하여 재사용 가능하고 관리하기 쉬운 UI를 구현합니다.

## 스타일, 디자인 및 기능

*   **반응형 디자인:** 다양한 화면 크기에 맞춰 레이아웃이 조정됩니다.
*   **카드형 UI:** 각 지원 사업 정보는 개별 카드 형태로 표시되어 시각적으로 구분됩니다.
*   **웹 컴포넌트 (`PolicyCard`):** `main.js`에 정의된 `PolicyCard`라는 커스텀 엘리먼트를 사용하여 지원 사업 카드를 생성합니다. 이는 재사용 가능하고 독립적인 UI 요소를 제공합니다.
    *   **상세 정보 확장 기능:** 각 카드에 `<details>` 태그를 활용한 "상세 정보 보기" 섹션을 추가하여, 사용자가 필요에 따라 더 많은 정보를 확인하고 숨길 수 있도록 했습니다.
*   **CSS 변수:** `:root`에 정의된 CSS 변수를 사용하여 색상, 그림자 등의 스타일을 중앙에서 관리하고 쉽게 변경할 수 있습니다.
*   **동적 데이터 로딩 및 분류:** `main.js`에 정의된 `policyData` 배열에서 데이터를 가져와 웹 컴포넌트를 생성하고, 각 정책의 `category` 속성에 따라 `index.html`의 해당 `.card-container`에 동적으로 추가합니다.

## 현재 변경 요청에 대한 계획 및 단계

**요청:**
1.  `main.js`의 `createHeadingAndParagraph` 및 `createHeadingAndList` 함수로 데이터가 제대로 불러와 지는지 확인 요청.
2.  디버깅을 위해 콘솔 로그 추가 요청.

**설명:**
사용자님의 요청에 따라, `PolicyCard` 웹 컴포넌트 내에서 데이터가 올바르게 처리되고 있는지 확인하기 위해 `main.js` 파일에 `console.log` 디버깅 코드를 추가했습니다.

**변경 내용:**
*   `main.js` 파일의 `PolicyCard` 웹 컴포넌트 `constructor` 내부에 다음과 같은 `console.log` 문을 추가했습니다:
    *   `details` 속성의 원본 값 (`this.getAttribute('details')`)
    *   `JSON.parse`를 거쳐 파싱된 `detailsData` 객체
    *   `detailsData` 내의 `overview`, `budget_scale`, `support_content`, `process`, `how_to_apply`, `inquiry` 등 주요 필드의 값

**확인 지침:**
*   브라우저에서 웹 페이지를 연 후, **개발자 도구(F12 또는 Ctrl+Shift+I)**를 열고 **Console (콘솔)** 탭을 확인해 주세요.
*   `[PolicyCard]`라는 태그와 함께 출력되는 로그들을 확인하여, `details` 속성이 올바른 JSON 문자열로 전달되고 `detailsData`가 제대로 파싱되어 각 필드의 값들이 예상대로 출력되는지 확인해 주세요.
*   특히, `detailsData`가 `null`이 아닌지, 그리고 `overview`, `budget_scale`, `support_content`, `process`, `how_to_apply`, `inquiry` 필드들이 비어있지 않고 올바른 데이터를 포함하고 있는지 확인해 주세요.

이 로그들을 통해 데이터 처리 과정에 문제가 있는지 정확히 파악할 수 있습니다. 확인 후 콘솔 출력 결과를 알려주시면, 다음 단계를 진행하겠습니다.