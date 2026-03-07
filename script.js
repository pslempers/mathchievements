// SCRIPT FOR MY FINAL PROJECT DEMO
// This is the main script.

// Project Demo Name:
// Arithmetic Acheivement
//
// Goal of the Game:
// Work on your math skills!
// -- if you feel like you were faster at math in high school, 
// -- it's because you were! Just get back to drilling it.
// To gamify drilling arithmetics, let's add TONS of ACHIEVEMENTS!

// Create an achievement module system, and import the achivements here.
// In the module, create an achievement class.
// Every achievement should be built off this class.
// Achievements will be built as objects with certain parameters.


// On Window Load, do the following...
//Listen for window load the jQuery way
$(document).ready(function () {

    //Testing animations with h1;
    $('h1').click(() => {
        //Animation functions defined at the bottom.
        animCorrect('h1');
    })

    //Define global variables:
    var answer;
    var remainder;

    //Create Start Button:
    $('#startBtn').click(() => {
        //Ensure a set was selected to begin with
        if ($('.selected').length > 0) {
            
            //Focus the input field
            $('#userInput').focus();
            //run the setSelect() function to display an equation
            setSelect();

            //Hide the Start Button and Intro Msg divs
            $('#startBtn').hide();
            $('.introMsg').hide();
            //Display the equation div:
            $('.equation').css('display', 'inline-grid');
            //Display the equals(submit) button and the number scroller
            $('#equals').css('display', 'flex');
            $('#userInput').css('display', 'flex');
        }
        //else, prompt user to select a set
        else {
            $('.introMsg').html('<h2>Select Set</h2>');
            animIncorrect('.introMsg');
            animCorrect('.sets');
        }
    });

    //Menu for Sets
    $(".set").click(function() {
        $(this).toggleClass("selected");
    });

    //Create Set Selection Program:
    //Which sets contain the "selected" class?
    function setSelect() {
        var selectedSets = $(".set.selected");
        let chosen = Math.floor((Math.random()*(selectedSets.length)));
        try {
            switch(selectedSets[chosen].id) {
                case 'addSet':
                    addEquation();
                    break;
                case 'subSet':
                    subEquation();
                    break;
                case 'mltSet':
                    mltEquation();
                    break;
                case 'divSet':
                    divEquation();
                    break;
                default:
                    console.log("something went wrong");
                    break;
            }
        } catch {
            console.log("no set selected");

            //Hide the Equals Button and Number Scroller
            $('#equals').hide();
            $('#userInput').hide();
            //Hide the equation div:
            $('.equation').hide();
            //Display the Start Button and Intro Msg div
            $('#startBtn').css('display', 'flex');
            $('.introMsg').css('display', 'flex');
        }
    }


    //Random addition equation builder:
    function addEquation() {

        //Clear & focus the input field:
        $('#userInput').val('');
        $('#userInput').focus();

        //First choose a number:
        var num1 = Math.floor((Math.random()*13));
        
        //Choose a second number:
        var num2 = Math.floor((Math.random()*13));

        //Update the operator div:
        $('.operator').html('+');
        
        //Edit the num divs to display the equation:
        $('.num1').html(`${num1}`);
        $('.num2').html(`${num2}`);
        
        //Compute and save the expected result:
        answer = num1 + num2;

        //Log the expected result to test:
        console.log(answer)

    }
    //Random subtraction equation builder:
    function subEquation() {

        //Clear & focus the input field:
        $('#userInput').val('');
        $('#userInput').focus();

        //First choose a number:
        var num1 = Math.floor((Math.random()*13));
        
        //Choose a second number:
        var num2 = Math.floor((Math.random()*13));

        //Update the operator div:
        $('.operator').html('-');
        
        //Edit the num divs to display the equation:
        $('.num1').html(`${num1}`);
        $('.num2').html(`${num2}`);
        
        //Compute and save the expected result:
        answer = num1 - num2;

    }
    //Random multiplication equation builder:
    function mltEquation() {

        //Clear & focus the input field:
        $('#userInput').val('');
        $('#userInput').focus();

        //First choose a number:
        var num1 = Math.floor((Math.random()*13));
        
        //Choose a second number:
        var num2 = Math.floor((Math.random()*13));

        //Update the operator div:
        $('.operator').html('x');
        
        //Edit the num divs to display the equation:
        $('.num1').html(`${num1}`);
        $('.num2').html(`${num2}`);
        
        //Compute and save the expected result:
        answer = num1 * num2;

    }
    //Random division equation builder:
    function divEquation() {

        //Clear & focus the input field:
        $('#userInput').val('');
        $('#userInput').focus();

        //First choose a number:
        var num1 = Math.floor((Math.random()*13));
        
        //Choose a second number:
        var num2 = Math.floor((Math.random()*12)) + 1; // Never allow 0.

        //Update the operator div:
        $('.operator').html('÷');
        
        //Edit the num divs to display the equation:
        $('.num1').html(`${num1}`);
        $('.num2').html(`${num2}`);

        //Compute and save the expected result:
        answer = Math.trunc(num1 / num2);

        remainder = num1 % num2;



        console.log(answer);
        console.log("remainder: " + remainder);
    }

    //Receive input from the question Form:
    $('#qForm').on('submit', function(e) {
        //Prevent the default of sending page
        // to the form action
        e.preventDefault();

        //Compare user input with answer
        var userInput = $('#userInput').val();
        console.log(userInput);
        
        if (userInput == answer) {
            console.log("Correct!");
            animCorrect('#userInput');
            // Refresh the equation when correct:
            setTimeout(() => {setSelect()}, 500);
        } else {
            console.log("False.");
            animIncorrect('#userInput');
        }
    })


    //ANIMATION FUNCTIONS

    /**animCorrect()
     * applies the .correct class and animation, for 1000ms.
     * @param {string} selector 
     */
    function animCorrect(selector) {
        $(selector).addClass('correct');
        setTimeout(() => {$(selector).removeClass('correct')}, 1000);
    }

    /**animIncorrect()
     * applies the .incorrect class and animation, for 1000ms.
     * @param {string} selector 
     */
    function animIncorrect(selector) {
        $(selector).addClass('incorrect');
        setTimeout(() => {$(selector).removeClass('incorrect')}, 1000);
    }

    //NUMPAD FUNCTIONALITY
    // Function on button click puts the number into the scroller.
    $('.numKey').on('click', (e) => {
        // console.log(e.currentTarget.value);
        addNum(e.currentTarget.value);
        // console.log($('#userInput').val());
    })

    /** addNum(id)
     * pushes values selected by id into the scroller element.
     * @param {} id - Numeric input allowing 0-9, dashes and dots.
     */
    function addNum(id) {
        let currentVal = $('#userInput').val();
        switch(id) {
            case "ENT":
                if($('.selected').length > 0){
                    $('#qForm').submit();
                }
                break;
            case "C":
                $('#userInput').val('');
                break;
            case "-":
                $('#userInput').val("-"+currentVal);
                break;
            case "?":
                setSelect();
                break;
            default:
                $('#userInput').val($('#userInput').val() + `${id}`);
                break;
        }
    }

    //Add some achievements later
    
});
