// Variables //
var oneDarkTheme = true;
var wholeNumbersOnly = true;
var randomRange = document.getElementById('random_range');
var numberValues = [];

// Scripts //
document.getElementById('num1').addEventListener("keydown", function(e) {
  if (e.keyCode === 13) {
    document.getElementById('num2').select();
  }
});
document.getElementById('num2').addEventListener("keydown", function(e) {
  if (e.keyCode === 13) {
    submitNumbers();
  }
})
document.getElementById('date').innerHTML = getDate();

// Functions //
function getDate() {
  var currentDate = new Date();
  return currentDate;
}
function numberCheck(e) {
  if (e !== "") {
      if (wholeNumbersOnly) {
        e = parseInt(Math.round(parseFloat(e)));
      } else {
        e = parseFloat(e);
      }
      return e;
  } else {
    return e;
  }
}
function changeTheme() {
  if (oneDarkTheme) {
    oneDarkTheme = false;
  } else {
    oneDarkTheme = true;
  }
  setTheme();
}
function setTheme() {
  if (oneDarkTheme) {
    var styleVar = document.querySelector(':root').style;
    styleVar.setProperty('--backgroundColour', '#181a1f');
    styleVar.setProperty('--borderColour', '#181a1f');
    styleVar.setProperty('--midgroundColour', '#21252b');
    styleVar.setProperty('--midgroundColourAlt', '#3a3f4b');
    styleVar.setProperty('--foregroundColor', '#282c34');
    styleVar.setProperty('--foregroundColorAlt', '#323641');
    styleVar.setProperty('--foregroundColorAlt2', '#3e4451');
    styleVar.setProperty('--fontColour', '#abb2bf');
    styleVar.setProperty('--fontColourAlt', '#4b5263');
    styleVar.setProperty('--fontColourAlt2', '#767c86');
    styleVar.setProperty('--fontColourAlt3', 'white');
  } else {
    var styleVar = document.querySelector(':root').style;
    styleVar.setProperty('--backgroundColour', '#dbdbdc');
    styleVar.setProperty('--borderColour', '#dbdbdc');
    styleVar.setProperty('--midgroundColour', '#eaeaeb');
    styleVar.setProperty('--midgroundColourAlt', '#dbdbdc');
    styleVar.setProperty('--foregroundColor', '#fafafa');
    styleVar.setProperty('--foregroundColorAlt', '#fafafa');
    styleVar.setProperty('--foregroundColorAlt2', '#e5e5e6');
    styleVar.setProperty('--fontColour', '#383a42');
    styleVar.setProperty('--fontColourAlt', '#c2c2c3');
    styleVar.setProperty('--fontColourAlt2', '#85868b');
    styleVar.setProperty('--fontColourAlt3', 'black');
  }
}
function showRandom() {
  var randomizer = document.getElementById('randomizer');
  if (document.getElementById('randomize').checked) {
    randomRange.style.display = "block";
    randomizer.style.display = "block";
    randomizer.disabled = false;
  } else {
    randomRange.style.display = "none";
    randomizer.style.display = "none";
    randomizer.disabled = true;
  }
}
function intOrFloat() {
  var num1 = document.getElementById('num1').value;
  var num2 = document.getElementById('num2').value;
  if (document.getElementById('whole_numbers').checked) {
    wholeNumbersOnly = true;
    if (num1 !== "") {
      num1 = parseInt(Math.round(parseFloat(num1)));
      document.getElementById('num1').value = num1;
    }
    if (num2 !== "") {
      num2 = parseInt(Math.round(parseFloat(num2)));
      document.getElementById('num2').value = num2;
    }
  } else {
    wholeNumbersOnly = false;
  }
}
function rangedRandomizer(x) {
  var randomNumber = Math.floor(Math.random() * x);
  return randomNumber;
}
function randomizeNumbers() {
  var num1 = document.getElementById('num1').value;
  var num2 = document.getElementById('num2').value;
  if (document.getElementById('random_range').value == "") {
    var randomRange = 101;
    num1 = rangedRandomizer(randomRange);
    num2 = rangedRandomizer(randomRange);
  } else {
    var range = document.getElementById('random_range').value.trim();
    var acceptableKeys = "+-1234567890:";
    acceptableKeys = acceptableKeys.split("");
    for (var i = 0; i < range.length; i++) {
      var key = range[i];
      var acceptability = 0;
      for (var a = 0; a < acceptableKeys.length; a++) {
        if (key == acceptableKeys[a]) {
          acceptability += 1;
        }
      }
      if (acceptability <= 0) {
        window.alert('Error 422: Unprocessable Entity\n\nThe data you submitted does not follow the required format for the input.\n\nTo remind you, the format for \'Randomizer Range\' is \'minimum:maximum\'. Be sure that the submitted data follows this format exactly.\n\nException:\nThe Value of the numbers are not necessarily required to corespond to the \'minimum:maximum\' naming. The number on the left can be greater than the number on the right, despite the naming.');
        document.getElementById('random_range').select();
        return;
      }
    }
    var rangeData = range.split(":");
    if (rangeData.length !== 2) {
      window.alert('Error 422: Unprocessable Entity\n\nThe data you submitted does not follow the required format for the input.\n\nTo remind you, the format for \'Randomizer Range\' is \'minimum:maximum\'. Be sure that the submitted data follows this format exactly.\n\nException:\nThe Value of the numbers are not necessarily required to corespond to the \'minimum:maximum\' naming. The number on the left can be greater than the number on the right, despite the naming.');
      console.error('Error 422: Unprocessable Entity\n\nThe data you submitted does not follow the required format for the input.\n\nTo remind you, the format for \'Randomizer Range\' is \'minimum:maximum\'. Be sure that the submitted data follows this format exactly.\n\nException:\nThe Value of the numbers are not necessarily required to corespond to the \'minimum:maximum\' naming. The number on the left can be greater than the number on the right, despite the naming.');
      document.getElementById('random_range').select();
      return;
    }
    var min = Number(rangeData[0]);
    var max = Number(rangeData[1]);
    var randomRange = max - min + 1;
    num1 = rangedRandomizer(randomRange) + min;
    num2 = rangedRandomizer(randomRange) + min;
  }
  document.getElementById('num1').value = num1.toString();
  document.getElementById('num2').value = num2.toString();
}
function submitNumbers() {
  var num1 = Number(document.getElementById('num1').value);
  var num2 = Number(document.getElementById('num2').value);
  if (document.getElementById('num1').value == "" || document.getElementById('num1').value == "" && document.getElementById('num2').value == "") {
    window.alert('Error 422: Unprocessable Entity\n\nThis action cannot be completed since the submitted data is either incomplete or missing.');
    console.error('Error 422: Unprocessable Entity\n\nThis action cannot be completed since the submitted data is either incomplete or missing.');
    document.getElementById('num1').select();
  } else if (document.getElementById('num2').value == "") {
    window.alert('Error 422: Unprocessable Entity\n\nThis action cannot be completed since the submitted data is either incomplete or missing.');
    console.error('Error 422: Unprocessable Entity\n\nThis action cannot be completed since the submitted data is either incomplete or missing.');
    document.getElementById('num2').select();
  } else {
    var number1 = num1;
    var number2 = num2;
    document.getElementById('num1').value = "";
    document.getElementById('num2').value = "";
    numberValues = [number1, number2];
    var numbersSubmitted = true;
    showMathMethods(numbersSubmitted);
    document.getElementById('power').value = "Raise " + number1 + " to the power of " + number2;
    document.getElementById('squareroot1').value = "Find the squareroot of " + number1;
    document.getElementById('squareroot2').value = "Find the squareroot of " + number2;
    document.getElementById('submit_numbers').blur();
    return numberValues;
  }
}
function showMathMethods(numbersSubmitted) {
  if (numbersSubmitted) {
    document.getElementById('power').style.display = "block";
    document.getElementById('squareroot1').style.display = "block";
    document.getElementById('squareroot2').style.display = "block";
  } else {
    document.getElementById('power').style.display = "none";
    document.getElementById('squareroot1').style.display = "none";
    document.getElementById('squareroot2').style.display = "none";
  }
}
function clearInput() {
  var numbersSubmitted = false;
  showMathMethods(numbersSubmitted);
  document.getElementById('power').value = "";
  document.getElementById('squareroot1').value = "";
  document.getElementById('squareroot2').value = "";
  numberValues = [];
}
function raiseToThePower(x, y) {
  var raisedNumber = Math.pow(x, y);
  window.alert('The value of ' + x + ' raised to the power of ' + y + ' is ' + raisedNumber);
}
function squareRoot(x) {
  var root = Math.sqrt(x);
  window.alert('The square root of ' + x + ' is ' + root);
}
