'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getRandomName = function (wizardIndex) {
  var indexName = getRandomIndex(WIZARD_NAMES);
  var indexSurname = getRandomIndex(WIZARD_SURNAMES);
  Wizards[wizardIndex].name = WIZARD_NAMES[indexName] + ' ' + WIZARD_SURNAMES[indexSurname];
  return Wizards[wizardIndex].name;
};

var getRandomCoatColor = function (wizardIndex) {
  var indexCoatColor = getRandomIndex(WIZARD_COAT_COLOR);
  Wizards[wizardIndex].coatColor = WIZARD_COAT_COLOR[indexCoatColor];
  return Wizards[wizardIndex].coatColor;
};

var getRandomEyesColor = function (wizardIndex) {
  var indexEyesColor = getRandomIndex(WIZARD_EYES_COLOR);
  Wizards[wizardIndex].eyesColor = WIZARD_EYES_COLOR[indexEyesColor];
  return Wizards[wizardIndex].eyesColor;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = getRandomName(wizard);
  wizardElement.querySelector('.wizard-coat').style.fill = getRandomCoatColor(wizard);
  wizardElement.querySelector('.wizard-eyes').style.fill = getRandomEyesColor(wizard);

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < WIZARDS_COUNT; i++) {
  var Wizards = [];
  Wizards[i] = {};
  fragment.appendChild(renderWizard(i));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
