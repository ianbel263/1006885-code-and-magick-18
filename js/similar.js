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

  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === wizardCoatInput.value) {
      rank += 2;
    }
    if (wizard.colorEyes === wizardEyesInput.value) {
      rank += 1;
    }
    // if (wizard.colorFireball === wizardFireballInput.value) {
    //   rank += 1;
    // }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function (loadedArr) {
    wizards = loadedArr;
    window.render.renderSimilarWizard(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var onColorChange = window.debounce(function() {
    updateWizards(wizards);
  });

  var onCoatClick = function (arr, el, input) {
    var i = 1;
    return function () {
      if (i === arr.length) {
        i = 0;
      }
      if (el.tagName === 'DIV') {
        el.style.background = arr[i];
      } else {
        el.style.fill = arr[i];
      }
      input.value = arr[i];
      i++;
      onColorChange();
    };
  };

  wizardCoat.addEventListener('click', onCoatClick(WizardColor.COAT, wizardCoat, wizardCoatInput));
  wizardEyes.addEventListener('click', onCoatClick(WizardColor.EYES, wizardEyes, wizardEyesInput));
  wizardFireball.addEventListener('click', onCoatClick(WizardColor.FIREBALL, wizardFireball, wizardFireballInput));

  window.similar = {
    updateWizards: updateWizards
  };
})();
