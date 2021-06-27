// (() => {  // 즉시호출함수
//     let yOffset = 0; // window.pageYOffset를 변수로 지정
//     let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
//     let currScene = 0; // 현재 활성화된 씬(scroll-sect)


//     const sceneInfo = [
//         {
//             // 0섹션
//             // 브라우저 높이의 5배로 scrollHeight 세팅, 모든 기기가 똑같은 높이가 아닝께
//             type: 'sticky',
//             heightNum: 5,
//             scrollHeight: 0,
//             objs: {
//                 container: document.querySelector("#scroll-sect1"),
//                 messageA: document.querySelector("#scroll-sect1 .main-message.a"),
//                 messageB: document.querySelector("#scroll-sect1 .main-message.b"),
//                 messageC: document.querySelector("#scroll-sect1 .main-message.c"),
//                 messageD: document.querySelector("#scroll-sect1 .main-message.d"),
//             },
//             values: {
//                 messageA_opacity: [0, 1],
//             },
//         },

//         {
//             // 1섹션
//             type: 'normal',
//             heightNum: 5,
//             scrollHeight: 0,
//             objs: {
//                 container: document.querySelector("#scroll-sect2")
//             },
//         },
//         {
//             // 2섹션
//             type: 'sticky',
//             heightNum: 5,
//             scrollHeight: 0,
//             objs: {
//                 container: document.querySelector("#scroll-sect3")
//             },
//         },
//         {
//             // 3섹션
//             type: 'sticky',
//             heightNum: 5,
//             scrollHeight: 0,
//             objs: {
//                 container: document.querySelector("#scroll-sect4")
//             },
//         },
//     ];

//     function setLayout() {
//         // 각 스크롤 섹션의 높이 세팅
//         for (let i = 0; i < sceneInfo.length; i++) {
//             sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
//             sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
//         }

//         let totalScrollHeight = 0;
//         yOffset = window.pageYOffset;
//         for (let i = 0; i < sceneInfo.length; i++) {
//             totalScrollHeight += sceneInfo[i].scrollHeight;
//             if (totalScrollHeight >= yOffset) {
//                 currScene = i;
//                 break;
//             }
//         }
//         document.body.setAttribute('id', `show-scene${currScene}`);
//     }

//     function calcValues(values, currYOffset) { //currYOffset은 현재 씬에서 얼마나 스크롤 됐는지 나타냄
//         let rv;
//         // 현재 씬(스크롤섹션)에서 스크롤 된 범위를 비율로 구하기 
//         let scrollRatio = currYOffset / sceneInfo[currScene].scrollHeight;
        
//         rv = scrollRatio * (values[1]-values[0] + values[0]);
        
//         return rv;
//     }

//     function playAnimation() {
//         const objs = sceneInfo[currScene].objs;
//         const values = sceneInfo[currScene].values;
//         const currYOffset = yOffset - prevScrollHeight;
        
//         console.log(currScene);
//         switch (currScene) {
//             case 0:
//                 // console.log(1); 
//                 let messageA_opacity_in = calcValues(values.messageA_opacity, currYOffset);
//                 objs.messageA.style.opacity = messageA_opacity_in;
//                 console.log(messageA_opacity_in);
//                 break;

//             case 1:
//                 // console.log(2);
//                 break;

//             case 2:
//                 // console.log(3);
//                 break;

//             case 3:
//                 // console.log(4);
//                 break;    
//         }
//     }

//     function scrollLoop() {
//         prevScrollHeight = 0; // 스크롤이 움직일 때 마다 값이 나와서 0으로 만들어준다
//         for (let i = 0; i < currScene; i++){
//             prevScrollHeight += sceneInfo[i].scrollHeight;
//         }
//         // console.log(prevScrollHeight);
//         if (yOffset > prevScrollHeight + sceneInfo[currScene].scrollHeight) {
//             currScene++;
//             document.body.setAttribute('id', `show-scene${currScene}`);
//         }

//         if (yOffset < prevScrollHeight) {
//             if (currScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 음수가 되는 것을 방지(모바일)
//             currScene--;
//             document.body.setAttribute('id', `show-scene${currScene}`);
//         }
//         // console.log(currScene);
//         playAnimation();
//     }

//     window.addEventListener('scroll', () => {
//         yOffset = window.pageYOffset; // 스크롤 위치를 알 수 있당
//         // console.log('지금 내 높이는', yOffset);
//         scrollLoop();
//     });
//     window.addEventListener('resize', setLayout);
//     window.addEventListener('load', setLayout); // DOMContentloaded도 사용 가능 

// })();


