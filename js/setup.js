'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');


var Wizards = [
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  }
];

var getRandomElement = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getRandomName = function (wizardNumberName) {
  var indexName = getRandomElement(WIZARD_NAMES);
  var indexSurname = getRandomElement(WIZARD_SURNAMES);
  Wizards[wizardNumberName].name = WIZARD_NAMES[indexName] + ' ' + WIZARD_SURNAMES[indexSurname];
  return Wizards[wizardNumberName].name;
};

var getRandomCoatColor = function (wizardNumberCoat) {
  var indexCoatColor = getRandomElement(WIZARD_COAT_COLOR);
  Wizards[wizardNumberCoat].coatColor = WIZARD_COAT_COLOR[indexCoatColor];
  return Wizards[wizardNumberCoat].coatColor;
};

var getRandomEyesColor = function (wizardNumberEyes) {
  var indexEyesColor = getRandomElement(WIZARD_EYES_COLOR);
  Wizards[wizardNumberEyes].eyesColor = WIZARD_EYES_COLOR[indexEyesColor];
  return Wizards[wizardNumberEyes].eyesColor;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = getRandomName(wizard);
  wizardElement.querySelector('.wizard-coat').style.fill = getRandomCoatColor(wizard);
  wizardElement.querySelector('.wizard-eyes').style.fill = getRandomEyesColor(wizard);

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < Wizards.length; i++) {
  fragment.appendChild(renderWizard(i));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
