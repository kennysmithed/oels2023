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
produces.

The picture selection trials work in essentially the same was as picture selection
trials in the perceptual learning experiment.

Picture description trials are a series of html-audio-response trials, where we use 
the html stimulus to present a pair of images.
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
/*** Maintaining a list of images to preload **********************************/
/******************************************************************************/

/*
We can auto-load the audio used on audio-button-response trials.

Images which appear in buttons on picture selection trials are not automaticaly pre-loaded,
as we saw in the perceptual learning experiment

Our stimulus on picture description trials will *also* not be preloaded, because 
we have to make two images appear side-by-side, which involves using an 
html-audio-response trial (which doesn't automatically preload images) rather than 
an image-button-response trial (which does).

In order to preload images, we are going to look keep a list of images that appear in 
picture selection and picture description trials - we will build this list as we create
the trial list, then preload it when the experiment starts.
*/

//initially our images_to_preload list contains only 1 image, the microphone!
var images_to_preload = ["mic"];

/******************************************************************************/
/*** Saving data trial by trial ***********************************************/
/******************************************************************************/

/*
This is the save_data function provided in Alisdair's tutorial, section 06. 
*/
function save_data(name, data_in) {
  var url = "save_data.php";
  var data_to_send = { filename: name, filedata: data_in };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data_to_send),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
}

/*
This is a slightly modification to Alisdair's saveDataLine code. Note that data is
save to a file named cp_ID.csv, where cp stands for confederate priming and ID is
the randomly-generated participant ID.

We have to check which trial type we are selecting data for, since picture_description 
trials lack a button_choices and button_selected entries. There's also no point 
saving the data.response info for picture_description trials, since it just indicates 
the participant clicking on the mic button, so we will save "NA" for those missing values.

For picture_selection trials, data.button_choices will be a list of 2 image names - 
here I am using .join to turn that list into a single string for writing, rather than doing 
e.g. data.button_choices[0], data.button_choices[1], data.button_choices[2], etc to
write all those choices to the CSV. target_image and foil_image are set to NA here.
*/
function save_confederate_priming_data(data) {
  // choose the data we want to save - this will also determine the order of the columns
  if (data.participant_task == "picture_selection") {
    var button_choices_as_string = data.button_choices.join(",");
    var data_to_save = [
      participant_id,
      data.trial_index,
      data.participant_task,
      data.time_elapsed,
      data.stimulus,
      "NA",
      "NA", //'missing' target and foil image
      button_choices_as_string,
      data.response,
      data.button_selected,
      data.rt,
    ];
  } else if (data.participant_task == "picture_description") {
    var data_to_save = [
      participant_id,
      data.trial_index,
      data.participant_task,
      data.time_elapsed,
      "NA", //'missing' sound file
      data.target,
      data.foil,
      "NA",
      "NA", //'missing' button_choices for description trials
      "NA", //'missing' data.response
      "NA", //'missing' button_selected
      data.rt,
    ];
  }
  // join these with commas and add a newline
  var line = data_to_save.join(",") + "\n";
  var this_participant_filename = "cp_" + participant_id + ".csv";
  save_data(this_participant_filename, line);
}

/******************************************************************************/
/*** Generate a random participant ID *****************************************/
/******************************************************************************/

/*
We'll generate a random participant ID when the experiment starts, and use this
to save a seperate set of data files per participant.
*/

var participant_id = jsPsych.randomization.randomID(10);

/******************************************************************************/
/*** Random waits *************************************************************/
/******************************************************************************/

/*
At several points in the code we want to generate a random wait, to simulate the
confederate participant pondering what to say or hunting for the correct image.
The random_wait function below will return a number between 1800 and 3000, which
be used as the delay (in milliseconds) on screens where the participant is waiting 
for the confederate.
*/

function random_wait() {
  return 1800 + Math.floor(Math.random() * 1200);
}



/******************************************************************************/
/*** Picture selection trials *************************************************/
/******************************************************************************/

