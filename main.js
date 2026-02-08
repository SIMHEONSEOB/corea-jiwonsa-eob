class PolicyCard extends HTMLElement {
    constructor() {
        super();
        // Attach shadow DOM immediately in the constructor
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const shadow = this.shadowRoot; // Access the shadow DOM created in the constructor

        // Create style element and add to shadow DOM
        const style = document.createElement('style');
        style.textContent = `
            .card {
                background-color: var(--card-background-color, #fff);
                border-radius: 10px;
                box-shadow: 0 4px 8px var(--shadow-color, rgba(0,0,0,0.1));
                padding: 20px;
                transition: transform 0.2s;
            }
            .card:hover {
                transform: translateY(-5px);
            }
            h3 {
                color: var(--primary-color, #3498db);
            }
            p {
                margin-bottom: 0.5rem;
            }
            strong {
                color: var(--secondary-color, #2ecc71);
            }
            details {
                margin-top: 1rem;
                border: 1px solid #eee;
                border-radius: 5px;
                padding: 0.5rem;
            }
            summary {
                font-weight: bold;
                cursor: pointer;
            }
            .details-content {
                padding-top: 0.5rem;
            }
            .details-content h4 {
                margin-top: 1rem;
                margin-bottom: 0.5rem;
                color: var(--primary-color);
            }
            .details-content ul {
                padding-left: 20px;
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
            }
            .details-content li {
                margin-bottom: 0.25rem;
            }
            .details-content a {
                color: var(--primary-color);
                text-decoration: none;
            }
            .details-content a:hover {
                text-decoration: underline;
            }
        `;
        shadow.appendChild(style);

        // Create main card div
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        // Access attributes here, as they are available in connectedCallback
        const title = this.getAttribute('title');
        const description = this.getAttribute('description');
        const target = this.getAttribute('target');
        const period = this.getAttribute('period');

        const h3 = document.createElement('h3');
        h3.textContent = title;
        cardDiv.appendChild(h3);

        const descriptionP = document.createElement('p');
        descriptionP.textContent = description;
        cardDiv.appendChild(descriptionP);

        const targetP = document.createElement('p');
        const targetStrong = document.createElement('strong');
        targetStrong.textContent = '지원 대상:';
        targetP.appendChild(targetStrong);
        targetP.appendChild(document.createTextNode(` ${target}`));
        cardDiv.appendChild(targetP);

        const periodP = document.createElement('p');
        const periodStrong = document.createElement('strong');
        periodStrong.textContent = '신청 기간:';
        periodP.appendChild(periodStrong);
        periodP.appendChild(document.createTextNode(` ${period}`));
        cardDiv.appendChild(periodP);

        // Add details section if data exists
        const detailsAttr = this.getAttribute('details');
        const detailsData = detailsAttr ? JSON.parse(detailsAttr) : null;

        if (detailsData) {
            const detailsElement = document.createElement('details');
            const summaryElement = document.createElement('summary');
            summaryElement.textContent = '상세 정보 보기';
            detailsElement.appendChild(summaryElement);

            const detailsContentDiv = document.createElement('div');
            detailsContentDiv.classList.add('details-content');

            // Dynamic rendering of detailsData
            for (const key in detailsData) {
                if (detailsData.hasOwnProperty(key)) {
                    const value = detailsData[key];

                    const h4 = document.createElement('h4');
                    h4.textContent = key; // Use the key as the heading
                    detailsContentDiv.appendChild(h4);

                    if (typeof value === 'string') {
                        const p = document.createElement('p');
                        p.textContent = value;
                        detailsContentDiv.appendChild(p);
                    } else if (Array.isArray(value)) {
                        const ul = document.createElement('ul');
                        value.forEach(item => {
                            const li = document.createElement('li');
                            li.textContent = item;
                            ul.appendChild(li);
                        });
                        detailsContentDiv.appendChild(ul);
                    }
                }
            }

            detailsElement.appendChild(detailsContentDiv);
            cardDiv.appendChild(detailsElement);
        }

        shadow.appendChild(cardDiv);
    }
}

customElements.define('policy-card', PolicyCard);

