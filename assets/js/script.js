// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.

$(function () {
    let currentDayEl = $("#currentDay");
    let timeBlocksEl = $(".time-block");
    let saveBtnsEl = $(".saveBtn");

    // Displays current date in the header
    function displayCurrentDate() {
        let currentDate = dayjs().format('dddd - MMMM DD, YYYY');
        currentDayEl.text(currentDate);
    }

    // Applies past, present, or future class to each time block based on the current hour
    function applyTimeBlockClasses() {
        let currentHour = dayjs().hour();
        console.log(currentHour);

        timeBlocksEl.each(function () {
            let hour = JSON.parse($(this).attr('id').split('-')[1]);
            console.log(hour);

            if (hour < currentHour) {
                $(this).addClass("past");
            } else if (hour === currentHour) {
                $(this).addClass("present");
                $(this).removeClass("past");
            } else {
                $(this).addClass("future");
                $(this).removeClass("past");
                $(this).removeClass("present");
            }
        });
    }

    // Save user input in local storage
    function saveEvent() {
        let hour = $(this).parent().attr("id");
        let description = $(this).siblings(".description").val();

        localStorage.setItem(hour, description);
    }

    // for (let i = 9; i < 18; i++) {
    //     $(`#hour-${i} textarea`).val(localStorage.getItem(`hour-${i}`));
    // }
    // this is used hard code text entries - not used in the app

    // Load saved events from local storage and set the values of the corresponding textarea elements
    function loadEvents() {
        timeBlocksEl.each(function () {
            let hour = $(this).attr("id");
            let description = localStorage.getItem(hour);

            $(this).find(".description").val(description);
        });
    }

    // click event listener to save buttons
    saveBtnsEl.on("click", saveEvent);

    // Display current date
    displayCurrentDate();

    // Apply time block classes
    applyTimeBlockClasses();

    // Load saved events
    loadEvents();
});
