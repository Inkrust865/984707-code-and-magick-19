'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var Wizards = [
  {
    name: WIZARD_NAMES[0] + ' ' + WIZARD_SURNAMES[0],
    coatColor: WIZARD_COAT_COLOR[0],
    eyesColor: WIZARD_EYES_COLOR[0]
  },
  {
    name: WIZARD_NAMES[1] + ' ' + WIZARD_SURNAMES[1],
    coatColor: WIZARD_COAT_COLOR[1],
    eyesColor: WIZARD_EYES_COLOR[1]
  },
  {
    name: WIZARD_NAMES[2] + ' ' + WIZARD_SURNAMES[2],
    coatColor: WIZARD_COAT_COLOR[2],
    eyesColor: WIZARD_EYES_COLOR[2]
  },
  {
    name: WIZARD_NAMES[3] + ' ' + WIZARD_SURNAMES[3],
    coatColor: WIZARD_COAT_COLOR[3],
    eyesColor: WIZARD_EYES_COLOR[3]
  }
];

var randomElement = function (array) {
  return Math.floor(Math.random() * array.length);
};

var randomName = function (wizardNumberName) {
  var indexName = randomElement(WIZARD_NAMES);
  var indexSurname = randomElement(WIZARD_SURNAMES);
  Wizards[wizardNumberName].name = WIZARD_NAMES[indexName] + ' ' + WIZARD_SURNAMES[indexSurname];
  return Wizards[wizardNumberName].name;
};

var randomCoatColor = function (wizardNumberCoat) {
  var indexCoatColor = randomElement(WIZARD_COAT_COLOR);
  Wizards[wizardNumberCoat].coatColor = WIZARD_COAT_COLOR[indexCoatColor];
  return Wizards[wizardNumberCoat].coatColor;
};

var randomEyesColor = function (wizardNumberEyes) {
  var indexEyesColor = randomElement(WIZARD_EYES_COLOR);
  Wizards[wizardNumberEyes].eyesColor = WIZARD_EYES_COLOR[indexEyesColor];
  return Wizards[wizardNumberEyes].eyesColor;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = randomName(wizard);
  wizardElement.querySelector('.wizard-coat').style.fill = randomCoatColor(wizard);
  wizardElement.querySelector('.wizard-eyes').style.fill = randomEyesColor(wizard);

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < Wizards.length; i++) {
  fragment.appendChild(renderWizard(i));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