const policyData = [
    {
        title: "지역별 민생지원금 지급 현황 (2026년 초 기준)",
        description: "주요 지자체들은 설 명절(1~2월) 전후로 가계 경제 활성화를 위해 1인당 최소 20만 원에서 최대 60만 원까지 지급하고 있습니다.",
        target: "각 지자체 주민 (공고일 기준)",
        period: "2026년 초",
        category: "전국민 지원 사업",
        details: {
            "충청권": [
                "보은군: 60만 원 (1·2차 각 30만 원씩 분할 지급, 선불카드형)",
                "영동군: 50만 원 (모든 군민 대상, 1월 1일 기준 주소지)",
                "괴산군: 50만 원 (괴산사랑카드 충전 방식, 세대주 신청 원칙)",
                "단양군: 20만 원 (카드형 지역화폐로 지원)"
            ],
            "전라권": [
                "영광군: 100만 원 (연간 총액 기준 최다, 상·하반기 각 50만 원 지급)",
                "남원시: 20만 원 (모든 시민(결혼이민자 포함) 대상, 현장 즉시 지급)",
                "보성군: 30만 원 (지역화폐(보성사랑상품권)로 지급)",
                "정읍시: 30만 원 (기존 지원금 외 추가 지급, 요일제 신청 적용)",
                "순천시: 20만 원 (민생회복 소비쿠폰 성격으로 지급)"
            ],
            "경상권": [
                "군위군: 54만 원 (대구광역시 편입 후 독자적 파격 지원, 군위사랑상품권)",
                "의성군: 30만 원 (카드형 지역화폐 지원)",
                "울진군: 30~40만 원 (일반 30만 원, 취약계층은 최대 40만 원 차등 지원)"
            ]
        }
    },
    {
        title: "수도권 및 대도시 지원 특징",
        description: "서울과 경기도 등 대도시는 전국민 일괄 현금 지급보다는 청년·소상공인·취약계층을 겨냥한 선별적 맞춤형 지원과 지역화폐 인센티브 확대에 집중하고 있습니다.",
        target: "청년, 소상공인, 취약계층 등",
        period: "2026년",
        category: "전국민 지원 사업",
        details: {
            "경기도": [
                "가평, 연천, 양평 등 인구 감소 지역 위주로 1인당 최대 30만 원 규모의 선별 지원을 추진하고 있습니다.",
                "청년기본소득: 만 24세 청년에게 분기별 25만 원(연 100만 원)을 지역화폐로 계속 지원합니다."
            ],
            "서울시": "청년 월세 지원(연 최대 240만 원), 중장년 창업 지원 등 생애주기별 정책에 예산을 집중 투입합니다.",
            "부산시": "지역화폐 '동백전'의 캐시백 비율을 상시 확대(최대 13%)하여 실질적인 소비 혜택을 제공합니다."
        }
    },
    {
        title: "신청 방법 및 유의사항",
        description: "민생지원금 신청 방법과 주요 유의사항을 확인하세요.",
        target: "지원금 신청 대상자",
        period: "2026년",
        category: "전국민 지원 사업",
        details: {
            "신청처": "주소지 관할 읍·면·동 행정복지센터 방문 또는 각 지자체 홈페이지(예: 소상공인24, 정부24)를 통해 가능합니다.",
            "지급 대상": "대부분 전년도 말(12월 31일) 혹은 지급 공고일 기준 해당 지역에 주민등록이 되어 있는 주민을 대상으로 합니다.",
            "사용처": "대형마트나 온라인몰을 제외한 지역 내 소상공인 가맹점에서만 사용 가능하며, 기한 내 미사용 시 잔액은 자동 소멸됩니다."
        }
    }
];

// Encapsulate the rendering logic within DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.national-support-container');

    console.log(`[main.js] national-support-container (inside DOMContentLoaded):`, container);

    if (container) {
        policyData.forEach(policy => {
            const policyCard = document.createElement('policy-card');
            policyCard.setAttribute('title', policy.title);
            policyCard.setAttribute('description', policy.description);
            policyCard.setAttribute('target', policy.target);
            policyCard.setAttribute('period', policy.period);
            
            if (policy.details) {
                policyCard.setAttribute('details', JSON.stringify(policy.details));
            }

            console.log(`[main.js] Appending '${policy.title}' to national-support-container`);
            container.appendChild(policyCard);
        });
    } else {
        console.error(`[main.js] national-support-container not found!`);
    }
});