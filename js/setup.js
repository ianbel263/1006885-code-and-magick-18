'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');
var similarList = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var MOCK = {
  name: {
    firstName: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    surName: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
  },
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
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

renderWizardsList(generateData());
