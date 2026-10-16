/* =====================================================================
   BRAN PETERSON PORTFOLIO: CONTENT
   ---------------------------------------------------------------------
   This is the only file you need to touch to add or change work.

   HOW TO ADD A PIECE
   1. Drop the image in the matching folder, e.g. images/illustrations/
   2. Copy one { ... } block below, paste it where you want it to show up
      (top of the list = first on the page), and fill it in.
   3. Save. Refresh the site. Done.

   image  = the big version (opens in the lightbox)
   thumb  = optional smaller copy for the board (loads faster). If you
            leave it out, the big image is used everywhere.

   PROCESS / REWIND (illustrations)
   Give a piece a  process: [ ... ]  list and a "rewind the process"
   arrow appears under it when it's opened. List the steps IN THE ORDER
   YOU MADE THEM (first thumbnail first). The site plays them backwards
   from the finished piece. Put the files in images/illustrations/process/
     process: [
       { image: "images/illustrations/process/skater/1-thumbnails.jpg", label: "thumbnails" },
       { image: "images/illustrations/process/skater/2-sketch.jpg",     label: "rough sketch", note: "optional sentence" },
       { image: "images/illustrations/process/skater/3-lineart.jpg",    label: "line art" },
       { image: "images/illustrations/process/skater/4-flats.jpg",      label: "flat colors" },
     ]

   Lines marked  // PLACEHOLDER  are sample copy for Bran to replace.
   ===================================================================== */

