const ClASS_LIST = {
   MODAL: 'modal',
   MODAL_ACTIVE: 'modal--active',
   TRIGGER_OPEN: 'modal-open',
   TRIGGER_CLOSE: 'modal-close'
};

const menuButton = document.querySelector('.header-nav-button');
const menuList = document.querySelector('.header-nav-list');

document.addEventListener('click', (event) => {
   if (event.target.closest(`.${ClASS_LIST.TRIGGER_OPEN}`)) {
      event.preventDefault();
      const target = event.target.closest(`.${ClASS_LIST.TRIGGER_OPEN}`);
      const modalId = target.getAttribute('href').replace('#', '');
      const modal = document.getElementById(modalId);

      document.body.style.paddingRight = `${getScrollbarWidth()}px`;
      document.body.style.overflow = 'hidden';

      modal.classList.add(ClASS_LIST.MODAL_ACTIVE);
   }

   if ((event.target.closest(`.${ClASS_LIST.TRIGGER_CLOSE}`) || event.target.classList.contains(ClASS_LIST.MODAL_ACTIVE))) {
      event.preventDefault();
      const modal = event.target.closest(`.${ClASS_LIST.MODAL_ACTIVE}`);
      modal.classList.remove(ClASS_LIST.MODAL_ACTIVE);
      document.body.style.paddingRight = `0`;
      document.body.style.overflow = 'auto';
   }

   if (!event.target.closest(`.header-nav-item`) && (event.target.closest(`.header-nav-button`) || event.target.closest(`.header-nav-list`))) {
      let expanded = menuButton.getAttribute('area-expanded') === true || false;
      menuButton.setAttribute('area-expanded', !expanded);
      menuButton.classList.add('button_close_anim');

      menuList.classList.toggle('list_close_anim');
      menuList.classList.toggle('list_open_anim');

      setTimeout(() => {
         menuButton.classList.toggle('menu-open');
         menuButton.classList.toggle('menu-close');
         menuButton.classList.toggle('header-button_open');
         menuButton.classList.remove('button_close_anim');
      }, 295);

      if (event.target.closest(`.menu-close`)) {
         menuList.classList.add('header-nav-link_open');
         document.body.style.paddingRight = `${getScrollbarWidth()}px`;
         document.body.style.overflow = 'hidden';
      }

      if (event.target.closest(`.menu-open`) || event.target.closest(`.header-nav-list`)) {
         setTimeout(() => {
            menuList.classList.remove('header-nav-link_open');
            document.body.style.paddingRight = `0`;
            document.body.style.overflow = 'auto';
         }, 295);
      }
   }
});

const menuArrow = document.querySelector('.arrow');
if (menuArrow) {
   menuArrow.addEventListener('mouseover', () => {
      menuArrow.classList.add('_active');
   });
   menuArrow.addEventListener('mouseout', () => {
      menuArrow.classList.remove('_active');
   });
   menuArrow.addEventListener('click', () => {
      menuArrow.classList.toggle('_active');
   });
}


const getScrollbarWidth = () => {
   const item = document.createElement('div');
   item.style.position = 'absolute';
   item.style.top = '-9999px';
   item.style.width = '50px';
   item.style.height = '50px';
   item.style.overflow = 'scroll';
   item.style.visibility = 'hidden';

   document.body.appendChild(item);
   const scrollbarWidth = item.offsetWidth - item.clientWidth;
   document.body.removeChild(item);

   return scrollbarWidth;
}