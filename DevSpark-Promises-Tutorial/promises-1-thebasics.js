/* Promises I - The Basics */

/* Instead of using callbacks, where we have to include our own success and error functions outside the code block,
with promises we can just use the Promise built-in resolve and reject functions. */

/* ALWAYS return IN OUR 'then' FUNCTIONS! */

/*
Allow you to do something as soon as an asynchronous method or function finishes.
They tend to make callbacks look outdated and messy in comparison. 

resolve() - promise is fulfilled.
then() - method gets executed when promise is resolved.
fromResolve - parameter to callback function in then() method that accepts output from resolve('whatever is here') - can be other name not just fromResolve.
reject() - promise is not fulfilled.
catch() - method that is executed when promise fails.
fromReject - parameter to callback function in catch() method that accepts output from reject - can be other name not just fromReject. 
*/

/* BASICS: */

/* 1)  FIRST: HOW TO DO WITH CALLBACKS */
function http(url, method, successCallback, errorHandler) {
    setTimeout(function() {
        let data = "Hi my name is Lucas!";
        if (data) {
            successCallback(data);
        } else {
            errorHandler('No data');
        }
    }, 1000);
}
/* use the http function with its callbacks: */
http('http://sabrinamarkon.com', 'GET', function(data) {
    console.log(data);
}, function(err) {
    console.log(err);
});


/* 2) USE PROMISES INSTEAD OF CALLBACKS.
- Remove the success and error callbacks, successCallback and errorHandler.
*/
function http2(url, method) {
    var promise = new Promise(function(resolve, reject) {
        //throw new Error('error in promise!'); // this would end up in the 'catch' function always!
        setTimeout(function() {
            let data = "Hi my name is Squeebz!";
            if (data) {
                resolve(data);
            } else {
                reject("This is no data");
            }
        }, 1000);
    });
    return promise;
}
/* 
-Promises have built in methods for handling success and error scenarios, 'then' and 'catch', so again, we do not need
to make extra functions that are callbacks for each of success or failure. */

/* Same as above http() call but use promises then and catch. 
-As long as we have our 'catch' function, our promise is protected from uncaught exceptions.
-Promises also let us use 'return' in the code, whereas callbacks do not.
*/
http2('http://phpsitescripts.com', 'GET')
    .then(function(data) {
        return data.toUpperCase();
    })
    .then(function(modifiedData) {
        console.log(modifiedData); // undefined.
        return modifiedData; // Make sure at least to return the data that was received or the next 'then' won't run. If this return is not here, the next 'then' will not work. This should return again the SQUEEBZ message all in capitals.
    })
    .then(function(data) {
        console.log(data);
        //throw new Error('error in promise then'); // this would end up in the 'catch' function!
    })
    .catch(function(err) {
        console.log('Catch:', err);
    });


    /* 
    REMEMBER:
    Callbacks - "call back" the success and failure functions that are in the parameters
    Promises - do not need the two extra functions (success/failure ones we make), because
    reject and resolve are included in Promise already!
    */