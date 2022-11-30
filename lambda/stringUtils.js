  module.exports = {
    'GREETINGS' : {
    'message': 'You and your companions are highly skilled members of a disease-fighting team waging a battle against four diseases. Your team will travel across the globe, accelerate the spread of the plague. Will you find the cures in time? The fate of humanity is in your hands. I will also be there to guide you if you need me',  
    'followup': 'So how many of you will be playing today?'
    },
    'RULES': {
    '0': 'Welcome to Rules! You can say Alexa, next to hear the next rule, or Alexa, repeat, to go back to the previous rule. I have also sent a reference card on your Alexa card with a summary of all the rules',
    '1': 'Each player’s Role will grant them special abilities that are unique to that player. To know more about your player abilities, say Alexa, and your role',
    '2': 'Each turn, the current player must perform three steps: A: Take 4 actions, B: Draw 2 cards to add to his hand, and C: take on the role of the infector',
    '3': 'A player gets 4 actions to spend on their turn. A given action may be performed more than once during a turn, so long as 1 action is spent for each instance. Players may also pass if they have nothing else to do',
    '4': 'The available actions include Drive, take a direct flight, charter flight, shuttle flight, pass turn, build a research station, discover a cure, treat disease, and share knowledge. To know about these actions in detail, you can say Alexa, and the action name.',
    '5': 'After taking actions, players must draw 2 cards from the Player Draw Pile to add to their hand. If the drawn card is an Epidemic card, you can say Alexa, epidemic to refer to the rules for Epidemics. If there aren’t enough cards in the Player Draw Pile to draw, the game immediately ends in defeat for all players!',
    '6': 'The Player Cards deck contains some Special Event cards. These cards may be played at any time (even on a fellow player’s turn) and do not require an action to play. When you play a Special Event card, immediately follow the instructions on the card, then discard the card into the Player Discard Pile',
    '7': 'Players have a hand limit of 7 cards. If the number of cards in hand ever exceeds 7 as a result of drawing cards (or performing the Share Knowledge action), the player must immediately discard cards in excess to the Player Discard Pile. Players may choose which cards to discard. Players may play Special Event cards (including any they have just drawn) instead of discarding them, to help reduce their hand to 7.',
    '8': 'After drawing cards, player must draw cards from the Infection Draw Pile equal to the current Infection Rate and add one cube to the pictured cities, using a cube of the same color as each card. If, however, the pictured city is of a color that has been eradicated, do not add a cube. If a city already has 3 cubes in it of the color being added, an outbreak occurs in that color. To know more about outbreaks, you can say Alexa, outbreak!',
    '9': 'The game ends immediately in defeat for all players if any of the following conditions occur: A player needs to add disease cubes to the board and there aren’t any left of that color in the supply, The eighth outbreak occurs, There are not enough cards in the Player Draw Pile when a player must draw cards.',
    '10': 'However, Players collectively win the game immediately when the cures for all four diseases have been discovered.'
  },
  'WELCOME': {
      'message': 'Welcome, I am your assistant for the Pandemic, a daring adventure for 2-4 players. You can say Rules, Setup, or Help to access a step by step guide. If this is your first time playing, I recommend starting from the Setup. So, how many of you will be playing today?'
  },
  'SETUP':
  {
    '0': 'Welcome to the setup guide. You and your companions are highly skilled members of a disease-fighting team waging a battle against four diseases. Your team will travel across the globe, accelerate the spread of the plague. Will you find the cures in time? The fate of humanity is in your hands. I will also be there to guide you if you need me. Say Alexa, next to move forward or Alexa, repeat to go back to an instruction',
    '1': 'Start by removing the rulebook and placing the game board on the table within easy reach of all the players. The game has 5 role cards. Shuffle the Role cards and deal 1 to each player',
    '2': 'Place 1 Research Station and all player pawns in Atlanta',
    '3': 'Put the Outbreaks Marker on the “0” space of the Outbreaks Indicator found at the bottom left side of the board',
    '4': 'Now put the Infection Rate Marker on the first space of the Infection Rate Track (marked “2”) on the top right side of the board',
    '5': 'Put the 4 Cure Markers near the Cures Discovered Area on the bottom side of the board.',
    '6': 'There are 96 colored disease cubes, 24 each of yellow, red, blue, and black. Separate them by color and place them near the board in four separate piles ',
    '7': 'Pull the 6 Epidemic cards, which are green in color, out of the Player card deck and set them aside for now.',
    '8': 'Shuffle the remaining Player cards (with the blue backs) and deal each player %(players)s cards face down',
    '9': 'Divide the remaining Player cards into %(difficulty)s piles',
    '10': 'Shuffle an Epidemic card into each pile. Stack the piles on top of each other to form the Player Draw Pile. Put any excess Epidemic cards back into the box.',
    '11': 'Shuffle the Infection cards (with the green backs) and place them face down on the board to form the Infection Draw Pile.',
    '12': 'Draw 3 cards from the Infection Draw Pile and place them face up into the Infection Discard Pile. For each card drawn, add 3 cubes (of the color of the card) to each pictured city',
    '13': 'Draw 3 more cards and do the same thing, but add 2 cubes to each pictured city.',
    '14': 'Draw 3 final cards and do the same as above, but add 1 cube to each city.',
    '15': 'And your game is now set up and ready to play. I have also sent a setup summary on your Alexa app. The player who was most recently sick goes first.'
  },
  'DETAILED':
  {
      'drive': 'To drive or take a ferry, Move your pawn to an adjacent city. Cities are adjacent if they are connected by a red line. Red lines that go off the edge of the board “wrap around” to the opposite board edge and continue to the indicated city. (For example, Sydney and Los Angeles are considered to be adjacent)',
      'direct flight': 'Another action you can take is a Direct Flight: Play a card from your hand and move your pawn to the pictured city. Discard the card to the Player Discard pile.',
      'charter flight': 'You can also take a Charter Flight: Play the card corresponding to your pawn’s current location, and move to any city on the board. Discard the card to the Player Discard pile.',
      'shuttle flight': 'If your pawn is in a city with a Research Station, move it to any other city with a Research Station. (See below for details on building Research Stations.)',
      'pass': 'A player may also elect to pass (and do nothing) for an action.',
      'research station': 'Building Research Stations helps your team move from place to place. Research Stations are also required for discovering cures. Play the card corresponding to the city your pawn currently occupies, then place a Research Station in that city. Discard the card to the Player Discard Pile. If there aren’t any Research Stations left in the supply, select one of the Research Stations already in play and transfer it to the city your pawn occupies.',
      'cure': 'If your pawn is in a city with a Research Station, discard 5 cards of the same color to cure the corresponding disease. Take a Cure marker and place it (vial-side up) on the Discovered Cures area of the board to indicate which disease has been cured. Place the spent cards into the Player Discard Pile. Once your team has discovered all four cures, you win! ',
      'treat': 'Over the course of the game, your team can treat diseases to buy the time needed to discover cures. Remove a disease cube from the city your pawn occupies. (Each removed cube costs one action.) Place the removed cube back into the stock by the side of the board. If players have discovered a cure, instead of one cube, remove all cubes of a cured disease in your current city for one action.',
      'eradicate': 'If a cure for a given disease has been discovered and all of the disease cubes of that color have been removed from the board, flip the Cure marker for the disease to the “Sunset” side. From now on, cards of this color have no effect when drawn on the Infector’s turn. Take all of the cubes of the eradicated color and place them back in the box—they will not be used again for the rest of the game. ',
      'share knowledge': 'Sometimes it’s hard for one player to get the cards necessary to discover a cure. The Share Knowledge action (while difficult to perform) can be useful in these cases. Transfer a card from one player to another. Every card transferred costs 1 action. Both your pawn and your fellow player’s pawn must be in the same city, and you may only transfer the card of the city that you are in together. (For example, if you are together in Moscow, only the Moscow card may be transferred from one player to the other.) If either player holds more than 7 cards as the result of a transfer, the excess cards must be immediately discarded to the Player Discard Pile.'
  },
  'EPIDEMIC':
  {
      '1': 'Whenever a player draws an Epidemic card, discard the card into the Player Discard Pile and do the following. Increase the Infection Rate by moving the Infection Rate Indicator up by one on the Infection Rate Track on the board <break time="3s"/>',
      '2': 'Next, Take the bottom card from the Infection Draw Pile and add 3 cubes to the city pictured on the card. <break time="2s"/> then place the card into the Infection Discard Pile. Note: No city can contain more than 3 cubes of any one color. <break time="1s"/> If the Epidemic would cause the city to exceed that limit, an outbreak is triggered. Say Alexa, outbreak to learn about the rules. <break time="1s"/> If there are not enough cubes to add to the board during an Epidemic, the game immediately ends in defeat for all players <break time="3s"/>',
      '3': 'Next, Take the Infection Discard Pile, thoroughly shuffle it, then place it on top of the remaining Infection Draw Pile. (Don’t shuffle these cards into the Infection Draw Pile)'
  },
  'OUTBREAK':
  {
      '1': 'An outbreak occurs if a player is required to add a cube to a city that already has 3 cubes in it of that color. When this happens, instead of adding a 4th cube, add a cube of the outbreaking color to each adjacent city <break time="3s"/>',
      '2': 'If any of these new cubes would cause the total number of cubes of that color in an adjacent city to exceed 3, additional outbreaks may occur, causing a chain reaction. <break time="1s"/> Note that each city may only outbreak once in each chain reaction <break time="3s"/>',
      '3': 'Each time a city outbreaks, move the Outbreaks Marker up one space on the Outbreak Indicator. <break time="2s"/> If the number of outbreaks ever reaches 8 (and the Outbreaks Marker reaches the skull symbol), the game immediately ends in defeat for all players. <break time="2s"/> Also, if there are not enough cubes to add to the board when infecting, the game immediately ends in defeat for all players'
  },
  'ROLES':
  {
      'contingency planner': 'Contingency planner may, as an action, take an Event card from anywhere in the discard pile and place it on his Role card (<break time="2s"/>only one may be there at a time, and it does not count against his hand limit). <break time="1s"/> When he plays the card, remove it from the game instead of discarding it',
      'dispatcher': 'Dispatcher may, as an action, either move any pawn (<break time="1s"/> if its owner agrees) to any city containing another pawn, <break time="1s"/> or move another player’s pawn (if its owner agrees) as if it were his own. <break time="2s"/> When taking a Direct or Charter Flight, discard cards from his hand. <break time="2s"/> When taking a Charter Flight, the card played must match the city the pawn is moving from.',
      'medic': 'Medic removes all cubes of the same color with the Treat Disease action. <break time="1s"/> If a disease has been cured, he automatically removes all cubes of that color from a city by entering it or being there (<break time="1s"/> this does not take an action). <break time="2s"/> This can occur on other players’ turns. <break time="2s"/> The Medic also prevents placing disease cubes (and outbreaks) of cured disease in his location.',
      'operations expert': 'may, as an action, either build a research station in his current city without discarding (or using) a City card, or once per turn, move from a research station to any city by discarding any City card. The Dispatcher may not use the Operation Expert’s special move ability when moving the Operation Expert’s pawn.',
      'quarantine specialist': 'prevents both outbreaks and the placement of disease cubes in the city he is in and all cities connected to that city.',
      'researcher': 'may, as an action, give any City card from his hand to another player in the same city, without this card having to match the city. The transfer must be from his hand to the other player’s hand, but it can occur on either player’s turn.',
      'scientist': ' only needs 4 City cards of the same disease color to discover a cure for that disease.'
  }
  
  
  };