window.SITE = {

  name: "Bran Peterson",
  tagline: ["illustrator", "animator", "art teacher"],
  email: "Branparts@gmail.com",
  instagram: "brandasund.peterson",

  /* Contact form: paste a Formspree form URL here (free at formspree.io)
     to have messages land in Bran's inbox. Left empty, the Send button
     opens the visitor's email app with the message filled in. */
  formEndpoint: "",

  /* ---------------------------------------------------------------- */
  illustrations: {
    intro: "Illustrations, posters, album covers, character designs and sketches. Click any piece to see it bigger.",
    /* The filter post-its, in order. Give every piece one of these in tags.
       A category with nothing in it yet shows a "coming soon" note. */
    categories: ["Illustrations", "Posters and Album Covers", "Character Designs", "Sketches and studies"],
    items: [
      { title: "Skater Fights Off Telekinetic Martian Invaders in the Produce Aisle of the Grocery Store (from the Perspective of the Skateboard)",
        short: "Skater vs. Martian Invaders", year: "2025", tags: ["Illustrations"],
        image: "images/illustrations/skater-vs-martian-invaders.jpg", thumb: "images/illustrations/skater-vs-martian-invaders-sm.jpg",
        note: "a.k.a. SFOTMIITPAOTGS(FTPOTS)",
        process: [] },
      { title: "Purple Pufferfish in Green City", year: "2025", tags: ["Illustrations"],
        image: "images/illustrations/purple-pufferfish-in-green-city.jpg", thumb: "images/illustrations/purple-pufferfish-in-green-city-sm.jpg",
        process: [] },
      { title: "Colony Album Cover", year: "2024", tags: ["Posters and Album Covers"], note: "Album cover for The Colony.",
        image: "images/illustrations/colony-album-cover.jpg", thumb: "images/illustrations/colony-album-cover-sm.jpg",
        process: [] },
      { title: "Metal vs. Man", year: "2026", tags: ["Illustrations"],
        image: "images/illustrations/metal-vs-man.jpg", thumb: "images/illustrations/metal-vs-man-sm.jpg",
        process: [] },
      { title: "Purpose Without People", tags: ["Posters and Album Covers"], note: "Poster for Mind of Their Own, my animated short.",
        image: "images/illustrations/moto-poster-purpose-without-people.jpg", thumb: "images/illustrations/moto-poster-purpose-without-people-sm.jpg",
        process: [] },
      { title: "A Few Screws Loose", tags: ["Posters and Album Covers"], note: "Poster for Mind of Their Own, my animated short.",
        image: "images/illustrations/moto-poster-a-few-screws-loose.jpg", thumb: "images/illustrations/moto-poster-a-few-screws-loose-sm.jpg",
        process: [] },
      { title: "Made For A Reason", tags: ["Posters and Album Covers"], note: "Poster for Mind of Their Own, my animated short.",
        image: "images/illustrations/moto-poster-made-for-a-reason.jpg", thumb: "images/illustrations/moto-poster-made-for-a-reason-sm.jpg",
        process: [] },
      { title: "Untitled portrait", tags: ["Posters and Album Covers"],                     // PLACEHOLDER title (file was IMG_4749)
        image: "images/illustrations/untitled-portrait.jpg", thumb: "images/illustrations/untitled-portrait-sm.jpg",
        process: [] },
      { title: "Spaghetti Box", tags: ["Illustrations"],                             // PLACEHOLDER title (file was speghettibox3)
        image: "images/illustrations/spaghetti-box.jpg", thumb: "images/illustrations/spaghetti-box-sm.jpg",
        process: [] },
    ]
  },

  /* ---------------------------------------------------------------- */
  animations: {
    intro: "The Mind of Their Own trailer, plus the animatic behind it. Everything plays right on the board.",
    /* video: a .mp4 in images/animations/  OR a YouTube/Vimeo link.
       The trailer is the big screen at the top. */
    showreel: { title: "Mind of Their Own: trailer", video: "images/animations/moto-trailer.mp4", poster: "images/animations/moto-trailer-poster.jpg", length: "1:47" },
    note: ["Mind of Their Own", "proof of concept trailer"],
    award: ["Presidential Purchase Award", "Adelphi University"],
    website: { label: ["Visit the", "Mind of Their Own", "website"], url: "https://mindoftheirown.netlify.app" },
    /* The animatic gets its own section under the trailer */
    animatic: { title: "Mind of Their Own: animatic", video: "images/animations/moto-animatic.mp4", poster: "images/animations/moto-animatic-poster.jpg", length: "1:18",
                note: "Where it started: the short timed out in rough boards, before any final animation." },
    sidenote: { lines: ["the posters for it", "are in Illustrations"], link: "illustrations" },
    /* Shorts & loops strip. Hidden until at least one clip has a video. */
    clips: [
      // { title: "Walk cycle", video: "images/animations/walk-cycle.mp4", poster: "images/animations/walk-cycle.jpg", length: "0:06" },
    ],
    /* "How a shot gets made": three images from one shot. Hidden until filled. */
    process: [
      // { label: "thumbnail", image: "images/animations/shot-thumbnail.jpg" },
      // { label: "rough",     image: "images/animations/shot-rough.jpg" },
      // { label: "clean + color", image: "images/animations/shot-final.jpg" },
    ]
  },

  /* ---------------------------------------------------------------- */
  teaching: {
    intro: "Projects, classroom moments and student work from my elementary and middle school classes and the art class I teach.",
    subjects: [
      "Art + design fundamentals: line, shape, color",
      "Character design",
      "Still life painting",
      "Art history-based projects",
      "Creative process, from thumbnail to final",
    ],
    tip: ["Every class balances", "study time + studio time"],
    studentsTaught: "",          // e.g. "150+" (leave empty to hide the circle)

    philosophy: {
      quote: ["Beyond the technical skills of art,", "I also want to teach people about", "creativity, ingenuity, and process."],
      principles: [
        { title: "Study + studio time",   text: "Every class balances learning the fundamentals with time to experiment." },
        { title: "Fundamentals travel",   text: "Line, shape and color carry over into sculpture, fashion, photography and beyond." },
        { title: "Effort over polish",    text: "Grades are based on effort and participation, not how perfect the final piece looks." },
        { title: "Every student first",   text: "An inclusive room, guideline packets for every lesson, and real support for IEPs and 504 plans." },
      ],
      pdf: "images/teaching/teaching-philosophy.pdf"
    },

    /* Classroom photos hang on the clothesline. Students' faces are blurred. */
    classroom: [
      { image: "images/teaching/classroom/monet-lesson-drawing.jpg", thumb: "images/teaching/classroom/monet-lesson-drawing-sm.jpg", caption: "Monet bridges: drawing day" },
      { image: "images/teaching/classroom/monet-lesson-painting-demo.jpg", thumb: "images/teaching/classroom/monet-lesson-painting-demo-sm.jpg", caption: "Monet bridges: painting demo" },
    ],

    /* Projects: each card opens all of its photos in the lightbox. */
    projects: [
      { title: "Mood Monster", grade: "Middle school",
        about: "Students invent an original character, draw it in four different moods, and build a color palette to match.",   // PLACEHOLDER (check wording with Bran)
        cover: "images/teaching/projects/mood-monster/img-6316.jpg",
        images: ["6290", "6303", "6309", "6310", "6316", "6322", "6340", "6341", "6364", "6374"].map(n => ({
          image: `images/teaching/projects/mood-monster/img-${n}.jpg`, thumb: `images/teaching/projects/mood-monster/img-${n}-sm.jpg`, caption: "Mood Monster, student work" })) },
      { title: "Food Still Lifes", grade: "Art class",
        about: "Food still life paintings from the art class I teach, working on light, shadow and color.",   // PLACEHOLDER (check wording with Bran)
        cover: "images/teaching/projects/foods-with-moods/img-6280.jpg",
        images: ["6267", "6275", "6280", "6284", "6285"].map(n => ({
          image: `images/teaching/projects/foods-with-moods/img-${n}.jpg`, thumb: `images/teaching/projects/foods-with-moods/img-${n}-sm.jpg`, caption: "Student work from my art class" })) },
      { title: "Monet Bridges", grade: "Elementary",
        about: "After looking at Claude Monet's bridge paintings, students drew and painted bridge scenes of their own.",   // PLACEHOLDER (check wording with Bran)
        cover: "images/teaching/projects/monet-bridges/monet-bridges.jpg",
        images: [
          { image: "images/teaching/projects/monet-bridges/monet-bridges.jpg", thumb: "images/teaching/projects/monet-bridges/monet-bridges-sm.jpg", caption: "Monet Bridges, student work" },
          { image: "images/teaching/classroom/monet-lesson-drawing.jpg", thumb: "images/teaching/classroom/monet-lesson-drawing-sm.jpg", caption: "Drawing day" },
          { image: "images/teaching/classroom/monet-lesson-painting-demo.jpg", thumb: "images/teaching/classroom/monet-lesson-painting-demo-sm.jpg", caption: "Painting demo" },
        ] },
      { title: "Matisse Cutouts", grade: "Elementary",
        about: "Paper cutout compositions inspired by Henri Matisse. This is the example I made for the class.",
        cover: "images/teaching/projects/matisse-cutouts/matisse-cutout-teaching-example.jpg",
        images: [
          { image: "images/teaching/projects/matisse-cutouts/matisse-cutout-teaching-example.jpg", thumb: "images/teaching/projects/matisse-cutouts/matisse-cutout-teaching-example-sm.jpg", caption: "My teaching example" },
        ] },
    ],

    /* Student work wall (a mix from the projects above) */
    studentWork: [
      { n: "mood-monster/img-6316", caption: "Mood Monster" },
      { n: "foods-with-moods/img-6280", caption: "Art class" },
      { n: "mood-monster/img-6322", caption: "Mood Monster" },
      { n: "monet-bridges/monet-bridges", caption: "Monet Bridges" },
      { n: "foods-with-moods/img-6267", caption: "Art class" },
      { n: "mood-monster/img-6290", caption: "Mood Monster" },
      { n: "foods-with-moods/img-6284", caption: "Art class" },
      { n: "mood-monster/img-6341", caption: "Mood Monster" },
    ].map(w => ({ image: `images/teaching/projects/${w.n}.jpg`, thumb: `images/teaching/projects/${w.n}-sm.jpg`, caption: w.caption }))
  },

  /* ---------------------------------------------------------------- */
  about: {
    photo: "",            // leave empty to use the blue head doodle
    /* [words](#section) turns into a link to that page of the site */
    bio: [
      "Hello! My name is Brandasund Peterson, and I am a New York based creative. I am a multidisciplinary artist and art teacher who enjoys using various different processes to create pieces that are captivating and intrigue the viewer. More than anything, I love to make pieces that are fun for the viewer, and make them question the ideas and processes behind it.",
      "I graduated from Adelphi University with a bachelor's degree in Art Education. Alongside my studies to become a teacher, I learned animation and illustration, and spent my senior year creating a traditionally animated proof of concept trailer for my senior thesis. This trailer, which was a collaborative group effort led by me, won the Presidential Purchase award at Adelphi University. You can view the trailer [here](#animations).",
      "The experiences I gained working on my animated short film have pushed me to create more narrative driven illustrations and animations. Alongside creating art, I also am eager to teach it to my students. I firmly believe that creating art is about problem solving and learning to overcome challenges as much as it is about expression. My goal is to spend my life creating art, animations, and lessons that inspire people to challenge themselves and pursue their creative passions.",
    ],
    tools: [],            // e.g. ["Procreate", "Photoshop", "Pencil + paper"] (empty = hidden)
    timeline: [
      { year: "Growing up",  text: "A family of musicians, artists and writers" },
      { year: "High School", text: "Began learning character design and illustration. Took AP studio art and made a portfolio based off of retro-futurism and industrial-surrealism." },
      { year: "College",     text: "Graduated from Nassau Community College in 2024 with an associate's degree in Art. Graduated from Adelphi University with a Bachelor's in Art Education. Led a team of creatives and accomplished my goal of creating my first animated short film." },
      { year: "Current",     text: "Teaching specialized art and animation courses at the Art Guild of Port Washington. Working on different illustrations and animated projects. Open for work!" },
    ]
  },

  /* ---------------------------------------------------------------- */
  contact: {
    intro: "Commissions, collabs and workshop bookings. Tell me what you have in mind.",
    menu: [
      { item: "Character portrait",     price: "ask me!" },
      { item: "Full illustration",      price: "ask me!" },
      { item: "Poster or album art",    price: "ask me!" },
      { item: "Short animation / loop", price: "ask me!" },
      { item: "Workshop or class",      price: "ask me!" },
    ],
    projectTypes: ["Illustration", "Animation", "Workshop", "Other"]
  }
};
