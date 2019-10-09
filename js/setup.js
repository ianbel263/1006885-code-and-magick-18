'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.render.setup.querySelector('.setup-close');
  var form = window.render.setup.querySelector('form');
  var userNameInput = form.querySelector('input[name=username]');
  var wizardCoat = form.querySelector('.wizard-coat');
  var wizardCoatInput = form.querySelector('input[name=coat-color]');
  var wizardEyes = form.querySelector('.wizard-eyes');
  var wizardEyesInput = form.querySelector('input[name=eyes-color]');
  var wizardFireball = form.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = form.querySelector('input[name=fireball-color]');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (evt.target === userNameInput) {
        evt.stopPropagation();
      } else {
        closePopup();
      }
    }
  };

  var openPopup = function () {
    window.render.setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };
  var closePopup = function () {
    window.render.setup.removeAttribute('style');
    window.render.setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var changeColorByClick = function (blockName, input, arr) {
    var index = 1;
    blockName.addEventListener('click', function () {
      if (index > arr.length - 1) {
        index = 0;
      }
      if (blockName.tagName === 'DIV') {
        blockName.style.background = arr[index];
      } else {
        blockName.style.fill = arr[index];
      }
      input.value = arr[index];
      index++;
    });
  };

  var MOCK = {
    name: {
      firstName: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
      surName: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
    },
    colorCoat: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    colorEyes: ['black', 'red', 'blue', 'yellow', 'green'],
    colorFireball: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      closePopup();
    }, window.load.onXhrError);
  });

  changeColorByClick(wizardCoat, wizardCoatInput, MOCK.colorCoat);
  changeColorByClick(wizardEyes, wizardEyesInput, MOCK.colorEyes);
  changeColorByClick(wizardFireball, wizardFireballInput, MOCK.colorFireball);
})();
