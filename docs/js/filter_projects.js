$("#slider-range").slider({
    range: true,
    animate: true,
    min: 1000000,
    max: 5000000,
    values: [1000000, 5000000],
    step: 100000,
    slide: function (event, ui) {
        $("#min_price").val(ui.values[0].toLocaleString("ru"))
        $("#max_price").val(ui.values[1].toLocaleString("ru"))
    }
});

// Создаем переменные для стрелок переклюателей
let leftArrowRoom = $('.roomsArrowMinus'),
    rightArrowRoom = $('.roomsArrowPlus'),
    leftArrowFloor = $('.floorsArrowMinus'),
    rightArrowFloor = $('.floorsArrowPlus')

// Описываем события при нажатии
$("#floorPlus").click(function () {
    let count = $("#floors");
    if (count.val() < 2) {
        count.val(parseInt(count.val()) + 1)
    }
    chooseArrowsFloors(count) // Функция по смене стрелок при определенных условия( условия ниже )
});
$("#floorMinus").click(function () {
    let count = $("#floors");
    if (count.val() <= 1) {
    } else {
        count.val(parseInt(count.val()) - 1)
    }
    chooseArrowsFloors(count) // Функция по смене стрелок при определенных условия( условия ниже )
})
$("#roomsPlus").click(function () {
    let count = $("#rooms");
    if (count.val() < 7) {
        count.val(parseInt(count.val()) + 1)
    }
    chooseArrowsRooms(count) // Функция по смене стрелок при определенных условия( условия ниже )
});
$("#roomsMinus").click(function () {
    let count = $("#rooms");
    if (count.val() <= 1) {
    } else {
        count.val(parseInt(count.val()) - 1)
    }
    chooseArrowsRooms(count) // Функция по смене стрелок при определенных условия( условия ниже )

})

/* Функция по смене стрелок для этажей.
   На входи принимает параметр count в котором позже получает value
   И производит работу с данным значением.
   Сам метод, заменяет стрелки на серый цвет, когда достингуто макс.знач. || мин.значение
 */
function chooseArrowsFloors(count) {
    if (count.val() <= 1) {
        rightArrowFloor.attr('src', "img/left-arrow.svg").css('transform', "rotate(180deg)")
        leftArrowFloor.attr('src', "img/right-arrow-gray.svg").css('transform', "rotate(180deg)")
    } else if (count.val() >= 2){
        rightArrowFloor.attr('src', "img/right-arrow-gray.svg").css('transform', "rotate(0deg)")
        leftArrowFloor.attr('src', "img/left-arrow.svg").css('transform', "rotate(0deg)")
    }
        }
/* Функция по смене стрелок для этажей.
   На входи принимает параметр count в котором позже получает value
   И производит работу с данным значением.
   Сам метод, заменяет стрелки на серый цвет, когда достингуто макс.знач. || мин.значение
   Либо меняет обе стрелки на черный цвет, при промежуточных значениях.
 */
function chooseArrowsRooms(count) {
    if (count.val() <= 1) {
        rightArrowRoom.attr('src', "img/left-arrow.svg").css('transform', "rotate(180deg)")
        leftArrowRoom.attr('src', "img/right-arrow-gray.svg").css('transform', "rotate(180deg)")
    } else if (count.val() > 1 && count.val() < 7) {
        rightArrowRoom.attr('src', "img/left-arrow.svg").css('transform', "rotate(180deg)")
        leftArrowRoom.attr('src', "img/left-arrow.svg").css('transform', "rotate(0deg)")
    } else if (count.val() <= 7) {
        rightArrowRoom.attr('src', "img/right-arrow-gray.svg").css('transform', "rotate(0deg)")
    }
}