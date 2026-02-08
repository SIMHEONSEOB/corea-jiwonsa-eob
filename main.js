class PolicyCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

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

        const h3 = document.createElement('h3');
        h3.textContent = this.getAttribute('title');
        cardDiv.appendChild(h3);

        const descriptionP = document.createElement('p');
        descriptionP.textContent = this.getAttribute('description');
        cardDiv.appendChild(descriptionP);

        const targetP = document.createElement('p');
        const targetStrong = document.createElement('strong');
        targetStrong.textContent = '지원 대상:';
        targetP.appendChild(targetStrong);
        targetP.appendChild(document.createTextNode(` ${this.getAttribute('target')}`));
        cardDiv.appendChild(targetP);

        const periodP = document.createElement('p');
        const periodStrong = document.createElement('strong');
        periodStrong.textContent = '신청 기간:';
        periodP.appendChild(periodStrong);
        periodP.appendChild(document.createTextNode(` ${this.getAttribute('period')}`));
        cardDiv.appendChild(periodP);

        // Add details section if data exists
        const detailsAttr = this.getAttribute('details');
        console.log(`[PolicyCard] details attribute:`, detailsAttr);

        const detailsData = detailsAttr ? JSON.parse(detailsAttr) : null;
        console.log(`[PolicyCard] Parsed detailsData:`, detailsData);

        if (detailsData) {
            const detailsElement = document.createElement('details');
            const summaryElement = document.createElement('summary');
            summaryElement.textContent = '상세 정보 보기';
            detailsElement.appendChild(summaryElement);

            const detailsContentDiv = document.createElement('div');
            detailsContentDiv.classList.add('details-content');

            const createHeadingAndParagraph = (headingText, paragraphText, parent) => {
                if (paragraphText) {
                    const h4 = document.createElement('h4');
                    h4.textContent = headingText;
                    parent.appendChild(h4);
                    const p = document.createElement('p');
                    p.textContent = paragraphText;
                    parent.appendChild(p);
                }
            };

            const createHeadingAndList = (headingText, listItems, parent) => {
                if (listItems && listItems.length > 0) {
                    const h4 = document.createElement('h4');
                    h4.textContent = headingText;
                    parent.appendChild(h4);
                    const ul = document.createElement('ul');
                    listItems.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        ul.appendChild(li);
                    });
                    parent.appendChild(ul);
                }
            };

            console.log(`[PolicyCard] detailsData.overview:`, detailsData.overview);
            createHeadingAndParagraph('개요', detailsData.overview, detailsContentDiv);
            
            console.log(`[PolicyCard] detailsData.budget_scale:`, detailsData.budget_scale);
            createHeadingAndParagraph('지원 예산 및 규모', detailsData.budget_scale, detailsContentDiv);
            
            console.log(`[PolicyCard] detailsData.support_content:`, detailsData.support_content);
            createHeadingAndList('지원 내용', detailsData.support_content, detailsContentDiv);
            
            console.log(`[PolicyCard] detailsData.process:`, detailsData.process);
            createHeadingAndList('사업 절차', detailsData.process, detailsContentDiv);

            if (detailsData.how_to_apply) {
                const h4 = document.createElement('h4');
                h4.textContent = '참여 방법';
                detailsContentDiv.appendChild(h4);

                if (detailsData.how_to_apply.announcement) {
                    const p = document.createElement('p');
                    const strong = document.createElement('strong');
                    strong.textContent = '사업공고:';
                    p.appendChild(strong);
                    p.appendChild(document.createTextNode(` ${detailsData.how_to_apply.announcement}`));
                    detailsContentDiv.appendChild(p);
                }
                if (detailsData.how_to_apply.method) {
                    const p = document.createElement('p');
                    const strong = document.createElement('strong');
                    strong.textContent = '신청방법:';
                    p.appendChild(strong);
                    const link = document.createElement('a');
                    link.href = "https://www.k-startup.go.kr";
                    link.target = "_blank";
                    link.textContent = detailsData.how_to_apply.method;
                    p.appendChild(document.createTextNode(' '));
                    p.appendChild(link);
                    detailsContentDiv.appendChild(p);
                }
                if (detailsData.how_to_apply.required_docs) {
                    const p = document.createElement('p');
                    const strong = document.createElement('strong');
                    strong.textContent = '제출서류:';
                    p.appendChild(strong);
                    p.appendChild(document.createTextNode(` ${detailsData.how_to_apply.required_docs}`));
                    detailsContentDiv.appendChild(p);
                }
            }
            console.log(`[PolicyCard] detailsData.inquiry:`, detailsData.inquiry);
            createHeadingAndList('문의처', detailsData.inquiry, detailsContentDiv);

            detailsElement.appendChild(detailsContentDiv);
            cardDiv.appendChild(detailsElement);
        }

        shadow.appendChild(cardDiv);
    }
}

