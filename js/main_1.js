//오류를 못 찾아서 세번 째 다시 시작21.06.30
(() => {

    let YOffset = 0; // pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(YOffset)보다 이전에 위치한 스크롤 섹션들의 높이값의 합
    let currScene = 0; // 현재 활성화 된 씬(scroll-sect)
    let enterNScene = false; // 새로운 씬이 시작된 순간 true가 되는 애

    const sceneInfo = [
        {
            // 0섹션
            type: 'sticky',
            heightNum:5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-sect1'),
                messageA: document.querySelector("#scroll-sect1 .main-message.a"),
                messageB: document.querySelector("#scroll-sect1 .main-message.b"),
                messageC: document.querySelector("#scroll-sect1 .main-message.c"),
                messageD: document.querySelector("#scroll-sect1 .main-message.d"),
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages: [], // 이미지 시퀀스를 넣는 배열
            },
            values: {
                videoImagesCount: 300,
                imagesSequence: [0, 299],
                messageA_opacity_in: [0, 1, {start: 0.1, end: 0.2}],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                
                messageA_opacity_out: [1, 0, {start: 0.25, end: 0.3}],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],

                messageA_transY_in: [20, 0, {start: 0.1, end: 0.2}],
                messageB_transY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_transY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_transY_in: [20, 0, { start: 0.7, end: 0.8 }],

                messageA_transY_out: [0, -20, {start: 0.25, end: 0.3}],
                messageB_transY_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_transY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_transY_out: [0, -20, { start: 0.85, end: 0.9 }],
            },
        },
        {
            // 1섹션
            type: 'normal',
            // heightNum:5, // type:normal에서는 필요 없어서 주석처리
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-sect2'),
                content: document.querySelector('#scroll-sect2 .description'),
            },
        },
        {
            // 2섹션
            type: 'sticky',
            heightNum:5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-sect3'),
                messageA: document.querySelector('#scroll-sect3 .a'),
                messageB: document.querySelector('#scroll-sect3 .b'),
                messageC: document.querySelector('#scroll-sect3 .c'),
                pinB: document.querySelector('#scroll-sect3 .b .pin'),
                pinC: document.querySelector('#scroll-sect3 .c .pin')
            },
            values: {
                messageA_transY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageB_transY_in: [30, 0, { start: 0.5, end: 0.55 }],
                messageC_transY_in: [30, 0, { start: 0.72, end: 0.77 }],
    
                messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
    
                messageA_transY_out: [0, -20, { start: 0.3, end: 0.35 }],
                messageB_transY_out: [0, -20, { start: 0.58, end: 0.63 }],
                messageC_transY_out: [0, -20, { start: 0.85, end: 0.9}],
    
                messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
                messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
                messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9}],

                pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
                pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],

                pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],

                pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
                pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
            },
        },
        {
            // 3섹션
            type: 'sticky',
            heightNum:5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-sect4'),
                canvasCaption: document.querySelector('.canvas-caption'),
            },
            values: {

            },
        },
    ];

    function setCanvasImages() {
        let imgElem;
        for (let i = 0; i < sceneInfo[0].values.videoImagesCount; i++) {
            // imgElem = document.createElement('img'); 이거써도되고 new img()써도되고 아무거나 써
            imgElem = new Image();
            imgElem.src = `../image/001/IMG_${6726 + i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }
        console.log(sceneInfo[0].objs.videoImages);
    }
    setCanvasImages();

    function setLayout() {
        // 각 스크롤 섹션의  높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'sticky') {

                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
                
            } else if (sceneInfo[i].type === 'normal') {
                
                sceneInfo[i].scrollHeight =  sceneInfo[i].objs.container.offsetHeight;
                // element.offsetWidth는 margin을 제외한, padding값, border값까지 계산한 값을 가져옴
                
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        //새로고침했을 때 currScene세팅하기
        // 강의-현재 활성 씬 반영하기 13:00 참고
        yOffset = window.pageYOffset; // 확실하게 하기 위해 작성
        let totalScrollHeight = 0;
            
        for (let i =0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene${currScene}`);

        const heightRatio = window.innerHeight / 1080;
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }

    function calcValues(values, currYOffset) {
        
        let rv;
        // 현재 씬에서 얼마나 스크롤 됐는지 비율로 구하기
        const scrollHeight = sceneInfo[currScene].scrollHeight
        const scrollRatio = currYOffset / scrollHeight;
        
        if (values.length === 3) {
            // start - end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currYOffset >= partScrollStart && currYOffset <= partScrollEnd) {
                rv = (currYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if (currYOffset < partScrollStart) {
                // 섹션0에서 스크롤in, out한 후 텍스트들의 잔상이 남은 이유는 또 오타
                // SrollHeight가 아니라 SrollStart였음
                rv  = values[0];
            } else if (currYOffset > partScrollEnd) {
                rv = values[1];
            }

        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }

        return rv;
    }

    function playAnimation() {

        const objs = sceneInfo[currScene].objs;
        const values = sceneInfo[currScene].values;
        const currYOffset = yOffset - prevScrollHeight; // 전체 높이에서 이전 씬들의 합 === 내가 현재 씬에서의 스크롤 위치
        const scrollHeight = sceneInfo[currScene].scrollHeight;
        const scrollRatio = currYOffset / scrollHeight;

        // console.log(currScene, currYOffset);

        switch (currScene) {
            case 0:
                // console.log(0);
                let sequence = Math.round(calcValues(values.imagesSequence, currYOffset));
                // console.log(sequence); // 소수점이 나옴 정수로 만들기
                objs.context.drawImage(objs.videoImages[sequence], 0, 0);

                if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currYOffset);
                    objs.messageA.style.transform = `translat3d(${calcValues(values.messageA_transY_in, currYOffset)}%)`;
                    // 원래는 translatY였는 데 왜 3d로 바꿨냐면 3d는 브라우저 업데이트에 따라 달라질 수 있지만 
                    // 3d가 붙은애들은 하드웨어 가속이 보장되어 있어 퍼포먼스가 좋아서 바꿈, 애플도 이렇게 사용하고 있음
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currYOffset);
                    objs.messageA.style.transform = `translat3d(${calcValues(values.messageA_transY_out, currYOffset)}%)`;
                }

                if (scrollRatio <= 0.42) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_transY_in, currYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_transY_out, currYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.62) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_transY_in, currYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_transY_out, currYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_transY_in, currYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_transY_out, currYOffset)}%, 0)`;
                }
                break;

            // case 1:
            //     // console.log(1);
            //     break;
            // case 1은 애니메이션 없으니까 지움

            case 2:
                // console.log(2);
                if (scrollRatio <= 0.32) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_transY_in, currYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_transY_out, currYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.52) {
                    // in
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_transY_in, currYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currYOffset)})`;
                } else {
                    // out
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_transY_out, currYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currYOffset)})`;
                }
    
                if (scrollRatio <= 0.88) {
                    // in
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_transY_in, currYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currYOffset)})`;
                } else {
                    // out
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_transY_out, currYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currYOffset)})`;
                }
                break;

            case 3:
                // console.log(3);
                break;
        }
    }

    function scrollLoop () {
        enterNScene = false;
        prevScrollHeight = 0;
        for (let i =0; i < currScene; i++) {
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currScene].scrollHeight) {
            enterNScene = true;
            currScene++;
            document.body.setAttribute('id', `show-scene${currScene}`)
        }
        if (yOffset < prevScrollHeight) {
            if (currScene ===0) return; // 브라우저 바운스 효과로 인해 마이너스가 음수가 되는 것을 방지(모바일)
            enterNScene = true;
            currScene--;
            document.body.setAttribute('id', `show-scene${currScene}`)
        }

        if (enterNScene) return;

        playAnimation();
    }

    // ('resize', scrollLoop) 왜 이렇게 안하냐면 다른 이벤트들도 있어서
    window.addEventListener('scroll', () => { 
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    window.addEventListener('resize', setLayout);
    window.addEventListener('load', setLayout); // DOMContentloaded도 사용 가능, 얘는 dom객체들만 로딩되면 실행시킴 그래서 더 빠름, load는 이미지같은 애들 다 로딩이 되야 실행됨

})();