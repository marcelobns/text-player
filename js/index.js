var main = {
    input : $('#input'),
    play : $('#play'),
    reader : $('#reader'),
    wpm : $('#wpm'),
    wpt : $('#wpt'),
    listeners : function(name){
        main.play.on('click', function(){
            if(main.input.val().trim() != ''){
                main.reader.modal('show');
                modal.prepare();
            }
        });
        main.wpm.on("change mousemove", function() {
            $('[for=wpm] > span').text($(this).val())
        });
        main.wpt.on("change mousemove", function() {
            $('[for=wpt] > span').text($(this).val())
        });
    },
}
var modal = {
    count : $('#count'),
    output : $('#output'),
    replayBtn : $('#replay'),
    reproBtn : $('#repro'),
    backwardBtn : $('#backward'),
    forwardBtn : $('#forward'),
    play : function(){
        var interval = Math.round(1000/((main.wpm.val()/main.wpt.val())/60));

        modal.text = main.input.val().split(' ');
        modal.reproBtn.html('<i class="fa fa-pause fa-lg"></i>');
        modal.reproBtn.removeClass('paused');
        modal.looping = setInterval(function(){modal.read(+1)}, interval);
    },
    pause : function(){
        if(!modal.reproBtn.hasClass('paused')){
            clearInterval(modal.counting);
            clearInterval(modal.looping);
            modal.reproBtn.html('<i class="fa fa-play fa-lg"></i>');
            modal.reproBtn.addClass('paused');
        }
    },
    stop : function(){
        modal.output.text('');
        modal.pause();
        modal.i = 0;
    },
    read : function(d){
        var i = modal.i || 0;
        var output = '';
        if(modal.text[i] == undefined){
            modal.stop();
            return false;
        }
        if(modal.text[i].length <= 4 && d == +1){
            output = modal.text[i]+' ';
            i+=(1*d);
        }
        output += modal.text[i]+' ';

        if(main.wpt.val() > 1 && modal.text[i].slice(-1) != '.'){
            for (var j = 1; j < main.wpt.val(); j++) {
                i+=(j*d);
                output += modal.text[i]+' ';
            }
        }
        i+=(1*d);
        modal.output.text(output.trim());
        modal.i = i;
        return true;
    },
    prepare : function(){
        modal.stop();
        modal.count.val(0);
        modal.count.show();
        modal.counting = setInterval(modal.counter, 333);
    },
    counter : function(){
        if(modal.count.val() == 3){
            clearInterval(modal.counting);
            modal.count.hide();
            modal.play();
        }
        modal.count.val(modal.count.val()+1);
    },
    replay : function(){
        modal.stop();
        modal.prepare();
    },
    backward : function(){
        modal.pause();
        modal.read(-1);
    },
    forward : function(){
        modal.pause();
        modal.read(+1);
    },
    listeners : function(){
        modal.reproBtn.on('click', function(){
            if(modal.reproBtn.hasClass('paused')){
                modal.play();
            } else {
                modal.pause();
            }
        });
        modal.replayBtn.on('click', function(){
            modal.replay();
        });
        modal.backwardBtn.on('click',function(){
            modal.backward();
        });
        modal.forwardBtn.on('click',function(){
            modal.forward();
        });
    }
}
main.listeners();
modal.listeners();
