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
  instagram: "Branbitious",

  /* Contact form: paste a Formspree form URL here (free at formspree.io)
     to have messages land in Bran's inbox. Left empty, the Send button
     opens the visitor's email app with the message filled in. */
  formEndpoint: "",

  /* ---------------------------------------------------------------- */
  illustrations: {
    intro: "Scenes, posters, album art and portraits. Click any piece to see it bigger.",
    items: [
      { title: "Skater Fights Off Telekinetic Martian Invaders in the Produce Aisle of the Grocery Store (from the Perspective of the Skateboard)",
        short: "Skater vs. Martian Invaders", year: "2025", tags: ["Scenes"],
        image: "images/illustrations/skater-vs-martian-invaders.jpg", thumb: "images/illustrations/skater-vs-martian-invaders-sm.jpg",
        note: "a.k.a. SFOTMIITPAOTGS(FTPOTS)",
        process: [] },
      { title: "Purple Pufferfish in Green City", year: "2025", tags: ["Scenes"],
        image: "images/illustrations/purple-pufferfish-in-green-city.jpg", thumb: "images/illustrations/purple-pufferfish-in-green-city-sm.jpg",
        process: [] },
      { title: "Colony Album Cover", year: "2024", tags: ["Album art"], note: "Album cover for The Colony.",
        image: "images/illustrations/colony-album-cover.jpg", thumb: "images/illustrations/colony-album-cover-sm.jpg",
        process: [] },
      { title: "Metal vs. Man", year: "2026", tags: ["Scenes"],
        image: "images/illustrations/metal-vs-man.jpg", thumb: "images/illustrations/metal-vs-man-sm.jpg",
        process: [] },
      { title: "Purpose Without People", tags: ["Posters"], note: "Poster for Mind of Their Own, my animated short.",
        image: "images/illustrations/moto-poster-purpose-without-people.jpg", thumb: "images/illustrations/moto-poster-purpose-without-people-sm.jpg",
        process: [] },
      { title: "A Few Screws Loose", tags: ["Posters"], note: "Poster for Mind of Their Own, my animated short.",
        image: "images/illustrations/moto-poster-a-few-screws-loose.jpg", thumb: "images/illustrations/moto-poster-a-few-screws-loose-sm.jpg",
        process: [] },
      { title: "Made For A Reason", tags: ["Posters"], note: "Poster for Mind of Their Own, my animated short.",
        image: "images/illustrations/moto-poster-made-for-a-reason.jpg", thumb: "images/illustrations/moto-poster-made-for-a-reason-sm.jpg",
        process: [] },
      { title: "Untitled portrait", tags: ["Portraits"],                     // PLACEHOLDER title (file was IMG_4749)
        image: "images/illustrations/untitled-portrait.jpg", thumb: "images/illustrations/untitled-portrait-sm.jpg",
        process: [] },
      { title: "Spaghetti Box", tags: ["Scenes"],                             // PLACEHOLDER title (file was speghettibox3)
        image: "images/illustrations/spaghetti-box.jpg", thumb: "images/illustrations/spaghetti-box-sm.jpg",
        process: [] },
    ]
  },

  /* ---------------------------------------------------------------- */
  animations: {
    intro: "Animatics, shorts and loops. Everything plays right on the board.",
    /* video: a .mp4 in images/animations/  OR a YouTube/Vimeo link */
    showreel: { title: "Mind of Their Own: animatic", video: "images/animations/moto-animatic.mp4", poster: "images/animations/moto-animatic-poster.jpg", length: "1:18" },
    note: ["From my short", "Mind of Their Own"],
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
    intro: "Projects, classroom moments and student work from elementary and middle school art classes.",
    subjects: [
      "Art + design fundamentals: line, shape, color",
      "Character design",
      "Still life painting",
      "Art history projects: Monet, Matisse",
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
      { title: "Foods with Moods", grade: "Middle school",
        about: "Painted food still lifes, working on light, shadow and color.",   // PLACEHOLDER (check wording with Bran)
        cover: "images/teaching/projects/foods-with-moods/img-6280.jpg",
        images: ["6267", "6275", "6280", "6284", "6285"].map(n => ({
          image: `images/teaching/projects/foods-with-moods/img-${n}.jpg`, thumb: `images/teaching/projects/foods-with-moods/img-${n}-sm.jpg`, caption: "Foods with Moods, student work" })) },
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
      { n: "foods-with-moods/img-6280", caption: "Foods with Moods" },
      { n: "mood-monster/img-6322", caption: "Mood Monster" },
      { n: "monet-bridges/monet-bridges", caption: "Monet Bridges" },
      { n: "foods-with-moods/img-6267", caption: "Foods with Moods" },
      { n: "mood-monster/img-6290", caption: "Mood Monster" },
      { n: "foods-with-moods/img-6284", caption: "Foods with Moods" },
      { n: "mood-monster/img-6341", caption: "Mood Monster" },
    ].map(w => ({ image: `images/teaching/projects/${w.n}.jpg`, thumb: `images/teaching/projects/${w.n}-sm.jpg`, caption: w.caption }))
  },

  /* ---------------------------------------------------------------- */
  about: {
    photo: "",            // leave empty to use the blue head doodle
    bio: [
      "I grew up surrounded by creative people. The musicians, artists and writers in my family pushed me to chase every creative hobby I had, and by 15 I was planning a career in art and taking online illustration courses.",
      "Somewhere between finishing my associate's degree and planning my bachelor's, I realized that alongside my own work I wanted to teach what I'd learned to younger generations. Today that means illustration and animation on one side, and art classes for elementary and middle schoolers on the other.",
      "I believe everyone deserves a creative outlet, and that making art is one of the best ways to learn how to solve problems.",
    ],
    tools: [],            // e.g. ["Procreate", "Photoshop", "Pencil + paper"] (empty = hidden)
    timeline: [
      { year: "Growing up", text: "A family of musicians, artists and writers" },
      { year: "Age 15",     text: "Started online illustration courses" },
      { year: "College",    text: "Associate's degree, bachelor's next" },
      { year: "Now",        text: "Teaching art + making Mind of Their Own" },
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