// 이해가 안돼서 다시 처음부터 시작
(() => {
    let yOffset = 0; // pageYOffset대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 높이값의 합을 저장할 변수
    let currScene = 0; // 현재 활성화된(눈 앞에 있는 씬) 씬(scroll-sect)
    let enterNScene = false; // 새로운 씬이 시작된 순간 true가 되는 애

    const sceneInfo = [

        {
            // 섹션0
            type: 'sticky', // 스크롤에 따라 애니메이션있는 씬은 stick, 아니면 normal임
            heightNum:5,
            /*
            브라우저 높이의 5배로 scrollHeight 세팅, ex)scrollHeight * heightNum
            스크롤되는 양 자체가 애니메이션의 속도를 결정하므로, 원하시는 느낌에 따라 적절히 조정가능,
            곱해지는 수가 커질수록 스크롤을 많이 해야하고, 작을수록 스크롤을 적게 해도 애니메이션이 휙휙 재생
            */
            scrollHeight:0, // 모든 디바이스의 크기가 다르기 떄문에 특정 수로 지정 X 일단 0으로 세팅
            objs: {
                container: document.querySelector('#scroll-sect1'),
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
            //섹션1
            type: 'normal',
            heightNum:5,
            scrollHeight:0,
            objs: {
                container: document.querySelector('#scroll-sect2'),
            },
        },
        {
            //섹션2
            type: 'sticky',
            heightNum:5,
            scrollHeight:0,
            objs: {
                container: document.querySelector('#scroll-sect3'),
            },
        },
        {
            //섹션3
            type: 'sticky',
            heightNum:5,
            scrollHeight:0,
            objs: {
                container: document.querySelector('#scroll-sect4'),
            },
        },
    ];
    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for(let i = 0; i < sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; // 템플릿 문자열
        }
        
        //새로고침핻도 currScene세팅하기
        // 강의-현재 활성 씬 반영하기 13:00 참고
        yOffset = window.pageYOffset; // 확실하게 하기 위해 작성
        let totalScrollHeight = 0;
        
        for(let i =0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene${currScene}`);
    }
    
    
    function calcValues(values , currYOffset) {
        // 여기서 values는 sceneInfo안에 있는 애가 아니라 저 밑에 platAnimation안에 있는 애
        let rv;
        // console.log(rv);
        // 현재 씬에서 얼마나 스크롤 됐는지 비율로 구하기
        // 강의- 스크롤 애니메이션 구현3 1:46참고
        let scrollRatio = currYOffset / sceneInfo[currScene].scrollHeight;
        // 현재 씬에서 스크롤 위치 / 현재 씬의 전체 높이 = 소수점으로 비율이 나옴
        
        rv = scrollRatio * ((values[1] - values[0]) + values[0]); // 곱해주는 값은 전체 범위의 값을 곱한다
        /*
        지금은 messageA_opacity: [0, 1] 라는 범위가 정해져 있지만, 나중에 위치나 다른 값으로 바뀔 수 있기 때문에 
        마지막값에서 첫번째 값을 빼고 첫번째 값을 더한다 
        ex) messageA_opacity: [200, 900]이라면  200-900+200 = 700이라는 전체 범위가 나온다
        거기에 scrollRatio를 곱해주면 
        */
    //    console.log(rv);
       return rv;
    }
    
    
    function playAnimation() {
        const objs = sceneInfo[currScene].objs;
        const values = sceneInfo[currScene].values;
        const currYOffset = yOffset - prevScrollHeight; // 전체 높이에서 이전 씬들의 합 === 내가 현재 씬에서의 스크롤 위치
        // console.log(currScene, currYOffset);
        
        console.log(currScene);

        // 해당 currScene의 요소들만 활성화 시키기 위해 switch문 사용
        switch (currScene) {
            case 0:
                // console.log(1);
                let messageA_opacity_in = calcValues(values.messageA_opacity, currYOffset);
                // console.log(messageA_opacity_in);
                objs.messageA.style.opacity = messageA_opacity_in;
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
        enterNScene = false; // 안 바뀌고 있으니까 일단 false고
        // console.log('1',prevScrollHeight);
        prevScrollHeight = 0;
        for(let i =0; i < currScene; i++){ // 0이면 flase니까 실행 안됨, 그래서 currScene의 값을 +1,-1 해주기
            // console.log(sceneInfo.length); = 4
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
            // console.log('2',prevScrollHeight);
        }
        // console.log('3',prevScrollHeight);
        // console.log(prevScrollHeight); 값이 초기화가 되지 못한 상태라 처음 수가 나오고 점점 배가 된다 그래서 초기화 해주깅, prevScrollHeight = 0;
        if (yOffset > prevScrollHeight + sceneInfo[currScene].scrollHeight) { // prev랑 지금 내가 위치해 있는 씬의 scrollHeight까지 더하기
            enterNScene = true; // 바뀌는 순간이니까 true인 거임
            currScene++;
            // element.setAttribute( 'attributename', 'attributevalue' )
            document.body.setAttribute('id', `show-scene${currScene}`);
            
        }
        if (yOffset < prevScrollHeight) { // 얘는 스크롤을 올릴 때 상황, 지금 있는 씬의 위의 씬에 바닥에 닿자마자 애니 실행하면 되니까 그냥 prev만
            if (currScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 음수가 되는 것을 방지(모바일)
            enterNScene = true; // 얘도 마찬가지
            currScene--;
            document.body.setAttribute('id', `show-scene${currScene}`);
        }
        // console.log(currScene); 
        console.log('1',enterNScene);
        if(enterNScene) return; //true일 때 함수를 종료해 버리자, return공부 요망
        console.log('1',enterNScene);
        playAnimation();
    }

    window.addEventListener('scroll', () => { // 몇번 째 씬이 화면에 위치해 있는지 확인하기
        yOffset = window.pageYOffset; // 스크롤 위치 알려줌
        scrollLoop();
    });
    window.addEventListener('load', setLayout); // DOMContentloaded도 사용 가능, 얘는 dom객체들만 로딩되면 실행시킴 그래서 더 빠름, load는 이미지같은 애들 다 로딩이 되야 실행됨
    window.addEventListener('resize', setLayout); // 창 크기를 변하면 scrollHeight도 그에 맞게 변하게 하기

})();