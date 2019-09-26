'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var form = setup.querySelector('form');
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
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
var closePopup = function () {
  setup.classList.add('hidden');
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

var similarList = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var MOCK = {
  name: {
    firstName: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    surName: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
  },
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green'],
  fireballColor: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};
var NUMBER_OF_WIZARDS = 4;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateData = function () {
  var arr = [];
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {

    if (getRandomInt(0, 1) === 0) {
      var fullName = MOCK.name.firstName[getRandomInt(0, MOCK.name.firstName.length - 1)] + ' ' + MOCK.name.surName[getRandomInt(0, MOCK.name.surName.length - 1)];
    } else {
      fullName = MOCK.name.surName[getRandomInt(0, MOCK.name.surName.length - 1)] + ' ' + MOCK.name.firstName[getRandomInt(0, MOCK.name.firstName.length - 1)];
    }

    arr[i] = {
      name: fullName,
      coatColor: MOCK.coatColor[getRandomInt(0, MOCK.coatColor.length - 1)],
      eyesColor: MOCK.coatColor[getRandomInt(0, MOCK.eyesColor.length - 1)]
    };
  }
  return arr;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizardsList = function (arr) {

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }

  similarList.appendChild(fragment);
  setup.querySelector('.setup-similar').classList.remove('hidden');
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

renderWizardsList(generateData());

changeColorByClick(wizardCoat, wizardCoatInput, MOCK.coatColor);
changeColorByClick(wizardEyes, wizardEyesInput, MOCK.eyesColor);
changeColorByClick(wizardFireball, wizardFireballInput, MOCK.fireballColor);