/*
Picture selection: wait while the confederate prepares to click their mic button
(in reality, a random duration wait), then hear a description from the confederate
plus two pictures, then click on a picture.

make_picture_selection_trial takes the base name of the sound file to present,
and the base names of the target and foil pictures. It works out the path and full 
filename for the audio file,  then builds a 2-part trial 
(using a nested timeline): a short delay while we supposedly wait for the confederate
to speak (achieved using an audio-button-response trial with little bit of silence as 
the sound file) then an audio-button-response trial where the participant listens to 
the confederate audio and  makes a selection. The function returns this trial object.

Note that the crucial selection_trial is closely based on the picture selection trials
in the perceptual learning experiment we covered last week - the main difference is that 
we shuffle the two buttons when creating the trial, since we need to show the choices 
in the same order in the pre-speaking delay and in the actual audio-button-response trial.
*/
function make_picture_selection_trial(sound, target_image, foil_image) {
  //add target_image and foil_image to our preload list
  images_to_preload.push(target_image);
  images_to_preload.push(foil_image);

  //create sound file name
  var sound_file = "sounds/" + sound + ".wav";

  //generate random wait and random order of images
  var wait_duration = random_wait();
  var shuffled_image_choices = jsPsych.randomization.shuffle([
    target_image,
    foil_image,
  ]);

  //trial for the delay before the partner starts speaking
  var waiting_for_partner = {
    type: jsPsychAudioButtonResponse,
    stimulus: "sounds/silence.wav",
    prompt: "<p><em>Click on the picture your partner described</em></p>",
    choices: shuffled_image_choices,
    trial_duration: wait_duration,
    response_ends_trial: false, //just ignore any clicks the participant makes here!
    button_html:
      '<button class="jspsych-btn"> <img src="images/%choice%.png" width=250px></button>',
  };
  //audio trial
  var selection_trial = {
    type: jsPsychAudioButtonResponse,
    stimulus: sound_file,
    prompt: "<p><em>Click on the picture your partner described</em></p>",
    choices: shuffled_image_choices,
    button_html:
      '<button class="jspsych-btn"> <img src="images/%choice%.png" width=250px></button>',
    post_trial_gap: 500, //a little pause after the participant makes their choice
    on_start: function (trial) {
      trial.data = {
        participant_task: "picture_selection",
        button_choices: shuffled_image_choices,
      };
    },
    on_finish: function (data) {
      var button_number = data.response;
      data.button_selected = data.button_choices[button_number];
      save_confederate_priming_data(data); //save the trial data
    },
  };
  var full_trial = { timeline: [waiting_for_partner, selection_trial] };
  return full_trial;
}

/******************************************************************************/
/*** Infrastructure for recording audio ***************************************/
/******************************************************************************/

/*
On picture description trials we will be recording audio using the 
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

/*
We also need to save the audio data generated on each trial. This is handled by
the save_audio function, which takes the data object generated by our 
html-audio-response trial, constructs a filename for the saved audio (which will 
consist of the participant ID and a unique number identifier corresponding to the 
current trial index), then uses the save_audio.php script to save this audio.
*/

function save_audio(data) {
  var audio_data = data.response;
  var trial_index = data.trial_index;
  var url = "save_audio.php";
  var this_recording_filename = participant_id + "_" + trial_index + ".wav";
  var data_to_send = {
    filename: this_recording_filename,
    data: audio_data,
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data_to_send),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
}

/******************************************************************************/
/*** Picture description trials ********************************************/
/******************************************************************************/

/*
Picture description: see the picture to be described, click
on the mic icon to begin recording a description, then click on the mic icon to
stop recording, then finally wait while the confederate
prepares completes the picture selection task (in reality, a random duration wait).

make_picture_description_trial takes the name of the target and foil image to present, 
and constructs a composite HTML object showing those two images next to one another, with 
the target highlighted with a green box. It then constructs a 3-part trial (using a nested 
timeline). The 3 parts are:
1. Show the composite image plus white mic button, using html-button-response plugin. When 
  the participant clicks the mic button, we move on to 2.
2. Change mic orange and start recording audio (using the html-audio-response plugin). When
  the participant clicks the mic button again, stops recording audio.
3. Show a "waiting for partner" message.

In Loy & Smith (2021) we indicated the target picture with an arrow; here we are indicating 
the target using a green box (because it's easier to implement!).
*/

