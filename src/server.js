'use strict';
require("dotenv").config();
 
const
  express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  app = express().use(bodyParser.json());  

 
app.listen(process.env.PORT || 8080, () => console.log('webhook is listening'))


app.get('/webhook', (req, res) => {

 
  let VERIFY_TOKEN = process.env.MY_VERIFY_FB_TOKEN;
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
   
  if (mode && token) {
  
    
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // 
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      //  '403 Forbidden' 
      res.sendStatus(403);      
    }
  }
});

app.post('/webhook', (req, res) => {  

  //  
  let body = req.body;

  // 
  if (body.object === 'page') {

    //  
    body.entry.forEach(function(entry) {

     //  
  let webhook_event = entry.messaging[0];
  console.log(webhook_event);

  //  
  let sender_psid = webhook_event.sender.id;
  console.log('Sender PSID: ' + sender_psid);

   
  if (webhook_event.message) {
    handleMessage(sender_psid, webhook_event.message);        
  } else if (webhook_event.postback) {
    handlePostback(sender_psid, webhook_event.postback);
  }
      
    });

    //  '200 OK'
    res.status(200).send('EVENT_RECEIVED');

  } else {
    //  '404 Not Found'
    res.sendStatus(404);
  }

});


function handleMessage(sender_psid, received_message) {
 /*
 0= Salutation;
  1=Replay_salutation,
   2= Service,
    3=Affiche,
    4=logo,
    5=photo
    6=site web
    7=emplois
    8=age
    9=assasinat
    10=vol
    11=mager
    12=satisfaction
    13=contact

 */
  let response;
  let tb=
   [ 
    ["Bonjour", "Coucou", "Salut", "Bonsoir","bonjour", "bonsoir", "salut", "coucou"],
    ["et vous ", "Je vais bien", "je vais bien", "A mervielle", "à mervielle", "très bien", "Bien"],
    ["Services", "services", "prestation", "Prestation"],
    ["Affiches", "affiches", "Affiche", "affiche", "Flyers", "flyers", "Flyer", "flyer", "Visuels", "visuels"],
    ["Logo", "logo", "logos", "Logos"],
    ["Photos", "photos", "Photo", "photo", "Shoot", "shoot", "Shoots", "shoots"],
    ["Application", "application", "logiciel", "Site web", "site web"],
    ["Recrutement", "recrutement", "Emploi", "emploi", "Stage", "stage"],
    ["Âge", "âge"],
    ["Tuer", "tuer", "Tué", "tué", "Assasinat", "assasinat", "Assasiné", "assasiné", "Meurtres", "meutres"],
    ["Vole", "vole", "Volé", "volé", "voler", "Voler"],
    ["manger", "viande", "poulet", "riz", "sauce", "igname", "pomme de terre", "fruite", "coca", "Coca", "boissons", "poisson"],
    ["Merci", "merci", "D'accord", "d'accord", "ok", "Ok"],
    ["Contactez", "Contacter", "contacter", "contactez", "numéro", "Numéro", "Contact", "contact", "commande", "Commande", "Homme", "homme", "personnel", "aide" ]
   ]
   let Reps_cat;

   // Verification contenue
if (received_message.text) {

Controll_reponse(tb, received_message.text);  

function Controll_reponse(tab, message_rep)
  {
      console.log(received_message.text);
    for (var i = 0 ; i < tab.length; i++) {
    	//console.log(i)
       for (var s = 0 ; s < tab[i].length; s++) {
       		 
    	     if ( ( message_rep.indexOf(tab[i][s]) ) != -1 ) 
    	                
    	                  {
    	                  	console.log("Dans le if i="+ i +"s :"+s)
    		                  Reps_cat = i;
       		                  break  ;
    	                  }
    	       else         {
                               console.log("Dans le else i="+ i +"s :"+s)
                               Reps_cat = -1 ;   
    	                    }  
    	           

    	   }
    	   if (Reps_cat!= -1) 
    	   {
    	   	break;
    	   }

        }
   
   }

   console.log(Reps_cat)
  //0= Salutation;
   if (Reps_cat==0) {
   	response = {
          "text": `Salut à vous 👋 ! Bienvenu chez Pub City. Comment aller vous ?`
      }
   }
     //1=Replay_salutation,
   if (Reps_cat==1) {
   	response = {
          "text": `J'en suis ravie 😎 . Étant donner que je suis un robot, je me port à merveille.Que puis-je pour vous?`
      }
   }

       // 2= Nos Service,
      if (Reps_cat==2) {
   	response = {
          "text": `Pub City propose de nombreux services dont la conception d'affiche , de logo, et de shoot (photo professionnelle). Que voulez vous donc  ? Merci de bien notifier un service par message.`
      }
   }
      //3=Affiche,
    if (Reps_cat==3) {
   	response = {
          "text": `C'est compris. Nous faisons nos affiche au prix unitaire de 15000 FCFA`
      }
   }


   //4=logo,
    if (Reps_cat==4) {
   	response = {
          "text": `Le prix unitaire d'un logo est de 5000FCFA`
      }
   }
   

   //5=photo,
    if (Reps_cat==5) {
   	response = {
          "text": `Je remarque que vous êtes intéressé par les photo ! Nos tarrifs sont les suivant : photoen nature 7000FCFA , photo en studio : 10000FCFA`
      }
   }
    

    //6=site web,
    if (Reps_cat==6) {
   	response = {
          "text": `Vos avez donc besion d'un site ou d'une application ? Très bien. Nous faison nos :\n  Site statique à 90.000FCFA,\n Site dynamique à 400.000FCFA \n Application à 150.000FCFA au minimum.`
      }
   }
   
   //7=emplois
    if (Reps_cat==7) {
   	response = {
          "text": `Je sais que la vie est actuellement difficile. Mais , Pub City ne recrute actuellement aucun personnel ou stagiaire. Si vous chercher un emplois, je vous conseille vivement d'entreprendre une activité. La vie est très difficile. `
      }
   }

//8=age
    if (Reps_cat==8) {
   	response = {
          "text": `Je ne peux connaître mon âge, ni le vôtre. Je suis un robot. J'existe dans le temps.`
      }
   }
   

   //9=assasinat
    if (Reps_cat==9) {
   	response = {
          "text": `Vous voulez commettre un meutre ou vous en avez commis un ? Je vous conseille de vous rendre à la police.`
      }
   }
   

    //10=vol
    if (Reps_cat==10) {
   	response = {
          "text": `Si vous avez été victime d'un vole, veillez porté plainteà la police. Par contre si vous voulez voler, ne le faite pas.`
      }
   }
   
   
     //11=manger
    if (Reps_cat==11) {
   	response = {
          "text": `Je ne suis pas disposer à repondre au question en rapport avec la restauration.`
      }
   }


      //12=satifaction
    if (Reps_cat==12) {
   	response = {
          "text": `Je remaque une légère satisfaction dans votre expression. Je suis heureux de vous avoir été utile. Pour plus d'information, contactez le 91-13-18-15.`
      }
   }


        //13=commande
    if (Reps_cat==13) {
   	response = {
          "text": `Pour passer une commande ou avoir plus d'information, veillez contacter le 91-13-18-15`
      }
   }
   
   

   if (Reps_cat==-1) {
   	response = {
   		"text": `Je n'ai pas l'autorisation requise pour répondre à votre question🕵️‍♂️. Merci pour la compréhension`
   }
 
 }


 }

 // if (received_message.text) {    

    // Create the payload for a basic text message
  //  response = {
 //     "text": `You sent the message: "${received_message.text}". Now send me an image!`
 //   }
 // } 
 /* else if (received_message.attachments) {
    // Get the URL of the message attachment
//    let attachment_url = received_message.attachments[0].payload.url;
//    response = {
//      "attachment": {
 //       "type": "template",
 //       "payload": {
 //         "template_type": "generic",
 //         "elements": [{
  //          "title": "Is this the right picture?",
 //          "subtitle": "Tap a button to answer.",
 //           "image_url": attachment_url,
  //          "buttons": [
     //         {
       //         "type": "postback",
       //         "title": "Yes!",
         //       "payload": "yes",
           //   },
         //     {
           //     "type": "postback",
          //      "title": "No!",
         //       "payload": "no",
             }
            ],
          }]
        }
      }
    }
  }   */
  
  // Sends the response message
  callSendAPI(sender_psid, response);    
}





function handlePostback(sender_psid, received_postback) {
  let response;
  
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}









function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.FB_PAGE_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}



