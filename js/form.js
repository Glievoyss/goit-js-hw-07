"use strict";
import questionsAll from "./quiz-data.js";

// создаю объект к которому потом за аппенджу новый кусок дерева
const but = document.querySelector(".form-quest"); //Тут живет начало формы
const listQuestionsSection = document.createElement("section"); // сам чек бокс для выбора ответа

const titleTest = document.querySelector(".name-test"); //Название всего теста
titleTest.classList.add("title-quest");
titleTest.textContent = questionsAll.title;
//  but.prepend(titleTest);

// ------------------------------------------------------------------------

questionsAll.questions.forEach((question, indexSec) => {
  createQuestion(question, indexSec);
});

function createQuestion({ question, choices, answer, title }, indexSec) {
  const newQest = document.createElement("section"); //тут живет начало начало секции с конкретным вопросом
  newQest.classList.add("sect-quest");

  const questTitle = document.createElement("h3"); // Текст конкретного вопроса
  questTitle.classList.add("title-quest");
  questTitle.textContent = question;

  newQest.appendChild(questTitle); // присоединяю заголовок с вопросом к секции

  newQest.appendChild(createAnswer(choices, indexSec)); // добавляю к Секции Новую ОЛку с конкретными вопроссами

  listQuestionsSection.appendChild(newQest);
  but.prepend(listQuestionsSection);
}

function createAnswer(newQest, indexSec) {
  const olQest = document.createElement("ol"); // Ол-ка списка ответов
  olQest.classList.add("list-answers");

  newQest.forEach((oneQuest, index) => {
    const liQuest = document.createElement("li"); // тело одного из ответов
    liQuest.classList.add("li-wrap");

    const labelQuest = document.createElement("label"); // Тело для текста одного из ответов
    labelQuest.classList.add("quest");

    const inputQuest = document.createElement("input"); // сам чек бокс для выбора ответа
    inputQuest.type = "radio";
    // даю такое название чекбокса
    inputQuest.name = "chBox" + indexSec;

    inputQuest.value = index + 1; // на еденицу больше так как начинаеться с нуля а ответы начинаются с единицы

    const newText = document.createTextNode(oneQuest); // текс для конкретного чекбокса

    liQuest.appendChild(labelQuest);
    labelQuest.appendChild(inputQuest);
    labelQuest.appendChild(newText);

    olQest.appendChild(liQuest);
  });

  return olQest;
}

// делаю функцию для сбора данных с формы

const handlFormAnaliz = event => {
  event.preventDefault(); // отрубаю отправку что бы выполнить сови действия и обработать форму

  /// --- Это тренировался руками достучаться до конкретного элемента :)
  // console.dir(event.currentTarget.elements.chBox);

  const answerArr = []; // массив в который запушу что выбрано в чекбоксах
  let cauntGoodAnswer = 0; // количество верных ответов

  const formData = new FormData(event.currentTarget); // набиваю массив индексами выбранных чекбоксов
  for (const chBox of formData.entries()) {
    answerArr.push(chBox[1]);
  }

  if (answerArr.length < questionsAll.questions.length) {
    // проверка или все поля заполнены
    alert("Ответте на все вопросы теста");
    return;
  }

  questionsAll.questions.forEach((question, index) => {
    if (question.answer === Number(answerArr[index])) {
      cauntGoodAnswer++;
    }
  });

  // заготовка константы с процентом правильных ответов для вывода сообщения об успешности сдачи теста
  const percentOfcorrectAnswers =
    (cauntGoodAnswer * 100) / questionsAll.questions.length;

  if (percentOfcorrectAnswers < 80) {
    alert(
      `Вы не сдали тест набрав ${Math.round(
        percentOfcorrectAnswers
      )} процентов. (правильных ответов - ${cauntGoodAnswer})`
    );
  } else {
    alert(
      `Вы Cдали тест набрав ${Math.round(
        percentOfcorrectAnswers
      )} процентов. (правильных ответов - ${cauntGoodAnswer})`
    );
  }
};

// вешаю улавливатель собыния на сабмит формы и посылаю калбек с обработчиком события
but.addEventListener("submit", handlFormAnaliz);
