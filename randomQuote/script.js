/**
 * Created by Administrator on 2016/12/2 0002.
 */
var color = ['#16a085', '#27ae60', '#2c3e50', '#f39c12',
        '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32",
        "#BDBB99", "#77B1A9", "#73A857"],
    quotes = [
        ["Dr. Seuss","Don't cry because it's over, smile because it happened."],
        ["Albert Einstein","Two things are infinite: the universe and human stupidity; and I'm not sure about the universe."],
        ["arcus Tullius Cicero","A room without books is like a body without a soul."],
        ["Planet of the Apes","Get your stinking paws off me, you damned dirty ape."],
        ["Mae West","You only live once, but if you do it right, once is enough."],
        ["obert Frost","In three words I can sum up everything I've learned about life: it goes on."]
    ];


$(document).ready(function () {
    var $quoteText = $('.quote-text'),
        $text = $('#text'),
        $quoteAuthor = $('.quote-author'),
        $author = $('#author'),
        $change = $('.change');

    function randomQuote() {
        var random = parseInt(Math.random() * quotes.length),
            randomColor = parseInt(Math.random() * color.length);


        $quoteText.css('color', color[randomColor]);
        $quoteText.animate({opacity: 0}, 300, function () {
            $quoteText.animate({opacity: 1}, 300);
            $text.text(quotes[random][1]);
        });

        $quoteAuthor.css('color', color[randomColor]);
        $quoteAuthor.animate({opacity: 0}, 300, function () {
            $quoteAuthor.animate({opacity: 1}, 300);
            $author.text(quotes[random][0]);
        });
        //$('body').css('background-color', color[randomColor]);
        $change.css('background-color', color[randomColor]);
    }
    randomQuote();
    $change.on('click', randomQuote);

});