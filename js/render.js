'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var similar = setup.querySelector('.setup-similar');
  var similarList = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderSimilarWizard = function (arr) {
    similarList.innerHTML = '';
    var sizeArr = (arr.length > 4) ? 4 : arr.length;
    for (var i = 0; i < sizeArr; i++) {
      similarList.appendChild(renderWizard(arr[i]));
    }
    similar.classList.remove('hidden');
  };

  window.render = {
    setup: setup,
    renderSimilarWizard: renderSimilarWizard
  };
})();
