# Retro Guess the Word Game

Partially doing this project again for a good review of vanilla JS but also doing it to restyle it use a different word database.

## String To Placeholder Array

This little for-of-loop is something I want to remember how to do
```  
  const string = "string";

  const stingToArray = function (string) {
    const stingLetters = [];
    for (const array of string) {
        console.log(array);
        stingLetters.push("●")
        console.log(stingLetters);
    }
  };

  stingToArray(string);
```

## Event Handlers

Basic structure for an event handler. The differences between JS and React are hard to keep track of and I keep trying to add ```ref={this.input}```
```
    var body = document.querySelector("body");

    document.addEventListener( "keydown", function(e) {
        if (e.key === "l") {
            body.classList.add("light");
        }
    });
```
Remember e is just a common choice for event listeners and sometime is will be written as event or maybe another variable all together.

To prevent page from re-loading after an event use ``` e.preventDefault(); ``` inside the call back function of event handler
     