function make_picture_description_trial(target_image, foil_image) {
  //add target_image and foil_image to our preload list
  images_to_preload.push(target_image);
  images_to_preload.push(foil_image);

  //generate random wait 
  var wait_duration = random_wait();
  
  //need to highlight the target with a green border
  var target_image_as_html =
    "<img src=images/" +
    target_image +
    ".png style='border:5px solid green; width:250px'>";
  var foil_image_as_html =
    "<img src=images/" + foil_image + ".png style='width:250px'>";

  //shuffle and paste together into a composite bit of html
  var shuffled_images = jsPsych.randomization.shuffle([
    target_image_as_html,
    foil_image_as_html,
  ]);
  var composite_image = shuffled_images[0] + shuffled_images[1];
  var composite_image_with_prompt =
    composite_image + "<p><em>Describe the picture in the green box</em></p>";

  //html button response
  var picture_plus_white_mic = {
    type: jsPsychHtmlButtonResponse,
    stimulus: composite_image_with_prompt,
    choices: [
      '<img src="images/mic.png" style="background-color:white; width:75px">',
    ],
  };
  var record_audio = {
    type: jsPsychHtmlAudioResponse,
    stimulus: composite_image_with_prompt,
    recording_duration: 10000,
    done_button_label:
      '<img src="images/mic.png" style="background-color:Darkorange; width:75px">',
    on_finish: function (data) {
      data.participant_task = "picture_description";
      data.target = target_image;
      data.foil = foil_image;
      save_audio(data);
      save_confederate_priming_data(data);
    },
  };
  var waiting_for_partner = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "Waiting for partner to select",
    choices: [],
    trial_duration: wait_duration,
    post_trial_gap: 500, //short pause after the confederate makes their selection
  };
  var full_trial = {
    timeline: [picture_plus_white_mic, record_audio, waiting_for_partner],
  };
  return full_trial;
}

/******************************************************************************/
/*** Building an interaction timeline *****************************************/
/******************************************************************************/

/*
Finally we can use the make_picture_selection_trial and make_picture_description_trial
functions to build the timeline for our interaction phase.

This timeline has 4 pairs of selection-description trials, running:
filler (confederate describes face)
filler (participant describes fruit/vegetable)
critical trial (confederate describes red sock using adjective)
filler (participant describes animal)
filler (confederate describes face)
critical trial (participant describes red bowl)
*/

var interaction_trials = [
  //filler (confederate describes face)
  make_picture_selection_trial("f_fr1", "f_fr1", "f_ha2"),
  //filler (participant describes fruit/vegetable)
  make_picture_description_trial("frv3", "frv12"),
  //critical trial (confederate describes red sock using adjective)
  make_picture_selection_trial("g4_c1_1", "g4_c1", "g2_c3"),
  //filler (participant describes animal)
  make_picture_description_trial("ani1", "ani15"),
  //filler (confederate describes face)
  make_picture_selection_trial("f_su3", "f_su4", "f_sa1"),
  //critical trial (participant describes red bowl)
  make_picture_description_trial("k1_c1", "k2_c2"),
];

/******************************************************************************/
/*** Preload ******************************************************************/
/******************************************************************************/

/*
Once all the other trials have been created, images_to_preload should contain a list
of image names, e.g. ["mic","f_fr1", "f_ha2", etc]. We can simply loop through this
list, adding the path and file extension to each image name, and use the resulting 
list of images in our preload trial.
*/

var images_to_preload_with_path = [];
for (image of images_to_preload) {
  var full_image_name = "images/" + image + ".png";
  images_to_preload_with_path.push(full_image_name);
}

/*
Now we can make our preload trial
*/
var preload = {
  type: jsPsychPreload,
  auto_preload: true,
  images: images_to_preload_with_path,
};

/******************************************************************************/
/*** Write headers for data file **********************************************/
/******************************************************************************/

/*
Same as the perceptual learning practical.
*/
var write_headers = {
  type: jsPsychCallFunction,
  func: function () {
    var this_participant_filename = "cp_" + participant_id + ".csv";
    save_data(
      this_participant_filename,
      "participant_id,trial_index,participant_task,time_elapsed,sound_file,target_image,foil_image,button_choice0,button_choice1,response,button_selected,rt\n"
    );
  },
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
  write_headers,
  pre_interaction_instructions,
  interaction_trials,
  final_screen
);

/******************************************************************************/
/*** Run the timeline *******************************************************/
/******************************************************************************/

jsPsych.run(full_timeline);
