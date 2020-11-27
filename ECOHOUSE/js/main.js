$(document).ready(function () {
    //Функция переключения картинок
    const $links = $('.about-project__gallery__small ul li > a ') //ссылки на маленькие картинки
    let img = []; // Пустой массив(хранилище) с индексом картинок
    let smallImg = $('.about-project__gallery__small ul li') //Путь до наших картинок

    $links.click(function (e) {
        $('.about-project__gallery__big > img').attr('src', $(this).attr('href'))
        e.preventDefault()
    })
    //

    //Счет галлереи
    smallImg.each(function () { // Перебираем наши эл-ты с картинками и пушим их в массив img
        img.push($(this).index())
    }).click(function () { //Выводит номер картинки, по которой был совершен клик
        $('.photo-number').html(`<p>0${$(this).index() + 1} <span>/0${img.length}</span></p>`)
    });

    // Работа кнопок
    let currentIndex = null; //индекс ставится в 0
    function setActiveImage(index) { //Функция которая отслеживает номер картинки и подменяет ее на выбранную
        currentIndex = (index + $links.length) % $links.length; //Получаем индекс текущей картинки
        $('.about-project__gallery__big img').attr('src', $links.eq(currentIndex).attr('href'));  //Подменяем src большой картинки
        //Отрисовываем html
        $('.photo-number').html(`<p>0${currentIndex + 1} <span>/0${$links.length}</span></p>`); // Выводим полученные значения в html
    }

    //функция позволяющая продолжать отсчет, после клика по картинке вне очередности
    $links.click(function (e) {
        e.preventDefault();
        setActiveImage($links.index(this));
    });

    $('#prev').click(() => setActiveImage(currentIndex - 1)); // Переключатель назад
    $('#next').click(() => setActiveImage(currentIndex + 1)); // Переключатель вперед
    setActiveImage(0);
    //////////////////////////////////////////////////////////////////////////////////////////////

    //Сортировка
    let elem = $(".main__content__found__house"); //Блок с сортируемыми элементами
    $("#sort").on('click', function () {
        if ($("#sort").val() === 'price') {
            return elem.sort((a, b) => a.dataset.price - b.dataset.price).appendTo($('.main__content__found'));
        } else if ($("#sort").val() === 'room') {
            return elem.sort((a, b) => a.dataset.room - b.dataset.room).appendTo($('.main__content__found'));
        } else if ($("#sort").val() === 'floor') {
            return elem.sort((a, b) => a.dataset.floor - b.dataset.floor).appendTo($('.main__content__found'));
        }
    })

    //Фильтр категории
    $('.filter-projects__param__left ul li:first').off('click')
    $('.filter-projects__param__left ul li').click(function () {
        $('.filter-projects__param__left ul li').removeClass('active')
        $(this).addClass('active')
    })
    //Отмена всех стилей фильтрации
    $('.filter-projects__param__left__button-reset').click(function () {
        $('.filter-projects__param__left ul li').removeClass('active')
    })
    //Логика работы по категориям
    let search = $('[data-filter]')
    search.on('click', function () {
        let cat = $(this).data('filter');
        //Сброс фильтра
        if (cat === 'сброс') {
            $('[data-cat]').removeClass('hide','active')
            //Сбрасываем кол-во проектов
            $(".main__content__sortBy__right__sortResult").html(`${allProjects} проектов`)
        }
    })
    //Отрисовка кол-ва проектов
    let allProjects = $('.main__content__found__house').length
    $(".main__content__sortBy__right__sortResult").html(`${allProjects} проектов`)
    ////

    // Работа фильтрации по нажатию
    let submit = $("[data-submit]");
    submit.on("click", function (e) {
        let roomSearch = parseInt($("#rooms").val()); // Получаем значение комнат и меняем тип на number
        let floor = parseInt($("#floors").val()); // Получаем значение этажей и меняем тип на number
        if ($(".filter-projects__param__left > ul > li").hasClass('active')) { // Проверяем выбрана ли категория
            $("[data-room][data-floor][data-price][data-cat]").each(function () { // Перебираем все дата атрибуты
                let roomHave = $(this).data("room"); // Значение атрибута комнат
                let floorsHave = $(this).data("floor"); // Значение атрибута этажей
                let priceHave = $(this).data("price"); // Значение атрибута цены
                let cat = $(this).data('cat'); // Значение атрибута категории
                let category = $('.filter-projects__param__left > ul > li.active').html() // Получаем значение эл-та у которого класс active
                let maxPrice = parseInt($('#max_price').val().replace(/\s/g, '')); // Делаем пробелы между разрядами
                let minPrice = parseInt($('#min_price').val().replace(/\s/g, '')); // и преобразуем в number для сравнения
                if (roomHave === roomSearch && floorsHave === floor // Сравниваем значения дата атрибутов и значения в инпутах
                    && (priceHave > minPrice && priceHave < maxPrice)
                    && (cat === category)) {
                    $(this).removeClass("hide"); // Если все сравнения дают true рендерим карточки товара(удаляем класс hide)
                } else $(this).addClass("hide")  // Если хоть одно значение дает false скрываем карточки не подходящие по
            })                                   // критерия поиска( добавляем класс hide)

        } else alert('Выберете категорию')     //Если категорию не выбрана, выводим сообщение об этом
        // Отрисовка отфильтрованного кол-ва проектов
        let hideProjects = $('.main__content__found > .hide').length,
            difference = allProjects - hideProjects, // Высчитываем разность между всеми проектами и скрытыми проектами
            message = $(".main__content__sortBy__right__sortResult")
        if (difference === 0) {
            message.html(`${difference} проектов`)
        } else if (difference === 1){
            message.html(`${difference} проект`)
        } else if (difference <= 4) {
            message.html(`${difference} проекта`)
        } else if (difference <= 20) {
            message.html(`${difference} проектов`)
        }

    });

    // Создаем переменную для класса карусели и настраиваем плагин
    let owl = $(".owl-carousel");
    let owl2 = $(".owl-carousel-second")
    let slide1 = $("#slide1"); //1 лента "Комплектация до 2 000 000"
    let slide2 = $("#slide2"); //2 лента "Комплектация до 2 500 000"
    let slide3 = $("#slide3"); //3 лента "Комплектация до 3 000 000"
    //Настройки карусели
    owl.owlCarousel({
        loop: true,
        margin: 128,
        mouseDrag: false,
        nav: false,
        dots: false
    });
    owl2.owlCarousel({
        animateIn: 'animate__fadeIn',
        animateOut: 'animate__fadeOut',
        mouseDrag: false,
        margin: 1225,
        items: 1,
    });

    // Функция карусели и описание
    // а - контейнер который будет прокручиваться
    // b - стрелка прокрутки назад
    // c - стрелка прокрутки вперед
    function toggle(a, b, c) {
        b.click(function () {
            a.trigger('prev.owl.carousel')
        })
        c.click(function () {
            a.trigger('next.owl.carousel')
        })
    }


    // Вызываем функцию карусели, с необходимыми параметрами
    toggle(slide1, $('.owl-prev'), $('.owl-next'))
    toggle(slide2, $('.owl-prev2'), $('.owl-next2'))
    toggle(slide3, $('.owl-prev3'), $('.owl-next3'))
    toggle(owl2, $('.right_nav'), $('.left_nav'))
    // Удаление встроенных классов(Стрелки навигации и точки навигации)
    $(".owl-nav,.owl-dots").remove()
})
    // Функции для формы обратной связи
    function feedBack() {
        $('.feedBack').css('display', 'block')
        $('.container,.container2').css({
            "-webkit-backdrop-filter": "blur(10px)",
            "filter": "blur(10px)",
            "filter-color": "#ffffff80"
        })
    }

    // Функция закрытия формы обратной связи
    function closeForm() {
        $('.feedBack').css('display', 'none')
        $('.container,.container2').css('filter', 'none')
    }


