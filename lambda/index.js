/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const stringUtils = require('./stringUtils');
const Util = require('./util.js');


const PlayStreamIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (
        handlerInput.requestEnvelope.request.intent.name === 'PlayStreamIntent'      );
  },
  handle(handlerInput) {

    let url = Util.getS3PreSignedUrl("Media/audio.mp3");
    handlerInput.responseBuilder
      .speak('starting  <audio src="${url}"/>');
      
    return handlerInput.responseBuilder
      .getResponse();
  },
};



const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
     
        sessionAttributes.isMusicOn = true;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        const item = Object.values(stringUtils.WELCOME);
        
        const speakOutput = item.toString();
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const DifficultyLevelHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DifficultyIntent';
    },
    handle(handlerInput) {
       const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
       const difficulty = handlerInput.requestEnvelope.request.intent.slots.difficulty.value;
        
        //Alexa.getSlotValue(handlerInput.requestEnvelope, 'players')
        sessionAttributes.difficulty = difficulty;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
    
        
    const speakOutput = 'Alright! You can say Alexa, setup, Rules, or Help to get more information about each of these topics ';
    return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const RuleIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RuleIntent';
    },
    handle(handlerInput) {
        
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const item = Object.values(stringUtils.RULES);
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            
            var audioUrl;
            if (sessionAttributes.isMusicOn)
            {
                audioUrl = Util.getS3PreSignedUrl("Media/trimmed.mp3").replace(/&/g,'&amp;');
            }
            else 
            {
                 audioUrl = Util.getS3PreSignedUrl("Media/one-min-alexa.mp3").replace(/&/g,'&amp;');
            
            }
        
       //if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RuleIntent')
        {
            sessionAttributes.rulesInProgress = true;
            sessionAttributes.ruleCounter = 0;
            sessionAttributes.isSetupInProgress = false;
        }
       

        let speakOutput = (item[sessionAttributes.ruleCounter]).toString();
        sessionAttributes.speakOutput = speakOutput;

        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        var summary = getRulesSummary();
     
        return handlerInput.responseBuilder
            .speak(sessionAttributes.speakOutput +`<audio src="${audioUrl}"/>`)
            .withSimpleCard(
            "Rules Reference Card", 
            summary)
            .withShouldEndSession(false)
            .getResponse();
    }
};
const SetupIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'SetupIntent');
    },
    handle(handlerInput) {
        const { attributesManager } = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        var audioUrl;
        if (sessionAttributes.isMusicOn)
            {
                audioUrl = Util.getS3PreSignedUrl("Media/trimmed.mp3").replace(/&/g,'&amp;');
            }
            else 
            {
                 audioUrl = Util.getS3PreSignedUrl("Media/one-min-alexa.mp3").replace(/&/g,'&amp;');
            
            }


        sessionAttributes.setupCounter = 0;
        sessionAttributes.isSetupInProgress = true;
        sessionAttributes.rulesInProgress = false;

        const item = Object.values(stringUtils.SETUP);
        
        let speakOutput = (item[sessionAttributes.setupCounter]).toString() +`<audio src="${audioUrl}"/>`;
        sessionAttributes.speakOutput = speakOutput;
        
        let summary = getSetupSummary();

        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

        return handlerInput.responseBuilder
            .speak(sessionAttributes.speakOutput)
            .withSimpleCard("Setup Reference Card",
            summary)
            .withShouldEndSession(false)
            .getResponse();
    }
};


const NextIntentHandler = {
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NextIntent';
    },
    handle(handlerInput) {
        const { attributesManager } = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        var audioUrl;
        if (sessionAttributes.isMusicOn)
        {
            audioUrl = Util.getS3PreSignedUrl("Media/trimmed.mp3").replace(/&/g,'&amp;');
        }
        else 
        {
             audioUrl = Util.getS3PreSignedUrl("Media/one-min-alexa.mp3").replace(/&/g,'&amp;');
        
        }

      
        if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NextIntent' && sessionAttributes.isSetupInProgress)
        {
            sessionAttributes.setupCounter++;
            const item = Object.values(stringUtils.SETUP);
            let speakOutput = (item[sessionAttributes.setupCounter]).toString();
        
            if (sessionAttributes.setupCounter === 8)
            {
                let numberOfCards = (sessionAttributes.players === 4 ? 2 : (sessionAttributes.players === 3 ? 3 : 2));
	            speakOutput = speakOutput.replace('%(players)s', numberOfCards.toString());

            }
            else if (sessionAttributes.setupCounter === 9)
            {
                let piles = (sessionAttributes.difficulty === 'introductory' ? 4 : (sessionAttributes.difficulty === 'normal' ? 5 : 6));
                speakOutput = speakOutput.replace('%(difficulty)s', piles.toString()); 
            }
            
            else if (sessionAttributes.setupCounter===15)
            {
                sessionAttributes.isSetupInProgress = false;
            }
            sessionAttributes.speakOutput = speakOutput;

            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        }
        else
        {
            const item = Object.values(stringUtils.RULES);
            sessionAttributes.ruleCounter++;
                if (sessionAttributes.ruleCounter === 8)
                {
                    sessionAttributes.rulesInProgress = false;
                }
  
    
            let speakOutput = (item[sessionAttributes.ruleCounter]).toString();
        
            sessionAttributes.speakOutput = speakOutput;

            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

        }
         return handlerInput.responseBuilder
            .speak(sessionAttributes.speakOutput +`<audio src="${audioUrl}"/>`)
            .withShouldEndSession(false)
            .getResponse();   
        }
};

const RepeatHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var audioUrl;

    if (sessionAttributes.isMusicOn)
    {
        audioUrl = Util.getS3PreSignedUrl("Media/trimmed.mp3").replace(/&/g,'&amp;');
    }
    else 
    {
         audioUrl = Util.getS3PreSignedUrl("Media/one-min-alexa.mp3").replace(/&/g,'&amp;');
    
    }
    return handlerInput.responseBuilder
      .speak(sessionAttributes.speakOutput+`<audio src="${audioUrl}"/>`)
      .reprompt(sessionAttributes.speakOutput)
      .getResponse();
  },
};

const PauseHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    
    let speakOutput = "You are in now pause";

    return handlerInput.responseBuilder
      .speak(sessionAttributes.speakOutput)
      //.reprompt(sessionAttributes.speakOutput)
      .getResponse();
  },
};

const NumberOfPlayersHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'NumberOfPlayersIntent');
    },
    handle(handlerInput) {
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const numOfPlayers = handlerInput.requestEnvelope.request.intent.slots.players.value;
        
        //Alexa.getSlotValue(handlerInput.requestEnvelope, 'players')
        sessionAttributes.players = numOfPlayers;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        let speakOutput = '';
        let reprompt = '';
        if (numOfPlayers <=4 && numOfPlayers >=2 )
        {
            speakOutput = 'What difficulty level do you choose? You can say Introductory, Normal, or Heroic';
            reprompt = speakOutput;
        }
        else {
            speakOutput = 'Unfortunately, this version of Pandemic only supports between 2 and 4 players. If there is more than 4 of you, you can buddy up to play.';
            reprompt = 'How many of you will be playing today?';
        }
    
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};

const OutbreakIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OutbreakIntent';
    },
    handle(handlerInput) {
        const item = Object.values(stringUtils.OUTBREAK);
        let speakOutput = item.toString();
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const EpidemicIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EpidemicIntent';
    },
    handle(handlerInput) {
        const item = Object.values(stringUtils.EPIDEMIC);
        let speakOutput = item.toString();
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to help. You can ask me about the rules of Epidemic or Outbreak. You can also ask me about powers of any role, just say Alexa, and your role.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const RoleIntentHandler = {
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RoleIntent';
    },
    handle(handlerInput) {
        const playerRole = handlerInput.requestEnvelope.request.intent.slots.role.value;
        var speakOutput;
        
        switch(playerRole)
        {
            case 'dispatcher':
                speakOutput = 'Dispatcher may, as an action, either move any pawn (<break time="1s"/> if its owner agrees) to any city containing another pawn, <break time="1s"/> or move another player’s pawn (if its owner agrees) as if it were his own. <break time="2s"/> When taking a Direct or Charter Flight, discard cards from his hand. <break time="2s"/> When taking a Charter Flight, the card played must match the city the pawn is moving from.';
                break;
                
            case 'medic':
                speakOutput = 'Medic removes all cubes of the same color with the Treat Disease action. <break time="1s"/> If a disease has been cured, he automatically removes all cubes of that color from a city by entering it or being there (<break time="1s"/> this does not take an action). <break time="2s"/> This can occur on other players’ turns. <break time="2s"/> The Medic also prevents placing disease cubes (and outbreaks) of cured disease in his location.';
                break;
                
            case 'contingency planner':
                speakOutput = 'Contingency planner may, as an action, take an Event card from anywhere in the discard pile and place it on his Role card (<break time="2s"/>only one may be there at a time, and it does not count against his hand limit). <break time="1s"/> When he plays the card, remove it from the game instead of discarding it';
                break;
                
            case 'researcher':
                speakOutput = 'Researcher may, as an action, give any City card from his hand to another player in the same city, without this card having to match the city. <break time="2s"/> The transfer must be from his hand to the other player’s hand, but it can occur on either player’s turn.';
                break;
                
            case 'operations expert':
                speakOutput = 'Operations expert may, as an action, either build a research station in his current city without discarding (or using) a City card, <break time="1s"/> or once per turn, move from a research station to any city by discarding any City card. <break time="2s"/> The Dispatcher may not use the Operation Expert’s special move ability when moving the Operation Expert’s pawn.';
                break;
                
            case 'scientist':
                speakOutput = 'The scientist only needs 4 City cards of the same disease color to discover a cure for that disease.';
                break;
                
            case 'quarantine specialist':
                speakOutput = 'Quarantine specialist prevents both outbreaks and the placement of disease cubes in the city he is in and all cities connected to that city.';
                break;
                
            default:
                speakOutput = "Sorry, that is not a valid role. You can say dispatcher, medic, contingency planner, researcher, operations expert, scientist, or quarantine specialist";
                var reprompt = "So, what role do you want to know about?";
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(reprompt)
                .getResponse();
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ActionsIntentHandler = {
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ActionsIntent';
    },
    handle(handlerInput) {
        const action = handlerInput.requestEnvelope.request.intent.slots.action.value;
        var speakOutput;
        switch(action)
        {
            case 'actions':
                speakOutput = 'You can say Drive, take a direct flight, charter flight, shuttle flight, pass turn, build a research station, discover a cure, treat disease, eradicate, and share knowledge. I have also sent a reference card to your Alexa app with a summary of all possible actions';
                break;
                
            case 'drive':
                speakOutput = 'To drive or take a ferry, Move your pawn to an adjacent city. Cities are adjacent if they are connected by a red line. Red lines that go off the edge of the board “wrap around” to the opposite board edge and continue to the indicated city. (For example, Sydney and Los Angeles are considered to be adjacent)';
                break;
            
            case 'ferry':
                speakOutput = 'To drive or take a ferry, Move your pawn to an adjacent city. Cities are adjacent if they are connected by a red line. Red lines that go off the edge of the board “wrap around” to the opposite board edge and continue to the indicated city. (For example, Sydney and Los Angeles are considered to be adjacent)';
                break;
            
            case 'direct flight':
                speakOutput = 'For direct flight, Play a card from your hand and move your pawn to the pictured city. Discard the card to the Player Discard pile.';
                break;

            case 'charter flight':
                speakOutput = 'for a charter flight, Play the card corresponding to your pawn’s current location, and move to any city on the board. Discard the card to the Player Discard pile.';
                break;
                
            case 'shuttle flight':
                speakOutput = 'If your pawn is in a city with a Research Station, you can move it to any other city with a Research Station. say Alexa, research station to know more about this action';
                break;
                
            case 'pass turn':
                speakOutput = 'A player may also elect to pass (and do nothing) for an action.';
                break;
                
            case 'research station':
                speakOutput = 'Building Research Stations helps your team move from place to place. Research Stations are also required for discovering cures. Play the card corresponding to the city your pawn currently occupies, then place a Research Station in that city. Discard the card to the Player Discard Pile. If there aren’t any Research Stations left in the supply, select one of the Research Stations already in play and transfer it to the city your pawn occupies.';
                break;
                
            case 'cure':
                speakOutput = 'If your pawn is in a city with a Research Station, discard 5 cards of the same color to cure the corresponding disease. Take a Cure marker and place it (vial-side up) on the Discovered Cures area of the board to indicate which disease has been cured. Place the spent cards into the Player Discard Pile. Once your team has discovered all four cures, you win!';
                break;
                
            case 'treat':
                speakOutput = 'Over the course of the game, your team can treat diseases to buy the time needed to discover cures. Remove a disease cube from the city your pawn occupies. (Each removed cube costs one action.) Place the removed cube back into the stock by the side of the board. If players have discovered a cure, instead of one cube, remove all cubes of a cured disease in your current city for one action.';
                break;
     
            
            case 'share':
                speakOutput = 'Sometimes it’s hard for one player to get the cards necessary to discover a cure. The Share Knowledge action (while difficult to perform) can be useful in these cases. Transfer a card from one player to another. Every card transferred costs 1 action. Both your pawn and your fellow player’s pawn must be in the same city, and you may only transfer the card of the city that you are in together. (For example, if you are together in Moscow, only the Moscow card may be transferred from one player to the other.) If either player holds more than 7 cards as the result of a transfer, the excess cards must be immediately discarded to the Player Discard Pile.';
                break;
                
            case 'eradicate':
                speakOutput = 'If a cure for a given disease has been discovered and all of the disease cubes of that color have been removed from the board, flip the Cure marker for the disease to the “Sunset” side. From now on, cards of this color have no effect when drawn on the Infector’s turn. Take all of the cubes of the eradicated color and place them back in the box—they will not be used again for the rest of the game. ';
                break;
                
            default:
            speakOutput = "Sorry, that is not a valid action. You can say Drive, take a direct flight, charter flight, shuttle flight, pass turn, research station, discover a cure, treat disease, eradicate, and share knowledge";
                var reprompt = "So, what action do you want to know about?";
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .withSimpleCard("Actions Reference Card", getActionsSummary)
                .reprompt(reprompt)
                .getResponse();
            }
        
        let summary = getActionsSummary();
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard("Actions Reference Card",
            summary)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Thank you for learning how to play, Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const CustomizeMusicIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'CustomizeMusicIntent');
    },
    handle(handlerInput) {
        
        const action = handlerInput.requestEnvelope.request.intent.slots.value.value;
        var speakOutput;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        
        if (action === 'on')
        {
            sessionAttributes.isMusicOn = true;
            speakOutput = "Okay, music is turned on";

        }
        if (action === 'off')
        {
        
            sessionAttributes.isMusicOn = false;
            speakOutput = "Okay, music is turned off";

            
        }
        else {
            speakOutput = "You can say Alexa, turn music on, or Alexa, turn music off."
        }
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            .getResponse();
    }
};


/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${error.stack}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


function getRulesSummary() {
    
    let summary = 'Play proceeds clockwise.\nEACH TURN, THE CURRENT PLAYER MUST:\n1: Do 4 actions.\nSelect any combinations of the available actions.\nYour role may change how an action is completed.\n2: Draw 2 player cards.\n If the card is an Epidemic card follow the Epidemic rules. If there aren’t enough cards to draw, the game immediately ends in defeat for all players.\n3: Infect cities\nDraw cards from the Infection draw pile equal to the current Infection Rate and add 1 cube of the color of each card to the pictured cities';
    return summary;
}

function getSetupSummary() {
    let summary = '1. Set out the board and pieces:\nSeparate the cubes by color into 4 supply piles.\nPlace 1 research station in Atlanta\n2. Place outbreaks and cure markers:\nPlace the outbreaks marker on the “0” space of the Outbreaks Track. Place the 4 cure markers, near the Discovered Cure Indicators.\n3. Place infection rate marker and infect 9 cities:\nPlace the infection rate marker on the left-most “2” space of the Infection Rate Track.\nShuffle the Infection cards and flip over 3 of them. Put 3 disease cubes of the matching color on each of these cities.\nFlip over 3 more cards: put 2 disease cubes on each of these cities.\nFlip over 3 more cards: put 1 disease cube on each of these cities.\n4. Give each player cards and a pawn\nTake the Epidemic cards out the Player Deck and set them aside. ';
    return summary;
}

function getActionsSummary() {
    let summary = 'Drive or Ferry:\rMove to a city connected by a white line to the one you are in.\nDirect Flight\rDiscard a City card to move to the city named on the card.\nCharter Flight\rDiscard the City card that matches the city you are in to move to any city\nShuttle Flight\rMove from a city with a research station to any other city that has a research station\nBuild a Research Station\rDiscard the City card that matches the city you are in to place a research station there.\nTreat Disease\rRemove 1 disease cube from the city you are in, placing it in the cube supply next to the board. If this disease color has been cured (see Discover a Cure below), remove all cubes of that color from the city you are in.\rIf the last cube of a cured disease is removed from the board, this disease is eradicated.\nShare Knowledge\rYou can do this action in two ways: give the City card that matches the city you are in to another player, or take the City card that matches the city you are in from another player. The other player must also be in the city with you. Both of you need to agree to do this. ';
    return summary;
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        SetupIntentHandler,
        RuleIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        RepeatHandler,
        NumberOfPlayersHandler,
        ActionsIntentHandler,
        CustomizeMusicIntentHandler,
        PlayStreamIntentHandler,
        SessionEndedRequestHandler,
        NextIntentHandler,
        RoleIntentHandler,
        PauseHandler,
        DifficultyLevelHandler,
        EpidemicIntentHandler,
        OutbreakIntentHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();