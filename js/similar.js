'use strict';

(function () {

  var wizardCoat = window.setup.form.querySelector('.wizard-coat');
  var wizardCoatInput = window.setup.form.querySelector('input[name=coat-color]');
  var wizardEyes = window.setup.form.querySelector('.wizard-eyes');
  var wizardEyesInput = window.setup.form.querySelector('input[name=eyes-color]');
  var wizardFireball = window.setup.form.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = window.setup.form.querySelector('input[name=fireball-color]');

  var WizardColor = {
    COAT: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  window.load.playerWizard.onColorChange = window.debounce(function (color, el) {
    switch (el) {
      case wizardCoat:
        window.load.playerWizard.coatColor = color;
        break;
      case wizardEyes:
        window.load.playerWizard.eyesColor = color;
        break;
      case wizardFireball:
        window.load.playerWizard.fireballColor = color;
        break;
    }

    window.load.updateWizards();
  });

  var onCoatClick = function (arr, el, input) {
    var i = 1;
    return function () {
      if (i === arr.length) {
        i = 0;
      }
      var color = arr[i];
      if (el.tagName === 'DIV') {
        el.style.background = color;
      } else {
        el.style.fill = color;
      }
      input.value = color;
      i++;
      window.load.playerWizard.onColorChange(color, el);
    };
  };

  wizardCoat.addEventListener('click', onCoatClick(WizardColor.COAT, wizardCoat, wizardCoatInput));
  wizardEyes.addEventListener('click', onCoatClick(WizardColor.EYES, wizardEyes, wizardEyesInput));
  wizardFireball.addEventListener('click', onCoatClick(WizardColor.FIREBALL, wizardFireball, wizardFireballInput));
})();
