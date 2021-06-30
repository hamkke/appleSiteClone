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
            },
            values: {
                messageA_opacity_in: [0, 1, {start: 0.1, end: 0.2}],
                messageB_opacity_out: [0, 1, {start: 0.3, end: 0.4}],

                messageA_opacity_out: [1, 0, {start: 0.25, end: 0.3}],
            },
        },
        {
            // 1섹션
            type: 'normal',
            heightNum:5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-sect2'),
            },
        },
        {
            // 2섹션
            type: 'sticky',
            heightNum:5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-sect3'),
            },
        },
        {
            // 3섹션
            type: 'sticky',
            heightNum:5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-sect4'),
            },
        },
    ];

    function setLayout() {
        // 각 스크롤 섹션의  높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
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
                console.log(123);
                rv = (currYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if (currYOffset < partScrollHeight) {
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
                const messageA_opacity_in = calcValues(values.messageA_opacity_in, currYOffset);
                const messageA_opacity_out = calcValues(values.messageA_opacity_out, currYOffset);


                if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = messageA_opacity_in;
                } else {
                    // out
                    objs.messageA.style.opacity = messageA_opacity_out;
                }
                break;

            case 1:
                // console.log(1);
                break;

            case 2:
                // console.log(2);
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