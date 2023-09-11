**For non-Edinburgh people**: all the course materials are here and you are welcome to use them with attribution. If you would like us to run something like this for your students or research group, [contact Kenny](mailto:kenny.smith@ed.ac.uk).

This is the webpage for the Honours/MSc course Online Experiments for Language Scientists, running in academic year 2023/2024. I will add links to materials (readings, code) to this page; you will need to use Learn for electronic submission of your assessed work, and to keep an eye on announcements.

## Course summary

Many areas in the language sciences rely on collecting data from human participants, from grammaticality judgments to behavioural responses (key presses, mouse clicks, spoken responses). While data collection traditionally takes place face-to-face, recent years have seen an explosion in the use of online data collection: participants take part remotely, providing responses through a survey tool or custom experimental software running in their web browser, with surveys or experiments often being advertised on crowdsourcing websites like Amazon Mechanical Turk (MTurk) or Prolific. Online methods potentially allow rapid and low-effort collection of large samples (and are also useful in situations where face-to-face data collection is not possible, e.g. during a pandemic); however, building and running these experiments poses challenges that differ from lab-based methods.

This course will provide a rapid tour of online experimental methods in the language sciences, covering a range of paradigms, from survey-like responses (e.g. as required for grammaticality judgments) through more standard psycholinguistic methods (button presses, mouse clicks) up to more ambitious and challenging techniques (e.g. voice recording, real-time interaction through text and/or streaming audio, iterated learning). Each week we will read a paper detailing a study using online methods, and look at code (written in javascript using jsPsych) to implement a similar experiment - the examples will skew towards the topics I am interested in (artificial language learning, communication, language evolution), but we'll cover more standard paradigms too (grammaticality judgments, self-paced reading) and the techniques are fairly general anyway. We’ll also look at the main platforms for reaching paid participants, e.g. MTurk and Prolific, and discuss some of the challenges around data quality and the ethics of running on those platforms.

No prior experience in coding is assumed, but you have to be prepared to dive in and try things out; the assessment will involve elements of both literature review and coding.

## The teaching team

