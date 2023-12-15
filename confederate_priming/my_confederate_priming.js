/******************************************************************************/
/*** Preamble *****************************************************************/
/******************************************************************************/

/*
Participants alternate between two trial types:

Picture selection trials, where they hear audio from their partner (in fact recorded
audio from our confederate) and select the matching picture from 2 possibilities. 

Picture description trials, where they see a picture and produce a description for
their partner (clicking a mic icon to start and stop recording). 

We simulate the confederate preparing to speak and making a selection based on the 
participant's productions by inserting variable-duration "waiting for partner" screens.

We are interested in whether, on critical trials, the construction used by the partner
(featuring a redundant colour adjective) influences the description the participant 
produces on the following picture description trial.
*/

/******************************************************************************/
/*** Initialise jspsych *******************************************************/
/******************************************************************************/

/*
As usual, we will dump all the trials on-screen at the end so you can see what's
going on. Note that data on critical trials is saved trial-by-trial as the experiment
runs, so unlike the word learning experiment we don't need to save all the data at 
the end of the experiment.
*/

var jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData("csv"); //dump the data to screen
  },
});


/******************************************************************************/
/*** Generate a random participant ID *****************************************/
/******************************************************************************/

/*
We'll generate a random participant ID when the experiment starts, and use this
to save a separate set of data files per participant.
*/

var participant_id = jsPsych.randomization.randomID(10);


/******************************************************************************/
/*** Picture selection trials *************************************************/
/******************************************************************************/

/*
Picture selection: wait while the confederate prepares to click their mic button
(in reality, a random duration wait), then hear a description from the confederate
plus two pictures, then click on a picture.
*/

// Your implementation here


/******************************************************************************/
/*** Infrastructure for recording audio ***************************************/
/******************************************************************************/

/*
On picture description trials you might want to record audio using the 
html-audio-response plugin. To do this we need to have the participant give us 
permission to access their mic, then select which mic to use. Permission to access 
the mic happens through a pop-up in the browser, but we warn them it is coming. 
For selecting their mic (which also initialises it) we can use the 
jsPsychInitializeMicrophone plugin. 
*/

//A simple warning that they are going to have to grant access to the mic
var audio_permission_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h3>Permission to access your microphone</h3>\
  <p style='text-align:left'>In this experiment you will be interacting with another participant. \
  You will be recording audio descriptions using your microphone, and listening to \
  descriptions your partner has recorded.</p>\
  <p style='text-align:left'><b>On the next screen we will ask for permission to access your microphone</b>. \
  When the pop-up appears asking for permission to access your microphone, please grant \
  access, otherwise the experiment won't work. </p>\
  <p style='text-align:left'>We will only record when you click the record button - you are always in control.</p>",
  choices: ["Continue"]
};

//then have them select a mic
var initialize_mic = {
  type: jsPsychInitializeMicrophone
};


/******************************************************************************/
/*** Picture description trials ********************************************/
/******************************************************************************/

/*
Picture description: see the picture to be described, click
on the mic icon to begin recording a description, then click on the mic icon to
stop recording, then finally wait while the confederate
prepares completes the picture selection task (in reality, a random duration wait).
*/

// Your implementation here


/******************************************************************************/
/*** Preload ******************************************************************/
/******************************************************************************/

var preload = {
  type: jsPsychPreload,
  auto_preload: true
};


/******************************************************************************/
/*** Native English check *****************************************************/
/******************************************************************************/

/*
NB This wasn't included in the original study, but we want to show you how to 
use conditionals to screen participants.

We ask a simple yes-no question using the jsPsychSurveyMultiChoice plugin.
The on the following trial (native_english_check) we look at the response and 
either run or do not run an trial (nonnative_english_exclusion_screen) which 
participants cannot escape from - we run this if they do not meet our eligibilty 
criterion, i.e. if they are not native speakers or English, they end up stuck.
*/

// A simple 2-choice question
var native_english_question = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      prompt: "Are you a native speaker of English?",
      name: "NativeEnglish",
      options: ["Yes", "No"],
      required: true,
    },
  ],
};

/* 
This is the screen participants will see if they report 
being non-native speakers - note there are no choices, so it cannot be exited
to get to the rest of the experiment timeline.
*/
var nonnative_english_exclusion_screen = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<p style='text-align:left'>Sorry, but we can only use native speakers of English in this experiment.</p>",
  choices: [],
};

/*
This is our conditional trial - we run timeline if the conditional_function returns true
*/
var native_english_check = {
  timeline: [nonnative_english_exclusion_screen],
  conditional_function: function () {
    // get the data from the last trial
    var data = jsPsych.data.get().last(1).values()[0];
    //retrieve their answer to the question - this will be Yes or No
    var answer = data.response.NativeEnglish;
    if (answer == "No") {
      //this means we *will* run the conditional timeline
      return true;
    } else {
      //this means we will not
      return false;
    }
  },
};


/******************************************************************************/
/*** Instruction trials *******************************************************/
/******************************************************************************/

/*
As usual, your experiment will need some instruction screens.
*/

var consent_screen = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h3>Welcome to the experiment</h3> \
  <p style='text-align:left'>Experiments begin with an information sheet that explains to the participant \
  what they will be doing, how their data will be used, and how they will be \
  remunerated.</p> \
  <p style='text-align:left'>This is a placeholder for that information, which is normally reviewed \
  as part of the ethical review process.</p>",
  choices: ["Yes, I consent to participate"],
};

var pre_interaction_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h3>Instructions for interaction</h3>\
  <p style='text-align:left'>During the experiment, you will alternate between describing pictures \
  to your partner and matching pictures your partner describes to you.</p>\
  <p style='text-align:left'>When it is your turn to describe, you will see two pictures, one of which \
  will be highlighted with a green box. You should <u>describe the picture highlighted in the green box</u> to \
  your partner. Click the mic icon to start recording audio, then click again to stop. There are no rules \
  as to what you can or cannot say; you can name the object if you like. \
  Remember that your partner sees the same two pictures, but they may not be in the same positions \
  (left/right).</p>\
  <p style='text-align:left'>When it is your turn to match, simply click on the picture your partner \
  describes to you.</p>",
  choices: ["Continue"],
};

var final_screen = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h3>Finished!</h3>\
  <p style='text-align:left'>Experiments often end with a final screen, e.g. that contains a completion\
  code so the participant can claim their payment.</p>\
  <p style='text-align:left'>Click Continue to finish the experiment and see your raw data. \
  Your trial was also saved to the server trial by trial.</p>",
  choices: ["Continue"],
};

/******************************************************************************/
/*** Build the full timeline *******************************************************/
/******************************************************************************/

var full_timeline = [].concat(
  consent_screen,
  native_english_question,
  native_english_check,
  audio_permission_instructions,
  initialize_mic,
  preload,
  pre_interaction_instructions,
  // interaction trials go in here
  final_screen
);

/******************************************************************************/
/*** Run the timeline *******************************************************/
/******************************************************************************/

jsPsych.run(full_timeline);

