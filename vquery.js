$(function() {

	var json_data = 
[  
    {  
      "question_id":"0",
      "question":"Iam Question one?",
      "image":"first.jpg",
      "option":{  
         "A":"yea",
         "B":"no",
         "C":"maybe",
         "D":"none",  
      },
      "answer":"A",
      "acronym":"H",
      "next_question_id":"1"
   },
   {  
   	  "question_id":"1",
      "question":"Iam Question two?",
      "image":"second.jpg",
      "option":{  
         "A":"Iam Option",
         "B":"Me too",
         "C":"Iam pro",
         "D":"Lol",  
      },
      "answer":"A",
      "acronym":"B",
      "next_question_id":"2"
   },
   {  
   	  "question_id":"2",
      "question":"Iam Question3",
      "image":"second.jpg",
      "option":{  
         "A":"iam option1",
         "B":"option2",
         "C":"Iam bored",
         "D":"Iam happy",  
      },
      "answer":"B",
      "acronym":"D",
      "next_question_id":"3"
   },
   {  
   	  "question_id":"3",
      "question":"Iam Dummy Qn? and I wont be visible to users. :(",
      "image":"third.jpg",
      "option":{  
         "A":"dfdf",
         "B":"dfdf",
         "C":"dfdf",
         "D":"dfdf",  
      },
      "answer":"C",
      "acronym":"P",
      "next_question_id":"-1" //put 0 if it is last question
   }
];

	 function createCookie(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else var expires = "";               

            document.cookie = name + "=" + value + expires + "; path=/";
        }

        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function eraseCookie(name) {
            createCookie(name, "", -1);
        }

        //console.log(readCookie('last_question'));

        if(readCookie('answer_result') == null){
        	getqn("","");
        }
        else{
            getqn("","");
        }

        $( ".next_btn" ).click(function() {

        	var option = $('input[name=optradio]:checked').val();

        	if(option != undefined || option != ""){
        		console.log('op');
            getqn($('#current_qn_id').val(),option);
        	}
		});

        function getqn(qn_id, answer){
          console.log("QN="+qn_id);
          console.log("ANSWER="+answer);
        	var qn;
        	var option;
// console.log(qn_id && answer);
 // console.log('test');
        	if(qn_id != "" && answer != ""){

        		if(json_data[qn_id].answer == answer){

              // if(json_data[qn_id].next_question_id == "-1"){
              //     $('.question_area').addClass('hidden');
              //     $('.completed').removeClass('hidden');
              // }

        			qn = json_data[json_data[qn_id].next_question_id];
        			createCookie('last_question', qn_id, 7);

        			var ac;

        			if(readCookie("answer_result")){
        				ac = readCookie("answer_result") + json_data[qn_id].acronym;
        			}
        			else{
        				ac = json_data[qn_id].acronym;
        			}

        			createCookie('answer_result', ac, 7);
              console.log("idffff");
        		}
        		else{

        			eraseCookie("answer_result");
        			eraseCookie("last_question");
              alert("Wrong Answer! You need to start Again :(");
              window.location.reload();
        		}

        	}
          else{
            console.log('else');
		        if(readCookie('last_question') == null){
              console.log('if1');
		        	qn = json_data[0];
		        }
            else{
              console.log('else1');
		        	qn = json_data[parseInt(readCookie('last_question'))+1];
		        }
		    }

          if(qn == undefined || qn == ""){
            qn = json_data[parseInt(readCookie('last_question'))];
          }

          if(qn.next_question_id == "-1"){
            $('.question_area').addClass('hidden');
            $('#cookie_msg').html(readCookie("answer_result"));
            $('.completed').removeClass('hidden');
          }

		    	option = qn.option;

          $('input[name=optradio]:checked').prop('checked', false);

		        $('#question').html(qn.question);
		        $('#img').attr("src",qn.image);
		        $('#optionA').html(option.A);
		        $('#optionB').html(option.B);
		        $('#optionC').html(option.C);
		        $('#optionD').html(option.D);
		        $('#current_qn_id').val(qn.question_id);
		        $('#current_acronym').val(qn.acronym);
    	}	
});