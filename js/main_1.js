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
                canvas_opacity: [1, 0, {start: 0.9, end: 1}],
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
                pinC: document.querySelector('#scroll-sect3 .c .pin'),

                canvas: document.querySelector('#video-canvas-1'),
                context: document.querySelector('#video-canvas-1').getContext('2d'),
                videoImages: [], // 이미지 시퀀스를 넣는 배열
            },
            values: {
                videoImagesCount: 960,
                imagesSequence: [0, 959],
                canvas_opacity_in: [0, 1, {start: 0, end: 0.1}],
                canvas_opacity_out: [1, 0, {start: 0.95, end: 1}],

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
                canvas: document.querySelector('.image-blend-canvas'),
                context: document.querySelector('.image-blend-canvas').getContext('2d'),     
                imagesPath: [
                    '../image/blend-image-1.jpg',
                    '../image/blend-image-2.jpg',
                ],
                images: [],
            },
            values: {
                //왜 다 0이냐?  우리가 화면크기를 알 수 없기 때문에, 그래서 스크롤 할 때 판단 후 계산하도록 만듦, 미리 자리 만들어 놓고 값 갱신
                rect1X: [0, 0, {start:0, end:0}],
                rect2X: [0, 0, {start:0, end:0}],
                rectStartY: 0,

                blendHeight: [0, 0, {start:0, end:0}],
                canvas_scale: [0, 0, {start:0, end:0}],
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

        let imgElem2;
        for (let i = 0; i < sceneInfo[2].values.videoImagesCount; i++) {
            // imgElem = document.createElement('img'); 이거써도되고 new img()써도되고 아무거나 써
            imgElem2 = new Image();
            imgElem2.src = `../image/002/IMG_${7027 + i}.JPG`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }
        // console.log(sceneInfo[0].objs.videoImages);
        let imgElem3;
        for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
            imgElem3 = new Image();
            imgElem3.src = sceneInfo[3].objs.imagesPath[i];
            sceneInfo[3].objs.images.push(imgElem3);
        }
        // console.log(sceneInfo[3].objs.images);
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
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
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
                objs.canvas.style.opacity = (calcValues(values.canvas_opacity, currYOffset));

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
                let sequence2 = Math.round(calcValues(values.imagesSequence, currYOffset));
                // console.log(sequence); // 소수점이 나옴 정수로 만들기
                objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

                if (scrollRatio <= 0.5) {
                    // in
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currYOffset);
                } else {
                    // out
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currYOffset);
                }

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

                // currScene3 에서 쓰는 캔버스 미리 그려주기 시작
                // case3에서 코드를 복붙하면 case2의 변수들과 충돌이 일어난다
                if (scrollRatio < 0.9) {
                    // 그래서 스코프안에서 다시 변수 선언!
                    const objs = sceneInfo[3].objs;
                    const values = sceneInfo[3].values;
                    const widthRatio = window.innerWidth / objs.canvas.width;
                    const heightRatio = window.innerHeight / objs.canvas.height;

                    let canvasScaleRatio;

                    if (widthRatio <= heightRatio) {
                        // 캔버스보다 브라우저 창이 홀쭉한 경우
                        canvasScaleRatio = heightRatio;
                    } else {
                        // 캔버스보다 브라우저 창이 납작한 경우
                        canvasScaleRatio = widthRatio;
                    }
                    objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                    objs.context.fillStyle = "#fff";
                    objs.context.drawImage(objs.images[0], 0, 0);

                    // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
                    // 크롬에서 는 스크롤바가 공간을 차지하고 있기 때문에 nnerWidth를 쓰면  값의 오차가 생긴다 그래서 body.offsetWidth사용
                    const recalculatedInnerhWidth = document.body.offsetWidth / canvasScaleRatio;
                    const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
                    // console.log(recalculatedInnerHeight, recalculatedInnerhWidth);
                    const whiteRectWidth = recalculatedInnerhWidth * 0.15;
                    
                    values.rect1X[0] = (objs.canvas.width - recalculatedInnerhWidth) / 2; // 출발값, objs.canvas.width는 1920고정값
                    values.rect1X[1] = values.rect1X[0] - whiteRectWidth; // 최종값
                    values.rect2X[0] = values.rect1X[0] + recalculatedInnerhWidth - whiteRectWidth;
                    values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

                    // 좌우 흰색 박스 그리기
                    // fillRect메서드가 canvas에서 사각형를 그리는 메서드임, fillRect(x, y, width, height)
                    // objs.canvas.height = recalculatedInnerHeight
                    // fillRect가 잘 되는지 확인하기 위해 x값에 values.rect1X[0]을 넣었지만 애니메이션이 되야 하기 때문에 아래 코드롤 변경
                    // currScene2에서는 애니메이션이아니라 그리기만 하면 되니까 다시 values.rect1X[0]
                    objs.context.fillRect(
                        parseInt(values.rect1X[0]),
                        0,
                        parseInt(whiteRectWidth),
                        objs.canvas.height
                        );

                    objs.context.fillRect(
                        parseInt(values.rect2X[0]),
                        0,
                        parseInt(whiteRectWidth),
                        objs.canvas.height
                        );
                }

                break;

            case 3:
                // console.log(3);
                let step = 0;
                // 기기들의 화면 비율이 다 다르기 때문에 play함수에서 스크롤 될 때 화면에 가로,세로 꽉 차게 하기 위해 여기서 세팅
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;
                // console.log(widthRatio, heightRatio);
                let canvasScaleRatio;

                if (widthRatio <= heightRatio) {
                    // 캔버스보다 브라우저 창이 홀쭉한 경우
                    canvasScaleRatio = heightRatio;
                    // console.log('height');
                } else {
                    // 캔버스보다 브라우저 창이 납작한 경우
                    canvasScaleRatio = widthRatio;
                    // console.log('width');
                }
                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.fillStyle = "#fff";
                objs.context.drawImage(objs.images[0], 0, 0);

                // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
                // 크롬에서 는 스크롤바가 공간을 차지하고 있기 때문에 nnerWidth를 쓰면  값의 오차가 생긴다 그래서 body.offsetWidth사용
                const recalculatedInnerhWidth = document.body.offsetWidth / canvasScaleRatio;
                const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
                // console.log(recalculatedInnerHeight, recalculatedInnerhWidth);
                const whiteRectWidth = recalculatedInnerhWidth * 0.15;
                
                values.rect1X[0] = (objs.canvas.width - recalculatedInnerhWidth) / 2; // 출발값, objs.canvas.width는 1920고정값
                values.rect1X[1] = values.rect1X[0] - whiteRectWidth; // 최종값
                values.rect2X[0] = values.rect1X[0] + recalculatedInnerhWidth - whiteRectWidth;
                values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

                // console.log(objs.canvas.getBoundingClientRect());

                // getBoundingClientRect()값이 한번만 출력되도록 하기, 
                if (!values.rectStartY) {
                    // values.rectStartY = objs.canvas.getBoundingClientRect().top;
                    // 단점이 속도에 따라 스크롤 값이 달라진다 = 정확한 기준이 못 된다, 그래서 offsetTop사용
                    values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2; // 캔버스 원래 높이 - 줄어든 캔버스 높이
                    // console.log(values.rectStartY);
                    values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect1X[2].end = values.rectStartY / scrollHeight;
                    values.rect2X[2].end = values.rectStartY / scrollHeight;
                }

                // 좌우 흰색 박스 그리기
                // fillRect메서드가 canvas에서 사각형를 그리는 메서드임, fillRect(x, y, width, height)
                // objs.canvas.height = recalculatedInnerHeight

                // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), recalculatedInnerHeight); 
                // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                // fillRect가 잘 되는지 확인하기 위해 x값에 values.rect1X[0]을 넣었지만 애니메이션이 되야 하기 때문에 아래 코드롤 변경

                objs.context.fillRect(
                    parseInt(calcValues(values.rect1X, currYOffset)),
                    0,
                    parseInt(whiteRectWidth),
                    objs.canvas.height
                    );

                objs.context.fillRect(
                    parseInt(calcValues(values.rect2X, currYOffset)),
                    0,
                    parseInt(whiteRectWidth),
                    objs.canvas.height
                    );
                    
                    // 캔버스가 브라우저 상단에 닿지 않았다면 = step = 1 
                    // = scrollRatio가 애니메이션이 끝나는 end시점 보다 작다
                    // (=scrollRatio는 현재씬에서 얼마나 스크롤 했는지 비율로 나타내는 값)
                    if (scrollRatio < values.rect1X[2].end) {
                        step = 1;
                        // console.log('캔버스 닿기 전');
                        objs.canvas.classList.remove('sticky');
                    } else {
                        step =2;
                        // console.log('캔버스 닿은 후');
                        // 이미지 블랜드
                        // 캔버스가 닿은 후 가장 먼저할 일은 canvas의 position을 fixed로 바꾸기
                        objs.canvas.classList.add('sticky');
                        objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;
                        // 원래 캔버스 크기 - 조정된 캔버스 크기 나누기 2인데 위로 움직여야 하기 때문에 마이너스 붙여주기

                        // blendHeight: [0, 0, {start:0, end:0}],
                        values.blendHeight[0] = 0;
                        values.blendHeight[1] = objs.canvas.height;
                        values.blendHeight[2].start = values.rect1X[2].end // 시작되는 순간: 캔버스가 상단에 닿은 직후
                        values.blendHeight[2].end = values.rect1X[2].start + 0.2; // 끝나는 순간: 스크롤 속도를 빠르게 할지 느리게 할지 내가 정하면 된다.
                        
                        const blendHeight = calcValues(values.blendHeight, currYOffset);
                        // objs.context.drawImage(img, x, y, width, height);
                        objs.context.drawImage(objs.images[1],
                            // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                            // sx, sy 의 s는 source, dx, dy의 d는 destination
                            // y좌표는 캔버스height 빼기 blendHeight
                            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight, // 소스이미지
                            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight // 실제로 그려지는 부분 
                            // 왜 수치가 똑깥냐? 원래이미지랑 캔버스크기를 처음부터 맞춰놨으니께(계산이 편해진다~~)
                            );

                            if (scrollRatio > values.blendHeight[2].end) {
                                values.canvas_scale[0] = canvasScaleRatio;
                                values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
                                // values.canvas_scale[1] = document.body.offsetWidth / objs.canvas.width;
                                // 왜 곱하기 1.5? 분수니까 분모의 값을 증가시켜서 결과값을 작게 만듦
                                // 왜 작게 만드나? 
                                // 곱하기전 시작값과 마지막점의 차이 별로 안나 애니메이션 비율간 차이가 작음, 곱합으로써 비율간 차이가 커짐
                                // 곱하기 전 - values.canvas_scale[0]: 0.85, values.canvas_scale[1]: 0.3
                                // 곱하기 후 - values.canvas_scale[0]: 0.85, values.canvas_scale[1]: 0.2
                                // console.log(values.canvas_scale[0], ":",values.canvas_scale[1]); 
                                values.canvas_scale[2].start = values.blendHeight[2].end;
                                values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;
                                
                                objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currYOffset)})`;
                            }
                    }
                break;
        }
    }

    function scrollLoop () {
        enterNScene = false;
        prevScrollHeight = 0;

        for (let i =0; i < currScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if (yOffset > prevScrollHeight + sceneInfo[currScene].scrollHeight) {
        // if (yOffset > prevScrollHeight + sceneInfo[currScene].scrollHeight) {
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
    window.addEventListener('load', () => { // DOMContentloaded도 사용 가능, 얘는 dom객체들만 로딩되면 실행시킴 그래서 더 빠름, load는 이미지같은 애들 다 로딩이 되야 실행됨
        setLayout();
        // 페이지 시작했을 때도 이미지가 나오게 하기
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
    }); 
    
    window.addEventListener('resize', setLayout);

})();

// 21.07.13
// 초반 부분은 이해했지만 뒤로 가면서 이해하지 못했다. 그냥 따라 치고 있다.
// 그래서 두가지 방법 중 하나를 먼저 해볼려고 한다
// 일단 처음부터 끝까지 다 보고 다시 처음부터 시작하기
// 이게 안되면 처음부터 다시 이해가 안되는 부분을 짚고 넘어가면 된다.
// 따라쟁이말고 개발자가 되고 싶으니께