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

// Connect to Firebase DB
// *
// * Read / Write Achievements
// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

//https://firebase.google.com/docs/database/web/start
//We need to import these functions for Realtime database:
import {
    getDatabase,
    ref,
    child,
    get,
    push,
    update,
    increment,
    set,
    onValue,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js"; //must use the firebase-database.js for these imports


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAMq2RG25OkegLnKAUQ7F4QrH244xEITfg",
    authDomain: "mathchievements.firebaseapp.com",
    databaseURL: "https://mathchievements-default-rtdb.firebaseio.com",
    projectId: "mathchievements",
    storageBucket: "mathchievements.firebasestorage.app",
    messagingSenderId: "504313860284",
    appId: "1:504313860284:web:c50d168db44a32517a00b9"
    // measurementId: "G-R57DDH1DG3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase();

  const users = ref(database, "/users");
  const achievements = ref(database, "/achievements");
  const user_has = ref(database, "/users/1/achievements_got");

  //Every time users is referenced, the following will run:
  onValue(users, (snapshot) => {

    snapshot.forEach((childSnapshot) => { // for every existing user...
        const childData = childSnapshot.val();
        const username = childData.name;
        const ach_got = childData.achievements_got;
        const logged_in = childData.logged_in;

        console.log(logged_in);
        console.log(ach_got);
        console.log(username);
    });
  });

  //Every time achievements is referenced, the following will run:
  onValue(achievements, (snapshot) => {

    $("#logList").children().replaceWith() // replace the contents of achievement list

    snapshot.forEach((childSnapshot) => { // for every existing achievement...

        const childData = childSnapshot.val();
        const achDescription = childData.description;
        const achName = childData.name;
        const achCount = childData.count;
        // console.log(achDescription);


        $("#logList").append(`<li class="achievement">
            <span class="achName">${achName}</span>: 
            <span class="achCount">${achCount}</span>
            <br> 
            <span class="achDesc">${achDescription}</span></li>`);
    });
  });

// Create an achievement module system, and import the achievements here.
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
  var solve_count = 0;
  var solve_type;
  var add_count = 0;
  var sub_count = 0;
  var mlt_count = 0;
  var div_count = 0;

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
    } 
    catch {
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

    //Set solve_type
    solve_type = 'add';

    //Clear & focus the input field:
    $('#userInput').val('');
    // $('#userInput').focus();

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

    //Set solve_type
    solve_type = 'sub';

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

    //Set solve_type
    solve_type = 'mlt';

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

    //Set solve_type
    solve_type = 'div';

    //Clear & focus the input field:
    $('#userInput').val('');
    $('#userInput').focus();

    //Choose a number as the dividend
    var num1 = Math.floor((Math.random()*13));
    
    //Choose the divisor based on the dividend
    var num2 = generateNum2(num1);

    //Create a function for a perfect divisor
    function generateNum2(x) {
      let y = Math.floor(Math.random()*13) + 1;
      //When it doesn't divide perfectly, try and fit the biggest 
      if (x % y) {
        console.log("for loop! :)");
        for (let i=6; i>0; i--) {
          if (x % i == 0) {
            y = i;
            break;
          }
        }
      }
      return y;
    }

    //Update the operator div:
    $('.operator').html('÷');
    
    //Edit the num divs to display the equation:
    $('.num1').html(`${num1}`);
    $('.num2').html(`${num2}`);

    //Compute and save the expected result:
    answer = num1 / num2;

    // remainder = num1 % num2;

    console.log(answer);
    // console.log("remainder: " + remainder);
  }


  //Receive input from the question Form:
  $('#qForm').on('submit', function(e) {
    //Prevent the default of sending page
    // to the form action
    e.preventDefault();

    //Compare user input with answer
    var userInput = $('#userInput').val();
    // console.log(userInput);
    
    //If the answer was CORRECT
    if (userInput == answer) {
      //Count it!
      solve_count++;
      updateSolveCount(fire_solve_count);
      switch(solve_type) {
        case 'add':
          add_count++;
          updateSolveCount(fire_add_count);
          console.log(add_count + "additions have been done");
          break;
        case 'sub':
          sub_count++;
          updateSolveCount(fire_sub_count);
          console.log(sub_count + "subtractions");
          break;
        case 'mlt':
          mlt_count++;
          updateSolveCount(fire_mlt_count);
          console.log(mlt_count + "multiplications");
          break;
        case 'div':
          div_count++;
          updateSolveCount(fire_div_count);
          console.log(div_count + "divisions");
          break;
        default:
          console.log('something went wrong');
          break;
      }
      console.log("Correct!");
      animCorrect('#userInput');
      // Refresh the equation when correct:
      setTimeout(() => {setSelect()}, 500);
    } 
    //If the answer was INCORRECT
    else {
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
      case "NEW":
        setSelect();
        break;
      default:
        $('#userInput').val($('#userInput').val() + `${id}`);
        break;
    }
  }

  //Firebase ref paths
  const fire_solve_count = ref(database, '/achievements/1');
  const fire_add_count = ref(database, '/achievements/2');
  const fire_sub_count = ref(database, '/achievements/3');
  const fire_mlt_count = ref(database, '/achievements/4');
  const fire_div_count = ref(database, '/achievements/5');


  //Post to Firebase
  function updateSolveCount(countPath) {

  const updates = {
  "count": increment(1)
  };

  return update(countPath, updates);

  };

});
