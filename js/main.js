const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});
 

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // 배지 숨기기
    // gsap.to(요소, 지속시간(초), 옵션); // 여기서 옵션은 객체 데이터
    gsap.to(badgeEl, 0.6, {
      opacity: 0,
      display: 'none'
    });
    // 최상단 가는 버튼 보이기!
    gsap.to(toTopEl, 0.2, {   
      x: 0       // x축으로 0 (원래 위치)
    });
  } else {
    // 배지 보이기
    gsap.to(badgeEl, 0.6, {
      opacity: 1,
      display: 'block'
    });
    // 최상단 가는 버튼 숨기기!  ,  
    gsap.to(toTopEl, 0.2, {
      x: 100       // x축으로 100px
    });
  }
}, 300));
// ._throttle(함수, 시간)

toTopEl.addEventListener('click', function() {
  gsap.to(window, 0.7, {    // window객체는 출력되는 화면 자체를 의미함
    scrollTo: 0     // scrollTo 옵션을 사용하기 위해 ScrollToPlugin 을 가져온 것
  });    
});


const fadeEls = document.querySelectorAll('.visual .fade-in'); //'' 전부 찾음
fadeEls.forEach(function (fadeEl, index) { // 요소를 지칭하는 fadEl, index는 0부터시작
  // gsap.to(요소, 지속시간(초), 옵션);
  gsap.to(fadeEl, 1, {
    delay: (index + 1)*0.7, // 0.7 , 1.4, 2.1, 2.8
    opacity: 1
  });
});

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true     // 4번째 요소 이후 1번째 요소 나올 수 있도록 무한 루프
});
new Swiper('.promotion .swiper-container', {
  // direction: 'horizontal' 이 기본 값으로 들어가 있음
  slidesPerView: 3,  // 한번에 보여줄 슬라이스 개수
  spaceBetween: 10,  // 슬라이스 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,  // 요소 무한루프
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true  // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});




const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    // 숨김 처리
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리
    promotionEl.classList.remove('hide');
  }
});


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}


function floatingObject(selector, delay, size) {
  //gsap.to(요소, 지속시간, 옵션);
  gsap.to(
    selector,  // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    {  // 옵션
      y: size,       // y축으로 20px
      repeat: -1,   // 무한반복
      yoyo: true,   // 한번 재생된 애니메이션을 다시 뒤로 애니메이션
      ease: Power1.easeInOut,
      delay: random(0, delay)
  })
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);


const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({          // Scene : 특정한 요소를 감시하는 옵션을 지정하는 메소드
      triggerElement: spyEl,  // 보여짐 여부를 감시할 요소를 지정
      triggerHook: 0.8
    })
    .setClassToggle(spyEl, 'show') // 감시할 요소, 넣을 클래스
    .addTo(new ScrollMagic.Controller());     
});


const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();  // Date객체에서 년도 가져오기