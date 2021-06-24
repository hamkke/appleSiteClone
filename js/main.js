(() => {  // 즉시호출함수, 전역변수를 피하기 위해
    let yOffset = 0; // window.pageYOffset를 변수로 지정
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currScene = 0; // 현재 활성화된 씬(scroll-sect)


    const sceneInfo = [
        {
            // 0섹션
            // 브라우저 높이의 5배로 scrollHeight 세팅, 모든 기기가 똑같은 높이가 아닝께
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-sect1"),
                messageA: document.querySelector("#scroll-sect1 .main-message.a"),
                messageB: document.querySelector("#scroll-sect1 .main-message.b"),
                messageC: document.querySelector("#scroll-sect1 .main-message.c"),
                messageD: document.querySelector("#scroll-sect1 .main-message.d"),
            },
            values: {
                messageA_opacity: [0, 1],
            },
        },

        {
            // 1섹션
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-sect2")
            },
        },
        {
            // 2섹션
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-sect3")
            },
        },
        {
            // 3섹션
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-sect4")
            },
        },
    ];

    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        let totalScrollHeight = 0;
        yOffset = window.pageYOffset;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene${currScene}`);
    }

    function calcValues(values, currYOffset) { //currYOffset은 현재 씬에서 얼마나 스크롤 됐는지 나타냄
        let rv;
        // 현재 씬(스크롤섹션)에서 스크롤 된 범위를 비율로 구하기 
        let scrollRatio = currYOffset / sceneInfo[currScene].scrollHeight;
        
        rv = scrollRatio * (values[1]-values[0] + values[0]);
        
        return rv;
    }

    function playAnimation() {
        const objs = sceneInfo[currScene].objs;
        const values = sceneInfo[currScene].values;
        const currYOffset = yOffset - prevScrollHeight;
        
        console.log(currScene);
        switch (currScene) {
            case 0:
                // console.log(1); 
                let messageA_opacity_in = calcValues(values.messageA_opacity, currYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                console.log(messageA_opacity_in);
                break;

            case 1:
                // console.log(2);
                break;

            case 2:
                // console.log(3);
                break;

            case 3:
                // console.log(4);
                break;    
        }
    }

    function scrollLoop() {
        prevScrollHeight = 0; // 스크롤이 움직일 때 마다 값이 나와서 0으로 만들어준다
        for (let i = 0; i < currScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        // console.log(prevScrollHeight);
        if (yOffset > prevScrollHeight + sceneInfo[currScene].scrollHeight) {
            currScene++;
            document.body.setAttribute('id', `show-scene${currScene}`);
        }

        if (yOffset < prevScrollHeight) {
            if (currScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 음수가 되는 것을 방지(모바일)
            currScene--;
            document.body.setAttribute('id', `show-scene${currScene}`);
        }
        // console.log(currScene);
        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset; // 스크롤 위치를 알 수 있당
        // console.log('지금 내 높이는', yOffset);
        scrollLoop();
    });
    window.addEventListener('resize', setLayout);
    window.addEventListener('load', setLayout); // DOMContentloaded도 사용 가능 

})();
