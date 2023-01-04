const filter = document.querySelector('.filter_click'),
    filterContent = document.querySelector('.filter_content')

filter.addEventListener('click', () => {
    filterContent.classList.toggle('active')
});

document.getElementById('intro_btn').onclick = function() {
    document.getElementById('main').classList.t('main--main-bg');
  }