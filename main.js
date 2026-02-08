class PolicyCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
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
            </style>
            <div class="card">
                <h3>${this.getAttribute('title')}</h3>
                <p>${this.getAttribute('description')}</p>
                <p><strong>지원 대상:</strong> ${this.getAttribute('target')}</p>
                <p><strong>신청 기간:</strong> ${this.getAttribute('period')}</p>
            </div>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('policy-card', PolicyCard);

const policyData = [
    {
        title: "예비창업패키지",
        description: "사업화 자금(최대 1억원), 창업프로그램 등을 지원합니다.",
        target: "공고일 기준 창업경험이 없거나 신청자 명의의 사업자 등록이 없는 자",
        period: "2024년 상반기"
    },
    {
        title: "청년 창업 지원 사업",
        description: "혁신적인 아이디어를 가진 청년 창업가를 지원합니다.",
        target: "만 19세 이상 39세 이하 청년",
        period: "2024-01-01 ~ 2024-12-31"
    },
    {
        title: "소상공인 스마트 상점 기술 보급 사업",
        description: "소상공인의 디지털 전환을 위한 스마트 기술 도입을 지원합니다.",
        target: "소상공인",
        period: "상시 접수"
    },
    {
        title: "중소기업 기술 혁신 개발 사업",
        description: "중소기업의 기술 경쟁력 강화를 위한 R&D를 지원합니다.",
        target: "중소기업",
        period: "2024-03-01 ~ 2024-04-30"
    }
];

const cardContainer = document.querySelector('.card-container');

policyData.forEach(policy => {
    const policyCard = document.createElement('policy-card');
    policyCard.setAttribute('title', policy.title);
    policyCard.setAttribute('description', policy.description);
    policyCard.setAttribute('target', policy.target);
    policyCard.setAttribute('period', policy.period);
    cardContainer.appendChild(policyCard);
});
