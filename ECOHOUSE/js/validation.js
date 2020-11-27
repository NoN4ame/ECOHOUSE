//Функция валидации
// Регулярные выражения для валидации имени и номера телефона
let regexp_name = /^[a-zа-яё]+/gi,
    regexp_phone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
function validation(event) {
    // Сохраняем в переменных необходимые элементы DOM'а
    let name = document.getElementsByName('name')[0].value,
        phone = document.getElementsByName('phone')[0].value,
        check = document.getElementById('check').checked

    // Условия при которых будет происходить валидация
    if ((regexp_name.test(name) !== true)
        || (regexp_phone.test(phone) !== true)
        || phone.length <= 10 ){
        document.getElementById('name').className = 'error_val';
        document.getElementById('phone').className = 'error_val';
        event.preventDefault()
    } else if (check !== true) {
        alert('Необходимо принять пользовательское соглашение')
        event.preventDefault()
    } else {event.addEventListener('submit')}


}
function validation2(event) {
    // Сохраняем в переменных необходимые элементы DOM'а
    let name2 = document.getElementsByName('name2')[0].value,
        phone2 = document.getElementsByName('phone2')[0].value,
        check2 = document.getElementById('agree').checked

    // Условия при которых будет происходить валидация
    if ((regexp_name.test(name2) !== true)
        || (regexp_phone.test(phone2) !== true)
        || phone2.length <= 10){
        document.getElementById('name2').className = 'error_val';
        document.getElementById('phone2').className = 'error_val';
        event.preventDefault()
    } else if (check2 !== true) {
        alert('Необходимо принять пользовательское соглашение')
        event.preventDefault()
    } else {event.addEventListener('submit')}
}
// Вызов функции для всплывающего окна обратной связи
document.querySelector('.feedBack__btn').addEventListener('click', validation);
// Вызов функции для блока "Оставить заявку на экскурсию" на главной странице
document.querySelector('.main__content__form__btn').addEventListener('click', validation2);
