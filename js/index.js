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
    play : function(){
        var interval = Math.round(1000/((main.wpm.val()/main.wpt.val())/60));

        modal.text = main.input.val().split(' ');
        modal.reproBtn.html('<i class="fa fa-pause fa-lg"></i>');
        modal.reproBtn.removeClass('paused');
        modal.looping = setInterval(modal.loop, interval);
    },
    pause : function(){
        clearInterval(modal.counting);
        clearInterval(modal.looping);
        modal.reproBtn.html('<i class="fa fa-play fa-lg"></i>');
        modal.reproBtn.addClass('paused');
    },
    stop : function(){
        modal.output.text('');
        modal.pause();
        modal.i = 0;
    },
    loop : function(){
        var i = modal.i || 0;
        var output = '';
        if(modal.text[i] == undefined){
            modal.stop();
            return false;
        }
        if(modal.text[i].length <= 4){
            output = modal.text[i]+' ';
            i++;
        }
        output += modal.text[i];

        if(main.wpt.val() > 1 && modal.text[i].slice(-1) != '.'){
            for (var j = 1; j < t; j++) {
                i+=j;
                output += modal.text[i]+' ';
            }
        }
        i++;
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
    }
}
main.listeners();
modal.listeners();
