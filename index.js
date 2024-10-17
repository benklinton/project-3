$(document).ready(function () {
    $('.slider').slick({
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    });
    $('#home-nav').click(function () {
        $('#home').css('display', 'block');
        $("#film-title").css('display', 'none');
        $("#film-cards").css('display', 'none');
        $("#trivia").css('display', 'none');
    });
    $('#trivia-nav').click(function () {
        $('#trivia').css('display', 'flex');
        $("#film-title").css('display', 'none');
        $("#film-cards").css('display', 'none');
        $("#home").css('display', 'none');
    });
    $('#films-nav').click(function () {
        $('#film-title').css('display', 'flex');
        $("#film-cards").css('display', 'flex');
        $("#home").css('display', 'none');
        $("#trivia").css('display', 'none');
    });

    $('.start-button').click(function () {
        $('.start-button').hide();
        $('.trivia-header').hide();
        triviaGame.startGame();
    });
});

var triviaGame = {
    questions: [
        {
            question: "What iconic weapon does Jason Voorhees use in most of the Friday the 13th films?",
            answers: ["A Baseball Bat", "A Machete", "A Kitchen Knife", "A Chainsaw"],
            correctAnswer: "A Machete"
        },
        {
            question: "What is Chucky's full name in Child's Play?",
            answers: ["Chucky", "Charles Lee Ray", "Charles Manson ", "Chuck E. Cheese"],
            correctAnswer: "Charles Lee Ray"
        },
        {
            question: "What is the signature question Ghostface asks his victims over the phone?",
            answers: ["What are you wearing right now?", "What time is it?", "Whats your favorite scary movie?", "Do you like scary movies?"],
            correctAnswer: "Whats your favorite scary movie?"
        },
        {
            question: "Who was revealed as the killer at the end of the original Friday the 13th (1980)?",
            answers: ["Jason Voorhees", "Freddy Krueger", "Calvin Klein", "Pamela Voorhees"],
            correctAnswer: "Pamela Voorhees"
        }
    ],
    currentQuestion: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,
    timer: 30,
    timerInterval: null,
    startGame: function () {
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.unanswered = 0;
        this.timer = 30;
        $('.timer').show();
        this.displayQuestion();
    },
    displayQuestion: function () {
        var question = this.questions[this.currentQuestion];
        $('.question').text(question.question);
        $('.answers').empty();
        for (var i = 0; i < question.answers.length; i++) {
            var answer = question.answers[i];
            var answerButton = $('<button>').text(answer);
            answerButton.addClass('btn');
            answerButton.click(this.checkAnswer.bind(this));
            $('.answers').append(answerButton);
        }
        clearInterval(this.timerInterval);
        this.timer = 30;
        this.timerInterval = setInterval(this.countdown.bind(this), 1000);
    },
    checkAnswer: function (event) {
        var answer = $(event.target).text();
        var correctAnswer = this.questions[this.currentQuestion].correctAnswer;
        if (answer === correctAnswer) {
            this.correctAnswers++;
        } else {
            this.incorrectAnswers++;
        }
        this.currentQuestion++;
        if (this.currentQuestion < this.questions.length) {
            this.displayQuestion();
        } else {
            this.endGame();
        }
    },
    countdown: function () {
        $('.timer').text("Time Remaining: " + this.timer);
        this.timer--;
        if (this.timer === 0) {
            this.unanswered++;
            this.currentQuestion++;
            if (this.currentQuestion < this.questions.length) {
                this.displayQuestion();
            } else {
                this.endGame();
            }
        }
    },
    endGame: function () {
        clearInterval(this.timerInterval);
        $('.timer').hide();
        $('.question').text('Game Over');
        $('.answers').empty();
        $('.answers').append($('<div>').text('Correct Answers: ' + this.correctAnswers));
        $('.answers').append($('<div>').text('Incorrect Answers: ' + this.incorrectAnswers));
        $('.answers').append($('<div>').text('Unanswered: ' + this.unanswered));
        $('.answers').append($('<button>').text('Start Over').addClass('btn').click(this.startGame.bind(this)));
    }
};