customElements.define('policy-card', PolicyCard);

const policyData = [
    {
        title: "예비창업패키지",
        description: "혁신적인 기술창업 아이디어를 보유한 예비창업자의 창업 사업화 준비단계를 지원하여 성공적인 창업시장 안착 유도",
        target: "예비창업자(공고일 기준 사업자(개인, 법인)등록 및 법인 설립등기를 하지 않은 자)",
        period: "2026.2 월 말 예정 (사업공고)", // Using the first mentioned date for period
        category: "창업 지원",
        details: {
            overview: "혁신적인 기술창업 아이디어를 보유한 예비창업자의 창업 사업화 준비단계를 지원하여 성공적인 창업시장 안착 유도",
            budget_scale: "491.25억원 (750명 내외)",
            support_content: [
                "사업화 자금, 창업프로그램 등",
                "사업화자금: 시제품 제작, 마케팅, 지식재산권 출원·등록 등에 소요되는 사업화자금 최대 0.8억원 지원(중간평가를 통하여 단계별 사업비 차등지원)",
                "창업프로그램: 주관기관의 강점과 특성을 반영하여 예비창업자를 지원하는 창업 프로그램 제공 (BM(비즈니스모델) 고도화, MVP(시제품) 제작 지원, 창업 교육 및 멘토링, 네트워킹 등)"
            ],
            process: [
                "STEP 01: 사업공고 (’26.2 월 말 예정)",
                "STEP 02: 신청·접수 (’26.2~3월 예정)",
                "STEP 03: 선정평가 및 협약 (’26.4~5월 예정)",
                "STEP 04: 사업비 지원 (’26.6월~ 예정)"
            ],
            how_to_apply: {
                announcement: "’26.2 월 말 예정",
                method: "K-Startup홈페이지(www.k-startup.go.kr)를 통한 온라인 신청·접수",
                required_docs: "사업계획서, 증빙서류 등"
            },
            inquiry: [
                "중소벤처기업부 신산업기술창업과: Tel. 044-204-7648, 7666",
                "창업진흥원 예비재도전실: Tel. 044-410-1803, 1806~7, 1809"
            ]
        }
    },
    {
        title: "청년 창업 지원 사업",
        description: "혁신적인 아이디어를 가진 청년 창업가를 지원합니다.",
        target: "만 19세 이상 39세 이하 청년",
        period: "2024-01-01 ~ 2024-12-31",
        category: "창업 지원"
    },
    {
        title: "소상공인 스마트 상점 기술 보급 사업",
        description: "소상공인의 디지털 전환을 위한 스마트 기술 도입을 지원합니다.",
        target: "소상공인",
        period: "상시 접수",
        category: "기술 및 금융 지원"
    },
    {
        title: "중소기업 기술 혁신 개발 사업",
        description: "중소기업의 기술 경쟁력 강화를 위한 R&D를 지원합니다.",
        target: "중소기업",
        period: "2024-03-01 ~ 2024-04-30",
        category: "기술 및 금융 지원"
    }
];

const startupSupportContainer = document.querySelector('.startup-support-container');
const techFinanceSupportContainer = document.querySelector('.tech-finance-support-container');

policyData.forEach(policy => {
    const policyCard = document.createElement('policy-card');
    policyCard.setAttribute('title', policy.title);
    policyCard.setAttribute('description', policy.description);
    policyCard.setAttribute('target', policy.target);
    policyCard.setAttribute('period', policy.period);
    // Pass the entire details object as a JSON string
    if (policy.details) {
        policyCard.setAttribute('details', JSON.stringify(policy.details));
    }

    if (policy.category === "창업 지원") {
        startupSupportContainer.appendChild(policyCard);
    } else if (policy.category === "기술 및 금융 지원") {
        techFinanceSupportContainer.appendChild(policyCard);
    }
});