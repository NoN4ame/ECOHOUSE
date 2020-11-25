//Функция валидации
function validation(event) {
    // Регулярные выражения для валидации имени и номера телефона
    let regexp_name = /^[a-zа-яё]+/gi,
        regexp_phone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/

    // Сохраняем в переменных необходимые элементы DOM'а
    let name = document.getElementsByName('name').value,
        phone = document.getElementsByName('phone').value,
        check = document.getElementById('check').checked,
        check2 = document.getElementById('agree').checked

    // Условия при которых будет происходить валидация
    if ((regexp_name.test(name) !== true)
        || (regexp_phone.test(phone) !== true)){
        document.getElementById('name').className = 'error_val';
        document.getElementById('phone').className = 'error_val';
        event.preventDefault()
    } else if (check !== true) {
        alert('Необходимо принять пользовательское соглашение')
        event.preventDefault()
    } else {event.addEventListener('submit')}

    //Условия для второй формы валидации (после блок Партнеры)

}
document.querySelector('.feedBack__btn').addEventListener('click', validation);