The course is co-taught by [Kenny Smith](http://www.lel.ed.ac.uk/~kenny/) and [Alisdair Tullo](https://www.ed.ac.uk/profile/alisdair-tullo/). Kenny (that's me) is the main lecturer and the course organiser; Alisdair is the PPLS javascript/jsPsych guru and delivers the lab sessions with Kenny. Best way to get in touch with us is in one of the live sessions, see below, or by email to [kenny.smith@ed.ac.uk](mailto:kenny.smith@ed.ac.uk) or [alisdair.tullo@ed.ac.uk](mailto:alisdair.tullo@ed.ac.uk).

We'll also be supported in lab classes by three excellent tutors: Aislinn Keogh, Vilde Reksnes, and Maisy Hallam. 

## Class times

The course runs in semester 1. We have lectures 9am-9.50am on Mondays, and lab classes 9am-10.50am on **Thursdays** (note that this is a change to the original timetabled slot for lab classes). There are also extra drop-in labs available in weeks 1-3 and in the run-up to the final assignment, see below.

Lectures and labs are both essential to doing well on the course - the assessment involves an understanding both of the literature on online experiments (covered in the readings and lectures) and the practicalities of how to build them (covered in your own work on the practicals, with support available in the labs).

### Arrangements for lectures and labs

Lectures take place on Monday mornings, 9am-9.50am, in room S1, [7 George Square](https://www.ed.ac.uk/maps/maps?building=0209) - as far as I can work out, S indicates Second floor. Labs are on Thursday mornings, 9am-10.50am, in room 4.02 [Appleton Tower](https://www.ed.ac.uk/maps/maps?building=0201) (PPLS Computing Lab). 

Hopefully this goes without saying, but *do not come to lectures or labs if you are unwell or think you might be!* If you are unwell you can participate in lectures remotely, so you won't miss out and you'll be protecting the rest of us. Instructions on how to access live lecture streams/recordings are on the course page on Learn. If I am isolating or unwell (but still well enough lecture) we'll do the lecture remotely. There is no remote option for labs other than the drop-in labs listed below, but still don't turn up if you are unwell.

## Assessment

There are different assessments for undergraduates and postgraduates.

### Undergraduate assessment 

The undergraduate version of the course is worth 20 credits and there are two pieces of assessment, due on 9th November and 7th December. Assessment 1 is an annotated bibliography reviewing and evaluating 4 articles typically drawn from the course set readings. Assessment 2 is a project where you produce a working experiment implemented in jsPsych and an accompanying report explaining the motivation behind that experiment, justifying important design decisions you took in building the experiment, and appraising the experiment and ways it could be improved/extended. Full details will be provided in the undergraduate assignment brief, and [the FAQ](assessment/oels_assignment_faq.md) (which also features examples of good assignments). 

### Postgraduate assessment

The postgraduate version of the course is worth 10 credits and there is a single piece of assessment, due on 7th December. This assessment is a project where you produce a working experiment implemented in jsPsych and an accompanying report explaining the motivation behind that experiment, justifying important design decisions you took in building the experiment, and appraising the experiment and ways it could be improved/extended. Full details will be provided in the postgraduate assignment brief, and [the FAQ](assessment/oels_assignment_faq.md) (which also features examples of good assignments). 

## Course Materials

Course content will appear here as we work through the course.

Each week there will be a set reading and a programming assignment. The reading involves a blog post introducing a published paper, you read both the blog and the paper, the lecture then provides an additional brief overview and an opportunity to ask questions/discuss the reading. The programming assignment involves working through a section of the [Online Experiments with jsPsych](https://softdev.ppls.ed.ac.uk/online_experiments/index.html) tutorial and/or looking at (and editing) some code which implements a language-related experiment; you can use the lab classes as dedicated time to work on the programming task and get help with programming difficulties or questions you have.

### Week 1 (commencing 18th September): Introduction

- *Scientific content:* minimal (but I'll go over the practicalities of the course, assessments etc)
- *Technical content:* jsPsych basics
- [Reading](oels_reading_wk1.md)
- [Programming task](oels_practical_wk1.md)
- Lecture slides to appear here

### Week 2 (25th September): Crowdsourcing experimental data

- *Scientific content:* lab vs online data collection
- *Technical content:* more jsPsych and javascript basics
- [Reading](oels_reading_wk2.md)
- [Programming task](oels_practical_wk2.md)
- Lecture slides to appear here

### Week 3 (2nd October): Grammaticality judgements

- *Scientific content:* lab vs online grammaticality judgments; syntactic processing and acceptability
- *Technical content:* simple key- and button-press responses
- [Reading](oels_reading_wk3.md)
- Programming task to appear here
- Lecture slides to appear here

### Week 4 (9th October): Self-paced reading

- *Scientific content:* processing costs of syntactic dependencies
- *Technical content:* collecting reaction time data, more complex nested trials
- [Reading](oels_reading_wk4.md)
- Programming task to appear here
- Lecture slides to appear here

### Week 5 (16th October): Lab catchup week

In week 5 there is no lecture, but we have a lab as usual - use this time to catch up on labs from previous weeks, and/or to catch up on / get ahead with your reading.

### Week 6 (23rd October): Word learning / frequency learning

- *Scientific content:* probability matching and regularisation
- *Technical content:* using trial data for contingent trials, saving data
- [Reading](oels_reading_wk6.md)
- Programming task to appear here
- Lecture slides to appear here

### Week 7 (30th October): Audio stimuli

- *Scientific content:* speech perception, social influences on phonetic adaptation
- *Technical content:* Audio, trial data again, preloading stimuli, saving data trial by trial
- [Reading](oels_reading_wk7.md)
- Programming task to appear here
- Lecture slides to appear here

### Week 8 (6th November): Priming and overspecification

- *Scientific content:* Priming and overspecification
- *Technical content:*  Audio recording, custom preload lists, reading trial lists from CSV
- Reading to appear here
- Programming task to appear here
- Lecture slides to appear here

### Week 9 (13th November): Iterated Learning

- *Scientific content:* iterated learning and the evolution of compositional structure
- *Technical content:* looping trials, reading trial lists from CSVs again, PHP scripts for iteration
- [Reading](oels_reading_wk9.md)
- Programming task to appear here
- Lecture slides to appear here

### Week 10 (20th November): Participant-to-participant interaction

- *Scientific content:* least effort and Zipf's Law of Abbreviation
- *Technical content:* web sockets, python servers, incrementally building a timeline
- [Reading](oels_reading_wk10.md)
- Programming task to appear here
- Lecture slides to appear here

### Week 11 (27th November): Interacting with MTurk

No lecture or lab in week 11, but there are some materials that will be useful for you to read if you are thinking of setting up a real experiment in the wild!

- *Scientific content:* None!
- *Technical content:* How to set up a server, launch and pay participants, manage qualifications, etc
- [How to get your experiment online](oels_wk11.md)

### Bonus content

I am sticking some extra documented experiments I have created here, in case they are useful for someone or provide inspiration.

- [Co-speech gesture experiment](bonus/cospeech_gesture.md), presenting a video and getting button/text responses.
- [Semantic extension experiment](https://github.com/kennysmithed/SemanticExtension). This is a more complex experiment looking at how participants extend the meaning of novel signals in a communication game. It is based on the dyadic interaction code from week 10, but includes additional machinery to deal with a wider range of participant drop-outs, has on-screen trial counters, a warm-up with catch trials.
- [Custom html-button-response plugin with buttons laid out in a grid](https://github.com/aislinnkeogh/custom-jspysch-plugins/blob/main/plugin-html-button-response-grid.js), written by Aislinn Keogh - uses an html table to do that, the plugin provides 2 additional parameters, `rows` and `columns`, e.g. for a 3 row, 2 column grid you'd do ```{type: jsPsychHtmlButtonResponseGrid, rows: 3, columns: 2, choices: [6 choices here]}```

### Additional drop-in labs

Aislinn will be available on Teams in weeks 1-3 at the tikmes listed below to do a short drop-in lab to catch people who joined the course late and missed the lab, or need a bit of extra support in the early stages of the course. See the course Learn page for instructions on how to access the drop-in labs on Teams. Note that these are not compulsory, and they are drop-ins not extra labs - the idea is that you come along, ask a couple of questions, then go away.

Aislinn will be available on Teams:
- Thursday 21st September, 2pm-3pm
- Thursday 28th September, 2pm-3pm
- Thursday 5th October, 2pm-3pm

We will provide some extra drop-in labs to give you an opportunity to get some help with your code for the final assignment. Obviously we won't write your code for you, but if you are having trouble interpreting an error message or finding a bug or want some tips on how to achieve a particular effect we can help you figure it out. Note that these are not compulsory, and they are drop-ins not extra labs - the idea is that you come along, ask a couple of questions, then go away. Dates and times TBC, but these will begin roughly 2 weeks before the final assessment is due.


## Re-use

All aspects of this work are licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).