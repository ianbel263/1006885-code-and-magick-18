'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_WIZARDS = 4;
var wizards = [];

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');
var similarList = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var Arr = function (arr) {
  var Obj = function (name, coatColor, eyesColor) {
    this.name = name;
    this.coatColor = coatColor;
    this.eyesColor = eyesColor;
  };

  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    var wizardName = WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length)];
    var wizardSurname = WIZARD_SURNAMES[getRandomInt(0, WIZARD_SURNAMES.length)];
    var wizardCoatColor = WIZARD_COAT_COLORS[getRandomInt(0, WIZARD_COAT_COLORS.length)];
    var wizardEyesColor = WIZARD_EYES_COLORS[getRandomInt(0, WIZARD_EYES_COLORS.length)];

    if (getRandomInt(0, 2) === 1) {
      var wizardFullname = wizardName + ' ' + wizardSurname;
    } else {
      wizardFullname = wizardSurname + ' ' + wizardName;
    }

    arr[i] = new Obj(wizardFullname, wizardCoatColor, wizardEyesColor);
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

renderWizardsList(new Arr(wizards));
