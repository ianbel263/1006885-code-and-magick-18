'use strict';

(function () {
  var wizards = [];

  var playerWizard = {
    coatColor: '',
    eyesColor: '',
    fireballColor: '',
    onColorChange: function (color, el) {}
  }

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === playerWizard.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === playerWizard.eyesColor) {
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

  var updateWizards = function () {
    window.render.renderSimilarWizard(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var onXhrLoad = function (arr) {
    wizards = arr;
    updateWizards();
  };

  var onXhrError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

    window.backend.load(onXhrLoad, onXhrError);

    window.load = {
      wizards: wizards,
      playerWizard: playerWizard,
      updateWizards: updateWizards,
      onXhrError: onXhrError
    }
})();
