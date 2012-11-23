/*
 * Test Cases for realtime.js
 * 
 * (C) Tomas Reimers, 2012
 */ 

$(document).ready(function (){
    // Make sure we can tell user
    window.totalTests = 0;
    window.completedTests = 0;
    window.testStatus = function (test, passed){
        $('.results').append('<div class="' + (passed ? 'passed' : 'not_passed') + '">' + (passed ? '' : 'NOT ') + 'Passed: ' + test + '</div>');

        window.completedTests++;

        if (window.completedTests == window.totalTests){
            $('#pleasewait').remove();
        }
    }

    // define easy way to make sure that item has been removed from targets (i.e. detached)
    realtime.targets.includes = function (selector){
        for (var i = 0; i < realtime.targets.length; i++){
            if (realtime.targets[i].selector == selector){
                return true;
            }
        }
        return false;
    };

    // Basic - Discover New Element
    window.currentTestPassed1 = false;
    var currentTest1 = rt('.test1').act(function (){
        window.currentTestPassed1 = true;
    });
    $('.test_container').append('<div class="test1"></div>');
    setTimeout(function (){
        if (window.currentTestPassed1){
            window.testStatus('Basic - Discover New Element', true);
        }
        else {
            window.testStatus('Basic - Discover New Element', false);
        }
        currentTest1.detach();
    }, 5000);
    window.totalTests++;

    // Basic - Detach
    var currentTest2 = rt('.test2');
    currentTest2.detach();
    setTimeout(function (){
        if (!realtime.targets.includes('test2')){
            window.testStatus('Basic - Detach', true);
        }
        else {
            window.testStatus('Basic - Detach', false);
        }
    }, 5000);
    window.totalTests++;

    // Alternate Binding - untilFound
    window.currentTestPassed3 = false;
    var currentTest3 = rt('.test3').untilFound().act(function (){
        window.currentTestPassed3 = true;
    });
    $('.test_container').append('<div class="test3"></div>');
    setTimeout(function (){
        if (window.currentTestPassed3 && !rt.targets.includes('.test3')){
            window.testStatus('Alternate Binding - Until Found', true);
        }
        else {
            window.testStatus('Alternate Binding - Until Found', false);
        }
    }, 5000);
    window.totalTests++;

    // Alternate Binding - Now
    window.currentTestPassed4 = false;
    $('.test_container').append('<div class="test4"></div>');
    var currentTest4 = rt('.test4').act(function (){
        window.currentTestPassed4 = true;
    }).now();
    setTimeout(function (){
        if (window.currentTestPassed4){
            window.testStatus('Alternate Binding - Now', true);
        }
        else {
            window.testStatus('Alternate Binding - Now', false);
        }
        currentTest4.detach();
    }, 5000);
    window.totalTests++;

    // Convenience - Style, Value
    var currentTest6 = rt('.test6').style('height', '10px');
    $('.test_container').append('<div class="test6"></div>');
    setTimeout(function (){
        if ($('.test6').css('height') == '10px'){
            window.testStatus('Convenience - Style, Value', true);
        }
        else {
            window.testStatus('Convenience - Style, Value', false);
        }
        currentTest6.detach();
    }, 5000);
    window.totalTests++;

    // Convenience - Content, Value
    var currentTest7 = rt('.test7').content('hello, world');
    $('.test_container').append('<div class="test7"></div>');
    setTimeout(function (){
        if ($('.test7').text() == 'hello, world'){
            window.testStatus('Convenience - Content, Value', true);
        }
        else {
            window.testStatus('Convenience - Content, Value', false);
        }
        currentTest7.detach();
    }, 5000);
    window.totalTests++;

    // Convenience - Attribute, Value
    var currentTest8 = rt('.test8').attribute('data-test', 'hello');
    $('.test_container').append('<div class="test8"></div>');
    setTimeout(function (){
        if ($('.test8').attr('data-test') == 'hello'){
            window.testStatus('Convenience - Attribute, Value', true);
        }
        else {
            window.testStatus('Convenience - Attribute, Value', false);
        }
        currentTest8.detach();
    }, 5000);
    window.totalTests++;

    // Convenience - Style, Function
    window.currentTestPassed9 = false;
    var currentTest9 = rt('.test9').style('height', function (el){
        if ($(el).is('.test9')){
            window.currentTestPassed9 = true;
        }
        return '10px';
    });
    $('.test_container').append('<div class="test9"></div>');
    setTimeout(function (){
        if ($('.test9').css('height') == '10px' && window.currentTestPassed9){
            window.testStatus('Convenience - Style, Function', true);
        }
        else {
            window.testStatus('Convenience - Style, Function', false);
        }
        currentTest9.detach();
    }, 5000);
    window.totalTests++;

    // Convenience - Content, Function
    window.currentTestPassed10 = false;
    var currentTest10 = rt('.test10').content(function (el){
        if ($(el).is('.test10')){
            window.currentTestPassed10 = true;
        }
        return 'hello, world';
    });
    $('.test_container').append('<div class="test10"></div>');
    setTimeout(function (){
        if ($('.test10').text() == 'hello, world' && window.currentTestPassed10){
            window.testStatus('Convenience - Content, Function', true);
        }
        else {
            window.testStatus('Convenience - Content, Function', false);
        }
        currentTest10.detach();
    }, 5000);
    window.totalTests++;

    // Convenience - Attribute, Function
    window.currentTestPassed11 = false;
    var currentTest11 = rt('.test11').attribute('data-test', function (el){
        if ($(el).is('.test11')){
            window.currentTestPassed11 = true;
        }
        return 'hello';
    });
    $('.test_container').append('<div class="test11"></div>');
    setTimeout(function (){
        if ($('.test11').attr('data-test') == 'hello' && window.currentTestPassed11){
            window.testStatus('Convenience - Attribute, Function', true);
        }
        else {
            window.testStatus('Convenience - Attribute, Function', false);
        }
        currentTest11.detach();
    }, 5000);
    window.totalTests++;

    // Misc - Chaining
    var currentTest12 = rt('.test12').attribute('data-test', 'hello').style('height', '10px');
    $('.test_container').append('<div class="test12"></div>');
    setTimeout(function (){
        if ($('.test12').attr('data-test') == 'hello' && $('.test12').css('height') == '10px'){
            window.testStatus('Misc - Chaining', true);
        }
        else {
            window.testStatus('Misc - Chaining', false);
        }
        currentTest12.detach();
    }, 5000);
    window.totalTests++;

    // Misc - Two Targets
    window.currentTestPassed13 = false;
    window.currentTestPassed14 = false;
    var currentTest13 = rt('.test13').act(function (){
        window.currentTestPassed13 = true;
    });
    var currentTest14 = rt('.test14').act(function (){
        window.currentTestPassed14 = true;
    });
    $('.test_container').append('<div class="test13"></div>');
    $('.test_container').append('<div class="test14"></div>');
    setTimeout(function (){
        if (window.currentTestPassed13 && window.currentTestPassed14){
            window.testStatus('Misc - Two Targets', true);
        }
        else {
            window.testStatus('Misc - Two Targets', false);
        }
        currentTest13.detach();
        currentTest14.detach();
    }, 5000);
    window.totalTests++;

    // Nesting - At Once
    window.currentTestPassed15 = false;
    var currentTest15 = rt('.test15').act(function (){
        window.currentTestPassed15 = true;
    });
    $('.test_container').append('<p><div class="test15"></div></p>');
    setTimeout(function (){
        if (window.currentTestPassed15){
            window.testStatus('Nesting - At Once', true);
        }
        else {
            window.testStatus('Nesting - At Once', false);
        }
        currentTest15.detach();
    }, 5000);
    window.totalTests++;

    // Nesting - Two Step
    window.currentTestPassed16 = false;
    var currentTest16 = rt('.test16').act(function (){
        window.currentTestPassed16 = true;
    });
    $('.test_container').append('<p class="test16_holder"></p>');
    $('.test16_holder').append('<div class="test16"></div>');
    setTimeout(function (){
        if (window.currentTestPassed16){
            window.testStatus('Nesting - Two Step', true);
        }
        else {
            window.testStatus('Nesting - Two Step', false);
        }
        currentTest16.detach();
    }, 5000);
    window.totalTests++;

    // Aestethics
    window.timeLeft = 6;
    window.countdown = function (){
        window.timeLeft--;
        $('#timeleft').html(window.timeLeft);
        if (window.timeLeft > 0){
            setTimeout(window.countdown, 1000);
        }
    };
    window.countdown();
});