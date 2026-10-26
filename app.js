// Exercises: [name, sets, reps, rest, type]
const SCHEMES = [
  { id:"pp2", name:"Push / Pull", note:"2 dagen, 2–3× per week herhalen (bv. ma Push, di Pull, do Push, vr Pull).",
    days:[
      { name:"Push", focus:"Borst, schouders, triceps, voorkant dij", ex:[
        ["Bench Press","4","6–8","2–3 min","push"],["Overhead Press","3","6–8","2 min","push"],
        ["Chest Dip","3","8–12","90 s","push"],["Low-to-High Cable Fly","3","12–15","60 s","push"],
        ["Dumbbell Lateral Raise","3","12–15","60 s","push"],["Skull Crusher","3","8–12","90 s","push"],
        ["One-Arm Dumbbell Overhead Extension","3","10–12","60 s","push"],["Back Squat","3","6–8","2–3 min","legs"]]},
      { name:"Pull", focus:"Rug, achterkant schouders, biceps, hamstrings", ex:[
        ["Lat Pulldown","4","8–10","90 s","pull"],["Seated Cable Row","3","8–12","90 s","pull"],
        ["Straight-Arm Pulldown","3","12–15","60 s","pull"],["Machine Reverse Fly","3","12–15","60 s","pull"],
        ["Upright Row","3","10–12","90 s","pull"],["Preacher Curl","3","8–12","60 s","pull"],
        ["Incline Dumbbell Curl","3","8–12","60 s","pull"],["Romanian Deadlift","3","8–10","2 min","legs"]]}
    ]},
  { id:"ppl", name:"Push / Pull / Legs", note:"3 dagen: 1× per week doorlopen (3 trainingen) of 2× (6 trainingen).",
    days:[
      { name:"Push", focus:"Borst, schouders, triceps", ex:[
        ["Bench Press","4","5–8","2–3 min","push"],["Overhead Press","3","6–10","2 min","push"],
        ["Incline Dumbbell Press","3","8–12","90 s","push"],["Dips","3","8–12","90 s","push"],
        ["Lateral Raise","4","12–15","60 s","push"],["Overhead Triceps Extension","3","10–12","60 s","push"]]},
      { name:"Pull", focus:"Rug, achterkant schouders, biceps", ex:[
        ["Deadlift","3","5","3 min","pull"],["Lat Pulldown","3","8–12","90 s","pull"],
        ["Seated Cable Row","3","8–12","90 s","pull"],["Face Pull","3","12–15","60 s","pull"],
        ["Barbell Curl","3","8–12","60 s","pull"],["Hammer Curl","3","10–12","60 s","pull"]]},
      { name:"Legs", focus:"Voorkant dij, hamstrings, billen, kuiten", ex:[
        ["Back Squat","4","5–8","2–3 min","legs"],["Romanian Deadlift","3","8–10","2 min","legs"],
        ["Leg Press","3","10–12","90 s","legs"],["Leg Curl","3","10–12","60 s","legs"],
        ["Walking Lunge","3","10 / leg","90 s","legs"],["Standing Calf Raise","4","10–15","60 s","legs"]]}
    ]},
  { id:"ul", name:"Upper / Lower", note:"4 dagen: Upper A, Lower A, rust, Upper B, Lower B. Elke upper-dag combineert duwen en trekken.",
    days:[
      { name:"Upper A", focus:"Zwaar horizontaal duwen + trekken", ex:[
        ["Bench Press","4","5–6","2–3 min","push"],["Barbell Row","4","6–8","2 min","pull"],
        ["Overhead Press","3","8–10","2 min","push"],["Lat Pulldown","3","8–12","90 s","pull"],
        ["Triceps Pushdown","2","10–12","60 s","push"],["Barbell Curl","2","10–12","60 s","pull"]]},
      { name:"Lower A", focus:"Nadruk op squat", ex:[
        ["Back Squat","4","5–6","3 min","legs"],["Romanian Deadlift","3","8–10","2 min","legs"],
        ["Leg Press","3","10–12","90 s","legs"],["Standing Calf Raise","4","10–15","60 s","legs"]]},
      { name:"Upper B", focus:"Verticaal duwen + trekken", ex:[
        ["Overhead Press","4","5–6","2–3 min","push"],["Pull-up (added weight)","4","6–8","2 min","pull"],
        ["Incline Dumbbell Press","3","8–12","90 s","push"],["Seated Cable Row","3","8–12","90 s","pull"],
        ["Lateral Raise","3","12–15","60 s","push"],["Face Pull","3","12–15","60 s","pull"]]},
      { name:"Lower B", focus:"Nadruk op heupscharnier (deadlift)", ex:[
        ["Deadlift","3","5","3 min","legs"],["Front Squat","3","6–8","2 min","legs"],
        ["Leg Curl","3","10–12","60 s","legs"],["Walking Lunge","3","10 / leg","90 s","legs"]]}
    ]},
  // A and B hit the same muscles in the same order, each with a different variation (barbell ↔ dumbbell ↔ cable),
  // so A and B can be swapped freely within a week.
  { id:"ppab2", name:"Push / Pull A–B", note:"4 dagen: Push A, Pull A, Push B, Pull B. A en B trainen dezelfde spieren met andere oefeningen, dus je kiest vrij welke je doet.",
    days:[
      { name:"Push A", focus:"Borst · schouders · triceps · voorkant dij", ex:[
        ["Bench Press","4","6–8","2–3 min","push"],["Overhead Press","3","6–8","2 min","push"],
        ["Chest Dip","3","8–12","90 s","push"],["Low-to-High Cable Fly","3","12–15","60 s","push"],
        ["Dumbbell Lateral Raise","3","12–15","60 s","push"],["Skull Crusher","3","8–12","90 s","push"],
        ["Rope Triceps Pushdown","3","10–12","60 s","push"],["Back Squat","3","6–8","2–3 min","legs"]]},
      { name:"Pull A", focus:"Lats · bovenrug · achterkant schouders · biceps · hamstrings", ex:[
        ["Lat Pulldown","4","8–10","90 s","pull"],["Seated Cable Row","3","8–12","90 s","pull"],
        ["Straight-Arm Pulldown","3","12–15","60 s","pull"],["Machine Reverse Fly","3","12–15","60 s","pull"],
        ["Upright Row","3","10–12","90 s","pull"],["Preacher Curl","3","8–12","60 s","pull"],
        ["Cable Curl","3","10–12","60 s","pull"],["Romanian Deadlift","3","8–10","2 min","legs"]]},
      { name:"Push B", focus:"Zelfde spieren als Push A, andere varianten", ex:[
        ["Incline Dumbbell Press","4","8–10","2 min","push"],["Seated Dumbbell Shoulder Press","3","8–10","90 s","push"],
        ["Close-Grip Bench Press","3","8–10","2 min","push"],["High-to-Low Cable Fly","3","12–15","60 s","push"],
        ["Cable Lateral Raise","3","12–15","60 s","push"],["One-Arm Dumbbell Overhead Extension","3","10–12","60 s","push"],
        ["Cable Overhead Triceps Extension","3","10–12","60 s","push"],["Leg Press","3","10–12","90 s","legs"]]},
      { name:"Pull B", focus:"Zelfde spieren als Pull A, andere varianten", ex:[
        ["Close-Grip Lat Pulldown","4","8–10","90 s","pull"],["Single-Arm Cable Row","3","10–12","60 s","pull"],
        ["Dumbbell Pullover","3","10–12","60 s","pull"],["Face Pull","3","12–15","60 s","pull"],
        ["Cable Upright Row","3","10–12","60 s","pull"],["Incline Dumbbell Curl","3","8–12","60 s","pull"],
        ["Rope Hammer Curl","3","10–12","60 s","pull"],["Leg Curl","3","10–12","60 s","legs"]]}
    ]},
  // Core at home: no equipment except an ab wheel. 6th field: "bw" = reps only, "time" = seconds.
  { id:"core", name:"Core", note:"Buik, zij en onderrug, thuis zonder materiaal (alleen je ab roller). 2–4× per week, wissel A en B af.",
    days:[
      { name:"Core A", focus:"Rechte buikspier, zij en onderrug", ex:[
        ["Ab Wheel Rollout","3","8–12","60 s","core","bw"],
        ["Plank","3","30–60","45 s","core","time"],
        ["Side Plank (left)","3","20–45","15 s","core","time"],
        ["Side Plank (right)","3","20–45","45 s","core","time"],
        ["Dead Bug","3","10–16","45 s","core","bw"],
        ["Reverse Crunch","3","10–15","45 s","core","bw"],
        ["Bicycle Crunch","3","20–30","45 s","core","bw"],
        ["Superman","3","20–30","30 s","core","time"]]},
      { name:"Core B", focus:"Zelfde spieren, andere oefeningen", ex:[
        ["Hollow Hold","3","20–40","45 s","core","time"],
        ["V-up","3","8–15","45 s","core","bw"],
        ["Russian Twist","3","20–30","45 s","core","bw"],
        ["Plank Shoulder Tap","3","16–24","45 s","core","bw"],
        ["Lying Leg Raise","3","10–15","45 s","core","bw"],
        ["Flutter Kicks","3","20–40","30 s","core","time"],
        ["Mountain Climber","3","30–45","30 s","core","time"],
        ["Bird Dog","3","10–16","30 s","core","bw"]]},
      { name:"Core C", focus:"Schuin, onderrug en houdingen zonder materiaal", ex:[
        ["Plank Jack","3","30–45","30 s","core","time"],
        ["Hip Dip Plank","3","16–24","45 s","core","bw"],
        ["Scissor Kicks","3","20–40","30 s","core","time"],
        ["Heel Touch","3","20–30","30 s","core","bw"],
        ["Windshield Wipers","3","8–14","45 s","core","bw"],
        ["Reverse Plank","3","20–40","30 s","core","time"],
        ["Superman Pulse","3","20–30","30 s","core","time"],
        ["Hollow Rock","3","10–20","45 s","core","bw"]]},
      { name:"Core D", focus:"Zwaarder en dynamischer: stabiliteit en conditie", ex:[
        ["Plank Up-Down","3","10–16","45 s","core","bw"],
        ["Cross-Body Mountain Climber","3","16–24","30 s","core","bw"],
        ["Toe Touch Crunch","3","12–20","30 s","core","bw"],
        ["Leg Drop","3","8–12","45 s","core","bw"],
        ["Bear Plank Hold","3","20–40","30 s","core","time"],
        ["Inchworm","3","6–10","45 s","core","bw"],
        ["Plank Shoulder Tap","3","16–24","45 s","core","bw"]]}
    ]}
];

// Earlier versions of reworked schemes, with their default exercises per day.
// Only used to carry exercises you added yourself over to the new days.
const OLD_SCHEMES = { ppab: { to: "ppab2", days: [
  ["Bench Press","Overhead Press","Back Squat","Dips"],
  ["Deadlift","Pull-up (added weight)","Barbell Row","Barbell Curl"],
  ["Incline Dumbbell Press","Leg Press","Lateral Raise","Overhead Triceps Extension"],
  ["Lat Pulldown","Seated Cable Row","Leg Curl","Face Pull","Hammer Curl"]
]}, home: { to: "core", days: [
  ["Push-up","Ab Wheel Rollout","Plank","Side Plank (left)","Side Plank (right)"]
]}, pp: { to: "pp2", days: [
  ["Bench Press","Overhead Press","Incline Dumbbell Press","Back Squat","Lateral Raise","Triceps Pushdown"],
  ["Deadlift","Pull-up (added weight)","Barbell Row","Romanian Deadlift","Face Pull","Barbell Curl"]
]}};

// Dutch name + short description per exercise: [nl, beschrijving]
const NL = {
  "Bench Press":["Bankdrukken","Op je rug op een vlakke bank, halter vanaf je borst recht omhoog duwen."],
  "Overhead Press":["Schouderdrukken (staand)","Rechtop staan, halter vanaf je sleutelbeenderen boven je hoofd uitduwen."],
  "Incline Dumbbell Press":["Schuin bankdrukken met dumbbells","Bank schuin omhoog (30–45°), dumbbells vanaf je bovenborst omhoog duwen."],
  "Back Squat":["Squat (halter op de rug)","Halter op je bovenrug, door je knieën zakken tot je dijen horizontaal zijn en weer omhoog."],
  "Front Squat":["Front squat","Halter vóór op je schouders, romp rechtop houden en diep door je knieën zakken."],
  "Lateral Raise":["Zijwaarts heffen","Met een dumbbell in elke hand je armen zijwaarts optillen tot schouderhoogte."],
  "Triceps Pushdown":["Triceps pushdown (kabel)","Aan de kabel, ellebogen tegen je lichaam, de stang of het touw naar beneden duwen."],
  "Overhead Triceps Extension":["Triceps strekken boven het hoofd","Dumbbell of kabel achter je hoofd, armen strekken tot boven je hoofd."],
  "Dips":["Dips","Tussen twee leggers steunen, lichaam laten zakken door je ellebogen te buigen en weer omhoog duwen."],
  "Deadlift":["Deadlift (heffen vanaf de grond)","Halter met rechte rug van de grond tillen tot je rechtop staat."],
  "Romanian Deadlift":["Roemeense deadlift","Benen bijna gestrekt, heupen naar achter duwen en de halter langs je benen laten zakken; voel je hamstrings."],
  "Pull-up (added weight)":["Optrekken (met extra gewicht)","Aan een stang hangen en jezelf optrekken tot je kin erboven is. Noteer het extra gewicht (riem/vest)."],
  "Lat Pulldown":["Lat pulldown (latissimustrek)","Zittend aan de kabel een brede stang naar je bovenborst trekken."],
  "Barbell Row":["Roeien met halter","Voorovergebogen met rechte rug, de halter naar je buik trekken."],
  "Seated Cable Row":["Zittend roeien aan de kabel","Rechtop zitten, handvat naar je buik trekken en schouderbladen samenknijpen."],
  "Face Pull":["Face pull","Touw aan de kabel op ooghoogte naar je gezicht trekken, ellebogen hoog. Goed voor achterkant schouders."],
  "Barbell Curl":["Biceps curl met halter","Staand, halter met onderhandse greep naar je schouders krullen, ellebogen stil."],
  "Hammer Curl":["Hamer curl","Dumbbells met duimen naar boven (neutrale greep) omhoog krullen."],
  "Leg Press":["Beenpers","In de machine de plaat met je voeten wegduwen tot je benen bijna gestrekt zijn."],
  "Leg Curl":["Beencurl (hamstrings)","In de machine je hielen naar je billen buigen."],
  "Walking Lunge":["Wandelende lunges","Grote stap vooruit, achterste knie bijna tot de grond, en zo verder stappen. Gewicht = dumbbells per hand."],
  "Standing Calf Raise":["Kuitheffen (staand)","Op je tenen omhoog komen en langzaam weer zakken, eventueel met de voorvoet op een verhoging."],
  "Chest Dip":["Dips voor de borst","Tussen de leggers steunen, romp licht voorover en ellebogen iets naar buiten; zakken tot je borst rekt en weer omhoog duwen."],
  "Low-to-High Cable Fly":["Cable fly van laag naar hoog","Kabels laag ingesteld, met licht gebogen armen de handgrepen in een boog omhoog en naar elkaar brengen. Vooral bovenkant borst."],
  "High-to-Low Cable Fly":["Cable crossover van hoog naar laag","Kabels hoog ingesteld, met licht gebogen armen de handgrepen in een boog naar beneden en voor je heupen samenbrengen. Vooral onderkant borst."],
  "Dumbbell Lateral Raise":["Zijwaarts heffen met dumbbells","Dumbbell in elke hand, armen licht gebogen zijwaarts optillen tot schouderhoogte."],
  "Cable Lateral Raise":["Zijwaarts heffen aan de kabel","Kabel laag naast je, één arm per keer zijwaarts optillen tot schouderhoogte. De kabel houdt de spanning onderaan."],
  "Skull Crusher":["Skullcrushers (liggend triceps strekken)","Op een bank liggend een EZ-stang of dumbbells naar je voorhoofd laten zakken door alleen je ellebogen te buigen, en weer strekken."],
  "One-Arm Dumbbell Overhead Extension":["Eenarmig triceps strekken boven het hoofd","Eén dumbbell boven je hoofd, achter je hoofd laten zakken en weer uitstrekken. Elleboog wijst naar boven."],
  "Rope Triceps Pushdown":["Triceps pushdown met touw","Touw aan de hoge kabel, ellebogen tegen je lichaam, naar beneden duwen en onderaan het touw uit elkaar trekken."],
  "Cable Overhead Triceps Extension":["Triceps strekken boven het hoofd aan de kabel","Met je rug naar de kabel, touw achter je hoofd en je armen naar voren-boven uitstrekken."],
  "Seated Dumbbell Shoulder Press":["Schouderdrukken met dumbbells (zittend)","Zittend met rugleuning, dumbbells vanaf schouderhoogte boven je hoofd duwen."],
  "Close-Grip Bench Press":["Bankdrukken met smalle greep","Zoals bankdrukken maar met de handen op schouderbreedte; legt meer nadruk op je triceps."],
  "Straight-Arm Pulldown":["Straight-arm pulldown (gestrekte armen)","Aan de hoge kabel met bijna gestrekte armen de stang of het touw in een boog naar je dijen trekken. Voel je lats."],
  "Machine Reverse Fly":["Reverse fly aan de machine","Met je borst tegen het kussen van de pec-deck machine de handgrepen naar achter openen. Traint de achterkant van je schouders."],
  "Upright Row":["Rechtop roeien (upright row)","Halter of EZ-stang langs je lichaam omhoog trekken tot borsthoogte, ellebogen gaan hoger dan je handen."],
  "Cable Upright Row":["Rechtop roeien aan de kabel","Stang aan de lage kabel, langs je lichaam omhoog trekken tot borsthoogte met de ellebogen hoog."],
  "Preacher Curl":["Preacher curl (biceps op de bank)","Bovenarmen op het schuine kussen, EZ-stang of dumbbell omhoog krullen en gecontroleerd laten zakken."],
  "Incline Dumbbell Curl":["Biceps curl op een schuine bank","Achterover op een schuine bank, armen hangen naar beneden, dumbbells omhoog krullen. Geeft een grote rek op je biceps."],
  "Cable Curl":["Biceps curl aan de kabel","Stang aan de lage kabel, met ellebogen stil langs je lichaam omhoog krullen."],
  "Rope Hammer Curl":["Hamer curl met touw aan de kabel","Touw aan de lage kabel, duimen naar boven, omhoog krullen. Traint biceps en onderarmen."],
  "Close-Grip Lat Pulldown":["Lat pulldown met smalle greep","Aan de kabel een V-handvat of smalle greep naar je borst trekken, ellebogen langs je lichaam."],
  "Single-Arm Cable Row":["Eenarmig roeien aan de kabel","Eén handvat aan de kabel, per arm naar je heup trekken met een kleine draai van de romp."],
  "Dumbbell Pullover":["Pullover met dumbbell","Dwars of in de lengte op een bank, één dumbbell met beide handen in een boog van boven je borst naar achter je hoofd en terug."],
  "Push-up":["Opdrukken (pompen)","Handen iets breder dan je schouders, lichaam in een rechte lijn. Zak tot je borst bijna de grond raakt en duw weer omhoog. Te zwaar? Doe ze op je knieën."],
  "Ab Wheel Rollout":["Ab wheel rollout (buikwiel)","Op je knieën met het wiel onder je schouders. Rol langzaam naar voor zonder dat je onderrug doorzakt, en trek jezelf met je buik terug."],
  "Plank":["Plank (horizontaal)","Op je onderarmen en tenen, ellebogen onder je schouders. Hou je lichaam in een rechte lijn en span buik en billen aan."],
  "Side Plank (left)":["Plank zijwaarts links","Op je linkeronderarm, voeten op elkaar. Til je heup op tot je lichaam een rechte lijn vormt en hou vast."],
  "Side Plank (right)":["Plank zijwaarts rechts","Op je rechteronderarm, voeten op elkaar. Til je heup op tot je lichaam een rechte lijn vormt en hou vast."]
};

// Muscle groups per exercise: [strongly worked, less strongly worked]
const MUSCLES = {
  "Bench Press":[["Borst","Triceps","Voorkant schouders"],["Lats (stabiliseren)","Onderarmen"]],
  "Close-Grip Bench Press":[["Triceps","Borst"],["Voorkant schouders"]],
  "Incline Dumbbell Press":[["Bovenkant borst","Voorkant schouders"],["Triceps","Zijkant schouders"]],
  "Chest Dip":[["Onderkant borst","Triceps"],["Voorkant schouders","Buikspieren (stabiliseren)"]],
  "Dips":[["Triceps","Onderkant borst"],["Voorkant schouders"]],
  "Low-to-High Cable Fly":[["Bovenkant borst"],["Voorkant schouders","Biceps (stabiliseren)"]],
  "High-to-Low Cable Fly":[["Onderkant borst","Middelste borst"],["Voorkant schouders"]],
  "Push-up":[["Borst","Triceps"],["Voorkant schouders","Buikspieren","Serratus (zijkant ribben)"]],
  "Overhead Press":[["Voorkant schouders","Triceps"],["Zijkant schouders","Bovenkant borst","Buikspieren","Billen (stabiliseren)"]],
  "Seated Dumbbell Shoulder Press":[["Voorkant schouders","Zijkant schouders"],["Triceps","Bovenkant borst"]],
  "Lateral Raise":[["Zijkant schouders"],["Trapezius (bovenste deel)","Voorkant schouders"]],
  "Dumbbell Lateral Raise":[["Zijkant schouders"],["Trapezius (bovenste deel)","Voorkant schouders"]],
  "Cable Lateral Raise":[["Zijkant schouders"],["Trapezius (bovenste deel)"]],
  "Triceps Pushdown":[["Triceps"],["Onderarmen"]],
  "Rope Triceps Pushdown":[["Triceps (vooral buitenste kop)"],["Onderarmen"]],
  "Overhead Triceps Extension":[["Triceps (vooral lange kop)"],["Buikspieren (stabiliseren)"]],
  "Cable Overhead Triceps Extension":[["Triceps (vooral lange kop)"],["Buikspieren (stabiliseren)"]],
  "One-Arm Dumbbell Overhead Extension":[["Triceps (vooral lange kop)"],["Schouders (stabiliseren)","Buikspieren"]],
  "Skull Crusher":[["Triceps (lange en binnenste kop)"],["Onderarmen"]],
  "Pull-up (added weight)":[["Lats (brede rugspier)","Biceps"],["Bovenrug","Achterkant schouders","Onderarmen","Buikspieren"]],
  "Lat Pulldown":[["Lats (brede rugspier)"],["Biceps","Bovenrug","Achterkant schouders"]],
  "Close-Grip Lat Pulldown":[["Lats (onderste deel)","Biceps"],["Bovenrug","Onderarmen"]],
  "Straight-Arm Pulldown":[["Lats (brede rugspier)"],["Triceps (lange kop)","Buikspieren","Achterkant schouders"]],
  "Dumbbell Pullover":[["Lats","Borst"],["Triceps (lange kop)","Serratus (zijkant ribben)"]],
  "Barbell Row":[["Bovenrug","Lats"],["Achterkant schouders","Biceps","Onderrug","Hamstrings (stabiliseren)"]],
  "Seated Cable Row":[["Bovenrug (rhomboïden, middelste trapezius)","Lats"],["Biceps","Achterkant schouders"]],
  "Single-Arm Cable Row":[["Lats","Bovenrug"],["Biceps","Schuine buikspieren (tegen draaien)"]],
  "Face Pull":[["Achterkant schouders","Bovenrug"],["Rotatorenmanchet (schoudergewricht)","Trapezius"]],
  "Machine Reverse Fly":[["Achterkant schouders"],["Bovenrug (rhomboïden, middelste trapezius)"]],
  "Upright Row":[["Zijkant schouders","Trapezius (bovenste deel)"],["Voorkant schouders","Biceps","Onderarmen"]],
  "Cable Upright Row":[["Zijkant schouders","Trapezius (bovenste deel)"],["Voorkant schouders","Biceps"]],
  "Barbell Curl":[["Biceps"],["Onderarmen","Brachialis (onder de biceps)"]],
  "Preacher Curl":[["Biceps (vooral korte kop)","Brachialis (onder de biceps)"],["Onderarmen"]],
  "Incline Dumbbell Curl":[["Biceps (vooral lange kop)"],["Brachialis","Onderarmen"]],
  "Cable Curl":[["Biceps"],["Brachialis","Onderarmen"]],
  "Hammer Curl":[["Brachialis (onder de biceps)","Onderarmen (brachioradialis)"],["Biceps"]],
  "Rope Hammer Curl":[["Brachialis (onder de biceps)","Onderarmen (brachioradialis)"],["Biceps"]],
  "Deadlift":[["Billen","Hamstrings","Onderrug"],["Quadriceps","Trapezius","Lats","Onderarmen (grip)","Buikspieren"]],
  "Romanian Deadlift":[["Hamstrings","Billen"],["Onderrug","Bovenrug (stabiliseren)","Onderarmen (grip)"]],
  "Back Squat":[["Quadriceps (voorkant dij)","Billen"],["Adductoren (binnenkant dij)","Hamstrings","Onderrug","Buikspieren"]],
  "Front Squat":[["Quadriceps (voorkant dij)"],["Billen","Bovenrug","Buikspieren"]],
  "Leg Press":[["Quadriceps (voorkant dij)","Billen"],["Hamstrings","Adductoren"]],
  "Leg Curl":[["Hamstrings"],["Kuiten"]],
  "Walking Lunge":[["Quadriceps","Billen"],["Hamstrings","Adductoren","Kuiten","Buikspieren (evenwicht)"]],
  "Standing Calf Raise":[["Kuiten"],["Voeten en enkels (stabiliseren)"]],
  "Ab Wheel Rollout":[["Buikspieren (rechte buikspier)"],["Lats","Schuine buikspieren","Schouders","Heupbuigers"]],
  "Plank":[["Buikspieren (rechte en diepe buikspier)"],["Schouders","Billen","Onderrug"]],
  "Side Plank (left)":[["Schuine buikspieren links"],["Billen (zijkant heup)","Schouders","Diepe buikspieren"]],
  "Side Plank (right)":[["Schuine buikspieren rechts"],["Billen (zijkant heup)","Schouders","Diepe buikspieren"]]
};

const LS_RECORDS = "ppl.records", LS_VIEW = "ppl.view", LS_LAYOUTS = "ppl.layouts", LS_LOG = "ppl.log";
const $ = id => document.getElementById(id);
// The stand-alone version (own website, no Claude) sets window.FPT_STANDALONE: data stays on the device,
// with a backup file instead of account sync, and it installs as an app with its own icon.
const STANDALONE = !!window.FPT_STANDALONE;
const APP_HOME = window.FPT_HOME || "https://europ3000.github.io/fpt/", APP_HOST = APP_HOME.replace(/^https?:\/\//, "").replace(/\/$/, "");
const keyOf = name => name.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") || "x" + [...name].map(c => c.codePointAt(0).toString(36)).join("");
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt = n => (Math.round(n*100)/100).toString().replace(".", DEC());

// ---------- Languages: the app is written in Dutch and translated in the page ----------
// Every text node and label is looked up in a table (exact text, or a pattern like "Set {0} opslaan");
// a MutationObserver translates whatever the app renders, so the rest of the code stays Dutch.
const LANGS = [["nl", "Nederlands"], ["en", "English"], ["fr", "Français"], ["es", "Español"], ["de", "Deutsch"], ["it", "Italiano"],
  ["pt", "Português"], ["ru", "Русский"], ["zh", "中文（普通话）"], ["ar", "العربية (الفصحى)"], ["hi", "हिन्दी"]];
const LOCALES = { nl: "nl-BE", en: "en-GB", fr: "fr-FR", es: "es-ES", de: "de-DE", it: "it-IT", pt: "pt-PT", ru: "ru-RU", zh: "zh-CN", ar: "ar-EG", hi: "hi-IN" };
const I18N = window.FPT_I18N || { langs: [], src: [] };
let lang = (() => { try { const v = JSON.parse(localStorage.getItem("ppl.lang")); return LOCALES[v] ? v : "nl"; } catch { return "nl"; } })();
const LOC = () => LOCALES[lang] || "nl-BE";
function DEC(){ return ["en", "zh", "hi", "ar"].includes(lang) ? "." : ","; }
let trMap = new Map(), trTpl = [];
function buildLang(){
  trMap = new Map(); trTpl = [];
  const T = I18N[lang]; if (lang === "nl" || !T) return;
  I18N.src.forEach((src, i) => {
    const t = T[i]; if (!t) return;
    if (!/\{\d\}/.test(src)){ trMap.set(src, t); return; }
    const parts = src.split(/\{(\d)\}/), idx = [], lits = [];
    let re = "^";
    parts.forEach((x, j) => { if (j % 2){ idx.push(+x); re += "([\\s\\S]*?)"; } else { lits.push(x); re += x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); } });
    const lit = lits.reduce((a, b) => b.length > a.length ? b : a, "");
    // "weak" patterns (little fixed text, like "{0} en {1}") only count when their pieces are translatable too
    const weak = (lits.join("").match(/[A-Za-zÀ-ÿ]/g) || []).length < 8;
    trTpl.push({ re: new RegExp(re + "$"), idx, t, lit, weak, len: lits.join("").length });
  });
  trTpl.sort((a, b) => b.len - a.len);
}
const TR_DUTCH = /\b(je|de|het|een|en|van|op|naar|met|voor|niet|bij|tot|is|zijn|wordt|dit|deze|als|dan)\b/i;
function tr(s, depth = 0){
  if (lang === "nl" || !s) return s;
  const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s), core = m[2];
  if (!/[A-Za-zÀ-ÿ]/.test(core)) return s;
  let t = trMap.get(core);
  if (t === undefined && depth < 3){
    for (const p of trTpl){
      if (p.lit && !core.includes(p.lit)) continue;
      const r = p.re.exec(core); if (!r) continue;
      if (p.weak && r.slice(1).some(v => TR_DUTCH.test(v) && tr(v, depth + 1) === v)) continue;
      t = p.t.replace(/\{(\d)\}/g, (_, d) => { const v = r[1 + p.idx.indexOf(+d)]; return v === undefined ? "" : tr(v, depth + 1); });
      break;
    }
  }
  // "gisteren" inside a sentence: translate it as "Gisteren" and keep it lower case.
  if (t === undefined && depth < 3 && /^[a-zà-ÿ]/.test(core)){
    const cap = core[0].toUpperCase() + core.slice(1), c = trMap.get(cap);
    if (c !== undefined) t = c[0].toLocaleLowerCase(LOC()) + c.slice(1);
  }
  return t === undefined ? s : m[1] + t + m[3];
}
const trOrig = new WeakMap(), trDone = new WeakMap(), TR_ATTRS = ["placeholder", "aria-label", "title", "label", "alt"];
function trText(n){
  const p = n.parentNode; if (!p || p.nodeName === "SCRIPT" || p.nodeName === "STYLE" || (p.closest && p.closest('[translate="no"]'))) return;
  const cur = n.nodeValue, src = trDone.get(n) === cur && trOrig.has(n) ? trOrig.get(n) : cur;
  const t = lang === "nl" ? src : tr(src);
  trOrig.set(n, src); trDone.set(n, t);
  if (t !== cur) n.nodeValue = t;
}
function trAttr(el, a){
  const cur = el.getAttribute(a); if (cur == null) return;
  const st = trOrig.get(el) || {}; trOrig.set(el, st);
  const src = st[a] && st[a][1] === cur ? st[a][0] : cur, t = lang === "nl" ? src : tr(src);
  st[a] = [src, t];
  if (t !== cur) el.setAttribute(a, t);
}
function trTree(root){
  if (root.nodeType === 3){ trText(root); return; }
  if (root.nodeType !== 1 || root.closest(".demo-stage g")) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) trText(n);
  TR_ATTRS.forEach(a => { if (root.hasAttribute && root.hasAttribute(a)) trAttr(root, a); root.querySelectorAll(`[${a}]`).forEach(el => trAttr(el, a)); });
}
const trObserver = new MutationObserver(muts => {
  if (lang === "nl" && !trObserver.dirty) return;
  muts.forEach(m => {
    if (m.type === "characterData") trText(m.target);
    else if (m.type === "attributes") trAttr(m.target, m.attributeName);
    else m.addedNodes.forEach(n => { if (!(n.parentNode && n.parentNode.closest && n.parentNode.closest(".demo-stage svg"))) trTree(n); });
  });
});
function applyLangAttrs(){
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll(".lang-sel").forEach(sel => {
    if (!sel.options.length) sel.innerHTML = LANGS.filter(([c]) => c === "nl" || I18N.langs.includes(c)).map(([c, n]) => `<option value="${c}">${n}</option>`).join("");
    sel.value = lang;
  });
}
buildLang(); applyLangAttrs();
if (lang !== "nl") trTree(document.body);
trObserver.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: TR_ATTRS });
// Weights are stored in kg. With the lb setting they are shown and typed in pounds.
const isLb = () => typeof prefs !== "undefined" && prefs.unit === "lb";
const U = () => isLb() ? "lb" : "kg";
const toU = kg => isLb() ? Math.round(kg * 2.20462 * 2) / 2 : kg;
const fromU = v => isLb() ? v / 2.20462 : v;
const fw = kg => fmt(toU(kg)) + " " + U();
const fmtDate = iso => { try { return new Date(iso).toLocaleDateString(LOC(),{day:"numeric",month:"short"}); } catch { return ""; } };

function lsGet(k, fallback){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v, (key, x) => key === "__proto__" ? undefined : x) : fallback; } catch { return fallback; } }
function lsSet(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
// Layout, theme, focus and welcome: on this device and in your prefs, so a new version or device keeps them.
const DEV_KEYS = ["ppl.style", "ppl.theme", "ppl.big", "ppl.storyStyle", "ppl.storyFmt", "ppl.focus", "ppl.welcomed"];
function devSet(k, v){ lsSet(k, v); prefs.dev = Object.assign({}, prefs.dev, { [k]: v }); savePrefs(); }
function devRestore(){
  let n = 0;
  Object.entries(prefs.dev || {}).forEach(([k, v]) => { if (DEV_KEYS.includes(k) && localStorage.getItem(k) === null){ lsSet(k, v); n++; } });
  return n;
}

let records = lsGet(LS_RECORDS, {});          // { "bench-press": {best, last, date} }
let view = Object.assign({scheme:"ppl", day:0}, lsGet(LS_VIEW, {}));
// Personal extras: notes per exercise, body weight per date, your own schemes, deload state.
const LS_PREFS = "ppl.prefs";
let prefs = Object.assign({ notes: {}, body: {}, custom: [], deloadStart: "", deloadSnooze: "" }, lsGet(LS_PREFS, {}));
try { navigator.storage && navigator.storage.persist && navigator.storage.persist().catch(() => {}); } catch {}
let prefsRef = null, prefsBooting = true;
function savePrefs(){
  if (!prefsBooting) prefs.savedAt = Date.now();   // start-up tidying must not count as a newer edit
  lsSet(LS_PREFS, prefs);
  if (prefsRef) syncDoc("prefs", prefsRef, () => prefs, v => { adoptInto(prefs, v || {}); lsSet(LS_PREFS, prefs); });
}

// ---------- Sync without overwriting: a three-way merge against the copy last seen in your account ----------
// `synced.docs` holds, per document, what this device last read from or wrote to your account. Before every write
// the app reads the account copy again and keeps the changes of both sides since then, so a device that stood open
// for hours never writes an old copy over what another device (or Garmin, Strava) added in the meantime.
const SYNC_LS = "fpt.synced";   // not "ppl.": a back-up must never bring an old copy of this back
let synced = lsGet(SYNC_LS, null);   // { uid, docs: { prefs, records, layout, "log/<date>" } }
const saveSynced = () => lsSet(SYNC_LS, synced);
const isObj = x => !!x && typeof x === "object" && !Array.isArray(x);
const clone = x => x === undefined ? x : JSON.parse(JSON.stringify(x));
// Equal content, whatever the key order (the database hands keys back in its own order).
function deepEq(a, b){
  if (a === b) return true;
  if (!a || !b || typeof a !== "object" || typeof b !== "object" || Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) return a.length === b.length && a.every((x, i) => deepEq(x, b[i]));
  const ka = Object.keys(a).filter(k => a[k] !== undefined), kb = Object.keys(b).filter(k => b[k] !== undefined);
  return ka.length === kb.length && ka.every(k => deepEq(a[k], b[k]));
}
// b = the common copy, l = this device, r = the other side. What only one side changed is kept;
// lists of sets, cardio, schemes and names are merged item by item; a value both sides changed goes to this device.
function merge3(b, l, r){
  if (deepEq(l, b)) return r;
  if (deepEq(r, b) || deepEq(l, r)) return l;
  if (isObj(l) && isObj(r)){
    const bo = isObj(b) ? b : {}, out = {};
    new Set(Object.keys(r).concat(Object.keys(l))).forEach(k => { const v = merge3(bo[k], l[k], r[k]); if (v !== undefined) out[k] = v; });
    return out;
  }
  if (Array.isArray(l) && Array.isArray(r)){
    const bl = Array.isArray(b) ? b : [], all = bl.concat(l, r);
    const id = all.every(x => typeof x === "string") ? x => x : all.every(x => isObj(x) && x.t != null) ? x => x.t : all.every(x => isObj(x) && x.id != null) ? x => x.id : null;
    if (id){
      const map = xs => new Map(xs.map(x => [id(x), x])), B = map(bl), L = map(l), R = map(r), out = [];
      R.forEach((x, k) => { const v = merge3(B.get(k), L.get(k), x); if (v !== undefined) out.push(v); });
      L.forEach((x, k) => { if (!R.has(k)){ const v = merge3(B.get(k), x, undefined); if (v !== undefined) out.push(v); } });
      return all.every(x => isObj(x) && x.t != null) ? out.sort((x, y) => x.t < y.t ? -1 : 1) : out;
    }
  }
  return l;
}
// Take over a merged copy in place, so code that holds a part of prefs (e.g. a linked app) keeps working on the live object.
function adoptInto(t, s){
  Object.keys(t).forEach(k => { if (!(k in s)) delete t[k]; });
  Object.keys(s).forEach(k => { if (isObj(t[k]) && isObj(s[k])) adoptInto(t[k], s[k]); else t[k] = s[k]; });
}
// Write one document: read the account copy, merge, write when it differs, then take over what came from elsewhere.
// Several saves in a row while one is underway become one write.
const syncQ = {};
function syncDoc(id, ref, get, put){
  const q = syncQ[id] = syncQ[id] || { run: Promise.resolve(), waiting: false };
  if (q.waiting) return q.run;
  q.waiting = true;
  return q.run = q.run.then(async () => {
    q.waiting = false;
    if (!synced) return;
    const mine = clone(get()), snap = await ref.get(), theirs = snap.exists ? snap.data() : undefined;
    const merged = merge3(synced.docs[id], mine, theirs);
    if (merged === undefined){ if (theirs !== undefined) await ref.delete(); }
    else if (!deepEq(merged, theirs)) await ref.set(merged);
    if (merged === undefined) delete synced.docs[id]; else synced.docs[id] = clone(merged);
    saveSynced();
    if (!deepEq(merged, mine)){ put(merge3(mine, clone(get()), merged)); syncRender(); }   // edits made during the wait stay
  }).catch(() => {
    setStore(false, "Je account is even niet bereikbaar. Alles staat veilig op dit toestel en gaat mee bij de volgende synchronisatie.");
  });
}
let syncRenderTimer;
function syncRender(){
  clearTimeout(syncRenderTimer);
  syncRenderTimer = setTimeout(() => {
    // not while you are typing: the next render shows it
    if (document.activeElement && document.activeElement.matches("input,textarea,select") || editDate) return;
    render(); if (page === "stats") renderStats();
  }, 300);
}
const waitForSync = () => Promise.all(Object.values(syncQ).map(q => q.run));
function saveRecords(){
  lsSet(LS_RECORDS, records);
  if (recordsRef) syncDoc("records", recordsRef, () => ({ lifts: records }), v => { records = (v && v.lifts) || {}; lsSet(LS_RECORDS, records); });
}
const allSchemes = () => SCHEMES.concat(prefs.custom || []);
const isCustom = s => (prefs.custom || []).some(c => c.id === s.id);
let layouts = lsGet(LS_LAYOUTS, {});          // { "ppl:0": [[name, sets, reps, rest, type], ...] } — only days you changed
let log = lsGet(LS_LOG, {});                  // { "2026-10-21": {date, days:[label], ex:{key:{name, order, sets:[{w, t}]}}} }
let editing = false, page = "train";
let recordsRef = null, layoutRef = null, logCol = null;   // db refs once available

const today = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0"); };
const longDate = date => { try { return new Date(date + "T12:00").toLocaleDateString(LOC(),{weekday:"long",day:"numeric",month:"long",year:"numeric"}); } catch { return date; } };

function logSet(name, w, r, timed){
  const date = today(), s = scheme(), k = keyOf(name);
  const label = s.name + " · " + s.days[view.day].name;
  const prev = log[date] || { date, days: [], ex: {} };
  const cur = prev.ex[k] || { name, order: Object.keys(prev.ex).length, sets: [] };
  const session = Object.assign({}, prev, {      // keeps cardio logged earlier that day
    date,
    days: prev.days.includes(label) ? prev.days : prev.days.concat([label]),
    ex: Object.assign({}, prev.ex, { [k]: { name, order: cur.order, sets: cur.sets.concat([Object.assign({ w, t: new Date().toISOString() }, r ? { r } : {}, timed ? { u: "s" } : {})]) } })
  });
  log = Object.assign({}, log, { [date]: session });
  saveSession(date);
  return session.ex[k].sets.filter(x => !endedAt || x.t > endedAt).length;   // sets of this workout
}

function saveSession(date){
  lsSet(LS_LOG, log);
  if (logCol) syncDoc("log/" + date, logCol.doc(date), () => log[date], v => {
    log = Object.assign({}, log); if (v) log[date] = v; else delete log[date]; lsSet(LS_LOG, log);
  });
}


// ---------- Logboek: change or delete what you logged ----------
let editDate = null;
function logEditor(date){
  const s0 = log[date], exs = Object.entries(s0.ex || {}).sort((a, b) => a[1].order - b[1].order);
  const setRow = (k, st, i) => {
    const time = st.u === "s", bw = !time && !st.w;
    return `<div class="le-set" data-k="${esc(k)}" data-t="${esc(st.t)}"><span class="le-n">${i + 1}</span>
      ${time || bw ? "" : `<label class="le-f"><input inputmode="decimal" data-f="w" value="${fmt(toU(st.w))}" aria-label="Gewicht"><b>${U()}</b></label>`}
      <label class="le-f"><input inputmode="numeric" data-f="r" value="${st.r || ""}" aria-label="${time ? "Seconden" : "Herhalingen"}"><b>${time ? "sec" : "reps"}</b></label>
      <button type="button" class="le-x" data-del aria-label="Set verwijderen">×</button></div>`;
  };
  const cardioRow = (c, ci) => {
    const t = cardioType(c.type), keys = (t ? t[3] : ["min", "km", "kcal"]).filter(k => k !== "split");
    return `<div class="le-cardio" data-ci="${ci}"><div class="le-ch"><b>${esc(c.type)}</b><button type="button" class="le-x" data-cdel aria-label="Cardio verwijderen">×</button></div>
      <div class="le-cf">${keys.map(k => `<label class="le-f"><input inputmode="decimal" data-c="${k}" value="${c[k] != null && c[k] !== "" ? fmt(c[k]) : ""}" aria-label="${esc(tr(CARDIO_METRICS[k][0]))}"><b>${esc(CARDIO_METRICS[k][1] || tr(CARDIO_METRICS[k][0]))}</b></label>`).join("")}</div></div>`;
  };
  return `<div class="log-edit">
    ${exs.map(([k, e]) => `<div class="le-ex"><b class="le-name">${esc(e.name)}</b>${e.sets.map((st, i) => setRow(k, st, i)).join("")}</div>`).join("")}
    ${(s0.cardio || []).map(cardioRow).join("")}
    <div class="le-btns"><button class="ghost" type="button" data-le="cancel">Annuleren</button><button class="save" type="button" data-le="save">Opslaan</button></div>
    <button class="le-delday" type="button" data-le="delete">Hele training verwijderen</button>
  </div>`;
}
function wireLogEditor(root, date){
  const box = root.querySelector(".log-edit"), num = el => { const v = parseFloat(String(el.value).trim().replace(",", ".")); return isFinite(v) && v >= 0 ? v : null; };
  box.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { const r = b.closest(".le-set"); r.dataset.removed = "1"; r.hidden = true; });
  box.querySelectorAll("[data-cdel]").forEach(b => b.onclick = () => { const r = b.closest(".le-cardio"); r.dataset.removed = "1"; r.hidden = true; });
  box.querySelector('[data-le="cancel"]').onclick = () => { editDate = null; renderStats(); };
  box.querySelector('[data-le="delete"]').onclick = () => {
    const sn = takeSnapshot(), copy = Object.assign({}, log); delete copy[date];
    log = copy; saveSession(date); editDate = null; renderStats(); renderExercises(); if (page === "today") renderToday();
    undoToast("Training verwijderd", sn);
  };
  box.querySelector('[data-le="save"]').onclick = () => {
    const s0 = log[date], sn = takeSnapshot(), ex = {};
    Object.entries(s0.ex || {}).forEach(([k, e]) => {
      const sets = e.sets.map(st => {
        const row = [...box.querySelectorAll(".le-set")].find(r => r.dataset.k === k && r.dataset.t === String(st.t));
        if (!row || row.dataset.removed) return null;
        const out = Object.assign({}, st), w = row.querySelector('[data-f="w"]'), r = row.querySelector('[data-f="r"]');
        if (w && num(w) != null) out.w = Math.round(fromU(num(w)) * 100) / 100;
        if (r && num(r) != null) out.r = Math.round(num(r));
        return out;
      }).filter(Boolean);
      if (sets.length) ex[k] = Object.assign({}, e, { sets });
    });
    const cardio = (s0.cardio || []).map((c, ci) => {
      const row = box.querySelector(`.le-cardio[data-ci="${ci}"]`);
      if (!row || row.dataset.removed) return null;
      const out = Object.assign({}, c);
      row.querySelectorAll("[data-c]").forEach(inp => { const v = num(inp); if (v == null) delete out[inp.dataset.c]; else out[inp.dataset.c] = v; });
      return out;
    }).filter(Boolean);
    const copy = Object.assign({}, log);
    if (Object.keys(ex).length || cardio.length) copy[date] = Object.assign({}, s0, { ex, cardio }); else delete copy[date];
    log = copy; saveSession(date); editDate = null; renderStats(); renderExercises(); if (page === "today") renderToday();
    undoToast("Training aangepast", sn);
  };
}

function removeSet(date, k, t){
  const s = log[date]; if (!s || !s.ex[k]) return;
  const sn = takeSnapshot();
  const ex = Object.assign({}, s.ex);
  const sets = ex[k].sets.filter(x => x.t !== t);
  if (sets.length) ex[k] = Object.assign({}, ex[k], { sets }); else delete ex[k];
  const copy = Object.assign({}, log);
  if (Object.keys(ex).length || (s.cardio || []).length) copy[date] = Object.assign({}, s, { ex }); else delete copy[date];
  log = copy; saveSession(date);
  renderStats(); renderExercises();
  undoToast("Set verwijderd", sn);
}

// Union two logs: same date → all sets from both (matched by time), all day labels.
function mergeLog(a, b){
  const out = Object.assign({}, a);
  for (const [date, s] of Object.entries(b || {})){
    const o = out[date];
    if (!o){ out[date] = s; continue; }
    const ex = Object.assign({}, o.ex);
    for (const [k, e] of Object.entries(s.ex || {})){
      const base = ex[k];
      if (!base){ ex[k] = Object.assign({}, e, { order: Object.keys(ex).length }); continue; }
      const seen = new Set(base.sets.map(x => x.t));
      ex[k] = Object.assign({}, base, { sets: base.sets.concat(e.sets.filter(x => !seen.has(x.t))).sort((x, y) => x.t < y.t ? -1 : 1) });
    }
    const seenC = new Set((o.cardio || []).map(c => c.t));
    const cardio = (o.cardio || []).concat((s.cardio || []).filter(c => !seenC.has(c.t)));
    out[date] = Object.assign({ date, days: [...new Set(o.days.concat(s.days || []))], ex }, cardio.length ? { cardio } : {});
  }
  return out;
}

// ---------- Analytics ----------
const setText = st => st.u === "s" ? st.r + " sec" : !st.w && st.r ? st.r + " reps" : fw(st.w) + (st.r ? " × " + st.r : "");
const shortDate = date => new Date(date + "T12:00").toLocaleDateString(LOC(), { day: "numeric", month: "short" });
const daysAgo = date => Math.round((new Date(today() + "T12:00") - new Date(date + "T12:00")) / 864e5);
function relDate(date){
  const d = daysAgo(date);
  if (d === 0) return "Vandaag";
  if (d === 1) return "Gisteren";
  return new Date(date + "T12:00").toLocaleDateString(LOC(), { weekday: "short", day: "numeric", month: "short" });
}
const splitLabel = label => { const i = label.lastIndexOf(" · "); return i < 0 ? ["", label] : [label.slice(0, i), label.slice(i + 3)]; };
let statsEx = null;   // exercise key shown in the big chart
let statsAll = false;   // true: show the sparkline list of every exercise instead of the single chart

// Per exercise: one point per training date = heaviest set that day.
// Exercises without weight (push-ups, planks) use the most reps / longest hold instead; `w` then holds that value.
function progressByExercise(){
  const out = {};
  Object.keys(log).sort().forEach(date => {
    const byType = {};
    (log[date].cardio || []).forEach(c => (byType[c.type] = byType[c.type] || []).push(c));
    Object.entries(byType).forEach(([type, list]) => {
      const unit = list.some(c => c.km) ? "km" : list.some(c => c.m) ? "m" : "min";
      const o = out["c-" + keyOf(type)] = out["c-" + keyOf(type)] || { name: type + " (cardio)", pts: [], unit };
      o.pts.push({ date, w: Math.max(...list.map(c => c[o.unit] || 0)), n: list.length });
    });
    for (const [k, e] of Object.entries(log[date].ex)){
      if (!e.sets.length) continue;
      const o = out[k] = out[k] || { name: e.name, pts: [], unit: "kg" };
      if (e.sets.every(s => !s.w)){
        o.unit = e.sets.some(s => s.u === "s") ? "sec" : "reps";
        o.pts.push({ date, w: Math.max(...e.sets.map(s => s.r || 0)), n: e.sets.length });
      } else {
        const top = e.sets.reduce((a, b) => b.w > a.w || (b.w === a.w && (b.r || 0) > (a.r || 0)) ? b : a);
        o.pts.push({ date, w: top.w, r: top.r, n: e.sets.length });
      }
    }
  });
  return out;
}

function niceStep(range){
  const raw = range / 4, mag = Math.pow(10, Math.floor(Math.log10(raw || 1)));
  return [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw) || 10 * mag;
}

function drawChart(box, pts, unit = "kg", opts = {}){
  const W = Math.max(280, box.clientWidth || 600), H = 230, m = { l: 44, r: 18, t: 18, b: 30 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const tgts = opts.targets || (opts.target != null ? [opts.target] : []);
  const ws = pts.map(p => p.w).concat(tgts);
  let lo = Math.min(...ws), hi = Math.max(...ws);
  if (hi - lo < 4) { lo -= 2; hi += 2; }
  const step = niceStep(hi - lo);
  lo = Math.max(0, Math.floor(lo / step) * step); hi = Math.ceil(hi / step) * step;
  const t0 = new Date(pts[0].date).getTime(), t1 = new Date(pts[pts.length - 1].date).getTime();
  const x = p => pts.length === 1 ? m.l + iw / 2 : m.l + (new Date(p.date).getTime() - t0) / (t1 - t0) * iw;
  const y = w => m.t + ih - (w - lo) / (hi - lo) * ih;
  let g = "";
  for (let v = lo; v <= hi + 1e-9; v += step){
    g += `<line class="c-grid" x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}"/><text class="c-axis" x="${m.l - 8}" y="${y(v) + 4}" text-anchor="end">${fmt(v)}</text>`;
  }
  const xl = pts.length === 1 ? [pts[0]] : pts.length === 2 ? pts : [pts[0], pts[Math.floor((pts.length - 1) / 2)], pts[pts.length - 1]];
  [...new Set(xl)].forEach((p, i, a) => {
    const anchor = a.length > 1 && i === 0 ? "start" : a.length > 1 && i === a.length - 1 ? "end" : "middle";
    g += `<text class="c-axis" x="${x(p)}" y="${H - 8}" text-anchor="${anchor}">${esc(shortDate(p.date))}</text>`;
  });
  tgts.forEach(tv => {
    const ty = y(tv).toFixed(1);
    g += `<line class="c-tgt" x1="${m.l}" x2="${W - m.r}" y1="${ty}" y2="${ty}"/><text class="c-tgt-lab" x="${m.l + 6}" y="${ty - 6}">Streefgewicht ${fmt(tv)} ${unit}</text>`;
  });
  const line = pts.map((p, i) => (i ? "L" : "M") + x(p).toFixed(1) + "," + y(p.w).toFixed(1)).join("");
  const area = pts.length > 1 ? `<path class="c-area" d="${line}L${x(pts[pts.length - 1]).toFixed(1)},${m.t + ih}L${x(pts[0]).toFixed(1)},${m.t + ih}Z"/>` : "";
  const last = pts[pts.length - 1];
  const dots = pts.map((p, i) => `<circle class="c-dot${i === pts.length - 1 ? " end" : ""}" cx="${x(p)}" cy="${y(p.w)}" r="${i === pts.length - 1 ? 5.5 : 4}"/>`).join("");
  const endLabel = `<text class="c-end" x="${Math.min(x(last), W - m.r)}" y="${y(last.w) - 12}" text-anchor="${pts.length === 1 ? "middle" : "end"}">${fmt(last.w)} ${unit}</text>`;
  box.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Beste set per training in ${unit}">
    ${g}${area}<path class="c-line" d="${line}"/>${dots}${endLabel}
    <line class="c-cross" data-cross x1="0" x2="0" y1="${m.t}" y2="${m.t + ih}" visibility="hidden"/>
    <rect class="c-hit" x="${m.l}" y="${m.t}" width="${iw}" height="${ih}"/></svg><div class="c-tip" data-tip hidden></div>`;
  const svg = box.querySelector("svg"), cross = box.querySelector("[data-cross]"), tip = box.querySelector("[data-tip]");
  const show = ev => {
    const r = svg.getBoundingClientRect(), px = (ev.clientX - r.left) * W / r.width;
    const p = pts.reduce((a, b) => Math.abs(x(b) - px) < Math.abs(x(a) - px) ? b : a);
    cross.setAttribute("x1", x(p)); cross.setAttribute("x2", x(p)); cross.setAttribute("visibility", "visible");
    tip.hidden = false;
    tip.innerHTML = `<b>${esc(fmt(p.w))} ${unit}${p.r ? " × " + p.r : ""}</b><span>${esc(relDate(p.date))} · ${p.n} ${p.n === 1 ? "set" : "sets"}</span>`;
    const left = x(p) * r.width / W, tw = tip.offsetWidth;
    tip.style.left = Math.min(Math.max(0, left - tw / 2), r.width - tw) + "px";
    tip.style.top = Math.max(0, y(p.w) * r.height / H - tip.offsetHeight - 14) + "px";
  };
  const hide = () => { cross.setAttribute("visibility", "hidden"); tip.hidden = true; };
  svg.addEventListener("pointermove", show); svg.addEventListener("pointerdown", show); svg.addEventListener("pointerleave", hide);
}

function sparkline(pts){
  const W = 84, H = 28;
  if (pts.length < 2) return `<svg class="spark" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true"><circle class="c-dot end" cx="${W - 4}" cy="${H / 2}" r="3"/></svg>`;
  const ws = pts.map(p => p.w), lo = Math.min(...ws), hi = Math.max(...ws), span = hi - lo || 1;
  const xy = pts.map((p, i) => [3 + i / (pts.length - 1) * (W - 7), H - 4 - (p.w - lo) / span * (H - 8)]);
  return `<svg class="spark" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true"><path class="c-line thin" d="${xy.map((q, i) => (i ? "L" : "M") + q[0].toFixed(1) + "," + q[1].toFixed(1)).join("")}"/><circle class="c-dot end" cx="${xy[xy.length - 1][0]}" cy="${xy[xy.length - 1][1]}" r="3"/></svg>`;
}

function renderStats(){
  const dates = Object.keys(log).sort().reverse();
  $("statsEmpty").hidden = dates.length > 0;
  document.querySelectorAll("#statsBody .mod[data-need]").forEach(m => { m.hidden = !dates.length; });
  renderJump();
  renderRecovery();
  if (!dates.length){
    $("bodyMap").innerHTML = bodyMapSvg({}); wireBodyMap({});
    $("musBars").innerHTML = `<p class="note">Nog geen sets in de laatste 7 dagen. Na je eerste training kleurt de kaart.</p>`;
    renderCalendar(); renderBodyWeight(); renderGoals(); renderProfile();
    return;
  }

  // Summary tiles
  const lastDays = log[dates[0]].days.map(l => splitLabel(l)[1]).join(" + ");
  $("tiles").innerHTML = `
    <div class="tile"><small>Trainingen</small><strong>${dates.length}</strong><em>in totaal</em></div>
    <div class="tile"><small>Laatste 7 dagen</small><strong>${dates.filter(d => daysAgo(d) < 7).length}</strong><em>${dates.filter(d => daysAgo(d) < 30).length} in 30 dagen</em></div>
    <div class="tile"><small>Laatste training</small><strong class="small">${esc(lastDays)}</strong><em>${esc(relDate(dates[0]))}</em></div>`;

  // Progress chart + exercise picker
  const prog = progressByExercise();
  const keys = Object.keys(prog).sort((a, b) => {
    const la = prog[a].pts[prog[a].pts.length - 1].date, lb = prog[b].pts[prog[b].pts.length - 1].date;
    return la === lb ? prog[a].name.localeCompare(prog[b].name) : la < lb ? 1 : -1;
  });
  if (!prog[statsEx]) statsEx = keys[0];
  const sel = $("chartEx");
  sel.innerHTML = keys.map(k => `<option value="${esc(k)}"${k === statsEx ? " selected" : ""}>${esc(prog[k].name)}</option>`).join("");
  $("chartSingle").hidden = statsAll;
  $("trendsNote").hidden = $("trends").hidden = !statsAll;
  $("chartAllToggle").setAttribute("aria-pressed", statsAll);
  $("chartAllToggle").textContent = statsAll ? "Eén oefening" : "Alle oefeningen";
  if (!statsAll){
    const p = prog[statsEx], first = p.pts[0], best = Math.max(...p.pts.map(q => q.w)), last = p.pts[p.pts.length - 1];
    const conv = q => p.unit === "kg" ? toU(q) : q;
    const diff = conv(last.w) - conv(first.w), u = p.unit === "kg" ? U() : p.unit;
    $("chartSummary").innerHTML = `
      <span><small>Start</small><b>${fmt(conv(first.w))} ${u}</b></span>
      <span><small>Nu</small><b>${fmt(conv(last.w))} ${u}</b></span>
      <span><small>Beste</small><b>${fmt(conv(best))} ${u}</b></span>
      <span><small>Verschil</small><b class="${diff > 0 ? "up" : diff < 0 ? "down" : ""}">${diff > 0 ? "▲ +" : diff < 0 ? "▼ " : ""}${fmt(diff)} ${u}</b></span>`;
    drawChart($("chart"), p.pts.map(q => Object.assign({}, q, { w: conv(q.w) })), u);
    $("chartNote").textContent = p.pts.length === 1
      ? "Eén training gelogd. Na je volgende training zie je hier een lijn."
      : `${p.unit === "kg" ? "Zwaarste set" : p.unit === "sec" ? "Langste set" : p.unit === "reps" ? "Meeste reps in één set" : p.unit === "min" ? "Langste duur" : "Verste afstand"} per training, ${p.pts.length} trainingen. Tik op de grafiek voor details.`;
  } else {
    // All exercises with a sparkline
    $("trends").innerHTML = "";
    keys.forEach(k => {
      const q = prog[k], d = (q.unit === "kg" ? toU(q.pts[q.pts.length - 1].w) - toU(q.pts[0].w) : q.pts[q.pts.length - 1].w - q.pts[0].w);
      const b = document.createElement("button"); b.type = "button"; b.className = "trend" + (k === statsEx ? " on" : "");
      b.innerHTML = `<span class="tr-name"></span>${sparkline(q.pts)}<span class="tr-val">${q.unit === "kg" ? fw(q.pts[q.pts.length - 1].w) : fmt(q.pts[q.pts.length - 1].w) + " " + q.unit}<small class="${d > 0 ? "up" : d < 0 ? "down" : ""}">${d > 0 ? "▲ +" : d < 0 ? "▼ " : "= "}${fmt(d)}</small></span>`;
      b.querySelector(".tr-name").textContent = q.name;
      b.onclick = () => { statsEx = k; statsAll = false; renderStats(); $("chartPanel").scrollIntoView({ behavior: "smooth", block: "start" }); };
      $("trends").appendChild(b);
    });
  }


  // Sets per muscle group, last 7 days: strongly worked = 1 set, less strongly = ½ set
  // Per group also: sets from strong and from less strong work, per exercise and per part of the muscle.
  const group = muscleGroup;
  const mus = {}, musDet = {};
  const det = g => musDet[g] = musDet[g] || { strong: 0, half: 0, ex: {}, parts: {}, days: new Set() };
  dates.filter(d => daysAgo(d) < 7).forEach(d => Object.values(log[d].ex).forEach(e => {
    const m = MUSCLES[e.name]; if (!m || isStretch(e.name)) return;
    const n = e.sets.length; if (!n) return;
    const strong = new Set(m[0].map(group));
    const add = (g, v, s) => {
      const o = det(g); mus[g] = (mus[g] || 0) + v; o[s ? "strong" : "half"] += n; o.days.add(d);
      const x = o.ex[e.name] = o.ex[e.name] || { v: 0, strong: s }; x.v += v; x.strong = x.strong || s;
    };
    strong.forEach(g => add(g, n, true));
    new Set(m[1].map(group)).forEach(g => { if (!strong.has(g)) add(g, n / 2, false); });
    // parts: "Biceps (vooral lange kop)", "Brachialis (onder de biceps)", "Bovenkant borst" …
    [[m[0], 1], [m[1], .5]].forEach(([list, f]) => list.forEach(raw => {
      const g = group(raw), p = raw.replace(/\s*\((stabiliseren|tegen draaien)\)/, "");
      const o = det(g); o.parts[p] = (o.parts[p] || 0) + n * f;
    }));
  }));
  const musList = Object.entries(mus).filter(([, v]) => v >= 1).sort((a, b) => b[1] - a[1]);
  const scaleMax = Math.max(20, ...musList.map(([, v]) => v));
  const half = v => fmt(Math.round(v * 2) / 2);
  const musDetail = g => {
    const o = musDet[g], v = mus[g] || 0; if (!o) return "";
    const ex = Object.entries(o.ex).sort((a, b) => b[1].v - a[1].v);
    const parts = Object.entries(o.parts).sort((a, b) => b[1] - a[1]);
    const tip = v < 10 ? `Nog ${half(10 - v)} sets tot de richtlijn van 10 per week.`
      : v <= 20 ? "Binnen de richtlijn van 10–20 sets per week."
      : `${half(v - 20)} sets boven de 20. Meer helpt meestal niet; let op je herstel.`;
    return `<div class="mb-det">
      <p class="mb-sum"><span>${o.strong} sterk</span><span>${o.half} minder sterk (× ½)</span><span>${o.days.size === 1 ? "1 trainingsdag" : `${o.days.size} trainingsdagen`}</span></p>
      <p class="mb-tip">${tip}${v >= 10 && o.days.size === 1 ? " <span>Verdeel ze liever over 2 trainingen.</span>" : ""}</p>
      ${parts.length > 1 || (parts[0] && parts[0][0] !== g) ? `<h4>Onderdelen</h4><ul class="mb-list">${parts.map(([p, n]) => `<li><span>${esc(p)}</span><b>${half(n)}</b></li>`).join("")}</ul>` : ""}
      <h4>Oefeningen</h4><ul class="mb-list">${ex.map(([n, x]) => `<li><span>${esc(n)}</span><small>${x.strong ? "sterk" : "minder sterk"}</small><b>${half(x.v)}</b></li>`).join("")}</ul>
    </div>`;
  };
  $("musBars").innerHTML = musList.length ? musList.map(([g, v]) => `
    <button type="button" class="mb ${v > 20 ? "high" : v >= 10 ? "ok" : ""}${g === musOpen ? " open" : ""}" data-g="${esc(g)}" aria-expanded="${g === musOpen}"><span title="${esc(g)}">${esc(g)}</span>
      <div class="mb-track"><div class="mb-fill" style="width:${v / scaleMax * 100}%"></div></div>
      <b>${half(v)}</b></button>${g === musOpen ? musDetail(g) : ""}`).join("")
    + `<p class="note">Tik op een spiergroep voor de oefeningen en onderdelen.</p><p class="note">Groen = 10–20 sets, oranje = meer dan 20, grijs = minder dan 10.</p>`
    : `<p class="note">Nog geen sets in de laatste 7 dagen.</p>`;
  $("bodyMap").innerHTML = bodyMapSvg(mus); wireBodyMap(mus);
  const pickMuscle = (g, fromMap) => {
    musOpen = musOpen === g && !fromMap ? "" : g;   // from the map, g is "" when the muscle was tapped again
    $("musBars").querySelectorAll(".mb").forEach(b => {
      const on = b.dataset.g === musOpen; b.classList.toggle("open", on); b.setAttribute("aria-expanded", on);
      const nx = b.nextElementSibling; if (nx && nx.classList.contains("mb-det")) nx.remove();
      if (on) b.insertAdjacentHTML("afterend", musDetail(g));
    });
    if (!fromMap) showMuscle(musOpen, mus);
  };
  $("musBars").querySelectorAll(".mb").forEach(b => b.onclick = () => pickMuscle(b.dataset.g, false));
  musPick = g => pickMuscle(g, true);
  if (musOpen) showMuscle(musOpen, mus);
  renderCalendar(); renderBodyWeight();
  renderReport(); renderGoals(); renderMilestones(); renderVolume(); renderCardioStats(); renderStrength(); renderBalance(); renderProfile(); renderAdvice(); renderKcal(); renderFood();

  // How often each day type was trained
  const counts = {};
  dates.forEach(d => log[d].days.forEach(l => { const n = splitLabel(l)[1]; counts[n] = (counts[n] || 0) + 1; }));
  $("dayCounts").innerHTML = Object.entries(counts).sort((a, b) => b[1] - a[1])
    .map(([n, c]) => `<span class="count"><b>${esc(n)}</b> ${c}×</span>`).join("");

  // History: which day when, with the sets inside (filtered by the search box)
  const box = $("logList"); box.innerHTML = "";
  const q = ($("logSearch").value || "").trim().toLowerCase(), f = logFilter;
  const match = txt => !q || txt.toLowerCase().includes(q) || ((NL[txt] || [""])[0]).toLowerCase().includes(q);
  let hits = 0, monthBody = null, monthKey = "", monthN = 0;
  // Grouped per month: the newest month is open, older months fold (what you open stays open).
  const closeMonth = () => { if (monthBody) monthBody.parentElement.querySelector(".lm-n").textContent = `${monthN} ${monthN === 1 ? "training" : "trainingen"}`; };
  dates.forEach((date, di) => {
    const s0 = log[date];
    const dayHit = q && s0.days.some(l => l.toLowerCase().includes(q));
    const s = Object.assign({}, s0, {
      ex: f === "cardio" ? {} : Object.fromEntries(Object.entries(s0.ex).filter(([, e]) => dayHit || match(e.name))),
      cardio: f === "lift" ? [] : (s0.cardio || []).filter(c => dayHit || match(c.type))
    });
    if ((q || f !== "all") && !Object.keys(s.ex).length && !s.cardio.length) return;
    hits++;
    if (date.slice(0, 7) !== monthKey){
      closeMonth();
      monthKey = date.slice(0, 7); monthN = 0;
      const m = document.createElement("details"); m.className = "log-month"; m.dataset.m = monthKey;
      m.open = !!q || (logMonths.has(monthKey) ? logMonths.get(monthKey) : !box.children.length);
      m.innerHTML = `<summary><b>${esc(new Date(monthKey + "-15T12:00").toLocaleDateString(LOC(), { month: "long", year: "numeric" }))}</b><span class="lm-n"></span></summary><div class="lm-body"></div>`;
      m.addEventListener("toggle", () => { if (!q) logMonths.set(m.dataset.m, m.open); });
      box.appendChild(m); monthBody = m.querySelector(".lm-body");
    }
    monthN++;
    const exs = Object.entries(s.ex).sort((a, b) => a[1].order - b[1].order);
    const total = exs.reduce((n, [, e]) => n + e.sets.length, 0), cmin = (s.cardio || []).reduce((a, c) => a + (c.min || 0), 0);
    const det = document.createElement("details"); det.className = "session";
    det.open = !!q || logOpen.has(date);
    det.addEventListener("toggle", () => { if (!q) det.open ? logOpen.add(date) : logOpen.delete(date); });
    const names = s.days.map(splitLabel);
    det.innerHTML = `<summary>
        <span class="h-date">${esc(relDate(date))}</span>
        <span class="h-day"><b>${esc(names.map(n => n[1]).join(" + "))}</b><small>${esc([...new Set(names.map(n => n[0]))].join(", "))}</small></span>
        <span class="h-count">${total ? total + " " + (total === 1 ? "set" : "sets") : ""}${total && cmin ? " · " : ""}${cmin ? Math.round(cmin) + " min cardio" : ""}</span>
      </summary>
      <p class="h-long">${esc(longDate(date))}${exs.length ? " · " + exs.length + (exs.length === 1 ? " oefening" : " oefeningen") : ""}${(s.cardio || []).length ? " · " + s.cardio.length + " cardio" : ""}</p>
      <ul class="session-ex"></ul>
      <div class="h-share"><button class="pill" type="button" data-edit-day>${editDate === date ? "Sluiten" : "Aanpassen"}</button><button class="pill" type="button" data-share-day>Delen</button></div>`;
    det.querySelector("[data-share-day]").onclick = () => openShareSheet(date);
    det.querySelector("[data-edit-day]").onclick = () => { editDate = editDate === date ? null : date; renderStats(); };
    if (editDate === date){
      det.open = true;
      det.querySelector("ul").outerHTML = logEditor(date);
      wireLogEditor(det, date);
      monthBody.appendChild(det);
      return;
    }
    const ul = det.querySelector("ul");
    exs.forEach(([k, e]) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="sx-name">${esc(e.name)}</span><span class="sx-sets"></span>`;
      const sets = li.querySelector(".sx-sets");
      e.sets.forEach(st => {
        const pill = document.createElement("span"); pill.className = "set-pill";
        pill.textContent = setText(st);
        const x = document.createElement("button"); x.type = "button"; x.textContent = "×";
        x.setAttribute("aria-label", `Verwijder ${setText(st)} bij ${e.name} op ${longDate(date)}`);
        x.onclick = () => removeSet(date, k, st.t);
        pill.appendChild(x); sets.appendChild(pill);
      });
      ul.appendChild(li);
    });
    (s.cardio || []).forEach(c => {
      const li = document.createElement("li");
      const from = [c.name, c.dev].filter(Boolean).join(" · ");
      li.innerHTML = `<span class="sx-name">${esc(c.type)}${from ? `<small translate="no">${esc(from)}</small>` : ""}</span><span class="sx-sets"><span class="set-pill">${esc(cardioParts(c)[1])}</span></span>`;
      ul.appendChild(li);
    });
    monthBody.appendChild(det);
  });
  closeMonth();
  $("logHits").textContent = q || f !== "all" ? (hits ? hits + (hits === 1 ? " training gevonden." : " trainingen gevonden.") : "Niets gevonden.") : "";
}

function showPage(p){
  page = p;
  $("todayView").hidden = p !== "today"; $("trainView").hidden = p !== "train"; $("statsView").hidden = p !== "stats"; $("planView").hidden = p !== "plan";
  $("viewToday").setAttribute("aria-selected", p === "today");
  $("viewTrain").setAttribute("aria-selected", p === "train");
  $("viewStats").setAttribute("aria-selected", p === "stats");
  $("viewPlan").setAttribute("aria-selected", p === "plan");
  $("statsJump").hidden = p !== "stats";
  if (p === "stats") renderStats();
  if (p === "plan") renderPlanning();
  if (p === "train") renderSchemes();
  if (p === "today") renderToday();
}

// Planning: week plan, calendar and goals
function renderPlanning(){ renderWeek(); renderCalendar(); renderGoals(); renderProfile(); }
function scheme(){ const all = allSchemes(); return all.find(s => s.id === view.scheme) || all[0]; }

// Exercises you added to an old scheme's days (e.g. pull-ups first) move onto the new days:
// near the top if they were in the top half, otherwise at the bottom. Returns true when something changed.
function carryOverOldSchemes(days){
  let changed = false;
  for (const [from, { to, days: olds }] of Object.entries(OLD_SCHEMES)){
    const s = SCHEMES.find(x => x.id === to);
    // An exercise you added to one day counts as yours on every day (e.g. pull-ups were already a default on Pull A).
    const yours = new Set();
    olds.forEach((defaults, i) => (days[from + ":" + i] || []).forEach((e, at) => {
      // Also yours: an exercise you moved to the very top (it was a default, but not the first one).
      if (!defaults.includes(e[0]) || (at === 0 && e[0] !== defaults[0])) yours.add(e[0]);
    }));
    olds.forEach((defaults, i) => {
      const old = days[from + ":" + i], key = to + ":" + i;
      if (!old || days[key]) return;
      const own = old.map((e, at) => ({ e, at })).filter(o => yours.has(o.e[0]));
      if (!own.length) return;
      const names = own.map(o => o.e[0].toLowerCase());
      const base = s.days[i].ex.filter(e => !names.includes(e[0].toLowerCase())).map(e => e.slice());
      const top = own.filter(o => o.at < old.length / 2).map(o => o.e), bottom = own.filter(o => o.at >= old.length / 2).map(o => o.e);
      days[key] = top.concat(base, bottom);
      changed = true;
    });
  }
  return changed;
}
if (OLD_SCHEMES[view.scheme]) view.scheme = OLD_SCHEMES[view.scheme].to;
if (carryOverOldSchemes(layouts)) lsSet(LS_LAYOUTS, layouts);
const dayKey = (s, i) => s.id + ":" + i;
function exercisesFor(s, i){ return layouts[dayKey(s, i)] || s.days[i].ex; }

function saveLayouts(){
  lsSet(LS_LAYOUTS, layouts);
  if (layoutRef) syncDoc("layout", layoutRef, () => ({ days: layouts }), v => { layouts = (v && v.days) || {}; lsSet(LS_LAYOUTS, layouts); });
}

// Change one day's list; fn gets a copy and returns the new list.
function changeDay(s, i, fn){
  layouts = Object.assign({}, layouts, { [dayKey(s, i)]: fn(exercisesFor(s, i).map(e => e.slice())) });
  saveLayouts();
}

function moveExercise(i, action){
  const s = scheme(), sn = action === "remove" ? takeSnapshot() : null;
  if (action === "ss"){
    changeDay(s, view.day, list => { while (list[i].length < 6) list[i].push(""); list[i][6] = !list[i][6]; return list; });
    renderExercises(); return;
  }
  // Moving a spot keeps the screen on it, so you can click the same button again right away.
  const movedKey = ["top", "up", "down"].includes(action) ? keyOf(dayItems()[i][0]) : null;
  changeDay(s, view.day, list => {
    const [item] = list.splice(i, 1);
    const to = action === "top" ? 0 : action === "up" ? i - 1 : action === "down" ? i + 1 : -1;
    if (to >= 0) list.splice(to, 0, item);
    return list;
  });
  if (action === "remove") undoToast("Oefening verwijderd van deze dag", sn);
  renderExercises();
  if (movedKey) scrollToKey(movedKey);
}

function addExercise(e){
  e.preventDefault();
  // a choice from the library, or else the name you typed yourself
  const name = $("addName").value.trim();
  if (!name){ toast("Kies een oefening uit de lijst of geef een naam."); return; }
  const item = [name, $("addSets").value.trim() || "3", $("addReps").value.trim() || "8–12", $("addRest").value.trim() || "90 s", $("addType").value];
  if ($("addMode").value) item.push($("addMode").value);
  $("addName").value = "";
  addItems([item], name);
}
// A day's group is its name without a trailing A/B/number: "Push A" and "Push B" are both "push".
const dayGroup = d => ((d && d.name) || "").replace(/\s+[A-Z0-9]$/, "").trim().toLowerCase();
// "Only the push days": offered when other days of the scheme share this day's group.
function renderAddScope(){
  const s = scheme(), sel = $("addScope"), d = s.days[view.day], g = dayGroup(d);
  const n = g ? s.days.filter(x => dayGroup(x) === g).length : 0, label = d.name.replace(/\s+[A-Z0-9]$/, "").trim();
  const cur = sel.value;
  sel.innerHTML = `<option value="day">Alleen deze dag</option>` + (n > 1 && n < s.days.length ? `<option value="group">Alleen de ${esc(label)}-dagen</option>` : "")
    + (s.days.length > 2 ? `<option value="pick">Kies dagen…</option>` : "") + (s.days.length > 1 ? `<option value="all">Alle dagen van dit schema</option>` : "");
  sel.value = [...sel.options].some(o => o.value === cur) ? cur : "day";
  renderAddDays();
}
// "Kies dagen…": one toggle per day of the scheme (bv. Dag A and Dag C), this day is on to begin with.
let pickDays = new Set(), pickAt = "";
function renderAddDays(){
  const s = scheme(), box = $("addDays"), on = $("addScope").value === "pick";
  box.hidden = !on; if (!on) return;
  if (pickAt !== dayKey(s, view.day)){ pickAt = dayKey(s, view.day); pickDays = new Set([view.day]); }
  box.innerHTML = s.days.map((d, i) => `<button type="button" class="chip" data-d="${i}" aria-pressed="${pickDays.has(i)}">${esc(d.name)}</button>`).join("");
  box.querySelectorAll("[data-d]").forEach(b => b.onclick = () => {
    const i = +b.dataset.d; if (pickDays.has(i) && pickDays.size > 1) pickDays.delete(i); else pickDays.add(i);
    renderAddDays();
  });
}
$("addScope").addEventListener("change", renderAddDays);
// Put exercises on this day (or every day of the scheme), at the top or bottom as chosen in the form.
function addItems(items, label){
  const top = $("addPos").value === "top", s = scheme();
  const sc = $("addScope").value, grp = dayGroup(s.days[view.day]);
  const days = sc === "all" ? s.days.map((_, i) => i) : sc === "pick" ? [...pickDays].filter(i => s.days[i]).sort((a, b) => a - b) : sc === "group" ? s.days.map((d, i) => i).filter(i => dayGroup(s.days[i]) === grp) : [view.day];
  const names = new Set(items.map(x => x[0].toLowerCase()));
  days.forEach(i => changeDay(s, i, list => {
    // Same exercise already on this day: move it instead of adding it twice.
    list = list.filter(x => !names.has(x[0].toLowerCase()));
    return top ? items.map(x => x.slice()).concat(list) : list.concat(items.map(x => x.slice()));
  }));
  toast(days.length > 1 ? `${label} toegevoegd aan alle ${days.length} dagen` : `${label} toegevoegd`);
  renderExercises();
}
// Programma/oefening toevoegen: pick a program from any category, unfold its parts, add a whole part or one exercise.
let addProgOpen = null;
function renderAddProg(){
  const sel = $("addProg"), keep = sel.value, cur = scheme();
  sel.innerHTML = `<option value="">Kies een programma…</option>` + CATS.map(([cat, title]) => {
    const list = catSchemes(cat).filter(x => x.id !== cur.id);
    return list.length ? `<optgroup label="${esc(title)}">${list.map(x => `<option value="${esc(x.id)}">${esc(x.name.replace(/^Programma: /, ""))}</option>`).join("")}</optgroup>` : "";
  }).join("");
  sel.value = keep && findScheme(keep) ? keep : "";
  const p = sel.value && findScheme(sel.value), box = $("addSubs");
  if (!p){ box.innerHTML = ""; return; }
  box.innerHTML = p.days.map((d, i) => {
    const ex = exercisesFor(p, i), open = addProgOpen === i;
    return `<div class="add-sub"><div class="add-sub-head"><button type="button" class="sub-toggle" data-sub="${i}" aria-expanded="${open}"><span aria-hidden="true">${open ? "▾" : "▸"}</span> ${esc(d.name)} <small>(${ex.length})</small></button>
      <button type="button" class="ghost-sm" data-all="${i}">+ Alles</button></div>
      ${open ? `<div class="chips">${ex.map((x, j) => `<button type="button" class="chip" data-one="${i}:${j}" translate="no">+ ${esc(x[0])}</button>`).join("")}</div>` : ""}</div>`;
  }).join("");
  box.querySelectorAll("[data-sub]").forEach(b => b.onclick = () => { addProgOpen = addProgOpen === +b.dataset.sub ? null : +b.dataset.sub; renderAddProg(); });
  box.querySelectorAll("[data-all]").forEach(b => b.onclick = () => { const i = +b.dataset.all; addItems(exercisesFor(p, i), p.days[i].name); });
  box.querySelectorAll("[data-one]").forEach(b => b.onclick = () => { const [i, j] = b.dataset.one.split(":").map(Number), x = exercisesFor(p, i)[j]; addItems([x], x[0]); });
}

// The exercise list to add from: every exercise in the app, grouped by category and alphabetical per group.
const ADD_GROUPS = [["push", "Duwen: borst, schouders, triceps"], ["pull", "Trekken: rug, biceps"], ["legs", "Benen en billen"], ["core", "Core"],
  ["cardio", "Cardio"], ["class", "Groepslessen en wedstrijd"], ["mobility", "Mobiliteit en stretchen"], ["yoga", "Yoga"], ["kine", "Kinetherapie"], ["mind", "Meditatie en ademhaling"]];
function exerciseCatalog(){
  const cat = new Map();
  const put = (n, g) => { if (n && !cat.has(n)) cat.set(n, g); };
  SCHEMES.forEach(sc => sc.days.forEach(d => d.ex.forEach(e => {
    const g = sc.kine ? "kine" : sc.mind ? "mind" : e[5] === "cardio" ? (sc.cls ? "class" : "cardio") : e[4] === "kine" ? "kine" : e[4] === "mind" ? "mind" : e[4];
    put(e[0], g);
  })));
  LIB.forEach(x => put(x[0], x[1]));
  return cat;
}
// Search text for one exercise: its name, Dutch label, description and muscles, so typing a body part
// (bv. "borst") or a word from the name (bv. "curl") both find it, in whichever language is shown.
const normSearch = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
function addNameHaystack(n, label){
  const [, desc] = NL[n] || ["", ""], mus = MUSCLES[n] ? MUSCLES[n][0].concat(MUSCLES[n][1]) : [];
  return normSearch([n, label, tr(desc), ...mus.map(m => tr(m))].join(" "));
}
let addCatalogLang = null, addCatalog = [];
function buildAddCatalog(){
  addCatalogLang = lang;
  const cat = exerciseCatalog(), label = n => tr(NL[n] ? NL[n][0] : n);
  addCatalog = [...cat].map(([n, g]) => { const l = label(n); return { n, g, label: l, hay: addNameHaystack(n, l) }; });
}
// The exercise picker: a text field you can type a search into, with the matching exercises always
// listed below it so you can tap one instead of typing the whole name. Typing a name with no match
// just keeps it as a new custom exercise.
function renderAddNameList(){
  const input = $("addName"), box = $("addNameList"), val = input.value.trim();
  if (addCatalogLang !== lang) buildAddCatalog();
  const q = normSearch(val), byGroup = new Map();
  addCatalog.forEach(it => {
    if (q && !it.hay.includes(q)) return;
    (byGroup.get(it.g) || byGroup.set(it.g, []).get(it.g)).push(it);
  });
  const chosen = val && addCatalog.find(it => it.n.toLowerCase() === val.toLowerCase());
  const list = ADD_GROUPS.map(([g, title]) => {
    const items = (byGroup.get(g) || []).sort((a, b) => a.label.localeCompare(b.label, LOC()));
    return items.length ? `<div class="add-name-group"><p class="add-name-group-title">${esc(tr(title))}</p>${items.map(it => `<button type="button" class="add-name-opt" data-name="${esc(it.n)}" aria-selected="${it === chosen}">${esc(it.label)}</button>`).join("")}</div>` : "";
  }).join("");
  box.innerHTML = (chosen ? `<p class="add-name-chosen">${esc(tr("Gekozen:"))} <b>${esc(chosen.label)}</b></p>` : "") + (list || `<p class="note">${esc(tr("Niets gevonden. Typ een eigen naam in het veld hieronder."))}</p>`);
  box.querySelectorAll("[data-name]").forEach(b => b.onclick = () => { input.value = b.dataset.name; renderAddNameList(); prefillKnown(); });
}
// Fill the add form with the usual sets/reps when you pick a known exercise.
function prefillKnown(){
  const name = $("addName").value.trim().toLowerCase();
  for (const s of SCHEMES) for (const d of s.days) for (const x of d.ex){
    if (x[0].toLowerCase() === name){ [, $("addSets").value, $("addReps").value, $("addRest").value, $("addType").value] = x; $("addMode").value = x[5] || ""; return; }
  }
  const l = LIB.find(x => x[0].toLowerCase() === name);
  if (l){ $("addType").value = l[1]; $("addMode").value = l[2]; $("addSets").value = l[4]; $("addReps").value = l[5]; $("addRest").value = l[6]; }
}

// Scheme row: your own order; some schemes (by default the programs) sit behind "⋯ Meer".
let moreOpen = false, orderEditing = false;
// Schemes that are new since you last arranged them start behind "More" when they are programs or classes.
const SCHEMES_BEFORE_CLASSES = ["pp2", "ppl", "ul", "ppab2", "core", "prog-beginner", "prog-phul", "prog-531", "cardio", "mobility", "yoga"];
// Yoga moved to the group classes: once also for people who already arranged their schemes.
if (prefs.schemeMore && !prefs.schemeMore.includes("yoga") && !prefs.yogaClass){ prefs.schemeMore = prefs.schemeMore.concat(["yoga"]); prefs.yogaClass = true; }
const schemeMore = () => {
  const def = allSchemes().filter(s => s.program || s.more).map(s => s.id);
  if (!prefs.schemeMore) return def;
  const known = prefs.schemeKnown || SCHEMES_BEFORE_CLASSES;
  return prefs.schemeMore.concat(def.filter(id => !known.includes(id) && !prefs.schemeMore.includes(id)));
};
function orderedSchemes(){
  const all = allSchemes(), order = prefs.schemeOrder || [];
  const known = order.map(id => all.find(s => s.id === id)).filter(Boolean);
  return known.concat(all.filter(s => !order.includes(s.id)));
}
const catMore = {};   // per category: ⋯ opened
// Uitleg per scheme: open the first time you pick it, closed after that; then it keeps what you chose.
const noteState = Object.assign(Object.fromEntries(lsGet("ppl.noteSeen", []).map(id => [id, false])), lsGet("ppl.noteState", {}));
let noteForce = null;
const noteIsOpen = id => noteForce === id || noteState[id] === true;
let progOpen = false, kineOpen = false, mindOpen = false, classOpen = false, cardioOpen = false, schemaOpen = true;
function renderSchemes(){
  const box = $("schemes"); box.innerHTML = "";
  const list = orderedSchemes().filter(s => inCat(s, "")), more = schemeMore(), cur = scheme();
  const main = list.filter(s => !more.includes(s.id)), hidden = list.filter(s => more.includes(s.id));
  if (cur.program) progOpen = true;
  if (cur.kine) kineOpen = true;
  if (cur.mind) mindOpen = true;
  if (cur.cls) classOpen = true;
  if (cur.crd) cardioOpen = true;
  // Schema: open by default, can be folded like the other categories
  box.hidden = !schemaOpen;
  const stg = $("schemaToggle"); stg.setAttribute("aria-expanded", schemaOpen); stg.firstElementChild.textContent = schemaOpen ? "▾" : "▸";
  stg.onclick = () => { schemaOpen = !schemaOpen; renderSchemes(); };
  const chip = s => {
    const b = document.createElement("button");
    b.className = "chip"; b.type = "button"; b.textContent = s.name.replace(/^Programma: /, "");
    b.setAttribute("aria-pressed", s.id === cur.id);
    b.onclick = () => { const nx = nextDayIndex(s); view = { scheme: s.id, day: nx ? nx.idx : 0, home: homeFor(s) }; lsSet(LS_VIEW, view);
      noteForce = null; if (noteState[s.id] === undefined){ noteState[s.id] = false; noteForce = s.id; lsSet("ppl.noteState", noteState); } $("newScheme").hidden = true; render(); };
    return b;
  };
  // Always at most two lines of schemes; what does not fit goes behind ⋯ (n). Your own order decides who comes first.
  const chips = main.concat(hidden).map(s => { const c = chip(s); c.dataset.id = s.id; box.appendChild(c); return c; });
  fitTwoLines(box, chips, moreOpen, () => { moreOpen = !moreOpen; renderSchemes(); }, cur.id);
  // Kine and meditation: each its own row, folded until you open it
  const row = (el, items, open, label, toggle, kind) => {
    el.innerHTML = ""; if (!items.length) return;
    const head = document.createElement("div"); head.className = "label-row";
    const t = document.createElement("button");
    t.type = "button"; t.className = "sub-toggle"; t.setAttribute("aria-expanded", open);
    t.textContent = `${open ? "▾" : "▸"} ${label} (${items.length})`;
    t.onclick = () => { toggle(); renderSchemes(); };
    head.append(t); el.appendChild(head);
    if (!open) return;
    const c = document.createElement("div"); c.className = "chips"; el.appendChild(c);
    const chips = items.map(s => { const b = chip(s); b.dataset.id = s.id; c.appendChild(b); return b; });
    fitTwoLines(c, chips, !!catMore[kind], () => { catMore[kind] = !catMore[kind]; renderSchemes(); }, cur.id);
  };
  row($("classRow"), catSchemes("cls"), classOpen, "Groepslessen en wedstrijd", () => { classOpen = !classOpen; }, "cls");
  row($("cardioRow"), catSchemes("crd"), cardioOpen, "Cardio", () => { cardioOpen = !cardioOpen; }, "crd");
  row($("kineRow"), orderedSchemes().filter(s => s.kine), kineOpen, "Kinetherapie en blessures", () => { kineOpen = !kineOpen; }, "kine");
  row($("mindRow"), orderedSchemes().filter(s => s.mind), mindOpen, "Meditatie en ademhaling", () => { mindOpen = !mindOpen; }, "mind");
  const focusLines = cur.days.filter(d => d.focus).map(d => `<br><b>${esc(d.name)}</b>: ${esc(d.focus)}`).join("");
  $("schemeNote").innerHTML = esc(cur.note) + focusLines + (cur.kine ? `<br><small class="warn-t">${esc(KINE_NOTE)}</small>` : cur.mind ? `<br><small class="warn-t">${esc(MIND_NOTE)}</small>` : "");
  const noteOpen = noteIsOpen(cur.id);
  $("schemeNote").hidden = !noteOpen;
  const ntg = $("noteToggle"); ntg.setAttribute("aria-expanded", noteOpen); ntg.firstElementChild.textContent = noteOpen ? "▾" : "▸";
  ntg.onclick = () => { noteState[cur.id] = !noteOpen; noteForce = null; lsSet("ppl.noteState", noteState); renderSchemes(); };
  renderSchemeOrder();
}
// At most two lines of chips; the rest goes behind ⋯ (n), which opens the whole list. The chip you train with stays in view.
function fitTwoLines(box, chips, open, toggle, curId){
  const t = document.createElement("button");
  t.className = "chip more-chip"; t.type = "button"; t.setAttribute("aria-expanded", open);
  t.onclick = toggle;
  const lines = () => new Set([...box.children].map(x => x.offsetTop)).size;
  if (open){ t.textContent = "⋯"; t.setAttribute("aria-label", "Minder tonen"); box.appendChild(t); }
  else if (box.offsetParent && lines() > 2){
    t.textContent = `⋯ (${chips.length})`; box.appendChild(t);
    const shown = chips.slice();
    while (shown.length && lines() > 2){
      let i = shown.length - 1; if (shown[i].dataset.id === curId && i > 0) i--;
      shown.splice(i, 1)[0].remove();
      t.textContent = `⋯ (${chips.length - shown.length})`;
    }
    t.setAttribute("aria-label", `Nog ${chips.length - shown.length} schema's tonen`);
  }
}
// The four main categories: schemes, group classes, physio and meditation
const CATS = [["", "Schema"], ["cls", "Groepslessen en wedstrijd"], ["crd", "Cardio"], ["kine", "Kinetherapie en blessures"], ["mind", "Meditatie en ademhaling"]];
const inCat = (s, cat) => cat ? !!s[cat] : !s.kine && !s.mind && !s.cls && !s.crd;
const CLASS_FIRST = ["hyrox", "crossfit", "yoga"];
function catSchemes(cat){
  const list = orderedSchemes().filter(s => inCat(s, cat));
  if (cat !== "cls" || prefs.clsOrdered) return list;
  const rank = s => { const i = CLASS_FIRST.indexOf(s.id); return i < 0 ? CLASS_FIRST.length : i; };
  return list.sort((a, b) => rank(a) - rank(b));
}
let orderCat = "", pickMode = "";
// + and ⇅ first ask which of the four categories
function renderCatPick(){
  const box = $("catPick");
  box.hidden = !pickMode;
  $("ownScheme").setAttribute("aria-expanded", pickMode === "new");
  $("orderScheme").setAttribute("aria-expanded", pickMode === "order");
  if (!pickMode) return;
  box.innerHTML = `<p class="note">${pickMode === "new" ? "Wat wil je maken?" : "Van welke categorie wil je de volgorde aanpassen?"}</p>
    <div class="chips">${CATS.map(([k, label]) => `<button type="button" class="chip" data-cat="${k}">${esc(label)}</button>`).join("")}</div>`;
  box.querySelectorAll("[data-cat]").forEach(b => b.onclick = () => {
    const cat = b.dataset.cat, mode = pickMode; pickMode = ""; renderCatPick();
    if (mode === "new") openNewScheme(cat);
    else {
      orderCat = cat; orderEditing = true;
      if (cat === "cls") classOpen = true; else if (cat === "crd") cardioOpen = true; else if (cat === "kine") kineOpen = true; else if (cat === "mind") mindOpen = true; else schemaOpen = true;
      renderSchemes(); $("schemeOrder").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    }
  });
}
function renderSchemeOrder(){
  const panel = $("schemeOrder");
  $("orderScheme").setAttribute("aria-expanded", orderEditing || pickMode === "order");
  panel.hidden = !orderEditing;
  if (!orderEditing) return;
  const cat = orderCat, list = catSchemes(cat), more = schemeMore(), main = !cat;
  panel.innerHTML = `<p class="label">${esc(CATS.find(c => c[0] === cat)[1])}</p><p class="note">${main ? "Zet je schema's in de volgorde die je wil. Wat niet op twee regels past, staat achter ⋯." : "Zet ze in de volgorde die je wil."}</p>` +
    list.map((s, i) => `<div class="ord-row${more.includes(s.id) ? " in-more" : ""}">
      <span class="ord-name">${esc(s.name.replace(/^Programma: /, ""))}${s.program ? ' <small>programma</small>' : ""}</span>
      <button type="button" data-o="up" data-i="${i}" ${i === 0 ? "disabled" : ""} aria-label="${esc(s.name)} omhoog">↑</button>
      <button type="button" data-o="down" data-i="${i}" ${i === list.length - 1 ? "disabled" : ""} aria-label="${esc(s.name)} omlaag">↓</button>
      ${main ? `<button type="button" class="ord-more" data-o="more" data-i="${i}" aria-pressed="${more.includes(s.id)}">${more.includes(s.id) ? "Achter ⋯" : "Zichtbaar"}</button>` : ""}
    </div>`).join("") + `<button class="save" type="button" id="orderDone">Klaar</button>`;
  panel.querySelectorAll("[data-o]").forEach(b => b.onclick = () => {
    const i = +b.dataset.i, o = b.dataset.o;
    if (o === "up" || o === "down"){
      // swap within this category; the other categories keep their places
      const cids = list.map(s => s.id), j = o === "up" ? i - 1 : i + 1; [cids[i], cids[j]] = [cids[j], cids[i]];
      let n = 0; prefs.schemeOrder = orderedSchemes().map(s => inCat(s, cat) ? cids[n++] : s.id);
      if (cat === "cls") prefs.clsOrdered = true;
    } else {
      const m = schemeMore(), id = list[i].id;
      prefs.schemeMore = m.includes(id) ? m.filter(x => x !== id) : m.concat([id]);
      prefs.schemeKnown = allSchemes().map(x => x.id);
    }
    savePrefs(); renderSchemes();
  });
  $("orderDone").onclick = () => { orderEditing = false; renderSchemes(); };
}

// Combining schemes: after a day of one scheme an add-on can follow (e.g. Core after Push).
// When the add-on is done you go back to the scheme you came from, at its next day (Pull), unless you choose to stay.
const ADDON_IDS = ["core", "mobility", "yoga"];
const isAddon = s => ADDON_IDS.includes(s.id) || !!s.kine || !!s.mind || !!s.crd;
const findScheme = id => allSchemes().find(x => x.id === id) || null;
const comboHome = () => view.home && view.home !== view.scheme ? findScheme(view.home) : null;
function afterOf(s, i){ const id = (prefs.after || {})[dayKey(s, i)]; return id && id !== s.id ? findScheme(id) : null; }
// The home scheme's next day; while you are busy with the add-on, today's home day already counts as done.
function nextHomeDay(h){
  const nx = nextDayIndex(h); if (!nx) return 0;
  return nx.date === today() && inWorkout() ? (nx.idx + 1) % h.days.length : nx.idx;
}
// Picking a scheme yourself: an add-on remembers where you came from, a main scheme starts fresh.
function homeFor(s){ const cur = scheme(); return !isAddon(s) ? undefined : isAddon(cur) ? view.home : cur.id; }
const sgOpen = new Set();   // "Voorstel" explanations you opened (folded by default)
document.addEventListener("toggle", e => { const d = e.target; if (d.classList && d.classList.contains("sg-why")) d.open ? sgOpen.add(d.dataset.sg) : sgOpen.delete(d.dataset.sg); }, true);
function renderCombo(){
  const box = $("combo"), s = scheme(), h = comboHome();
  if (h){
    box.innerHTML = `<p class="note">${esc(`Aanvulling bij ${h.name.replace(/^Programma: /, "")}.`)}</p>`;
    return;
  }
  box.innerHTML = "";
}

// A logged label ("Yoga · Yin (herstel)") belongs to a day, also under the day's old name.
const dayLabelIs = (s, day, l) => l === s.name + " · " + day.name || (day.was || []).some(w => l === s.name + " · " + w);
// Which day of this scheme comes next: the one after the day you trained last (or today's, if you trained today).
function nextDayIndex(s){
  for (const d of Object.keys(log).sort().reverse()){
    const labels = log[d].days.filter(l => l.startsWith(s.name + " · "));
    if (!labels.length) continue;
    const i = s.days.findIndex(x => dayLabelIs(s, x, labels[labels.length - 1]));
    if (i < 0) continue;
    return { idx: d === today() && inWorkout() || s.stay ? i : (i + 1) % s.days.length, last: s.days[i].name, date: d };
  }
  return null;
}

function renderNext(){
  const s = scheme(), nx = nextDayIndex(s);
  const show = nx && !(nx.date === today() && inWorkout()) && nx.idx !== view.day && s.days.length > 1;
  $("nextDay").hidden = !show;
  if (!show) return;
  $("nextText").innerHTML = `Volgende in dit schema: <b>${esc(s.days[nx.idx].name)}</b>`;
  $("nextGo").onclick = () => { view.day = nx.idx; lsSet(LS_VIEW, view); render(); };
}

function renderDays(){
  const box = $("days"); box.innerHTML = "";
  const s = scheme(); if (view.day >= s.days.length) view.day = 0;
  s.days.forEach((d,i) => {
    const b = document.createElement("button");
    b.className = "tab"; b.type = "button"; b.setAttribute("role","tab"); b.textContent = d.name;
    b.setAttribute("aria-selected", i === view.day);
    b.onclick = () => { view.day = i; lsSet(LS_VIEW, view); render(); };
    box.appendChild(b);
  });
  const lastDone = Object.keys(log).sort().reverse().find(d => log[d].days.some(l => dayLabelIs(s, s.days[view.day], l)));
  $("dayFocus").textContent = "";
  renderCombo();
  renderNext();
}

// Sets of the last finished session of this exercise (a workout you finished earlier today counts).
function prevSessionSets(k){
  const earlier = todayAll(k).filter(x => endedAt && x.t <= endedAt);
  if (earlier.length) return earlier;
  const d = Object.keys(log).filter(d => d < today() && log[d].ex[k] && log[d].ex[k].sets.length).sort().pop();
  return d ? log[d].ex[k].sets : [];
}
const shortSet = (st, mode) => !st ? "—" : mode === "time" ? st.r + " s" : mode ? String(st.r || 0) : fmt(toU(st.w)) + (st.r ? " × " + st.r : "");
const cardFor = k => document.querySelector(`#exercises .ex[data-k="${k}"]`);
const isFinishedKey = k => { const c = cardFor(k); return !!c && c.classList.contains("finished"); };
function scrollToKey(k){
  const c = cardFor(k); if (!c) return;
  if (focusOn && !editing){ focusTo(k); return; }
  setTimeout(() => c.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }), 50);
}

let recsOpen = lsGet("ppl.recsOpen", false);   // records under each exercise: closed by default, remembers the last choice
function renderExercises(){ keepScroll(renderExercisesNow); }
function renderExercisesNow(){
  const list = $("exercises"); list.innerHTML = "";
  const s = scheme(), items = dayItems(), pw = programWeek(s);
  progCache = progressByExercise();
  $("editToggle").setAttribute("aria-pressed", editing);
  $("editToggle").textContent = editing ? "Klaar" : "Aanpassen";
  $("addPanel").hidden = !editing;
  if (editing){ renderAddNameList(); renderAddProg(); }
  $("finishBtn").hidden = editing || !items.length;
  $("focusToggle").hidden = editing || !items.length;
  $("shuffleBtn").hidden = editing || items.length < 2;
  $("restEachBtn").hidden = editing || !items.length;
  $("schemeDelete").hidden = !(editing && isCustom(s));
  $("schemeDelete2").hidden = !(isCustom(s) && !editing);
  if (deleteArmed !== s.id) delBtns().forEach(b => b.textContent = "Dit eigen schema verwijderen");
  renderDeload();
  let doneCount = 0, skipCount = 0;
  if (!items.length) list.innerHTML = `<li class="empty-day">Nog geen oefeningen op deze dag. Tik op <b>Aanpassen</b> en kies oefeningen uit de bibliotheek.</li>`;
  items.forEach((item, i) => {
    if (item[5] === "cardio" && cardioType(item[0])){
      const c = cardioCard(item, i, items);
      if (c.done) doneCount++; else if (c.skipped) skipCount++;
      list.appendChild(c.li); return;
    }
    const [name, sets, baseReps, rest, type] = item, mode = item[5] || "", ss = !!item[6] && i < items.length - 1, orig = item[7] || "";
    const reps = pw && pw.reps && (!pw.mainOnly || i === 0) && !mode ? pw.reps : baseReps;   // program week can set the reps
    const ssUp = i > 0 && !!items[i - 1][6];                 // second half of a superset
    const k = keyOf(name), r = records[k];
    const unit = mode === "time" ? "sec" : "reps";           // mode: "" = weight + reps, "bw" = reps only, "time" = seconds
    const bw = mode ? repStats(k) : null;
    const todaySets = sessionSets(k), prev = prevSessionSets(k);
    const li = document.createElement("li");
    const planned = plannedOf(sets);
    const done = todaySets.length >= planned || (todaySets.length > 0 && isMarked("done", k)), skipped = !done && isSkipped(k);
    if (done) doneCount++; else if (skipped) skipCount++;
    const finished = done || skipped, collapsed = !editing && finished && !expanded.has(k);
    li.className = "ex" + (done ? " done" : "") + (skipped ? " skipped" : "") + (finished ? " finished" : "") + (collapsed ? " collapsed" : "")
      + (ss ? " ss-first" : "") + (ssUp ? " ss-second" : "");
    li.dataset.k = k;
    // Inputs stay empty; the gray placeholder is the suggestion and is used when you save without typing.
    const sg = suggest(k, sets, reps, mode, i === 0);
    const wHint = sg.w == null ? "" : fmt(toU(Math.round(sg.w * 100) / 100)), rHint = String(sg.r || "");
    const badge = done ? `<span class="badge ok">✓ ${todaySets.length}/${planned}</span>`
      : skipped ? `<span class="badge skip">Overgeslagen</span>`
      : `<span class="badge">${todaySets.length}/${planned}</span>`;
    const ssTag = ss ? `<span class="ss-tag">Superset ↓</span>` : ssUp ? `<span class="ss-tag">Superset ↑</span>` : "";
    const chip = restEach && !finished ? `<button type="button" class="rest-chip" data-rest data-name="${esc(name)}" data-sec="${restSeconds(rest)}" aria-label="Rusttimer starten of stoppen"></button>` : "";
    const head = `<span class="ex-title"><span class="ex-name"></span><span class="ex-nl"></span>${ssTag}</span>${chip}${badge}`;
    const note = (prefs.notes || {})[k] || "";

    // One row per set: number, what you did last time, weight, reps, check.
    const rowsN = done ? todaySets.length + 1 : Math.max(planned, todaySets.length + 1);
    let rows = `<div class="sr head${mode ? " nw" : ""}"><span>Set</span><span>Vorige</span>${mode ? "" : `<span>${U()}</span>`}<span>${unit}</span><span></span></div>`;
    for (let j = 0; j < rowsN; j++){
      const label = j < planned ? j + 1 : "+";
      if (j < todaySets.length){
        const st = todaySets[j];
        rows += `<div class="sr did${mode ? " nw" : ""}"><span class="sr-n">${label}</span><span class="sr-prev">${esc(shortSet(prev[j], mode))}</span>${mode ? "" : `<span class="sr-v">${fmt(toU(st.w))}</span>`}<span class="sr-v">${st.r || "—"}</span><span class="sr-ck on" aria-label="Gedaan">✓</span></div>`;
      } else if (j === todaySets.length && !skipped){
        rows += `<form class="sr act${mode ? " nw" : ""}" id="f-${k}"><span class="sr-n">${label}</span><span class="sr-prev">${esc(shortSet(prev[j], mode))}</span>${mode ? "" : `
          <label class="field weight"><input id="w-${k}" type="text" inputmode="decimal" autocomplete="off" value="" placeholder="${esc(wHint)}" aria-label="Gewicht set ${j + 1} voor ${esc(name)} in ${U()}"></label>`}
          <label class="field reps"><input id="r-${k}" type="text" inputmode="numeric" autocomplete="off" value="" placeholder="${esc(rHint)}" aria-label="${mode === "time" ? "Seconden" : "Reps"} set ${j + 1} voor ${esc(name)}"></label>
          <button class="sr-ck go" type="submit" aria-label="Set ${j + 1} opslaan">✓</button></form>`;
      } else {
        rows += `<div class="sr todo${mode ? " nw" : ""}"><span class="sr-n">${label}</span><span class="sr-prev">${esc(shortSet(prev[j], mode))}</span>${mode ? "" : `<span class="sr-v">${esc(wHint)}</span>`}<span class="sr-v">${esc(rHint)}</span><span class="sr-ck"></span></div>`;
      }
    }

    li.innerHTML = (editing ? `
      <div class="edit-fields">
        <label>Sets<input id="es-${k}" data-f="1" inputmode="numeric" value="${esc(sets)}"></label>
        <label>Reps<input id="er-${k}" data-f="2" value="${esc(reps)}"></label>
        <label>Rust<input id="et-${k}" data-f="3" value="${esc(rest)}"></label>
      </div>
      <div class="edit-bar">
        <button type="button" data-act="top" ${i === 0 ? "disabled" : ""} aria-label="Naar boven">⤒ Eerst</button>
        <button type="button" data-act="up" ${i === 0 ? "disabled" : ""} aria-label="Eén plaats omhoog">↑</button>
        <button type="button" data-act="down" ${i === items.length - 1 ? "disabled" : ""} aria-label="Eén plaats omlaag">↓</button>
        <button type="button" data-act="ss" ${i === items.length - 1 ? "disabled" : ""} aria-pressed="${ss}">${ss ? "Superset ✓" : "Superset met ↓"}</button>
        <button type="button" data-act="remove" class="remove">Verwijder</button>
      </div>` : "") + `
      ${finished && !editing ? `<button class="ex-head" type="button" aria-expanded="${!collapsed}">${head}</button>` : `<div class="ex-head">${head}</div>`}
      <div class="ex-body">
        <div class="prescription"><span><b>${planned} × ${esc(reps)}${mode === "time" ? " sec" : ""}</b> · rust ${esc(rest)}${deloadActive() ? " · deload" : ""}${pw && pw.light ? " · lichte week" : ""}</span><span class="tag ${esc(type)}">${esc(({ mobility: "mobiliteit" })[type] || type)}</span></div>
        ${orig ? `<p class="ex-swapped">Vervangt vandaag <b>${esc(orig)}</b> · <button type="button" class="link" data-unswap>Terugzetten</button></p>` : ""}
        ${note ? `<p class="ex-note"><b>Notitie:</b> <span></span></p>` : ""}
        ${miniTrend(progCache[k])}
        <button type="button" class="sub-toggle rec-toggle" data-recs aria-expanded="${recsOpen}"><span aria-hidden="true">${recsOpen ? "▾" : "▸"}</span> Records</button>
        <div class="records"${recsOpen ? "" : " hidden"}>${mode ? `
          <div class="rec best"><small>Beste</small><strong>${bw ? bw.best + " " + unit : "—"}</strong></div>
          <div class="rec"><small>Vorige</small><strong>${bw ? bw.last + " " + unit : "—"}</strong>${bw ? `<em>${esc(shortDate(bw.date))}</em>` : ""}</div>` : `
          <div class="rec best"><small>Beste</small><strong>${r ? fw(r.best) : "—"}</strong></div>
          <div class="rec"><small>Vorige</small><strong>${r ? fw(r.last) : "—"}</strong>${r && r.date ? `<em>${fmtDate(r.date)}</em>` : ""}</div>`}
        </div>
        ${skipped || done ? "" : `<div class="suggest${sg.up ? " up" : ""}">
          <details class="sg-why" data-sg="${esc(name)}"${sgOpen.has(name) ? " open" : ""}><summary><b>${sg.up ? "▲ " : ""}Voorstel: ${wHint && !mode ? wHint + " " + U() + " × " : ""}${esc(rHint)} ${unit}</b></summary>
          <span>${esc(sg.why)}</span>${sg.note ? `<span class="trend-note">${esc(sg.note)}</span>` : ""}</details>${goalCoachHtml(name)}
        </div>`}
        ${skipped ? `<div class="entry-row"><button class="ghost wide" type="button" data-unskip>Toch doen</button></div>` : `
        <div class="sets">${rows}</div>
        <div class="tools">${mode ? "" : `
          <span class="tool-group"><small>${U()}</small>
          <button class="pill" type="button" data-step="${isLb() ? -5 : -2.5}" aria-label="${isLb() ? "5 lb" : "2,5 kg"} minder">${isLb() ? "−5" : "−2,5"}</button>
          <button class="pill" type="button" data-step="${isLb() ? 5 : 2.5}" aria-label="${isLb() ? "5 lb" : "2,5 kg"} meer">${isLb() ? "+5" : "+2,5"}</button></span>`}
          <span class="tool-group"><small>${unit}</small>
          <button class="pill rp" type="button" data-rstep="${mode === "time" ? -5 : -1}" aria-label="${mode === "time" ? "5 seconden" : "1 rep"} minder">${mode === "time" ? "−5" : "−1"}</button>
          <button class="pill rp" type="button" data-rstep="${mode === "time" ? 5 : 1}" aria-label="${mode === "time" ? "5 seconden" : "1 rep"} meer">${mode === "time" ? "+5" : "+1"}</button></span>
          ${mode ? "" : `<span class="plates" aria-live="polite"></span>`}
        </div>
        ${todaySets.length ? `<button class="undo" type="button" data-undo>↶ Laatste set wissen</button>` : ""}
        <div class="entry-row">
          ${editing || done ? "" : todaySets.length ? `<button class="ghost done-btn" type="button" data-done>✓ Klaar</button>` : `<button class="ghost" type="button" data-skip>Overslaan</button>`}
          ${editing || done || todaySets.length ? "" : `<button class="ghost" type="button" data-swap aria-label="Oefening vervangen">⇄</button>`}
          <button class="save" type="submit" form="f-${k}">${done ? "Extra set opslaan" : "Set " + (todaySets.length + 1) + " opslaan"}</button>
        </div>`}
        <details class="how demo-how"><summary>Voorbeeld en uitleg</summary>
          <div class="demo-stage"></div>
          <p class="ex-desc"></p><ul class="tips"></ul>
          <div class="demo"><a class="demo-link" target="_blank" rel="noopener">▶ Video op YouTube</a></div>
        </details>
        ${MUSCLES[name] ? `<details class="how muscles"><summary>Spiergroepen</summary>
          <div class="mus"><small>${isStretch(name) ? "Rekt vooral" : "Sterk aangesproken"}</small><div class="mus-list">${MUSCLES[name][0].map(m => `<span class="mus-chip strong">${esc(m)}</span>`).join("")}</div></div>
          ${MUSCLES[name][1].length ? `<div class="mus"><small>${isStretch(name) ? "Ook" : "Minder sterk aangesproken"}</small><div class="mus-list">${MUSCLES[name][1].map(m => `<span class="mus-chip">${esc(m)}</span>`).join("")}</div></div>` : ""}
        </details>` : ""}
        <details class="how notes"><summary>${note ? "Notitie bewerken" : "Notitie toevoegen"}</summary>
          <textarea id="n-${k}" rows="2" maxlength="300" placeholder="Bv. stoel op stand 4, smalle greep, rechterschouder voorzichtig"></textarea>
          <button class="pill" type="button" data-note>Notitie bewaren</button>
        </details>
      </div>`;
    li.querySelector(".ex-name").textContent = name;
    const [nl, desc] = NL[name] || ["", ""];
    li.querySelector(".ex-nl").textContent = nl;
    li.querySelector(".ex-desc").textContent = desc || "Nog geen uitleg voor deze oefening. Bekijk de video hieronder.";
    if (note) li.querySelector(".ex-note span").textContent = note;
    li.querySelector(`#n-${CSS.escape(k)}`).value = note;
    const q = encodeURIComponent(name.replace(/\s*\(.*\)/, "") + " exercise proper form");
    const video = li.querySelector(".demo-link");
    video.href = "https://www.youtube.com/results?search_query=" + q;
    video.setAttribute("aria-label", "Bekijk een voorbeeldvideo van " + name + " op YouTube");

    const headBtn = li.querySelector("button.ex-head");
    if (headBtn) headBtn.onclick = () => { expanded.has(k) ? expanded.delete(k) : expanded.add(k); renderExercises(); };
    li.querySelector("[data-recs]").onclick = () => { recsOpen = !recsOpen; lsSet("ppl.recsOpen", recsOpen); renderExercises(); };
    const rc = li.querySelector("[data-rest]");
    if (rc) rc.onclick = () => { if (restName === name && !$("restBar").hidden) stopRest(); else { warmUpSound(); startRest(+rc.dataset.sec, name); } };
    li.querySelector("[data-note]").onclick = () => {
      const v = li.querySelector("textarea").value.trim();
      prefs.notes = Object.assign({}, prefs.notes);
      if (v) prefs.notes[k] = v; else delete prefs.notes[k];
      savePrefs(); renderExercises(); toast(v ? "Notitie bewaard" : "Notitie gewist");
    };
    const undo = li.querySelector("[data-undo]");
    if (undo) undo.onclick = () => {
      const gone = todaySets[todaySets.length - 1];
      setMark("done", k, false);
      removeSet(today(), k, gone.t);
      // Put Best / Last back to what they were before this set.
      if (!mode && records[k] && gone.w > 0){
        const left = Object.keys(log).sort().flatMap(d => (log[d].ex[k] || { sets: [] }).sets);
        const logBest = left.length ? Math.max(...left.map(s => s.w)) : 0;
        const prevRec = records[k], keepBest = prevRec.best !== gone.w ? prevRec.best : 0;
        const lastSet = left[left.length - 1];
        records = Object.assign({}, records);
        if (!left.length && !keepBest) delete records[k];
        else records[k] = Object.assign({}, prevRec, { best: Math.max(logBest, keepBest), last: lastSet ? lastSet.w : prevRec.last, date: lastSet ? lastSet.t : prevRec.date });
        saveRecords();
        renderExercises();
      }
    };
    const unskip = li.querySelector("[data-unskip]");
    if (unskip) unskip.onclick = () => { expanded.add(k); setSkip(k, false); };

    const form = li.querySelector("form.sr");
    if (form){
      const input = form.querySelector(".field.weight input"), repsInput = form.querySelector(".field.reps input");
      const plates = li.querySelector(".plates");
      const showPlates = () => { if (plates) plates.textContent = platesText(name, fromU(parseFloat(String((input && input.value.trim()) || wHint).replace(",", ".")))); };
      showPlates();
      if (input) input.addEventListener("input", showPlates);
      const partnerDown = ss ? items[i + 1] : null, partnerUp = ssUp ? items[i - 1] : null;
      form.addEventListener("submit", e => {
        e.preventDefault();
        warmUpSound(); keepAwake();
        const setNo = saveWeight(name, input ? input.value.trim() || input.placeholder : "0", repsInput.value.trim() || repsInput.placeholder, mode);
        if (!setNo) return;
        const nowDone = setNo >= planned;
        // Superset: go straight to the partner, rest only after the second exercise.
        if (partnerDown && !isFinishedKey(keyOf(partnerDown[0]))){
          stopRest();
          if (nowDone){ expanded.delete(k); renderExercises(); }
          toast("Superset: nu " + partnerDown[0]);
          scrollToKey(keyOf(partnerDown[0]));
          return;
        }
        if (!nowDone){
          startRest(restSeconds(rest), name);
          if (partnerUp && !isFinishedKey(keyOf(partnerUp[0]))) scrollToKey(keyOf(partnerUp[0]));
          return;
        }
        if (setNo === planned){
          expanded.delete(k); renderExercises(); toast("✓ " + name + " klaar");
          if (partnerUp && !isFinishedKey(keyOf(partnerUp[0]))){ startRest(restSeconds(rest), name); scrollToKey(keyOf(partnerUp[0])); }
          else { stopRest(); goToNext(k); }
        }
      });
      li.querySelectorAll("[data-step]").forEach(b => b.onclick = () => {
        const cur = parseFloat(String(input.value.trim() || input.placeholder).replace(",", ".")) || 0;
        input.value = fmt(Math.max(0, cur + parseFloat(b.dataset.step)));
        showPlates();
      });
      li.querySelectorAll("[data-rstep]").forEach(b => b.onclick = () => {
        const cur = parseInt(repsInput.value.trim() || repsInput.placeholder, 10) || 0;
        repsInput.value = String(Math.max(1, cur + parseInt(b.dataset.rstep, 10)));
      });
    }
    const swapBtn = li.querySelector("[data-swap]");
    if (swapBtn) swapBtn.onclick = () => {
      let box = li.querySelector(".swap-box");
      if (box){ box.remove(); return; }
      const base = orig || name, alts = alternativesFor(base);
      box = document.createElement("div"); box.className = "swap-box";
      box.innerHTML = `<p class="note">Toestel bezet? Kies een oefening voor dezelfde spieren. Alleen voor vandaag.</p>` +
        (alts.length ? alts.map(a => `<button type="button" class="lib-hit" data-alt="${esc(a.n)}"><b>${esc(a.n)}</b><span>${esc((NL[a.n] || [""])[0])} · ${esc(a.s2.slice(0, 3).join(", "))}</span></button>`).join("") : `<p class="note">Geen alternatief gevonden.</p>`);
      swapBtn.closest(".entry-row").after(box);
      box.querySelectorAll("[data-alt]").forEach(b => b.onclick = () => setSwap(base, b.dataset.alt));
    };
    const unswap = li.querySelector("[data-unswap]");
    if (unswap) unswap.onclick = () => setSwap(orig, "");
    const skipBtn = li.querySelector("[data-skip]");
    if (skipBtn) skipBtn.onclick = () => setSkip(k, true);
    const doneBtn = li.querySelector("[data-done]");
    if (doneBtn) doneBtn.onclick = () => markDone(k, name);
    // Editing sets / reps / rest: save on change and update the line in place (no re-render, so focus stays put).
    li.querySelectorAll("[data-f]").forEach(f => f.addEventListener("change", () => {
      const sc = scheme(), idx = +f.dataset.f, v = f.value.trim();
      if (!v) { f.value = exercisesFor(sc, view.day)[i][idx]; return; }
      changeDay(sc, view.day, list => { list[i][idx] = v; return list; });
      const [, ns, nr, nt] = exercisesFor(sc, view.day)[i];
      li.querySelector(".prescription span").innerHTML = `<b>${esc(ns)} × ${esc(nr)}</b> · rust ${esc(nt)}`;
      toast("Aangepast: " + ns + " × " + nr);
    }));
    li.querySelectorAll("[data-act]").forEach(b => b.onclick = () => moveExercise(i, b.dataset.act));
    list.appendChild(li);
  });

  // Workout progress for today
  const n = items.length, finishedN = doneCount + skipCount;
  $("progressFill").style.width = (n ? finishedN / n * 100 : 0) + "%";
  $("progressText").textContent = !n ? "" : finishedN === n
    ? `Training klaar: ${doneCount} gedaan${skipCount ? ", " + skipCount + " overgeslagen" : ""}. Tik op Einde training.`
    : `${doneCount} van ${n} oefeningen klaar` + (skipCount ? ` · ${skipCount} overgeslagen` : "");
  applyFocus();
  fillTips();
  updateRestChips();
}

// ---------- Focus mode: one exercise at a time ----------
let focusOn = lsGet("ppl.focus", true), focusKey = null;
function applyFocus(){
  const cards = [...document.querySelectorAll("#exercises .ex")], on = focusOn && !editing && cards.length > 0;
  document.body.classList.toggle("focus", on);
  document.body.classList.toggle("working", on && inWorkout());   // before the first set you still pick scheme and day
  $("focusBar").hidden = !on;
  $("focusToggle").textContent = focusOn ? "Alles tonen" : "Training";
  cards.forEach(c => c.classList.remove("focused"));
  if (!on) return;
  let c = cards.find(x => x.dataset.k === focusKey);
  if (!c) c = cards.find(x => !x.classList.contains("finished")) || cards[0];
  focusKey = c.dataset.k;
  c.classList.add("focused");
  c.classList.remove("collapsed");
  const at = cards.indexOf(c);
  $("fPos").textContent = `Oefening ${at + 1} van ${cards.length}`;
  $("fPrev").disabled = at === 0; $("fNext").disabled = at === cards.length - 1;
}
// Switch the exercise in focus without moving the screen: the bar with the arrows stays where it is,
// or comes just under the header when you had scrolled past it.
function focusTo(k){
  const bar = $("focusBar"), y0 = bar.getBoundingClientRect().top, head = document.querySelector(".top").getBoundingClientRect().bottom;
  focusKey = k; applyFocus();
  const y1 = bar.getBoundingClientRect().top, target = Math.max(y0, head + 8);
  if (Math.abs(y1 - target) > 1) window.scrollBy(0, y1 - target);
}
function focusStep(d){
  const cards = [...document.querySelectorAll("#exercises .ex")];
  const at = cards.findIndex(x => x.dataset.k === focusKey);
  const next = cards[at + d];
  if (next) focusTo(next.dataset.k);
}

// ---------- In the gym: skip, rest timer, screen on ----------
const LS_SKIPS = "ppl.skips", LS_ENDED = "ppl.ended";
// When you last tapped "Einde training". Sets after that moment form the current workout.
let endedAt = lsGet(LS_ENDED, "");
const todayAll = k => ((log[today()] || { ex: {} }).ex[k] || { sets: [] }).sets;
const sessionSets = k => todayAll(k).filter(x => !endedAt || x.t > endedAt);
const inWorkout = () => Object.values((log[today()] || { ex: {} }).ex).some(e => e.sets.some(x => !endedAt || x.t > endedAt));
// Today's marks per training day: skipped exercises, and ones you finished early with "Klaar".
// { "2026-10-21|pp2:0": ["bench-press"], "2026-10-21|pp2:0|done": ["chest-dip"] } — today only
let skips = lsGet(LS_SKIPS, {});
const expanded = new Set();             // finished cards you opened again
const markKey = kind => today() + "|" + dayKey(scheme(), view.day) + (kind === "skip" ? "" : "|" + kind);
const isMarked = (kind, k) => (skips[markKey(kind)] || []).includes(k);
const isSkipped = k => isMarked("skip", k);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function setMark(kind, k, on){
  const key = markKey(kind);
  const keep = Object.fromEntries(Object.entries(skips).filter(([sk]) => sk.startsWith(today() + "|")));
  keep[key] = (keep[key] || []).filter(x => x !== k).concat(on ? [k] : []);
  skips = keep; lsSet(LS_SKIPS, skips);
}

function setSkip(k, on){
  const sn = takeSnapshot();
  setMark("skip", k, on);
  if (on) { expanded.delete(k); stopRest(); }
  renderExercises();
  if (on) { undoToast("Overgeslagen", sn); goToNext(k); }
}

function markDone(k, name){
  setMark("done", k, true); setMark("skip", k, false);
  expanded.delete(k); stopRest();
  renderExercises();
  toast("✓ " + name + " klaar");
  goToNext(k);
}

// Best and last reps (or seconds) for exercises without weight.
function repStats(k){
  let best = 0, last = 0, date = "";
  Object.keys(log).sort().forEach(d => {
    const e = log[d].ex[k]; if (!e || !e.sets.length) return;
    e.sets.forEach(s => { best = Math.max(best, s.r || 0); });
    last = e.sets[e.sets.length - 1].r || 0; date = d;
  });
  return date ? { best, last, date } : null;
}

// ---------- Einde training ----------
function finishWorkout(){
  const s = scheme(), items = dayItems();
  const exs = items.map(e => [keyOf(e[0]), { name: e[0], sets: sessionSets(keyOf(e[0])) }]).filter(([, e]) => e.sets.length);
  const sessCardio = (((log[today()] || {}).cardio) || []).filter(c => !endedAt || c.t > endedAt);
  if (!exs.length && !sessCardio.length){ toast("Nog niets opgeslagen in deze training."); return; }
  const undoSnap = takeSnapshot();
  stopRest();
  try { if (wakeLock) wakeLock.release(); } catch {}
  wakeLock = null; training = false; sessionOn = false;
  const all = exs.flatMap(([, e]) => e.sets);
  const times = all.map(x => new Date(x.t).getTime());
  const cardioMin = sessCardio.reduce((a, c) => a + (c.min || 0), 0);
  const mins = Math.round(Math.max(times.length > 1 ? (Math.max(...times) - Math.min(...times)) / 60000 : 0, cardioMin));
  const volume = all.reduce((a, x) => a + (x.w || 0) * (x.r || 0), 0);
  const val = x => x.w > 0 ? x.w : (x.r || 0);
  const firstT = all.map(x => x.t).sort()[0];
  const prs = exs.filter(([k, e]) => {
    const prev = Object.keys(log).sort().flatMap(d => ((log[d].ex[k] || { sets: [] }).sets)).filter(x => x.t < firstT);
    return prev.length && Math.max(...e.sets.map(val)) > Math.max(...prev.map(val));
  }).map(([, e]) => e.name);
  const skipped = items.filter(e => isSkipped(keyOf(e[0]))).map(e => e[0]);
  const doneNames = exs.map(([, e]) => e.name).concat(sessCardio.map(c => c.type));
  const open = items.map(e => e[0]).filter(n => !doneNames.includes(n) && !skipped.includes(n));
  const dayName = s.days[view.day].name, doneIdx = view.day;
  const shareSum = daySummary(today(), { since: endedAt, title: dayName, scheme: s.name, prs });

  // Back to the start: this workout is closed, marks cleared, next day of the scheme selected.
  endedAt = new Date().toISOString(); lsSet(LS_ENDED, endedAt);
  skips = Object.fromEntries(Object.entries(skips).filter(([sk]) => !sk.startsWith(today() + "|"))); lsSet(LS_SKIPS, skips);
  expanded.clear(); editing = false;
  const nx = nextDayIndex(s); if (nx) view.day = nx.idx;
  const home = comboHome(), addon = !home && afterOf(s, doneIdx);
  let combo = "";
  if (addon){
    const ax = nextDayIndex(addon);
    combo = s.days.length > 1 ? `Nu nog ${addon.name} als aanvulling. Daarna ga je verder met ${s.days[view.day].name}.` : `Nu nog ${addon.name} als aanvulling.`;
    view = { scheme: addon.id, day: ax ? ax.idx : 0, home: s.id };
  } else if (home){
    view = { scheme: home.id, day: nextHomeDay(home) };
    combo = `Terug naar ${home.name.replace(/^Programma: /, "")}: volgende is ${home.days[view.day].name}.`;
  }
  lsSet(LS_VIEW, view);
  render();

  const p = $("finishPanel");
  p.innerHTML = `
    <h2>Training klaar</h2>
    <p class="note">${esc(longDate(today()))} · ${esc(s.name)} · ${esc(dayName)}</p>
    <div class="tiles">
      <div class="tile"><small>Oefeningen</small><strong>${new Set(doneNames).size}</strong><em>van ${items.length}</em></div>
      <div class="tile"><small>${all.length ? "Sets" : "Cardio"}</small><strong>${all.length || cardioMin}</strong><em>${all.length ? "opgeslagen" : "minuten"}</em></div>
      <div class="tile"><small>Duur</small><strong>${mins >= 1 ? mins : "—"}</strong><em>${mins >= 1 ? "min, eerste tot laatste set" : "één set"}</em></div>
    </div>
    ${volume ? `<p class="fin-line">Totaal getild: <b>${fw(Math.round(volume))}</b> <span>(gewicht × reps, alle sets samen)</span></p>` : ""}
    ${prs.length ? `<p class="fin-line pr">▲ Nieuw record: <b>${esc(prs.join(", "))}</b></p>` : ""}
    ${skipped.length ? `<p class="fin-line">Overgeslagen: ${esc(skipped.join(", "))}</p>` : ""}
    ${open.length ? `<p class="fin-line">Niet gedaan: ${esc(open.join(", "))}</p>` : ""}
    ${combo ? `<p class="fin-line">Alles staat in je logboek.</p><p class="fin-line combo-line">${esc(combo)}</p>` : `<p class="fin-line">Alles staat in je logboek. De app staat klaar voor je volgende training${s.days.length > 1 ? `: <b>${esc(s.days[view.day].name)}</b>` : ""}.</p>`}
    ${shareButtons()}
    <div class="entry-row">
      <button class="ghost wide" type="button" id="finishClose">Sluiten</button>
      <button class="save" type="button" id="finishStats">Bekijk Analytics</button>
    </div>`;
  p.hidden = false;
  wireShare(p, shareSum);
  undoToast("Training afgesloten", undoSnap);
  autoSync(shareSum);
  $("finishClose").onclick = () => { p.hidden = true; window.scrollTo(0, 0); };
  $("finishStats").onclick = () => { p.hidden = true; showPage("stats"); window.scrollTo(0, 0); };
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}

// ---------- Suggestions: double progression ----------
// Stay on a weight until every planned set reaches the top of the rep range, then go up one step
// and start again at the bottom of the range. Your trend over the weeks is shown alongside.
const repRange = reps => { const n = (String(reps).match(/\d+/g) || []).map(Number); return n.length ? [Math.min(...n), Math.max(...n)] : [8, 12]; };
const stepFor = w => isLb() ? (w >= 20 || w === 0 ? 5 : 2.5) / 2.20462 : (w >= 20 || w === 0 ? 2.5 : 1);

// Careful starting weights (total kg; dumbbell exercises = one dumbbell; 0 = bodyweight only).
// Only used until you log the exercise for the first time.
const START_KG = {
  "Bench Press":40, "Close-Grip Bench Press":30, "Incline Dumbbell Press":14, "Chest Dip":0, "Dips":0,
  "Low-to-High Cable Fly":10, "High-to-Low Cable Fly":10, "Overhead Press":30, "Seated Dumbbell Shoulder Press":12,
  "Lateral Raise":6, "Dumbbell Lateral Raise":6, "Cable Lateral Raise":5, "Triceps Pushdown":20, "Rope Triceps Pushdown":17.5,
  "Overhead Triceps Extension":15, "Cable Overhead Triceps Extension":15, "One-Arm Dumbbell Overhead Extension":8, "Skull Crusher":20,
  "Pull-up (added weight)":0, "Lat Pulldown":40, "Close-Grip Lat Pulldown":40, "Straight-Arm Pulldown":20, "Dumbbell Pullover":14,
  "Barbell Row":40, "Seated Cable Row":40, "Single-Arm Cable Row":17.5, "Face Pull":15, "Machine Reverse Fly":25,
  "Upright Row":25, "Cable Upright Row":20, "Barbell Curl":20, "Preacher Curl":15, "Incline Dumbbell Curl":8, "Cable Curl":15,
  "Hammer Curl":10, "Rope Hammer Curl":15, "Deadlift":60, "Romanian Deadlift":40, "Back Squat":40, "Front Squat":30,
  "Leg Press":80, "Leg Curl":30, "Walking Lunge":10, "Standing Calf Raise":40
};
let startKgByKey = null;
const startKg = () => startKgByKey || (startKgByKey = Object.fromEntries(Object.entries(START_KG).map(([n, w]) => [keyOf(n), w])));

// ---------- Exercise library (extra exercises you can add) ----------
// [name, type, mode, startKg, sets, reps, rest, Dutch name, how-to, strongly worked, less strongly worked]
const LIB = [
  ["Machine Chest Press","push","",30,"3","8–12","90 s","Borstpers aan de machine","Rug tegen het kussen, handgrepen op borsthoogte en naar voor duwen tot je armen bijna gestrekt zijn.",["Borst","Triceps"],["Voorkant schouders"]],
  ["Pec Deck Fly","push","",30,"3","12–15","60 s","Vlinder (pec deck)","Zittend de armen in een boog voor je borst samenbrengen en gecontroleerd terug openen.",["Borst"],["Voorkant schouders"]],
  ["Dumbbell Bench Press","push","",16,"3","8–12","2 min","Bankdrukken met dumbbells","Op een vlakke bank twee dumbbells vanaf je borst omhoog duwen; meer bewegingsvrijheid dan met een halter.",["Borst","Triceps"],["Voorkant schouders"]],
  ["Incline Barbell Bench Press","push","",30,"3","6–10","2 min","Schuin bankdrukken met halter","Bank op 30–45°, halter naar je bovenborst laten zakken en weer omhoog duwen.",["Bovenkant borst","Voorkant schouders"],["Triceps"]],
  ["Decline Bench Press","push","",35,"3","8–10","2 min","Bankdrukken op een dalende bank","Hoofd lager dan je heupen, halter naar je onderborst laten zakken en omhoog duwen.",["Onderkant borst","Triceps"],["Voorkant schouders"]],
  ["Dumbbell Fly","push","",8,"3","10–15","60 s","Vlinders met dumbbells","Op een bank met licht gebogen armen de dumbbells in een boog openen tot je borst rekt, en terug samenbrengen.",["Borst"],["Voorkant schouders"]],
  ["Smith Machine Incline Press","push","",20,"3","8–12","90 s","Schuin drukken in de Smith-machine","Schuine bank in de Smith-machine, stang naar je bovenborst en weer omhoog. Noteer het gewicht zonder de stang.",["Bovenkant borst","Voorkant schouders"],["Triceps"]],
  ["Arnold Press","push","",10,"3","8–12","90 s","Arnold press","Zittend, dumbbells met handpalmen naar je toe; draai ze naar buiten terwijl je ze boven je hoofd duwt.",["Voorkant schouders","Zijkant schouders"],["Triceps"]],
  ["Machine Shoulder Press","push","",25,"3","8–12","90 s","Schouderdrukken aan de machine","Zittend de handgrepen vanaf schouderhoogte omhoog duwen.",["Voorkant schouders","Triceps"],["Zijkant schouders"]],
  ["Landmine Press","push","",10,"3","8–12","90 s","Landmine press","Eén uiteinde van een halter in een hoek; het andere uiteinde vanaf je schouder schuin omhoog duwen. Noteer de schijven.",["Voorkant schouders","Bovenkant borst"],["Triceps","Buikspieren"]],
  ["Front Raise","push","",6,"3","10–15","60 s","Voorwaarts heffen","Dumbbells met gestrekte armen voor je optillen tot schouderhoogte.",["Voorkant schouders"],["Bovenkant borst"]],
  ["Cable Triceps Kickback","push","",5,"3","12–15","45 s","Triceps kickback aan de kabel","Voorovergebogen, bovenarm langs je lichaam, onderarm naar achter strekken.",["Triceps"],["Achterkant schouders"]],
  ["Bench Dip","push","bw",0,"3","10–15","60 s","Dips op een bank","Handen achter je op een bank, laat je zakken door je ellebogen te buigen en duw weer omhoog.",["Triceps"],["Voorkant schouders","Borst"]],
  ["Close-Grip Push-up","push","bw",0,"3","8–15","60 s","Opdrukken met smalle handen","Handen onder je borst, ellebogen langs je lichaam; extra werk voor je triceps.",["Triceps","Borst"],["Voorkant schouders","Buikspieren"]],
  ["Pike Push-up","push","bw",0,"3","6–12","60 s","Pike push-up (schouderpompen)","Billen hoog in een omgekeerde V, hoofd naar de grond zakken tussen je handen en terug duwen.",["Voorkant schouders","Triceps"],["Bovenkant borst"]],
  ["Chin-up","pull","bw",0,"3","5–10","2 min","Optrekken met onderhandse greep","Handpalmen naar je toe op schouderbreedte, jezelf optrekken tot je kin boven de stang.",["Lats","Biceps"],["Bovenrug","Onderarmen"]],
  ["Assisted Pull-up","pull","",30,"3","8–12","90 s","Optrekken met hulp (machine)","Knieën op het platform dat je helpt; hoe hoger het gewicht, hoe makkelijker. Doel: minder hulp.",["Lats","Biceps"],["Bovenrug","Achterkant schouders"]],
  ["T-Bar Row","pull","",20,"3","8–10","2 min","T-bar roeien","Voorovergebogen met rechte rug de T-bar naar je borst trekken. Noteer de schijven.",["Bovenrug","Lats"],["Biceps","Achterkant schouders","Onderrug"]],
  ["Chest-Supported Dumbbell Row","pull","",14,"3","8–12","90 s","Roeien met dumbbells op een schuine bank","Met je borst op een schuine bank de dumbbells naar je heupen trekken; ontziet je onderrug.",["Bovenrug","Lats"],["Achterkant schouders","Biceps"]],
  ["Single-Arm Dumbbell Row","pull","",16,"3","8–12","60 s","Eenarmig roeien met dumbbell","Knie en hand op een bank, met de andere hand de dumbbell naar je heup trekken.",["Lats","Bovenrug"],["Biceps","Achterkant schouders"]],
  ["Machine Row","pull","",35,"3","10–12","90 s","Roeien aan de machine","Borst tegen het kussen, handgrepen naar je toe trekken en schouderbladen samenknijpen.",["Bovenrug","Lats"],["Biceps","Achterkant schouders"]],
  ["Inverted Row","pull","bw",0,"3","8–12","60 s","Omgekeerd roeien","Onder een lage stang hangen met je lichaam recht en je borst naar de stang trekken.",["Bovenrug","Lats"],["Biceps","Buikspieren"]],
  ["Rack Pull","pull","",60,"3","5–8","2–3 min","Rack pull (deadlift vanaf kniehoogte)","Zoals een deadlift, maar de halter start op de steunen net onder je knieën.",["Onderrug","Trapezius","Billen"],["Hamstrings","Lats","Onderarmen"]],
  ["Dumbbell Shrug","pull","",20,"3","10–15","60 s","Schouders ophalen met dumbbells","Dumbbells langs je lichaam, schouders recht omhoog naar je oren trekken en even vasthouden.",["Trapezius"],["Onderarmen"]],
  ["Reverse Cable Fly","pull","",5,"3","12–15","60 s","Reverse fly aan de kabel","Kabels gekruist op schouderhoogte, armen in een boog naar buiten openen.",["Achterkant schouders"],["Bovenrug"]],
  ["Bent-Over Dumbbell Reverse Fly","pull","",6,"3","12–15","60 s","Voorovergebogen reverse fly","Voorovergebogen met rechte rug de dumbbells zijwaarts optillen.",["Achterkant schouders"],["Bovenrug","Trapezius"]],
  ["EZ-Bar Curl","pull","",15,"3","8–12","60 s","Biceps curl met EZ-stang","Met de gebogen stang omhoog krullen; prettiger voor je polsen dan een rechte stang.",["Biceps"],["Onderarmen","Brachialis"]],
  ["Concentration Curl","pull","",8,"3","10–12","60 s","Concentratiecurl","Zittend, elleboog tegen de binnenkant van je dij, één dumbbell omhoog krullen.",["Biceps"],["Brachialis"]],
  ["Spider Curl","pull","",6,"3","10–12","60 s","Spider curl","Met je borst op een schuine bank, armen hangen naar beneden, dumbbells omhoog krullen.",["Biceps (vooral korte kop)"],["Brachialis"]],
  ["Bayesian Cable Curl","pull","",5,"3","10–12","60 s","Bayesian curl aan de kabel","Met je rug naar de lage kabel, arm iets achter je lichaam, omhoog krullen. Grote rek op je biceps.",["Biceps (vooral lange kop)"],["Brachialis"]],
  ["Reverse Curl","pull","",15,"3","10–12","60 s","Curl met bovenhandse greep","Handpalmen naar beneden de stang omhoog krullen.",["Onderarmen (brachioradialis)","Brachialis"],["Biceps"]],
  ["Wrist Curl","pull","",10,"3","12–20","45 s","Polscurl","Onderarmen op je dijen, alleen je polsen omhoog buigen.",["Onderarmen"],[]],
  ["Goblet Squat","legs","",16,"3","8–12","90 s","Goblet squat","Eén dumbbell tegen je borst, diep door je knieën zakken met rechte rug.",["Quadriceps","Billen"],["Adductoren","Buikspieren","Bovenrug"]],
  ["Hack Squat","legs","",40,"3","8–12","2 min","Hack squat (machine)","Schouders onder de kussens, diep zakken en weer omhoog duwen. Noteer de schijven.",["Quadriceps"],["Billen","Adductoren"]],
  ["Bulgarian Split Squat","legs","",8,"3","8–10 / been","90 s","Bulgaarse split squat","Achterste voet op een bank, met het voorste been diep zakken. Gewicht = één dumbbell per hand.",["Quadriceps","Billen"],["Adductoren","Hamstrings","Buikspieren (evenwicht)"]],
  ["Leg Extension","legs","",30,"3","12–15","60 s","Beenstrekken (leg extension)","Zittend je onderbenen strekken tegen het kussen.",["Quadriceps"],[]],
  ["Lying Leg Curl","legs","",25,"3","10–12","60 s","Liggende beencurl","Op je buik liggend je hielen naar je billen trekken.",["Hamstrings"],["Kuiten"]],
  ["Hip Thrust","legs","",40,"3","8–12","90 s","Hip thrust","Bovenrug tegen een bank, halter op je heupen, heupen omhoog duwen tot je lichaam recht is.",["Billen"],["Hamstrings","Quadriceps"]],
  ["Glute Bridge","legs","bw",0,"3","12–20","45 s","Bilbrug","Op je rug, voeten plat, heupen omhoog duwen en je billen aanspannen.",["Billen"],["Hamstrings","Onderrug"]],
  ["Cable Pull-Through","legs","",20,"3","12–15","60 s","Cable pull-through","Met je rug naar de lage kabel, touw tussen je benen; heupen naar achter en weer naar voor duwen.",["Billen","Hamstrings"],["Onderrug"]],
  ["Sumo Deadlift","legs","",60,"3","5–8","2–3 min","Sumo deadlift","Brede stand, handen binnen je knieën, halter met rechte rug van de grond tillen.",["Billen","Quadriceps","Adductoren"],["Hamstrings","Onderrug","Trapezius"]],
  ["Step-up","legs","",8,"3","10 / been","60 s","Step-up","Met één voet op een bank of kist stappen en jezelf omhoog duwen. Gewicht = per hand.",["Quadriceps","Billen"],["Hamstrings","Kuiten"]],
  ["Seated Calf Raise","legs","",20,"4","12–15","45 s","Kuitheffen (zittend)","Zittend met de knieën onder het kussen op je tenen omhoog komen. Traint vooral de diepe kuitspier.",["Kuiten"],[]],
  ["Hip Adduction Machine","legs","",30,"3","12–15","45 s","Adductoren-machine","Zittend je benen tegen de kussens naar binnen duwen.",["Adductoren"],[]],
  ["Hip Abduction Machine","legs","",30,"3","12–15","45 s","Abductoren-machine","Zittend je benen tegen de kussens naar buiten duwen.",["Billen (zijkant heup)"],[]],
  ["Nordic Hamstring Curl","legs","bw",0,"3","4–8","90 s","Nordic hamstring curl","Geknield met je hielen vast, langzaam naar voor zakken met een recht lichaam.",["Hamstrings"],["Billen","Kuiten"]],
  ["Bodyweight Squat","legs","bw",0,"3","15–25","45 s","Squat zonder gewicht","Voeten op schouderbreedte, diep door je knieën zakken met rechte rug en weer omhoog.",["Quadriceps","Billen"],["Adductoren","Hamstrings"]],
  ["Bodyweight Lunge","legs","bw",0,"3","10–15 / been","45 s","Uitvalspas zonder gewicht","Grote stap vooruit, achterste knie bijna tot de grond en weer terug.",["Quadriceps","Billen"],["Hamstrings","Kuiten"]],
  ["Wall Sit","legs","time",0,"3","30–60","45 s","Muurzit","Met je rug tegen de muur zitten alsof er een stoel staat, knieën op 90°.",["Quadriceps"],["Billen","Adductoren"]],
  ["Hanging Leg Raise","core","bw",0,"3","8–15","60 s","Benen heffen in hang","Aan een stang hangen en je benen gestrekt of gebogen optillen zonder te zwaaien.",["Buikspieren"],["Heupbuigers","Onderarmen (grip)"]],
  ["Cable Crunch","core","",25,"3","12–15","45 s","Crunch aan de kabel","Geknield met het touw bij je hoofd, je romp naar beneden oprollen.",["Buikspieren"],["Schuine buikspieren"]],
  ["Crunch","core","bw",0,"3","15–25","45 s","Crunch","Op je rug, knieën gebogen, schouders van de grond oprollen.",["Buikspieren"],[]],
  ["Russian Twist","core","bw",0,"3","20–30","45 s","Russian twist","Zittend met je voeten van de grond, romp van links naar rechts draaien.",["Schuine buikspieren"],["Buikspieren","Heupbuigers"]],
  ["Dead Bug","core","bw",0,"3","10–16","45 s","Dead bug","Op je rug, armen en benen omhoog; tegengestelde arm en been langzaam laten zakken met je onderrug tegen de grond.",["Buikspieren (rechte en diepe buikspier)"],["Heupbuigers"]],
  ["Mountain Climber","core","time",0,"3","30–45","30 s","Mountain climber","In opdrukhouding snel je knieën om de beurt naar je borst trekken.",["Buikspieren"],["Schouders","Heupbuigers","Quadriceps"]],
  ["Pallof Press","core","",10,"3","10–12 / kant","45 s","Pallof press","Zijwaarts naast de kabel, handgreep voor je borst uitduwen zonder dat je romp meedraait.",["Schuine buikspieren","Buikspieren"],["Billen (stabiliseren)"]],
  ["Hollow Hold","core","time",0,"3","20–40","45 s","Hollow hold","Op je rug, armen en benen gestrekt een beetje van de grond, onderrug tegen de grond houden.",["Buikspieren"],["Heupbuigers"]],
  ["Bird Dog","core","bw",0,"3","10–16","30 s","Bird dog","Op handen en knieën tegengestelde arm en been strekken en even vasthouden.",["Onderrug","Buikspieren (diepe buikspier)"],["Billen","Schouders"]],
  ["Back Extension","core","",0,"3","12–15","60 s","Rugstrekken (hyperextension)","In de rugstrekbank je romp laten zakken en weer omhoog tot je lichaam recht is.",["Onderrug","Billen"],["Hamstrings"]],
  ["Farmer's Walk","core","time",0,"3","30–45","60 s","Farmer's walk","Zware dumbbells in elke hand en rechtop wandelen. Noteer de seconden.",["Onderarmen (grip)","Trapezius"],["Buikspieren","Billen","Kuiten"]],
  ["Burpee","core","bw",0,"3","8–15","60 s","Burpee","Hurken, voeten naar achter springen, opdrukken, terugspringen en omhoog springen.",["Quadriceps","Borst"],["Schouders","Buikspieren","Kuiten"]],
  ["Superman","core","time",0,"3","20–30","30 s","Superman","Op je buik liggend armen en benen tegelijk optillen en vasthouden.",["Onderrug"],["Billen","Achterkant schouders"]],
  ["Plank Jack","core","time",0,"3","30–45","30 s","Plank jacks","In plankhouding je voeten open en dicht springen zoals bij een jumping jack, zonder dat je heupen zakken.",["Buikspieren","Schouders"],["Billen (zijkant heup)","Borst"]],
  ["Plank Up-Down","core","bw",0,"3","10–16","45 s","Plank op- en neerwaarts","Vanuit een plank om de beurt op je handen duwen en weer terug op je onderarmen zakken, heupen zo stil mogelijk.",["Buikspieren","Triceps"],["Schouders","Borst"]],
  ["Reverse Plank","core","time",0,"3","20–40","30 s","Omgekeerde plank","Zittend met je handen achter je, duw je heupen omhoog tot je lichaam een rechte lijn vormt en houd vast.",["Onderrug","Billen"],["Hamstrings","Achterkant schouders","Triceps"]],
  ["Scissor Kicks","core","time",0,"3","20–40","30 s","Schaarbeweging","Op je rug, benen gestrekt net boven de grond, kruis ze om de beurt over elkaar. Onderrug blijft tegen de grond.",["Buikspieren"],["Heupbuigers","Adductoren"]],
  ["Heel Touch","core","bw",0,"3","20–30","30 s","Hielen aantikken","Op je rug met gebogen knieën, kantel je romp zijwaarts en tik met je hand je hiel aan, links en rechts.",["Schuine buikspieren"],["Buikspieren"]],
  ["Toe Touch Crunch","core","bw",0,"3","12–20","30 s","Teen-aantik crunch","Op je rug met benen recht omhoog, reik met je handen naar je tenen en rol je schouders van de grond.",["Buikspieren"],["Hamstrings"]],
  ["Hollow Rock","core","bw",0,"3","10–20","45 s","Hollow rock","Houd de hollow-houding aan en wieg zacht heen en weer als een schommelstoel, zonder de spanning te verliezen.",["Buikspieren"],["Heupbuigers","Quadriceps"]],
  ["Windshield Wipers","core","bw",0,"3","8–14","45 s","Ruitenwissers","Op je rug, armen opzij, benen recht omhoog; laat je benen gecontroleerd naar links en rechts zakken. Doe het gebogen als het te zwaar is.",["Schuine buikspieren","Buikspieren"],["Heupbuigers","Onderrug"]],
  ["Hip Dip Plank","core","bw",0,"3","16–24","45 s","Plank met heupdraai","In onderarmplank draai je je heupen om de beurt naar links en rechts tot vlak boven de grond.",["Schuine buikspieren"],["Buikspieren","Onderrug"]],
  ["Leg Drop","core","bw",0,"3","8–12","45 s","Beenzakkers","Op je rug, benen recht omhoog; laat ze langzaam zakken tot net boven de grond en breng ze weer omhoog.",["Buikspieren"],["Heupbuigers"]],
  ["Bear Plank Hold","core","time",0,"3","20–40","30 s","Berenplank","Op handen en tenen met je knieën net boven de grond, rug vlak; houd vast en adem rustig door.",["Buikspieren","Quadriceps"],["Schouders","Heupbuigers"]],
  ["Cross-Body Mountain Climber","core","bw",0,"3","16–24","30 s","Mountain climber kruislings","In opdrukhouding trek je je knie schuin naar je tegenovergestelde elleboog, links en rechts.",["Schuine buikspieren","Buikspieren"],["Schouders","Heupbuigers"]],
  ["Inchworm","core","bw",0,"3","6–10","45 s","Inchworm","Sta rechtop, buig voorover, loop met je handen naar een plank en loop weer terug. Benen zo gestrekt mogelijk.",["Hamstrings","Buikspieren"],["Schouders","Kuiten"]],
  ["Superman Pulse","core","time",0,"3","20–30","30 s","Superman met pulsen","Op je buik, armen en benen van de grond; maak korte, kleine bewegingen omhoog.",["Onderrug"],["Billen","Achterkant schouders"]],
  ["Jump Squat","legs","bw",0,"3","8–15","60 s","Squatsprong","Zak in een squat en spring explosief omhoog; land zacht en meteen weer door je knieën.",["Quadriceps","Billen"],["Kuiten","Hamstrings"]],
  ["Reverse Lunge","legs","bw",0,"3","10–12 / been","45 s","Achterwaartse uitvalspas","Stap met één been naar achter en zak tot beide knieën op 90°; duw jezelf terug omhoog. Vriendelijker voor je knieën dan voorwaarts.",["Quadriceps","Billen"],["Hamstrings","Kuiten"]],
  ["Side Lunge","legs","bw",0,"3","8–12 / kant","45 s","Zijwaartse uitvalspas","Stap breed opzij, zak door dat been met het andere been gestrekt en duw jezelf terug naar het midden.",["Billen","Adductoren"],["Quadriceps","Hamstrings"]],
  ["Cossack Squat","legs","bw",0,"3","6–10 / kant","60 s","Kozakkensquat","In brede stand zak je diep door één been terwijl het andere been gestrekt blijft met de teen omhoog; wissel van kant.",["Adductoren","Billen","Quadriceps"],["Hamstrings"]],
  ["Squat Pulse","legs","time",0,"3","30–45","45 s","Squat met pulsen","Blijf in het onderste deel van een squat en veer korte stukjes op en neer. Houd je borst hoog.",["Quadriceps","Billen"],["Adductoren"]],
  ["Single-Leg Glute Bridge","legs","bw",0,"3","8–12 / been","45 s","Bilbrug op één been","Op je rug, één been gestrekt in de lucht, duw je heupen omhoog met het andere been en span je bil aan.",["Billen"],["Hamstrings","Onderrug"]],
  ["Single-Leg Romanian Deadlift","legs","bw",0,"3","8–10 / been","60 s","Eenbenige Roemeense deadlift","Sta op één been, buig vanuit je heup naar voor terwijl het andere been naar achter gaat; rug recht, daarna weer omhoog.",["Hamstrings","Billen"],["Onderrug","Buikspieren (evenwicht)"]],
  ["Calf Raise","legs","bw",0,"3","15–25","30 s","Kuitheffen","Sta op je tenen, kom zo hoog mogelijk omhoog en zak langzaam terug. Doe het op een traptrede voor meer bereik.",["Kuiten"],[]],
  ["Skater Jump","legs","bw",0,"3","12–20","45 s","Schaatssprong","Spring zijwaarts van je ene been naar het andere en land zacht met een lichte buiging, zoals een schaatser.",["Billen (zijkant heup)","Quadriceps"],["Kuiten","Adductoren"]],
  ["Star Jump","legs","time",0,"3","20–30","30 s","Sterspringen","Hurk en spring explosief omhoog met armen en benen wijd als een ster; land zacht.",["Quadriceps","Billen"],["Schouders","Kuiten"]],
  ["Diamond Push-up","push","bw",0,"3","6–12","60 s","Diamant-opdrukken","Handen vlak onder je borst met duimen en wijsvingers tegen elkaar; zak langzaam en duw weer omhoog. Extra triceps.",["Triceps","Borst"],["Voorkant schouders"]],
  ["Wide Push-up","push","bw",0,"3","8–15","60 s","Brede opdrukken","Handen breder dan je schouders; zak met je borst tussen je handen en duw omhoog.",["Borst"],["Voorkant schouders","Triceps"]],
  ["Hindu Push-up","push","bw",0,"3","6–10","60 s","Hindu push-up","Begin in een omgekeerde V, zwaai je borst vlak langs de grond naar voor en strek je armen; zwaai terug.",["Voorkant schouders","Borst"],["Triceps","Buikspieren"]],
  ["Knee Push-up","push","bw",0,"3","10–20","45 s","Opdrukken op je knieën","Knieën op de grond, rug en heupen in een rechte lijn; zak met je borst naar de grond en duw omhoog. Voor beginners of als opwarmer.",["Borst","Triceps"],["Voorkant schouders"]],
  ["Prone Y Raise","pull","bw",0,"3","10–15","30 s","Y-heffen op je buik","Op je buik, armen schuin voor je in een Y; til ze zonder je nek te belasten en knijp je schouderbladen samen.",["Bovenrug","Achterkant schouders"],["Trapezius"]]
];
LIB.forEach(([n, , , kg, , , , nl, desc, strong, less]) => {
  if (!NL[n]) NL[n] = [nl, desc];
  if (!MUSCLES[n]) MUSCLES[n] = [strong, less];
  if (START_KG[n] == null && kg != null) START_KG[n] = kg;
});

// Bar weight for the plate calculator (kg). Exercises not listed use dumbbells, cables or machines.
const BAR = { "Bench Press":20, "Close-Grip Bench Press":20, "Incline Barbell Bench Press":20, "Decline Bench Press":20, "Overhead Press":20,
  "Barbell Row":20, "Deadlift":20, "Romanian Deadlift":20, "Sumo Deadlift":20, "Rack Pull":20, "Back Squat":20, "Front Squat":20,
  "Hip Thrust":20, "Barbell Curl":20, "Skull Crusher":10, "Preacher Curl":10, "EZ-Bar Curl":10, "Upright Row":10, "Reverse Curl":10 };
function platesText(name, kgW){
  if (!BAR[name] || !(kgW > 0)) return "";
  if (isLb()){
    const barLb = BAR[name] === 20 ? 45 : 25, w = toU(kgW);
    if (w < barLb) return `Lichter dan de stang (${barLb} lb).`;
    let side = (w - barLb) / 2; const out = [];
    for (const pl of [45, 35, 25, 10, 5, 2.5]) while (side >= pl - 1e-9){ out.push(pl); side -= pl; }
    return `Per kant: ${out.length ? out.map(fmt).join(" + ") : "geen schijven"} · stang ${barLb} lb${side > 0.01 ? ` (+${fmt(Math.round(side * 100) / 100)} lb past niet exact)` : ""}`;
  }
  const bar = BAR[name], w = kgW;
  if (w < bar) return `Lichter dan de stang (${bar} kg).`;
  let side = (w - bar) / 2; const out = [];
  for (const p of [25, 20, 15, 10, 5, 2.5, 1.25]) while (side >= p - 1e-9){ out.push(p); side -= p; }
  const txt = out.length ? out.map(fmt).join(" + ") : "geen schijven";
  return `Per kant: ${txt} · stang ${bar} kg${side > 0.01 ? ` (+${fmt(Math.round(side * 100) / 100)} kg past niet exact)` : ""}`;
}

// ---------- Deload: a lighter week every 6–8 weeks or when progress stalls ----------
const weekOf = date => { const d = new Date(date + "T12:00"); d.setDate(d.getDate() - (d.getDay() + 6) % 7); return d.toISOString().slice(0, 10); };
const addDays = (date, n) => { const d = new Date(date + "T12:00"); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
const deloadActive = () => !!prefs.deloadStart && prefs.deloadStart <= today() && today() < addDays(prefs.deloadStart, 7);
function deloadReason(){
  if (deloadActive() || (prefs.deloadSnooze && prefs.deloadSnooze > today())) return "";
  const since = prefs.deloadStart ? addDays(prefs.deloadStart, 7) : "";
  const weeks = new Set(Object.keys(log).filter(d => d >= since).map(weekOf));
  if (weeks.size >= 6) return `Je traint al ${weeks.size} weken zonder lichtere week.`;
  let stalled = 0;
  const byKey = {};
  Object.keys(log).filter(d => d >= since).sort().forEach(d => Object.entries(log[d].ex).forEach(([k, e]) => {
    if (e.sets.some(x => x.w > 0)) (byKey[k] = byKey[k] || []).push(Math.max(...e.sets.map(e1rm)));
  }));
  Object.values(byKey).forEach(v => { if (v.length >= 3 && v[v.length - 1] <= v[v.length - 3]) stalled++; });
  if (stalled >= 3) return `${stalled} oefeningen gaan al 3 trainingen niet vooruit.`;
  return "";
}
const plannedOf = sets => { const n = parseInt(sets, 10) || 3; return deloadActive() || lightWeek() ? Math.max(2, n - 1) : n; };
function renderDeload(){
  const bar = $("deloadBar"), reason = deloadReason();
  if (deloadActive()){
    bar.hidden = false; bar.className = "deload on";
    $("deloadText").innerHTML = `<b>Deloadweek</b> tot ${esc(shortDate(addDays(prefs.deloadStart, 6)))}: ±60% gewicht en 1 set minder per oefening. Daarna bouw je weer op.`;
    $("deloadGo").textContent = "Stoppen"; $("deloadLater").hidden = true;
    $("deloadGo").onclick = () => { prefs.deloadStart = addDays(today(), -7); savePrefs(); render(); toast("Deloadweek gestopt"); };
  } else if (reason){
    bar.hidden = false; bar.className = "deload";
    $("deloadText").innerHTML = `<b>Tijd voor een deloadweek?</b> ${esc(reason)} Een week lichter trainen helpt je herstellen en daarna sterker verder te gaan.`;
    $("deloadGo").textContent = "Start deloadweek"; $("deloadLater").hidden = false;
    $("deloadGo").onclick = () => { prefs.deloadStart = today(); savePrefs(); render(); toast("Deloadweek gestart: 7 dagen lichter"); };
    $("deloadLater").onclick = () => { prefs.deloadSnooze = addDays(today(), 7); savePrefs(); render(); };
  } else bar.hidden = true;
}

const e1rm = s => s.w * (1 + (s.r || 0) / 30);   // Epley estimate, to compare sessions with different reps

// During a deload week every suggestion is about 60% of the weight (or 70% of the reps/seconds).
function suggest(k, sets, reps, mode, main){
  if (repeatOn()){
    const prev = prevSessionSets(k), n = sessionSets(k).length;
    if (prev.length){
      const pj = prev[Math.min(n, prev.length - 1)];
      return { w: mode ? null : pj.w, r: pj.r || repRange(reps)[0], why: `Herhaling van vorige keer: set ${Math.min(n, prev.length - 1) + 1} was ${setText(pj)}.` };
    }
  }
  const o = suggestBase(k, sets, reps, mode);
  const pw = programWeek();
  if (pw && !deloadActive() && !sessionSets(k).length && (pw.factor || pw.reps) && (!pw.mainOnly || main)){
    if (!mode && o.w > 0 && pw.factor) o.w = Math.max(0, Math.round(o.w * pw.factor / stepFor(o.w)) * stepFor(o.w));
    if (mode && o.r && pw.light) o.r = Math.max(1, Math.round(o.r * 0.7));
    if (!mode && pw.reps) o.r = repRange(pw.reps)[1];
    o.why = `Programma week ${pw.week} (${pw.name}). ` + o.why;
    if (pw.light) o.up = false;
  }
  if (!deloadActive() || sessionSets(k).length) return o;
  if (!mode && o.w > 0) o.w = Math.max(0, Math.round(o.w * 0.6 / stepFor(o.w)) * stepFor(o.w));
  if (mode && o.r) o.r = Math.max(1, Math.round(o.r * 0.7));
  return Object.assign(o, { up: false, why: "Deloadweek: lichter en 1 set minder, zodat je lichaam herstelt. Gewoon netjes uitvoeren.", note: "" });
}
function suggestBase(k, sets, reps, mode){
  const [lo, hi] = repRange(reps), planned = plannedOf(sets);
  const todaySets = sessionSets(k);
  if (todaySets.length){
    const p = todaySets[todaySets.length - 1];
    // Last planned set (of 3 or more) and the previous ones went well: a heavier top set with fewer reps.
    if (!mode && !deloadActive() && planned >= 3 && todaySets.length === planned - 1 && p.w > 0 && (p.r || 0) >= lo){
      const w2 = p.w + stepFor(p.w), r2 = Math.max(3, Math.min(p.r, hi) - 2);
      return { w: w2, r: r2, up: true, why: `Laatste set: ${fw(stepFor(p.w))} zwaarder en ${r2} reps in plaats van ${p.r}. Zo prikkel je je spieren met een zwaardere set, na je gewone sets. Lukt het niet, ga dan terug naar ${fw(p.w)}.` };
    }
    return { w: p.w, r: p.r || lo, why: "Zelfde als je vorige set." };
  }
  // Past sessions, oldest first; a workout you already finished earlier today counts as the latest one.
  const hist = Object.keys(log).filter(d => d < today() && log[d].ex[k] && log[d].ex[k].sets.length).sort();
  const sessions = hist.map(d => log[d].ex[k].sets);
  const earlierToday = ((log[today()] || { ex: {} }).ex[k] || { sets: [] }).sets.filter(x => endedAt && x.t <= endedAt);
  if (earlierToday.length) sessions.push(earlierToday);
  if (mode){
    // No weight: progress by adding reps (or 5 seconds), and a harder variation once you are past the range.
    const unit = mode === "time" ? "sec" : "reps", step = mode === "time" ? 5 : 1;
    if (!sessions.length) return { w: null, r: lo, why: mode === "time" ? `Eerste keer: hou ${lo} sec vol met je lichaam in een rechte lijn.` : `Eerste keer: doe ${lo} nette reps, of zoveel als je goed kan.` };
    const rs = sessions[sessions.length - 1].map(s => s.r || 0), minR = Math.min(...rs);
    if (rs.length >= planned && minR >= hi)
      return { w: null, r: minR + step, up: true, why: `Vorige keer ${rs.length}×${minR} ${unit}: boven je doel. Doe ${step} meer, of maak het moeilijker (langzamer, voeten verhoogd of verder uitrollen).` };
    return { w: null, r: Math.max(lo, minR + step), why: `Vorige keer ${rs.join("-")} ${unit}. Probeer ${step} ${unit} meer per set.` };
  }
  if (!sessions.length){
    const rec = records[k];
    if (rec) return { w: rec.last, r: lo, why: "Begin op je vorige gewicht en mik op " + lo + " reps. Vul je reps in voor betere voorstellen." };
    const start0 = startKg()[k], youth = scheme().youth, start = start0 != null && youth ? Math.round(start0 * .5 / 2.5) * 2.5 : start0;
    if (start != null && youth) return { w: start, r: lo, why: `Licht starten: focus op een nette techniek. Haal je ${lo} reps met nog 3 over, ga dan pas iets zwaarder.` };
    if (start != null) return { w: start, r: lo, why: `Startgewicht${start === 0 ? " (alleen lichaamsgewicht)" : ""}. Haal je ${lo} nette reps met nog 2 over, ga dan bij de volgende set ${fw(stepFor(start))} zwaarder. Te zwaar? Ga lichter.` };
    return { w: null, r: lo, why: "Eerste keer: kies een gewicht waarmee je " + lo + " nette reps haalt en nog 1–2 reps over hebt." };
  }
  const last = sessions[sessions.length - 1];
  const W = Math.max(...last.map(s => s.w)), atW = last.filter(s => s.w === W), repsAtW = atW.map(s => s.r).filter(Boolean);
  const step = stepFor(W);
  let out;
  if (!repsAtW.length) out = { w: W, r: lo, why: `Vorige keer ${fw(W)}. Vul ook je reps in, dan kan de app zien wanneer je zwaarder mag.` };
  else {
    const minR = Math.min(...repsAtW), done = repsAtW.join("-");
    if (atW.length >= planned && minR >= hi)
      out = { w: W + step, r: lo, up: true, why: `Vorige keer ${atW.length}×${minR} op ${fw(W)}: alle sets gehaald, dus ${fw(step)} zwaarder.` };
    else if (minR < lo - 1)
      out = { w: Math.max(0, W - step), r: lo, why: `Vorige keer zwaar (${done} reps op ${fw(W)}). Iets lichter en ${lo} nette reps.` };
    else
      out = { w: W, r: Math.min(Math.max(minR + 1, lo), hi), why: `Vorige keer ${done} reps op ${fw(W)}. Zelfde gewicht, probeer 1 rep meer. Bij ${planned}×${hi} ga je zwaarder.` };
  }
  // Trend over the weeks: best estimated 1RM per session.
  const pts = hist.map(d => ({ d, v: Math.max(...log[d].ex[k].sets.map(e1rm)) }));
  if (pts.length >= 3){
    const lastThree = pts.slice(-3);
    if (lastThree[2].v <= lastThree[0].v)
      out.note = "Al 3 trainingen geen vooruitgang. Slaap en eten checken, of één training 10% lichter met meer reps en dan weer opbouwen.";
    else {
      const weeks = (new Date(pts[pts.length - 1].d) - new Date(pts[0].d)) / 6048e5;
      const rate = weeks >= 1 ? (pts[pts.length - 1].v - pts[0].v) / weeks : 0;
      if (rate > 0.05) out.note = `Je kracht stijgt met ongeveer ${fw(Math.round(rate * 10) / 10)} per week. Ga zo door.`;
    }
  }
  return out;
}


// Scroll to the next exercise that still needs doing.
function goToNext(afterKey){
  const cards = [...document.querySelectorAll("#exercises .ex")];
  const at = cards.findIndex(c => c.dataset.k === afterKey);
  const next = cards.slice(at + 1).concat(cards.slice(0, at)).find(c => !c.classList.contains("finished"));
  if (next) scrollToKey(next.dataset.k);
}

function restSeconds(rest){
  const n = parseFloat(String(rest).replace(",", "."));
  if (!n) return 90;
  return /min/i.test(rest) ? Math.round(n * 60) : Math.round(n);
}

let restEnd = 0, restTimer = null, audioCtx = null, restName = "";
let restEach = lsGet("ppl.restEach", false);
document.body.classList.toggle("rest-each", restEach);
// With the clock on, the exercise you are on gets a stopwatch that starts again at every new exercise;
// the rest between sets counts down in the same chip.
let watchName = "", watchAt = 0, sessionOn = false;   // sessionOn: you tapped "Training"
const mmss = s => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
function updateRestChips(){
  const act = document.querySelector("#exercises .ex:not(.finished) .rest-chip"), live = inWorkout() || sessionOn;
  if (!live || (act ? act.dataset.name : "") !== watchName){ watchName = live && act ? act.dataset.name : ""; watchAt = Date.now(); }
  document.querySelectorAll(".rest-chip").forEach(c => {
    const on = restName === c.dataset.name && !$("restBar").hidden, over = on && $("restBar").classList.contains("over");
    const watching = !on && live && c === act;
    c.textContent = on ? "⏱ " + mmss(Math.max(0, Math.ceil((restEnd - Date.now()) / 1000)))
      : watching ? "⏱ " + mmss(Math.floor((Date.now() - watchAt) / 1000))
      : "⏱ " + mmss(+c.dataset.sec);
    c.classList.toggle("run", on && !over); c.classList.toggle("over", over); c.classList.toggle("watch", watching);
  });
}
setInterval(() => { if (restEach && !document.hidden) updateRestChips(); }, 1000);
function startRest(sec, name){
  restName = name;
  restEnd = Date.now() + sec * 1000;
  $("restLabel").textContent = "Rust · " + name;
  $("restBar").classList.remove("over");
  $("restBar").hidden = false; document.body.classList.add("resting");
  clearInterval(restTimer); restTimer = setInterval(tickRest, 250); tickRest();
}
function tickRest(){
  const left = Math.ceil((restEnd - Date.now()) / 1000);
  if (left > 0){ $("restTime").textContent = Math.floor(left / 60) + ":" + String(left % 60).padStart(2, "0"); updateRestChips(); return; }
  clearInterval(restTimer); restTimer = null;
  $("restTime").textContent = "0:00";
  $("restLabel").textContent = "Tijd voor je volgende set";
  $("restBar").classList.add("over");
  updateRestChips();
  beep();
  try { navigator.vibrate && navigator.vibrate([200, 100, 200]); } catch {}
}
function stopRest(){
  clearInterval(restTimer); restTimer = null;
  $("restBar").hidden = true; document.body.classList.remove("resting"); restName = "";
  updateRestChips();
}
function warmUpSound(){
  try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); audioCtx.resume(); } catch {}
}
function beep(){
  if (!audioCtx) return;
  try {
    [0, 0.25].forEach(t => {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.frequency.value = 880; o.connect(g); g.connect(audioCtx.destination);
      const at = audioCtx.currentTime + t;
      g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(0.3, at + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, at + 0.18);
      o.start(at); o.stop(at + 0.2);
    });
  } catch {}
}

// Keep the screen on once you start logging sets (where the phone allows it).
let wakeLock = null, training = false;
async function keepAwake(){
  training = true;
  try {
    if (!wakeLock && navigator.wakeLock){
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => { wakeLock = null; });
    }
  } catch {}
}
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") return;
  if (autoCloseWorkout()){ stopRest(); render(); toast("Je vorige training werd automatisch afgesloten."); }
  if (training) keepAwake();
  if (restTimer) tickRest();
});


// ---------- Analytics extras: calendar, body map, records, body weight ----------
let calMonth = today().slice(0, 7);   // "2026-10"

// ---------- Calendar colours: one colour per kind of training, done (filled) and planned (outlined) ----------
const TRAIN_KINDS = {
  strength: ["Kracht", "#f97316"], cardio: ["Cardio", "#ef4444"], core: ["Core", "#eab308"], flex: ["Mobiliteit en yoga", "#22c55e"],
  class: ["Groepslessen", "#ec4899"], kine: ["Kinetherapie", "#3b82f6"], mind: ["Meditatie", "#8b5cf6"]
};
function kindOf(sc){
  if (!sc) return "strength";
  if (sc.kine) return "kine";
  if (sc.mind) return "mind";
  if (sc.crd) return "cardio";
  if (sc.id === "core") return "core";
  if (sc.id === "mobility" || sc.id === "yoga") return "flex";
  if (sc.cls) return "class";
  return "strength";
}
const schemeByName = name => allSchemes().find(x => x.name === name) || null;
// Kinds of a logged day: from the day labels, plus cardio when only cardio was logged.
function dayKinds(iso){
  const d = log[iso]; if (!d) return [];
  const k = [...new Set((d.days || []).map(l => kindOf(schemeByName(splitLabel(l)[0]))))];
  if (!k.length && (d.cardio || []).length) k.push("cardio");
  return k;
}
// Planned sessions from today on: your training days, the next days of your scheme in turn, and what follows them.
function plannedSessions(untilIso, max = 400){
  const plan = prefs.planDays || []; if (!plan.length) return [];
  const cur = scheme(), main = (isAddon(cur) || cur.cls) && comboHome() ? comboHome() : cur;
  let idx = main.id === cur.id ? (inWorkout() ? (view.day + 1) % main.days.length : (nextDayIndex(main) || { idx: view.day }).idx) : nextHomeDay(main);
  const out = [];
  for (let d = today(); d <= untilIso && out.length < max; d = addDays(d, 1)){
    const wd = (new Date(d + "T12:00").getDay() + 6) % 7;
    if (!plan.includes(wd) || (d === today() && (log[d] || inWorkout()))) continue;
    out.push({ date: d, scheme: main, day: idx, addon: afterOf(main, idx) });
    if (!main.stay) idx = (idx + 1) % main.days.length;
  }
  return out;
}
function renderCalendar(){
  const dates = new Set(Object.keys(log));
  const [y, m] = calMonth.split("-").map(Number);
  const first = new Date(y, m - 1, 1, 12), days = new Date(y, m, 0).getDate();
  const offset = (first.getDay() + 6) % 7;
  $("calTitle").textContent = first.toLocaleDateString(LOC(), { month: "long", year: "numeric" }).replace(/^./, c => c.toUpperCase());
  let html = ["ma","di","wo","do","vr","za","zo"].map(d => `<span class="cal-h">${d}</span>`).join("");
  for (let i = 0; i < offset; i++) html += `<span></span>`;
  let inMonth = 0;
  const lastIso = `${y}-${String(m).padStart(2, "0")}-${String(days).padStart(2, "0")}`;
  const planned = plannedMap(lastIso), wkEnd = addDays(wkMonday, 6);
  const used = new Set(), states = new Set();
  for (let d = 1; d <= days; d++){
    const iso = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const info = dayInfo(iso, planned), st = info.state; if (st === "done") inMonth++;
    info.kinds.forEach(k => used.add(k)); if (st !== "free") states.add(st === "today" ? "planned" : st);
    const goal = goalsOn(iso).length; if (goal) states.add("goal");
    const cls = `cal-d${st === "done" ? " on" : st === "planned" || st === "today" ? " plan" : st === "missed" ? " missed" : ""}${info.kinds.length > 1 ? " two" : ""}${iso === today() ? " now" : ""}${iso === selDate ? " sel" : ""}${iso >= wkMonday && iso <= wkEnd ? " inwk" : ""}${goal ? " goal" : ""}`;
    html += `<button type="button" class="${cls}" data-date="${iso}"${kindVars(info.kinds)} title="${esc(info.label ? shortDate(iso) + ": " + info.label : shortDate(iso))}">${d}</button>`;
  }
  $("cal").innerHTML = html;
  $("calLegend").innerHTML = [...used].map(k => `<span><i style="--c1:${TRAIN_KINDS[k][1]}"></i>${esc(TRAIN_KINDS[k][0])}</span>`).join("")
    + (states.has("done") ? `<span><i class="lg-done"></i>Gedaan</span>` : "") + (states.has("planned") ? `<span><i class="dash"></i>Gepland</span>` : "")
    + (states.has("missed") ? `<span><i class="lg-miss"></i>Gemist</span>` : "") + (states.has("goal") ? `<span><b aria-hidden="true">🎯</b>Doel</span>` : "");
  $("cal").querySelectorAll("[data-date]").forEach(b => b.onclick = () => selectDay(b.dataset.date, "cal"));
  $("calDetail").innerHTML = selFrom === "cal" && selDate.slice(0, 7) === calMonth ? dayDetail(selDate) : "";
  wireDayDetail($("calDetail"));
  const next = plannedSessions(addDays(today(), 28), 8);
  // Planned trainings and goal dates, in date order
  const rows = next.map(p => {
    const k = kindOf(p.scheme), when = new Date(p.date + "T12:00").toLocaleDateString(LOC(), { weekday: "short", day: "numeric", month: "short" });
    return { date: p.date, html: `<div class="pl-row" style="--c1:${TRAIN_KINDS[k][1]}"><b>${esc(p.date === today() ? "Vandaag" : when)}</b><span>${esc(p.scheme.days[p.day].name)} · ${esc(p.scheme.name.replace(/^Programma: /, ""))}</span>${p.addon ? `<small>${esc(`Daarna: ${p.addon.name}`)}</small>` : ""}</div>` };
  }).concat((prefs.goals || []).filter(g => g.date && g.date >= today() && g.date <= addDays(today(), 60) && !goalEval(g).done).map(g => ({ date: g.date,
    html: `<div class="pl-row goal-row"><b>${esc(new Date(g.date + "T12:00").toLocaleDateString(LOC(), { weekday: "short", day: "numeric", month: "short" }))}</b><span><span aria-hidden="true">🎯</span> ${esc(goalLabel(g.name))} · ${esc(goalEval(g).targetText)}</span></div>` })))
    .sort((x, y) => x.date < y.date ? -1 : x.date > y.date ? 1 : 0);
  const planOpen = !!prefs.planListOpen;
  $("planList").hidden = !planOpen; $("planToggle").setAttribute("aria-expanded", planOpen);
  $("planToggle").querySelector(".chev").textContent = planOpen ? "▾" : "▸";
  $("planCount").textContent = next.length ? `(${next.length})` : "";
  $("planToggle").onclick = () => { prefs.planListOpen = !planOpen; savePrefs(); renderCalendar(); };
  $("planList").innerHTML = next.length ? rows.map(r => r.html).join("") : `<p class="note">Nog niets gepland. Kies je trainingsdagen in Weekplanning.</p>` + rows.map(r => r.html).join("");
  // Streak: weeks in a row with at least one training (this week counts once you trained in it).
  const weeks = new Set([...dates].map(weekOf));
  let w = weekOf(today()); if (!weeks.has(w)) w = addDays(w, -7);
  let streak = 0; while (weeks.has(w)){ streak++; w = addDays(w, -7); }
  let best = 0, run = 0, prevW = "";
  [...weeks].sort().forEach(x => { run = prevW && addDays(prevW, 7) === x ? run + 1 : 1; best = Math.max(best, run); prevW = x; });
  $("streak").innerHTML = `<b>${streak}</b> ${streak === 1 ? "week" : "weken"} op rij getraind · langste reeks ${best} ${best === 1 ? "week" : "weken"} · ${inMonth} ${inMonth === 1 ? "training" : "trainingen"} deze maand`;
}

// Anatomical front and back figure. Shapes are drawn for the left half and mirrored; each muscle is a
// smooth closed curve through its points. Coloured by sets in the last 7 days. A group may have several
// shapes (the heads of a muscle); the deltoids also light up for exercises that only list "Schouders".
const BM_SILHOUETTE = [[92,44],[91,56],[82,62],[66,67],[54,72],[45,82],[41,96],[40,114],[38,134],[35,150],[33,166],[30,186],[27,206],[24,222],[20,234],[21,248],[27,254],[32,248],[33,236],[36,222],[42,202],[48,182],[52,164],[56,146],[59,128],[62,112],
  [64,126],[67,146],[71,166],[70,184],[66,202],[62,222],[60,248],[62,276],[66,298],[64,314],[61,334],[63,356],[67,376],[66,392],[62,402],[66,408],[86,408],[89,398],[87,380],[89,358],[91,336],[90,316],[92,300],[95,276],[97,256],[100,238]];
const BM_FRONT = [
  ["Trapezius",[[91,54],[84,60],[70,65],[58,70],[70,71],[84,67],[92,62]]],
  ["Nek",[[91,44],[89,49],[93,58],[97,64],[99,61],[95,51]]],
  ["Borst",[[98,72],[86,70],[72,72],[64,80],[61,94],[66,106],[78,112],[92,112],[99,104]]],
  ["Serratus",[[65,108],[63,118],[66,130],[72,128],[74,116],[70,110]]],
  ["Schuine buikspieren",[[76,114],[75,128],[68,136],[69,150],[71,166],[72,182],[78,196],[86,198],[87,180],[86,150],[85,124],[81,115]]],
  ["Voorkant schouders",[[66,70],[56,73],[50,82],[50,96],[54,106],[59,100],[63,88],[68,78]]],
  ["Zijkant schouders",[[52,74],[45,82],[41,96],[42,110],[47,112],[50,98],[51,84]]],
  ["Biceps",[[52,110],[46,118],[44,134],[46,146],[50,150],[55,142],[57,126],[56,114]]],
  ["Onderarmen",[[40,152],[36,164],[33,184],[30,204],[34,208],[38,190],[42,170],[44,157]]],
  ["Onderarmen",[[50,152],[46,162],[42,182],[37,204],[40,210],[45,192],[50,172],[54,157]]],
  ["Quadriceps",[[65,242],[62,258],[63,278],[66,294],[71,298],[73,276],[72,254],[69,243]]],
  ["Quadriceps",[[77,220],[73,238],[74,262],[77,286],[82,292],[86,282],[87,256],[84,232]]],
  ["Quadriceps",[[91,262],[87,276],[86,292],[89,300],[94,294],[94,278]]],
  ["Adductoren",[[96,232],[90,238],[89,252],[91,264],[95,258],[98,246]]],
  ["Abductoren",[[70,198],[64,208],[61,224],[62,240],[67,236],[72,218],[75,204]]],
  ["Heupbuigers",[[78,200],[75,206],[81,214],[90,224],[96,230],[97,222],[90,212],[83,203]]],
  ["Scheenbeen",[[70,314],[67,330],[69,352],[72,370],[75,366],[75,344],[74,322]]],
  ["Kuiten",[[86,316],[81,330],[82,350],[86,362],[89,350],[90,330]]],
  ["Kuiten",[[65,318],[62,334],[64,350],[67,338]]],
  ["Voeten en enkels",[[69,388],[65,399],[67,405],[84,405],[86,397],[85,386]]]
];
const BM_ABS = [[88.5,114,10.5,18],[88.5,134,10.5,18],[88.5,154,10.5,18],[88.5,174,10.5,24]];   // x, y, w, h of the left column
const BM_BACK = [
  ["Rotator cuff",[[78,82],[68,86],[63,96],[66,106],[73,108],[78,98],[82,88]]],
  ["Bovenrug",[[88,96],[80,102],[74,110],[66,112],[68,120],[80,122],[90,118],[93,108]]],
  ["Lats",[[64,116],[65,132],[68,150],[72,166],[80,180],[90,190],[92,174],[91,150],[92,130],[86,124],[74,122]]],
  ["Onderrug",[[99,128],[94,132],[92,150],[92,176],[93,196],[99,204]]],
  ["Achterkant schouders",[[62,70],[54,74],[48,84],[48,98],[53,106],[58,98],[62,86],[68,77]]],
  ["Zijkant schouders",[[52,74],[45,82],[41,96],[42,110],[47,112],[50,98],[51,84]]],
  ["Triceps",[[48,106],[43,116],[41,132],[44,144],[48,138],[50,122]]],
  ["Triceps",[[56,106],[51,114],[49,130],[50,146],[54,150],[57,138],[58,118]]],
  ["Onderarmen",[[44,152],[38,164],[34,184],[30,206],[36,212],[42,192],[48,172],[54,156]]],
  ["Abductoren",[[82,194],[72,196],[67,204],[65,216],[70,221],[80,212],[88,204]]],
  ["Billen",[[99,208],[88,206],[76,212],[67,224],[66,242],[74,254],[88,256],[99,250]]],
  ["Hamstrings",[[68,258],[63,272],[64,290],[70,302],[76,294],[77,272],[74,259]]],
  ["Hamstrings",[[84,259],[80,270],[80,290],[84,304],[90,300],[93,280],[93,263]]],
  ["Kuiten",[[68,314],[63,328],[63,346],[68,358],[74,350],[76,330],[74,316]]],
  ["Kuiten",[[84,314],[78,320],[78,340],[82,360],[88,354],[90,334],[89,318]]],
  ["Kuiten",[[71,362],[69,372],[73,384],[82,386],[86,374],[84,364],[78,360]]],
  ["Voeten en enkels",[[70,392],[66,400],[68,405],[84,405],[86,398],[84,391]]]
];
// Left half of the trapezius kite, from the top of the spine out to the shoulder and back to the spine
const BM_TRAPS = [[100,38],[95,40],[92,50],[90,58],[78,63],[64,68],[58,72],[70,76],[82,82],[88,94],[92,108],[96,120],[100,128]];
const BM_KNEES = ["M73,304Q79,311 86,304", "M114,304Q121,311 127,304"];
const BM_SHOULDERS = new Set(["Voorkant schouders", "Zijkant schouders", "Achterkant schouders"]);

// Smooth closed (or open) curve through points (Catmull-Rom → cubic Bézier).
function smoothPath(pts, closed = true){
  const n = pts.length, P = i => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < (closed ? n : n - 1); i++){
    const [p0, p1, p2, p3] = [P(i - 1), P(i), P(i + 1), P(i + 2)];
    d += `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d + (closed ? "Z" : "");
}
const mirror = pts => pts.map(([x, y]) => [200 - x, y]);

function bodyMapSvg(mus){
  const lvl = v => !v ? 0 : v < 5 ? 1 : v < 10 ? 2 : v <= 20 ? 3 : 4;
  const shape = (grp, d) => {
    const v = mus[grp] || 0, also = BM_SHOULDERS.has(grp) ? ` data-also="Schouders"` : "";
    return `<path class="bm l${lvl(v)}" data-g="${esc(grp)}"${also} d="${d}"><title>${esc(grp)}: ${fmt(Math.round(v * 2) / 2)} sets</title></path>`;
  };
  const sil = smoothPath(BM_SILHOUETTE.concat(mirror(BM_SILHOUETTE).reverse().slice(1)), true);
  const traps = smoothPath(BM_TRAPS.concat(mirror(BM_TRAPS).reverse().slice(1, -1)));
  const figure = (front, dx) => {
    let g = `<g transform="translate(${dx} 0)"><path class="bm-sil" d="${sil}"/><ellipse class="bm-sil" cx="100" cy="26" rx="14" ry="18"/>`;
    if (!front) g += shape("Trapezius", traps);
    (front ? BM_FRONT : BM_BACK).forEach(([grp, pts]) => { g += shape(grp, smoothPath(pts)) + shape(grp, smoothPath(mirror(pts))); });
    if (front){
      const v = mus["Buikspieren"] || 0;
      BM_ABS.forEach(([x, y, w, h]) => {
        [x, 200 - x - w].forEach(xx => { g += `<rect class="bm l${lvl(v)}" data-g="Buikspieren" x="${xx}" y="${y}" width="${w}" height="${h}" rx="4"><title>Buikspieren: ${fmt(Math.round(v * 2) / 2)} sets</title></rect>`; });
      });
      g += BM_KNEES.map(d => `<path class="bm-line" d="${d}"/>`).join("");
    }
    return g + `<text class="bm-label" x="100" y="432" text-anchor="middle">${front ? "Voorkant" : "Achterkant"}</text></g>`;
  };
  return `<svg viewBox="0 0 410 442" role="img" aria-label="Spierkaart: gekleurd naar aantal sets per spiergroep in de laatste 7 dagen">${figure(true, 0)}${figure(false, 210)}</svg>
    <p class="bm-info" id="bmInfo">Tik op een spier voor het aantal sets.</p>
    <div class="bm-legend"><span><i class="bm l0"></i>0</span><span><i class="bm l1"></i>1–4</span><span><i class="bm l2"></i>5–9</span><span><i class="bm l3"></i>10–20</span><span><i class="bm l4"></i>20+</span></div>`;
}
// The muscle tapped on the map or in the list below it: outlined on the map with the rest faded, its sets in the info line.
let musOpen = "", musPick = null;
function showMuscle(g, mus){
  const map = $("bodyMap");
  map.querySelectorAll(".bm.sel").forEach(x => x.classList.remove("sel"));
  const hit = g ? [...map.querySelectorAll(`svg [data-g="${CSS.escape(g)}"], svg [data-also="${CSS.escape(g)}"]`)] : [];
  // drawn last, so the outline lies on top of its neighbours
  hit.forEach(x => { x.classList.add("sel"); x.parentNode.appendChild(x); });
  map.classList.toggle("has-sel", hit.length > 0);
  map.dataset.sel = g || "";
  if (!g){ $("bmInfo").textContent = "Tik op een spier voor het aantal sets."; return; }
  const v = mus[g] || 0;
  $("bmInfo").innerHTML = `<b>${esc(g)}</b>: ${fmt(Math.round(v * 2) / 2)} sets in de laatste 7 dagen${v >= 10 && v <= 20 ? " · goed" : v > 20 ? " · veel" : v ? " · mag meer" : ""}`;
}
// Tap a muscle to select it, tap it again to let go.
function wireBodyMap(mus){
  musPick = null;
  $("bodyMap").classList.remove("has-sel"); $("bodyMap").dataset.sel = "";
  $("bodyMap").querySelectorAll("svg [data-g]").forEach(el => el.addEventListener("click", () => {
    const g = $("bodyMap").dataset.sel === el.dataset.g ? "" : el.dataset.g;
    showMuscle(g, mus);
    if (musPick) musPick(g);
  }));
}

// ---------- Analytics modules: collapse and drag to reorder ----------
const MOD_TITLES = { profile: "Taal en profiel", overview: "Overzicht", cal: "Kalender", muscles: "Sets per spiergroep", recovery: "Herstel per spier", progress: "Vooruitgang",
  body: "Lichaam", food: "Voeding", history: "Logboek" };
function setupModules(){
  foldPlanAfterOpens();
  setupModulesIn("statsBody", "modOrder", "modClosed");
  setupModulesIn("trainMods", "trainOrder", "trainClosed");
  setupModulesIn("planBody", "planOrder", "planClosed");
}
// "Programma's" stays open the first 3 times you open the app; after that it folds shut on its own,
// unless you've already toggled it yourself (then your own setting wins).
let planOpenCounted = false;
function foldPlanAfterOpens(){
  if (planOpenCounted) return;
  planOpenCounted = true;
  prefs.planOpens = (prefs.planOpens || 0) + 1;
  if (prefs.planOpens > 3 && !prefs.planUserSet){
    const cur = prefs.trainClosed || TRAIN_CLOSED.slice();
    if (!cur.includes("plan")) prefs.trainClosed = cur.concat(["plan"]);
  }
  savePrefs();
}
const TRAIN_CLOSED = ["cardio", "recovery", "week"], STATS_CLOSED = ["week", "cal"], TODAY_CLOSED = ["rec"];
const closedDefault = boxId => boxId === "trainMods" ? TRAIN_CLOSED : boxId === "planBody" ? [] : boxId === "todayMods" ? TODAY_CLOSED : STATS_CLOSED;
function setupModulesIn(boxId, orderKey, closedKey){
  const box = $(boxId);
  // Recovery per muscle and the week plan start folded; once also for lists you already arranged.
  // Week plan and calendar start folded under "Sets per muscle group"; once also for arranged Analytics.
  if (boxId === "statsBody" && !prefs.foldedV3){
    if (prefs[closedKey]) prefs[closedKey] = [...new Set(prefs[closedKey].concat(STATS_CLOSED))];
    if (prefs[orderKey]){ const o = prefs[orderKey].filter(x => x !== "week" && x !== "cal"), i = o.indexOf("muscles"); o.splice(i < 0 ? o.length : i + 1, 0, "week", "cal"); prefs[orderKey] = o; }
    prefs.foldedV3 = true; savePrefs();
  }
  if (boxId === "trainMods" && prefs[closedKey] && !prefs.foldedV2){ prefs[closedKey] = [...new Set(prefs[closedKey].concat(["recovery", "week"]))]; prefs.foldedV2 = true; savePrefs(); }
  if (boxId === "statsBody" && prefs[orderKey] && !prefs.orderV5){ prefs[orderKey] = prefs[orderKey].filter(x => x !== "history").concat(["history"]); prefs.orderV5 = true; savePrefs(); }
  if (boxId === "statsBody" && prefs[orderKey] && !prefs.orderV4){ prefs[orderKey] = ["muscles"].concat(prefs[orderKey].filter(x => x !== "muscles" && x !== "food"), ["food"]); prefs.orderV4 = true; savePrefs(); }
  if (boxId === "statsBody" && prefs[orderKey] && !prefs.orderV6){ const o = prefs[orderKey].filter(x => x !== "balance"); o.splice(Math.min(1, o.length), 0, "balance"); prefs[orderKey] = o; prefs.orderV6 = true; savePrefs(); }
  if (boxId === "statsBody" && prefs[orderKey] && !prefs[orderKey].includes("food")){ const o = prefs[orderKey].slice(), i = o.indexOf("kcal"); o.splice(i < 0 ? 0 : i + 1, 0, "food"); prefs[orderKey] = o; savePrefs(); }
  if (boxId === "statsBody" && prefs[orderKey] && !prefs[orderKey].includes("recovery")){ const o = prefs[orderKey].slice(), i = o.indexOf("muscles"); o.splice(i < 0 ? 0 : i + 1, 0, "recovery"); prefs[orderKey] = o; savePrefs(); }
  const order = (prefs[orderKey] || []).filter(id => box.querySelector(`.mod[data-mod="${id}"]`));
  order.forEach(id => box.appendChild(box.querySelector(`.mod[data-mod="${id}"]`)));
  const hint = box.querySelector(".mod-hint"); if (hint) box.appendChild(hint);
  box.querySelectorAll(".mod").forEach(m => {
    const id = m.dataset.mod, closed = (prefs[closedKey] || closedDefault(boxId)).includes(id);
    m.classList.toggle("closed", closed);
    const t = m.querySelector(".mod-toggle");
    t.setAttribute("aria-expanded", !closed);
    t.onclick = () => {
      const now = !m.classList.contains("closed");
      m.classList.toggle("closed", now); t.setAttribute("aria-expanded", !now);
      const cur = prefs[closedKey] || closedDefault(boxId);
      prefs[closedKey] = cur.filter(x => x !== id).concat(now ? [id] : []);
      if (boxId === "trainMods" && id === "plan") prefs.planUserSet = true;
      savePrefs();
      if (boxId === "statsBody") now ? renderJump() : renderStats();
    };
    wireModOrder(m, box, orderKey);
  });
}
function saveModOrder(box, orderKey){ prefs[orderKey] = [...box.querySelectorAll(".mod")].map(m => m.dataset.mod); savePrefs(); if (box.id === "statsBody") renderJump(); }
// Tap the stacked-chevron button to reveal a separate up and down arrow; each swaps the module
// with its visible neighbour in that direction. Collapses back to the single button after a move.
function wireModOrder(m, box, orderKey){
  const toggle = m.querySelector(".mod-order-toggle"), up = m.querySelector(".mod-up"), down = m.querySelector(".mod-down");
  if (!toggle) return;
  const visible = () => [...box.querySelectorAll(".mod")].filter(x => !x.hidden);
  const refresh = () => { const vis = visible(), i = vis.indexOf(m); up.disabled = i <= 0; down.disabled = i < 0 || i === vis.length - 1; };
  const collapse = () => { toggle.hidden = false; up.hidden = true; down.hidden = true; };
  toggle.onclick = () => { toggle.hidden = true; up.hidden = false; down.hidden = false; refresh(); };
  up.onclick = () => {
    const vis = visible(), sib = vis[vis.indexOf(m) - 1]; if (!sib) return;
    box.insertBefore(m, sib); saveModOrder(box, orderKey); collapse(); toggle.focus();
  };
  down.onclick = () => {
    const vis = visible(), sib = vis[vis.indexOf(m) + 1]; if (!sib) return;
    box.insertBefore(sib, m); saveModOrder(box, orderKey); collapse(); toggle.focus();
  };
  collapse();
}

// Analytics jump row: one chip per visible block, in your order. A tap opens the block and scrolls to it;
// the chip of the block you are reading lights up. The first chip folds all blocks in or out.
let jumpSig = "", jumpLock = "";
const nlText = el => [...el.childNodes].map(n => n.nodeType === 3 ? (trOrig.has(n) ? trOrig.get(n) : n.nodeValue) : nlText(n)).join("");
const statsMods = () => [...$("statsBody").querySelectorAll(".mod")].filter(m => !m.hidden);
function renderJump(){
  const mods = statsMods(), open = mods.some(m => !m.classList.contains("closed"));
  const sig = open + "|" + mods.map(m => m.dataset.mod).join(",");
  if (sig === jumpSig) return;
  jumpSig = sig;
  $("statsJump").innerHTML = `<button type="button" class="chip jump-all" data-all="${open ? "close" : "open"}">${open ? "Alles dicht" : "Alles open"}</button>` +
    mods.map(m => `<button type="button" class="chip" data-to="${esc(m.dataset.mod)}">${esc(nlText(m.querySelector("h2")).trim())}</button>`).join("");
  trackJump();
}
function headerOffset(){ const top = document.querySelector(".top"); return top ? (parseFloat(getComputedStyle(top).top) || 0) + top.offsetHeight + 10 : 10; }
function setAllMods(closed){
  const mods = statsMods();
  mods.forEach(m => { m.classList.toggle("closed", closed); m.querySelector(".mod-toggle").setAttribute("aria-expanded", !closed); });
  const ids = mods.map(m => m.dataset.mod), cur = (prefs.modClosed || closedDefault("statsBody")).filter(x => !ids.includes(x));
  prefs.modClosed = closed ? cur.concat(ids) : cur; savePrefs();
  jumpLock = ""; closed ? renderJump() : renderStats();
}
function jumpToMod(id){
  const m = $("statsBody").querySelector(`.mod[data-mod="${CSS.escape(id)}"]`); if (!m) return;
  if (m.classList.contains("closed")) m.querySelector(".mod-toggle").click();
  jumpLock = id; trackJump();
  requestAnimationFrame(() => window.scrollTo({ top: Math.max(0, m.getBoundingClientRect().top + window.scrollY - headerOffset()), behavior: reduceMotion ? "auto" : "smooth" }));
}
function trackJump(){
  if (page !== "stats") return;
  const bar = $("statsJump"), off = headerOffset() + 30, mods = statsMods();
  let id = jumpLock;
  if (!id){ const seen = mods.filter(m => m.getBoundingClientRect().top <= off); id = (seen.length ? seen[seen.length - 1] : mods[0] || {dataset: {}}).dataset.mod; }
  bar.querySelectorAll("[data-to]").forEach(b => {
    const on = b.dataset.to === id;
    if (on === (b.getAttribute("aria-current") === "true")) return;
    if (!on){ b.removeAttribute("aria-current"); return; }
    b.setAttribute("aria-current", "true");
    const r = b.getBoundingClientRect(), br = bar.getBoundingClientRect();   // centre the chip, also right-to-left
    bar.scrollTo({ left: bar.scrollLeft + (r.left + r.right - br.left - br.right) / 2, behavior: reduceMotion ? "auto" : "smooth" });
  });
}
$("statsJump").onclick = e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.all) setAllMods(b.dataset.all === "close"); else jumpToMod(b.dataset.to);
};
let jumpFrame = 0;
addEventListener("scroll", () => { if (page === "stats" && !jumpFrame) jumpFrame = requestAnimationFrame(() => { jumpFrame = 0; trackJump(); }); }, { passive: true });
["touchstart", "wheel", "keydown"].forEach(t => addEventListener(t, e => { if (jumpLock && !(e.target.closest && e.target.closest("#statsJump"))) jumpLock = ""; }, { passive: true }));
function renderBodyWeight(){
  const entries = Object.entries(prefs.body || {}).sort((a, b) => a[0] < b[0] ? -1 : 1);
  const last = entries.slice(-5).reverse();
  $("bwInput").placeholder = entries.length ? fmt(toU(entries[entries.length - 1][1])) : (isLb() ? "Bv. 173" : "Bv. 78,5");
  $("bwUnit").textContent = U();
  $("bwList").innerHTML = last.map(([d, w]) => `<span class="set-pill">${esc(relDate(d))}: ${fw(w)}<button type="button" data-bw="${esc(d)}" aria-label="Verwijder gewicht van ${esc(shortDate(d))}">×</button></span>`).join("")
    + (entries.length ? "" : `<p class="note">Weeg jezelf bij voorkeur op hetzelfde moment, bv. 's ochtends voor het ontbijt.</p>`);
  $("bwList").querySelectorAll("[data-bw]").forEach(b => b.onclick = () => {
    const sn = takeSnapshot(); prefs.body = Object.assign({}, prefs.body); delete prefs.body[b.dataset.bw]; savePrefs(); renderBodyWeight(); undoToast("Gewicht verwijderd", sn);
  });
  $("physBox").open = !!prefs.physOpen; $("statBox").open = !!prefs.statOpen;
  renderBodyChart(); renderPhys();
}

// ---------- Lichaam: one chart for your weight and the Garmin numbers, per week, month or year ----------
// [key, name, unit, kind]: "bars" draws bars (a year shows the average day of each week), "sum" bars with weekly totals.
const PHYS = [
  ["w", "Gewicht"], ["bf", "Lichaamsvet", "%"], ["mm", "Skeletspiermassa"], ["bm", "Botmassa"], ["wat", "Lichaamswater", "%"], ["hr", "Hartslag", "bpm"], ["st", "Stress"], ["bb", "Body Battery"], ["sl", "Slaapscore"],
  ["stp", "Stappen", "", "bars"], ["hrv", "HRV-status", "ms"], ["im", "Minuten intensieve training", "min", "sum"],
  ["fl", "Verdiepingen", "", "bars"], ["vo2", "VO2 max"], ["fa", "Fitnessleeftijd", "jaar"], ["spo2", "Pulse Ox", "%"], ["acc", "Acclimatisatie", "%"]
];
const PHYS_BY = Object.fromEntries(PHYS.map(p => [p[0], p]));
const MASS = new Set(["w", "mm", "bm"]);   // in kg or lb
// Least squares line through the days between from and to: slope per day, the value on any date, and a word for it.
function linFit(daily, from, to){
  const ds = Object.keys(daily).filter(d => d >= from && d <= to);
  if (ds.length < 3) return null;
  const day = d => new Date(d + "T12:00") / 864e5, t = ds.map(day), v = ds.map(d => daily[d]);
  const mean = x => x.reduce((s, y) => s + y, 0) / x.length, mt = mean(t), mv = mean(v);
  const sxx = t.reduce((s, y) => s + (y - mt) ** 2, 0); if (!sxx) return null;
  const slope = t.reduce((s, y, i) => s + (y - mt) * (v[i] - mv), 0) / sxx, sd = Math.sqrt(mean(v.map(y => (y - mv) ** 2)));
  return { slope, at: d => mv + slope * (day(d) - mt), word: Math.abs(slope * (Math.max(...t) - Math.min(...t))) < sd * .5 ? "stabiel" : slope > 0 ? "stijgend" : "dalend" };
}
// A week ahead, from the line through the last 30 days.
function forecast(k, daily){
  const f = linFit(daily, addDays(today(), -30), today()); if (!f) return null;
  const pct = PHYS_BY[k][2] === "%", lim = v => Math.max(0, pct ? Math.min(100, v) : v);
  return { f, from: today(), to: addDays(today(), 7), v0: lim(f.at(today())), v1: lim(f.at(addDays(today(), 7))) };
}
const STRESS4 = ["", "Laag", "Gemiddeld", "Hoog", "Zeer hoog"];   // the built-in stress field of intervals.icu: your own feeling, 1–4
const dayIso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const activeMinutes = d => Math.round(sessionMinutes(d) + (log[d].cardio || []).reduce((a, c) => a + (c.min || 0), 0));
// Fitness age: the age at which your VO2 max is average (population norms, men −0.4 and women −0.3 per year).
function fitAge(vo2){
  const sex = sexOf(), m = (64 - vo2) / .4, f = (50.5 - vo2) / .3, a = sex === "vrouw" ? f : sex === "anders" ? (m + f) / 2 : m;
  return Math.round(Math.min(90, Math.max(20, a)));
}
// Values per date. Intensity minutes and fitness age are estimated (from your trainings, from VO2 max) when Garmin has none.
function physDaily(k){
  const out = {}, W = prefs.well || {};
  if (k === "w"){ Object.entries(prefs.body || {}).forEach(([d, kg]) => { out[d] = toU(kg); }); return out; }
  Object.entries(W).forEach(([d, o]) => { if (o[k] != null) out[d] = MASS.has(k) ? toU(o[k]) : o[k]; });
  if (Object.keys(out).length) return out;
  if (k === "st") Object.entries(W).forEach(([d, o]) => { if (o.sq != null) out[d] = o.sq; });
  if (k === "im") Object.keys(log).forEach(d => { const m = activeMinutes(d); if (m) out[d] = m; });
  if (k === "fa") Object.entries(physDaily("vo2")).forEach(([d, v]) => { out[d] = fitAge(v); });
  return out;
}
const physGuess = k => (k === "im" || k === "fa") && !Object.values(prefs.well || {}).some(o => o[k] != null);
const stress4 = () => !Object.values(prefs.well || {}).some(o => o.st != null);
function physFmt(k, v, bare){
  if (v == null || !isFinite(v)) return "—";
  if (MASS.has(k)) return fmt(Math.round(v * 10) / 10) + (bare ? "" : " " + U());
  if (k === "st" && stress4() && !bare) return STRESS4[Math.round(v)] || fmt(Math.round(v * 10) / 10);
  const r = ["vo2", "hrv", "spo2", "bf", "wat", "st"].includes(k) ? Math.round(v * 10) / 10 : Math.round(v), u = PHYS_BY[k][2];
  return (Math.abs(r) >= 10000 ? r.toLocaleString(LOC()) : fmt(r)) + (u && !bare ? " " + u : "");
}

let bc = { p: "w", ref: "" };   // period: w, m or y; ref: a date inside it (empty = today)
function bcRange(p = bc.p, ref = bc.ref || today()){
  const d = new Date(ref + "T12:00");
  if (p === "w"){ const a = weekOf(ref); return [a, addDays(a, 6)]; }
  if (p === "m") return [dayIso(new Date(d.getFullYear(), d.getMonth(), 1, 12)), dayIso(new Date(d.getFullYear(), d.getMonth() + 1, 0, 12))];
  return [d.getFullYear() + "-01-01", d.getFullYear() + "-12-31"];
}
function bcShift(n){
  const d = new Date((bc.ref || today()) + "T12:00");
  if (bc.p === "w") d.setDate(d.getDate() + 7 * n);
  else if (bc.p === "m"){ d.setDate(1); d.setMonth(d.getMonth() + n); }
  else d.setFullYear(d.getFullYear() + n);
  bc.ref = dayIso(d) > today() ? "" : dayIso(d);
}
const bcMetric = () => PHYS_BY[prefs.bodyMetric] ? prefs.bodyMetric : "w";
// Points of one period: days, or in a year one point per week (average, or the total for intensity minutes).
function bcPoints(k, a, b, daily = physDaily(k)){
  const ds = Object.keys(daily).filter(d => d >= a && d <= b).sort();
  if (bc.p !== "y") return ds.map(d => ({ date: d, v: daily[d] }));
  const per = {};
  ds.forEach(d => (per[weekOf(d)] = per[weekOf(d)] || []).push(daily[d]));
  return Object.keys(per).sort().map(w => ({ date: w, v: PHYS_BY[k][3] === "sum" ? per[w].reduce((x, y) => x + y, 0) : per[w].reduce((x, y) => x + y, 0) / per[w].length, wk: true }));
}
function renderBodyChart(){
  const k = bcMetric(), [a, b] = bcRange(), daily = physDaily(k), pts = bcPoints(k, a, b, daily), all = Object.keys(daily).sort();
  const sel = $("bcMetric");
  if (sel.options.length !== PHYS.length) sel.innerHTML = PHYS.map(p => `<option value="${p[0]}">${esc(p[1])}</option>`).join("");
  sel.value = k;
  $("bcPeriod").querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x.dataset.v === bc.p));
  const d0 = new Date(a + "T12:00"), sameYear = d0.getFullYear() === new Date().getFullYear();
  $("bcTitle").textContent = bc.p === "y" ? String(d0.getFullYear())
    : bc.p === "m" ? d0.toLocaleDateString(LOC(), { month: "long", year: "numeric" })
    : `${shortDate(a)} – ${shortDate(b)}${sameYear ? "" : " " + new Date(b + "T12:00").getFullYear()}`;
  $("bcPrev").disabled = !all.length || all[0] >= a;
  $("bcNext").disabled = b >= today();
  $("bcToday").disabled = a <= today() && today() <= b;
  const tg = k === "w" ? bodyGoal() : null, fc = a <= today() && today() <= b ? forecast(k, daily) : null;
  const drawn = drawBody($("bwChart"), pts, { k, a, b, daily, fc, targets: tg ? bodyGoals().filter(t => t === tg || !bodyGoalDone(t)).map(t => Math.round(toU(t.v) * 10) / 10) : [] });
  $("bcLegend").innerHTML = (drawn.ma ? `<span><i class="lg-ma"></i>${esc("Gemiddelde van 7 dagen")}</span>` : "")
    + (drawn.fc ? `<span><i class="lg-fc"></i>${esc("Verwachting volgende week")}</span>` : "");
  $("bcLegend").hidden = !drawn.ma && !drawn.fc;
  const name = PHYS_BY[k][1];
  $("bcNote").textContent = !all.length ? (k === "w" ? "Nog geen gewicht. Vul het in bij Gewicht ingeven, of koppel Garmin via intervals.icu." : `Nog geen gegevens voor ${name}. Die komen van je Garmin via intervals.icu.`)
    : physGuess(k) ? (k === "im" ? "Geschat uit je trainingen: minuten kracht en cardio per dag." : "Geschat uit je VO2 max en je geslacht.")
    : bc.p === "y" ? (PHYS_BY[k][3] === "sum" ? "Totaal per week." : PHYS_BY[k][3] ? "Gemiddeld per dag, per week." : "Gemiddelde per week.") : "";
  $("bcNote").hidden = !$("bcNote").textContent;
  renderBodyStats(k, a, b, daily);
}
function drawBody(box, pts, o){
  const W = Math.max(280, box.clientWidth || 600), H = 230, m = { l: 44, r: 12, t: 16, b: 28 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  const P = PHYS_BY[o.k], bars = !!P[3], year = bc.p === "y", td = today();
  // the current period also shows the week ahead, so the forecast fits
  const end = o.fc && o.fc.to > o.b ? o.fc.to : o.b;
  const ix = s => Math.round((new Date(s + "T12:00") - new Date(o.a + "T12:00")) / 864e5), days = ix(end) + 1;
  // every day (in a year: every week) gets a slot; points sit in its middle
  const x = p => m.l + Math.min(days - .5, Math.max(.5, ix(p.date) + (p.wk ? 3.5 : .5))) / days * iw;
  // 7-day moving average in a week or month, so the day-to-day noise drops out
  const ma = [];
  if (!year && !bars && pts.length >= 3) for (let d = o.a; d <= o.b && d <= td; d = addDays(d, 1)){
    const v = []; for (let i = 0; i < 7; i++){ const w = o.daily[addDays(d, -i)]; if (w != null) v.push(w); }
    if (v.length >= 2) ma.push({ date: d, v: v.reduce((s, y) => s + y, 0) / v.length });
  }
  let g = "";
  const xl = [];
  if (bc.p === "w") for (let i = 0; i < days; i++){ const d = addDays(o.a, i); if (days <= 8 || i % 2 === 0) xl.push([d, new Date(d + "T12:00").toLocaleDateString(LOC(), days <= 8 ? { weekday: "short", day: "numeric" } : { day: "numeric", month: "numeric" })]); }
  else if (bc.p === "m") [1, 8, 15, 22, 29].forEach(n => { const d = o.a.slice(0, 8) + String(n).padStart(2, "0"); if (d <= o.b) xl.push([d, shortDate(d)]); });
  else for (let i = 0; i < 12; i++){ const d = o.a.slice(0, 5) + String(i + 1).padStart(2, "0") + "-15"; xl.push([d, new Date(d + "T12:00").toLocaleDateString(LOC(), { month: W < 480 ? "narrow" : "short" })]); }
  xl.forEach(([d, t]) => { g += `<text class="c-axis" x="${x({ date: d }).toFixed(1)}" y="${H - 8}" text-anchor="middle">${esc(t)}</text>`; });
  // upright lines: every day in a week or month (Mondays a bit stronger), every month in a year
  const vx = xx => `x1="${xx.toFixed(1)}" x2="${xx.toFixed(1)}" y1="${m.t}" y2="${m.t + ih}"`;
  if (year) for (let i = 1; i < 12; i++) g += `<line class="c-grid" ${vx(m.l + ix(o.a.slice(0, 5) + String(i + 1).padStart(2, "0") + "-01") / days * iw)}/>`;
  else for (let i = 1; i < days; i++){ const d = addDays(o.a, i), mon = new Date(d + "T12:00").getDay() === 1; g += `<line class="${mon && bc.p === "m" ? "c-grid" : "c-grid2"}" ${vx(m.l + i / days * iw)}/>`; }
  // the days still to come
  if (end > o.b || (td >= o.a && td < end)){ const fx = m.l + (ix(td) + 1) / days * iw; if (fx < m.l + iw) g += `<rect class="c-future" x="${fx.toFixed(1)}" y="${m.t}" width="${(m.l + iw - fx).toFixed(1)}" height="${ih}"/>`; }
  if (!pts.length){
    box.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Geen gegevens in deze periode">${g}
      <line class="c-grid" x1="${m.l}" x2="${W - m.r}" y1="${m.t + ih}" y2="${m.t + ih}"/><text class="c-empty" x="${m.l + iw / 2}" y="${m.t + ih / 2}" text-anchor="middle">Geen gegevens in deze periode</text></svg>`;
    return { ma: false, fc: false };
  }
  const fc = o.fc && pts.length >= 2 ? o.fc : null;
  const vs = pts.map(p => p.v).concat(o.targets, ma.map(p => p.v), fc && !(year && PHYS_BY[o.k][3] === "sum") ? [fc.v0, fc.v1] : []);
  let lo = bars ? 0 : Math.min(...vs), hi = Math.max(...vs);
  const pad = (hi - lo) * .12 || Math.max(1, Math.abs(hi) * .05);
  if (!bars) lo -= pad; hi += pad;
  // a few tenths of a kilo must not look like a cliff
  const span = !bars && ({ w: isLb() ? 4 : 2, mm: isLb() ? 4 : 2, bm: isLb() ? 1 : .5, bf: 4, wat: 4, hr: 10, hrv: 10, sl: 20, bb: 20, vo2: 4, fa: 10, spo2: 4, acc: 20 })[o.k];
  if (span && hi - lo < span){ const c = (hi + lo) / 2; lo = c - span / 2; hi = c + span / 2; }
  const step = niceStep(hi - lo);
  lo = Math.max(0, Math.floor(lo / step) * step); hi = Math.ceil(hi / step) * step;
  const y = v => m.t + ih - (v - lo) / (hi - lo) * ih;
  const yl = v => v >= 10000 ? fmt(v / 1000) + "k" : fmt(Math.round(v * 100) / 100);
  for (let v = lo; v <= hi + 1e-9; v += step){
    g += `<line class="c-grid" x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}"/><text class="c-axis" x="${m.l - 8}" y="${y(v) + 4}" text-anchor="end">${yl(v)}</text>`;
    if (v + step / 2 < hi) g += `<line class="c-grid2" x1="${m.l}" x2="${W - m.r}" y1="${y(v + step / 2)}" y2="${y(v + step / 2)}"/>`;
  }
  o.targets.forEach(tv => {
    const ty = y(tv).toFixed(1);
    g += `<line class="c-tgt" x1="${m.l}" x2="${W - m.r}" y1="${ty}" y2="${ty}"/><text class="c-tgt-lab" x="${m.l + 6}" y="${ty - 6}">Streefgewicht ${fmt(tv)} ${U()}</text>`;
  });
  let marks = "";
  const slot = iw / days * (year ? 7 : 1), bw = Math.max(2, Math.min(28, slot * .7));
  if (bars) marks = pts.map(p => `<rect class="c-bar${p.date === td || (p.wk && p.date === weekOf(td)) ? " now" : ""}" x="${(x(p) - bw / 2).toFixed(1)}" y="${y(p.v).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1, m.t + ih - y(p.v)).toFixed(1)}" rx="3"/>`).join("");
  else {
    const line = pts.map((p, i) => (i ? "L" : "M") + x(p).toFixed(1) + "," + y(p.v).toFixed(1)).join("");
    const area = pts.length > 1 ? `<path class="c-area" d="${line}L${x(pts[pts.length - 1]).toFixed(1)},${m.t + ih}L${x(pts[0]).toFixed(1)},${m.t + ih}Z"/>` : "";
    const mal = ma.length > 1 ? `<path class="c-ma" d="${ma.map((p, i) => (i ? "L" : "M") + x(p).toFixed(1) + "," + y(p.v).toFixed(1)).join("")}"/>` : "";
    marks = area + `<path class="c-line" d="${line}"/>` + mal + pts.map((p, i) => `<circle class="c-dot${i === pts.length - 1 ? " end" : ""}" cx="${x(p).toFixed(1)}" cy="${y(p.v).toFixed(1)}" r="${year ? 3 : i === pts.length - 1 ? 5 : 4}"/>`).join("");
  }
  // forecast: the line through the last 30 days, a week further (in a year of weekly totals it would not match the bars)
  const showFc = fc && !(year && PHYS_BY[o.k][3] === "sum");
  if (showFc){
    const x0 = x({ date: fc.from }), x1 = x({ date: fc.to }), y1 = y(fc.v1);
    marks += `<path class="c-fc" d="M${x0.toFixed(1)},${y(fc.v0).toFixed(1)}L${x1.toFixed(1)},${y1.toFixed(1)}"/><circle class="c-fc-dot" cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="4.5"/>
      <text class="c-fc-lab" x="${Math.min(x1, W - m.r).toFixed(1)}" y="${(y1 - 10).toFixed(1)}" text-anchor="end">${esc(physFmt(o.k, fc.v1))}</text>`;
  }
  box.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(P[1])}">${g}${marks}
    <line class="c-cross" data-cross x1="0" x2="0" y1="${m.t}" y2="${m.t + ih}" visibility="hidden"/>
    <rect class="c-hit" x="${m.l}" y="${m.t}" width="${iw}" height="${ih}"/></svg><div class="c-tip" data-tip hidden></div>`;
  const svg = box.querySelector("svg"), cross = box.querySelector("[data-cross]"), tip = box.querySelector("[data-tip]");
  const hits = showFc ? pts.concat([{ date: fc.to, v: fc.v1, fc: true }]) : pts;
  const show = ev => {
    const r = svg.getBoundingClientRect(), px = (ev.clientX - r.left) * W / r.width;
    const p = hits.reduce((q, z) => Math.abs(x(z) - px) < Math.abs(x(q) - px) ? z : q);
    cross.setAttribute("x1", x(p)); cross.setAttribute("x2", x(p)); cross.setAttribute("visibility", "visible");
    tip.hidden = false;
    tip.innerHTML = `<b>${esc(physFmt(o.k, p.v))}</b><span>${esc(p.fc ? "Verwachting volgende week" : p.wk ? `Week van ${shortDate(p.date)}` : relDate(p.date))}</span>`;
    const left = x(p) * r.width / W, tw = tip.offsetWidth;
    tip.style.left = Math.min(Math.max(0, left - tw / 2), r.width - tw) + "px";
    tip.style.top = Math.max(0, y(p.v) * r.height / H - tip.offsetHeight - 14) + "px";
  };
  const hide = () => { cross.setAttribute("visibility", "hidden"); tip.hidden = true; };
  svg.addEventListener("pointermove", show); svg.addEventListener("pointerdown", show); svg.addEventListener("pointerleave", hide);
  return { ma: ma.length > 1, fc: !!showFc };
}
// Statistiek: average, low and high, change, moving average, trend and a forecast for every chart.
function renderBodyStats(k, a, b, daily){
  const ds = Object.keys(daily).filter(d => d >= a && d <= b).sort(), vals = ds.map(d => daily[d]);
  const rows = [];
  const row = (label, val, sub = "") => rows.push(`<div class="st-row"><span>${esc(label)}${sub ? ` <small class="note">${esc(sub)}</small>` : ""}</span><b>${val}</b></div>`);
  // the 1–4 stress feeling has words as values; changes are plain numbers
  const s4 = k === "st" && stress4(), num = v => physFmt(k, v, s4);
  const sign = v => { const t = num(Math.abs(v)); return (!/[1-9]/.test(t.split(" ")[0]) ? "±" : v > 0 ? "+" : "−") + t; };
  const trend = (f, per, label, sub) => rows.push(`<div class="st-row"><span>${esc(label)}${sub ? ` <small class="note">${esc(sub)}</small>` : ""}</span><b><span>${esc(f.word)}</span> · <span>${esc(`${sign(f.slope * (per === "per maand" ? 30.44 : 7))} ${per}`)}</span></b></div>`);
  if (ds.length){
    const sum = vals.reduce((s, v) => s + v, 0), avg = sum / vals.length;
    const lo = ds[vals.indexOf(Math.min(...vals))], hi = ds[vals.indexOf(Math.max(...vals))];
    row("Metingen", String(vals.length));
    row("Gemiddelde", esc(physFmt(k, avg)));
    if (PHYS_BY[k][3]) row("Totaal", esc(physFmt(k, sum)));
    row("Laagste", esc(physFmt(k, daily[lo])), relDate(lo));
    row("Hoogste", esc(physFmt(k, daily[hi])), relDate(hi));
    if (vals.length > 1) row("Verschil in deze periode", esc(sign(vals[vals.length - 1] - vals[0])), `${shortDate(ds[0])} → ${shortDate(ds[ds.length - 1])}`);
    // the period before, same length
    const [pa, pb] = bcRange(bc.p, addDays(a, -1)), prev = Object.keys(daily).filter(d => d >= pa && d <= pb).map(d => daily[d]);
    if (prev.length) row(bc.p === "w" ? "Tegenover vorige week" : bc.p === "m" ? "Tegenover vorige maand" : "Tegenover vorig jaar", esc(sign(avg - prev.reduce((s, v) => s + v, 0) / prev.length)), "gemiddelde");
    // 7-day moving average at the end of the period (today in the current one)
    const e = b < today() ? b : today(), last7 = []; for (let i = 0; i < 7; i++){ const v = daily[addDays(e, -i)]; if (v != null) last7.push(v); }
    if (last7.length) row("Voortschrijdend gemiddelde", esc(physFmt(k, last7.reduce((s, v) => s + v, 0) / last7.length)), "laatste 7 dagen");
    // trend of this period, per week (and per month in a year)
    const f = linFit(daily, a, b);
    if (f){ trend(f, "per week", "Trend per week", "deze periode"); if (bc.p === "y") trend(f, "per maand", "Trend per maand", "deze periode"); }
  } else rows.push(`<p class="note">Geen gegevens in deze periode.</p>`);
  // last 30 days and a week ahead: always from today, whatever period you look at
  const fc = forecast(k, daily);
  if (fc){
    trend(fc.f, "per week", "Trend per week", "laatste 30 dagen");
    row("Verwachting over een week", esc(physFmt(k, fc.v1)), `${shortDate(fc.to)} · op basis van de laatste 30 dagen`);
  }
  const allD = Object.keys(daily).sort();
  if (MASS.has(k) && allD.length > 1) row("Sinds je eerste meting", esc(sign(daily[allD[allD.length - 1]] - daily[allD[0]])), new Date(allD[0] + "T12:00").toLocaleDateString(LOC(), { day: "numeric", month: "short", year: "numeric" }));
  $("bcStats").innerHTML = rows.join("");
}
// Fysiologie: the latest Garmin numbers; a tap shows that number in the chart.
function renderPhys(){
  const W = prefs.well || {}, tiles = [], cur = bcMetric();
  const latest = daily => { const d = Object.keys(daily).sort().pop(); return d ? [d, daily[d]] : null; };
  PHYS.slice(1).forEach(([k, name]) => {
    const daily = physDaily(k), l = latest(daily);
    let val = l ? physFmt(k, l[1]) : "—", sub = l ? relDate(l[0]) : "Nog geen gegevens";
    if (l && k === "hr") sub = `in rust · ${relDate(l[0])}`;
    if (l && k === "sl" && W[l[0]] && W[l[0]].ss) sub = `${Math.floor(W[l[0]].ss / 3600)} u ${Math.round(W[l[0]].ss % 3600 / 60)} min · ${relDate(l[0])}`;
    if (l && k === "hrv"){
      // HRV status like Garmin: your 7-day average against your own normal range (the weeks before)
      const v7 = [], base = [];
      Object.entries(daily).forEach(([d, v]) => { const n = daysAgo(d); if (n < 7) v7.push(v); else if (n < 63) base.push(v); });
      const mean = x => x.reduce((s, v) => s + v, 0) / x.length;
      if (v7.length && base.length >= 14){
        const bm = mean(base), sd = Math.sqrt(mean(base.map(v => (v - bm) ** 2))), m7 = mean(v7);
        val = m7 < bm - sd ? "Laag" : m7 > bm + sd ? "Uit balans" : "In balans";
        sub = `${fmt(Math.round(m7))} ms · normaal ${fmt(Math.round(bm - sd))}–${fmt(Math.round(bm + sd))}`;
      } else sub = `${physFmt(k, l[1])} · basislijn in opbouw`;
      if (!(v7.length && base.length >= 14)) val = physFmt(k, l[1]);
    }
    if (k === "im"){
      const wk = weekOf(today()), tot = Object.keys(daily).filter(d => d >= wk).reduce((s, d) => s + daily[d], 0);
      val = `${Math.round(tot)} min`; sub = physGuess(k) ? "deze week · geschat" : "deze week · doel 150";
    }
    if (l && k === "fa"){ const age = profileAge(prefs.profile || {}); sub = physGuess(k) ? "geschat uit VO2 max" : age ? `je leeftijd: ${age}` : relDate(l[0]); }
    tiles.push(`<button type="button" class="tile pm ph${l ? "" : " off"}" data-ph="${k}" aria-pressed="${k === cur}"><small>${esc(name)}</small><strong>${esc(val)}</strong><em>${esc(sub)}</em></button>`);
  });
  $("phys").innerHTML = tiles.join("");
  $("phys").querySelectorAll("[data-ph]").forEach(t => t.onclick = () => {
    prefs.bodyMetric = t.dataset.ph; savePrefs(); renderBodyChart(); renderPhys();
    $("bcMetric").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  });
  const I = (prefs.links || {}).intervals, none = ["mm", "bm", "wat", "bb", "acc"].filter(k => !Object.values(W).some(o => o[k] != null));
  $("physNote").textContent = !I ? "Deze cijfers komen van je Garmin via intervals.icu. Koppel het bij Delen → Gekoppelde apps."
    : none.length ? "Skeletspiermassa, botmassa, lichaamswater, Body Battery en acclimatisatie stuurt intervals.icu niet door van Garmin. Staan ze bij intervals.icu in een eigen wellness-veld (bv. BodyBattery, ingevuld met een hulpmiddel zoals garmin-intervals-bridge), dan komen ze hier ook." : "";
  $("physNote").hidden = !$("physNote").textContent;
  // when it was fetched last, and a button to fetch everything again
  const at = I && I.wellAt ? new Date(I.wellAt) : null;
  $("physGet").innerHTML = !I || !STANDALONE ? "" : `<span class="note">${esc(at ? `Laatst opgehaald ${relDate(dayIso(at)).toLowerCase()} om ${at.toLocaleTimeString(LOC(), { hour: "2-digit", minute: "2-digit" })}: ${I.wellDays || 0} dagen met gegevens.` : "Nog niet opgehaald.")}</span>
    <button class="ghost" type="button" id="physReload"${wellBusy ? " disabled" : ""}>${wellBusy ? "Bezig met ophalen …" : "Opnieuw ophalen"}</button>`;
  const rb = $("physReload"); if (rb) rb.onclick = () => icuWellNow();
}
$("bcMetric").onchange = () => { prefs.bodyMetric = $("bcMetric").value; savePrefs(); renderBodyChart(); renderPhys(); };
$("bcPeriod").onclick = e => { const x = e.target.closest("button"); if (!x || x.dataset.v === bc.p) return; bc.p = x.dataset.v; renderBodyChart(); };
$("bcPrev").onclick = () => { bcShift(-1); renderBodyChart(); };
$("bcNext").onclick = () => { bcShift(1); renderBodyChart(); };
$("bcToday").onclick = () => { bc.ref = ""; renderBodyChart(); };
[["physBox", "physOpen"], ["statBox", "statOpen"]].forEach(([id, key]) => $(id).addEventListener("toggle", () => { if (!!prefs[key] !== $(id).open){ prefs[key] = $(id).open; savePrefs(); } }));

// ---------- Own schemes, welcome ----------

// [form title, name example, days example, default days, note on the new scheme]
const NS_KINDS = {
  "": ["Eigen schema maken", "Bv. Mijn split", "Bv. Borst + triceps, Rug + biceps, Benen", "Dag A, Dag B", "Eigen schema. Voeg via Aanpassen oefeningen toe."],
  crd: ["Eigen cardioprogramma maken", "Bv. Mijn loopschema", "Bv. Rustig, Intervallen, Lang", "Training A", "Eigen cardioprogramma. Voeg via Aanpassen oefeningen toe."],
  cls: ["Eigen groepsles maken", "Bv. Mijn bootcamp", "Bv. Kracht, Conditie", "Les A", "Eigen groepsles. Voeg via Aanpassen oefeningen toe."],
  kine: ["Eigen kineprogramma maken", "Bv. Knie na operatie", "Bv. Fase 1, Fase 2, Fase 3", "Fase 1, Fase 2", "Eigen kineprogramma. Voeg via Aanpassen de oefeningen toe, bv. die van je kinesitherapeut."],
  mind: ["Eigen meditatie maken", "Bv. Avondroutine", "Bv. Ochtend, Avond", "Sessie A", "Eigen meditatie of ademhaling. Voeg via Aanpassen oefeningen toe."]
};
let newKind = "";
function openNewScheme(kind){
  newKind = kind || "";
  const k = NS_KINDS[newKind];
  $("newScheme").querySelector("h2").textContent = k[0];
  $("nsName").placeholder = k[1]; $("nsDays").placeholder = k[2]; $("nsDays").value = k[3];
  $("newScheme").hidden = false; $("nsName").focus();
  $("newScheme").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
}
function createScheme(e){
  e.preventDefault();
  const name = $("nsName").value.trim();
  if (!name){ toast("Geef je schema een naam."); return; }
  const dayNames = $("nsDays").value.split(",").map(x => x.trim()).filter(Boolean).slice(0, 7);
  const id = "c" + Date.now().toString(36);
  const made = { id, name, note: NS_KINDS[newKind][4], days: (dayNames.length ? dayNames : [NS_KINDS[newKind][3].split(",")[0].trim()]).map(n => ({ name: n, focus: "", ex: [] })) };
  if (newKind) made[newKind] = true;   // shows up in its own row: group classes, physio or meditation
  prefs.custom = (prefs.custom || []).concat([made]);
  savePrefs();
  $("newScheme").hidden = true; $("nsName").value = "";
  view = { scheme: id, day: 0 }; lsSet(LS_VIEW, view);
  editing = true; render();
  toast("Schema gemaakt. Voeg nu oefeningen toe.");
}

let deleteArmed = "";   // id of the scheme whose delete button was tapped once
const delBtns = () => [$("schemeDelete"), $("schemeDelete2")];
function deleteScheme(){
  const s = scheme(); if (!isCustom(s)) return;
  if (deleteArmed !== s.id){ deleteArmed = s.id; delBtns().forEach(b => b.textContent = "Zeker? Tik nog eens om \"" + s.name + "\" te verwijderen"); return; }
  deleteArmed = ""; delBtns().forEach(b => b.textContent = "Dit eigen schema verwijderen");
  prefs.custom = prefs.custom.filter(c => c.id !== s.id); savePrefs();
  layouts = Object.fromEntries(Object.entries(layouts).filter(([key]) => !key.startsWith(s.id + ":"))); saveLayouts();
  view = { scheme: SCHEMES[0].id, day: 0 }; lsSet(LS_VIEW, view); editing = false; render();
  toast("Schema verwijderd. Je gelogde trainingen blijven bewaard.");
}

let wlAt = 0;
// Simple, obvious proposals per training goal (no PHUL here: it stays in the full list).
const WL_SCHEMES = {
  muscle: ["prog-beginner", "pp2", "ul", "ppl"],
  strength: ["prog-beginner", "ul", "ppl", "prog-531"],
  fat: ["prog-beginner", "pp2", "ul", "walk", "bike"],
  endurance: ["run", "runfit", "bike", "swim"],
  athletic: ["ath", "prog-beginner", "core", "run"]
};
function welcomeSchemeList(){
  const g = trainGoal(), ids = WL_SCHEMES[g], days = prefs.daysPerWeek;
  const rec = g === "endurance" ? "run" : g === "athletic" ? "ath"
    : ids.includes(SCHEME_FOR_DAYS[days]) ? SCHEME_FOR_DAYS[days] : days >= 4 && ids.includes("ul") ? "ul" : "prog-beginner";
  const list = ids.map(findScheme).filter(Boolean).sort((a, b) => (b.id === rec) - (a.id === rec));
  $("welcomeStartNote").textContent = g === "endurance" ? "Wil je naar een 5 km, halve of hele marathon? Stel dat later in bij Doelen: dan maakt FPT een loopschema per week." : "Je kan dit later altijd wijzigen of een eigen schema maken.";
  $("welcomeSchemes").innerHTML = list.map(s => `<button type="button" class="wl-scheme" data-s="${esc(s.id)}">${s.id === rec ? `<em class="wl-rec">Aanbevolen</em>` : ""}<b>${esc(s.name)}</b><small>${esc(s.days.map(d => d.name).join(" · "))}</small></button>`).join("");
  $("welcomeSchemes").querySelectorAll("[data-s]").forEach(b => b.onclick = () => {
    view = { scheme: b.dataset.s, day: 0 }; lsSet(LS_VIEW, view); closeWelcome(); showPage("train"); render(); window.scrollTo(0, 0);
  });
}
showWelcome.wire = () => $("wlGoals").querySelectorAll("[data-goal]").forEach(b => b.onclick = () => { setTrainGoal(b.dataset.goal); $("wlGoals").innerHTML = goalButtons(); showWelcome.wire(); wlGo(wlAt + 1); });
// First use: the device language is preselected, one tap picks yours and moves on.
const LANG_PICK = { nl: "Kies je taal", en: "Choose your language", fr: "Choisissez votre langue", es: "Elige tu idioma", de: "Wähle deine Sprache",
  it: "Scegli la tua lingua", pt: "Escolha o seu idioma", ru: "Выберите язык", zh: "选择你的语言", ar: "اختر لغتك", hi: "अपनी भाषा चुनें" };
const deviceLang = () => (navigator.languages || [navigator.language || ""]).map(x => String(x).slice(0, 2).toLowerCase()).find(x => LOCALES[x]) || "nl";
function renderLangSlide(){
  $("wlLangTitle").innerHTML = esc(LANG_PICK[lang]) + (lang !== "en" ? `<small>${esc(LANG_PICK.en)}</small>` : "");
  $("wlLangs").innerHTML = LANGS.map(([c, n]) => `<button type="button" class="wl-langbtn" data-l="${c}" lang="${c}" dir="${c === "ar" ? "rtl" : "ltr"}" aria-pressed="${c === lang}">${esc(n)}</button>`).join("");
  $("wlLangs").querySelectorAll("[data-l]").forEach(b => b.onclick = () => { setLang(b.dataset.l); renderLangSlide(); wlGo(1); $("wlNext").focus({ preventScroll: true }); });
}
// First open: skip the pitch slides (hero, trainen, vooruitgang, inzicht) and go straight to your profile.
// "Uitleg opnieuw tonen" in Instellingen: show that pitch again, skip language/days/scheme (already set).
const WL_SKIP_FIRST = ["hero", "trainen", "vooruitgang", "inzicht"], WL_SKIP_REPLAY = ["lang", "summary", "days", "start"];
const wlSlides = () => [...document.querySelectorAll(".wl-slide")].filter(sl => !sl.hidden);
function showWelcome(replay){
  const wireDays = () => $("wlDays").querySelectorAll("[data-days]").forEach(b => b.onclick = () => { setDaysPerWeek(+b.dataset.days); $("wlDays").innerHTML = dayButtons(); wireDays(); welcomeSchemeList(); wlGo(wlAt + 1); });
  $("wlDays").innerHTML = dayButtons(); wireDays();
  $("wlGoals").innerHTML = goalButtons();
  showWelcome.wire();
  if (!localStorage.getItem("ppl.lang") && !prefs.lang) setLang(deviceLang());
  renderLangSlide();
  welcomeSchemeList();
  $("welcomeSchemes").querySelectorAll("[data-s]").forEach(b => b.onclick = () => {
    view = { scheme: b.dataset.s, day: 0 }; lsSet(LS_VIEW, view); closeWelcome(); showPage("train"); render(); window.scrollTo(0, 0);
  });
  const pr = prefs.profile || {}, kg0 = latestBw();
  $("wBirth").value = pr.birth || ""; $("wAgeNote").textContent = ageNote(pr); $("wHeight").value = pr.height || ""; $("wWeight").value = kg0 ? fmt(toU(kg0)) : ""; $("wWUnit").textContent = U();
  $("wlLogo").innerHTML = document.querySelector(".brand .logo").outerHTML;
  const skip = replay ? WL_SKIP_REPLAY : WL_SKIP_FIRST;
  document.querySelectorAll(".wl-slide").forEach(sl => { sl.hidden = skip.includes(sl.dataset.wl); });
  $("wlDots").innerHTML = wlSlides().map(() => "<i></i>").join("");
  $("welcome").hidden = false;
  mountDemo($("wlDemo"), "Bench Press", "push");
  wlGo(0);
}
function wlGo(i){
  const slides = wlSlides(), n = slides.length;
  wlAt = Math.max(0, Math.min(n - 1, i));
  if (slides[wlAt].dataset.wl === "start") welcomeSchemeList();   // follows the goal picked a few slides earlier
  $("wlTrack").parentElement.scrollLeft = 0; // focus moving inside a slide must not shift the strip
  $("wlTrack").style.transform = `translateX(${(document.documentElement.dir === "rtl" ? 1 : -1) * wlAt * 100}%)`;
  slides.forEach((sl, j) => { sl.setAttribute("aria-hidden", j !== wlAt); sl.inert = j !== wlAt; });
  [...$("wlDots").children].forEach((d, j) => d.classList.toggle("on", j === wlAt));
  $("wlCount").textContent = `${wlAt + 1} / ${n}`;
  $("wlBack").hidden = !wlAt;
  $("wlNext").hidden = wlAt === n - 1;
  $("wlNext").textContent = slides[wlAt].dataset.wl === "hero" ? "Laten we beginnen" : "Volgende";
}
function closeWelcome(){ $("welcome").hidden = true; if (!lsGet("ppl.welcomed", false) || !(prefs.dev || {})["ppl.welcomed"]) devSet("ppl.welcomed", true); }
// "Over jou": the answers go through the same saving as the profile in Instellingen.
[["wBirth", "pBirth"], ["wHeight", "pHeight"], ["wWeight", "pWeight"]].forEach(([w, p]) => $(w).addEventListener("change", () => { $(p).value = $(w).value; saveProfileField(p); }));
$("wlNext").onclick = () => { if (document.activeElement && document.activeElement.closest(".wl-fields")) document.activeElement.blur(); wlGo(wlAt + 1); };
$("wlBack").onclick = () => wlGo(wlAt - 1);
$("welcome").addEventListener("keydown", e => {
  const rtl = document.documentElement.dir === "rtl";
  if (e.key === "ArrowRight") wlGo(wlAt + (rtl ? -1 : 1));
  if (e.key === "ArrowLeft") wlGo(wlAt + (rtl ? 1 : -1));
  if (e.key === "Escape") closeWelcome();
});
let wlX = null;
$("wlTrack").addEventListener("touchstart", e => { wlX = e.touches[0].clientX; }, { passive: true });
$("wlTrack").addEventListener("touchend", e => {
  if (wlX == null) return;
  const dx = e.changedTouches[0].clientX - wlX, rtl = document.documentElement.dir === "rtl"; wlX = null;
  if (Math.abs(dx) > 50) wlGo(wlAt + ((dx < 0) !== rtl ? 1 : -1));
}, { passive: true });


// ---------- Muscle groups (shared by analytics, recovery and swaps) ----------
function muscleGroup(m){
  const base = m.replace(/\s*\(.*\)/, "");
  if (/borst/i.test(base)) return "Borst";
  if (/^Lats/.test(base)) return "Lats";
  if (/^Brachialis/.test(base)) return "Biceps";
  if (/Schuine buikspieren/.test(base)) return "Schuine buikspieren";
  if (/Diepe buikspieren/.test(base)) return "Buikspieren";
  if (/zijkant heup/.test(m)) return "Abductoren";
  if (/^Rotatorenmanchet/.test(base)) return "Rotator cuff";
  if (/^Diepe nekbuigers/.test(base)) return "Nek";
  if (/^Voet/.test(base)) return "Voeten en enkels";
  return base;
}
const knownExercise = n => {
  for (const s of SCHEMES) for (const d of s.days) for (const x of d.ex) if (x[0] === n) return { type: x[4], mode: x[5] || "" };
  const l = LIB.find(x => x[0] === n);
  return l ? { type: l[1], mode: l[2] || "" } : null;
};
const allExerciseNames = () => [...new Set(SCHEMES.flatMap(s => s.days.flatMap(d => d.ex.map(x => x[0]))).concat(LIB.map(l => l[0])))].sort();

// ---------- Settings: theme, kg/lb, big buttons ----------
const LS_THEME = "ppl.theme", LS_BIG = "ppl.big", LS_STYLE = "ppl.style";
const STYLES = ["retro", "plain", "future"];
const styleNow = () => { const v = lsGet(LS_STYLE, "plain"); return v === "sport" ? "plain" : STYLES.includes(v) ? v : "plain"; };
// Tab names that are too long in some language shrink until they fit; all four keep the same size.
function fitTabs(){
  const tabs = [...document.querySelectorAll(".view-btn")]; let min = Infinity;
  tabs.forEach(b => {
    b.style.fontSize = ""; let fs = parseFloat(getComputedStyle(b).fontSize), n = 0;
    while (b.scrollWidth > b.clientWidth && fs > 8 && n++ < 16){ fs -= .5; b.style.fontSize = fs + "px"; }
    min = Math.min(min, fs);
  });
  tabs.forEach(b => { b.style.fontSize = min + "px"; });
  // the app name stays on two lines, also on narrow phones
  const h = document.querySelector(".brand h1"); if (!h) return;
  h.style.fontSize = ""; let fs = parseFloat(getComputedStyle(h).fontSize), k = 0;
  const lines = () => h.getBoundingClientRect().height / parseFloat(getComputedStyle(h).lineHeight);
  while (lines() > 2.2 && fs > 11 && k++ < 24){ fs -= .5; h.style.fontSize = fs + "px"; }
}
function applyTheme(){
  const t = lsGet(LS_THEME, "system"), st = styleNow();
  document.documentElement.setAttribute("data-style", st);
  if (t === "system") document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme", t);
  document.body.classList.toggle("big", lsGet(LS_BIG, false));
  fitTabs();
}
function renderSettings(){
  const seg = (id, val) => $(id).querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.v === val));
  seg("segTheme", lsGet(LS_THEME, "system"));
  seg("segStyle", styleNow());
  seg("segUnit", prefs.unit === "lb" ? "lb" : "kg");
  seg("segBig", lsGet(LS_BIG, false) ? "on" : "off");
}

// ---------- Recovery per muscle ----------
const BIG_MUSCLES = ["Borst", "Lats", "Bovenrug", "Quadriceps", "Hamstrings", "Billen", "Onderrug"];
const RECOVERY_SHOWN = ["Borst", "Voorkant schouders", "Zijkant schouders", "Achterkant schouders", "Triceps", "Biceps", "Lats", "Bovenrug", "Onderrug", "Quadriceps", "Hamstrings", "Billen", "Kuiten", "Buikspieren"];
// Hours since the muscle was last trained, against the hours it needs (bigger muscles and more sets need longer).
function recoveryMap(){
  const last = {};
  Object.keys(log).sort().forEach(d => Object.values(log[d].ex).forEach(e => {
    const m = MUSCLES[e.name]; if (!m || !e.sets.length || isStretch(e.name)) return;
    const t = Math.max(...e.sets.map(s => new Date(s.t).getTime())), n = e.sets.length;
    const add = (g, v) => {
      const o = last[g];
      if (!o || t - o.t > 12 * 36e5) last[g] = { t, sets: v };          // a new session for this muscle
      else last[g] = { t: Math.max(t, o.t), sets: o.sets + v };          // same session: add up
    };
    const strong = new Set(m[0].map(muscleGroup));
    strong.forEach(g => add(g, n));
    new Set(m[1].map(muscleGroup)).forEach(g => { if (!strong.has(g)) add(g, n / 2); });
  }));
  const out = {}, now = Date.now();
  RECOVERY_SHOWN.forEach(g => {
    const o = last[g];
    if (!o){ out[g] = 100; return; }
    const need = (BIG_MUSCLES.includes(g) ? 60 : 42) * (0.6 + Math.min(o.sets, 12) / 12 * 0.6);
    out[g] = Math.max(0, Math.min(100, Math.round((now - o.t) / 36e5 / need * 100)));
  });
  return out;
}
function dayReadiness(s, i, rec){
  const groups = new Set();
  exercisesFor(s, i).forEach(x => (MUSCLES[x[0]] || [[]])[0].forEach(m => { const g = muscleGroup(m); if (g in rec) groups.add(g); }));
  if (!groups.size) return 100;
  return Math.round([...groups].reduce((a, g) => a + rec[g], 0) / groups.size);
}
const recClass = v => v >= 90 ? "good" : v >= 60 ? "warn" : "bad";
function renderRecovery(){
  const rec = recoveryMap(), s = scheme();
  const days = s.days.map((d, i) => ({ i, name: d.name, v: dayReadiness(s, i, rec) }));
  const best = days.slice().sort((a, b) => b.v - a.v)[0];
  $("recoveryBody").innerHTML = `
    <div class="rec-chips">${RECOVERY_SHOWN.map(g => `<span class="rchip ${recClass(rec[g])}"><b>${rec[g]}%</b> ${esc(g)}</span>`).join("")}</div>
    ${s.days.length > 1 ? `<div class="rec-days">${days.map(d => `<button type="button" class="rday ${recClass(d.v)}${d.i === view.day ? " on" : ""}" data-i="${d.i}"><b>${esc(d.name)}</b><span>${d.v}% hersteld</span></button>`).join("")}</div>
      <p class="note">Best hersteld voor vandaag: <b>${esc(best.name)}</b> (${best.v}%). Groen = klaar (90%+), oranje = bijna, rood = nog vermoeid. Een schatting op basis van je sets en de tijd sinds je training.</p>`
      : `<p class="note">Groen = klaar (90%+), oranje = bijna, rood = nog vermoeid. Een schatting op basis van je sets en de tijd sinds je training.</p>`}`;
  $("recoveryBody").querySelectorAll(".rday").forEach(b => b.onclick = () => { view.day = +b.dataset.i; lsSet(LS_VIEW, view); showPage("train"); render(); scrollToExercise(); });
}

// ---------- Week planner ----------
const WD = ["ma", "di", "wo", "do", "vr", "za", "zo"];
// ---------- Week plan and calendar: one view of each day ----------
let wkMonday = weekOf(today()), selDate = today(), selFrom = "wk";
const mainPlanScheme = () => { const cur = scheme(); return (isAddon(cur) || cur.cls) && comboHome() ? comboHome() : cur; };
const goalsOn = iso => (prefs.goals || []).filter(g => g.date === iso && !goalEval(g).done);
const plannedMap = untilIso => { const m = {}; plannedSessions(untilIso).forEach(x => { m[x.date] = x; }); return m; };
const kindVars = kinds => { const c1 = kinds[0] && TRAIN_KINDS[kinds[0]][1], c2 = kinds[1] && TRAIN_KINDS[kinds[1]][1]; return c1 ? ` style="--c1:${c1};--c2:${c2 || c1}"` : ""; };
// What a day is: done (what you logged), today or planned (the next days of your scheme),
// missed (a training weekday you skipped since you use the app) or free. The colour comes from the kind of training.
function dayInfo(iso, planned){
  const d = log[iso], did = d && ((d.days || []).length || (d.cardio || []).length || Object.keys(d.ex || {}).length);
  if (iso === today() && inWorkout()){ const sc = scheme(); return { state: "done", kinds: [kindOf(sc)], label: sc.days[view.day].name }; }
  if (did) return { state: "done", kinds: dayKinds(iso), label: (d.days || []).map(l => splitLabel(l)[1]).join(" + ") || "Cardio" };
  const pl = planned[iso];
  if (pl) return { state: iso === today() ? "today" : "planned", kinds: [kindOf(pl.scheme)].concat(pl.addon ? [kindOf(pl.addon)] : []), label: pl.scheme.days[pl.day].name + (pl.addon ? " + " + pl.addon.name : ""), p: pl };
  const wd = (new Date(iso + "T12:00").getDay() + 6) % 7, first = Object.keys(log).sort()[0];
  if (iso < today() && (prefs.planDays || []).includes(wd) && first && iso >= first) return { state: "missed", kinds: [kindOf(mainPlanScheme())], label: "Gemist" };
  return { state: "free", kinds: [], label: "" };
}
function weekPlan(monday = weekOf(today())){
  const planned = plannedMap(addDays(monday, 6));
  return WD.map((w, i) => { const date = addDays(monday, i); return Object.assign({ w, i, date }, dayInfo(date, planned)); });
}
const wpCell = d => `<button type="button" class="wp ${d.state}${d.kinds.length > 1 ? " two" : ""}${d.date === today() ? " now" : ""}${d.date === selDate ? " sel" : ""}${goalsOn(d.date).length ? " goal" : ""}${runOn(d.date) && d.state !== "done" ? " run" : ""}" data-date="${d.date}"${kindVars(d.kinds)}><small>${d.w} ${Number(d.date.slice(8))}</small><span>${esc(d.label || (runOn(d.date) && d.state !== "done" ? "Lopen" : "Rust"))}</span></button>`;
// Details of one day, with what you can do from there.
function dayDetail(iso){
  const d = dayInfo(iso, plannedMap(iso)), wd = (new Date(iso + "T12:00").getDay() + 6) % 7;
  const wdName = new Date(iso + "T12:00").toLocaleDateString(LOC(), { weekday: "long" }), isPlanDay = (prefs.planDays || []).includes(wd);
  let body = "";
  const btns = [];
  if (d.state === "done"){
    const sm = daySummary(iso);
    body = `<p><b>${esc(d.label)}</b></p><p class="note">${sm.sets ? `<span>${sm.sets} sets</span> · ` : ""}<span>${sm.mins} min</span></p>`;
    if (log[iso]) btns.push(`<button class="ghost-sm" type="button" data-dd="share">Delen</button>`);
  } else if (d.p){
    body = `<p><b>${esc(d.label)}</b></p><p class="note">${esc(d.p.scheme.name.replace(/^Programma: /, ""))}</p>`;
    btns.push(`<button class="ghost-sm" type="button" data-dd="open">Open deze training</button>`);
  } else if (d.state === "missed") body = `<p class="note">Niet getraind op deze geplande dag.</p>`;
  else body = `<p class="note">${iso < today() ? "Rustdag." : "Geen training gepland."}</p>`;
  if (iso >= today() && d.state !== "done") btns.push(`<button class="ghost-sm" type="button" data-dd="plan">${esc(isPlanDay ? `Geen trainingsdag meer op ${wdName}` : `Maak van ${wdName} een trainingsdag`)}</button>`);
  const run = d.state !== "done" && runOn(iso);
  const goals = (run && !run.race ? `<p class="dd-goal"><span aria-hidden="true">🏃</span> <b>Loopschema</b> <span>${esc(run.name)}</span> · ${fmt(run.km)} km · <span>${esc(run.detail)}</span></p>` : "")
    + goalsOn(iso).map(g => `<p class="dd-goal"><span aria-hidden="true">🎯</span> <b>Doel</b> <span>${esc(goalLabel(g.name))}</span> · ${esc(goalEval(g).targetText)}</p>`).join("");
  return `<div class="day-detail" data-iso="${iso}"><p class="label">${esc(longDate(iso))}</p>${body}${goals}${btns.length ? `<div class="dd-btns">${btns.join("")}</div>` : ""}</div>`;
}
function wireDayDetail(box){
  const el = box && box.querySelector(".day-detail"); if (!el) return;
  const iso = el.dataset.iso, d = dayInfo(iso, plannedMap(iso)), wd = (new Date(iso + "T12:00").getDay() + 6) % 7;
  el.querySelectorAll("[data-dd]").forEach(b => b.onclick = () => {
    const a = b.dataset.dd;
    if (a === "share") return openShareSheet(iso);
    if (a === "open" && d.p){ view = { scheme: d.p.scheme.id, day: d.p.day }; lsSet(LS_VIEW, view); showPage("train"); render(); window.scrollTo(0, 0); return; }
    if (a === "plan"){
      const cur = prefs.planDays || [];
      prefs.planDays = cur.includes(wd) ? cur.filter(x => x !== wd) : cur.concat([wd]).sort();
      savePrefs(); renderPlanning(); toast(cur.includes(wd) ? "Trainingsdag weggehaald." : "Trainingsdag toegevoegd.");
    }
  });
}
// Select a day: the week plan and the calendar follow each other.
function selectDay(iso, from){
  selDate = iso; selFrom = from; wkMonday = weekOf(iso); calMonth = iso.slice(0, 7);
  renderWeek(); renderCalendar();
}
function renderWeek(){
  const plan = prefs.planDays || [], wk = weekPlan(wkMonday), sun = addDays(wkMonday, 6), thisW = weekOf(today());
  const title = wkMonday === thisW ? "Deze week" : wkMonday === addDays(thisW, -7) ? "Vorige week" : wkMonday === addDays(thisW, 7) ? "Volgende week" : `${shortDate(wkMonday)} – ${shortDate(sun)}`;
  const n = st => wk.filter(d => st.includes(d.state)).length, done = n(["done"]), pl = n(["planned", "today"]), missed = n(["missed"]);
  const sum = [done ? `${done} gedaan` : "", pl ? `${pl} gepland` : "", missed ? `${missed} gemist` : ""].filter(Boolean);
  $("weekBody").innerHTML = `
    <div class="wk-nav"><button type="button" class="wk-arrow" id="wkPrev" aria-label="Vorige week">‹</button>
      <div class="wk-title"><b>${esc(title)}</b><small>${sum.length ? sum.map(x => `<span>${x}</span>`).join(" · ") : "<span>Geen trainingen</span>"}</small></div>
      <button type="button" class="wk-arrow" id="wkNext" aria-label="Volgende week">›</button></div>
    <div class="wk-plan">${wk.map(wpCell).join("")}</div>
    <div id="wkDetail">${selFrom === "wk" && selDate >= wkMonday && selDate <= sun ? dayDetail(selDate) : ""}</div>
    <p class="note">Hoeveel dagen per week wil je trainen?</p>
    <div class="days-pick" id="weekDaysPick">${dayButtons()}</div>
    <p class="note wk-days-note">Op welke dagen train je? Tik om aan of uit te zetten.</p>
    <div class="wd-pick">${WD.map((w, i) => `<button type="button" class="wd${plan.includes(i) ? " on" : ""}" data-i="${i}" aria-pressed="${plan.includes(i)}">${w}</button>`).join("")}</div>
    ${calendarControls()}`;
  if ($("calGo")) $("calGo").onclick = addToCalendar;
  const go = days => { const iso = addDays(selDate >= wkMonday && selDate <= sun ? selDate : wkMonday, days); selDate = iso; wkMonday = weekOf(iso); calMonth = iso.slice(0, 7); selFrom = "wk"; renderWeek(); renderCalendar(); };
  $("wkPrev").onclick = () => go(-7);
  $("wkNext").onclick = () => go(7);
  $("weekBody").querySelectorAll(".wk-plan [data-date]").forEach(b => b.onclick = () => selectDay(b.dataset.date, "wk"));
  wireDayDetail($("wkDetail"));
  $("weekDaysPick").querySelectorAll("[data-days]").forEach(b => b.onclick = () => { setDaysPerWeek(+b.dataset.days); toast(b.dataset.days === "1" ? "1 dag per week ingepland." : `${b.dataset.days} dagen per week ingepland.`); });
  $("weekBody").querySelectorAll(".wd").forEach(b => b.onclick = () => {
    const i = +b.dataset.i, cur = prefs.planDays || [];
    prefs.planDays = cur.includes(i) ? cur.filter(x => x !== i) : cur.concat([i]).sort();
    savePrefs(); renderPlanning();
  });
}
// Goals in Planning: how many planned trainings you still have before the date.
function goalPlanNote(g){
  if (!g.date || g.date < today() || goalEval(g).done) return "";
  if (RACES[g.name]) return `<p class="note goal-plan"><span aria-hidden="true">🏃</span> Je schema per week staat in Planning → Loopschema.</p>`;
  const n = plannedSessions(g.date, 999).length;
  return `<p class="note goal-plan"><span aria-hidden="true">📅</span> ${n ? (n === 1 ? `Nog 1 geplande training tot ${shortDate(g.date)}` : `Nog ${n} geplande trainingen tot ${shortDate(g.date)}`) : "Plan je trainingsdagen in Weekplanning om dit doel te halen."}</p>`;
}
// ---------- Running plan for a race goal: weeks of build-up, an easier week every 4th week and a taper ----------
// peak = longest run at the top of the plan, start = first long run without logged runs, taper = weeks of tapering,
// min/rec = fewest and recommended weeks, easy/quality = those runs as a share of the long run.
const RACES = {
  __race5:  { label: "5 km", km: 5, peak: 8, start: 3, taper: 1, min: 6, rec: 8, easy: .7, quality: .75, short: true },
  __race10: { label: "10 km", km: 10, peak: 14, start: 5, taper: 1, min: 8, rec: 10, easy: .6, quality: .65, short: true },
  __race16: { label: "10 miles", km: 16.1, peak: 18, start: 6, taper: 2, min: 10, rec: 12, easy: .5, quality: .55 },
  __race21: { label: "Halve marathon", km: 21.1, peak: 20, start: 8, taper: 2, min: 10, rec: 12, easy: .5, quality: .55 },
  __race42: { label: "Marathon", km: 42.2, peak: 32, start: 12, taper: 3, min: 14, rec: 18, easy: .4, quality: .45 }
};
const RUN_TYPES = ["Lopen", "Loopband", "Intervallopen"];
const RUNS_FOR_DAYS = { 1: 2, 2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 5 };
const runKm = iso => Math.max(0, ...((log[iso] || {}).cardio || []).filter(c => RUN_TYPES.includes(c.type)).map(c => c.km || 0));
const recentLongRun = () => Math.max(0, ...Object.keys(log).filter(d => daysAgo(d) < 28).map(runKm));
const raceGoals = () => (prefs.goals || []).filter(g => RACES[g.name] && g.date && g.date >= today()).sort((a, b) => a.date < b.date ? -1 : 1);
const wdOf = iso => (new Date(iso + "T12:00").getDay() + 6) % 7;
// Run days: the long run at the weekend, the others spread out. Runs take free days as long as the week stays
// within your training days (and keeps one rest day); the other runs go after a strength session.
function runDays(runs, days){
  const strength = prefs.planDays || [], free = [0, 1, 2, 3, 4, 5, 6].filter(d => !strength.includes(d));
  const maxFree = Math.max(0, Math.min(free.length - 1, Math.max(1, days - strength.length)));
  const gap = (a, b) => Math.min(Math.abs(a - b), 7 - Math.abs(a - b));
  const long = maxFree ? [6, 5].find(d => free.includes(d)) ?? free[free.length - 1] : [6, 5].find(d => strength.includes(d)) ?? strength[strength.length - 1];
  const picked = [long];
  while (picked.length < Math.min(runs, 7)){
    const usedFree = picked.filter(d => free.includes(d)).length, left = [0, 1, 2, 3, 4, 5, 6].filter(d => !picked.includes(d));
    const pool = usedFree < maxFree ? left.filter(d => free.includes(d)) : left.filter(d => strength.includes(d)), from = pool.length ? pool : left;
    from.sort((a, b) => Math.min(...picked.map(p => gap(b, p))) - Math.min(...picked.map(p => gap(a, p))) || (a === (long + 6) % 7) - (b === (long + 6) % 7));
    picked.push(from[0]);
  }
  // The hard session: the run day furthest from the long run, on a day without strength if there is one.
  const rest = picked.slice(1).sort((a, b) => strength.includes(a) - strength.includes(b) || gap(b, long) - gap(a, long));
  return { long, quality: rest[0], easy: rest.slice(1), strength };
}
let racePlanMemo = { key: "", plan: null };
function racePlan(g){
  const R = RACES[g.name], days = prefs.daysPerWeek || (prefs.planDays || []).length || 3, runs = Math.min(RUNS_FOR_DAYS[days] || 3, R.short ? 4 : 5);
  const recent = recentLongRun(), key = JSON.stringify([g, days, prefs.planDays, today(), recent]);
  if (racePlanMemo.key === key) return racePlanMemo.plan;
  const slots = runDays(runs, days), first = weekOf(today()), raceWk = weekOf(g.date);
  const weeks = Math.round((new Date(raceWk) - new Date(first)) / 6048e5) + 1;
  const taper = Math.min(R.taper, Math.max(0, weeks - 1)) , build = weeks - taper;
  const start = recent ? Math.min(Math.max(recent, 2), R.peak * .85) : R.start;
  const half = x => Math.round(x * 2) / 2, minRun = R.short ? 2 : 3;
  const taperFactor = { 1: [], 2: [.65], 3: [.75, .55] }[R.taper].slice(R.taper - taper);
  const list = [];
  let level = start;
  for (let i = 0; i < weeks; i++){
    const monday = addDays(first, i * 7), q = build > 1 ? i / (build - 1) : 1, race = i === weeks - 1;
    let phase, long, kind;
    if (race){ phase = "race"; long = 0; }
    else if (i >= build){ phase = "taper"; long = level * taperFactor[i - build]; }
    else if (build >= 5 && (i + 1) % 4 === 0 && i < build - 1){ phase = "easy"; long = level * .75; }
    else {
      if (i > 0) level = Math.min(R.peak, level + Math.min((R.peak - level) / Math.max(1, build - i), Math.max(1, level * .12)));
      long = level; phase = i === build - 1 ? "peak" : q < .3 ? "base" : "build";
    }
    const sessions = [];
    const add = (wd, name, km, detail) => sessions.push({ wd, date: addDays(monday, wd), name, km: km ? Math.max(minRun, half(km)) : 0, detail, both: slots.strength.includes(wd) });
    if (race){
      const raceWd = wdOf(g.date), before = [slots.quality].concat(slots.easy, [slots.long]).filter(d => d < raceWd - 1).sort((a, b) => a - b).slice(-Math.max(1, runs - 1));
      before.forEach((wd, j) => add(wd, j === 0 && before.length > 1 ? "Kort en vlot" : "Rustige duurloop", Math.min(6, Math.max(3, R.km * .25)), j === 0 && before.length > 1 ? "3× 1 km op wedstrijdtempo" : "met 4× 20 s versnellen"));
      sessions.push({ wd: raceWd, date: g.date, name: "Wedstrijd", km: R.km, detail: R.label, race: true });
    } else {
      add(slots.long, "Lange duurloop", long, "in praattempo");
      if (slots.quality != null){
        if (phase === "taper") add(slots.quality, "Kort en vlot", long * R.quality, "4× 1 km op wedstrijdtempo, 2 min dribbelen");
        else if (phase === "base" || phase === "easy") add(slots.quality, "Rustig met versnellingen", long * R.quality, "laatste km: 6× 20 s vlot");
        else if (R.short) add(slots.quality, q < .8 && phase !== "peak" ? "Intervallen" : "Wedstrijdtempo", long * R.quality,
          q < .55 ? "8× 400 m vlot, 200 m dribbelen" : q < .8 && phase !== "peak" ? "5× 1 km op wedstrijdtempo, 2 min dribbelen" : R.km <= 5 ? "3× 1,5 km op wedstrijdtempo" : "2× 3 km op wedstrijdtempo");
        else add(slots.quality, q < .8 && phase !== "peak" ? "Tempoloop" : "Wedstrijdtempo", long * R.quality,
          q < .55 ? "2× 10 min comfortabel snel, 3 min rustig" : q < .8 && phase !== "peak" ? "25 min comfortabel snel" : R.km > 40 ? "middenstuk van 10–16 km op marathontempo" : "middenstuk van 6–10 km op wedstrijdtempo");
      }
      slots.easy.forEach(wd => add(wd, "Rustige duurloop", long * R.easy, "in praattempo"));
      sessions.sort((a, b) => a.wd - b.wd);
    }
    list.push({ i, monday, phase, long: half(long), km: half(sessions.reduce((s, x) => s + x.km, 0)), sessions });
  }
  const plan = { g, R, days, runs, weeks, slots, recent, start: half(start), list, short: weeks < R.min || level < R.peak * .9 };
  racePlanMemo = { key, plan };
  return plan;
}
// The run from the plan of the nearest race on this date (for the week plan and the day details).
function runOn(iso){
  const g = raceGoals()[0]; if (!g || iso < today()) return null;
  const w = racePlan(g).list.find(x => x.monday === weekOf(iso));
  return w ? w.sessions.find(s => s.date === iso) || null : null;
}
const RACE_PHASE = { base: "Basis", build: "Opbouw", easy: "Rustigere week", peak: "Piekweek", taper: "Afbouwen", race: "Wedstrijdweek" };
let raceSel = "";
const wdShort = iso => new Date(iso + "T12:00").toLocaleDateString(LOC(), { weekday: "short" }).replace(/\.$/, "");
function renderRacePlan(){
  const mod = document.querySelector('#planBody .mod[data-mod="race"]'); if (!mod) return;
  const goals = raceGoals(); mod.hidden = !goals.length; if (!goals.length) return;
  const g = goals.find(x => x.name === raceSel) || goals[0], p = racePlan(g), thisW = weekOf(today());
  const strength = (p.slots.strength || []).slice().sort((a, b) => a - b), both = p.list.some(w => w.sessions.some(s => s.both));
  const row = s => `<div class="rp-run${s.race ? " race" : ""}${s.date < today() ? " past" : ""}"><b>${esc(wdShort(s.date))}</b><span><span>${esc(s.name)}</span>${s.both ? ` <small class="rp-both">+ kracht</small>` : ""}<small>${esc(s.detail)}</small></span><i>${fmt(s.km)} km</i></div>`;
  $("raceBody").innerHTML = `
    ${goals.length > 1 ? `<div class="chips rp-pick">${goals.map(x => `<button type="button" class="chip${x === g ? " on" : ""}" data-race="${esc(x.name)}" aria-pressed="${x === g}">${esc(RACES[x.name].label)}</button>`).join("")}</div>` : ""}
    <p class="rp-head"><b>${esc(RACES[g.name].label)}</b> <span>${esc(longDate(g.date))}</span></p>
    <p class="note">${p.weeks === 1 ? "Deze week is het zover." : `Nog ${p.weeks} weken, inclusief de wedstrijdweek.`}</p>
    <p class="note">${p.days === 1 ? `${p.runs} loopdagen per week, op basis van 1 trainingsdag per week.` : `${p.runs} loopdagen per week, op basis van ${p.days} trainingsdagen per week.`}</p>
    <p class="note">${p.recent ? `Je schema start bij een lange duurloop van ${fmt(p.start)} km, op basis van je loopjes de laatste 4 weken.` : `Je schema start bij een lange duurloop van ${fmt(p.start)} km. Log je loopjes als Lopen of Loopband, dan past het schema zich aan.`}</p>
    ${p.short ? `<p class="note rp-warn">Weinig tijd voor deze afstand: het schema bouwt sneller op en de lange duurloop blijft korter. Een latere wedstrijd is veiliger.</p>` : ""}
    ${p.days < 3 && p.R.km > 20 ? `<p class="note rp-warn">Voor deze afstand zijn 3 of meer loopdagen per week beter. Pas je trainingsdagen aan in Weekplanning.</p>` : ""}
    ${strength.length ? `<p class="rp-k"><b>Krachttraining</b> ${strength.map(d => `<span>${esc(wdShort(addDays(thisW, d)))}</span>`).join("")}</p>
      <p class="note">Plan geen zware beentraining de dag voor je lange duurloop. In de afbouwweken houd je het bij 1–2 lichte krachttrainingen.</p>
      ${both ? `<p class="note">Op dagen met kracht én lopen: loop rustig na je krachttraining, of op een ander moment van de dag.</p>` : ""}`
      : `<p class="note">Nog geen krachtdagen gepland. 1–2 krachttrainingen per week helpen tegen blessures.</p>`}
    <div class="rp-weeks">${p.list.map(w => `<details class="rp-week ${w.phase}"${w.monday === thisW ? " open" : ""}><summary><b>Week ${w.i + 1}</b><span>${esc(RACE_PHASE[w.phase])}</span><small>${esc(shortDate(w.monday))} – ${esc(shortDate(addDays(w.monday, 6)))}</small><i>${fmt(w.km)} km</i></summary>${w.sessions.map(row).join("")}</details>`).join("")}</div>
    <ul class="tips"><li class="tips-h">Tips</li><li>Praattempo: je kunt nog in zinnen praten. Zo loop je de meeste kilometers.</li><li>Intervallen en tempoloop: 10–15 min inlopen en 5–10 min uitlopen; de km zijn de hele training.</li><li>Pijn die blijft of erger wordt: sla een loopje over. Een week minder kost je niets.</li></ul>`;
  $("raceBody").querySelectorAll("[data-race]").forEach(b => b.onclick = () => { raceSel = b.dataset.race; renderRacePlan(); });
}
// ---------- Ready-made programs with a weekly cycle ----------
// cycle: one entry per week; factor scales the suggested weight, reps overrides the target, mainOnly = only the first exercise of the day.
const PROGRAMS = [
  { id:"prog-beginner", name:"Programma: Beginner Full Body", note:"8 weken, 3× per week afwisselend A en B. Elke training iets zwaarder; week 6 is een lichtere herstelweek.",
    program:{ weeks: 8, cycle:[{ name:"Opbouw" },{ name:"Opbouw" },{ name:"Opbouw" },{ name:"Opbouw" },{ name:"Opbouw" },{ name:"Herstelweek", factor:0.6, light:true },{ name:"Opbouw" },{ name:"Test je kracht" }] },
    days:[
      { name:"Full Body A", focus:"Benen, borst, rug, core", ex:[["Back Squat","3","5","2–3 min","legs"],["Bench Press","3","5","2–3 min","push"],["Barbell Row","3","8","2 min","pull"],["Plank","3","30–45","45 s","core","time"]]},
      { name:"Full Body B", focus:"Rug, schouders, benen", ex:[["Deadlift","3","5","3 min","pull"],["Overhead Press","3","5","2 min","push"],["Lat Pulldown","3","8–10","90 s","pull"],["Goblet Squat","3","10","90 s","legs"],["Dumbbell Lateral Raise","3","12–15","60 s","push"]]}
    ]},
  { id:"prog-phul", name:"Programma: PHUL (4 dagen)", note:"Power Hypertrophy Upper Lower: 2 zware krachtdagen en 2 dagen voor spiergroei per week. 6 weken, week 6 lichter.",
    program:{ weeks: 6, cycle:[{ name:"Opbouw" },{ name:"Opbouw" },{ name:"Zwaarder" },{ name:"Zwaarder" },{ name:"Piek", factor:1.02 },{ name:"Herstelweek", factor:0.6, light:true }] },
    days:[
      { name:"Power Upper", focus:"Zwaar duwen en trekken", ex:[["Bench Press","4","3–5","3 min","push"],["Barbell Row","4","3–5","3 min","pull"],["Overhead Press","3","5–8","2 min","push"],["Lat Pulldown","3","6–10","2 min","pull"],["Barbell Curl","2","6–10","90 s","pull"],["Skull Crusher","2","6–10","90 s","push"]]},
      { name:"Power Lower", focus:"Zwaar benen", ex:[["Back Squat","4","3–5","3 min","legs"],["Deadlift","3","3–5","3 min","legs"],["Leg Press","3","10–15","2 min","legs"],["Leg Curl","3","6–10","90 s","legs"],["Standing Calf Raise","4","6–10","60 s","legs"]]},
      { name:"Hypertrophy Upper", focus:"Spiergroei bovenlichaam", ex:[["Incline Dumbbell Press","3","8–12","90 s","push"],["Pec Deck Fly","3","12–15","60 s","push"],["Seated Cable Row","3","8–12","90 s","pull"],["Single-Arm Dumbbell Row","3","8–12","60 s","pull"],["Dumbbell Lateral Raise","3","12–15","60 s","push"],["Incline Dumbbell Curl","3","8–12","60 s","pull"],["Rope Triceps Pushdown","3","10–12","60 s","push"]]},
      { name:"Hypertrophy Lower", focus:"Spiergroei benen", ex:[["Front Squat","3","8–12","2 min","legs"],["Romanian Deadlift","3","8–12","2 min","legs"],["Bulgarian Split Squat","3","8–10 / been","90 s","legs"],["Leg Extension","3","10–15","60 s","legs"],["Lying Leg Curl","3","10–15","60 s","legs"],["Seated Calf Raise","4","10–15","45 s","legs"]]}
    ]},
  { id:"prog-531", name:"Programma: Kracht 5/3/1-stijl", note:"Cyclus van 4 weken voor de 4 hoofdoefeningen: week 1 sets van 5, week 2 sets van 3, week 3 zwaar (5/3/1), week 4 licht. Daarna een nieuwe cyclus, iets zwaarder.",
    program:{ weeks: 4, cycle:[{ name:"Week van 5", reps:"5", factor:0.95, mainOnly:true },{ name:"Week van 3", reps:"3", factor:1, mainOnly:true },{ name:"Zware week (5/3/1)", reps:"3", factor:1.05, mainOnly:true },{ name:"Lichte week", factor:0.6, light:true }] },
    days:[
      { name:"Squat-dag", focus:"Squat + benen", ex:[["Back Squat","3","5","3 min","legs"],["Leg Press","3","10","2 min","legs"],["Leg Curl","3","10","90 s","legs"],["Hanging Leg Raise","3","10","60 s","core","bw"]]},
      { name:"Bench-dag", focus:"Bench press + borst, rug", ex:[["Bench Press","3","5","3 min","push"],["Dumbbell Bench Press","3","10","2 min","push"],["Single-Arm Dumbbell Row","3","10","90 s","pull"],["Rope Triceps Pushdown","3","12","60 s","push"]]},
      { name:"Deadlift-dag", focus:"Deadlift + rug, core", ex:[["Deadlift","3","5","3 min","pull"],["Romanian Deadlift","3","8","2 min","legs"],["Lat Pulldown","3","10","90 s","pull"],["Ab Wheel Rollout","3","10","60 s","core","bw"]]},
      { name:"Press-dag", focus:"Overhead press + schouders, armen", ex:[["Overhead Press","3","5","3 min","push"],["Chin-up","3","5–8","2 min","pull","bw"],["Dumbbell Lateral Raise","3","12–15","60 s","push"],["Barbell Curl","3","10","60 s","pull"]]}
    ]}
];
SCHEMES.push(...PROGRAMS);
function programWeek(s = scheme()){
  if (!s.program) return null;
  const start = (prefs.progStart || {})[s.id];
  if (!start) return null;
  const n = Math.floor(Math.max(0, (new Date(today() + "T12:00") - new Date(start + "T12:00")) / 6048e5));
  const c = s.program.cycle, mod = c[n % c.length];
  return Object.assign({ week: n + 1, inCycle: (n % c.length) + 1, cycleLen: c.length, total: s.program.weeks, round: Math.floor(n / c.length) + 1 }, mod);
}
function ensureProgramStart(s){
  if (!s.program || (prefs.progStart || {})[s.id]) return;
  prefs.progStart = Object.assign({}, prefs.progStart, { [s.id]: today() }); savePrefs();
}
function renderProgram(){
  const s = scheme(), pw = programWeek(s), bar = $("programBar");
  if (!s.program){ bar.hidden = true; return; }
  ensureProgramStart(s);
  const w = programWeek(s);
  bar.hidden = false;
  $("programText").innerHTML = `<b>Week ${w.week}${w.week <= w.total ? " van " + w.total : ""}</b> · ${esc(w.name)}${w.reps ? ` · hoofdoefening ${esc(w.reps)} reps` : ""}${w.factor && w.factor !== 1 ? ` · ${Math.round(w.factor * 100)}% gewicht` : ""}${w.week > w.total ? " · programma klaar, je kunt opnieuw starten" : ""}`;
  $("programRestart").onclick = () => { prefs.progStart = Object.assign({}, prefs.progStart, { [s.id]: today() }); savePrefs(); render(); toast("Programma opnieuw gestart: week 1"); };
}
const lightWeek = () => { const w = programWeek(); return !!(w && w.light); };

// ---------- Swap an exercise for today ----------
function swapMap(){ return Object.fromEntries((skips[markKey("swap")] || []).map(x => x.split("||"))); }
function dayItems(){
  const items = dayItemsBase();
  const q = quickMin();
  return !q || editing ? items : q === LONG_MIN ? longItems(items) : quickItems(items, q);
}
// ---------- Training days per week: fills the week plan and suggests a scheme ----------
const DAY_SPREAD = { 1: [2], 2: [0, 3], 3: [0, 2, 4], 4: [0, 1, 3, 4], 5: [0, 1, 2, 3, 4], 6: [0, 1, 2, 3, 4, 5], 7: [0, 1, 2, 3, 4, 5, 6] };
const SCHEME_FOR_DAYS = { 1: "prog-beginner", 2: "pp2", 3: "prog-beginner", 4: "ul", 5: "ppl", 6: "ppl", 7: "ppl" };
function setDaysPerWeek(n){
  prefs.daysPerWeek = n; prefs.planDays = DAY_SPREAD[n].slice(); savePrefs();
  render(); if (page === "today") renderToday();
}
const dayButtons = () => [1, 2, 3, 4, 5, 6, 7].map(n => `<button type="button" class="day-opt" data-days="${n}" aria-pressed="${prefs.daysPerWeek === n}">${n}</button>`).join("");
// ---------- Training goal: muscle, strength or fat loss ----------
// Changes the rep ranges and rest of the weighted exercises, and what the app suggests.
const TRAIN_GOALS = {
  muscle: ["Spieropbouw", "6–12 herhalingen, 1–2 van falen, 10–20 sets per spiergroep per week."],
  strength: ["Kracht", "Zware basisoefeningen in 3–6 herhalingen met lange rust; hulpoefeningen blijven 8–12."],
  fat: ["Vetverlies", "Krachttraining in 10–15 herhalingen met korte rust, plus extra cardio en een klein calorietekort."],
  endurance: ["Conditie", "Hardlopen, fietsen of zwemmen opbouwen, bv. naar een 5 km of marathon, met 2 korte krachttrainingen erbij."],
  athletic: ["Athletisch", "Een mix van conditie, kracht en core: sterk, fit en wendbaar."]
};
const trainGoal = () => TRAIN_GOALS[prefs.trainGoal] ? prefs.trainGoal : "muscle";
function goalAdjust(it){
  if (scheme().youth) return it;   // youth: always light, never the heavy strength ranges
  const g = trainGoal(), mode = it[5] || "";
  if (g === "muscle" || g === "athletic" || mode || !["push", "pull", "legs"].includes(it[4])) return it;
  const out = it.slice(), [lo] = repRange(it[2]);
  if (g === "strength"){ if (lo <= 8){ out[2] = "3–6"; out[3] = "2–3 min"; } }
  else if (g === "endurance"){ out[2] = "10–12"; out[3] = "60 s"; }
  else { out[2] = "10–15"; out[3] = "60 s"; }
  return out;
}
function setTrainGoal(g){ prefs.trainGoal = g; savePrefs(); render(); renderTrainGoalPick(); if (page === "stats"){ renderAdvice(); renderFood(); } }
const goalButtons = () => Object.entries(TRAIN_GOALS).map(([k, [name, desc]]) =>
  `<button type="button" class="goal-opt" data-goal="${k}" aria-pressed="${!!prefs.trainGoal && trainGoal() === k}"><b>${esc(name)}</b><small>${esc(desc)}</small></button>`).join("");
// The "Trainingsdoel" picker at the top of Doelen (Planning): same cards as the welcome carousel.
function renderTrainGoalPick(){
  const box = $("trainGoalPick"); if (!box) return;
  box.innerHTML = goalButtons();
  box.querySelectorAll("[data-goal]").forEach(b => b.onclick = () => setTrainGoal(b.dataset.goal));
}
function dayItemsBase(){
  const items = exercisesFor(scheme(), view.day);
  if (editing) return items;
  const sw = swapMap();
  return items.map(goalAdjust).map(it => {
    const alt = sw[it[0]]; if (!alt) return it;
    const k = knownExercise(alt) || { type: it[4], mode: it[5] || "" };
    const lib = LIB.find(l => l[0] === alt);
    return [alt, it[1], lib ? lib[5] : it[2], it[3], k.type, k.mode, it[6], it[0]];
  });
}
function alternativesFor(name){
  const m = MUSCLES[name]; if (!m) return [];
  const strong = new Set(m[0].map(muscleGroup)), less = new Set(m[1].map(muscleGroup));
  const inDay = new Set(exercisesFor(scheme(), view.day).map(x => x[0]));
  return allExerciseNames().filter(n => n !== name && !inDay.has(n) && MUSCLES[n] && !cardioType(n) && !isStretch(n)).map(n => {
    const s2 = MUSCLES[n][0].map(muscleGroup), l2 = MUSCLES[n][1].map(muscleGroup);
    const score = s2.filter(g => strong.has(g)).length * 3 + s2.filter(g => less.has(g)).length + l2.filter(g => strong.has(g)).length;
    return { n, score, s2 };
  }).filter(x => x.score >= 3).sort((a, b) => b.score - a.score || a.n.localeCompare(b.n)).slice(0, 5);
}
function setSwap(orig, alt){
  const key = markKey("swap");
  const keep = Object.fromEntries(Object.entries(skips).filter(([sk]) => sk.startsWith(today() + "|")));
  keep[key] = (keep[key] || []).filter(x => !x.startsWith(orig + "||")).concat(alt ? [orig + "||" + alt] : []);
  skips = keep; lsSet(LS_SKIPS, skips);
  renderExercises();
  toast(alt ? `Vandaag: ${alt} in plaats van ${orig}` : `${orig} staat terug`);
}

// ---------- Share a workout: text, Instagram image, Strava ----------
// One summary per training day (or only the sets after `since` for a workout you just finished).
function daySummary(date, o = {}){
  const s0 = log[date] || { ex: {}, cardio: [], days: [] }, keep = x => !o.since || (x.t > o.since && !x.src);
  const exs = Object.values(s0.ex).sort((a, b) => a.order - b.order).map(e => ({ name: e.name, sets: e.sets.filter(keep) })).filter(e => e.sets.length);
  const cardio = (s0.cardio || []).filter(keep);
  const all = exs.flatMap(e => e.sets), times = all.map(x => new Date(x.t).getTime()).sort((a, b) => a - b);
  const cardioMin = cardio.reduce((a, c) => a + (c.min || 0), 0);
  const liftMin = times.length > 1 ? (times[times.length - 1] - times[0]) / 60000 + 3 : all.length * 2.5;
  const mins = Math.max(1, Math.round(liftMin + cardioMin));
  const names = (s0.days || []).map(splitLabel);
  const firstT = times.length ? times[0] : cardio.length ? new Date(cardio[0].t).getTime() - (cardio[0].min || 0) * 60000 : Date.now();
  const kg = latestBw();
  return {
    date, exs, cardio, mins, sets: all.length,
    volume: all.reduce((a, x) => a + (x.w || 0) * (x.r || 0), 0),
    kcal: kg ? Math.round(liftMin / 60 * 5 * kg + cardio.reduce((a, c) => a + (c.kcal || (CARDIO_MET[c.type] || 7) * kg * (c.min || 0) / 60), 0)) : 0,
    title: o.title || names.map(n => n[1]).join(" + ") || "Training",
    scheme: (o.scheme || [...new Set(names.map(n => n[0]))].join(", ")).replace(/^Programma: /, ""),
    prs: o.prs || [], start: new Date(firstT), km: cardio.reduce((a, c) => a + (c.km || (c.m ? c.m / 1000 : 0)), 0)
  };
}
// "Lopen: 30 min · 5 km" with the type and each part translated
const cardioParts = c => { const t = cardioText(c), i = t.indexOf(": "); return [tr(i < 0 ? c.type : t.slice(0, i)), (i < 0 ? t : t.slice(i + 2)).split(" · ").map(x => tr(x)).join(" · ")]; };
const topSet = sets => sets.reduce((a, b) => (b.w > a.w || (b.w === a.w && (b.r || 0) > (a.r || 0))) ? b : a);
function summaryText(sm){
  const L = t => tr(t);
  const lines = [`${L("Training")} ${shortDate(sm.date)} · ${sm.scheme ? sm.scheme + " · " : ""}${sm.title}`];
  sm.exs.forEach(e => lines.push(`- ${e.name}: ${tr(`${e.sets.length} ${e.sets.length === 1 ? "set" : "sets"}`)}, ${L("Beste:")} ${tr(setText(topSet(e.sets)))}`));
  sm.cardio.forEach(c => lines.push(`- ${cardioParts(c).join(": ")}`));
  const tot = [sm.volume ? tr(`${fw(Math.round(sm.volume))} getild`) : "", tr(`${sm.mins} min`), sm.kcal ? `±${sm.kcal} kcal` : ""].filter(Boolean).join(" · ");
  lines.push(`${L("Totaal:")} ${tot}`);
  if (sm.prs.length) lines.push(`${L("▲ Nieuw record:")} ${sm.prs.join(", ")}`);
  lines.push(L("Gelogd met Fitness Progress Tracker"));
  return lines.join("\n");
}
function shareButtons(){
  return `<div class="share">
    <div class="share-row">
      <button class="share-btn sb-ig" type="button" data-sh="ig"><span aria-hidden="true">◎</span> Instagram</button>
      <button class="share-btn sb-strava" type="button" data-sh="strava"><span aria-hidden="true">▲</span> Strava</button>
      <button class="share-btn sb-wa" type="button" data-sh="wa"><span aria-hidden="true">✆</span> WhatsApp</button>
      <button class="share-btn" type="button" data-sh="copy"><span aria-hidden="true">⧉</span> Kopieer</button>
    </div>
    <div class="share-out" hidden></div>
    <textarea class="share-text" rows="5" readonly hidden></textarea>
  </div>`;
}
// Hand a file to the viewer: the artifact's save dialog on claude.ai, a normal download on the stand-alone site.
async function saveFile(name, blob){
  if (!STANDALONE && window.claude && claude.use){
    try { const d = await claude.use("downloads"); if (d){ await d.save({ filename: name, data: blob }); return true; } }
    catch (e) { if (e && e.code === "declined") return false; }
  }
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  return true;
}
function copyText(text, box){
  const done = () => toast("Samenvatting gekopieerd. Plak ze in een bericht.");
  const fallback = () => { const t = box.querySelector(".share-text"); t.value = text; t.hidden = false; t.focus(); t.select(); toast("Selecteer de tekst en kopieer hem."); };
  try { navigator.clipboard.writeText(text).then(done, fallback); } catch { fallback(); }
}
function wireShare(root, sm){
  const text = summaryText(sm), out = root.querySelector(".share-out");
  root.querySelectorAll("[data-sh]").forEach(b => b.onclick = async () => {
    const what = b.dataset.sh;
    if (what === "copy") return copyText(text, root);
    if (what === "wa") return void window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank", "noopener");
    if (what === "strava") return showStrava(out, sm, text);
    if (what === "ig") return shareStory(out, sm);
  });
}

// Instagram: an animated retro story (1080×1920) in one of three styles, shared as a video or a photo.
const STORY_W = 1080, STORY_H = 1920, STORY_DUR = 6, STORY_HOLD = 1.5;
const clamp01 = v => Math.max(0, Math.min(1, v));
const easeOut = u => 1 - Math.pow(1 - clamp01(u), 3);
const phase = (t, a, b) => clamp01((t - a) / (b - a));
const popIn = u => { u = clamp01(u); return u === 0 || u === 1 ? u : Math.pow(2, -10 * u) * Math.sin((u * 10 - .75) * 2 * Math.PI / 3) + 1; };
// Largest font size (down from `size`) at which the text fits in maxW; `font` is like "900 {s}px Fraunces".
function fitFont(x, text, font, size, maxW){ let z = size; x.font = font.replace("{s}", z); while (z > 14 && x.measureText(text).width > maxW){ z -= 2; x.font = font.replace("{s}", z); } return z; }
function storyData(sm){
  const cardioMin = Math.round(sm.cardio.reduce((a, c) => a + (c.min || 0), 0));
  const tiles = [{ lab: tr("Duur"), v: sm.mins, unit: "min" },
    sm.sets ? { lab: tr("Sets"), v: sm.sets, unit: "" } : { lab: tr("Cardio"), v: cardioMin, unit: "min" },
    sm.volume ? { lab: tr("Volume"), v: Math.round(toU(sm.volume)), unit: U() } : sm.km ? { lab: tr("Afstand"), v: Math.round(sm.km * 10) / 10, unit: "km", dec: true } : { lab: tr("Calorieën"), v: sm.kcal || 0, unit: "kcal" }];
  const rows = sm.exs.map(e => [e.name, tr(setText(topSet(e.sets))), tr(`${e.sets.length} ${e.sets.length === 1 ? "set" : "sets"}`)])
    .concat(sm.cardio.map(c => { const [n, v] = cardioParts(c); return [n, v, ""]; }));
  return { title: tr("Training klaar"), date: longDate(sm.date), sub: [sm.scheme, sm.title].filter(Boolean).join(" · "), tiles, rows,
    pr: sm.prs.join(", "), prLabel: tr("Nieuw record"), rtl: document.documentElement.dir === "rtl" };
}
const countText = (tile, u) => { const v = tile.v * easeOut(u); return tile.dec ? fmt(Math.round(v * 10) / 10) : fmt(Math.round(v)); };
async function storyAssets(){
  if (storyAssets.cache) return storyAssets.cache;
  try { await Promise.all(["900 80px Fraunces", "700 40px Inter", "500 34px Inter", "italic 800 80px 'Barlow Condensed'", "32px 'Press Start 2P'", "800 60px Orbitron"].map(f => document.fonts.load(f))); } catch {}
  let logo = null; try { logo = await logoImage(); } catch {}
  const layer = draw => { const c = document.createElement("canvas"); c.width = STORY_W; c.height = STORY_H; draw(c.getContext("2d")); return c; };
  const grain = layer(x => { for (let i = 0; i < 2600; i++){ x.fillStyle = `rgba(60,40,20,${Math.random() * .05})`; x.fillRect(Math.random() * STORY_W, Math.random() * STORY_H, 2, 2); } });
  const scan = layer(x => { x.fillStyle = "rgba(0,0,0,.22)"; for (let y = 0; y < STORY_H; y += 6) x.fillRect(0, y, STORY_W, 2); });
  const stars = Array.from({ length: 90 }, () => [Math.random() * STORY_W, Math.random() * STORY_H, 1 + Math.floor(Math.random() * 3), 40 + Math.random() * 160]);
  return storyAssets.cache = { logo, grain, scan, stars };
}
// Each style draws one frame at time t (seconds); the last frame is the photo.
const STORY_STYLES = {
  poster: { name: "Retro", sub: "Jaren 70", draw(x, t, d, A){
    const W = STORY_W, H = STORY_H, INK = "#2a1d14", MUTED = "#7b6552", EMBER = "#cf3f1f", MUST = "#d9971c", TEAL = "#157a6e", CARD = "#fffaf0";
    x.fillStyle = "#f3e8d2"; x.fillRect(0, 0, W, H);
    x.save(); x.translate(W / 2, 360); x.rotate(t * .12);
    for (let i = 0; i < 24; i++){ x.fillStyle = i % 2 ? "rgba(217,151,28,.16)" : "rgba(207,63,31,.09)"; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 1500, i * Math.PI / 12, (i + 1) * Math.PI / 12); x.closePath(); x.fill(); }
    x.restore();
    x.drawImage(A.grain, 0, 0);
    const stripes = (y, u) => [[EMBER, 0], [MUST, 14], [TEAL, 28]].forEach(([col, dy], i) => { x.fillStyle = col; x.fillRect(70, y + dy, Math.max(0, (W - 140) * easeOut(u - i * .12)), 9); });
    stripes(110, phase(t, 0, 1));
    const lp = popIn(phase(t, .15, 1.2));
    if (A.logo && lp > 0){ const z = 300 * lp; x.drawImage(A.logo, W / 2 - z / 2, 360 - z / 2, z, z); }
    x.textAlign = "center"; x.direction = d.rtl ? "rtl" : "ltr";
    const tp = easeOut(phase(t, .7, 1.4));
    x.globalAlpha = tp;
    x.fillStyle = INK; fitFont(x, d.title, "900 {s}px Fraunces", 96, W - 140); x.fillText(d.title, W / 2, 640 - (1 - tp) * 60);
    x.fillStyle = MUTED; x.font = "500 38px Inter"; x.fillText(d.date, W / 2, 705);
    x.fillStyle = EMBER; fitFont(x, d.sub, "700 {s}px Inter", 44, W - 160); x.fillText(d.sub, W / 2, 770);
    x.globalAlpha = 1;
    const tw = (W - 200) / 3;
    d.tiles.forEach((tl, i) => {
      const u = phase(t, 1.2 + i * .2, 1.8 + i * .2); if (!u) return;
      const k = popIn(u), tx = 70 + i * (tw + 30), ty = 830, cx = tx + tw / 2;
      x.save(); x.translate(cx, ty + 110); x.scale(k, k); x.translate(-cx, -(ty + 110));
      x.fillStyle = "rgba(42,29,20,.14)"; roundRect(x, tx + 8, ty + 8, tw, 220, 28); x.fill();
      x.fillStyle = CARD; roundRect(x, tx, ty, tw, 220, 28); x.fill();
      const lab = tl.lab.toUpperCase(), val = countText(tl, phase(t, 1.3 + i * .2, 2.8 + i * .2));
      x.fillStyle = MUTED; fitFont(x, lab, "700 {s}px Inter", 30, tw - 24); x.fillText(lab, cx, ty + 60);
      x.fillStyle = i === 2 ? TEAL : INK; fitFont(x, val, "900 {s}px Fraunces", 84, tw - 24); x.fillText(val, cx, ty + 155);
      x.fillStyle = MUTED; x.font = "500 30px Inter"; x.fillText(tl.unit, cx, ty + 198);
      x.restore();
    });
    const max = d.pr ? 5 : 6, lx = d.rtl ? W - 90 : 90, rx = d.rtl ? 90 : W - 90;
    d.rows.slice(0, max).forEach(([n, v, sets], i) => {
      const u = easeOut(phase(t, 2.4 + i * .18, 2.9 + i * .18)); if (!u) return;
      const y = 1140 + i * 80, off = (1 - u) * 120 * (d.rtl ? -1 : 1), vv = [v, sets].filter(Boolean).join("  ·  ");
      x.globalAlpha = u;
      x.fillStyle = INK; x.textAlign = d.rtl ? "right" : "left"; fitFont(x, n, "700 {s}px Inter", 40, 540); x.fillText(n, lx + off, y);
      x.fillStyle = MUTED; x.textAlign = d.rtl ? "left" : "right"; fitFont(x, vv, "500 {s}px Inter", 34, 360); x.fillText(vv, rx + off, y);
      x.fillStyle = "rgba(42,29,20,.12)"; x.fillRect(90, y + 26, W - 180, 2);
      x.globalAlpha = 1;
    });
    x.textAlign = "center";
    if (d.rows.length > max && t > 3.4){ x.fillStyle = MUTED; x.font = "500 32px Inter"; x.fillText(`+${d.rows.length - max}`, W / 2, 1140 + max * 80); }
    if (d.pr && t > 3.6){
      const k = 1 + .03 * Math.sin((t - 3.6) * 6) * (1 - phase(t, 5, 6)), y = 1140 + max * 80 + 40;
      x.save(); x.translate(W / 2, y + 48); x.scale(k * popIn(phase(t, 3.6, 4.2)), k * popIn(phase(t, 3.6, 4.2))); x.translate(-W / 2, -(y + 48));
      x.fillStyle = EMBER; roundRect(x, 90, y, W - 180, 96, 48); x.fill();
      const txt = `▲ ${d.prLabel}: ${d.pr}`; x.fillStyle = "#fff"; fitFont(x, txt, "800 {s}px Inter", 40, W - 240); x.fillText(txt, W / 2, y + 62);
      x.restore();
    }
    stripes(H - 230, phase(t, .3, 1.3));
    x.globalAlpha = easeOut(phase(t, .5, 1.5));
    x.fillStyle = INK; x.font = "900 54px Fraunces"; x.fillText("Fitness Progress Tracker", W / 2, H - 120);
    x.fillStyle = MUTED; x.font = "500 32px Inter"; x.fillText(APP_HOST, W / 2, H - 70);
    x.globalAlpha = 1;
  } },
  plain: { name: "Standaard", sub: "Strak en sportief", draw(x, t, d, A){
    const W = STORY_W, H = STORY_H, INK = "#0f172a", MUTED = "#64748b", ORANGE = "#ff4d17", BLUE = "#1d64f2", LINE = "#dde3ea";
    const rtl = d.rtl, lx = rtl ? W - 80 : 80, al = rtl ? "right" : "left", ar = rtl ? "left" : "right", sx = rtl ? -1 : 1;
    x.fillStyle = "#eef2f6"; x.fillRect(0, 0, W, H);
    const bp = easeOut(phase(t, 0, .9));
    x.fillStyle = ORANGE; x.beginPath(); x.moveTo(0, 0); x.lineTo(W * 1.2 * bp, 0); x.lineTo(W * 1.2 * bp - 300, 600); x.lineTo(0, 660); x.closePath(); x.fill();
    x.fillStyle = BLUE; x.beginPath(); x.moveTo(W, H); x.lineTo(W - W * .6 * bp, H); x.lineTo(W, H - 380 * bp); x.closePath(); x.fill();
    x.direction = rtl ? "rtl" : "ltr";
    const lp = popIn(phase(t, .1, 1));
    if (A.logo && lp > 0){ const z = 140 * lp, lx0 = rtl ? W - 80 - 140 : 80; x.drawImage(A.logo, lx0 + (140 - z) / 2, 90 + (140 - z) / 2, z, z); }
    const tp = easeOut(phase(t, .45, 1.2)), title = d.title.toUpperCase();
    x.globalAlpha = tp; x.textAlign = al; x.fillStyle = "#fff";
    fitFont(x, title, "italic 800 {s}px 'Barlow Condensed'", 170, W - 160); x.fillText(title, lx - (1 - tp) * 90 * sx, 420);
    x.font = "600 40px Inter"; x.fillText(d.date, lx, 490);
    x.fillStyle = INK; fitFont(x, d.sub, "800 {s}px Inter", 46, W - 160); x.fillText(d.sub, lx, 730);
    x.globalAlpha = 1;
    const tw = (W - 200) / 3;
    d.tiles.forEach((tl, i) => {
      const u = easeOut(phase(t, 1.1 + i * .18, 1.7 + i * .18)); if (!u) return;
      const tx = rtl ? W - 70 - (i + 1) * tw - i * 30 : 70 + i * (tw + 30), ty = 790 + (1 - u) * 80, cx = tx + tw / 2;
      x.globalAlpha = u; x.save(); x.shadowColor = "rgba(15,23,42,.12)"; x.shadowBlur = 36; x.shadowOffsetY = 14;
      x.fillStyle = "#fff"; roundRect(x, tx, ty, tw, 230, 26); x.fill(); x.restore();
      x.fillStyle = i === 0 ? ORANGE : i === 1 ? BLUE : INK; x.fillRect(tx + 26, ty + 26, 46, 8);
      x.textAlign = "center";
      const lab = tl.lab.toUpperCase(), val = countText(tl, phase(t, 1.2 + i * .18, 2.7 + i * .18));
      x.fillStyle = MUTED; fitFont(x, lab, "700 {s}px Inter", 28, tw - 30); x.fillText(lab, cx, ty + 80);
      x.fillStyle = INK; fitFont(x, val, "italic 800 {s}px 'Barlow Condensed'", 112, tw - 30); x.fillText(val, cx, ty + 175);
      x.fillStyle = MUTED; x.font = "600 28px Inter"; x.fillText(tl.unit, cx, ty + 212);
      x.globalAlpha = 1;
    });
    const max = d.pr ? 5 : 6;
    d.rows.slice(0, max).forEach(([n, v, sets], i) => {
      const u = easeOut(phase(t, 2.3 + i * .16, 2.8 + i * .16)); if (!u) return;
      const y = 1150 + i * 84, off = (1 - u) * 100 * sx, vv = [v, sets].filter(Boolean).join("  ·  ");
      x.globalAlpha = u;
      x.fillStyle = i % 2 ? BLUE : ORANGE; x.beginPath(); x.arc(lx + off + 8 * sx, y - 13, 8, 0, Math.PI * 2); x.fill();
      x.fillStyle = INK; x.textAlign = al; fitFont(x, n, "700 {s}px Inter", 40, 520); x.fillText(n, lx + off + 34 * sx, y);
      x.fillStyle = MUTED; x.textAlign = ar; fitFont(x, vv, "600 {s}px Inter", 34, 360); x.fillText(vv, (rtl ? 80 : W - 80) + off, y);
      x.fillStyle = LINE; x.fillRect(80, y + 28, W - 160, 3);
      x.globalAlpha = 1;
    });
    x.textAlign = "center";
    if (d.rows.length > max && t > 3.3){ x.fillStyle = MUTED; x.font = "600 32px Inter"; x.fillText(`+${d.rows.length - max}`, W / 2, 1150 + max * 84); }
    if (d.pr && t > 3.5){
      const k = popIn(phase(t, 3.5, 4.1)), y = 1150 + max * 84 + 40;
      x.save(); x.translate(W / 2, y + 48); x.scale(k, k); x.translate(-W / 2, -(y + 48));
      x.fillStyle = BLUE; roundRect(x, 80, y, W - 160, 96, 20); x.fill();
      const txt = `▲ ${d.prLabel}: ${d.pr}`; x.fillStyle = "#fff"; fitFont(x, txt, "800 {s}px Inter", 40, W - 220); x.fillText(txt, W / 2, y + 62);
      x.restore();
    }
    x.globalAlpha = easeOut(phase(t, .5, 1.5)); x.textAlign = al;
    x.fillStyle = INK; x.font = "italic 800 64px 'Barlow Condensed'"; x.fillText("FITNESS PROGRESS TRACKER", lx, H - 130);
    x.fillStyle = MUTED; x.font = "600 32px Inter"; x.fillText(APP_HOST, lx, H - 80);
    x.globalAlpha = 1;
  } },
  future: { name: "Future", sub: "Neon", draw(x, t, d, A){
    const W = STORY_W, H = STORY_H, CY = "#22d3ee", VI = "#8b5cf6", PK = "#f472b6", INK = "#e8ecff", MUTED = "#9aa3c7";
    const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#060818"); bg.addColorStop(.55, "#120a2e"); bg.addColorStop(1, "#1b0b3a");
    x.fillStyle = bg; x.fillRect(0, 0, W, H);
    A.stars.forEach(([sx0, sy, sz, sp], i) => { x.fillStyle = `rgba(200,220,255,${.25 + .25 * Math.sin(t * 2 + i)})`; x.fillRect(sx0, sy * .7, sz, sz); });
    // neon grid floor moving towards you
    const hz = 1480;
    x.save(); x.beginPath(); x.rect(0, hz, W, H - hz); x.clip();
    x.strokeStyle = "rgba(139,92,246,.55)"; x.lineWidth = 2; x.shadowColor = VI; x.shadowBlur = 12;
    for (let i = -12; i <= 12; i++){ x.beginPath(); x.moveTo(W / 2, hz); x.lineTo(W / 2 + i * 180, H); x.stroke(); }
    for (let j = 0; j < 14; j++){ const z = ((j + (t * .8) % 1) / 14), y = hz + (H - hz) * z * z; x.beginPath(); x.moveTo(0, y); x.lineTo(W, y); x.stroke(); }
    x.restore();
    const glow = (col, b) => { x.shadowColor = col; x.shadowBlur = b; };
    x.textAlign = "center"; x.direction = d.rtl ? "rtl" : "ltr";
    // logo in a turning neon ring
    const lp = popIn(phase(t, .1, 1.1));
    x.save(); x.translate(W / 2, 330); x.rotate(t * .8);
    const rg = x.createLinearGradient(-170, 0, 170, 0); rg.addColorStop(0, CY); rg.addColorStop(1, PK);
    x.strokeStyle = rg; x.lineWidth = 8; x.setLineDash([60, 26]); glow(CY, 24); x.beginPath(); x.arc(0, 0, 170 * Math.max(.01, lp), 0, Math.PI * 2); x.stroke();
    x.restore(); x.shadowBlur = 0;
    if (A.logo && lp > 0){ const z = 230 * lp; x.drawImage(A.logo, W / 2 - z / 2, 330 - z / 2, z, z); }
    const tp = easeOut(phase(t, .6, 1.3)), title = d.title.toUpperCase();
    x.globalAlpha = tp;
    const tg = x.createLinearGradient(140, 0, W - 140, 0); tg.addColorStop(0, CY); tg.addColorStop(.5, VI); tg.addColorStop(1, PK);
    x.fillStyle = tg; glow(VI, 30); fitFont(x, title, "800 {s}px Orbitron", 88, W - 140); x.fillText(title, W / 2, 640 + (1 - tp) * 40);
    x.shadowBlur = 0; x.fillStyle = MUTED; x.font = "500 36px Inter"; x.fillText(d.date, W / 2, 705);
    x.fillStyle = CY; glow(CY, 14); fitFont(x, d.sub, "700 {s}px Inter", 42, W - 160); x.fillText(d.sub, W / 2, 768); x.shadowBlur = 0;
    x.globalAlpha = 1;
    const tw = (W - 200) / 3;
    d.tiles.forEach((tl, i) => {
      const u = phase(t, 1.2 + i * .2, 1.8 + i * .2); if (!u) return;
      const k = popIn(u), tx = 70 + i * (tw + 30), ty = 830, cx = tx + tw / 2;
      x.save(); x.translate(cx, ty + 110); x.scale(k, k); x.translate(-cx, -(ty + 110));
      x.fillStyle = "rgba(255,255,255,.06)"; roundRect(x, tx, ty, tw, 220, 26); x.fill();
      const bg2 = x.createLinearGradient(tx, ty, tx + tw, ty + 220); bg2.addColorStop(0, CY); bg2.addColorStop(1, PK);
      x.strokeStyle = bg2; x.lineWidth = 3; glow(i === 1 ? VI : CY, 18); roundRect(x, tx, ty, tw, 220, 26); x.stroke(); x.shadowBlur = 0;
      const lab = tl.lab.toUpperCase(), val = countText(tl, phase(t, 1.3 + i * .2, 2.8 + i * .2));
      x.fillStyle = MUTED; fitFont(x, lab, "700 {s}px Inter", 28, tw - 24); x.fillText(lab, cx, ty + 60);
      x.fillStyle = INK; glow(CY, 16); fitFont(x, val, "800 {s}px Orbitron", 70, tw - 30); x.fillText(val, cx, ty + 150); x.shadowBlur = 0;
      x.fillStyle = MUTED; x.font = "500 28px Inter"; x.fillText(tl.unit, cx, ty + 195);
      x.restore();
    });
    const max = d.pr ? 5 : 6, lx = d.rtl ? W - 90 : 90, rx = d.rtl ? 90 : W - 90;
    d.rows.slice(0, max).forEach(([n, v, sets], i) => {
      const u = easeOut(phase(t, 2.4 + i * .18, 2.9 + i * .18)); if (!u) return;
      const y = 1140 + i * 80, vv = [v, sets].filter(Boolean).join("  ·  ");
      x.globalAlpha = u;
      x.fillStyle = INK; x.textAlign = d.rtl ? "right" : "left"; fitFont(x, n, "700 {s}px Inter", 38, 540); x.fillText(n, lx, y);
      x.fillStyle = CY; x.textAlign = d.rtl ? "left" : "right"; fitFont(x, vv, "600 {s}px Inter", 34, 360); x.fillText(vv, rx, y);
      const lg = x.createLinearGradient(90, 0, (W - 180) * u + 90, 0); lg.addColorStop(0, "rgba(34,211,238,.5)"); lg.addColorStop(1, "rgba(244,114,182,0)");
      x.fillStyle = lg; x.fillRect(90, y + 24, (W - 180) * u, 2);
      x.globalAlpha = 1;
    });
    x.textAlign = "center";
    if (d.rows.length > max && t > 3.4){ x.fillStyle = MUTED; x.font = "500 32px Inter"; x.fillText(`+${d.rows.length - max}`, W / 2, 1140 + max * 80); }
    if (d.pr && t > 3.6){
      const k = (1 + .03 * Math.sin((t - 3.6) * 6) * (1 - phase(t, 5, 6))) * popIn(phase(t, 3.6, 4.2)), y = 1140 + max * 80 + 40;
      x.save(); x.translate(W / 2, y + 48); x.scale(k, k); x.translate(-W / 2, -(y + 48));
      const pg = x.createLinearGradient(90, 0, W - 90, 0); pg.addColorStop(0, VI); pg.addColorStop(1, PK);
      x.fillStyle = pg; glow(PK, 30); roundRect(x, 90, y, W - 180, 96, 48); x.fill(); x.shadowBlur = 0;
      const txt = `▲ ${d.prLabel}: ${d.pr}`; x.fillStyle = "#fff"; fitFont(x, txt, "800 {s}px Inter", 40, W - 240); x.fillText(txt, W / 2, y + 62);
      x.restore();
    }
    // scan line
    const sy = (t * 420) % H; x.fillStyle = "rgba(34,211,238,.07)"; x.fillRect(0, sy, W, 60);
    x.globalAlpha = easeOut(phase(t, .5, 1.5));
    x.fillStyle = INK; glow(VI, 22); x.font = "800 44px Orbitron"; fitFont(x, "FITNESS PROGRESS TRACKER", "800 {s}px Orbitron", 44, W - 140); x.fillText("FITNESS PROGRESS TRACKER", W / 2, H - 120); x.shadowBlur = 0;
    x.fillStyle = MUTED; x.font = "500 32px Inter"; x.fillText(APP_HOST, W / 2, H - 70);
    x.globalAlpha = 1;
  } },
  arcade: { name: "Arcade", sub: "8-bit", draw(x, t, d, A){
    const W = STORY_W, H = STORY_H, PINK = "#ff3ea5", CYAN = "#29e6ff", YEL = "#ffe14d", GRN = "#3dff7a", PX = "'Press Start 2P', 'Courier New', monospace";
    const blink = (hz, from = 0) => t >= from && Math.floor((t - from) * hz * 2) % 2 === 0;
    x.fillStyle = "#0b0b2a"; x.fillRect(0, 0, W, H);
    A.stars.forEach(([sx, sy, sz, sp]) => { const yy = (sy + t * sp) % H; x.fillStyle = sz > 2 ? "#ffffff" : "rgba(255,255,255,.5)"; x.fillRect(Math.round(sx / 4) * 4, Math.round(yy / 4) * 4, sz * 3, sz * 3); });
    const tick = Math.floor(t * 6);
    for (let i = 0; i < W; i += 24){ x.fillStyle = (i / 24 + tick) % 2 ? PINK : CYAN; x.fillRect(i, 0, 24, 24); x.fillRect(W - 24 - i, H - 24, 24, 24); }
    for (let j = 24; j < H - 24; j += 24){ x.fillStyle = (j / 24 + tick) % 2 ? CYAN : PINK; x.fillRect(0, j, 24, 24); x.fillRect(W - 24, H - 24 - j, 24, 24); }
    x.textAlign = "center"; x.direction = d.rtl ? "rtl" : "ltr";
    const score = d.tiles[2];
    x.font = `26px ${PX}`; x.fillStyle = PINK; x.fillText("1UP", 170, 100); x.fillStyle = "#fff"; x.fillText("HI-SCORE", W / 2, 100); x.fillStyle = PINK; x.fillText("FPT", W - 170, 100);
    x.fillStyle = YEL; x.font = `34px ${PX}`; x.fillText(countText(score, phase(t, .5, 2.6)), W / 2, 152);
    // bouncing pixel dumbbell
    const DB = ["..XX........XX..", ".XXXX......XXXX.", ".XXXXOOOOOOXXXX.", ".XXXX......XXXX.", "..XX........XX.."];
    const bob = Math.round(Math.abs(Math.sin(t * 3)) * -30 / 6) * 6, px = 22, ox = W / 2 - 8 * px, oy = 230 + bob;
    DB.forEach((row, r) => [...row].forEach((ch, c) => { if (ch === ".") return; x.fillStyle = ch === "X" ? (r === 0 || r === 4 ? "#c21f7e" : PINK) : "#d8d8e8"; x.fillRect(ox + c * px, oy + r * px, px, px); }));
    // title, typed letter by letter
    const title = d.title.toUpperCase(), shown = title.slice(0, Math.ceil(title.length * phase(t, .4, 1.4)));
    const z = fitFont(x, title, `{s}px ${PX}`, 64, W - 140);
    x.font = `${z}px ${PX}`; x.fillStyle = PINK; x.fillText(shown, W / 2 + 7, 487); x.fillStyle = "#fff"; x.fillText(shown, W / 2, 480);
    if (t > 1.5 && (blink(2, 1.5) || t > 4)){ x.fillStyle = YEL; x.font = `40px ${PX}`; x.fillText("STAGE CLEAR!", W / 2, 570); }
    x.globalAlpha = easeOut(phase(t, 1, 1.6));
    x.fillStyle = CYAN; fitFont(x, d.sub.toUpperCase(), `{s}px ${PX}`, 26, W - 160); x.fillText(d.sub.toUpperCase(), W / 2, 640);
    x.fillStyle = "rgba(255,255,255,.75)"; fitFont(x, d.date.toUpperCase(), `{s}px ${PX}`, 20, W - 160); x.fillText(d.date.toUpperCase(), W / 2, 690);
    x.globalAlpha = 1;
    const tw = (W - 200) / 3;
    d.tiles.forEach((tl, i) => {
      if (t < 1.4 + i * .25) return;
      const tx = 70 + i * (tw + 30), ty = 760, cx = tx + tw / 2;
      x.fillStyle = "rgba(41,230,255,.08)"; x.fillRect(tx, ty, tw, 200);
      x.strokeStyle = CYAN; x.lineWidth = 6; x.strokeRect(tx + 3, ty + 3, tw - 6, 194);
      const lab = tl.lab.toUpperCase(), val = countText(tl, phase(t, 1.5 + i * .25, 3 + i * .25));
      x.fillStyle = PINK; fitFont(x, lab, `{s}px ${PX}`, 20, tw - 30); x.fillText(lab, cx, ty + 50);
      x.fillStyle = YEL; fitFont(x, val, `{s}px ${PX}`, 44, tw - 30); x.fillText(val, cx, ty + 125);
      x.fillStyle = "#fff"; x.font = `18px ${PX}`; x.fillText(tl.unit.toUpperCase(), cx, ty + 170);
    });
    // experience bar
    const xp = easeOut(phase(t, 2.6, 3.6)), bx = 100, by = 1010, bw = W - 200;
    x.fillStyle = "#fff"; x.font = `22px ${PX}`; x.textAlign = d.rtl ? "right" : "left"; x.fillText("EXP", d.rtl ? W - bx : bx, by - 16);
    x.fillStyle = "#1c1c4a"; x.fillRect(bx, by, bw, 40);
    for (let k = 0; k < 20; k++){ if (k / 20 < xp){ x.fillStyle = k % 2 ? GRN : "#2bd965"; x.fillRect(bx + 4 + k * (bw - 8) / 20, by + 4, (bw - 8) / 20 - 4, 32); } }
    x.textAlign = "center";
    if (xp >= 1 && blink(2.5, 3.6)){ x.fillStyle = GRN; x.font = `30px ${PX}`; x.fillText("LEVEL UP!", W / 2, by + 100); }
    // exercises, typed in like a high-score list
    const max = d.pr ? 6 : 7, lx = d.rtl ? W - 100 : 100, rx = d.rtl ? 100 : W - 100;
    d.rows.slice(0, max).forEach(([n, v], i) => {
      const u = phase(t, 3 + i * .2, 3.4 + i * .2); if (!u) return;
      const y = 1200 + i * 62, name = n.toUpperCase(), val = v.toUpperCase();
      x.textAlign = d.rtl ? "right" : "left"; x.fillStyle = i % 2 ? CYAN : "#fff";
      fitFont(x, name, `{s}px ${PX}`, 22, 560); x.fillText(name.slice(0, Math.ceil(name.length * u)), lx, y);
      x.textAlign = d.rtl ? "left" : "right"; x.fillStyle = YEL; fitFont(x, val, `{s}px ${PX}`, 22, 330); if (u >= 1) x.fillText(val, rx, y);
    });
    x.textAlign = "center";
    if (d.pr && t > 4.2 && blink(2, 4.2)){
      const y = 1200 + max * 62 + 40, txt = `★ ${d.prLabel.toUpperCase()} ★`;
      x.fillStyle = YEL; fitFont(x, txt, `{s}px ${PX}`, 34, W - 140); x.fillText(txt, W / 2, y);
      x.fillStyle = "#fff"; fitFont(x, d.pr.toUpperCase(), `{s}px ${PX}`, 20, W - 160); x.fillText(d.pr.toUpperCase(), W / 2, y + 48);
    }
    x.fillStyle = CYAN; x.font = `22px ${PX}`; x.fillText("FITNESS PROGRESS TRACKER", W / 2, H - 120);
    if (blink(1.2)){ x.fillStyle = "#fff"; x.font = `18px ${PX}`; x.fillText("INSERT COIN TO CONTINUE", W / 2, H - 72); }
    x.globalAlpha = .45; x.drawImage(A.scan, 0, 0); x.globalAlpha = 1;
  } },
  vhs: { name: "VHS", sub: "Jaren 80", draw(x, t, d, A){
    const W = STORY_W, H = STORY_H, HZ = 1180, PINK = "#ff2fd0", CYAN = "#3ef0ff", MONO = "'Courier New', monospace";
    const sky = x.createLinearGradient(0, 0, 0, HZ); sky.addColorStop(0, "#0e0221"); sky.addColorStop(.55, "#3b0a5c"); sky.addColorStop(1, "#ff3c78");
    x.fillStyle = sky; x.fillRect(0, 0, W, HZ);
    A.stars.slice(0, 50).forEach(([sx, sy, sz]) => { if (sy < HZ - 300){ x.fillStyle = `rgba(255,255,255,${.3 + .3 * Math.sin(t * 3 + sx)})`; x.fillRect(sx, sy * .6, sz * 2, sz * 2); } });
    // sun rising behind the horizon, with moving cut-outs
    const R = 300, sunY = HZ - 60 + (1 - easeOut(phase(t, 0, 1.8))) * 380;
    x.save(); x.beginPath(); x.rect(0, 0, W, HZ); x.clip();
    const sg = x.createLinearGradient(0, sunY - R, 0, sunY + R); sg.addColorStop(0, "#ffe45c"); sg.addColorStop(.55, "#ff8a3c"); sg.addColorStop(1, "#ff2d7a");
    x.shadowColor = "#ff5e9a"; x.shadowBlur = 60; x.fillStyle = sg; x.beginPath(); x.arc(W / 2, sunY, R, 0, Math.PI * 2); x.fill(); x.shadowBlur = 0;
    x.fillStyle = sky; for (let i = 0; i < 8; i++){ const yy = sunY + 10 + i * 38 + (t * 24) % 38; x.fillRect(W / 2 - R, yy, 2 * R, 3 + i * 2.5); }
    x.restore();
    // neon floor grid rushing towards you
    x.fillStyle = "#12011d"; x.fillRect(0, HZ, W, H - HZ);
    x.strokeStyle = PINK; x.lineWidth = 3; x.shadowColor = PINK; x.shadowBlur = 16;
    x.beginPath();
    for (let k = -14; k <= 14; k++){ x.moveTo(W / 2 + k * 36, HZ); x.lineTo(W / 2 + k * 300, H); }
    for (let i = 0; i < 16; i++){ const z = (i + (t * 1.4) % 1) / 16, y = HZ + (H - HZ) * z * z; x.moveTo(0, y); x.lineTo(W, y); }
    x.stroke(); x.shadowBlur = 0;
    x.fillStyle = "#ffd1f3"; x.fillRect(0, HZ - 2, W, 4);
    // chrome title with a glitch now and then
    const glitch = Math.floor(t * 12) % 29 === 0 ? 14 : 0, tp = easeOut(phase(t, .3, 1.1));
    x.textAlign = "center"; x.direction = d.rtl ? "rtl" : "ltr";
    const title = d.title.toUpperCase(), z = fitFont(x, title, "italic 800 {s}px 'Barlow Condensed', Inter, sans-serif", 150, W - 120);
    const ty = 330 - (1 - tp) * 200;
    x.globalAlpha = tp;
    const chrome = x.createLinearGradient(0, ty - z * .8, 0, ty + 10); chrome.addColorStop(0, "#ffffff"); chrome.addColorStop(.45, CYAN); chrome.addColorStop(.5, "#1b1464"); chrome.addColorStop(.75, "#ff8ee8"); chrome.addColorStop(1, "#ffffff");
    if (glitch){ x.fillStyle = "rgba(62,240,255,.7)"; x.fillText(title, W / 2 - glitch, ty); x.fillStyle = "rgba(255,47,208,.7)"; x.fillText(title, W / 2 + glitch, ty); }
    x.lineWidth = 10; x.strokeStyle = "#2a0845"; x.strokeText(title, W / 2, ty);
    x.shadowColor = PINK; x.shadowBlur = 30; x.fillStyle = chrome; x.fillText(title, W / 2, ty); x.shadowBlur = 0;
    x.fillStyle = CYAN; fitFont(x, d.sub, "italic 800 {s}px 'Barlow Condensed', Inter, sans-serif", 56, W - 160); x.fillText(d.sub, W / 2, 420);
    x.globalAlpha = 1;
    // VHS overlay text
    x.font = `bold 40px ${MONO}`; x.textAlign = "left"; x.fillStyle = "#fff"; x.shadowColor = "#000"; x.shadowBlur = 6;
    if (Math.floor(t * 2) % 2 === 0) x.fillText("▶ PLAY", 70, 110);
    x.textAlign = "right"; x.fillText("SP", W - 70, 110);
    x.textAlign = "left"; x.font = `bold 34px ${MONO}`;
    const sec = Math.floor(Math.min(t, STORY_DUR + STORY_HOLD)), stamp = `00:00:${String(sec).padStart(2, "0")}`;
    x.fillText(stamp, 70, H - 110); x.font = `bold 28px ${MONO}`; x.fillText(d.date.toUpperCase().slice(0, 30), 70, H - 66);
    x.shadowBlur = 0;
    // neon tiles
    const tw = (W - 200) / 3;
    d.tiles.forEach((tl, i) => {
      const u = easeOut(phase(t, 1.2 + i * .2, 1.7 + i * .2)); if (!u) return;
      const tx = 70 + i * (tw + 30), tyy = 500 + (1 - u) * 60, cx = tx + tw / 2;
      x.globalAlpha = u;
      x.fillStyle = "rgba(14,2,33,.55)"; roundRect(x, tx, tyy, tw, 210, 24); x.fill();
      x.strokeStyle = CYAN; x.lineWidth = 4; x.shadowColor = CYAN; x.shadowBlur = 18; roundRect(x, tx, tyy, tw, 210, 24); x.stroke(); x.shadowBlur = 0;
      const lab = tl.lab.toUpperCase(), val = countText(tl, phase(t, 1.3 + i * .2, 2.8 + i * .2));
      x.textAlign = "center"; x.fillStyle = "#ff8ee8"; fitFont(x, lab, "700 {s}px Inter", 28, tw - 24); x.fillText(lab, cx, tyy + 55);
      x.fillStyle = "#fff"; fitFont(x, val, "italic 800 {s}px 'Barlow Condensed', Inter, sans-serif", 92, tw - 24); x.fillText(val, cx, tyy + 150);
      x.fillStyle = CYAN; x.font = "600 28px Inter"; x.fillText(tl.unit, cx, tyy + 192);
      x.globalAlpha = 1;
    });
    // exercise list on a dark panel over the grid
    const max = d.pr ? 4 : 5, rows = d.rows.slice(0, max);
    if (rows.length && t > 2.3){
      const pu = easeOut(phase(t, 2.3, 2.8)), py = 1240, ph = rows.length * 76 + 40;
      x.globalAlpha = pu; x.fillStyle = "rgba(10,0,25,.72)"; roundRect(x, 70, py, W - 140, ph, 24); x.fill(); x.globalAlpha = 1;
      const lx = d.rtl ? W - 110 : 110, rx = d.rtl ? 110 : W - 110;
      rows.forEach(([n, v], i) => {
        const u = easeOut(phase(t, 2.5 + i * .18, 2.9 + i * .18)); if (!u) return;
        const y = py + 66 + i * 76; x.globalAlpha = u;
        x.textAlign = d.rtl ? "right" : "left"; x.fillStyle = "#fff"; fitFont(x, n, "700 {s}px Inter", 38, 520); x.fillText(n, lx, y);
        x.textAlign = d.rtl ? "left" : "right"; x.fillStyle = CYAN; fitFont(x, v, "600 {s}px Inter", 34, 340); x.fillText(v, rx, y);
        x.globalAlpha = 1;
      });
      if (d.pr && t > 3.8){
        const y = py + ph + 30, txt = `★ ${d.prLabel}: ${d.pr}`;
        x.globalAlpha = easeOut(phase(t, 3.8, 4.3)); x.textAlign = "center"; x.shadowColor = PINK; x.shadowBlur = 24;
        x.fillStyle = "#ffe45c"; fitFont(x, txt, "italic 800 {s}px 'Barlow Condensed', Inter, sans-serif", 60, W - 160); x.fillText(txt, W / 2, y + 40);
        x.shadowBlur = 0; x.globalAlpha = 1;
      }
    }
    x.textAlign = "right"; x.fillStyle = "#fff"; x.font = "italic 800 40px 'Barlow Condensed', Inter, sans-serif"; x.shadowColor = PINK; x.shadowBlur = 16;
    x.fillText("FITNESS PROGRESS TRACKER", W - 70, H - 72); x.shadowBlur = 0;
    // tape artefacts: scanlines and a tracking band rolling down
    x.globalAlpha = .5; x.drawImage(A.scan, 0, 0); x.globalAlpha = 1;
    const band = (t * 520) % (H + 200) - 100; x.fillStyle = "rgba(255,255,255,.06)"; x.fillRect(0, band, W, 40); x.fillStyle = "rgba(255,255,255,.1)"; x.fillRect(0, band + 18, W, 3);
  } }
};
const storyMime = () => window.MediaRecorder && MediaRecorder.isTypeSupported ? ["video/mp4;codecs=avc1.42E01E", "video/mp4", "video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"].find(m => MediaRecorder.isTypeSupported(m)) : null;
// Instagram: a story fills the screen (9:16); a feed post is at most 4:5, so there the story sits as a card
// on a blurred copy of itself and Instagram never has to crop it.
const STORY_FMTS = { story: [1080, 1920], post: [1080, 1350] };
const storyStyleNow = () => { const app = { retro: "poster", plain: "plain", future: "future" }[styleNow()] || "poster", st = lsGet("ppl.storyStyle", app); return STORY_STYLES[st] ? st : app; };
// One frame in either format; k scales it down for the small previews.
function storyFrame(x, fmt, style, t, d, A, k = 1){
  const draw = STORY_STYLES[style].draw;
  x.setTransform(k, 0, 0, k, 0, 0);
  if (fmt !== "post"){ draw(x, t, d, A); return; }
  const [W, H] = STORY_FMTS.post, sc = (H - 70) / STORY_H, cw = STORY_W * sc, ch = STORY_H * sc, cx = (W - cw) / 2, cy = 35;
  // backdrop: the last frame shrunk to a few pixels and blown up again, a blur that works in every browser
  const bk = d.back || (d.back = {});
  if (!bk[style]){ const c = document.createElement("canvas"); c.width = 27; c.height = 48; const bx = c.getContext("2d"); bx.setTransform(27 / STORY_W, 0, 0, 27 / STORY_W, 0, 0); draw(bx, STORY_DUR, d, A); bk[style] = c; }
  x.imageSmoothingEnabled = true; x.imageSmoothingQuality = "high";
  const crop = 48 * H / STORY_H;
  x.drawImage(bk[style], 0, (48 - crop) / 2, 27, crop, -60, -60, W + 120, H + 120);
  x.fillStyle = "rgba(0,0,0,.22)"; x.fillRect(0, 0, W, H);
  // the story itself, drawn at the card's size so it stays sharp
  const ow = Math.round(cw * k), oh = Math.round(ch * k), offs = A.offs || (A.offs = {});
  let off = offs[ow]; if (!off){ off = offs[ow] = document.createElement("canvas"); off.width = ow; off.height = oh; }
  const ox = off.getContext("2d"); ox.setTransform(ow / STORY_W, 0, 0, ow / STORY_W, 0, 0); draw(ox, t, d, A);
  x.save(); x.shadowColor = "rgba(0,0,0,.45)"; x.shadowBlur = 50 * k; x.shadowOffsetY = 16 * k; x.fillStyle = "#000"; roundRect(x, cx, cy, cw, ch, 34); x.fill(); x.restore();
  x.save(); roundRect(x, cx, cy, cw, ch, 34); x.clip(); x.drawImage(off, cx, cy, cw, ch); x.restore();
}
// Plays the animation in real time on a hidden canvas and records it.
async function recordStory(style, fmt, d, A, onTick){
  const mime = storyMime(); if (!mime) throw new Error("norec");
  const [W, H] = STORY_FMTS[fmt], c = document.createElement("canvas"); c.width = W; c.height = H;
  const x = c.getContext("2d");
  storyFrame(x, fmt, style, 0, d, A);
  const stream = c.captureStream(30), rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 8e6 }), parts = [];
  rec.ondataavailable = e => { if (e.data && e.data.size) parts.push(e.data); };
  const stopped = new Promise(res => { rec.onstop = res; });
  rec.start(250);
  const total = STORY_DUR + STORY_HOLD, t0 = performance.now();
  await new Promise(res => {
    const step = () => { const t = (performance.now() - t0) / 1000; storyFrame(x, fmt, style, Math.min(t, STORY_DUR), d, A); onTick(Math.max(1, Math.ceil(total - t))); if (t < total) requestAnimationFrame(step); else res(); };
    requestAnimationFrame(step);
  });
  rec.stop(); await stopped; stream.getTracks().forEach(k => k.stop());
  const type = mime.split(";")[0];
  return { blob: new Blob(parts, { type }), ext: type === "video/mp4" ? "mp4" : "webm", type };
}
async function storyPhoto(style, fmt, d, A){
  const [W, H] = STORY_FMTS[fmt], c = document.createElement("canvas"); c.width = W; c.height = H;
  storyFrame(c.getContext("2d"), fmt, style, STORY_DUR, d, A);
  return new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error("png")), "image/png"));
}
// Phone share sheet when it can take the file, otherwise save it.
async function shareOrSave(file, okMsg){
  if (navigator.canShare && navigator.canShare({ files: [file] })){
    try { await navigator.share({ files: [file], text: "#FitnessProgressTracker" }); return; }
    catch (e) { if (e && e.name === "AbortError") return; }
  }
  if (await saveFile(file.name, file)) toast(okMsg);
}
const FMT_NOTE = { story: "Vult het hele scherm in je Instagram-verhaal.", post: "Past zonder bijsnijden in je Instagram-feed. Ook handig als foto bij je Strava-activiteit." };
async function shareStory(out, sm){
  const d = storyData(sm), dpr = Math.min(2, window.devicePixelRatio || 1), cwid = Math.round(108 * dpr);
  const chOf = f => Math.round(cwid * STORY_FMTS[f][1] / STORY_FMTS[f][0]);
  let style = storyStyleNow(), fmt = STORY_FMTS[lsGet("ppl.storyFmt", "story")] ? lsGet("ppl.storyFmt", "story") : "story", video = null;
  out.hidden = false;
  out.innerHTML = `<p class="label">Waar deel je het?</p>
    <div class="seg sp-fmt" aria-label="Formaat"><button type="button" data-fmt="story">Verhaal 9:16</button><button type="button" data-fmt="post">Bericht 4:5</button></div>
    <p class="note sp-fmt-note"></p>
    <p class="label">Kies je stijl</p>
    <div class="story-pick" role="radiogroup" aria-label="Stijl van je verhaal">${Object.entries(STORY_STYLES).map(([k, o]) => `<button type="button" class="sp-opt" role="radio" data-st="${k}" aria-checked="${k === style}"><canvas data-st="${k}" width="${cwid}" height="${chOf(fmt)}" aria-hidden="true"></canvas><b>${esc(o.name)}</b><small>${esc(o.sub)}</small></button>`).join("")}</div>
    <div class="share-row sp-make">${storyMime() ? `<button class="save" type="button" data-mk="video">Maak video</button>` : ""}<button class="share-btn" type="button" data-mk="img">Foto delen</button></div>
    <p class="note sp-status" aria-live="polite">${storyMime() ? "Een video van 7 seconden voor je verhaal, of de foto van het eindbeeld." : "Video maken lukt niet in deze browser; deel de foto."}</p>
    <div class="share-row sp-done" hidden></div>`;
  const A = await storyAssets(), canvases = [...out.querySelectorAll("canvas")], status = out.querySelector(".sp-status"), doneRow = out.querySelector(".sp-done");
  const setFmt = f => {
    fmt = f; video = null; doneRow.hidden = true;
    out.querySelectorAll("[data-fmt]").forEach(b => b.setAttribute("aria-pressed", b.dataset.fmt === f));
    out.querySelector(".sp-fmt-note").textContent = tr(FMT_NOTE[f]);
    out.querySelector(".story-pick").classList.toggle("post", f === "post");
    canvases.forEach(c => { c.height = chOf(f); });
  };
  setFmt(fmt);
  out.querySelectorAll("[data-fmt]").forEach(b => b.onclick = () => { devSet("ppl.storyFmt", b.dataset.fmt); setFmt(b.dataset.fmt); });
  // live previews, about 30 frames a second, looping; one still frame when you prefer less motion
  let last = 0; const t0 = performance.now();
  const frame = now => {
    if (!canvases[0].isConnected || out.hidden) return;
    if (now - last > 33){
      last = now;
      const t = reduceMotion ? STORY_DUR : Math.min(STORY_DUR, ((now - t0) / 1000) % (STORY_DUR + STORY_HOLD));
      canvases.forEach(c => storyFrame(c.getContext("2d"), fmt, c.dataset.st, t, d, A, c.width / STORY_W));
    }
    if (!reduceMotion) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  out.querySelectorAll(".sp-opt").forEach(b => b.onclick = () => {
    style = b.dataset.st; devSet("ppl.storyStyle", style); video = null; doneRow.hidden = true;
    out.querySelectorAll(".sp-opt").forEach(o => o.setAttribute("aria-checked", o === b));
  });
  const busy = on => out.querySelectorAll(".sp-make button, .sp-opt, [data-fmt]").forEach(b => { b.disabled = on; });
  const name = ext => `fpt-${sm.date}${fmt === "post" ? "-post" : ""}.${ext}`;
  const mk = out.querySelector('[data-mk="video"]');
  if (mk) mk.onclick = async () => {
    busy(true); doneRow.hidden = true;
    try { video = await recordStory(style, fmt, d, A, n => { status.textContent = `Video maken… nog ${n} s`; }); }
    catch { status.textContent = "Video maken lukte niet; deel de foto."; busy(false); return; }
    busy(false);
    status.textContent = video.ext === "mp4" ? "Je video is klaar." : "Je video is klaar (.webm). Instagram aanvaardt die niet altijd; lukt het niet, deel dan de foto.";
    doneRow.innerHTML = `<button class="save" type="button" data-v="share">Video delen</button><button class="share-btn" type="button" data-v="save">Video bewaren</button>`;
    doneRow.hidden = false;
    const v = video, file = () => new File([v.blob], name(v.ext), { type: v.type });
    doneRow.querySelector('[data-v="share"]').onclick = () => shareOrSave(file(), "Video bewaard. Open Instagram om ze te delen.");
    doneRow.querySelector('[data-v="save"]').onclick = async () => { if (await saveFile(file().name, v.blob)) toast("Video bewaard. Open Instagram om ze te delen."); };
  };
  out.querySelector('[data-mk="img"]').onclick = async () => {
    let blob; try { blob = await storyPhoto(style, fmt, d, A); } catch { toast("Afbeelding maken lukte niet."); return; }
    shareOrSave(new File([blob], name("png"), { type: "image/png" }), "Afbeelding bewaard. Open Instagram om ze te delen.");
  };
  out.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
}
// A 4:5 photo of the workout to add to a Strava activity (Strava has no way for apps to add photos).
async function stravaPhoto(sm){
  let blob; try { blob = await storyPhoto(storyStyleNow(), "post", storyData(sm), await storyAssets()); } catch { toast("Afbeelding maken lukte niet."); return; }
  shareOrSave(new File([blob], `fpt-${sm.date}-strava.png`, { type: "image/png" }), "Foto bewaard. Voeg ze in Strava toe aan je activiteit.");
}
function logoImage(){
  const svg = document.querySelector(".brand .logo").cloneNode(true);
  svg.querySelectorAll("text").forEach(t => t.remove());
  svg.setAttribute("width", "400"); svg.setAttribute("height", "400"); svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.querySelectorAll(".logo-db").forEach(g => g.setAttribute("fill", "#ffffff"));
  svg.querySelectorAll(".logo-ring").forEach(c => { c.setAttribute("fill", "none"); c.setAttribute("stroke", "#fdf3dc"); c.setAttribute("stroke-width", ".8"); });
  svg.querySelectorAll(".logo-arrow-edge,.logo-arrow").forEach(pth => { pth.setAttribute("fill", "none"); pth.setAttribute("stroke-linecap", "round"); pth.setAttribute("stroke-linejoin", "round"); });
  svg.querySelectorAll(".logo-arrow-edge").forEach(pth => { pth.setAttribute("stroke", "#179a45"); pth.setAttribute("stroke-width", "5"); });
  svg.querySelectorAll(".logo-arrow").forEach(pth => { pth.setAttribute("stroke", "#1d4ed8"); pth.setAttribute("stroke-width", "2.4"); });
  svg.removeAttribute("class"); svg.removeAttribute("style");
  return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej;
    im.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg)); });
}
function roundRect(x, a, b, w, h, r){ x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); }

// A .tcx activity file: Garmin Connect and most other sport apps can import it.
function tcxFor(sm, text){
  const end = new Date(sm.start.getTime() + sm.mins * 60000), iso = d => d.toISOString().replace(/\.\d{3}Z$/, "Z");
  const onlyCardio = !sm.exs.length && sm.cardio.length, t0 = (sm.cardio[0] || {}).type || "";
  const sport = onlyCardio && /Loopband|Lopen|Intervallopen|Helling/.test(t0) ? "Running" : onlyCardio && /Spinning|Air bike|Fietsen/.test(t0) ? "Biking" : "Other";
  const xmlEsc = v => String(v).replace(/[<>&]/g, ch => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[ch]));
  const dist = Math.round(sm.km * 1000);
  return `<?xml version="1.0" encoding="UTF-8"?>
<TrainingCenterDatabase xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2">
  <Activities>
    <Activity Sport="${sport}">
      <Id>${iso(sm.start)}</Id>
      <Lap StartTime="${iso(sm.start)}">
        <TotalTimeSeconds>${sm.mins * 60}</TotalTimeSeconds>
        <DistanceMeters>${dist}</DistanceMeters>
        <Calories>${sm.kcal || 0}</Calories>
        <Intensity>Active</Intensity>
        <TriggerMethod>Manual</TriggerMethod>
        <Track>
          <Trackpoint><Time>${iso(sm.start)}</Time><DistanceMeters>0</DistanceMeters></Trackpoint>
          <Trackpoint><Time>${iso(end)}</Time><DistanceMeters>${dist}</DistanceMeters></Trackpoint>
        </Track>
      </Lap>
      <Notes>${xmlEsc(text)}</Notes>
      <Creator><Name>Fitness Progress Tracker</Name></Creator>
    </Activity>
  </Activities>
</TrainingCenterDatabase>
`;
}
function showStrava(out, sm, text){
  const L = STANDALONE && links().strava;
  out.hidden = false;
  if (L){
    out.innerHTML = `<p class="label sv-h">Strava</p>
      <p class="note">Je Strava-account is gekoppeld. Met één tik staat deze training op Strava, met je oefeningen in de beschrijving.</p>
      <div class="share-row"><button class="share-btn sb-strava" type="button" data-sv-send>Naar Strava sturen</button><button class="share-btn" type="button" data-sv-photo>Foto voor je activiteit</button></div>
      <p class="note">Een foto kan je alleen in Strava zelf toevoegen: bewaar de foto en voeg ze toe aan je activiteit.</p>`;
    out.querySelector("[data-sv-send]").onclick = async e => { const b = e.currentTarget; b.disabled = true; await stravaSend(sm); b.disabled = false; };
  } else {
    try { navigator.clipboard.writeText(text).catch(() => {}); } catch {}
    out.innerHTML = `<p class="label sv-h">Strava</p>
      ${STANDALONE ? `<p class="note">Koppel Strava één keer bij Delen → Gekoppelde apps. Daarna komt elke training er na Einde training vanzelf op.</p>
      <div class="share-row"><button class="share-btn sb-strava" type="button" data-sv-link>Strava koppelen</button></div>
      <p class="note">Of voeg ze zelf toe:</p>` : ""}
      <ol class="sv-steps">
        <li>Open Strava en tik op <b>+</b> → <b>Activiteit handmatig toevoegen</b>.</li>
        <li>Kies <b>Krachttraining</b> en vul de duur in: <b>${sm.mins} min</b>.</li>
        <li>Plak de beschrijving: die staat al op je klembord.</li>
      </ol>
      <div class="share-row">
        <a class="share-btn" href="https://www.strava.com/upload/manual" target="_blank" rel="noopener">Open Strava</a>
        <button class="share-btn" type="button" data-sv-copy>Kopieer beschrijving</button>
        <button class="share-btn" type="button" data-sv-photo>Foto voor je activiteit</button>
      </div>`;
    out.querySelector("[data-sv-copy]").onclick = () => copyText(text, out.closest(".share"));
    const ln = out.querySelector("[data-sv-link]"); if (ln) ln.onclick = () => stravaConnect();
  }
  out.querySelector("[data-sv-photo]").onclick = () => stravaPhoto(sm);
  out.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
}
// Summary: what the app does for you, with a shortcut to each part
const SUMMARY = [
  ["🗓️", "Plannen zonder gedoe", "Kies in een paar tikken een schema, programma, groepsles of kineprogramma, of stel je eigen schema samen. Plan je trainingsdagen, combineer sessies (bv. Core na Push) en zet ze meteen in je agenda.", "Naar Training", "train"],
  ["📈", "Je vooruitgang en doelen in beeld", "Log elke set in een paar seconden. Op basis van je vorige sets stelt FPT herhalingen en gewichtsverhogingen voor, afgestemd op de doelen die je stelt. Je ziet je records en krijgt een plan met concrete tips om die doelen te halen.", "Doelen bekijken", "goals"],
  ["🎯", "Eén app voor elk doel", "Sterker worden, afvallen naar je streefgewicht, tot rust komen of herstellen van een blessure? Met FPT doe je het allemaal in een handomdraai.", "Naar Training", "train"],
  ["🧭", "De juiste oefening, goed uitgevoerd", "Elke oefening heeft een animatie, een korte uitleg en de spiergroepen die je traint. Lukt iets niet of is het toestel bezet? Dan krijg je meteen een gelijkwaardig alternatief.", "Naar de oefeningen", "train"],
  ["⚖️", "Evenwichtig trainen met analytics", "Zie welke spiergroepen je traint en of kracht, core, stretchen en conditie in balans zijn, met voorstellen op maat van je leeftijd, geslacht en doel.", "Analytics", "stats"],
  ["🔁", "Stap voor stap beter, zonder extra toestellen", "FPT analyseert je vorige trainingen en bouwt je belasting stapsgewijs op: wat meer gewicht, een extra herhaling of net wat meer rust. Daarvoor heb je geen sporthorloge, hartslagmeter of ander hulpmiddel nodig; je telefoon is genoeg.", "Naar Training", "train"]
];
function openSummary(){
  const sh = $("shareSheet");
  sh.setAttribute("aria-label", "Samenvatting");
  sh.querySelector(".ss-body").innerHTML = `<h2>Wat doet FPT voor jou?</h2><p class="note">Fitness Progress Tracker in zes punten.</p>
    <ol class="sum-list">${SUMMARY.map(([icon, title, text, btn, go], i) => `<li><span class="sum-n" aria-hidden="true">${icon}</span><div><b><span>${i + 1}.</span> ${esc(title)}</b><p>${esc(text)}</p>
      <button type="button" class="ghost-sm sum-go" data-go="${go}">${esc(btn)}</button></div></li>`).join("")}</ol>`;
  sh.hidden = false;
  sh.querySelectorAll("[data-go]").forEach(b => b.onclick = () => {
    sh.hidden = true;
    const go = b.dataset.go;
    if (go === "goals"){ showPage("plan"); openTrainMod("goals"); }
    else { showPage(go); window.scrollTo(0, 0); }
  });
}

// ---------- Tips: training, food and sleep, tuned to where you want to go ----------
// They are worked out from your training goal, scheme, days per week, goals and weight each time you open them.
function tipsSig(){
  const goals = (prefs.goals || []).filter(g => !goalEval(g).done).map(g => JSON.stringify(g)).sort().join(";");
  const kg = latestBw();
  return { goal: trainGoal(), scheme: scheme().id, days: prefs.daysPerWeek || 0, goals, kg: kg ? Math.round(kg * 10) / 10 : 0 };
}
// What changed a lot since you last read your tips (a new goal, scheme or days, or 2 kg or more).
function tipsChanges(){
  const a = prefs.tipsSeen, b = tipsSig(); if (!a) return [];
  return [a.goal !== b.goal && "Trainingsdoel", a.scheme !== b.scheme && "Schema", a.days !== b.days && "Trainingsdagen",
    a.goals !== b.goals && "Doelen", a.kg && b.kg && Math.abs(a.kg - b.kg) >= 2 && "Gewicht"].filter(Boolean);
}
const tipsChanged = () => !prefs.tipsSeen || tipsChanges().length > 0;
// Body weight change per week over the last weeks, or null with too few weigh-ins.
function weightTrend(){
  const pts = Object.entries(prefs.body || {}).filter(([d]) => daysAgo(d) <= 35).sort((a, b) => a[0] < b[0] ? -1 : 1);
  if (pts.length < 2) return null;
  const days = (new Date(pts[pts.length - 1][0]) - new Date(pts[0][0])) / 864e5;
  return days >= 10 ? (pts[pts.length - 1][1] - pts[0][1]) / days * 7 : null;
}
const LIFT_TIPS = {
  "Bench Press": "Voor een zwaardere bench press: versterk je triceps en schouders met close-grip bench press en dips, en train je bovenrug voor een stabiele basis.",
  "Back Squat": "Voor een zwaardere squat: versterk je benen met front squats en leg press, en train je core zodat je romp stevig blijft.",
  "Deadlift": "Voor een zwaardere deadlift: versterk je hamstrings en rug met Romanian deadlifts en rows, en train je grip.",
  "Overhead Press": "Voor een zwaardere overhead press: versterk je triceps en bovenrug, en span je billen en buik aan tijdens het drukken.",
  "Pull-up (added weight)": "Voor meer optrekkracht: versterk je lats en biceps met lat pulldowns en curls, en oefen ook langzaam zakken."
};
function buildTips(){
  const pr = prefs.profile || {}, kg = latestBw(), age = profileAge(pr), cm = pr.height, sex = sexOf();
  const goal = trainGoal(), s = scheme(), days = prefs.daysPerWeek || 3, trend = weightTrend();
  const goals = (prefs.goals || []).map(g => ({ g, ev: goalEval(g) })).filter(o => !o.ev.done);
  const train = [], food = [], sleep = [];
  const weeksTo = d => d ? Math.max(1, Math.round((new Date(d + "T12:00") - new Date()) / 6048e5)) : 0;
  // Training: your goals first
  goals.slice(0, 3).forEach(({ g, ev }) => {
    const wks = weeksTo(g.date);
    if (["max", "e1rm", "wr", "addw", "reps"].includes(ev.type)){
      train.push(ev.cur == null ? (wks ? `${g.name}: doel ${ev.targetText} in ${wks} weken. Train deze oefening 2× per week: een zware dag met 3–5 herhalingen en een volumedag met 8–10.` : `${g.name}: doel ${ev.targetText}. Train deze oefening 2× per week: een zware dag met 3–5 herhalingen en een volumedag met 8–10.`)
        : wks ? `${g.name}: van ${ev.curText} naar ${ev.targetText} in ${wks} weken. Train deze oefening 2× per week: een zware dag met 3–5 herhalingen en een volumedag met 8–10.` : `${g.name}: van ${ev.curText} naar ${ev.targetText}. Train deze oefening 2× per week: een zware dag met 3–5 herhalingen en een volumedag met 8–10.`);
      if ((ev.type === "max" || ev.type === "e1rm") && ev.cur && wks){
        const need = (ev.target - ev.cur) / wks;
        if (need > 2.5) train.push(`Je doel vraagt ±${fw(Math.round(need * 4) / 4)} per week; dat is ambitieus. Kies een latere datum of tel een paar weken extra.`);
        else if (need > 0) train.push(`Daarvoor heb je ±${fw(Math.round(need * 4) / 4)} per week nodig: kleine stappen van 1,25–2,5 kg werken het best.`);
      }
      if (LIFT_TIPS[g.name]) train.push(LIFT_TIPS[g.name]);
    } else if (ev.type === "body" && ev.cur && wks){
      const perWk = (ev.target - ev.cur) / wks;
      if (perWk < 0){
        const pct = -perWk / ev.cur * 100;
        if (pct > 1) food.push(`Je gewichtsdoel vraagt ${fw(Math.round(-perWk * 10) / 10)} per week; dat is snel. Mik op 0,5–1% van je gewicht per week (${fw(Math.round(ev.cur * .005 * 10) / 10)}–${fw(Math.round(ev.cur * .01 * 10) / 10)}) zodat je spieren behoudt.`);
        else food.push(`Je gewichtsdoel vraagt ${fw(Math.round(-perWk * 10) / 10)} per week: haalbaar met een tekort van ±${Math.round(-perWk * 7700 / 7 / 10) * 10} kcal per dag.`);
      } else if (perWk > 0) food.push(`Om ${fw(Math.round(perWk * 10) / 10)} per week bij te komen, eet je ±${Math.round(perWk * 7700 / 7 / 10) * 10} kcal per dag boven je verbruik.`);
    } else if (ev.type === "freq"){
      train.push("Plan je trainingen op vaste dagen in de Weekplanning; zo haal je je doel van trainingen per week makkelijker.");
    } else if (["dist", "time", "dur", "pace"].includes(ev.type)){
      train.push("Voor je conditiedoel: doe 80% van je cardio rustig (je kan nog praten) en 1× per week intervallen of een tempotraining.");
    }
  });
  // Training: your training goal
  ({ muscle: ["Train elke spiergroep 2× per week, met in totaal 10–20 sets per spiergroep per week.",
      "Werk in 6–12 herhalingen en stop 1–3 herhalingen voor falen. Haal je de bovenkant van de range, verhoog dan het gewicht."],
    strength: ["Doe je hoofdoefeningen in 3–6 herhalingen met 2–3 minuten rust; hulpoefeningen mogen in 8–12.",
      "Plan elke 4–6 weken een lichtere week (deload); daarna kom je sterker terug."],
    fat: ["Blijf zwaar trainen: zo verlies je vet en geen spieren.",
      "Wandel 8.000–10.000 stappen per dag en voeg 1–2 korte cardiosessies toe, bv. 20 minuten fietsen of roeien na je krachttraining."],
    endurance: ["Doe 80% van je cardio rustig (je kan nog praten) en 1× per week intervallen of een tempotraining. Bouw je afstand per week hooguit 10% op.",
      "Houd 2 korte krachttrainingen per week aan voor benen en romp: dat voorkomt blessures."],
    athletic: ["Wissel kracht, conditie en core af, bv. 1× zwaar trainen, 1× intervallen en 1× core en beweeglijkheid.",
      "Plan minstens één rustdag per week en doe op rustdagen een lichte wandeling of mobiliteit."] })[goal].forEach(t => train.push(t));
  if (days <= 2) train.push("Met 1 of 2 trainingen per week werkt een full-body-schema het best: elke spiergroep komt dan elke training aan bod.");
  else if (days >= 5) train.push("Train je 5 of meer keer per week? Wissel zware en lichte dagen af en plan minstens één volledige rustdag.");
  if (s.kine) train.push("Je volgt een kineprogramma: train rond je blessure, niet erdoorheen, en bouw pijnvrij op.");
  if (s.cls) train.push("Groepslessen en Hyrox vragen veel conditie: hou ook 1–2 krachttrainingen per week aan.");
  // Food
  if (kg && cm && age){
    const tdee = (10 * kg + 6.25 * cm - 5 * age + SEX_BMR[sex]) * (days <= 1 ? 1.2 : days <= 3 ? 1.375 : days <= 5 ? 1.55 : 1.725), r = v => Math.round(v / 50) * 50;
    if (goal === "fat") food.unshift(`Eet ±${r(tdee - 450)} kcal per dag: ±450 onder je verbruik van ±${r(tdee)} kcal. Zo verlies je rustig ±0,5 kg per week.`);
    else if (goal === "muscle") food.unshift(`Eet ±${r(tdee + 250)} kcal per dag: ±250 boven je verbruik van ±${r(tdee)} kcal. Zo bouw je spieren met weinig extra vet.`);
    else food.unshift(`Eet rond je verbruik van ±${r(tdee)} kcal per dag; op zware trainingsdagen mag het wat meer zijn.`);
  } else food.unshift("Vul je leeftijd, lengte en gewicht in bij Instellingen; dan krijg je een calorieadvies op maat.");
  if (kg){
    const lo = Math.round(kg * (goal === "fat" ? 1.8 : 1.6)), hi = Math.round(kg * 2.2);
    food.push(`Eet ${lo}–${hi} g eiwit per dag, verdeeld over 3–5 maaltijden van 25–40 g.`);
    food.push(`Drink ±${fmt(Math.round(kg * .033 * 2) / 2)} liter water per dag, en meer op warme of zware dagen.`);
  } else food.push("Eet 1,6–2,2 g eiwit per kg lichaamsgewicht per dag, verdeeld over 3–5 maaltijden.");
  const losing = goal === "fat" || goals.some(o => o.ev.type === "body" && o.ev.target < (o.ev.cur || 0));
  if (trend == null) food.push("Weeg je 2–3× per week 's ochtends; dan stemt FPT je tips af op hoe je gewicht verloopt.");
  else if (losing && kg){
    if (trend < -kg * .01) food.push("Je verliest meer dan 1% van je gewicht per week. Eet ±150 kcal meer, zodat je je spieren behoudt.");
    else if (trend > -.1) food.push("Je gewicht daalt de laatste weken nauwelijks. Eet ±150 kcal minder per dag of wandel elke dag 2.000 stappen extra.");
    else food.push(`Je verliest ±${fw(Math.round(-trend * 10) / 10)} per week: een mooi tempo, ga zo door.`);
  } else if (goal === "muscle" && kg){
    if (trend < .05) food.push("Je gewicht stijgt nauwelijks. Eet ±150 kcal per dag meer als je spieren wil bijbouwen.");
    else if (trend > kg * .005) food.push(`Je komt ±${fw(Math.round(trend * 10) / 10)} per week bij; iets trager beperkt het extra vet.`);
  }
  if (goal === "fat") food.push("Vul je bord voor de helft met groenten en drink geen calorieën: frisdrank, sap en alcohol tellen snel op.");
  else food.push("Eet 1–3 uur voor je training koolhydraten en eiwit, bv. havermout met yoghurt, en na je training een eiwitrijke maaltijd.");
  if ((goal !== "fat" && goal !== "endurance") || goals.some(o => LIFT_TIPS[o.g.name])) food.push("Creatine (3–5 g per dag) is het best onderzochte supplement voor kracht en spiermassa. Overleg met je arts als je nierproblemen hebt.");
  // Sleep and recovery
  sleep.push("Slaap 7–9 uur per nacht: spieren herstellen en groeien vooral tijdens je slaap.");
  if (goal === "strength" || goals.some(o => ["max", "e1rm", "wr", "addw"].includes(o.ev.type))) sleep.push("Slaap de nacht voor een zware dag extra goed: kracht en focus dalen merkbaar na een korte nacht.");
  if (losing) sleep.push("Wie te weinig slaapt, heeft meer honger en zin in zoet. Goed slapen helpt je afvallen.");
  sleep.push("Drink na 14 uur geen koffie meer en leg je scherm 30–60 minuten voor het slapengaan weg.");
  sleep.push("Hou een vaste bedtijd, ook in het weekend, en slaap in een donkere, koele kamer (16–19 °C).");
  if (days >= 5) sleep.push("Let op signalen van overtraining: slecht slapen, zware benen en minder kracht. Neem dan een extra rustdag.");
  if (age >= 50) sleep.push("Vanaf 50 duurt herstel wat langer: gun grote spiergroepen 48–72 uur rust.");
  return { train, food, sleep, goals, goal, s, days };
}
function openTips(){
  const t = buildTips(), changes = tipsChanges(), sh = $("shareSheet");
  const list = items => `<ul class="tips-list">${items.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
  sh.setAttribute("aria-label", "Tips");
  sh.querySelector(".ss-body").innerHTML = `<h2>Tips voor jou</h2>
    <p class="note">Training, voeding en slaap, op maat van waar je naartoe wilt. Verander je je doel, schema, doelen of gewicht sterk, dan passen de tips zich aan.</p>
    <div class="tips-for"><span>${esc(TRAIN_GOALS[t.goal][0])}</span><span>${esc(t.s.name)}</span><span>${t.days === 1 ? "1 dag per week" : `${t.days} dagen per week`}</span>${t.goals.slice(0, 3).map(o => `<span>${esc(goalLabel(o.g.name))}</span>`).join("")}</div>
    ${changes.length ? `<div class="tips-upd"><b>Je tips zijn bijgewerkt na een grote wijziging:</b>${changes.map(c => `<span>${esc(c)}</span>`).join("")}</div>` : ""}
    <section class="tips-sec"><h3>🏋️ Training</h3>${list(t.train)}</section>
    <section class="tips-sec"><h3>🍽️ Voeding</h3>${list(t.food)}</section>
    <section class="tips-sec"><h3>😴 Slaap en herstel</h3>${list(t.sleep)}</section>
    <p class="note">Algemene tips, geen vervanging voor advies van een arts of diëtist.</p>`;
  sh.hidden = false;
  prefs.tipsSeen = tipsSig(); savePrefs();
  const nb = document.querySelector("#toTips .tb-new"); if (nb) nb.remove();
}


// ---------- Target weight: a body-weight goal with its own quick form ----------
const isBodyGoal = g => g.name === "__body" && g.type === "body";
const bodyGoals = () => (prefs.goals || []).filter(isBodyGoal).sort((a, b) => (a.date || "9") < (b.date || "9") ? -1 : (a.date || "9") > (b.date || "9") ? 1 : 0);
const bodyGoalDone = g => { const kg = latestBw(); if (!kg) return false; const st = g.start || kg; return st > g.v ? kg <= g.v + .05 : st < g.v ? kg >= g.v - .05 : true; };
// The target you are working towards now: the first one that is not reached yet and not past its date;
// otherwise the first unreached one, otherwise the last one.
const bodyGoal = () => { const all = bodyGoals(); return all.find(g => !bodyGoalDone(g) && (!g.date || g.date >= today())) || all.find(g => !bodyGoalDone(g)) || all[all.length - 1]; };
const LOSE_STRENGTH = ["Back Squat", "Romanian Deadlift", "Bench Press", "Barbell Row", "Overhead Press"];
const LOSE_BURN = ["Kettlebell Swing", "Burpee", "Mountain Climber", "Walking Lunge", "Farmer's Walk"];
const GAIN_LIFTS = ["Back Squat", "Deadlift", "Bench Press", "Barbell Row", "Overhead Press", "Pull-up (added weight)", "Chest Dip"];
const exChips = (names, cls = "") => `<div class="ex-chips">${names.map(n => `<span class="ex-chip${cls}" translate="no">${esc(n)}</span>`).join("")}</div>`;
function renderTargetWeight(){
  const g = bodyGoal(), kg = latestBw(), all = bodyGoals(), open = !!prefs.twOpen;
  $("twUnit").textContent = U();
  $("twBody").hidden = !open; $("twToggle").setAttribute("aria-expanded", open);
  $("twToggle").querySelector(".chev").textContent = open ? "▾" : "▸";
  $("twCount").textContent = all.length ? `(${all.length})` : "";
  $("twToggle").onclick = () => { prefs.twOpen = !prefs.twOpen; savePrefs(); renderTargetWeight(); };
  if (document.activeElement !== $("twKg")) $("twKg").value = "";
  if (document.activeElement !== $("twDate")) $("twDate").value = addDays(g && g.date && g.date >= today() ? g.date : today(), 84);
  $("twList").innerHTML = all.map(t => {
    const dn = bodyGoalDone(t), nx = t === g && !dn;
    return `<div class="tw-item${nx ? " next" : ""}${dn ? " done" : ""}"><span><b>${fw(Math.round(t.v * 10) / 10)}</b>${t.date ? ` <small>${esc(shortDate(t.date))}</small>` : ""}${dn ? " ✓" : nx && all.length > 1 ? ` <small>${esc("Nu")}</small>` : ""}</span><button type="button" data-twx="${esc(t.date || "")}|${t.v}" aria-label="Streefgewicht verwijderen">×</button></div>`;
  }).join("");
  $("twList").querySelectorAll("[data-twx]").forEach(b => b.onclick = () => {
    const sn = takeSnapshot(), key = b.dataset.twx;
    prefs.goals = (prefs.goals || []).filter(t => !(isBodyGoal(t) && `${t.date || ""}|${t.v}` === key));
    savePrefs(); renderGoals(); renderBodyWeight(); renderFood(); undoToast("Streefgewicht verwijderd", sn);
  });
  let note = "", ex = "";
  if (g && kg){
    const diff = g.v - kg, wks = g.date ? Math.max(1, Math.round((new Date(g.date + "T12:00") - new Date()) / 6048e5)) : 0;
    if (Math.abs(diff) < .3) note = "Je zit op je streefgewicht. Hou het vast met je huidige voeding en training.";
    else {
      const amt = fw(Math.round(Math.abs(diff) * 10) / 10), per = fw(Math.round(Math.abs(diff) / Math.max(1, wks) * 10) / 10);
      note = diff < 0 ? (wks ? `Nog ${amt} eraf in ${wks} weken: ±${per} per week.` : `Nog ${amt} eraf.`) : (wks ? `Nog ${amt} erbij in ${wks} weken: ±${per} per week.` : `Nog ${amt} erbij.`);
    }
    if (diff <= -.3) ex = `<div class="tw-ex"><p class="label">Oefeningen die helpen</p>
        <p class="note">Krachttraining om je spieren te behouden:</p>${exChips(LOSE_STRENGTH)}
        <p class="note">Extra verbranding als circuit: 3–4 rondes, 40 s werken en 20 s rust.</p>${exChips(LOSE_BURN, " burn")}
        <p class="note">Cardio: 2× per week 20–30 minuten roeien, fietsen of hellingwandelen na je krachttraining.</p>
        <p class="note">Wandel elke dag ±5 km tegen ±4,5 km/u (ongeveer een uur): dat verbrandt ±${Math.round(3.8 * kg * 67 / 60 / 10) * 10} kcal extra, vooral uit vet. Je vindt het bij Cardio → Wandelen.</p></div>`;
    else if (diff >= .3) ex = `<div class="tw-ex"><p class="label">Oefeningen die helpen</p>
        <p class="note">Zware basisoefeningen in 6–10 herhalingen, zodat je vooral spieren bijbouwt:</p>${exChips(GAIN_LIFTS)}
        <p class="note">Hou cardio kort en eet ±250 kcal boven je verbruik.</p></div>`;
  } else if (g) note = "Vul eerst je huidige gewicht in bij Lichaamsgewicht.";
  else note = "Zet een streefgewicht; je ziet het dan ook als lijn in je gewichtsgrafiek. Met meerdere data werk je stap voor stap naar je einddoel.";
  $("twNote").textContent = note;
  $("twEx").innerHTML = ex;
}
$("twForm").addEventListener("submit", e => {
  e.preventDefault();
  const v = parseFloat($("twKg").value.trim().replace(",", ".")), kgT = fromU(v);
  if (!(kgT >= 30 && kgT <= 300)){ toast(`Vul een streefgewicht in ${U()} in.`); return; }
  const date = $("twDate").value || addDays(today(), 84);
  // One target per date: adding a second one for the same date replaces it.
  prefs.goals = (prefs.goals || []).filter(g => !(isBodyGoal(g) && g.date === date)).concat([{ name: "__body", type: "body", v: kgT, date, start: latestBw() || kgT }]);
  savePrefs(); $("twKg").value = ""; renderGoals(); renderBodyWeight(); renderFood(); toast("Streefgewicht toegevoegd");
});

// ---------- Nutrition: calories, macros, how to tune your training, and food tips ----------
function renderFood(){
  const box = $("foodBody"); if (!box) return;
  const pr = prefs.profile || {}, kg = latestBw(), age = profileAge(pr), cm = pr.height, sex = sexOf(), goal = trainGoal(), days = prefs.daysPerWeek || 3;
  const bg = bodyGoal(), losing = goal === "fat" || !!(bg && kg && bg.v < kg - .3), gaining = !losing && (goal === "muscle" || !!(bg && kg && bg.v > kg + .3));
  let tiles = "";
  if (kg && cm && age){
    const tdee = (10 * kg + 6.25 * cm - 5 * age + SEX_BMR[sex]) * (days <= 1 ? 1.2 : days <= 3 ? 1.375 : days <= 5 ? 1.55 : 1.725);
    const kcal = Math.round((losing ? tdee - 450 : gaining ? tdee + 250 : tdee) / 50) * 50;
    const pg = losing ? 2 : 1.8, prot = Math.round(kg * pg), fat = Math.round(kg * (losing ? .8 : 1)), carb = Math.max(0, Math.round((kcal - prot * 4 - fat * 9) / 4 / 5) * 5);
    const t = (lab, v, sub) => `<div class="tile pm"><small>${lab}</small><strong>${v}</strong><em>${sub}</em></div>`;
    tiles = `<div class="food-tiles">${t("Calorieën", kcal + " kcal", losing ? "per dag, ±450 onder je verbruik" : gaining ? "per dag, ±250 boven je verbruik" : "per dag, rond je verbruik")}
      ${t("Eiwit", prot + " g", `${fmt(pg)} g per kg lichaamsgewicht`)}${t("Vet", fat + " g", "vooral uit noten, olijfolie en vis")}${t("Koolhydraten", carb + " g", "brandstof voor je training")}</div>`;
  } else tiles = `<p class="note">Vul je leeftijd, lengte en gewicht in bij Instellingen; dan krijg je een calorieadvies op maat.</p>`;
  const train = losing ? ["Blijf minstens 3× per week krachttraining doen. Bij afvallen verlies je anders ook veel spiermassa, en spieren houden je verbranding hoog.",
      "Hou de zware basisoefeningen in je schema (squat, deadlift, bench press, rows) en probeer je gewichten te behouden.",
      "Voeg 2× per week 20–30 minuten cardio toe na je krachttraining, of wandel elke dag 8.000–10.000 stappen."]
    : gaining ? ["Train elke spiergroep 2× per week zwaar genoeg: zonder trainingsprikkel wordt extra eten vooral vet.",
      "Beperk cardio tot 1–2 korte sessies per week, zodat je calorieën naar spiergroei gaan."]
    : ["Eet voldoende koolhydraten op zware dagen: ze zijn de brandstof voor je zware sets.",
      "Blijf op of net boven je verbruik eten; afvallen en tegelijk veel sterker worden lukt zelden."];
  const extra = losing ? ["Eet bij elke maaltijd een eiwitbron: eiwit verzadigt het best en beschermt je spieren.",
      "Kies veel vezels: groenten, fruit, volle granen en peulvruchten houden je langer vol.",
      "Hou eiwitrijke snacks bij de hand, zoals skyr, platte kaas, eieren of een handje noten.",
      "Mik op 0,5–1% van je gewicht per week; sneller afvallen kost vooral spiermassa."]
    : gaining ? ["Eet 4–5 keer per dag; zo wordt meer eten makkelijker.",
      "Neem na je training binnen 2 uur een maaltijd met eiwit en koolhydraten.",
      "Een eiwitbron voor het slapengaan, zoals kwark of skyr, helpt je spieren 's nachts herstellen."]
    : ["Eet 1–3 uur voor je training een maaltijd met koolhydraten en eiwit.",
      "Drink genoeg: al 2% vochtverlies kost merkbaar kracht."];
  const tips = buildTips().food.slice(1).concat(extra);
  const main = scheme(), addon = ADDON_IDS.includes(main.id) || main.cls || main.crd || main.kine || main.mind;
  const btns = [];
  if (losing && goal !== "fat") btns.push(`<button class="ghost" type="button" data-fd="goal-fat">Trainingsdoel op Vetverlies</button>`);
  if (gaining && goal !== "muscle") btns.push(`<button class="ghost" type="button" data-fd="goal-muscle">Trainingsdoel op Spieropbouw</button>`);
  if (losing && !addon) btns.push(`<button class="ghost" type="button" data-fd="walk">Wandelen na je krachtdagen</button>`);
  box.innerHTML = `<div class="tips-for"><span>${losing ? "Afvallen" : gaining ? "Spieren opbouwen" : "Sterker worden"}</span>${bg ? `<span>Streefgewicht ${fw(Math.round(bg.v * 10) / 10)}</span>` : ""}</div>
    ${tiles}
    <section class="food-sec"><h3>Je training afstemmen</h3><ul class="tips-list">${train.map(x => `<li>${esc(x)}</li>`).join("")}</ul>${btns.length ? `<div class="food-btns">${btns.join("")}</div>` : ""}</section>
    <section class="food-sec"><h3>Voedingstips</h3><ul class="tips-list">${tips.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>
    <p class="note">Algemene tips, geen vervanging voor advies van een arts of diëtist.</p>`;
  box.querySelectorAll("[data-fd]").forEach(b => b.onclick = () => {
    const a = b.dataset.fd;
    if (a === "goal-fat"){ setTrainGoal("fat"); toast("Je trainingsdoel staat nu op Vetverlies."); }
    else if (a === "goal-muscle"){ setTrainGoal("muscle"); toast("Je trainingsdoel staat nu op Spieropbouw."); }
    else {
      prefs.after = Object.assign({}, prefs.after);
      main.days.forEach((d, i) => { if (!d.ex.every(e => e[5] === "cardio")) prefs.after[dayKey(main, i)] = "walk"; });
      savePrefs(); render(); toast("Wandelen volgt nu na je krachtdagen.");
    }
    renderFood();
  });
}

// Share a past training from the log
function openShareSheet(date){
  const sm = daySummary(date), sh = $("shareSheet");
  sh.setAttribute("aria-label", "Training delen");
  sh.querySelector(".ss-body").innerHTML = `<h2>${esc(tr("Training delen"))}</h2><p class="note">${esc(longDate(date))} · ${esc(sm.title)}</p>${shareButtons()}`;
  sh.hidden = false;
  wireShare(sh.querySelector(".ss-body"), sm);
}

// ---------- Today ----------
// drag-head markup shared by every module on "Vandaag" (mirrors the mod-head on the other pages)
const modHead = (title, extraBtn = "") => `<div class="mod-head"><button class="mod-toggle" type="button" aria-expanded="true"><h2>${esc(title)}</h2><span class="chev" aria-hidden="true">▾</span></button>${extraBtn}<span class="mod-order"><button class="mod-order-btn mod-order-toggle" type="button" aria-label="Volgorde aanpassen" title="Volgorde aanpassen"><span aria-hidden="true">⌃</span><span aria-hidden="true">⌄</span></button><button class="mod-order-btn mod-up" type="button" aria-label="Omhoog" title="Omhoog" hidden>▲</button><button class="mod-order-btn mod-down" type="button" aria-label="Omlaag" title="Omlaag" hidden>▼</button></span></div>`;
function renderToday(){
  const s = scheme(), rec = recoveryMap(), wk = weekPlan();
  const nx = nextDayIndex(s), idx = inWorkout() ? view.day : nx ? nx.idx : view.day;
  const items = exercisesFor(s, idx), sets = items.reduce((a, x) => a + plannedOf(x[1]), 0);
  const ready = dayReadiness(s, idx, rec), pw = programWeek(s);
  const h = new Date().getHours(), hello = h < 12 ? "Goedemorgen" : h < 18 ? "Goedemiddag" : "Goedenavond";
  const todayPlan = wk.find(d => d.date === today());
  const dates = Object.keys(log).sort();
  const weeks = new Set(dates.map(weekOf)); let w = weekOf(today()); if (!weeks.has(w)) w = addDays(w, -7);
  let streak = 0; while (weeks.has(w)){ streak++; w = addDays(w, -7); }
  const thisWeek = dates.filter(d => weekOf(d) === weekOf(today())).length;
  const goal = (prefs.goals || []).filter(g => !goalEval(g).done).sort((a, b) => (a.date || "9") < (b.date || "9") ? -1 : 1)[0];
  const bg = bodyGoal(), goalsToday = [goal, bg && bg !== goal ? bg : null].filter(Boolean);
  const low = RECOVERY_SHOWN.filter(g => rec[g] < 60);
  const homeS = comboHome(), afterS = !homeS && afterOf(s, idx);
  const comboNote = homeS ? `Daarna terug naar ${homeS.days[nextHomeDay(homeS)].name}.` : afterS ? `Daarna: ${afterS.name}` : "";
  const goalsTitle = goalsToday.length > 1 ? "Je doelen" : "Je doel";
  $("todayView").innerHTML = `
    <div class="hello"><h2>${hello}</h2><p class="note">${esc(longDate(today()))}</p></div>
    ${prefs.daysPerWeek ? "" : `<section class="panel"><h2>Hoeveel dagen per week?</h2><p class="note">Kies hoe vaak je wil trainen; de app zet je weekplanning klaar.</p><div class="days-pick" id="todayDays">${dayButtons()}</div></section>`}
    <div class="mods" id="todayMods">
      ${dailyTipHtml()}
      <section class="panel mod next-card" data-mod="next">
        ${modHead("Volgende training")}
        <div class="mod-body">
          <small class="label">${inWorkout() ? "Je bent bezig met" : todayPlan && todayPlan.state === "free" && (prefs.planDays || []).length ? "Rustdag volgens je planning · volgende training" : "Volgende training"}</small>
          <h2 class="nc-day">${esc(s.days[idx].name)}</h2>
          <p class="note">${esc(s.name)}${pw ? ` · week ${pw.week}: ${esc(pw.name)}` : ""}${deloadActive() ? " · deloadweek" : ""}</p>
          ${comboNote ? `<p class="note nc-combo">${esc(comboNote)}</p>` : ""}
          <div class="nc-stats"><span><b>${items.length}</b> oefeningen</span><span><b>${sets}</b> sets</span><span><b>±${Math.max(20, Math.round(sets * 2.6))}</b> min</span><span class="${recClass(ready)}"><b>${ready}%</b> hersteld</span></div>
          <button class="save big-start" type="button" id="startBtn">${inWorkout() ? "Verder trainen" : "Start training"}</button>
        </div>
      </section>
      <section class="panel mod" data-mod="tiles">
        ${modHead("Reeks en deze week")}
        <div class="mod-body">
          <div class="tiles rep">
            <div class="tile"><small>Reeks</small><strong>${streak}</strong><em>${streak === 1 ? "week" : "weken"} op rij</em></div>
            <div class="tile"><small>Deze week</small><strong>${thisWeek}</strong><em>${(prefs.planDays || []).length ? "van " + prefs.planDays.length + " gepland" : "trainingen"}</em></div>
          </div>
        </div>
      </section>
      <section class="panel mod" data-mod="weekstrip">
        ${modHead("Deze week", `<button class="reset" type="button" id="toWeek">Planning aanpassen</button>`)}
        <div class="mod-body">
          <div class="wk-plan">${wk.map(wpCell).join("")}</div>
          ${(prefs.planDays || []).length ? "" : `<p class="note">Kies in Planning → Weekplanning op welke dagen je traint.</p>`}
        </div>
      </section>
      <section class="panel mod" data-mod="rec">
        ${modHead("Herstel")}
        <div class="mod-body">
          <p class="note">${low.length ? `Nog vermoeid: <b>${esc(low.join(", "))}</b>. ` : "Al je spieren zijn (bijna) hersteld. "}Klaar voor ${esc(s.days[idx].name)}: ${ready}%.</p>
          <div class="rec-chips">${RECOVERY_SHOWN.map(g => `<span class="rchip ${recClass(rec[g])}"><b>${rec[g]}%</b> ${esc(g)}</span>`).join("")}</div>
        </div>
      </section>
      ${goalsToday.length ? `<section class="panel mod" data-mod="doel">
        ${modHead(goalsTitle)}
        <div class="mod-body">${goalsToday.map(goalRow).join("")}</div>
      </section>` : ""}
    </div>
    ${STANDALONE && dates.length >= 5 && (!lsGet("ppl.lastBackup", "") || daysAgo(lsGet("ppl.lastBackup", "")) > 30) ? `<section class="panel tip-card"><small class="label">Back-up</small><p>Je gegevens staan alleen op deze telefoon. Download een back-up via Instellingen (rechtsboven).</p></section>` : ""}
    <div class="entry-row"><button class="ghost wide sum-btn" type="button" id="toSummary">Samenvatting</button><button class="ghost wide tips-btn" type="button" id="toTips">Tips${tipsChanged() ? `<span class="tb-new">Nieuw</span>` : ""}</button></div>`;

  setupModulesIn("todayMods", "todayOrder", "todayClosed");
  const td = $("todayDays"); if (td) td.querySelectorAll("[data-days]").forEach(b => b.onclick = () => { setDaysPerWeek(+b.dataset.days); toast(b.dataset.days === "1" ? "1 dag per week ingepland." : `${b.dataset.days} dagen per week ingepland.`); });
  wireTip();
  $("startBtn").onclick = () => { view.day = idx; lsSet(LS_VIEW, view); showPage("train"); render(); scrollToExercise(); };
  $("toWeek").onclick = () => { showPage("plan"); openTrainMod("week"); };
  $("todayView").querySelectorAll(".wk-plan [data-date]").forEach(b => b.onclick = () => { showPage("plan"); selectDay(b.dataset.date, "wk"); openTrainMod("week"); });
  $("toSummary").onclick = openSummary;
  $("toTips").onclick = openTips;
}
// Scroll to the first exercise still to do (or the first one), just under the sticky header.
function scrollToExercise(){
  const ex = document.querySelector("#exercises .ex:not(.finished)") || document.querySelector("#exercises .ex");
  if (!ex){ window.scrollTo(0, 0); return; }
  requestAnimationFrame(() => {
    const top = document.querySelector(".top"), off = top ? top.getBoundingClientRect().height + 10 : 10;
    window.scrollTo({ top: Math.max(0, ex.getBoundingClientRect().top + window.scrollY - off), behavior: reduceMotion ? "auto" : "smooth" });
  });
}
function openTrainMod(id){
  const m = document.querySelector(`.mod[data-mod="${id}"]`); if (!m) return;
  if (m.classList.contains("closed")) m.querySelector(".mod-toggle").click();
  setTimeout(() => m.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }), 30);
}

// ---------- Analytics: report, goals, milestones, volume, cardio ----------
let repMonth = today().slice(0, 7);
const monthOf = d => d.slice(0, 7);
const prevMonth = m => { const [y, mm] = m.split("-").map(Number); const d = new Date(y, mm - 2, 1); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"); };
function monthStats(m){
  const dates = Object.keys(log).filter(d => monthOf(d) === m);
  let sets = 0, volume = 0, cardio = 0;
  dates.forEach(d => { Object.values(log[d].ex).forEach(e => e.sets.forEach(st => { sets++; volume += (st.w || 0) * (st.r || 0); })); (log[d].cardio || []).forEach(c => cardio += c.min); });
  return { trainings: dates.length, sets, volume, cardio };
}
function renderReport(){
  const m = repMonth, p = prevMonth(m), a = monthStats(m), b = monthStats(p);
  const [y, mm] = m.split("-").map(Number);
  $("repTitle").textContent = new Date(y, mm - 1, 1).toLocaleDateString(LOC(), { month: "long", year: "numeric" }).replace(/^./, c => c.toUpperCase());
  const delta = (x, y2, f = v => v) => { const d = x - y2; return d ? `<small class="${d > 0 ? "up" : "down"}">${d > 0 ? "▲ +" : "▼ "}${f(Math.abs(d) * Math.sign(d))}</small>` : `<small>= vorige maand</small>`; };
  // Records broken and biggest risers this month (by estimated 1RM)
  const before = {}, inM = {}, firstIn = {}, names = {};
  Object.keys(log).sort().forEach(d => Object.entries(log[d].ex).forEach(([k, e]) => {
    names[k] = e.name;
    const v = Math.max(...e.sets.map(st => st.w > 0 ? e1rm(st) : 0));
    if (!(v > 0)) return;
    if (d < m + "-01") before[k] = Math.max(before[k] || 0, v);
    else if (monthOf(d) === m){ inM[k] = Math.max(inM[k] || 0, v); if (firstIn[k] == null) firstIn[k] = v; }
  }));
  const prs = Object.keys(inM).filter(k => before[k] && inM[k] > before[k]);
  const risers = Object.keys(inM).map(k => ({ k, gain: inM[k] - (before[k] || firstIn[k]) })).filter(x => x.gain > 0).sort((x, y2) => y2.gain - x.gain).slice(0, 3);
  $("report").innerHTML = `
    <div class="tiles rep">
      <div class="tile"><small>Trainingen</small><strong>${a.trainings}</strong>${delta(a.trainings, b.trainings)}</div>
      <div class="tile"><small>Sets</small><strong>${a.sets}</strong>${delta(a.sets, b.sets)}</div>
      <div class="tile"><small>Volume</small><strong class="small">${fw(Math.round(a.volume))}</strong>${delta(a.volume, b.volume, v => fw(Math.round(v)))}</div>
      <div class="tile"><small>Cardio</small><strong class="small">${a.cardio} min</strong>${delta(a.cardio, b.cardio, v => v + " min")}</div>
    </div>
    <p class="fin-line">${prs.length ? `▲ <b>${prs.length} ${prs.length === 1 ? "record" : "records"}</b>: ${esc(prs.map(k => names[k]).join(", "))}` : "Nog geen nieuwe records deze maand."}</p>
    ${risers.length ? `<p class="fin-line">Sterkste stijgers (geschatte 1RM): ${risers.map(x => `<b>${esc(names[x.k])}</b> +${fw(Math.round(x.gain * 2) / 2)}`).join(" · ")}</p>` : ""}`;
}

// ---------- Goals: per exercise type (weight, bodyweight reps, hold time, cardio) plus body weight and frequency ----------
const GOAL_TYPES = {
  max:  { label: "Zwaarste set", unit: "w", hint: "Je zwaarste set, ongeacht het aantal reps." },
  e1rm: { label: "Geschatte 1RM", unit: "w", hint: "Wat je één keer zou kunnen tillen, geschat uit gewicht × reps. Eerlijk om sets met verschillende reps te vergelijken." },
  wr:   { label: "Gewicht × reps", unit: "w", unit2: "reps", hint: "Eén set met minstens dit gewicht en dit aantal reps." },
  reps: { label: "Reps in één set", unit: "reps", hint: "Het meeste aantal reps in één set." },
  addw: { label: "Extra gewicht", unit: "w", hint: "Zoveel extra gewicht (riem of vest) voor minstens één nette rep." },
  time: { label: "Volhouden", unit: "sec", hint: "Je langste set in seconden." },
  dist: { label: "Afstand in één sessie", unit: "dist", hint: "De grootste afstand in één training." },
  dur:  { label: "Duur in één sessie", unit: "min", hint: "Je langste sessie in minuten." },
  pace: { label: "Afstand binnen tijd", unit: "km", unit2: "min", hint: "Deze afstand afleggen binnen deze tijd. Berekend uit je tempo, ook als je een andere afstand liep." },
  body: { label: "Lichaamsgewicht", unit: "w", hint: "Je gewicht uit het blok Lichaamsgewicht. Werkt om af te vallen en om aan te komen." },
  freq: { label: "Trainingen per week", unit: "", hint: "Gemiddeld over de laatste 4 weken." },
  race: { label: "Wedstrijd", unit: "km", hint: "Kies de datum van je wedstrijd. In Planning krijg je een loopschema per week, afgestemd op je trainingsdagen." }
};
function exKind(name){
  if (name === "__body" || name === "__freq") return name.slice(2);
  if (RACES[name]) return "race";
  if (cardioType(name)) return "cardio";
  const k = knownExercise(name), custom = (prefs.custom || []).flatMap(c => c.days.flatMap(d => d.ex)).find(x => x[0] === name);
  const mode = k ? k.mode : custom ? custom[5] || "" : "";
  if (mode === "time" || mode === "bw") return mode;
  const sets = Object.values(log).flatMap(d => ((d.ex[keyOf(name)] || { sets: [] }).sets));
  if (sets.some(x => x.u === "s")) return "time";
  if (sets.length && sets.every(x => !x.w)) return "bw";
  return "weight";
}
function goalTypesFor(name){
  const kind = exKind(name);
  if (kind === "body") return ["body"];
  if (kind === "freq") return ["freq"];
  if (kind === "race") return ["race"];
  if (kind === "time") return ["time"];
  if (kind === "bw") return ["reps", "addw"];
  if (kind === "cardio"){
    const m = cardioType(name)[3];
    return (m.includes("km") || m.includes("m") ? ["dist"] : []).concat(["dur"], m.includes("km") ? ["pace"] : []);
  }
  return ["max", "e1rm", "wr"];
}
const distUnit = name => (cardioType(name) || [, , , []])[3].includes("km") ? "km" : "m";
const unitText = (u, name) => u === "w" ? U() : u === "dist" ? distUnit(name) : u;
// Current value, target, progress and history of one goal.
function goalEval(g){
  const type = g.type || "max", v = g.v != null ? g.v : g.kg, v2 = g.v2, k = keyOf(g.name);
  // Race: progress is your longest run of the last 4 weeks against the longest run of the plan; done once you ran the race.
  if (type === "race"){
    const R = RACES[g.name] || RACES.__race5, series = Object.keys(log).sort().map(d => ({ d, v: runKm(d) })).filter(p => p.v > 0);
    const cur = recentLongRun() || null, done = series.some(p => g.date && p.d >= addDays(g.date, -1) && p.v >= R.km * .97);
    return { type, cur, done, pct: cur ? Math.round(Math.min(1, cur / R.peak) * 100) : 0, lower: false, series, target: R.peak,
      curText: cur ? `${fmt(Math.round(cur * 10) / 10)} km` : "—", targetText: R.label, unit: "km" };
  }
  const sessions = Object.keys(log).sort().map(d => ({ d, sets: (log[d].ex[k] || { sets: [] }).sets, cardio: (log[d].cardio || []).filter(c => c.type === g.name) }));
  const kgW = latestBw() || 0;
  let per = d => null, lower = false;      // value per training day (for the trend), best = max (or min when lower is better)
  if (type === "max") per = x => x.sets.length ? Math.max(...x.sets.map(st => st.w || 0)) : null;
  if (type === "addw") per = x => x.sets.length ? Math.max(...x.sets.map(st => st.w || 0)) : null;
  if (type === "e1rm") per = x => x.sets.some(st => st.w > 0) ? Math.max(...x.sets.filter(st => st.w > 0).map(e1rm)) : null;
  if (type === "wr") per = x => x.sets.length ? Math.max(...x.sets.filter(st => (st.r || 0) >= v2).map(st => st.w || 0), 0) : null;
  if (type === "reps" || type === "time") per = x => x.sets.length ? Math.max(...x.sets.map(st => st.r || 0)) : null;
  if (type === "dist") per = x => x.cardio.length ? Math.max(...x.cardio.map(c => distUnit(g.name) === "km" ? c.km || 0 : c.m || (c.km || 0) * 1000)) : null;
  if (type === "dur") per = x => x.cardio.length ? Math.max(...x.cardio.map(c => c.min || 0)) : null;
  if (type === "pace"){ lower = true; per = x => { const r = x.cardio.filter(c => c.km > 0 && c.min > 0); return r.length ? Math.min(...r.map(c => c.min / c.km * v)) : null; }; }
  let series = sessions.map(x => ({ d: x.d, v: per(x) })).filter(p => p.v != null && (lower || p.v > 0));
  if (type === "body"){
    series = Object.entries(prefs.body || {}).sort((a, b) => a[0] < b[0] ? -1 : 1).map(([d, w]) => ({ d, v: w }));
    lower = (g.start || (series[0] || {}).v || v) > v;
  }
  if (type === "freq"){
    const dates = Object.keys(log), wk = n => dates.filter(d => daysAgo(d) >= n * 7 && daysAgo(d) < (n + 4) * 7).length / 4;
    series = [3, 2, 1, 0].map(n => ({ d: addDays(today(), -n * 7), v: wk(n) }));
  }
  const vals = series.map(p => p.v);
  let cur = null;
  if (vals.length) cur = type === "body" || type === "freq" ? vals[vals.length - 1] : lower ? Math.min(...vals) : Math.max(...vals);
  const done = cur != null && (lower ? cur <= (type === "pace" ? v2 : v) : cur >= v);
  const target = type === "pace" ? v2 : v;
  let pct = 0;
  if (cur != null){
    if (type === "body"){ const st = g.start || vals[0]; pct = st === v ? 100 : Math.round(Math.max(0, Math.min(1, (st - cur) / (st - v))) * 100); }
    else pct = Math.round(Math.min(1, lower ? target / cur : cur / target) * 100);
  }
  const fmtV = (val, u) => val == null ? "—" : u === "w" ? fw(Math.round(val * 2) / 2) : u === "min" && type === "pace" ? paceText(val) : `${fmt(Math.round(val * 10) / 10)}${unitText(u, g.name) ? " " + unitText(u, g.name) : ""}`;
  const unit = type === "pace" ? "min" : GOAL_TYPES[type].unit;
  const curText = type === "wr" && cur != null ? `${fw(cur)} × ${v2}` : fmtV(cur, unit);
  const targetText = type === "wr" ? `${fw(v)} × ${v2}` : type === "pace" ? `${fmt(v)} km < ${paceText(v2)}` : fmtV(v, unit);
  return { type, cur, done, pct, lower, series, target, curText, targetText, unit };
}
function goalStatus(g, ev){
  if (ev.done) return "✓ Doel gehaald!";
  if (ev.type === "race"){
    if (!g.date || g.date < today()) return "Datum voorbij.";
    const wk = Math.ceil((new Date(g.date) - new Date(today())) / 6048e5);
    return wk <= 1 ? "Deze week is het zover." : ev.cur ? `Nog ${wk} weken. Je langste loop de laatste 4 weken: ${fmt(Math.round(ev.cur * 10) / 10)} km.` : `Nog ${wk} weken. Log je loopjes als Lopen of Loopband.`;
  }
  if (ev.cur == null) return "Nog geen gegevens om een trend te berekenen.";
  if (ev.type === "freq") return ev.cur >= ev.target ? "✓ Doel gehaald!" : `Nog ${fmt(Math.round((ev.target - ev.cur) * 10) / 10)} training per week erbij.`;
  if (!g.date) return "";
  const pts = ev.series.filter(p => daysAgo(p.d) <= 56);
  const left = (new Date(g.date) - new Date(today())) / 6048e5;
  if (left < 0) return "Datum voorbij.";
  if (pts.length < 2) return "Nog geen gegevens om een trend te berekenen.";
  const wks = Math.max(1, (new Date(pts[pts.length - 1].d) - new Date(pts[0].d)) / 6048e5);
  const rate = (pts[pts.length - 1].v - pts[0].v) / wks, proj = ev.cur + rate * left;
  const ok = ev.lower ? proj <= ev.target : proj >= ev.target;
  const per = v2 => ev.unit === "w" ? fw(Math.round(Math.abs(v2) * 10) / 10) : `${fmt(Math.round(Math.abs(v2) * 10) / 10)}${ev.unit === "min" && ev.type === "pace" ? " min" : unitText(ev.unit, g.name) ? " " + unitText(ev.unit, g.name) : ""}`;
  return ok ? `Op schema: met je tempo (${per(rate)}/week) haal je het.` : `Iets achter: je hebt ongeveer ${per((ev.target - ev.cur) / Math.max(left, 0.1))} per week nodig.`;
}
function goalRow(g){
  const ev = goalEval(g), name = g.name === "__body" ? "Lichaamsgewicht" : g.name === "__freq" ? "Trainingen per week" : RACES[g.name] ? RACES[g.name].label : g.name;
  return `<div class="goal${ev.done ? " done" : ""}"><div class="goal-top"><b>${esc(name)}</b><span>${esc(ev.curText)} / ${esc(ev.targetText)}${g.date ? ` · tegen ${esc(shortDate(g.date))}` : ""}</span></div>
    <small class="goal-type">${esc(GOAL_TYPES[ev.type].label)}</small>
    <div class="mb-track"><div class="mb-fill" style="width:${ev.pct}%"></div></div><p class="note">${esc(goalStatus(g, ev))}</p>
    ${ev.done ? "" : `<details class="how goal-plan"><summary>Plan en tips</summary>${goalPlanHtml(g)}</details>`}</div>`;
}
// ---------- Goal coach: is the goal realistic, how often to train, and the next step ----------
const GOAL_TIPS = {
  max: ["Train de oefening 2× per week: een zware dag (3–5 sets van 3–5 reps) en een lichtere dag (3 sets van 8–10).",
    "Verhoog in kleine stappen. Lukt het niet, herhaal het gewicht en mik op 1 rep meer.",
    "Rust 2–3 minuten tussen zware sets en warm op met 2–3 opbouwsets."],
  e1rm: ["Wissel zware sets (3–6 reps) af met volume (8–10 reps): beide verhogen je 1RM.",
    "Test je echte maximum hooguit om de 6–8 weken; de schatting volgt je vooruitgang ook zo.",
    "Hulpoefeningen voor dezelfde spieren helpen, bv. schuin drukken of dips voor bankdrukken."],
  wr: ["Dubbele progressie: haal eerst alle sets met het doelaantal reps, ga pas dan zwaarder.",
    "Blijf 1–2 reps van falen; techniek gaat voor.",
    "Log elke set: zo ziet de app wanneer je klaar bent voor de volgende stap."],
  reps: ["Train 3× per week met sets tot 1–2 reps voor falen.",
    "Verspreid ook een paar makkelijke sets over de dag (bv. 5× de helft van je maximum).",
    "Vast op hetzelfde aantal? Doe een zwaardere variant met minder reps en kom dan terug."],
  addw: ["Begin met kleine schijven en 3 sets van 3–5 reps.",
    "Houd ook een lichte dag met extra reps zonder gewicht.",
    "Gebruik een dipriem of gewichtsvest en zwaai niet."],
  time: ["Doe 3–4 sets tot net voor je techniek breekt, 3× per week.",
    "Voeg elke week 5–10 seconden toe, of maak het zwaarder (voeten verder, één been).",
    "Adem rustig door en span buik en billen aan."],
  dist: ["Verleng je langste sessie met hooguit 10% per week.",
    "Train 3× per week: één lange rustige sessie en twee kortere.",
    "Neem elke 4e week wat gas terug om te herstellen."],
  dur: ["Voeg per week 5–10 minuten toe aan één sessie.",
    "Train meestal in praattempo (zone 2).",
    "Bouw na 3 weken één rustigere week in."],
  pace: ["Doe 1× per week intervallen, bv. 5× 3 minuten iets sneller dan je doeltempo.",
    "Doe 1× per week 20 minuten op doeltempo en verder rustige duurlopen.",
    "Leg je doelafstand ook geregeld rustig af, zodat de afstand vertrouwd voelt."],
  bodyDown: ["Mik op 0,5–1% van je gewicht per week; sneller kost spiermassa.",
    "Eet 1,6–2,2 g eiwit per kg en blijf zwaar trainen om je spieren te behouden.",
    "Weeg je 's ochtends en kijk naar het gemiddelde van de week."],
  bodyUp: ["Mik op 0,25–0,5% van je gewicht per week met een klein overschot (±300 kcal per dag).",
    "Train progressief zwaarder, zodat het extra gewicht vooral spier wordt.",
    "Eet 1,6–2,2 g eiwit per kg, verspreid over de dag."],
  race: ["Loop de meeste kilometers rustig, in praattempo; alleen de snellere training is echt zwaar.",
    "Verleng je lange duurloop met hooguit 10–15% per week; elke 4e week is rustiger.",
    "Probeer schoenen, kleding en eten onderweg uit tijdens je lange duurlopen, niet pas op de wedstrijd."],
  freq: ["Plan vaste dagen in de Weekplanning en zet ze in je agenda.",
    "Korte trainingen tellen ook: kies Snel als je weinig tijd hebt.",
    "Leg een rustdag na zware beendagen."]
};
const IDEAL_FREQ = { max: 2, e1rm: 2, wr: 2, addw: 2, reps: 3, time: 3, dist: 3, dur: 3, pace: 3, body: 3, freq: 3 };
function exFreq(name){
  const k = keyOf(name);
  return Object.keys(log).filter(d => daysAgo(d) < 28 && ((log[d].ex[k] && log[d].ex[k].sets.length) || (log[d].cardio || []).some(c => c.type === name))).length / 4;
}
function goalPlan(g){
  const ev = goalEval(g), t = ev.type, cur = ev.cur;
  if (t === "race"){
    const R = RACES[g.name], weeksLeft = g.date ? Math.max(0, (new Date(g.date) - new Date(today())) / 6048e5) : null;
    const p = g.date && g.date >= today() ? racePlan(g) : null, w = p && p.list[0], long = w && w.sessions.find(s => s.name === "Lange duurloop");
    const verdict = p ? (p.weeks >= R.rec ? "ok" : p.weeks >= R.min ? "tough" : "hard") : null;
    return { ev, weeksLeft, gap: null, need: null, hist: null, verdict, eta: null, next: long ? `Deze week: lange duurloop van ${fmt(long.km)} km.` : "",
      often: p ? `Loop ${p.runs}× per week: één lange duurloop, één snellere training en de rest rustig.` : "", tips: GOAL_TIPS.race.slice(), freqNow: null, ideal: p ? p.runs : 3 };
  }
  const weeksLeft = g.date ? Math.max(0, (new Date(g.date) - new Date(today())) / 6048e5) : null;
  const gap = cur == null ? null : Math.max(0, ev.lower ? cur - ev.target : ev.target - cur);
  const need = gap != null && weeksLeft != null ? gap / Math.max(weeksLeft, 0.5) : null;
  const pts = ev.series.filter(p => daysAgo(p.d) <= 56);
  let hist = null;
  if (pts.length >= 2){ const wks = Math.max(1, (new Date(pts[pts.length - 1].d) - new Date(pts[0].d)) / 6048e5); hist = (pts[pts.length - 1].v - pts[0].v) / wks * (ev.lower ? -1 : 1); }
  // A realistic weekly step for this kind of goal, blended with your own recent pace
  const kg = latestBw() || 75;
  const ref = cur == null ? null : { max: Math.max(stepFor(cur) / 2, cur * .0125), e1rm: cur * .0125, wr: Math.max(stepFor(cur) / 2, cur * .0125), addw: 1.25, reps: 1.5, time: 10,
    dist: cur * .1, dur: Math.max(5, cur * .1), pace: cur * .01, body: ev.lower ? kg * .0075 : kg * .0035, freq: .5 }[t];
  const eff = ref == null ? null : hist != null && hist > 0 ? (hist + ref) / 2 : ref;
  let verdict = null, eta = null;
  if (need != null && eff && gap > 0){
    const fast = hist != null && hist > 0 && need <= hist;   // your own recent pace already does it
    verdict = fast || need <= eff ? "ok" : need <= eff * 1.6 ? "tough" : "hard";
    eta = addDays(today(), Math.ceil(gap / (hist > 0 ? Math.max(hist, eff) : eff) * 7));
  }
  const freqNow = t === "body" || t === "freq" ? null : exFreq(g.name), ideal = IDEAL_FREQ[t];
  const per = need != null ? need : eff;                      // per week
  const perSession = per != null ? per / Math.max(1, ideal) : null;
  // Next step for the coming session
  let next = "";
  const roundStep = (v, base) => { const st = stepFor(base); return Math.ceil(v / st - 1e-9) * st; };
  const onGrid = w => { const st = stepFor(w); return Math.round(w / st) * st; };   // a weight you can load
  if (cur != null && !ev.done){
    if (t === "max"){ const w = Math.min(ev.target, onGrid(cur + roundStep(Math.max(perSession, stepFor(cur) / 2), cur))); next = `Volgende zware set: ${fw(w)} × 3–5.`; }
    if (t === "addw"){ const w = Math.min(ev.target, cur + roundStep(Math.max(perSession, 1), Math.max(cur, 20))); next = `Volgende keer: ${fw(w)} extra × 3–5.`; }
    if (t === "e1rm"){ const goal1 = Math.min(ev.target, cur + Math.max(perSession, stepFor(cur) / 2)), w = onGrid(goal1 / (1 + 5 / 30)); next = `Volgende training: ${fw(w)} × 5 (geschatte 1RM ${fw(Math.round(goal1))}).`; }
    if (t === "wr"){
      const k = keyOf(g.name), sets = Object.values(log).flatMap(d => ((d.ex[k] || { sets: [] }).sets));
      const bestW = Math.max(0, ...sets.map(x => x.w || 0)), atBest = sets.filter(x => x.w === bestW).map(x => x.r || 0), r = atBest.length ? Math.max(...atBest) : 0;
      next = r >= g.v2 ? `Volgende training: ${fw(Math.min(g.v, onGrid(bestW + stepFor(bestW))))} × ${g.v2}.` : `Volgende training: ${fw(bestW)} × ${Math.min(g.v2, r + 1)}, daarna zwaarder.`;
    }
    if (t === "reps") next = `Volgende training: eerste set ${Math.min(ev.target, cur + Math.max(1, Math.ceil(perSession)))} reps.`;
    if (t === "time") next = `Volgende training: ${Math.min(ev.target, cur + Math.max(5, Math.ceil(perSession / 5) * 5))} seconden volhouden.`;
    if (t === "dist"){ const u = distUnit(g.name), d = Math.min(ev.target, cur + Math.min(cur * .1, Math.max(per, cur * .05))); next = `Langste sessie deze week: ${fmt(Math.round(d * (u === "km" ? 10 : .01)) / (u === "km" ? 10 : .01))} ${u}.`; }
    if (t === "dur") next = `Langste sessie deze week: ${Math.round(Math.min(ev.target, cur + Math.max(5, per)))} min.`;
    if (t === "pace"){ const tm = Math.max(ev.target, cur - Math.max(per, cur * .01)); next = `Deze week: ${fmt(g.v)} km in ${paceText(tm)} (${paceText(tm / g.v)}/km).`; }
    if (t === "body"){ const kcal = Math.round(Math.min(1000, per * 7700 / 7) / 50) * 50; next = ev.lower ? `Mik op −${fw(Math.round(per * 10) / 10)} per week: ongeveer ${kcal} kcal per dag minder dan je verbruikt.` : `Mik op +${fw(Math.round(per * 10) / 10)} per week: ongeveer ${kcal} kcal per dag meer dan je verbruikt.`; }
    if (t === "freq") next = `Plan deze week ${Math.ceil(ev.target)} trainingen in.`;
  }
  // How often: frequency and sets
  let often = "";
  if (t === "freq" || t === "body") often = t === "body" ? `Train ${ideal}× per week kracht om je spieren te behouden.` : "";
  else {
    const now = Math.round(freqNow * 10) / 10;
    const sets = { max: "3–5 zware sets", e1rm: "3–5 sets", wr: "3–4 sets", addw: "3 sets", reps: "3–4 sets", time: "3–4 sets" }[t];
    const extra = verdict === "hard" ? ideal + 1 : ideal;
    often = cur == null ? `Ideaal: ${extra}× per week.` : now < extra ? `Ideaal: ${extra}× per week${sets ? ", " + sets : ""}. Nu ${fmt(now)}× per week.` : `Je traint dit ${fmt(now)}× per week: goed zo.${sets ? " Houd " + sets + " per training aan." : ""}`;
  }
  const tips = (t === "body" ? GOAL_TIPS[ev.lower ? "bodyDown" : "bodyUp"] : GOAL_TIPS[t]).slice();
  const exTips = TIPS[g.name]; if (exTips) tips.push(...exTips.slice(0, 2));
  return { ev, weeksLeft, gap, need, hist, verdict, eta, next, often, tips, freqNow, ideal };
}
const planUnit = (g, ev, v) => ev.unit === "w" ? fw(Math.round(v * 10) / 10) : ev.type === "pace" ? `${fmt(Math.round(v * 10) / 10)} min` : `${fmt(Math.round(v * 10) / 10)}${unitText(ev.unit, g.name) ? " " + unitText(ev.unit, g.name) : ""}`;
function goalPlanHtml(g){
  const pl = goalPlan(g), ev = pl.ev;
  if (ev.done) return `<p class="note">Doel gehaald. Zet een nieuw doel om verder te groeien.</p>`;
  const lines = [];
  if (pl.verdict){
    const v = { ok: ["ok", "Haalbaar"], tough: ["tough", "Ambitieus"], hard: ["hard", "Zeer ambitieus"] }[pl.verdict];
    lines.push(`<p class="gp-verdict ${v[0]}"><b>${v[1]}</b></p>`);
  }
  if (pl.need != null && pl.gap > 0) lines.push(`<p class="gp-line">Nodig: ${esc(planUnit(g, ev, pl.need))} per week, nog ${Math.ceil(pl.weeksLeft)} weken.</p>`);
  if (pl.hist != null && ev.type !== "freq") lines.push(`<p class="gp-line">${pl.hist > 0 ? `Jouw tempo de laatste weken: ${esc(planUnit(g, ev, pl.hist))} per week.` : "De laatste weken geen vooruitgang op dit doel."}</p>`);
  if (pl.verdict && pl.verdict !== "ok" && pl.eta) lines.push(`<p class="gp-line">Met een realistisch tempo haal je het rond ${esc(shortDate(pl.eta))}. Verleng je datum, of train vaker zoals hieronder.</p>`);
  if (pl.next) lines.push(`<p class="gp-next"><b>${esc(pl.next)}</b></p>`);
  if (pl.often) lines.push(`<p class="gp-line">${esc(pl.often)}</p>`);
  lines.push(`<ul class="tips"><li class="tips-h">Tips</li>${pl.tips.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`);
  return lines.join("");
}
// One line in the exercise card while training
function goalCoachHtml(name){
  const g = (prefs.goals || []).find(x => x.name === name && !goalEval(x).done); if (!g) return "";
  const pl = goalPlan(g), ev = pl.ev;
  const status = pl.verdict === "ok" ? "op schema" : pl.verdict ? "even doorduwen" : "";
  return `<div class="goal-coach"><span class="gc-h">Doel · ${esc(GOAL_TYPES[ev.type].label)}: ${esc(ev.curText)} → ${esc(ev.targetText)}${status ? ` · <i class="gc-st">${esc(status)}</i>` : ""}</span>${pl.next ? `<b>${esc(pl.next)}</b>` : ""}</div>`;
}
function goalFormSync(){
  const name = $("gEx").value, types = goalTypesFor(name), sel = $("gType");
  if (sel.dataset.for !== name){
    sel.innerHTML = types.map(t => `<option value="${t}">${esc(GOAL_TYPES[t].label)}</option>`).join("");
    sel.dataset.for = name;
    // A race: suggest a Sunday after the recommended number of weeks.
    if (RACES[name]) $("gDate").value = addDays(weekOf(today()), RACES[name].rec * 7 - 1);
  }
  const t = sel.value || types[0], gt = GOAL_TYPES[t];
  $("gKg").closest("label").hidden = t === "race";
  $("gUnit").textContent = t === "freq" ? "× / week" : unitText(gt.unit, name);
  $("gVLab").textContent = t === "pace" ? "Afstand" : "Doel";
  $("gV2Wrap").hidden = !gt.unit2;
  $("gV2Lab").textContent = gt.unit2 === "min" ? "Binnen" : "Reps";
  $("gV2Unit").textContent = gt.unit2 === "min" ? "min" : "reps";
  $("gHint").textContent = gt.hint;
  const ev = goalEval({ name, type: t, v: 1, v2: t === "wr" ? 1 : 30, date: "" });
  const sug = { max: ev.cur ? ev.cur + (isLb() ? 10 : 5) : "", e1rm: ev.cur ? Math.round(ev.cur * 1.1) : "", wr: ev.cur ? ev.cur + 2.5 : "", reps: ev.cur ? ev.cur + 5 : 20,
    addw: ev.cur ? ev.cur + 5 : 10, time: ev.cur ? ev.cur + 30 : 60, dist: ev.cur ? Math.round(ev.cur * 1.25) : 5, dur: ev.cur ? ev.cur + 10 : 30, pace: 5, body: latestBw() || 75, freq: 3 }[t];
  $("gKg").placeholder = sug === "" ? "80" : String(t === "max" || t === "e1rm" || t === "wr" || t === "addw" || t === "body" ? fmt(toU(sug)) : fmt(sug));
  $("gV2").placeholder = t === "pace" ? "30" : "8";
  $("gDate").parentElement.hidden = t === "freq";
}
function renderGoals(){
  renderTrainGoalPick();
  const sel = $("gEx");
  if (!sel.options.length){
    const logged = new Set(Object.values(log).flatMap(s => Object.values(s.ex).map(e => e.name)));
    const names = allExerciseNames().concat(allSchemes().flatMap(c => c.days.flatMap(d => d.ex.map(x => x[0]))), [...logged]).filter(n => !cardioType(n));
    const uniq = [...new Set(names)].filter(n => !isStretch(n));
    const order = arr => arr.filter(n => logged.has(n)).concat(arr.filter(n => !logged.has(n)));
    const group = (label, arr) => arr.length ? `<optgroup label="${esc(label)}">${order(arr).map(n => `<option value="${esc(n)}">${esc(n)}</option>`).join("")}</optgroup>` : "";
    const by = k => uniq.filter(n => exKind(n) === k);
    // General first, then Cardio (races with a running plan, then the cardio exercises), then strength.
    sel.innerHTML = `<optgroup label="Algemeen"><option value="__body">Lichaamsgewicht</option><option value="__freq">Trainingen per week</option></optgroup>`
      + `<optgroup label="Cardio">${Object.entries(RACES).map(([k, r]) => `<option value="${k}">${esc(r.label)}</option>`).join("")}${order(CARDIO_TYPES.map(c => c[0])).map(n => `<option value="${esc(n)}">${esc(n)}</option>`).join("")}</optgroup>`
      + group("Kracht met gewicht", by("weight")) + group("Lichaamsgewicht-oefeningen", by("bw")) + group("Volhouden (tijd)", by("time"));
    sel.value = logged.has("Bench Press") || uniq.includes("Bench Press") ? "Bench Press" : sel.options[0].value;
    $("gDate").value = addDays(today(), 84);
    goalFormSync();
  }
  renderTargetWeight();
  // Two goals for the same exercise (from before): keep the newest one.
  // (Body-weight targets are the exception: you can have several, one per date.)
  const dupKey = g => isBodyGoal(g) ? "__body|" + g.date : g.name;
  if (prefs.goals && new Set(prefs.goals.map(dupKey)).size < prefs.goals.length){
    prefs.goals = prefs.goals.filter((g, i, a) => !a.slice(i + 1).some(h => dupKey(h) === dupKey(g))); savePrefs();
  }
  const goals = prefs.goals || [];
  $("goalList").innerHTML = goals.length ? goals.map((g, i) => goalRow(g).replace('<div class="goal-top">', `<div class="goal-top"><button type="button" class="goal-x" data-gi="${i}" aria-label="Doel verwijderen">×</button>`) + goalPlanNote(g)).join("")
    : `<p class="note">Nog geen doelen. Kies een oefening, een soort doel en een datum.</p>`;
  $("goalList").querySelectorAll("[data-gi]").forEach(b => b.onclick = () => { const sn = takeSnapshot(); prefs.goals = goals.filter((_, i) => i !== +b.dataset.gi); savePrefs(); renderPlanning(); undoToast("Doel verwijderd", sn); });
  renderRacePlan();
}

function renderMilestones(){
  const dates = Object.keys(log).sort();
  const weeks = [...new Set(dates.map(weekOf))].sort();
  let longest = 0, run = 0, prevW = "";
  weeks.forEach(x => { run = prevW && addDays(prevW, 7) === x ? run + 1 : 1; longest = Math.max(longest, run); prevW = x; });
  let heaviest = 0, volume = 0, prs = 0; const best = {};
  dates.forEach(d => Object.entries(log[d].ex).forEach(([k, e]) => e.sets.forEach(st => {
    heaviest = Math.max(heaviest, st.w || 0); volume += (st.w || 0) * (st.r || 0);
    if (st.w > 0){ if (best[k] != null && st.w > best[k]) prs++; best[k] = Math.max(best[k] || 0, st.w); }
  })));
  const list = [];
  [1, 10, 25, 50, 100, 250].forEach(n => list.push({ t: `${n} ${n === 1 ? "training" : "trainingen"}`, ok: dates.length >= n, p: `${Math.min(dates.length, n)}/${n}` }));
  [2, 4, 8, 12, 26].forEach(n => list.push({ t: `${n} weken op rij`, ok: longest >= n, p: `${Math.min(longest, n)}/${n}` }));
  [60, 80, 100, 120, 140].forEach(n => list.push({ t: `Eerste ${fw(n)}`, ok: heaviest >= n, p: `${fw(Math.round(heaviest))}` }));
  [10, 50, 100, 500].forEach(n => list.push({ t: `${fmt(Math.round(toU(n * 1000) / 100) / 10)}k ${U()} getild`, ok: volume >= n * 1000, p: `${fmt(Math.round(toU(volume) / 100) / 10)}k` }));
  [1, 10, 25, 50].forEach(n => list.push({ t: `${n} ${n === 1 ? "record" : "records"}`, ok: prs >= n, p: `${Math.min(prs, n)}/${n}` }));
  const got = list.filter(x => x.ok).length;
  $("badges").innerHTML = `<p class="note"><b>${got}</b> van ${list.length} mijlpalen behaald.</p><div class="badge-grid">` + list.map(x => `
    <div class="mbadge${x.ok ? " ok" : ""}" title="${esc(x.t)}">
      <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="17" r="12"/><path d="M13 27l-3 10 10-4 10 4-3-10"/>${x.ok ? `<path class="tick" d="M14.5 17l4 4 7-8"/>` : ""}</svg>
      <b>${esc(x.t)}</b><small>${x.ok ? "behaald" : esc(x.p)}</small></div>`).join("") + `</div>`;
}

function weekBars(boxId, values, labelFn){
  const thisWeek = weekOf(today()), wk = [];
  for (let i = 7; i >= 0; i--) wk.push(addDays(thisWeek, -7 * i));
  const vals = wk.map(w => values[w] || 0), max = Math.max(1, ...vals);
  $(boxId).innerHTML = wk.map((w, i) => `<div class="wk${w === thisWeek ? " now" : ""}" title="Week van ${esc(shortDate(w))}: ${esc(labelFn(vals[i]))}"><b>${esc(labelFn(vals[i], true))}</b>
    <div class="wk-bar${vals[i] ? "" : " zero"}" style="height:${vals[i] ? Math.max(4, Math.round(vals[i] / max * 80)) : 2}%"></div>
    <small>${w === thisWeek ? "nu" : esc(shortDate(w))}</small></div>`).join("");
}
function renderVolume(){
  const sel = $("volGroup"), groups = ["Trainingen", "Cardio", "Alles"].concat(RECOVERY_SHOWN);
  if (!sel.options.length) sel.innerHTML = groups.map(g => `<option>${esc(g)}</option>`).join("");
  const g = sel.value || "Trainingen";
  if (g === "Trainingen"){
    const per = {};
    Object.keys(log).forEach(d => { per[weekOf(d)] = (per[weekOf(d)] || 0) + 1; });
    weekBars("volWeeks", per, (v, short) => short ? String(v) : v + (v === 1 ? " training" : " trainingen"));
    $("volNote").textContent = "Aantal trainingen per week, laatste 8 weken.";
    return;
  }
  if (g === "Cardio"){
    const per = {};
    Object.keys(log).forEach(d => (log[d].cardio || []).forEach(c => { per[weekOf(d)] = (per[weekOf(d)] || 0) + c.min; }));
    weekBars("volWeeks", per, (v, short) => short ? String(v) : v + " min");
    $("volNote").textContent = "Cardio-minuten per week, laatste 8 weken.";
    return;
  }
  const per = {};
  Object.keys(log).forEach(d => Object.values(log[d].ex).forEach(e => {
    let f = 1;
    if (g !== "Alles"){
      const m = MUSCLES[e.name]; if (!m) return;
      f = m[0].map(muscleGroup).includes(g) ? 1 : m[1].map(muscleGroup).includes(g) ? 0.5 : 0;
      if (!f) return;
    }
    const v = e.sets.reduce((a, st) => a + (st.w || 0) * (st.r || 0), 0) * f;
    per[weekOf(d)] = (per[weekOf(d)] || 0) + v;
  }));
  weekBars("volWeeks", per, (v, short) => short ? (v ? (toU(v) >= 1000 ? fmt(Math.round(toU(v) / 100) / 10) + "k" : String(Math.round(toU(v)))) : "0") : fw(Math.round(v)));
  $("volNote").textContent = "Volume = gewicht × reps van al je sets. Stijgt het over de weken, dan verzet je meer werk.";
}
function renderCardioStats(){
  let monthMin = 0, monthKm = 0, total = 0;
  Object.keys(log).forEach(d => (log[d].cardio || []).forEach(c => {
    total += c.min;
    if (monthOf(d) === monthOf(today())){ monthMin += c.min; monthKm += c.km || 0; }
  }));
  const perType = {};
  Object.keys(log).forEach(d => (log[d].cardio || []).forEach(c => { const o = perType[c.type] = perType[c.type] || { min: 0, n: 0, best: null }; o.min += c.min || 0; o.n++;
    const v = c.km ? c.min / c.km : c.m ? c.min / (c.m / 500) : null;
    if (v && (!o.best || v < o.best.v)) o.best = { v, lab: c.km ? paceText(v) + "/km" : paceText(v) + "/500 m" }; }));
  $("cardioTypes").innerHTML = Object.entries(perType).sort((a, b) => b[1].min - a[1].min).map(([t, o]) =>
    `<div class="rec-row"><span class="rec-name">${esc(t)}</span><span class="rec-vals"><b>${Math.round(o.min)} min</b> in ${o.n} ${o.n === 1 ? "keer" : "keer"}${o.best ? ` · snelste tempo <b>${esc(o.best.lab)}</b>` : ""}</span></div>`).join("");
  $("cardioSum").textContent = total ? `Deze maand: ${monthMin} minuten${monthKm ? ", " + fmt(Math.round(monthKm * 10) / 10) + " km" : ""}. Richtlijn: 150 minuten matige beweging per week.` : "Nog geen cardio gelogd. Kies in Training het schema Cardio.";
}

// ---------- Cardio: its own scheme, with the metrics each machine shows ----------
// Metric: [label, unit, input mode, step used for "a bit harder"]
const CARDIO_METRICS = {
  min:     ["Duur", "min", "numeric", 2],
  km:      ["Afstand", "km", "decimal", 0.2],
  m:       ["Afstand", "m", "numeric", 100],
  speed:   ["Snelheid", "km/u", "decimal", 0.3],
  incline: ["Helling", "%", "decimal", 0.5],
  level:   ["Weerstand", "niveau", "numeric", 1],
  watt:    ["Gem. vermogen", "watt", "numeric", 5],
  rpm:     ["Cadans", "rpm", "numeric", 5],
  spm:     ["Slagen", "per min", "numeric", 1],
  floors:  ["Verdiepingen", "", "numeric", 5],
  jumps:   ["Sprongen", "", "numeric", 50],
  rounds:  ["Rondes", "", "numeric", 1],
  work:    ["Werk", "sec", "numeric", 5],
  rest:    ["Rust", "sec", "numeric", -5],
  hr:      ["Gem. hartslag", "bpm", "numeric", 0],
  kcal:    ["Calorieën", "kcal", "numeric", 0],
  split:   ["Tijd", "m:ss", "text", 0]
};
// [name, Dutch name, how-to, metrics, intensity metric (what goes up once the time target is reached), target minutes, muscles strong, less]
const CARDIO_TYPES = [
  ["Loopband", "Loopband (lopen of joggen)", "Begin rustig, voeten midden op de band, rechtop lopen zonder de leuningen vast te houden.", ["min","km","speed","incline","hr","kcal"], "speed", "20–40", ["Quadriceps","Kuiten"], ["Hamstrings","Billen"]],
  ["Hellingwandelen", "Wandelen op helling (bv. 12-3-30)", "Loopband op 10–15% helling en 4–5 km/u, stevig doorstappen zonder vast te houden. Zacht voor je gewrichten.", ["min","speed","incline","hr","kcal"], "incline", "20–30", ["Billen","Kuiten"], ["Hamstrings","Quadriceps"]],
  ["Lopen", "Lopen (buiten of op de piste)", "Rustig tempo waarbij je nog kan praten; voor snelheid af en toe een sneller stuk.", ["min","km","hr","kcal"], "km", "20–45", ["Quadriceps","Kuiten"], ["Hamstrings","Billen"]],
  ["Spinning", "Spinning / hometrainer (fietsen)", "Zadel op heuphoogte, knie licht gebogen onderaan. Weerstand zo dat je stevig moet trappen.", ["min","km","level","rpm","watt","hr","kcal"], "level", "20–45", ["Quadriceps"], ["Billen","Hamstrings","Kuiten"]],
  ["Roeien", "Roeien (roeitoestel)", "Volgorde: benen duwen, romp achterover, armen trekken; terug in omgekeerde volgorde. Kracht komt vooral uit je benen.", ["min","m","watt","spm","hr","kcal"], "m", "10–30", ["Lats","Quadriceps"], ["Bovenrug","Biceps","Billen","Hamstrings"]],
  ["Traploper", "Traploper (StairMaster)", "Rechtop blijven, niet op de leuningen leunen, hele voet op de trede.", ["min","floors","level","hr","kcal"], "level", "15–30", ["Billen","Quadriceps"], ["Kuiten","Hamstrings"]],
  ["Crosstrainer", "Crosstrainer", "Duw en trek mee met de armen, hielen op de pedalen. Zacht voor knieën en heupen.", ["min","km","level","hr","kcal"], "level", "20–40", ["Quadriceps","Billen"], ["Borst","Bovenrug","Triceps"]],
  ["Air bike", "Air bike / assault bike", "Fiets met bewegende armen en een ventilator: hoe harder je gaat, hoe zwaarder. Ideaal voor korte, felle intervallen.", ["min","kcal","watt","hr"], "watt", "8–20", ["Quadriceps"], ["Borst","Bovenrug","Triceps","Billen"]],
  ["SkiErg", "SkiErg (skiën met armen)", "Met beide armen de handvatten naar beneden trekken en licht door de knieën buigen, zoals langlaufen.", ["min","m","watt","hr","kcal"], "m", "8–20", ["Lats","Triceps"], ["Buikspieren","Bovenrug","Achterkant schouders"]],
  ["Springtouw", "Springtouw", "Kleine sprongetjes op je voorvoeten, polsen draaien het touw. Begin met korte blokken.", ["min","jumps","hr","kcal"], "jumps", "5–15", ["Kuiten"], ["Quadriceps","Onderarmen","Voorkant schouders"]],
  ["Wandelen", "Wandelen (buiten)", "Stevig doorstappen tegen ±4,5–5,5 km/u, rechtop en met meezwaaiende armen. Zacht voor je gewrichten: ideaal om vet te verbranden of om te herstellen van een blessure.", ["min","km","speed","hr","kcal"], "km", "30–65", ["Kuiten","Billen"], ["Quadriceps","Hamstrings"]],
  ["Zwemmen", "Zwemmen (baantjes)", "Rustig baantjes trekken in schoolslag, borstcrawl of rugslag. Het water draagt je gewicht: ideaal bij blessures aan knie, rug of enkel, en goed voor je conditie.", ["min","m","hr","kcal"], "m", "20–45", ["Lats","Voorkant schouders"], ["Borst","Triceps","Quadriceps","Buikspieren"]],
  ["Fietsen", "Fietsen (buiten / racefiets)", "Zadel op heuphoogte, rustig ronddraaien in een lichte versnelling. Duurritten in praattempo, met een helm op.", ["min","km","speed","hr","kcal"], "km", "45–120", ["Quadriceps"], ["Billen","Hamstrings","Kuiten"]],
  ["Intervallopen", "Intervallen lopen", "10 min inlopen, dan 6–8× 2–3 min snel met telkens 1–2 min wandelen of joggen, en 5–10 min uitlopen.", ["rounds","work","rest","min","km","hr","kcal"], "rounds", "30–45", ["Quadriceps","Kuiten"], ["Hamstrings","Billen"]],
  ["Zwemintervallen", "Zwemmen (intervallen)", "Inzwemmen, dan bv. 8× 50 m vlot met 20–30 sec rust aan de kant, en rustig uitzwemmen.", ["rounds","m","rest","min","hr","kcal"], "rounds", "30–45", ["Lats","Voorkant schouders"], ["Borst","Triceps","Quadriceps","Buikspieren"]],
  ["HIIT-intervallen", "HIIT-intervallen", "Afwisselend kort voluit en kort rust, op een toestel naar keuze (bv. 30 sec sprint, 30 sec rustig).", ["rounds","work","rest","min","hr","kcal"], "rounds", "10–20", ["Quadriceps"], ["Billen","Kuiten","Buikspieren"]],
  ["Ligfiets", "Ligfiets (hometrainer met rugleuning)", "Rug tegen de leuning, zadel zo dat je knie onderaan licht gebogen is. Zacht voor je rug en knieën, ideaal om lang en rustig te trainen.", ["min","km","level","rpm","watt","hr","kcal"], "level", "20–45", ["Quadriceps"], ["Billen","Hamstrings"]],
  ["Arc trainer", "Arc trainer", "Soepele, ellipsvormige beweging met instelbare weerstand en helling. Blijf rechtop en laat de leuningen los voor meer werk voor je benen en billen.", ["min","level","incline","hr","kcal"], "level", "15–30", ["Billen","Quadriceps"], ["Hamstrings","Kuiten"]],
  ["VersaClimber", "VersaClimber (klimtrainer)", "Klim met armen en benen tegelijk op het verticale toestel, in een vast ritme. Pittig voor je hele lichaam; begin met korte blokken.", ["min","m","hr","kcal"], "m", "5–15", ["Quadriceps","Billen","Lats"], ["Schouders","Triceps","Kuiten"]],
  ["Stepper", "Stepper (mini-stepper)", "Stap op en neer op de pedalen zonder je knieën vol te strekken. Houd je borst hoog en leun niet op de handgreep.", ["min","level","hr","kcal"], "level", "15–30", ["Billen","Quadriceps"], ["Kuiten"]],
  ["Curved loopband", "Curved loopband (zonder motor)", "Gebogen loopband die door jouw passen beweegt. Loop op je voorvoet en pas je tempo aan; je moet harder werken dan op een gewone loopband.", ["min","km","speed","hr","kcal"], "speed", "10–30", ["Quadriceps","Kuiten"], ["Hamstrings","Billen"]],
  ["Armergometer", "Handfiets (armergometer)", "Draai met je armen op schouderhoogte. Goed voor je conditie als je je benen wil sparen of een blessure hebt.", ["min","level","rpm","watt","hr","kcal"], "level", "10–25", ["Schouders","Triceps"], ["Biceps","Bovenrug"]],
  ["Battle ropes", "Battle ropes", "Slaan met de touwen in golven, met lichte knieën en een stevige romp. Werk in blokken van 20–40 sec met rust ertussen.", ["rounds","work","rest","min","hr","kcal"], "rounds", "8–15", ["Schouders","Buikspieren"], ["Bovenrug","Biceps","Quadriceps"]]
];
CARDIO_TYPES.forEach(([n, nl, desc, , , , strong, less]) => { if (!NL[n]) NL[n] = [nl, desc]; if (!MUSCLES[n]) MUSCLES[n] = [strong, less]; });
const cardioType = n => CARDIO_TYPES.find(c => c[0] === n);
// Cardio: its own category under the group classes. Running, swimming, cycling, walking and rowing.
const cdx = (n, min) => [n, "1", min || cardioType(n)[5], "—", "cardio", "cardio"];
SCHEMES.push({ id: "run", name: "Lopen", crd: true, note: "Hardlopen buiten of op de loopband. Loop de meeste kilometers in praattempo en één keer per week sneller; bouw per week hooguit 10% op.",
  days: [
    { name: "Rustige duurloop", focus: "30–45 min in praattempo: de basis van je conditie", ex: [cdx("Lopen", "30–45")] },
    { name: "Intervallen", focus: "Kort en snel met rustige pauzes: sneller worden", ex: [cdx("Intervallopen")] },
    { name: "Lange duurloop", focus: "1× per week langer en rustiger: uithouding", ex: [cdx("Lopen", "60–90")] },
    { name: "Loopband", focus: "Binnen lopen of stevig wandelen op helling", ex: [cdx("Loopband"), cdx("Hellingwandelen")] }
  ]});
SCHEMES.push({ id: "swim", name: "Zwemmen", crd: true, note: "Baantjes zwemmen: zacht voor je gewrichten en goed voor hart en longen. Wissel schoolslag, crawl en rugslag af.",
  days: [
    { name: "Rustig zwemmen", focus: "20–45 min baantjes in een rustig tempo", ex: [cdx("Zwemmen", "20–45")] },
    { name: "Intervallen", focus: "Korte stukken vlot met rust aan de kant: conditie en snelheid", ex: [cdx("Zwemintervallen")] },
    { name: "Lange afstand", focus: "Lang en rustig zonder te stoppen: uithouding", ex: [cdx("Zwemmen", "45–60")] }
  ]});
SCHEMES.push({ id: "bike", name: "Fietsen", crd: true, note: "Fietsen buiten of binnen: zacht voor je knieën en goed voor je conditie.",
  days: [
    { name: "Duurrit", focus: "Rustig en lang in praattempo: uithouding en vetverbranding", ex: [cdx("Fietsen")] },
    { name: "Spinning / hometrainer", focus: "Binnen fietsen met stevige weerstand", ex: [cdx("Spinning", "30–45")] },
    { name: "Intervallen", focus: "Kort en fel trappen met rustige pauzes", ex: [cdx("Spinning", "20–30"), cdx("Air bike")] }
  ]});
SCHEMES.push({ id: "walk", name: "Wandelen", crd: true, note: "Stevig wandelen: zacht voor je gewrichten, goed voor je hart en ideaal om vet te verbranden. Mik op 7000 à 10.000 stappen per dag.",
  days: [
    { name: "Stevig wandelen", focus: "30–65 min stevig doorstappen tegen ±4,5–5,5 km/u", ex: [cdx("Wandelen")] },
    { name: "Lange wandeling", focus: "1,5–2 uur rustig wandelen, bv. in het weekend: uithouding", ex: [cdx("Wandelen", "90–120")] },
    { name: "Wandelen op helling", focus: "Loopband op 10–15% helling: meer calorieën, zacht voor je knieën", ex: [cdx("Hellingwandelen")] }
  ]});
SCHEMES.push({ id: "row", name: "Roeien", crd: true, note: "Roeien op het roeitoestel: traint je hele lichaam, met de kracht vooral uit je benen. Eerst benen, dan romp, dan armen.",
  days: [
    { name: "Rustig roeien", focus: "20–30 min in een rustig, gelijkmatig tempo: conditie", ex: [cdx("Roeien", "20–30")] },
    { name: "Intervallen", focus: "Bv. 8× 250 m stevig met 1 min rustig roeien ertussen: kracht en conditie", ex: [cdx("Roeien", "15–25")] },
    { name: "Lange afstand", focus: "30–45 min zonder te stoppen: uithouding", ex: [cdx("Roeien", "30–45")] }
  ]});
// Simple starter schemes for the goals Conditie and Athletisch (the welcome carousel proposes them).
SCHEMES.push({ id: "runfit", name: "Kracht voor lopers", note: "2 korte krachttrainingen per week naast je loopschema, bv. op een rustige dag. Sterke benen en een stevige romp helpen je sneller te lopen en voorkomen blessures.",
  days: [
    { name: "Benen en billen", focus: "Sterke benen voor lopen, fietsen en zwemmen", ex: [["Goblet Squat","3","10–12","90 s","legs"],["Romanian Deadlift","3","8–10","2 min","legs"],["Walking Lunge","3","10 / leg","90 s","legs"],["Standing Calf Raise","3","12–15","60 s","legs"]] },
    { name: "Romp en rug", focus: "Stevige romp en een rechte houding onderweg", ex: [["Push-up","3","8–15","60 s","push","bw"],["Single-Arm Dumbbell Row","3","10–12","60 s","pull"],["Glute Bridge","3","12–20","45 s","legs","bw"],["Plank","3","30–45","45 s","core","time"],["Bird Dog","3","10–16","30 s","core","bw"]] }
  ]});
SCHEMES.push({ id: "ath", name: "Athletisch", note: "Een mix van kracht, conditie en core: 3× per week, bv. ma Kracht, wo Conditie en vr Core en beweeglijkheid. Voeg in het weekend gerust een lange rustige wandeling of duurloop toe.",
  days: [
    { name: "Kracht", focus: "Benen, borst en rug: de basis", ex: [["Back Squat","3","6–8","2 min","legs"],["Bench Press","3","6–8","2 min","push"],["Barbell Row","3","8","90 s","pull"],["Romanian Deadlift","3","8–10","2 min","legs"]] },
    { name: "Conditie", focus: "Intervallen en een korte, pittige circuitronde", ex: [cdx("Intervallopen"), ["Kettlebell Swing","3","15","60 s","legs"],["Burpee","3","8–12","60 s","core","bw"],["Mountain Climber","3","30–45","30 s","core","time"]] },
    { name: "Core en beweeglijkheid", focus: "Stevige romp, soepele heupen en een rustige training", ex: [["Dead Bug","3","10–16","45 s","core","bw"],["Hollow Hold","3","20–40","45 s","core","time"],["Walking Lunge","3","10 / leg","90 s","legs"],["Glute Bridge","3","12–20","45 s","legs","bw"],["Plank","3","30–45","45 s","core","time"]] }
  ]});

const sessionCardio = name => (((log[today()] || {}).cardio) || []).filter(c => c.type === name && (!endedAt || c.t > endedAt));
function lastCardio(name){
  for (const d of Object.keys(log).sort().reverse()){
    const list = (log[d].cardio || []).filter(c => c.type === name && !(d === today() && (!endedAt || c.t > endedAt)));
    if (list.length) return Object.assign({ d }, list[list.length - 1]);
  }
  return null;
}
// A metric name in the app language, lower case inside a sentence (German keeps its capital).
const metricName = k => { const t = tr(CARDIO_METRICS[k][0]); return lang === "de" ? t : t.toLowerCase(); };
const metricText = (k, v) => { if (k === "split") return paceText(v); const [, unit] = CARDIO_METRICS[k]; return `${fmt(v)}${unit ? " " + unit : ""}`; };
const cardioText = c => {
  const t = cardioType(c.type), keys = t ? t[3] : ["min", "km", "kcal"];
  const parts = keys.filter(k => c[k] != null && c[k] !== "").map(k => metricText(k, c[k]));
  if (keys.includes("split") && c.min) parts.unshift(paceText(c.min));
  if (c.km && c.min && !keys.includes("speed")) parts.push(`tempo ${paceText(c.min / c.km)}/km`);
  if (c.m && c.min) parts.push(`${paceText(c.min / (c.m / 500))}/500 m`);
  // from a watch (Garmin via Strava, or a .fit file)
  if (c.hrmax) parts.push(`max. hartslag ${c.hrmax} bpm`);
  if (c.elev) parts.push(`${Math.round(c.elev)} m stijgen`);
  if (c.cad) parts.push(`cadans ${c.cad} spm`);
  return `${c.type}: ${parts.join(" · ")}`;
};
const paceText = minutes => { const s = Math.round(minutes * 60); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };

// Suggestion: build up the time to the top of the target, then raise the intensity metric a little.
function cardioSuggest(name){
  const t = cardioType(name), [lo, hi] = repRange(t[5]), prev = lastCardio(name), out = {};
  // Race parts (Hyrox): just a time to beat, 2% faster than last time.
  if (t[3].includes("split")){
    if (!prev || !prev.min) return { vals: { split: lo }, why: `Eerste keer: noteer je tijd. Richttijd ${t[5]} min.` };
    const goal = Math.max(1 / 6, Math.round(prev.min * 0.98 * 60) / 60);
    return { vals: { split: goal }, why: `Vorige keer ${paceText(prev.min)}. Mik op ${paceText(goal)}.`, prevText: cardioText(prev), prevDate: prev.d };
  }
  if (!prev && name === "Wandelen") return { vals: { min: 65, km: 5, speed: 4.5 }, why: "Eerste keer: ±5 km tegen ±4,5 km/u, ongeveer 65 minuten. Stevig doorstappen in een tempo waarbij je nog kan praten." };
  if (!prev && name === "Zwemmen") return { vals: { min: 20 }, why: "Eerste keer: 20 minuten rustig zwemmen. Rust gerust even aan de kant tussen de baantjes." };
  if (!prev){ out.min = lo; return { vals: out, why: `Eerste keer: ${lo} minuten in een tempo waarbij je nog kan praten. Vul in wat het toestel toont.` }; }
  if (repeatOn()){ t[3].forEach(k => { if (prev[k] != null && k !== "hr" && k !== "kcal") out[k] = prev[k]; }); return { vals: out, why: "Herhaling van vorige keer.", prevText: cardioText(prev), prevDate: prev.d }; }
  t[3].forEach(k => { if (prev[k] != null) out[k] = prev[k]; });
  const intensity = t[4], step = CARDIO_METRICS[intensity][3];
  let why;
  if (intensity !== "min" && (prev.min || 0) >= hi && prev[intensity] != null){
    out[intensity] = Math.round((prev[intensity] + step) * 10) / 10;
    if (intensity === "m" || intensity === "km") why = `Vorige keer ${metricText(intensity, prev[intensity])} in ${prev.min} min. Probeer in dezelfde tijd iets verder: ${metricText(intensity, out[intensity])}.`;
    else why = `Vorige keer ${hi}+ minuten gehaald. Zelfde tijd, iets zwaarder: ${metricName(intensity)} ${metricText(intensity, out[intensity])}.`;
  } else if (prev.min != null){
    out.min = Math.min(hi, (prev.min || lo) + 2);
    why = out.min > prev.min ? `Vorige keer ${prev.min} min. Probeer ${out.min} min, zelfde tempo.` : `Vorige keer ${prev.min} min. Houd die tijd en ga iets sneller of zwaarder.`;
  } else why = "Zelfde als vorige keer.";
  ["hr", "kcal"].forEach(k => delete out[k]);   // results, not targets
  return { vals: out, why, prevText: cardioText(prev), prevDate: prev.d };
}

function saveCardioEntry(name, form){
  const t = cardioType(name), entry = { type: name, t: new Date().toISOString() };
  let any = false;
  t[3].forEach(k => {
    const inp = form.querySelector(`[data-m="${k}"]`), raw = String(inp.value.trim() || inp.placeholder);
    if (k === "split"){   // "4:35" or minutes; stored as minutes
      const mm = /^(\d+)[:.](\d{1,2})$/.exec(raw), v = mm ? +mm[1] + +mm[2] / 60 : parseFloat(raw.replace(",", "."));
      if (isFinite(v) && v > 0){ entry.min = Math.round(v * 60) / 60; any = true; }
      return;
    }
    const v = parseFloat(raw.replace(",", "."));
    if (isFinite(v) && v > 0){ entry[k] = v; any = true; }
  });
  if (!entry.min && !entry.rounds){ toast("Vul minstens de duur in."); return false; }
  if (!entry.min && entry.rounds && entry.work) entry.min = Math.round(entry.rounds * ((entry.work || 0) + (entry.rest || 0)) / 6) / 10;
  const date = today(), s = scheme(), label = s.name + " · " + s.days[view.day].name;
  const prev = log[date] || { date, days: [], ex: {} };
  log = Object.assign({}, log, { [date]: Object.assign({}, prev, { days: prev.days.includes(label) ? prev.days : prev.days.concat([label]), cardio: (prev.cardio || []).concat([entry]) }) });
  saveSession(date);
  return any;
}
function removeCardioEntry(t){
  const date = today(), s = log[date]; if (!s) return;
  const sn = takeSnapshot();
  const cardio = (s.cardio || []).filter(c => c.t !== t);
  const copy = Object.assign({}, log);
  if (cardio.length || Object.keys(s.ex).length) copy[date] = Object.assign({}, s, { cardio }); else delete copy[date];
  log = copy; saveSession(date); renderExercises(); undoToast("Cardio verwijderd", sn);
}

// Card for one cardio machine in the Cardio scheme.
function cardioCard(item, i, items){
  const [name, , target] = item, t = cardioType(name), k = keyOf(name);
  const done = sessionCardio(name).length > 0 || isMarked("done", k), skipped = !done && isSkipped(k);
  const finished = done || skipped, collapsed = !editing && finished && !expanded.has(k);
  const sg = cardioSuggest(name), today_ = sessionCardio(name);
  const li = document.createElement("li");
  li.className = "ex cardio" + (done ? " done" : "") + (skipped ? " skipped" : "") + (finished ? " finished" : "") + (collapsed ? " collapsed" : "");
  li.dataset.k = k;
  const badge = done ? `<span class="badge ok">✓ gedaan</span>` : skipped ? `<span class="badge skip">Overgeslagen</span>` : `<span class="badge">${esc(target)} min</span>`;
  const head = `<span class="ex-title"><span class="ex-name"></span><span class="ex-nl"></span></span>${badge}`;
  const fields = t[3].map(m => {
    const [label, unit, im] = CARDIO_METRICS[m];
    return `<label class="cm"><small>${esc(label)}</small><span class="field"><input data-m="${m}" id="c-${k}-${m}" type="text" inputmode="${im}" autocomplete="off" placeholder="${sg.vals[m] != null ? esc(m === "split" ? paceText(sg.vals[m]) : fmt(sg.vals[m])) : ""}" aria-label="${esc(label)} ${esc(unit)}"><b>${esc(unit)}</b></span></label>`;
  }).join("");
  li.innerHTML = (editing ? `
      <div class="edit-bar">
        <button type="button" data-act="top" ${i === 0 ? "disabled" : ""} aria-label="Naar boven">⤒ Eerst</button>
        <button type="button" data-act="up" ${i === 0 ? "disabled" : ""} aria-label="Eén plaats omhoog">↑</button>
        <button type="button" data-act="down" ${i === items.length - 1 ? "disabled" : ""} aria-label="Eén plaats omlaag">↓</button>
        <button type="button" data-act="remove" class="remove">Verwijder</button>
      </div>` : "") + `
    ${finished && !editing ? `<button class="ex-head" type="button" aria-expanded="${!collapsed}">${head}</button>` : `<div class="ex-head">${head}</div>`}
    <div class="ex-body">
      <div class="prescription"><span><b>${esc(target)} min</b> · ${esc(t[3].filter(m => !["hr", "kcal"].includes(m)).map(metricName).join(", "))}</span><span class="tag cardio">cardio</span></div>
      ${miniTrend(progCache["c-" + k])}
      ${sg.prevText ? `<p class="today prev-c">Vorige keer (${esc(relDate(sg.prevDate).toLowerCase())}): ${esc(sg.prevText.replace(/^[^:]+: /, ""))}</p>` : ""}
      ${today_.length ? `<div class="bw-list">${today_.map(c => `<span class="set-pill">${esc(cardioText(c).replace(/^[^:]+: /, ""))}<button type="button" data-ct="${c.t}" aria-label="Verwijder deze cardio">×</button></span>`).join("")}</div>` : ""}
      ${skipped ? `<div class="entry-row"><button class="ghost wide" type="button" data-unskip>Toch doen</button></div>` : `
      ${done ? "" : `<div class="suggest"><details class="sg-why" data-sg="${esc(name)}"${sgOpen.has(name) ? " open" : ""}><summary><b>Voorstel: ${esc(Object.entries(sg.vals).map(([m, v]) => metricText(m, v)).join(" · "))}</b></summary><span>${esc(sg.why)}</span></details>${goalCoachHtml(name)}</div>`}
      <form class="cardio-grid" id="f-${k}">${fields}</form>
      <p class="note">Leeg = het grijze voorstel. Hartslag en calorieën zijn optioneel; neem ze over van het toestel of je horloge.</p>
      <div class="entry-row">
        ${editing || done ? "" : `<button class="ghost" type="button" data-skip>Overslaan</button>`}
        <button class="save" type="submit" form="f-${k}">${done ? "Nog een keer opslaan" : "Opslaan"}</button>
      </div>`}
      <details class="how demo-how"><summary>Voorbeeld en uitleg</summary>
        <div class="demo-stage"></div>
        <p class="ex-desc"></p><ul class="tips"></ul>
        <div class="demo"><a class="demo-link" target="_blank" rel="noopener">▶ Video op YouTube</a></div>
      </details>
      <details class="how muscles"><summary>Spiergroepen</summary>
        <div class="mus"><small>Sterk aangesproken</small><div class="mus-list">${t[6].map(m => `<span class="mus-chip strong">${esc(m)}</span>`).join("")}<span class="mus-chip strong">Hart en longen</span></div></div>
        <div class="mus"><small>Minder sterk aangesproken</small><div class="mus-list">${t[7].map(m => `<span class="mus-chip">${esc(m)}</span>`).join("")}</div></div>
      </details>
    </div>`;
  li.querySelector(".ex-name").textContent = name;
  li.querySelector(".ex-nl").textContent = t[1];
  li.querySelector(".ex-desc").textContent = t[2];
  const v = li.querySelector(".demo-link");
  v.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(t[1].replace(/\s*\(.*\)/, "") + " techniek");
  const headBtn = li.querySelector("button.ex-head");
  if (headBtn) headBtn.onclick = () => { expanded.has(k) ? expanded.delete(k) : expanded.add(k); renderExercises(); };
  li.querySelectorAll("[data-ct]").forEach(b => b.onclick = () => removeCardioEntry(b.dataset.ct));
  const form = li.querySelector("form");
  if (form) form.addEventListener("submit", e => {
    e.preventDefault(); keepAwake();
    if (saveCardioEntry(name, form) === false) return;
    expanded.delete(k); renderExercises();
    toast("Opgeslagen: " + cardioText(sessionCardio(name).slice(-1)[0] || { type: name }));
    goToNext(k);
  });
  const skipBtn = li.querySelector("[data-skip]"); if (skipBtn) skipBtn.onclick = () => setSkip(k, true);
  const unskip = li.querySelector("[data-unskip]"); if (unskip) unskip.onclick = () => { expanded.add(k); setSkip(k, false); };
  li.querySelectorAll("[data-act]").forEach(b => b.onclick = () => moveExercise(i, b.dataset.act));
  return { li, done, skipped };
}


// ---------- Quick workout and "repeat last time" (today only, per training day) ----------
const quickMin = () => parseInt((skips[markKey("quick")] || [])[0], 10) || 0;
const repeatOn = () => false; // "Vorige herhalen" is removed
function setDayOption(kind, value){
  const key = markKey(kind);
  const keep = Object.fromEntries(Object.entries(skips).filter(([sk]) => sk.startsWith(today() + "|")));
  if (value) keep[key] = [String(value)]; else delete keep[key];
  skips = keep; lsSet(LS_SKIPS, skips);
  render();
}
const restSec = r => restSeconds(r);
// Keep the most important exercises (they come first), shorten rest and trim accessory sets to fit the time.
function quickItems(items, minutes){
  const budget = minutes * 60 - 120; let used = 0; const out = [];   // 2 min to warm up and switch
  items.forEach((it, i) => {
    let item = it.slice();
    if (item[5] === "cardio"){
      const sec = repRange(item[2])[0] * 60;
      if (!out.length || used + sec <= budget){ out.push(item); used += sec; }
      return;
    }
    const sets = parseInt(item[1], 10) || 3, rest = Math.round(restSec(item[3]) * (i === 0 ? 0.8 : 0.6) / 5) * 5;
    const newSets = i === 0 ? sets : Math.max(2, sets - 1);
    const sec = newSets * (60 + rest);   // ±1 min per set incl. setup
    if (out.length && used + sec > budget) return;
    item[1] = String(newSets); item[3] = rest + " s"; out.push(item); used += sec;
  });
  return out;
}
// Rough length: ±1 min per set plus rest, holds and cardio by their time, 2 min to warm up and switch.
function itemSec(it){
  if (it[5] === "cardio") return repRange(it[2])[0] * 60;
  const sets = parseInt(it[1], 10) || 3, work = it[5] === "time" ? repRange(it[2])[0] + 15 : 60;
  return sets * (work + restSec(it[3]));
}
const estMinutes = items => Math.max(5, Math.round((120 + items.reduce((t, it) => t + itemSec(it), 0)) / 300) * 5);
// Long workout (±90 min): the full day, then extra exercises for the same muscle groups,
// a core exercise when the day has none and a stretch for what you trained.
const LONG_MIN = 90;
function exerciseTemplates(){
  if (exerciseTemplates.m) return exerciseTemplates.m;
  const m = new Map(), gym = new Set(), home = new Set();
  SCHEMES.forEach(sc => { if (sc.cls || sc.kine || sc.mind || sc.program) return; sc.days.forEach(d => d.ex.forEach(e => {
    if (!m.has(e[0])) m.set(e[0], e.slice(0, 6));
    (sc.id === "home" ? home : gym).add(e[0]);
  })); });
  LIB.forEach(l => { if (!m.has(l[0])) m.set(l[0], [l[0], l[4], l[5], l[6], l[1], l[2] || ""]); (l[2] ? home : gym).add(l[0]); });
  m.gym = gym; m.home = home;
  return exerciseTemplates.m = m;
}
// Equipment you need at home, read from the name; anything else is bodyweight.
const homeGear = n => /^Band /.test(n) ? "band" : /Kettlebell/.test(n) ? "kettlebell" : /Dumbbell|Goblet|Hammer Curl|Romanian Deadlift|Walking Lunge|Thruster|Farmer/.test(n) ? "dumbbell" : /Chin-up|Pull-up|Inverted Row|Hanging|Dead Hang/.test(n) ? "bar" : "";
const baseName = n => n.replace(/\s*\(.*\)/, "").replace(/^(Assisted|Weighted) /, "");
function longItems(items){
  const s = scheme();
  if (s.cls || s.crd || s.kine || s.mind || ["mobility", "yoga"].includes(s.id)) return items;
  const strength = items.filter(it => it[5] !== "cardio" && !isStretch(it[0]) && MUSCLES[it[0]]);
  if (strength.length < (isCustom(s) ? 1 : 2)) return items;
  const have = new Set(items.map(it => it[0])), bases = new Set(items.map(it => baseName(it[0]))), groups = new Map();
  strength.forEach(it => MUSCLES[it[0]][0].forEach(m => { const g = muscleGroup(m); groups.set(g, (groups.get(g) || 0) + 1); }));
  const tpl = exerciseTemplates(), tail = [];
  if (!groups.has("Buikspieren") && !items.some(it => it[4] === "core")){
    const c = ["Plank", "Hanging Leg Raise", "Cable Crunch", "Dead Bug", "Ab Wheel Rollout"].find(n => tpl.has(n) && !have.has(n));
    if (c) tail.push(tpl.get(c).slice());
  }
  const mob = SCHEMES.find(x => x.id === "mobility");
  if (mob && !items.some(it => isStretch(it[0]))){
    const pool = mob.days.slice(0, 3).flatMap(d => d.ex);
    const best = STRETCHES.filter(x => pool.some(e => e[0] === x[0]))
      .map(x => ({ n: x[0], score: x[3].reduce((t, m) => t + (groups.get(muscleGroup(m)) || 0) * 2, 0) + x[4].reduce((t, m) => t + (groups.get(muscleGroup(m)) || 0), 0) }))
      .sort((a, b) => b.score - a.score)[0];
    if (best && best.score) tail.push(pool.find(e => e[0] === best.n).slice());
  }
  let left = LONG_MIN * 60 - (120 + items.concat(tail).reduce((t, it) => t + itemSec(it), 0));
  // same place and gear as the day: gym days stay in the gym, home days use only what that day needs
  const atHome = s.id === "home", gear = new Set(items.map(it => homeGear(it[0])));
  const fits = n => atHome ? (homeGear(n) ? gear.has(homeGear(n)) : tpl.home.has(n)) : tpl.gym.has(n) && !/^Band /.test(n);
  const cands = [...tpl.values()].filter(e => !have.has(e[0]) && !bases.has(baseName(e[0])) && fits(e[0]) && MUSCLES[e[0]] && !isStretch(e[0]) && !cardioType(e[0]) && e[5] !== "cardio" && ["push", "pull", "legs"].includes(e[4]))
    .map(e => ({ e, first: muscleGroup(MUSCLES[e[0]][0][0]),
      score: MUSCLES[e[0]][0].reduce((t, m) => t + (groups.has(muscleGroup(m)) ? groups.get(muscleGroup(m)) * 3 : -4), 0) + MUSCLES[e[0]][1].reduce((t, m) => t + (groups.has(muscleGroup(m)) ? 1 : 0), 0) }))
    .filter(x => x.score >= 3 && groups.has(x.first)).sort((a, b) => b.score - a.score || a.e[0].localeCompare(b.e[0]));
  const extra = [], usedFirst = new Set();
  // one per muscle group first, then a second round
  [x => !usedFirst.has(x.first), () => true].forEach(ok => cands.forEach(x => {
    if (extra.length >= 6 || extra.includes(x.e) || !ok(x)) return;
    const sec = itemSec(x.e); if (sec > left + 300) return;
    extra.push(x.e); usedFirst.add(x.first); left -= sec;
  }));
  return extra.length || tail.length ? items.concat(extra.map(e => e.slice()), tail) : items;
}
let durOpen = false;
function renderDayTools(){
  const s = scheme(), all = exercisesFor(s, view.day), q = quickMin(), base = dayItemsBase();
  const sh = quickItems(base, 30), lg = longItems(base), cur = dayItems();
  // Cardio and classes: only "Volledig" when short would take just as long; same for long.
  const full = estMinutes(base);
  const opts = (estMinutes(sh) < full ? [[30, "Kort", estMinutes(sh)]] : []).concat([[0, "Volledig", full]], lg.length > base.length && estMinutes(lg) > full ? [[LONG_MIN, "Lang", estMinutes(lg)]] : []);
  $("dayTools").hidden = editing || !all.length;
  $("durBtn").hidden = editing;
  $("durBtn").setAttribute("aria-pressed", durOpen); $("durBtn").setAttribute("aria-expanded", durOpen);
  $("dayTools").innerHTML = `
    ${durOpen ? `<div class="dt-group" role="group" aria-label="Duur"><span class="dt-label">Duur</span>
      <div class="dt-seg" style="--n:${opts.length}">${opts.map(([v, lab, m]) => `<button type="button" class="dt dt-len${(q === v || (!q && !v)) ? " on" : ""}" data-q="${v}" aria-pressed="${q === v || (!q && !v)}"><b>${lab}</b><small translate="no">±${m} min</small></button>`).join("")}</div></div>` : ""}
    ${q && q !== LONG_MIN ? `<p class="note dt-note">Snelle training: ${cur.length} van ${all.length} oefeningen, kortere rust en minder sets bij de hulpoefeningen.</p>` : ""}
    ${q === LONG_MIN ? `<p class="note dt-note">Lange training: ${cur.length - base.length} extra oefeningen voor dezelfde spiergroepen, aangevuld met core en stretchen.</p>` : ""}`;
  $("dayTools").querySelectorAll("[data-q]").forEach(b => b.onclick = () => setDayOption("quick", +b.dataset.q));
}

// ---------- Mobility scheme ----------
// ---------- Stretches and yoga poses ----------
// [name, Dutch name, how-to, stretched mainly, stretched/worked as well]
const STRETCHES = [
  // Mobility: after push
  ["Doorway Pec Stretch", "Borststretch in een deuropening", "Onderarm tegen de deurpost, elleboog op schouderhoogte, rustig naar voor stappen tot je borst rekt. Per kant. Na bankdrukken, dips en flyes.", ["Borst"], ["Voorkant schouders","Biceps"]],
  ["Cross-Body Shoulder Stretch", "Schouder over de borst", "Eén arm gestrekt voor je borst, met je andere arm naar je toe trekken. Per kant. Na schouderdrukken en zijwaarts heffen.", ["Achterkant schouders"], ["Zijkant schouders","Bovenrug"]],
  ["Overhead Triceps Stretch", "Triceps stretch boven het hoofd", "Hand achter je hoofd tussen je schouderbladen, met je andere hand de elleboog zacht naar beneden duwen. Per kant. Na skullcrushers en pushdowns.", ["Triceps"], ["Lats"]],
  ["Thread the Needle", "Thread the needle (draaiing bovenrug)", "Op handen en knieën één arm onder je lichaam door schuiven en je schouder op de grond laten zakken. Per kant.", ["Bovenrug","Achterkant schouders"], ["Lats"]],
  ["Wrist Flexor Stretch", "Pols- en onderarmstretch", "Arm gestrekt voor je, handpalm naar voor, vingers met je andere hand zacht naar je toe trekken. Ook omgekeerd. Na zware duw- en trekoefeningen.", ["Onderarmen"], []],
  // Mobility: after pull
  ["Dead Hang", "Hangen aan een stang", "Ontspannen hangen aan een optrekstang. Rekt je lats en schouders en traint je grip. Na pulldowns, roeien en optrekken.", ["Lats","Onderarmen"], ["Borst","Schouders"]],
  ["Kneeling Lat Stretch", "Lat stretch op een bank", "Geknield voor een bank, ellebogen op de bank, billen naar achter en borst naar de grond laten zakken.", ["Lats"], ["Triceps","Borst"]],
  ["Biceps Wall Stretch", "Biceps stretch tegen de muur", "Gestrekte arm met handpalm tegen een muur op schouderhoogte, lichaam langzaam wegdraaien. Per kant. Na curls.", ["Biceps"], ["Borst","Voorkant schouders"]],
  ["Thoracic Rotation", "Rotatie bovenrug", "Op handen en knieën, één hand achter je hoofd en je elleboog naar het plafond draaien. Per kant.", ["Bovenrug"], ["Schuine buikspieren"]],
  ["Cat-Cow", "Kat-koe", "Op handen en knieën je rug langzaam bol en hol maken, op het ritme van je ademhaling.", ["Onderrug"], ["Bovenrug","Buikspieren"]],
  // Mobility: after legs
  ["Standing Quad Stretch", "Quadriceps stretch staand", "Op één been staan, je enkel vastnemen en je hiel naar je bil trekken, knieën naast elkaar. Per kant. Na squats, leg press en lunges.", ["Quadriceps"], ["Heupbuigers"]],
  ["Couch Stretch", "Couch stretch (voorkant heup)", "Knie tegen een muur of bank, voet omhoog, andere voet voor je. Heupen zacht naar voor duwen en billen aanspannen. Per kant.", ["Heupbuigers","Quadriceps"], ["Billen"]],
  ["Hamstring Stretch", "Hamstring stretch", "Eén been gestrekt op een verhoging, rug recht, vanuit je heupen naar voor buigen. Per kant. Na deadlifts en leg curls.", ["Hamstrings"], ["Kuiten"]],
  ["Figure-4 Stretch", "Figuur-4 stretch (bil)", "Op je rug, enkel op de andere knie, dat been naar je borst trekken. Per kant. Na hip thrusts en squats.", ["Billen"], ["Heupbuigers"]],
  ["Butterfly Stretch", "Vlinderstretch (binnenkant dij)", "Zittend met je voetzolen tegen elkaar, knieën zacht naar de grond laten zakken.", ["Adductoren"], ["Billen"]],
  ["Calf Wall Stretch", "Kuitstretch tegen de muur", "Handen tegen de muur, achterste been gestrekt met hiel op de grond, naar voor leunen. Per kant. Na kuitheffen en lopen.", ["Kuiten"], []],
  ["Deep Squat Hold", "Diepe hurkzit vasthouden", "Zo diep mogelijk hurken met hielen op de grond, ellebogen duwen knieën open. Eventueel vasthouden aan een paal.", ["Adductoren","Kuiten"], ["Billen","Onderrug"]],
  ["Pigeon Stretch", "Duifhouding (pigeon)", "Voorste been gebogen voor je, achterste been gestrekt. Romp voorover laten zakken tot je de bil voelt rekken. Per kant.", ["Billen"], ["Heupbuigers"]],
  // Dynamic warm-up
  ["World's Greatest Stretch", "World's greatest stretch", "Grote uitvalspas, hand naast je voorste voet, elleboog naar de enkel en dan je arm naar het plafond draaien. Per kant. Ideaal als opwarming.", ["Heupbuigers","Bovenrug"], ["Hamstrings","Billen","Adductoren"]],
  ["90/90 Hip Switch", "90/90 heupwissel", "Zittend met beide knieën in een hoek van 90°. Langzaam beide knieën naar de andere kant laten zakken.", ["Billen","Heupbuigers"], ["Adductoren"]],
  ["Leg Swings", "Beenzwaaien", "Steun tegen een muur en zwaai één been ontspannen voor- en achteruit, daarna zijwaarts. Per been.", ["Hamstrings","Heupbuigers"], ["Adductoren","Billen"]],
  ["Arm Circles", "Armcirkels", "Armen zijwaarts gestrekt, kleine en dan grote cirkels voor- en achteruit.", ["Schouders"], ["Bovenrug"]],
  ["Wall Slide", "Wall slides", "Rug en armen tegen de muur, armen langzaam omhoog en omlaag schuiven zonder los te komen. Goed voor de schouders voor het drukken.", ["Achterkant schouders","Bovenrug"], ["Trapezius"]],
  // Yoga
  ["Sun Salutation A", "Zonnegroet A (Surya Namaskar A)", "Vloeiende reeks: armen omhoog, voorover buigen, plank, opdrukken naar cobra, neerwaartse hond, terug naar staan. Eén ronde = één rep.", ["Hamstrings","Lats"], ["Borst","Schouders","Kuiten","Buikspieren"]],
  ["Downward Dog", "Neerwaartse hond (Adho Mukha Svanasana)", "Handen en voeten op de grond, billen hoog in een omgekeerde V, hielen naar de grond. Rekt de hele achterkant.", ["Hamstrings","Kuiten","Lats"], ["Schouders","Onderrug"]],
  ["Cobra Pose", "Cobra (Bhujangasana)", "Op je buik, handen onder je schouders, borst omhoog duwen met ontspannen schouders.", ["Buikspieren","Borst"], ["Onderrug","Heupbuigers"]],
  ["Low Lunge", "Lage uitvalspas (Anjaneyasana)", "Achterste knie op de grond, heupen naar voor laten zakken, armen omhoog. Per kant.", ["Heupbuigers","Quadriceps"], ["Buikspieren"]],
  ["Warrior I", "Krijger I (Virabhadrasana I)", "Grote stap, voorste knie gebogen, heupen naar voor, armen recht omhoog. Per kant.", ["Quadriceps","Heupbuigers"], ["Billen","Schouders","Kuiten"]],
  ["Warrior II", "Krijger II (Virabhadrasana II)", "Brede stand, voorste knie boven je enkel, armen zijwaarts en blik over je voorste hand. Per kant.", ["Quadriceps","Adductoren"], ["Billen","Schouders"]],
  ["Warrior III", "Krijger III (Virabhadrasana III)", "Op één been, romp en achterste been horizontaal in één lijn, armen naar voor. Per kant.", ["Hamstrings","Billen"], ["Onderrug","Buikspieren"]],
  ["Triangle Pose", "Driehoek (Trikonasana)", "Brede stand met gestrekte benen, zijwaarts naar je voorste been buigen, andere arm naar het plafond. Per kant.", ["Hamstrings","Schuine buikspieren"], ["Adductoren","Borst"]],
  ["Chair Pose", "Stoelhouding (Utkatasana)", "Voeten samen, door je knieën zakken alsof je gaat zitten, armen omhoog.", ["Quadriceps","Billen"], ["Kuiten","Schouders","Onderrug"]],
  ["Tree Pose", "Boom (Vrksasana)", "Op één been, andere voet tegen de binnenkant van je kuit of dij, handen voor je borst. Per kant.", ["Kuiten","Billen (zijkant heup)"], ["Buikspieren"]],
  ["Boat Pose", "Boot (Navasana)", "Zittend op je zitbotten, benen omhoog en armen naar voor, rug recht.", ["Buikspieren"], ["Heupbuigers"]],
  ["Crow Pose", "Kraai (Bakasana)", "Handen op de grond, knieën op je bovenarmen en je gewicht naar voor brengen tot je voeten loskomen. Gevorderd.", ["Buikspieren","Voorkant schouders"], ["Triceps","Onderarmen"]],
  ["Dolphin Pose", "Dolfijn", "Zoals neerwaartse hond, maar op je onderarmen. Rekt en versterkt je schouders.", ["Voorkant schouders","Lats"], ["Hamstrings","Buikspieren"]],
  ["Garland Pose", "Slinger (Malasana)", "Diepe hurkzit met voeten iets uit elkaar, handen samen voor je borst en ellebogen tegen je knieën.", ["Adductoren","Kuiten"], ["Billen","Onderrug"]],
  ["Bridge Pose", "Brug (Setu Bandhasana)", "Op je rug, voeten plat, heupen omhoog en handen onder je samenvouwen.", ["Billen","Heupbuigers"], ["Hamstrings","Onderrug","Borst"]],
  ["Puppy Pose", "Puppyhouding", "Op handen en knieën, handen ver naar voor laten wandelen en je borst naar de grond laten zakken, billen boven je knieën.", ["Lats","Borst"], ["Schouders"]],
  ["Seated Forward Fold", "Zittende vooroverbuiging (Paschimottanasana)", "Zittend met gestrekte benen vanuit je heupen naar voor buigen, rug zo lang mogelijk.", ["Hamstrings"], ["Onderrug","Kuiten"]],
  ["Supine Twist", "Liggende draaiing", "Op je rug, knieën naar één kant laten vallen en je hoofd de andere kant op draaien. Per kant.", ["Onderrug","Schuine buikspieren"], ["Billen","Borst"]],
  ["Happy Baby", "Happy baby (Ananda Balasana)", "Op je rug, knieën naar je oksels en de buitenkant van je voeten vastnemen.", ["Adductoren","Billen"], ["Onderrug"]],
  ["Legs Up the Wall", "Benen tegen de muur", "Op je rug met je billen tegen de muur en je benen omhoog tegen de muur. Ontspannend na een zware dag.", ["Hamstrings"], ["Onderrug"]],
  ["Child's Pose", "Kindhouding (Balasana)", "Op je knieën, billen naar je hielen en armen ver voor je uit. Rustig ademen.", ["Lats","Onderrug"], ["Billen"]],
  ["Savasana", "Eindontspanning (Savasana)", "Op je rug, armen en benen ontspannen, ogen dicht en rustig ademen.", ["Ontspanning"], []]
];
STRETCHES.forEach(([n, nl, desc, a, b]) => { NL[n] = [nl, desc]; MUSCLES[n] = [a, b]; });
const STRETCH_NAMES = new Set(STRETCHES.map(x => x[0]));
const isStretch = n => STRETCH_NAMES.has(n);
const st = (n, sets, reps, rest, mode, type = "mobility") => [n, sets, reps, rest, type, mode];
SCHEMES.push({ id: "mobility", name: "Mobiliteit", note: "Rekken en bewegen in functie van je krachttraining: na je training de dag die past (push, pull of benen), of de dynamische warming-up ervoor. Het mag rekken, niet pijn doen.",
  days: [
    { name: "Na push", focus: "Borst, schouders, triceps, polsen: na bankdrukken, schouderdrukken en dips", ex: [st("Doorway Pec Stretch","2","30–45","15 s","time"), st("Cross-Body Shoulder Stretch","2","30","15 s","time"), st("Overhead Triceps Stretch","2","30","15 s","time"), st("Thread the Needle","2","30–45","15 s","time"), st("Wrist Flexor Stretch","2","20–30","10 s","time"), st("Child's Pose","1","45–60","0 s","time")] },
    { name: "Na pull", focus: "Lats, bovenrug, biceps, onderarmen: na pulldowns, roeien en curls", ex: [st("Dead Hang","2","20–40","30 s","time"), st("Kneeling Lat Stretch","2","30–45","15 s","time"), st("Biceps Wall Stretch","2","30","15 s","time"), st("Thoracic Rotation","2","8–10","15 s","bw"), st("Cat-Cow","1","8–12","0 s","bw"), st("Wrist Flexor Stretch","2","20–30","10 s","time")] },
    { name: "Na benen", focus: "Quadriceps, hamstrings, billen, heupen, kuiten: na squats, deadlifts en lunges", ex: [st("Standing Quad Stretch","2","30–45","10 s","time"), st("Couch Stretch","2","45–60","15 s","time"), st("Hamstring Stretch","2","30–45","10 s","time"), st("Figure-4 Stretch","2","30–45","10 s","time"), st("Butterfly Stretch","2","30–45","10 s","time"), st("Calf Wall Stretch","2","30–45","10 s","time"), st("Deep Squat Hold","1","30–60","0 s","time")] },
    { name: "Warming-up", focus: "Dynamisch, 5–8 minuten vóór je krachttraining", ex: [st("World's Greatest Stretch","2","5–6","0 s","bw"), st("Cat-Cow","1","10","0 s","bw"), st("90/90 Hip Switch","1","8–12","0 s","bw"), st("Leg Swings","2","10–12","0 s","bw"), st("Arm Circles","1","10–20","0 s","bw"), st("Wall Slide","1","10–12","0 s","bw")] }
  ]});
SCHEMES.push({ id: "yoga", name: "Yoga", note: "Yoga in alle stijlen: dynamisch (Vinyasa, Ashtanga, Power), statisch (Hatha, Iyengar), herstellend (Yin, Restorative, Yoga Nidra) en bijzonder (Hot, Kundalini). Houd elke houding rustig vast; per kant waar dat staat. Geen haast, adem door je neus.",
  days: [
    { name: "Vinyasa (basis flow)", was: ["Basis flow"], focus: "Vloeiend op je adem van houding naar houding: zonnegroet en staande houdingen, ±20 min", ex: [st("Sun Salutation A","1","3–6","0 s","bw","yoga"), st("Downward Dog","2","30–60","10 s","time","yoga"), st("Low Lunge","2","30–45","10 s","time","yoga"), st("Warrior I","2","30–45","10 s","time","yoga"), st("Warrior II","2","30–45","10 s","time","yoga"), st("Triangle Pose","2","30–45","10 s","time","yoga"), st("Cobra Pose","2","20–30","10 s","time","yoga"), st("Child's Pose","1","60","0 s","time","yoga")] },
    { name: "Yin (herstel)", was: ["Herstel"], focus: "Passief, vooral zittend of liggend: elke houding 3–5 min vasthouden voor bindweefsel en gewrichten, ±40 min", ex: [st("Butterfly Stretch","1","180–300","10 s","time","yoga"), st("Puppy Pose","1","180–240","10 s","time","yoga"), st("Pigeon Stretch","2","180–300","10 s","time","yoga"), st("Seated Forward Fold","1","180–300","10 s","time","yoga"), st("Supine Twist","2","180–240","10 s","time","yoga"), st("Happy Baby","1","120–180","0 s","time","yoga"), st("Legs Up the Wall","1","180–300","0 s","time","yoga"), st("Savasana","1","180–300","0 s","time","yoga")] },
    { name: "Hatha (kracht en balans)", was: ["Kracht en balans"], focus: "Houdingen rustig opbouwen en vasthouden: stabiliteit, core en balans, ±25 min", ex: [st("Sun Salutation A","1","3–5","0 s","bw","yoga"), st("Chair Pose","2","20–40","15 s","time","yoga"), st("Warrior III","2","20–30","15 s","time","yoga"), st("Tree Pose","2","30–45","10 s","time","yoga"), st("Boat Pose","3","20–40","20 s","time","yoga"), st("Dolphin Pose","2","30–45","15 s","time","yoga"), st("Garland Pose","2","30–60","10 s","time","yoga"), st("Bridge Pose","2","30–45","15 s","time","yoga"), st("Crow Pose","3","5–20","30 s","time","yoga")] }
  ]});

// ---------- Thuis: training at home, without equipment or with a band, ab roller and more ----------
const HOME_EX = [
  ["Dumbbell Floor Press", "Vloerdrukken met dumbbells", "Op je rug op de grond, knieën gebogen. Duw de dumbbells van je borst omhoog; je ellebogen raken net de grond.", ["Borst", "Triceps"], ["Voorkant schouders"], "benchDb"],
  ["Band Chest Press", "Borstpers met elastiek", "Elastiek achter je rug of rond een paal, handen op borsthoogte; duw naar voor tot je armen gestrekt zijn.", ["Borst", "Triceps"], ["Voorkant schouders"], "chestPress"],
  ["Band Row", "Roeien met elastiek", "Elastiek rond je voeten of een paal, rug recht; trek je ellebogen langs je lichaam naar achter en knijp je schouderbladen samen.", ["Lats", "Bovenrug"], ["Biceps", "Achterkant schouders"], "cableRow"],
  ["Band Overhead Press", "Schouderpers met elastiek", "Sta op het elastiek, handen op schouderhoogte; duw recht omhoog boven je hoofd.", ["Voorkant schouders", "Triceps"], ["Zijkant schouders"], "ohp"],
  ["Band Pull-Apart", "Elastiek uit elkaar trekken", "Elastiek op schouderhoogte met gestrekte armen; trek het uit elkaar tot aan je borst en knijp je schouderbladen samen.", ["Achterkant schouders", "Bovenrug"], ["Trapezius"], "facePull"],
  ["Band Biceps Curl", "Bicepscurl met elastiek", "Sta op het elastiek, ellebogen tegen je zij; buig je armen en zak langzaam terug.", ["Biceps"], ["Onderarmen"], "curl"],
  ["Band Triceps Extension", "Tricepsstrekken met elastiek", "Elastiek achter je rug, handen boven je hoofd; strek je armen en buig ze langzaam terug.", ["Triceps"], [], "ohExt"],
  ["Band Squat", "Squat met elastiek", "Sta op het elastiek, uiteinden op je schouders; zak in een squat en duw krachtig omhoog.", ["Quadriceps", "Billen"], ["Hamstrings"], "bwSquat"],
  ["Band Lateral Walk", "Zijwaarts stappen met elastiek", "Elastiek rond je knieën of enkels, licht door je knieën; stap zijwaarts zonder dat je knieën naar binnen vallen.", ["Billen (zijkant heup)"], ["Quadriceps"], "bwSquat"]
];
HOME_EX.forEach(([n, nl, desc, strong, less]) => { if (!NL[n]) NL[n] = [nl, desc]; if (!MUSCLES[n]) MUSCLES[n] = [strong, less]; });
const homeEx = (n, sets, reps, rest, type, mode) => mode ? st(n, sets, reps, rest, mode, type) : [n, sets, reps, rest, type];
SCHEMES.push({ id: "home", name: "Thuis", note: "Trainen in je woonkamer, op twee manieren: zonder materiaal, of met wat je hebt (elastiek, ab roller, dumbbells, kettlebell, optrekstang). Kies de dag die past.", days: [
  { name: "Zonder materiaal", was: ["Zonder materiaal A", "Zonder materiaal B"], focus: "Hele lichaam met je eigen gewicht, een stoel en een muur, ±30 min", ex: [homeEx("Push-up", "3", "8–15", "60 s", "push", "bw"), homeEx("Bodyweight Squat", "3", "15–20", "60 s", "legs", "bw"), homeEx("Bodyweight Lunge", "3", "10–12", "60 s", "legs", "bw"), homeEx("Glute Bridge", "3", "12–15", "45 s", "legs", "bw"), homeEx("Pike Push-up", "3", "6–10", "60 s", "push", "bw"), homeEx("Bench Dip", "3", "8–15", "60 s", "push", "bw"), homeEx("Wall Sit", "3", "30–60", "45 s", "legs", "time"), homeEx("Plank", "3", "30–60", "30 s", "core", "time"), homeEx("Dead Bug", "3", "10–12", "30 s", "core", "bw"), homeEx("Mountain Climber", "3", "30", "30 s", "core", "time")] },
  { name: "Met materiaal", was: ["Met dumbbells", "Met elastiek", "Met kettlebell", "Met optrekstang"], focus: "Elastiek, ab roller en wat je verder hebt (dumbbells, kettlebell, optrekstang), gemengd met oefeningen zonder materiaal, ±40 min", ex: [homeEx("Band Squat", "3", "12–15", "60 s", "legs", "bw"), homeEx("Dumbbell Floor Press", "3", "8–12", "90 s", "push"), homeEx("Band Row", "3", "12–15", "60 s", "pull", "bw"), homeEx("Push-up", "3", "10–15", "60 s", "push", "bw"), homeEx("Goblet Squat", "3", "10–12", "90 s", "legs"), homeEx("Band Overhead Press", "3", "10–12", "60 s", "push", "bw"), homeEx("Chin-up", "3", "4–10", "90 s", "pull", "bw"), homeEx("Romanian Deadlift", "3", "10–12", "90 s", "legs"), homeEx("Band Pull-Apart", "3", "15–20", "30 s", "pull", "bw"), homeEx("Kettlebell Swing", "3", "15", "60 s", "legs"), homeEx("Bodyweight Lunge", "2", "10–12", "60 s", "legs", "bw"), homeEx("Band Biceps Curl", "2", "12–15", "30 s", "pull", "bw"), homeEx("Band Triceps Extension", "2", "12–15", "30 s", "push", "bw"), homeEx("Ab Wheel", "3", "8–12", "45 s", "core", "bw"), homeEx("Plank", "2", "30–60", "30 s", "core", "time")] },
  { name: "Benen en billen (zonder materiaal)", focus: "Onderlichaam met je eigen gewicht, ±30 min", ex: [homeEx("Bodyweight Squat", "3", "15–20", "45 s", "legs", "bw"), homeEx("Reverse Lunge", "3", "10–12 / been", "45 s", "legs", "bw"), homeEx("Side Lunge", "3", "8–12 / kant", "45 s", "legs", "bw"), homeEx("Single-Leg Glute Bridge", "3", "8–12 / been", "45 s", "legs", "bw"), homeEx("Jump Squat", "3", "8–15", "60 s", "legs", "bw"), homeEx("Cossack Squat", "2", "6–10 / kant", "60 s", "legs", "bw"), homeEx("Single-Leg Romanian Deadlift", "2", "8–10 / been", "60 s", "legs", "bw"), homeEx("Donkey Kick", "2", "12–15", "30 s", "legs", "bw"), homeEx("Fire Hydrant", "2", "12–15", "30 s", "legs", "bw"), homeEx("Calf Raise", "3", "15–25", "30 s", "legs", "bw"), homeEx("Squat Pulse", "2", "30–45", "45 s", "legs", "time")] },
  { name: "Bovenlichaam (zonder materiaal)", focus: "Duwen en trekken met je eigen gewicht, ±30 min", ex: [homeEx("Push-up", "3", "8–15", "60 s", "push", "bw"), homeEx("Wide Push-up", "3", "8–15", "60 s", "push", "bw"), homeEx("Diamond Push-up", "3", "6–12", "60 s", "push", "bw"), homeEx("Decline Push-up", "3", "6–12", "60 s", "push", "bw"), homeEx("Pike Push-up", "3", "6–10", "60 s", "push", "bw"), homeEx("Hindu Push-up", "2", "6–10", "60 s", "push", "bw"), homeEx("Bench Dip", "3", "8–15", "60 s", "push", "bw"), homeEx("Prone Y Raise", "3", "10–15", "30 s", "pull", "bw"), homeEx("Superman Pulse", "3", "20–30", "30 s", "core", "time"), homeEx("Knee Push-up", "2", "10–20", "45 s", "push", "bw")] },
  { name: "Conditie (zonder materiaal)", focus: "Hartslag omhoog met sprongen en rondjes, ±25 min", ex: [homeEx("Jumping Jack", "3", "30–45", "20 s", "legs", "time"), homeEx("High Knees", "3", "30", "20 s", "legs", "time"), homeEx("Skater Jump", "3", "12–20", "30 s", "legs", "bw"), homeEx("Star Jump", "3", "20–30", "30 s", "legs", "time"), homeEx("Burpee", "3", "8–12", "45 s", "legs", "bw"), homeEx("Bear Crawl", "3", "20–40", "30 s", "core", "time"), homeEx("Cross-Body Mountain Climber", "3", "16–24", "30 s", "core", "bw"), homeEx("Inchworm", "2", "6–10", "30 s", "core", "bw")] }
]});

// ---------- Outdoor: a park with a pull-up bar, parallel bars, benches and outdoor machines ----------
const OUT_EX = [
  ["Pull-up", "Optrekken aan de rekstok", "Hang aan de rekstok met je handen iets breder dan je schouders, handpalmen van je weg. Trek je borst naar de stang en zak gecontroleerd tot je armen gestrekt zijn. Lukt het nog niet: spring omhoog en zak heel traag.", ["Lats", "Biceps"], ["Bovenrug", "Onderarmen"], "pullup"],
  ["Incline Push-up", "Push-up met handen op de bank", "Handen op de rand van een parkbank, lichaam in een rechte lijn. Zak met je borst naar de bank en duw terug. Lichter dan een gewone push-up.", ["Borst", "Triceps"], ["Voorkant schouders"], "pushup"],
  ["Decline Push-up", "Push-up met voeten op de bank", "Voeten op de bank, handen op de grond. Zak met je borst naar de grond en duw terug. Zwaarder, vooral voor je bovenborst en schouders.", ["Bovenkant borst", "Voorkant schouders"], ["Triceps"], "pushup"],
  ["Hanging Knee Raise", "Knieën optrekken in hang", "Hang aan de rekstok of steun op de brug. Trek je knieën naar je borst zonder te zwaaien en laat ze langzaam zakken.", ["Buikspieren (onderkant)"], ["Heupbuigers", "Onderarmen"], "hangLeg"],
  ["Decline Sit-up", "Sit-up op de sit-upbank", "Haak je voeten onder de rol van de schuine bank. Rol rustig omhoog tot je rechtop zit en zak gecontroleerd terug.", ["Buikspieren"], ["Heupbuigers"], "crunch"],
  ["Monkey Bars", "Apenbrug (hand over hand)", "Hang aan de eerste sport en ga hand over hand naar de overkant zonder je voeten neer te zetten. Goed voor grip, rug en schouders.", ["Lats", "Onderarmen"], ["Biceps", "Achterkant schouders"], "hang"],
  ["Outdoor Leg Press", "Beenpers (buitentoestel)", "Rug tegen de leuning, voeten op het platform. Duw je benen bijna gestrekt en laat rustig terugkomen. Het gewicht is je eigen lichaam.", ["Quadriceps", "Billen"], ["Hamstrings"], "legPress"],
  ["Outdoor Chest Press", "Borstpers (buitentoestel)", "Zit rechtop, handgrepen op borsthoogte. Duw naar voor tot je armen bijna gestrekt zijn en laat gecontroleerd terugkomen.", ["Borst", "Triceps"], ["Voorkant schouders"], "chestPress"],
  ["Outdoor Lat Pull", "Trektoestel (buitentoestel)", "Pak de handgrepen boven je hoofd en trek ze naar beneden tot aan je schouders; je lichaam gaat omhoog. Laat rustig terug.", ["Lats"], ["Biceps", "Bovenrug"], "pulldown"],
  ["Outdoor Rower", "Roeitoestel (buitentoestel)", "Voeten op de steunen, handgrepen vast. Duw met je benen en trek de grepen naar je buik; terug in omgekeerde volgorde.", ["Lats", "Bovenrug"], ["Biceps", "Quadriceps"], "rower"],
  ["Air Walker", "Air walker (zweefstapper)", "Sta op de pedalen, handen aan de beugel. Zwaai je benen als lange passen voor- en achteruit, rustig en gecontroleerd. Zacht voor je gewrichten.", ["Quadriceps", "Billen"], ["Heupbuigers", "Hamstrings"], "run"],
  ["Waist Twister", "Taille-draaier", "Sta op de draaischijf, handen aan de beugel. Draai je heupen links en rechts terwijl je bovenlichaam stil blijft.", ["Schuine buikspieren"], ["Buikspieren", "Onderrug"], "russian"]
];
OUT_EX.forEach(([n, nl, desc, strong, less]) => { if (!NL[n]) NL[n] = [nl, desc]; if (!MUSCLES[n]) MUSCLES[n] = [strong, less]; });
SCHEMES.push({ id: "outdoor", name: "Outdoor", note: "Buitenfitness in het park: rekstok, brug, banken en de toestellen die je vaak in een park ziet (beenpers, borstpers, trektoestel, roeier, air walker). Geen gewichten nodig; maak het zwaarder met meer herhalingen, een trager tempo of een rugzak.", days: [
  { name: "Rekstok en brug", focus: "Bovenlichaam: optrekken, dippen en duwen, ±35 min", ex: [homeEx("Pull-up", "4", "3–8", "90 s", "pull", "bw"), homeEx("Dips", "3", "6–12", "90 s", "push", "bw"), homeEx("Inverted Row", "3", "8–12", "60 s", "pull", "bw"), homeEx("Decline Push-up", "3", "8–12", "60 s", "push", "bw"), homeEx("Hanging Knee Raise", "3", "8–12", "60 s", "core", "bw"), homeEx("Dead Hang", "2", "20–40", "60 s", "pull", "time")] },
  { name: "Bank en trap", focus: "Benen en core met een parkbank of trap, ±35 min", ex: [homeEx("Bulgarian Split Squat", "3", "8–12", "60 s", "legs", "bw"), homeEx("Step-up", "3", "10–12", "60 s", "legs", "bw"), homeEx("Squat Jump", "3", "8–12", "60 s", "legs", "bw"), homeEx("Bodyweight Lunge", "3", "10–12", "60 s", "legs", "bw"), homeEx("Incline Push-up", "3", "12–15", "45 s", "push", "bw"), homeEx("Decline Sit-up", "3", "10–15", "45 s", "core", "bw"), homeEx("Plank", "3", "30–60", "45 s", "core", "time")] },
  { name: "Parktoestellen", focus: "De vaste toestellen in het park: hele lichaam en conditie, ±30 min", ex: [homeEx("Outdoor Leg Press", "3", "12–15", "60 s", "legs", "bw"), homeEx("Outdoor Chest Press", "3", "12–15", "60 s", "push", "bw"), homeEx("Outdoor Lat Pull", "3", "12–15", "60 s", "pull", "bw"), homeEx("Outdoor Rower", "3", "15–20", "60 s", "pull", "bw"), homeEx("Air Walker", "3", "60–120", "45 s", "legs", "time"), homeEx("Waist Twister", "2", "45–60", "30 s", "core", "time")] },
  { name: "Parkcircuit", focus: "Alles na elkaar met korte rust, 3–4 rondes: kracht en conditie, ±30 min", ex: [homeEx("Burpee", "3", "8–12", "30 s", "legs", "bw"), homeEx("Pull-up", "3", "3–8", "30 s", "pull", "bw"), homeEx("Dips", "3", "6–12", "30 s", "push", "bw"), homeEx("Step-up", "3", "10–12", "30 s", "legs", "bw"), homeEx("Monkey Bars", "3", "1–2", "60 s", "pull", "bw"), homeEx("Mountain Climber", "3", "30–45", "30 s", "core", "time")] }
]});

// ---------- Beginner and youth: technique first, light weights, no maximal loads ----------
SCHEMES.push({ id: "youth", name: "Beginner", youth: true, note: "Voor beginners en jongeren van ±12 tot 17 jaar, ook 16-jarigen. Techniek eerst: licht gewicht en 12–15 herhalingen die je netjes haalt, met nog 2–3 over. Train 2–3× per week met een rustdag ertussen, warm altijd op en vraag liefst begeleiding van een trainer. Geen maximale gewichten; stop bij pijn.", days: [
  { name: "Techniek (eigen gewicht)", focus: "Hele lichaam: de basisbewegingen goed leren, ±35 min", ex: [homeEx("Bodyweight Squat", "3", "12–15", "60 s", "legs", "bw"), homeEx("Incline Push-up", "3", "8–12", "60 s", "push", "bw"), homeEx("Inverted Row", "3", "8–12", "60 s", "pull", "bw"), homeEx("Glute Bridge", "3", "12–15", "45 s", "legs", "bw"), homeEx("Bird Dog", "2", "8–10", "30 s", "core", "bw"), homeEx("Plank", "3", "20–40", "45 s", "core", "time")] },
  { name: "Licht gewicht", focus: "Toestellen en lichte dumbbells, 12–15 herhalingen met een goede techniek, ±40 min", ex: [["Goblet Squat", "3", "12–15", "90 s", "legs"], ["Machine Chest Press", "3", "12–15", "90 s", "push"], ["Lat Pulldown", "3", "12–15", "90 s", "pull"], ["Seated Cable Row", "3", "12–15", "90 s", "pull"], ["Machine Shoulder Press", "2", "12–15", "60 s", "push"], homeEx("Dead Bug", "3", "8–10", "45 s", "core", "bw")] },
  { name: "Springen en coördinatie", focus: "Sprongen, balans en snelheid: goed voor je sport en sterke botten, ±30 min", ex: [homeEx("Jumping Jack", "2", "20–30", "30 s", "legs", "bw"), homeEx("Squat Jump", "3", "6–8", "60 s", "legs", "bw"), homeEx("Step-up", "3", "8–10", "60 s", "legs", "bw"), homeEx("Bodyweight Lunge", "3", "8–10", "60 s", "legs", "bw"), homeEx("Mountain Climber", "3", "20–30", "30 s", "core", "time"), homeEx("Side Plank (left)", "2", "15–30", "30 s", "core", "time"), homeEx("Side Plank (right)", "2", "15–30", "30 s", "core", "time")] }
]});

// ---------- Extra core exercises without equipment ----------
const CORE_EXTRA = [
  ["Reverse Crunch", "Omgekeerde crunch", "Op je rug, knieën gebogen omhoog. Rol je bekken van de grond door je knieën naar je borst te trekken, en zak langzaam terug.", ["Buikspieren (onderkant)"], ["Heupbuigers"]],
  ["Bicycle Crunch", "Fietscrunch", "Op je rug, handen bij je hoofd. Breng je elleboog naar de tegenovergestelde knie terwijl het andere been strekt; wissel af.", ["Schuine buikspieren", "Buikspieren"], ["Heupbuigers"]],
  ["V-up", "V-up", "Op je rug met gestrekte armen en benen. Breng tegelijk je romp en benen omhoog tot een V en zak gecontroleerd terug.", ["Buikspieren"], ["Heupbuigers"]],
  ["Plank Shoulder Tap", "Plank met schoudertik", "In opdrukhouding om de beurt met een hand je andere schouder aantikken zonder dat je heupen draaien.", ["Buikspieren (diepe buikspier)", "Schuine buikspieren"], ["Schouders", "Borst"]],
  ["Lying Leg Raise", "Liggend benen heffen", "Op je rug, handen onder je billen. Benen gestrekt omhoog tot 90° en langzaam laten zakken zonder dat je onderrug loskomt.", ["Buikspieren (onderkant)"], ["Heupbuigers"]],
  ["Flutter Kicks", "Flutter kicks (fladderen)", "Op je rug, benen gestrekt net boven de grond. Kleine, snelle op-en-neer bewegingen met je benen. Onderrug blijft tegen de grond.", ["Buikspieren (onderkant)"], ["Heupbuigers", "Quadriceps"]]
];
CORE_EXTRA.forEach(([n, nl, desc, strong, less]) => { if (!NL[n]) NL[n] = [nl, desc]; if (!MUSCLES[n]) MUSCLES[n] = [strong, less]; });

const DEMO_LATE = {};   // demo patterns for exercises defined before DEMO_OF
// ---------- Group classes, CrossFit and Hyrox (behind "More" until you move them) ----------
// A class you follow is logged as one cardio entry ("Les"); the other days are workouts in that style to do yourself.
CARDIO_TYPES.push(
  ["Zumba", "Zumba-les", "Dansfitness op Latijns-Amerikaanse muziek. Volg de instructeur, dans op je eigen niveau en blijf bewegen.", ["min","hr","kcal"], "min", "45–60", ["Kuiten","Quadriceps"], ["Billen","Buikspieren"]],
  ["BBB", "BBB-les (buik, billen, benen)", "Groepsles voor buik, billen en benen met veel herhalingen, vaak met een mat, gewichtjes of elastiek.", ["min","hr","kcal"], "min", "45–60", ["Billen","Quadriceps","Buikspieren"], ["Hamstrings"]],
  ["Yoga", "Yogales", "Een yogales in de studio of online. Volg je docent en ga niet verder dan aangenaam rekken.", ["min","hr","kcal"], "min", "45–75", ["Hamstrings", "Buikspieren"], ["Schouders", "Onderrug"]],
  ["Pilates", "Pilatesles", "Rustige, gecontroleerde oefeningen op de mat voor je diepe buikspieren, houding en soepelheid.", ["min","hr","kcal"], "min", "45–60", ["Buikspieren"], ["Billen","Onderrug"]],
  ["Bootcamp", "Bootcamp (buiten of in de zaal)", "Pittige circuittraining met je eigen lichaam: sprinten, springen, kruipen en kracht in korte blokken.", ["min","hr","kcal"], "min", "45–60", ["Quadriceps","Buikspieren"], ["Borst","Billen","Schouders"]],
  ["Step aerobics", "Step aerobics-les", "Aerobics op en rond een step op het ritme van de muziek. Hele voet op de step, rechtop blijven.", ["min","hr","kcal"], "min", "45–60", ["Quadriceps","Billen"], ["Kuiten"]],
  ["BodyPump", "BodyPump-les", "Groepsles met halter en licht gewicht, veel herhalingen per spiergroep op muziek.", ["min","hr","kcal"], "min", "45–60", ["Quadriceps","Borst","Bovenrug"], ["Schouders","Biceps","Triceps"]],
  ["CrossFit WOD", "CrossFit WOD (workout van de dag)", "De workout van de dag in je box. Noteer de duur en eventueel je score in je notities.", ["min","hr","kcal"], "min", "15–60", ["Quadriceps","Billen"], ["Schouders","Buikspieren","Bovenrug"]],
  ["Hyrox training", "Hyrox-training (les)", "Groepstraining voor Hyrox: lopen afgewisseld met stations.", ["min","hr","kcal"], "min", "45–75", ["Quadriceps","Billen"], ["Kuiten","Schouders","Buikspieren"]]
);
// Hyrox race: 8 × 1 km running, each followed by one station, always in this order.
const HYROX_RUN = i => `Hyrox run ${i} (1 km)`;
const HYROX_STATIONS = [
  ["Hyrox SkiErg (1000 m)", "SkiErg 1000 m", "1000 meter op de SkiErg. Trek met je lats en buig mee door je heupen; vind een vast ritme.", "4–6", ["Lats","Triceps"], ["Buikspieren","Bovenrug"]],
  ["Hyrox sled push (50 m)", "Slee duwen 50 m", "4 × 12,5 m. Open heren 152 kg, dames 102 kg (incl. slee); Pro 202 / 152 kg. Laag voorover, korte krachtige passen.", "2–5", ["Quadriceps","Billen"], ["Kuiten","Voorkant schouders"]],
  ["Hyrox sled pull (50 m)", "Slee trekken 50 m", "4 × 12,5 m met een touw. Open heren 103 kg, dames 78 kg; Pro 153 / 103 kg. Laag in je benen, hand over hand.", "3–6", ["Bovenrug","Biceps"], ["Billen","Onderarmen"]],
  ["Hyrox burpee broad jumps (80 m)", "Burpees met verspringen 80 m", "Burpee en dan met twee voeten vooruit springen, 80 meter lang. Rustig tempo dat je kan volhouden.", "3–7", ["Quadriceps","Borst"], ["Billen","Schouders"]],
  ["Hyrox row (1000 m)", "Roeien 1000 m", "1000 meter roeien: benen, romp, armen. Hou je slagtempo rond 26–30 per minuut.", "4–6", ["Lats","Quadriceps"], ["Bovenrug","Biceps"]],
  ["Hyrox farmers carry (200 m)", "Farmers carry 200 m", "200 meter met twee kettlebells. Open heren 2 × 24 kg, dames 2 × 16 kg; Pro 2 × 32 / 2 × 24 kg. Schouders naar beneden, kleine snelle passen.", "1–3", ["Onderarmen","Trapezius"], ["Buikspieren","Kuiten"]],
  ["Hyrox sandbag lunges (100 m)", "Uitvalspassen met zandzak 100 m", "100 meter uitvalspassen met de zandzak op je schouders. Open heren 20 kg, dames 10 kg; Pro 30 / 20 kg. Achterste knie raakt licht de grond.", "4–7", ["Quadriceps","Billen"], ["Buikspieren","Bovenrug"]],
  ["Hyrox wall balls (100×)", "Wall balls 100×", "100 wall balls. Open heren 6 kg naar 3 m, dames 4 kg naar 2,7 m; Pro 9 / 6 kg. Diep zitten, bal in één vloeiende beweging omhoog.", "4–8", ["Quadriceps","Voorkant schouders"], ["Billen","Triceps"]]
];
for (let i = 1; i <= 8; i++) CARDIO_TYPES.push([HYROX_RUN(i), `1 km lopen (${i} van 8)`, "1 km lopen in de wedstrijd. Loop een vast tempo dat je acht keer kan volhouden; de eerste kilometer niet te snel.", ["split","hr"], "split", "4–6", ["Quadriceps","Kuiten"], ["Hamstrings","Billen"]]);
HYROX_STATIONS.forEach(([n, nl, desc, tgt, a, b]) => CARDIO_TYPES.push([n, nl, desc, ["split","hr"], "split", tgt, a, b]));
CARDIO_TYPES.forEach(([n, nl, desc, , , , strong, less]) => { if (!NL[n]) NL[n] = [nl, desc]; if (!MUSCLES[n]) MUSCLES[n] = [strong, less]; });

const CLASS_EX = [
  ["Jumping Jack", "Jumping jacks", "Spring je benen open en dicht en breng tegelijk je armen boven je hoofd en terug.", ["Kuiten","Voorkant schouders"], ["Quadriceps","Billen"]],
  ["High Knees", "Knieheffen ter plaatse", "Ter plaatse lopen en je knieën om de beurt tot heuphoogte optrekken, armen actief mee.", ["Heupbuigers","Quadriceps"], ["Kuiten","Buikspieren"]],
  ["Squat Jump", "Squatsprong", "Zak in een squat en spring explosief omhoog; land zacht door je knieën.", ["Quadriceps","Billen"], ["Kuiten","Hamstrings"]],
  ["Sumo Squat", "Sumosquat", "Brede stand met je tenen naar buiten, recht naar beneden zakken met je knieën in de lijn van je tenen.", ["Adductoren","Billen"], ["Quadriceps"]],
  ["Curtsy Lunge", "Kruiselingse uitvalspas", "Stap met één been schuin achter het andere, zak door beide knieën en kom terug. Per kant.", ["Billen (zijkant heup)","Quadriceps"], ["Adductoren"]],
  ["Donkey Kick", "Donkey kick", "Op handen en knieën één gebogen been met je voetzool naar het plafond duwen, zonder je rug hol te trekken. Per kant.", ["Billen"], ["Hamstrings","Onderrug"]],
  ["Fire Hydrant", "Fire hydrant", "Op handen en knieën één gebogen knie zijwaarts optillen tot heuphoogte. Per kant.", ["Billen (zijkant heup)"], ["Buikspieren"]],
  ["Side-Lying Leg Lift", "Zijwaarts been heffen", "Op je zij met je onderste been gebogen. Til je bovenste, gestrekte been langzaam op en laat het gecontroleerd zakken. Per kant.", ["Billen (zijkant heup)"], ["Schuine buikspieren"]],
  ["The Hundred", "The Hundred", "Op je rug, hoofd, schouders en benen opgetild, armen gestrekt. Pomp met je armen op en neer: 5 tellen in, 5 tellen uit.", ["Buikspieren"], ["Heupbuigers"]],
  ["Roll-up", "Roll-up (oprollen)", "Op je rug met je armen boven je hoofd. Rol wervel per wervel op tot zit en even rustig terug.", ["Buikspieren"], ["Heupbuigers","Onderrug"]],
  ["Single Leg Stretch", "Single leg stretch", "Hoofd en schouders opgetild, één knie naar je borst en het andere been gestrekt; wissel vloeiend af.", ["Buikspieren"], ["Heupbuigers"]],
  ["Pilates Swimming", "Zwemmen (pilates)", "Op je buik met armen en benen gestrekt en net los van de grond; kleine, snelle tegengestelde bewegingen van arm en been.", ["Onderrug","Billen"], ["Achterkant schouders"]],
  ["Pilates Teaser", "Teaser", "Vanuit lig oprollen tot een V-zit met gestrekte armen en benen, en gecontroleerd terugrollen.", ["Buikspieren"], ["Heupbuigers"]],
  ["Basic Step", "Basisstap (step)", "Rechts op, links op, rechts af, links af op de step. Rechtop, hele voet op de step, op het ritme.", ["Quadriceps","Billen"], ["Kuiten"]],
  ["Step Knee Lift", "Step met knieheffing", "Stap op de step en trek je andere knie op tot heuphoogte; stap terug af en wissel van been.", ["Quadriceps","Heupbuigers"], ["Billen","Kuiten"]],
  ["Over the Top", "Over de step", "Zijwaarts over de step: op, over en aan de andere kant af, en weer terug.", ["Quadriceps","Kuiten"], ["Billen"]],
  ["Bear Crawl", "Berenloop", "Op handen en voeten met je knieën net boven de grond vooruit en achteruit kruipen, rug plat.", ["Buikspieren","Voorkant schouders"], ["Quadriceps"]],
  ["Thruster", "Thruster", "Front squat met halter of dumbbells en uit de squat in één beweging boven je hoofd duwen.", ["Quadriceps","Voorkant schouders"], ["Billen","Triceps"]],
  ["Kettlebell Swing", "Kettlebell swing", "Heupen naar achter, kettlebell tussen je benen en met een krachtige heupstoot tot borsthoogte zwaaien. De kracht komt uit je heupen, niet uit je armen.", ["Billen","Hamstrings"], ["Onderrug","Voorkant schouders"]],
  ["Box Jump", "Box jump", "Met twee voeten op een stevige box springen, zacht landen en volledig rechtop komen; stap terug af.", ["Quadriceps","Billen"], ["Kuiten"]],
  ["Wall Ball", "Wall ball", "Medicijnbal voor je borst, squat en gooi de bal bij het opkomen tegen een doel op de muur; vang en zak meteen weer. Gewicht = de bal.", ["Quadriceps","Voorkant schouders"], ["Billen","Triceps"]],
  ["Power Clean", "Power clean", "Halter explosief van de grond naar je schouders trekken en opvangen in een kwart squat. Techniek eerst, licht beginnen.", ["Billen","Hamstrings","Trapezius"], ["Quadriceps","Bovenrug"]],
  ["Sled Push", "Slee duwen", "Handen tegen de palen, laag voorover en met korte, krachtige passen de slee vooruit duwen. Noteer het gewicht en bij reps de meters.", ["Quadriceps","Billen"], ["Kuiten","Voorkant schouders"]],
  ["Sled Pull", "Slee trekken", "Het touw hand over hand naar je toe trekken, laag in je benen en met een stevige romp. Noteer het gewicht en bij reps de meters.", ["Bovenrug","Biceps"], ["Billen","Onderarmen"]],
  ["Burpee Broad Jump", "Burpee met verspringen", "Burpee en daarna met twee voeten zo ver mogelijk vooruit springen.", ["Quadriceps","Borst"], ["Billen","Schouders"]],
  ["Sandbag Lunge", "Uitvalspas met zandzak", "Zandzak op je schouders, afwisselend uitvallen tot je achterste knie net boven de grond is.", ["Quadriceps","Billen"], ["Buikspieren","Bovenrug"]]
];
CLASS_EX.forEach(([n, nl, desc, strong, less]) => { if (!NL[n]) NL[n] = [nl, desc]; if (!MUSCLES[n]) MUSCLES[n] = [strong, less]; });
const lesson = n => [n, "1", cardioType(n)[5], "—", "cardio", "cardio"];
const classScheme = (id, name, note, days) => SCHEMES.push({ id, name, note, days, more: true, cls: true });
// Yoga sits with the group classes; its class day comes last so the other days keep their place.
{ const y = SCHEMES.find(x => x.id === "yoga"); Object.assign(y, { more: true, cls: true });
  const YOGA_MORE = [
    ["Sun Salutation B", "Zonnegroet B (Surya Namaskar B)", "Zoals zonnegroet A, met stoelhouding aan het begin en krijger I aan beide kanten. Eén ronde = één rep.", ["Quadriceps", "Schouders"], ["Hamstrings", "Borst", "Buikspieren"], "sunSal"],
    ["Camel Pose", "Kameel (Ustrasana)", "Op je knieën, handen in je onderrug of op je hielen, heupen naar voor en borst open naar boven. Rustig in en uit.", ["Heupbuigers", "Borst"], ["Buikspieren", "Quadriceps"], "cobra"],
    ["Yoga Nidra", "Yoga nidra (geleide diepe ontspanning)", "Lig stil op je rug onder een deken en volg een geleide opname: je aandacht gaat door je lichaam en ademhaling, tussen waken en slapen in.", ["Ontspanning"], [], "savasana"],
    ["Breath of Fire", "Vuurademhaling (Kundalini)", "Snel en ritmisch door je neus uitademen met korte buikstoten; de inademing gaat vanzelf. Begin met 30 seconden. Niet bij zwangerschap, hoge bloeddruk of duizeligheid.", ["Buikspieren"], ["Ontspanning"], "butterfly"],
    ["Spinal Flex", "Ruggengraat-flex (Kundalini)", "Kleermakerszit, handen op je enkels: borst naar voor en inademen, rug rond en uitademen, in een vlot ritme.", ["Onderrug", "Bovenrug"], ["Buikspieren"], "catCow"],
    ["Kundalini Meditation", "Kundalini-meditatie met mantra", "Zit rechtop, ogen dicht, en herhaal in stilte of hardop een mantra (bv. \"Sat Nam\": sat bij het inademen, nam bij het uitademen).", ["Ontspanning"], [], "butterfly"]
  ];
  YOGA_MORE.forEach(([n, nl, desc, strong, less, demo]) => { if (!NL[n]) NL[n] = [nl, desc]; if (!MUSCLES[n]) MUSCLES[n] = [strong, less]; DEMO_LATE[n] = demo; });
  const yg = (n, sets, reps, rest, mode = "time") => st(n, sets, reps, rest, mode, "yoga");
  y.days.push(
    { name: "Ashtanga", focus: "Een vaste, intensieve reeks die je elke keer hetzelfde doet: kracht, uithouding en discipline, ±45 min", ex: [yg("Sun Salutation A", "1", "5", "0 s", "bw"), yg("Sun Salutation B", "1", "3–5", "0 s", "bw"), yg("Triangle Pose", "2", "30", "0 s"), yg("Warrior II", "2", "30", "0 s"), yg("Seated Forward Fold", "2", "45", "0 s"), yg("Boat Pose", "3", "30", "15 s"), yg("Bridge Pose", "2", "30", "15 s"), yg("Savasana", "1", "180", "0 s")] },
    { name: "Power", focus: "Fitnessvariant van Ashtanga: kracht, vetverbranding en conditie, ±40 min", ex: [yg("Sun Salutation A", "1", "5", "0 s", "bw"), yg("Chair Pose", "3", "40", "15 s"), yg("Warrior III", "2", "30", "15 s"), yg("Plank", "3", "45", "20 s"), yg("Boat Pose", "3", "40", "20 s"), yg("Crow Pose", "3", "10–20", "30 s"), yg("Dolphin Pose", "2", "45", "15 s"), yg("Low Lunge", "2", "30", "10 s"), yg("Savasana", "1", "120", "0 s")] },
    { name: "Iyengar", focus: "Precies en technisch, met blokken, een riem en de muur zodat elke houding past, ±40 min", ex: [yg("Tree Pose", "2", "45", "10 s"), yg("Triangle Pose", "2", "45", "10 s"), yg("Warrior II", "2", "45", "10 s"), yg("Downward Dog", "2", "60", "15 s"), yg("Seated Forward Fold", "2", "60", "10 s"), yg("Bridge Pose", "2", "45", "15 s"), yg("Legs Up the Wall", "1", "180", "0 s")] },
    { name: "Restorative", focus: "Volledig ondersteund met kussens en dekens, zonder spierspanning: herstel van je zenuwstelsel, ±40 min", ex: [yg("Child's Pose", "1", "180–300", "0 s"), yg("Bridge Pose", "1", "180", "0 s"), yg("Supine Twist", "2", "120–180", "0 s"), yg("Happy Baby", "1", "120", "0 s"), yg("Legs Up the Wall", "1", "300", "0 s"), yg("Savasana", "1", "300–600", "0 s")] },
    { name: "Yoga Nidra", focus: "Yogische slaap: geleide diepe ontspanning, liggend, ±25 min", ex: [yg("Belly Breathing", "1", "120", "0 s"), yg("Yoga Nidra", "1", "1200–1800", "0 s")] },
    { name: "Hot (Bikram)", focus: "In de les in een warme zaal van 35–40 °C (Bikram: 26 vaste houdingen). Thuis zonder warmte; drink goed en stop bij duizeligheid.", ex: [yg("Belly Breathing", "1", "60", "0 s"), yg("Chair Pose", "2", "30", "10 s"), yg("Tree Pose", "2", "30", "10 s"), yg("Warrior III", "2", "20", "10 s"), yg("Triangle Pose", "2", "30", "10 s"), yg("Cobra Pose", "2", "20", "10 s"), yg("Camel Pose", "2", "20", "20 s"), yg("Seated Forward Fold", "2", "30", "10 s"), yg("Supine Twist", "2", "30", "10 s"), yg("Savasana", "1", "120", "0 s")] },
    { name: "Kundalini", focus: "Spiritueel en energetisch: herhalende bewegingen, ademtechnieken en een mantrameditatie, ±30 min", ex: [yg("Spinal Flex", "1", "120", "0 s"), yg("Breath of Fire", "1", "30–60", "30 s"), yg("Alternate Nostril Breathing", "1", "180", "0 s"), yg("Kundalini Meditation", "1", "300–600", "0 s"), yg("Savasana", "1", "180", "0 s")] },
    { name: "Les", focus: "Je yogales: duur, hartslag en calorieën", ex: [lesson("Yoga")] }
  ); }
classScheme("zumba", "Zumba", "Dansfitness: plezier, conditie en coördinatie. Log je les, of doe thuis een korte cardio-dans op je favoriete muziek. 2–3× per week.", [
  { name: "Les", focus: "Je Zumba-les: duur, hartslag en calorieën", ex: [lesson("Zumba")] },
  { name: "Thuis", focus: "±20 min cardio op muziek, zonder materiaal", ex: [st("Jumping Jack","3","30–45","15 s","time","legs"), st("High Knees","3","30","15 s","time","legs"), st("Bodyweight Squat","3","15–20","30 s","bw","legs"), st("Curtsy Lunge","3","10–12","30 s","bw","legs"), st("Mountain Climber","3","30","30 s","time","core")] }
]);
classScheme("bbb", "BBB", "Buik, billen, benen: veel herhalingen met je eigen gewicht of licht materiaal. Log je les of doe het zelf; 2–3× per week.", [
  { name: "Les", focus: "Je BBB-les: duur, hartslag en calorieën", ex: [lesson("BBB")] },
  { name: "Billen en benen", focus: "Billen, heupen en dijen", ex: [st("Glute Bridge","3","15–20","30 s","bw","legs"), st("Sumo Squat","3","15–20","30 s","bw","legs"), st("Curtsy Lunge","3","10–12","30 s","bw","legs"), st("Donkey Kick","3","15","20 s","bw","legs"), st("Fire Hydrant","3","15","20 s","bw","legs"), st("Side-Lying Leg Lift","3","15","20 s","bw","legs")] },
  { name: "Buik", focus: "Rechte en schuine buikspieren", ex: [st("Crunch","3","15–20","30 s","bw","core"), st("Reverse Crunch","3","12–15","30 s","bw","core"), st("Bicycle Crunch","3","16–20","30 s","bw","core"), st("Plank","3","30–45","30 s","time","core"), st("Dead Bug","3","10–12","30 s","bw","core")] }
]);
classScheme("pilates", "Pilates", "Rustig en precies: diepe buikspieren, houding en soepelheid. Adem rustig door, kwaliteit boven aantal. 2–3× per week.", [
  { name: "Les (mat of reformer)", was: ["Les"], focus: "Je pilatesles op de mat of de reformer: duur, hartslag en calorieën", ex: [lesson("Pilates")] },
  { name: "Klassiek (mat)", was: ["Mat"], focus: "Klassieke basisreeks op de mat, ±25 min", ex: [st("The Hundred","1","60–100","30 s","time","core"), st("Roll-up","2","6–8","20 s","bw","core"), st("Single Leg Stretch","2","10–12","20 s","bw","core"), st("Glute Bridge","2","10–12","20 s","bw","legs"), st("Side-Lying Leg Lift","2","10–12","15 s","bw","legs"), st("Pilates Swimming","2","30","20 s","time","core"), st("Pilates Teaser","2","4–6","30 s","bw","core")] }
]);
classScheme("bootcamp", "Bootcamp", "Pittige circuittraining met je eigen lichaam. Werk in blokken van 30–45 sec en hou het tempo hoog. 2–3× per week.", [
  { name: "Les", focus: "Je bootcamp: duur, hartslag en calorieën", ex: [lesson("Bootcamp")] },
  { name: "HIIT-circuit", was: ["Circuit"], focus: "Alles na elkaar, 3 rondes, 1–2 min rust tussen de rondes", ex: [st("Burpee","3","10–15","30 s","bw","core"), st("Squat Jump","3","12–15","30 s","bw","legs"), st("Push-up","3","10–15","30 s","bw","push"), st("Bodyweight Lunge","3","12–16","30 s","bw","legs"), st("Mountain Climber","3","30–45","30 s","time","core"), st("Bear Crawl","3","20–30","30 s","time","core"), st("High Knees","3","30","30 s","time","legs"), st("Plank","3","30–60","30 s","time","core")] }
]);
classScheme("step", "Step aerobics", "Aerobics op een step: conditie, benen en coördinatie. Hele voet op de step, rechtop en op het ritme. 2–3× per week.", [
  { name: "Les", focus: "Je step-les: duur, hartslag en calorieën", ex: [lesson("Step aerobics")] },
  { name: "Thuis op de step", focus: "±20 min op een step of de onderste traptrede", ex: [st("Basic Step","3","60–90","15 s","time","legs"), st("Step Knee Lift","3","12–16","20 s","bw","legs"), st("Over the Top","3","45–60","20 s","time","legs"), st("Jumping Jack","3","30–45","15 s","time","legs"), ["Step-up","3","10–12","45 s","legs"]] }
]);
classScheme("bodypump", "BodyPump", "Licht gewicht, veel herhalingen: kies ongeveer de helft van je normale gewicht en hou de beweging netjes. 2–3× per week.", [
  { name: "Les", focus: "Je BodyPump-les: duur, hartslag en calorieën", ex: [lesson("BodyPump")] },
  { name: "Zelf met de halter", focus: "Hele lichaam, 15–25 herhalingen per set", ex: [["Back Squat","3","15–25","60 s","legs"], ["Bench Press","3","15–20","60 s","push"], ["Barbell Row","3","15–20","60 s","pull"], ["Romanian Deadlift","3","15–20","60 s","legs"], ["Overhead Press","3","12–16","60 s","push"], ["Walking Lunge","2","16–20","60 s","legs"], ["Barbell Curl","2","15–20","45 s","pull"], ["Skull Crusher","2","15–20","45 s","push"]] }
]);
classScheme("crossfit", "CrossFit", "Kracht, gymnastiek en conditie door elkaar. Log de WOD van je box, of doe zelf een krachtdeel en een korte metcon. Schaal gewichten naar je niveau.", [
  { name: "WOD", focus: "De workout van de dag in je box", ex: [lesson("CrossFit WOD")] },
  { name: "Kracht + metcon", focus: "Eerst zwaar en technisch, dan kort en snel", ex: [["Power Clean","5","3","2 min","legs"], ["Thruster","3","8–10","90 s","legs"], ["Kettlebell Swing","3","15","60 s","legs"], st("Box Jump","3","8–10","60 s","bw","legs"), ["Wall Ball","3","15–20","60 s","legs"], st("Burpee","3","10","45 s","bw","core")] },
  { name: "Gymnastiek", focus: "Je eigen lichaam: trekken, duwen en core", ex: [st("Chin-up","4","5–10","90 s","bw","pull"), st("Push-up","4","10–20","60 s","bw","push"), st("Pike Push-up","3","6–10","60 s","bw","push"), st("Hanging Leg Raise","3","8–12","60 s","bw","core"), st("Bodyweight Squat","3","20–30","45 s","bw","legs"), st("Hollow Hold","3","20–40","30 s","time","core")] }
]);
classScheme("hyrox", "Hyrox", "Hyrox: 8 × 1 km lopen, telkens gevolgd door een station. Volg de wedstrijd in de echte volgorde en noteer per stuk je tijd (m:ss); je totale tijd volgt vanzelf. Gewichten staan bij elk station (Open en Pro).", [
  { name: "Wedstrijd", focus: "Officiële volgorde: 1 km lopen, station, 1 km lopen, station … tot de wall balls", ex: HYROX_STATIONS.flatMap(([n], i) => [lesson(HYROX_RUN(i + 1)), lesson(n)]) },
  { name: "Stations", focus: "Kracht en techniek voor de stations", ex: [["Sled Push","4","20–25","90 s","legs"], ["Sled Pull","4","20–25","90 s","pull"], st("Burpee Broad Jump","3","10–15","60 s","bw","legs"), st("Farmer's Walk","3","45–60","60 s","time","core"), ["Sandbag Lunge","3","20–24","60 s","legs"], ["Wall Ball","3","20–30","60 s","legs"], lesson("SkiErg")] },
  { name: "Lopen + stations", focus: "Compromised running: wissel lopen en stations af, zoals in de wedstrijd", ex: [lesson("Lopen"), ["Wall Ball","4","20","30 s","legs"], ["Sandbag Lunge","4","20","30 s","legs"], st("Burpee Broad Jump","4","10","30 s","bw","legs"), lesson("Roeien")] },
  { name: "Les", focus: "Je Hyrox-training in de gym: duur, hartslag en calorieën", ex: [lesson("Hyrox training")] }
]);

// ---------- Kine (physiotherapy): exercises per common injury, grouped by body region ----------
// [name, Dutch name, how-to, muscles strong, less, demo]
const KINE_EX = [
  ["Pelvic Tilt", "Bekken kantelen", "Op je rug met gebogen knieën. Duw je onderrug zacht tegen de grond door je bekken te kantelen, houd 3 tellen vast en ontspan.", ["Buikspieren (diepe buikspier)"], ["Onderrug"], "deadBug"],
  ["McGill Curl-up", "McGill curl-up", "Op je rug, één knie gebogen, handen onder je onderrug. Til hoofd en schouders een paar centimeter op zonder je rug te buigen, houd 8–10 tellen vast.", ["Buikspieren"], ["Schuine buikspieren"], "crunch"],
  ["Knee-to-Chest Stretch", "Knie naar borst", "Op je rug één knie met beide handen rustig naar je borst trekken, het andere been ontspannen. Per kant.", ["Onderrug", "Billen"], ["Hamstrings"], "happyBaby"],
  ["Chin Tuck", "Kin intrekken", "Rechtop zitten of staan, kin recht naar achter schuiven (dubbele kin), houd 5 tellen vast. Niet naar beneden knikken.", ["Diepe nekbuigers"], ["Bovenrug"], "wallSlide"],
  ["Upper Trapezius Stretch", "Nek zijwaarts rekken", "Rechtop, oor rustig naar je schouder laten zakken en met je hand licht helpen; andere schouder laag. Per kant.", ["Trapezius"], ["Nek"], "tricepsStretch"],
  ["Scapular Squeeze", "Schouderbladen samenknijpen", "Rechtop, schouderbladen naar achter en naar beneden samenknijpen, houd 5 tellen vast. Schouders niet optrekken.", ["Bovenrug", "Achterkant schouders"], ["Trapezius"], "facePull"],
  ["Prone Y-T-W", "Y-T-W op je buik", "Op je buik, armen in een Y, dan een T en dan een W; telkens de duimen omhoog en de schouderbladen samen. Langzaam.", ["Achterkant schouders", "Bovenrug"], ["Trapezius", "Onderrug"], "superman"],
  ["Thoracic Extension", "Bovenrug strekken", "Foamroller dwars onder je bovenrug, handen achter je hoofd, rustig over de roller naar achter strekken. Verschuif een stukje en herhaal.", ["Bovenrug"], ["Borst"], "cobra"],
  ["Pendulum", "Slinger (pendel)", "Voorover leunen op een tafel, de pijnlijke arm los laten hangen en kleine cirkels laten slingeren vanuit je lichaam.", ["Schouders"], [], "dbRow"],
  ["Band External Rotation", "Buitenwaartse rotatie met elastiek", "Elleboog 90° gebogen tegen je zij (handdoekje ertussen), elastiek naar buiten draaien en langzaam terug.", ["Rotator cuff", "Achterkant schouders"], ["Bovenrug"], "facePull"],
  ["Band Internal Rotation", "Binnenwaartse rotatie met elastiek", "Elleboog 90° tegen je zij, elastiek vanuit buiten naar je buik draaien en langzaam terug.", ["Rotator cuff", "Borst"], ["Voorkant schouders"], "facePull"],
  ["Sleeper Stretch", "Sleeper stretch", "Op je zij op de pijnlijke schouder, arm 90° voor je en elleboog gebogen; duw je onderarm zacht naar de grond.", ["Achterkant schouders"], ["Rotator cuff"], "crossBody"],
  ["Eccentric Wrist Extension", "Excentrisch pols strekken", "Onderarm op je dij, handpalm naar beneden, licht gewicht. Help het gewicht met je andere hand omhoog en laat het in 3–4 tellen zakken. Bij tenniselleboog.", ["Onderarmen (strekkers)"], [], "curl"],
  ["Eccentric Wrist Flexion", "Excentrisch pols buigen", "Onderarm op je dij, handpalm naar boven, licht gewicht. Help het omhoog en laat het in 3–4 tellen zakken. Bij golferselleboog.", ["Onderarmen (buigers)"], [], "curl"],
  ["Wrist Extensor Stretch", "Polsstrekkers rekken", "Arm gestrekt voor je, handpalm naar beneden, met je andere hand de vingers rustig naar je toe buigen.", ["Onderarmen (strekkers)"], [], "wristStretch"],
  ["Forearm Rotation", "Onderarm draaien", "Elleboog 90° tegen je zij met een hamer of licht gewicht; draai je onderarm langzaam van handpalm boven naar handpalm onder.", ["Onderarmen"], ["Biceps"], "curl"],
  ["Grip Squeeze", "Knijpbal", "Een zachte bal of handdoek stevig samenknijpen, 3 tellen vasthouden en loslaten.", ["Onderarmen"], [], "farmer"],
  ["Quad Set", "Quadriceps aanspannen", "Lang zitten met een opgerolde handdoek onder je knie; duw je knie in de handdoek en span je dij 5 tellen aan.", ["Quadriceps"], [], "legExt"],
  ["Straight Leg Raise", "Gestrekt been heffen", "Op je rug, één knie gebogen. Span het gestrekte been aan en til het tot de hoogte van je andere knie, langzaam terug.", ["Quadriceps", "Heupbuigers"], ["Buikspieren"], "legRaise"],
  ["Step-down", "Step-down", "Op een traptrede op één been, andere hiel langzaam naar de grond laten zakken met je knie boven je voet, en terug.", ["Quadriceps", "Billen"], ["Kuiten"], "stepUp"],
  ["Terminal Knee Extension", "Laatste strekking knie", "Elastiek achter je knie, knie licht gebogen; strek je knie helemaal door tegen het elastiek in en span je dij aan.", ["Quadriceps"], [], "legExt"],
  ["Clamshell", "Clamshell", "Op je zij, knieën gebogen en voeten samen. Open je bovenste knie zonder je bekken te laten draaien, langzaam terug.", ["Billen (zijkant heup)"], [], "sidePlank"],
  ["Copenhagen Plank", "Copenhagen plank", "Zijplank met je bovenste knie of voet op een bank en je onderste been los. Begin met je knie op de bank.", ["Adductoren"], ["Schuine buikspieren"], "sidePlank"],
  ["Adductor Squeeze", "Adductoren knijpen", "Op je rug, knieën gebogen, een bal of kussen tussen je knieën; knijp 5–10 tellen.", ["Adductoren"], [], "bridge"],
  ["Single-Leg Bridge", "Bruggetje op één been", "Op je rug, één voet op de grond en het andere been gestrekt. Duw je heupen omhoog met je hiel en zak langzaam.", ["Billen", "Hamstrings"], [], "bridge"],
  ["Single-Leg RDL", "Romanian deadlift op één been", "Op één been met licht gebogen knie voorover kantelen vanuit je heup, rug recht, andere been naar achter. Langzaam terug.", ["Hamstrings", "Billen"], ["Onderrug"], "rdl"],
  ["Ankle Alphabet", "Alfabet met je enkel", "Zittend met je voet los: schrijf het alfabet met je grote teen in de lucht, rustig en zo groot mogelijk.", ["Kuiten", "Scheenbeen"], [], "calfStretch"],
  ["Band Ankle Eversion", "Enkel naar buiten met elastiek", "Zittend, elastiek rond je voorvoet; draai je voet naar buiten tegen het elastiek in en langzaam terug.", ["Kuiten (buitenkant)"], [], "calfStretch"],
  ["Single-Leg Balance", "Balans op één been", "Op één been staan, knie licht gebogen. Moeilijker: ogen dicht of op een kussen. Per kant.", ["Kuiten", "Billen (zijkant heup)"], ["Buikspieren"], "tree"],
  ["Single-Leg Calf Raise", "Kuitheffen op één been", "Op één been op je tenen omhoog en langzaam weer zakken; houd je vast aan de muur.", ["Kuiten"], [], "calf"],
  ["Eccentric Heel Drop", "Excentrisch hielzakken", "Op een trede op beide tenen omhoog, dan op het pijnlijke been in 3 tellen je hiel onder de trede laten zakken. Lichte pijn mag. Bij achillespees.", ["Kuiten", "Achillespees"], [], "calf"],
  ["Plantar Fascia Stretch", "Voetzool rekken", "Zittend met je voet op je andere knie, trek je tenen naar je scheen tot je de voetzool voelt rekken.", ["Voetzool"], ["Kuiten"], "calfStretch"],
  ["Towel Scrunch", "Handdoek grijpen", "Zittend met je voet op een handdoek; trek de handdoek met je tenen naar je toe.", ["Voetspieren"], [], "calfStretch"],
  ["Foot Roll", "Voet rollen", "Rol je voetzool rustig over een bal of bevroren flesje, 1–2 minuten.", ["Voetzool"], [], "calfStretch"]
];
KINE_EX.forEach(([n, nl, desc, strong, less, demo]) => { if (!NL[n]) NL[n] = [nl, desc]; if (!MUSCLES[n]) MUSCLES[n] = [strong, less]; });
const KINE_NOTE = "Geen vervanging voor je kinesitherapeut: overleg bij een blessure. Oefen pijnvrij of met hooguit lichte pijn (3 op 10) die binnen een dag wegtrekt. Stop bij scherpe pijn, zwelling of tintelingen.";
const kineScheme = (id, name, note, days) => SCHEMES.push({ id, name, note, days, more: true, kine: true, stay: true });
const kn = (n, sets, reps, rest, mode) => st(n, sets, reps, rest, mode, "kine");
// Each injury is its own subprogram; two phases where that is usual (start gently, then build up).
const KINE_MORE_EX = [
  ["Lateral Hop", "Zijwaarts springen", "Op één been zijwaarts over een lijn springen en stabiel landen, knie boven je voet. Pas als steunen pijnvrij is.", ["Kuiten", "Billen (zijkant heup)"], ["Quadriceps"], "stepUp"],
  ["Tibialis Raise", "Tenen optrekken", "Met je rug tegen de muur, hielen een voet van de muur; trek je tenen zo hoog mogelijk op en laat ze langzaam zakken.", ["Scheenbeen"], [], "calfStretch"],
  ["Decline Squat", "Squat op een schuine plank", "Hielen hoger dan je tenen (schuine plank of schijf onder je hielen); zak langzaam op één of twee benen en kom terug. Bij jumpersknie.", ["Quadriceps", "Patellapees"], ["Billen"], "bwSquat"],
  ["Heel Slide", "Hiel schuiven", "Op je rug, schuif je hiel rustig naar je billen tot je knie zo ver buigt als gaat, en terug. Vroege fase na een knie-operatie.", ["Hamstrings", "Quadriceps"], [], "legCurlLie"]
];
KINE_MORE_EX.forEach(([n, nl, desc, strong, less, demo]) => { if (!NL[n]) NL[n] = [nl, desc]; if (!MUSCLES[n]) MUSCLES[n] = [strong, less]; KINE_EX.push([n, nl, desc, strong, less, demo]); });
const kineOne = ex => [{ name: "Oefeningen", focus: "Dagelijks of om de dag", ex }];
kineScheme("kine-ankle", "Enkelverstuiking", "Na een verzwikte enkel: eerst bewegen, dan kracht, balans en springen.", [
  { name: "Fase 1 (bewegen)", focus: "De eerste weken: beweeglijkheid en lichte kracht", ex: [kn("Ankle Alphabet", "2", "1", "15 s", "bw"), kn("Band Ankle Eversion", "3", "15", "30 s", "bw"), kn("Calf Wall Stretch", "2", "30", "10 s", "time"), kn("Single-Leg Balance", "3", "30", "15 s", "time")] },
  { name: "Fase 2 (kracht en sprong)", focus: "Als stappen pijnvrij is: kracht, balans met ogen dicht en springen", ex: [kn("Single-Leg Calf Raise", "3", "12–15", "45 s", "bw"), kn("Single-Leg Balance", "3", "45", "15 s", "time"), kn("Step-down", "3", "10", "45 s", "bw"), kn("Lateral Hop", "3", "10", "60 s", "bw")] }]);
kineScheme("kine-achilles", "Achillespees", "Achillespeesklachten (tendinopathie): excentrisch versterken, 2× per dag, minstens 12 weken.", kineOne([kn("Eccentric Heel Drop", "3", "15", "45 s", "bw"), ["Seated Calf Raise", "3", "15", "60 s", "kine"], kn("Single-Leg Calf Raise", "3", "10–15", "45 s", "bw"), kn("Calf Wall Stretch", "2", "30", "10 s", "time")]));
kineScheme("kine-heel", "Hielspoor", "Fasciitis plantaris: voetzool rekken en de voet- en kuitspieren versterken, vooral 's ochtends.", kineOne([kn("Plantar Fascia Stretch", "3", "30", "10 s", "time"), kn("Foot Roll", "1", "60–120", "0 s", "time"), kn("Towel Scrunch", "3", "10", "15 s", "bw"), kn("Calf Wall Stretch", "2", "30", "10 s", "time"), kn("Eccentric Heel Drop", "3", "12", "45 s", "bw")]));
kineScheme("kine-shin", "Shin splints", "Scheenbeenvliesontsteking: minder lopen, scheen- en kuitspieren versterken en rustig weer opbouwen.", kineOne([kn("Tibialis Raise", "3", "15–20", "30 s", "bw"), kn("Single-Leg Calf Raise", "3", "12–15", "45 s", "bw"), kn("Towel Scrunch", "3", "10", "15 s", "bw"), kn("Single-Leg Balance", "3", "30", "15 s", "time"), kn("Calf Wall Stretch", "2", "30", "10 s", "time")]));
kineScheme("kine-itb", "Lopersknie (ITB)", "Pijn aan de buitenkant van de knie bij lopen of fietsen: de zijkant van je heup versterken.", kineOne([kn("Clamshell", "3", "15", "30 s", "bw"), kn("Side-Lying Leg Lift", "3", "15", "30 s", "bw"), kn("Single-Leg Bridge", "3", "10", "30 s", "bw"), kn("Step-down", "3", "10", "45 s", "bw"), kn("Figure-4 Stretch", "2", "30", "10 s", "time")]));
kineScheme("kine-patellar", "Jumpersknie", "Patellapeesklachten onder de knieschijf: eerst vasthouden tegen pijn, dan langzaam zwaarder.", [
  { name: "Fase 1 (vasthouden)", focus: "Isometrisch: vermindert de pijn, ook vlak voor het sporten", ex: [kn("Wall Sit", "5", "45", "60 s", "time"), kn("Quad Set", "3", "10", "15 s", "bw")] },
  { name: "Fase 2 (opbouw)", focus: "Langzaam en zwaarder: 3 tellen zakken", ex: [kn("Decline Squat", "3", "10–15", "60 s", "bw"), kn("Step-down", "3", "10", "45 s", "bw"), kn("Single-Leg Bridge", "3", "10", "30 s", "bw")] }]);
kineScheme("kine-pfps", "Knieschijfpijn", "Pijn rond of achter de knieschijf (patellofemoraal): dij en heup versterken.", kineOne([kn("Quad Set", "3", "10", "15 s", "bw"), kn("Straight Leg Raise", "3", "10–12", "30 s", "bw"), kn("Terminal Knee Extension", "3", "15", "30 s", "bw"), kn("Clamshell", "3", "15", "30 s", "bw"), kn("Wall Sit", "3", "20–40", "45 s", "time"), kn("Step-down", "3", "8–10", "45 s", "bw")]));
kineScheme("kine-acl", "Kruisband", "Revalidatie na een kruisbandletsel of -operatie. Volg altijd het schema van je chirurg en kinesitherapeut; dit zijn de gebruikelijke basisoefeningen.", [
  { name: "Fase 1 (vroeg)", focus: "Strekken, buigen en je dij weer aanspannen", ex: [kn("Quad Set", "3", "10", "15 s", "bw"), kn("Straight Leg Raise", "3", "10", "30 s", "bw"), kn("Heel Slide", "3", "10", "15 s", "bw"), kn("Terminal Knee Extension", "3", "15", "30 s", "bw")] },
  { name: "Fase 2 (kracht en balans)", focus: "Als je goed stapt: kracht, controle en balans", ex: [kn("Wall Sit", "3", "30–45", "45 s", "time"), kn("Step-down", "3", "10", "45 s", "bw"), kn("Single-Leg Bridge", "3", "10", "30 s", "bw"), kn("Single-Leg Balance", "3", "30–45", "15 s", "time"), kn("Glute Bridge", "3", "12", "30 s", "bw")] }]);
kineScheme("kine-hamstring", "Hamstring", "Na een verrekte hamstring: eerst bruggetjes, daarna excentrisch tot je weer kan sprinten.", [
  { name: "Fase 1 (bruggetjes)", focus: "Pijnvrij aanspannen en voorzichtig rekken", ex: [kn("Glute Bridge", "3", "12", "30 s", "bw"), kn("Single-Leg Bridge", "3", "8–10", "30 s", "bw"), kn("Hamstring Stretch", "2", "20–30", "10 s", "time")] },
  { name: "Fase 2 (excentrisch)", focus: "Als het pijnvrij is: lengte en kracht, de beste bescherming tegen een nieuwe scheur", ex: [kn("Single-Leg RDL", "3", "8", "45 s", "bw"), kn("Nordic Hamstring Curl", "2", "3–5", "90 s", "bw"), kn("Single-Leg Bridge", "3", "10", "30 s", "bw")] }]);
kineScheme("kine-groin", "Liesblessure", "Lies- en adductorklachten: adductoren versterken met de Copenhagen-oefening en je heup stabiliseren.", kineOne([kn("Adductor Squeeze", "3", "10", "20 s", "bw"), kn("Copenhagen Plank", "3", "10–20", "45 s", "time"), kn("Clamshell", "3", "15", "30 s", "bw"), kn("Side-Lying Leg Lift", "3", "12–15", "30 s", "bw"), kn("Glute Bridge", "3", "12", "30 s", "bw"), kn("90/90 Hip Switch", "2", "8–10", "15 s", "bw")]));
kineScheme("kine-lowback", "Lage rugpijn", "Rugpijn: in beweging blijven, je romp stabiliseren met de McGill-drie en je heupen sterk houden.", kineOne([kn("Cat-Cow", "1", "8–10", "0 s", "bw"), kn("Pelvic Tilt", "2", "10", "15 s", "bw"), kn("Knee-to-Chest Stretch", "2", "30", "10 s", "time"), kn("McGill Curl-up", "3", "5", "20 s", "bw"), kn("Bird Dog", "3", "6–8", "20 s", "bw"), kn("Side Plank (left)", "2", "15–30", "15 s", "time"), kn("Side Plank (right)", "2", "15–30", "15 s", "time"), kn("Glute Bridge", "3", "10–12", "30 s", "bw")]));
kineScheme("kine-neck", "Nekpijn", "Nekpijn en spanning: diepe nekspieren, schouderbladen en bovenrug.", kineOne([kn("Chin Tuck", "3", "10", "15 s", "bw"), kn("Upper Trapezius Stretch", "2", "30", "10 s", "time"), kn("Scapular Squeeze", "3", "10", "15 s", "bw"), kn("Wall Slide", "2", "10", "20 s", "bw"), kn("Thoracic Rotation", "2", "8", "15 s", "bw")]));
kineScheme("kine-shoulder", "Schouder", "Impingement en rotator cuff (bv. bij zwemmen, werpen, tennis of bankdrukken): ruimte maken en de draaiers versterken.", kineOne([kn("Pendulum", "2", "30", "10 s", "time"), kn("Scapular Squeeze", "3", "10", "15 s", "bw"), kn("Band External Rotation", "3", "12–15", "30 s", "bw"), kn("Band Internal Rotation", "3", "12–15", "30 s", "bw"), kn("Prone Y-T-W", "2", "6–8", "30 s", "bw"), kn("Sleeper Stretch", "2", "30", "10 s", "time"), kn("Wall Slide", "2", "10", "20 s", "bw")]));
kineScheme("kine-tennis", "Tenniselleboog", "Pijn aan de buitenkant van de elleboog: de polsstrekkers excentrisch versterken.", kineOne([["Eccentric Wrist Extension", "3", "15", "45 s", "kine"], kn("Wrist Extensor Stretch", "2", "30", "10 s", "time"), kn("Forearm Rotation", "2", "10–15", "30 s", "bw"), kn("Grip Squeeze", "2", "10", "20 s", "bw")]));
kineScheme("kine-golfer", "Golferselleboog", "Pijn aan de binnenkant van de elleboog: de polsbuigers excentrisch versterken.", kineOne([["Eccentric Wrist Flexion", "3", "15", "45 s", "kine"], kn("Wrist Flexor Stretch", "2", "30", "10 s", "time"), kn("Forearm Rotation", "2", "10–15", "30 s", "bw"), kn("Grip Squeeze", "2", "10", "20 s", "bw")]));
kineScheme("kine-posture", "Houding", "Veel zitten: borst open, bovenrug sterk en heupen los, tegen stijfheid in nek en rug.", kineOne([kn("Doorway Pec Stretch", "2", "30–45", "10 s", "time"), kn("Thoracic Extension", "2", "8–10", "15 s", "bw"), kn("Prone Y-T-W", "2", "6–8", "30 s", "bw"), kn("Chin Tuck", "2", "10", "15 s", "bw"), kn("Couch Stretch", "2", "30–45", "10 s", "time")]));
// ---------- Meditation and breathing: its own category, with a breathing pacer ----------
// [name, Dutch name, how-to, demo]
const MIND_EX = [
  ["Box Breathing", "Boxademhaling (4-4-4-4)", "4 tellen in door je neus, 4 tellen vasthouden, 4 tellen uit, 4 tellen leeg. Rustig en gelijkmatig; goed voor focus en kalmte onder druk.", null],
  ["4-7-8 Breathing", "4-7-8-ademhaling", "4 tellen in door je neus, 7 tellen vasthouden, 8 tellen langzaam uit door je mond. Helpt om tot rust te komen en in te slapen.", null],
  ["Coherent Breathing", "Coherente ademhaling", "Ongeveer 5,5 tellen in en 5,5 tellen uit, zonder pauze: zo'n 5 à 6 ademhalingen per minuut. Brengt je hartslag en ademhaling in een rustig ritme.", null],
  ["Physiological Sigh", "Fysiologische zucht", "Adem in door je neus, adem er nog een korte teug bovenop, en adem dan lang en rustig uit door je mond. Een paar keer is genoeg om snel te kalmeren.", null],
  ["Belly Breathing", "Buikademhaling", "Hand op je buik: adem in door je neus zodat je buik (niet je borst) omhoog komt, en adem langer uit dan in.", null],
  ["Extended Exhale", "Lange uitademing (4-8)", "4 tellen in, 8 tellen uit. Een langere uitademing remt je lichaam af; ideaal na een zware training of voor het slapen.", null],
  ["Alternate Nostril Breathing", "Wisselademhaling", "Sluit je rechterneusgat met je duim en adem links in; sluit links, adem rechts uit; adem rechts in, sluit en adem links uit. Rustig en zonder forceren.", null],
  ["Breath Focus Meditation", "Ademfocus (mindfulness)", "Zit rechtop en ontspannen. Richt je aandacht op je ademhaling bij je neus of buik. Dwaal je af, merk het op en keer vriendelijk terug naar je adem.", "butterfly"],
  ["Body Scan", "Bodyscan", "Lig of zit comfortabel. Ga met je aandacht langzaam van je tenen naar je hoofd en merk op wat je voelt, zonder iets te veranderen.", "savasana"],
  ["5-4-3-2-1 Grounding", "5-4-3-2-1-grounding", "Benoem 5 dingen die je ziet, 4 die je voelt, 3 die je hoort, 2 die je ruikt en 1 die je proeft. Haalt je snel uit piekeren of stress.", "butterfly"],
  ["Loving-Kindness Meditation", "Liefdevolle vriendelijkheid", "Wens in stilte jezelf, iemand die je graag ziet, een onbekende en iemand met wie het moeilijk loopt: \"Mag je gelukkig, gezond en rustig zijn.\"", "butterfly"],
  ["Performance Visualization", "Visualisatie voor je prestatie", "Ogen dicht: beleef je training of wedstrijd stap voor stap in je hoofd, met alle details, en zie jezelf rustig en sterk presteren.", "butterfly"],
  ["Walking Meditation", "Wandelmeditatie", "Wandel heel rustig en voel elke stap: hiel, voetzool, tenen. Stem je ademhaling af op je passen.", "inclineWalk"],
  ["Progressive Muscle Relaxation", "Progressieve spierontspanning", "Span telkens één spiergroep 5 seconden aan en laat ze dan 10 seconden helemaal los, van je voeten tot je gezicht.", "savasana"]
];
MIND_EX.forEach(([n, nl, desc]) => { if (!NL[n]) NL[n] = [nl, desc]; if (!MUSCLES[n]) MUSCLES[n] = [["Ontspanning"], []]; });
// Pacer phases: [label, seconds, size of the circle at the end of the phase (0 small, 1 full)]
const BREATH = {
  "Box Breathing": [["In", 4, 1], ["Vast", 4, 1], ["Uit", 4, 0], ["Vast", 4, 0]],
  "4-7-8 Breathing": [["In", 4, 1], ["Vast", 7, 1], ["Uit", 8, 0]],
  "Coherent Breathing": [["In", 5.5, 1], ["Uit", 5.5, 0]],
  "Physiological Sigh": [["In", 2, .75], ["Nog even in", 1, 1], ["Uit", 6, 0]],
  "Belly Breathing": [["In", 4, 1], ["Uit", 6, 0]],
  "Extended Exhale": [["In", 4, 1], ["Uit", 8, 0]],
  "Alternate Nostril Breathing": [["In (links)", 4, 1], ["Vast", 4, 1], ["Uit (rechts)", 6, 0], ["In (rechts)", 4, 1], ["Vast", 4, 1], ["Uit (links)", 6, 0]]
};
const MIND_NOTE = "Word je duizelig of benauwd, adem dan gewoon normaal verder. Houd je adem niet vast als je zwanger bent of hartklachten hebt.";
const mindScheme = (id, name, note, days) => SCHEMES.push({ id, name, note, days, more: true, mind: true, stay: true });
const md = (n, reps) => st(n, "1", reps, "0 s", "time", "mind");
mindScheme("mind-breath", "Ademhaling", "Ademhalingsoefeningen om te kalmeren, te focussen, in te slapen of te herstellen na het sporten. Open \"Voorbeeld en uitleg\": de cirkel ademt met je mee.", [
  { name: "Rust", focus: "Snel kalmeren bij stress of spanning, ±6 min", ex: [md("Physiological Sigh", "60"), md("Extended Exhale", "180"), md("Belly Breathing", "180")] },
  { name: "Focus", focus: "Helder en geconcentreerd, bv. voor werk of een wedstrijd, ±10 min", ex: [md("Box Breathing", "240"), md("Coherent Breathing", "300"), md("Alternate Nostril Breathing", "120")] },
  { name: "Slapen", focus: "In bed, licht uit, ±10 min", ex: [md("4-7-8 Breathing", "120–240"), md("Belly Breathing", "300")] },
  { name: "Na de training", focus: "Je lichaam uit de 'sportstand' halen, ±5 min", ex: [md("Physiological Sigh", "60"), md("Extended Exhale", "240")] }]);
mindScheme("mind-med", "Meditatie", "Verschillende meditaties, van 3 tot 15 minuten. Begin kort en bouw rustig op; elke dag een paar minuten werkt beter dan af en toe lang.", [
  { name: "Ademfocus", focus: "De basis van mindfulness", ex: [md("Breath Focus Meditation", "300–600")] },
  { name: "Bodyscan", focus: "Ontspannen en je lichaam voelen, ideaal op rustdagen", ex: [md("Body Scan", "600–900")] },
  { name: "Grounding", focus: "Snel uit piekeren en terug in het moment", ex: [md("5-4-3-2-1 Grounding", "180–300")] },
  { name: "Vriendelijkheid", focus: "Warmte en minder zelfkritiek", ex: [md("Loving-Kindness Meditation", "600")] },
  { name: "Visualisatie", focus: "Mentale voorbereiding op een training of wedstrijd", ex: [md("Performance Visualization", "300–600")] },
  { name: "Wandelen", focus: "Meditatie in beweging, binnen of buiten", ex: [md("Walking Meditation", "600–1200")] },
  { name: "Ontspanning", focus: "Spanning loslaten, ook goed voor het slapen", ex: [md("Progressive Muscle Relaxation", "600–900")] }]);
mindScheme("mind-routine", "Dagelijkse routines", "Korte vaste momenten op je dag: zo wordt rust een gewoonte.", [
  { name: "Ochtend", focus: "5 minuten om helder te starten", ex: [md("Box Breathing", "120"), md("Breath Focus Meditation", "180")] },
  { name: "Avond", focus: "10 minuten om af te sluiten en beter te slapen", ex: [md("Extended Exhale", "180"), md("Body Scan", "420")] },
  { name: "Voor de wedstrijd", focus: "Rustig, scherp en klaar", ex: [md("Box Breathing", "120"), md("Performance Visualization", "240")] },
  { name: "Stressmoment", focus: "3 minuten als het even te veel wordt", ex: [md("Physiological Sigh", "60"), md("5-4-3-2-1 Grounding", "120")] }]);

// ---------- Tips per exercise ----------
const TIPS = {
  "Bench Press":["Schouderbladen samen en naar beneden, voeten plat op de grond.","Halter zakt naar je onderborst, ellebogen ongeveer 45° van je lichaam.","Niet stuiteren op je borst; gecontroleerd zakken."],
  "Close-Grip Bench Press":["Handen op schouderbreedte, niet smaller: dat spaart je polsen.","Ellebogen dicht bij je lichaam houden."],
  "Incline Dumbbell Press":["Bank op 30° is genoeg; hoger wordt het vooral schouders.","Dumbbells boven je borst samenbrengen zonder te tikken."],
  "Overhead Press":["Billen en buik aanspannen zodat je niet achterover helt.","Hoofd even naar achter laten gaan en daarna weer onder de halter."],
  "Seated Dumbbell Shoulder Press":["Rugleuning bijna rechtop; rug tegen het kussen.","Niet helemaal op slot duwen bovenaan."],
  "Chest Dip":["Romp licht voorover voor meer borst.","Zak tot je schouders net onder je ellebogen; niet dieper als je schouder klaagt."],
  "Dips":["Rechtop blijven voor meer triceps.","Zak niet verder dan comfortabel voor je schouders."],
  "Low-to-High Cable Fly":["Licht gebogen ellebogen die niet bewegen.","Stop op ooghoogte en knijp je borst samen."],
  "High-to-Low Cable Fly":["Stap één voet voor voor stabiliteit.","Handen eindigen voor je heupen."],
  "Dumbbell Lateral Raise":["Licht gewicht, geen zwaaien.","Leid met je ellebogen, niet met je handen; stop op schouderhoogte."],
  "Lateral Raise":["Licht gewicht, geen zwaaien.","Stop op schouderhoogte."],
  "Cable Lateral Raise":["Kabel achter je lichaam langs voor een betere lijn.","Langzaam laten zakken."],
  "Skull Crusher":["Bovenarmen blijven stil en licht naar achter gekanteld.","Halter naar je voorhoofd of net erachter, niet op je neus."],
  "One-Arm Dumbbell Overhead Extension":["Elleboog wijst naar het plafond en blijft daar.","Zak zo diep dat je triceps goed rekt."],
  "Rope Triceps Pushdown":["Ellebogen tegen je zij geplakt.","Onderaan het touw uit elkaar trekken en kort vasthouden."],
  "Triceps Pushdown":["Ellebogen tegen je zij.","Niet met je schouders meeduwen."],
  "Cable Overhead Triceps Extension":["Romp licht voorover, buik aangespannen.","Volledig strekken en langzaam terug."],
  "Overhead Triceps Extension":["Ellebogen naar voren gericht houden.","Langzaam zakken voor een goede rek."],
  "Back Squat":["Voeten op schouderbreedte, tenen licht naar buiten.","Knieën in de lijn van je tenen, rug neutraal.","Diep genoeg: heup op kniehoogte of lager als dat netjes lukt."],
  "Front Squat":["Ellebogen hoog zodat de halter op je schouders blijft.","Romp blijft rechtop."],
  "Deadlift":["Halter dicht tegen je schenen en dijen.","Rug recht en borst omhoog voor je trekt.","Duw de grond weg met je benen in plaats van te rukken."],
  "Romanian Deadlift":["Knieën licht gebogen en stil.","Heupen naar achter tot je hamstrings rekken; rug blijft recht."],
  "Leg Press":["Onderrug blijft tegen het kussen.","Knieën niet helemaal op slot bovenaan."],
  "Leg Curl":["Heupen tegen het kussen houden.","Langzaam terug laten komen."],
  "Walking Lunge":["Romp rechtop, grote stap.","Knie van het voorste been boven je enkel."],
  "Standing Calf Raise":["Volledig omhoog en onderaan goed laten rekken.","Kort pauzeren bovenaan."],
  "Lat Pulldown":["Trek naar je bovenborst, niet achter je nek.","Schouders eerst naar beneden, dan pas armen buigen."],
  "Close-Grip Lat Pulldown":["Licht achterover leunen, borst omhoog.","Ellebogen naar je heupen trekken."],
  "Pull-up (added weight)":["Vanuit volledige hang beginnen.","Borst naar de stang, niet alleen kin erover duwen."],
  "Seated Cable Row":["Rug recht, niet heen en weer schommelen.","Schouderbladen samenknijpen aan het einde."],
  "Single-Arm Cable Row":["Licht meedraaien met je romp mag.","Trek naar je heup."],
  "Barbell Row":["Romp ongeveer 45° voorover, rug recht.","Trek naar je navel, niet naar je borst."],
  "Straight-Arm Pulldown":["Armen bijna gestrekt en stil in de ellebogen.","Voel het in je lats, niet in je triceps."],
  "Machine Reverse Fly":["Licht gewicht, schouders laag houden.","Duimen naar beneden of neutraal."],
  "Face Pull":["Touw op ooghoogte, ellebogen hoog.","Handen eindigen naast je oren."],
  "Upright Row":["Brede greep is vriendelijker voor je schouders.","Niet hoger trekken dan borsthoogte."],
  "Cable Upright Row":["Ellebogen leiden de beweging.","Stop op borsthoogte."],
  "Dumbbell Pullover":["Heupen iets lager dan de bank.","Ellebogen licht gebogen houden."],
  "Barbell Curl":["Ellebogen stil langs je lichaam.","Niet zwaaien met je rug."],
  "Preacher Curl":["Niet helemaal strekken onderaan als je elleboog gevoelig is.","Langzaam zakken."],
  "Incline Dumbbell Curl":["Schouders tegen de bank houden.","Armen hangen recht naar beneden voor de start."],
  "Cable Curl":["Ellebogen niet naar voren laten komen.","Kort knijpen bovenaan."],
  "Hammer Curl":["Duimen naar boven houden.","Afwisselend of samen, maar zonder zwaaien."],
  "Rope Hammer Curl":["Duimen naar boven.","Ellebogen stil."],
  "Push-up":["Lichaam als een plank, billen niet omhoog of omlaag.","Ellebogen ongeveer 45° van je lichaam."],
  "Ab Wheel Rollout":["Begin met een korte afstand en bouw op.","Onderrug mag niet doorzakken; buik blijft aangespannen."],
  "Plank":["Billen aanspannen, rug recht.","Ademen blijven."],
  "Side Plank (left)":["Heup niet laten zakken.","Lichaam in één lijn."],
  "Side Plank (right)":["Heup niet laten zakken.","Lichaam in één lijn."],
  "Dead Bug":["Onderrug blijft tegen de grond gedrukt.","Langzaam bewegen en uitademen tijdens het strekken."],
  "Reverse Crunch":["Beweging komt uit je bekken, niet uit zwaaien met je benen.","Langzaam terug laten zakken."],
  "Bicycle Crunch":["Niet aan je hoofd trekken; handen liggen er alleen tegen.","Draai vanuit je romp, niet alleen met je elleboog."],
  "V-up":["Te zwaar? Buig je knieën (tuck-up).","Gecontroleerd zakken, niet laten vallen."],
  "Plank Shoulder Tap":["Voeten iets breder voor meer stabiliteit.","Heupen blijven stil, niet wiebelen."],
  "Lying Leg Raise":["Onderrug tegen de grond houden; buig je knieën als dat niet lukt.","Langzaam laten zakken."],
  "Flutter Kicks":["Hoe lager je benen, hoe zwaarder.","Onderrug blijft tegen de grond."],
  "Hollow Hold":["Onderrug tegen de grond; armen en benen hoger als het te zwaar is.","Rustig ademen."],
  "Russian Twist":["Rug recht, niet krom.","Voeten aan de grond maakt het makkelijker."],
  "Mountain Climber":["Heupen laag houden, schouders boven je handen.","Begin rustig en versnel."],
  "Bird Dog":["Rug blijft plat als een tafel.","Kort vasthouden met arm en been gestrekt."],
  "Superman":["Kijk naar de grond, nek in verlengde van je rug.","Billen aanspannen."]
};
const TYPE_TIPS = {
  push: ["Gecontroleerd zakken (2 tellen), krachtig omhoog.", "Stop de set als de techniek slechter wordt."],
  pull: ["Trek eerst je schouders naar achter en beneden, dan pas je armen.", "Niet zwaaien of rukken."],
  legs: ["Knieën in de lijn van je tenen.", "Rug neutraal en buik aangespannen."],
  core: ["Rustig blijven ademen.", "Kwaliteit boven aantal: liever korter maar netjes."],
  mind: ["Zit of lig comfortabel, schouders los.", "Dwaalt je aandacht af? Merk het op en keer rustig terug: dat is de oefening.", "Word je duizelig, adem dan gewoon normaal verder."],
  kine: ["Rustig en gecontroleerd; lichte pijn tot 3 op 10 mag, scherpe pijn niet.", "Liever elke dag een beetje dan één keer veel.", "Wordt het na een paar weken niet beter, ga dan langs bij je kinesitherapeut."],
  cardio: ["Begin 3–5 minuten rustig om op te warmen.", "Praattempo voor duurtraining; intervallen mogen echt zwaar."]
};
Object.assign(TIPS, {
  "Kettlebell Swing": ["Het is een heupbeweging, geen squat: billen naar achter, scheenbenen bijna verticaal.", "Bovenaan billen aanspannen en rechtop staan; niet achterover leunen."],
  "Thruster": ["Ellebogen hoog in de squat, zodat de halter op je schouders blijft.", "Gebruik de kracht uit je benen om de halter omhoog te duwen."],
  "Wall Ball": ["Zak minstens tot je heupen onder je knieën zijn.", "Vang de bal hoog en zak meteen in de volgende squat."],
  "Power Clean": ["Halter dicht bij je lichaam, eerst strekken in je heupen, dan pas trekken met je armen.", "Ellebogen snel naar voor om de halter op je schouders op te vangen."],
  "Box Jump": ["Land zacht met je knieën in de lijn van je tenen.", "Stap af in plaats van terug te springen; dat spaart je achillespezen."],
  "Sled Push": ["Armen gestrekt is sneller, gebogen geeft meer controle.", "Kijk naar de grond en blijf duwen; niet stilvallen."],
  "Sled Pull": ["Zet je voeten breed en blijf laag zitten.", "Leg het touw achter je neer zodat je er niet over struikelt."],
  "Burpee Broad Jump": ["Spring niet te ver: een vast ritme is sneller over 80 meter.", "Land op twee voeten en ga meteen naar de grond voor de volgende."],
  "Sandbag Lunge": ["Romp rechtop en de zak stevig achter je nek.", "Korte stappen en een vast ritme; knie tikt net de grond."],
  "The Hundred": ["Onderrug blijft tegen de mat; is dat te zwaar, buig dan je knieën.", "Adem 5 tellen in en 5 tellen uit."],
  "Roll-up": ["Rol langzaam, wervel per wervel, zonder te rukken.", "Lukt het niet? Buig je knieën of gebruik een elastiek."],
  "Pilates Teaser": ["Begin met gebogen knieën en strek pas als je balans goed is.", "Borst open en schouders laag."],
  "Donkey Kick": ["Heup niet laten draaien; je bekken blijft recht.", "Duw je hiel naar het plafond en span je bil aan bovenaan."],
  "Fire Hydrant": ["Armen gestrekt en rug plat terwijl je knie zijwaarts gaat.", "Niet hoger dan je heup; controle boven hoogte."],
  "Basic Step": ["Zet je hele voet op de step, niet alleen je tenen.", "Stap dicht bij de step af om je knieën te sparen."],
  "Bear Crawl": ["Knieën net boven de grond en rug plat als een tafel.", "Kleine passen, tegengestelde hand en voet samen."]
});
for (let i = 1; i <= 8; i++) TIPS[HYROX_RUN(i)] = ["Na een station even je ademhaling laten zakken en dan pas je tempo opbouwen.", "Probeer alle acht kilometers ongeveer even snel te lopen."];
function fillTips(){
  document.querySelectorAll("#exercises .ex").forEach(li => {
    const ul = li.querySelector(".tips"); if (!ul) return;
    const name = li.querySelector(".ex-name").textContent, k = knownExercise(name) || {};
    const type = li.classList.contains("cardio") ? "cardio" : (k.type || "push");
    const tips = TIPS[name] || TYPE_TIPS[type] || [];
    ul.innerHTML = tips.length ? `<li class="tips-h">Let op</li>` + tips.map(t => `<li>${esc(t)}</li>`).join("") : "";
    const how = li.querySelector(".demo-how"), box = li.querySelector(".demo-stage");
    if (how && box){
      if (demoOpen.has(li.dataset.k)) how.open = true;
      how.addEventListener("toggle", () => { how.open ? demoOpen.add(li.dataset.k) : demoOpen.delete(li.dataset.k); });
      mountDemo(box, name, type);
    }
  });
}
const demoOpen = new Set();

// ---------- Exercise demos: an animated figure per movement pattern ----------
// A pose is a hip position, a torso angle and per limb either angles (ua/fa, th/sh) or a target for the
// hand/foot (solved with two-bone IK). Angles in degrees: 0 = right, 90 = down. Side view faces right;
// front view mirrors the far limbs. Patterns move between key poses with a lifting tempo (e.g. 1 s up, 2 s down).
const DM_LEN = { t: 32, ua: 19, fa: 18, th: 24, sh: 23 };
const DM_ANG = new Set(["t", "n", "ua", "fa", "ub", "fb", "th", "sh", "tb", "sb", "fd", "fd2", "hz", "hz2"]);
const dmDir = a => [Math.cos(a * Math.PI / 180), Math.sin(a * Math.PI / 180)];
const dmAdd = (p, v, k = 1) => [p[0] + v[0] * k, p[1] + v[1] * k];
function dmIk(root, target, a, b, s){
  const dx = target[0] - root[0], dy = target[1] - root[1], base = Math.atan2(dy, dx);
  const d = Math.min(a + b - .01, Math.max(Math.abs(a - b) + .01, Math.hypot(dx, dy)));
  const al = Math.acos((a * a + d * d - b * b) / (2 * a * d));
  return [[root[0] + a * Math.cos(base + s * al), root[1] + a * Math.sin(base + s * al)], [root[0] + d * Math.cos(base), root[1] + d * Math.sin(base)]];
}
function dmLerp(A, B, u){
  const P = {};
  new Set(Object.keys(A).concat(Object.keys(B))).forEach(k => {
    const a = A[k] !== undefined ? A[k] : B[k], b = B[k] !== undefined ? B[k] : A[k];
    if (Array.isArray(a)) P[k] = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
    else if (typeof a !== "number") P[k] = u < .5 ? a : b;
    else if (DM_ANG.has(k)){ const d = ((b - a) % 360 + 540) % 360 - 180; P[k] = a + d * u; }
    else P[k] = a + (b - a) * u;
  });
  return P;
}
// The figure follows the profile: a woman for "vrouw", else a man; build (BMI) sets the thickness of torso and limbs
// (w, 0.85–1.25) and height the overall size (k, ±6 %, scaled around the floor so the gear stays in place).
let dmBody = { f: false, w: 1, k: 1 };
function dmBodyFit(){
  const f = sexOf() === "vrouw", cm = (prefs.profile || {}).height, kg = latestBw(), cl = (v, a, b) => Math.min(b, Math.max(a, v));
  const bmi = cm && kg ? kg / Math.pow(cm / 100, 2) : 22.5;
  dmBody = { f, w: cl(1 + (bmi - 22.5) * .04, .85, 1.25), k: cl((cm || (f ? 166 : 178)) / 175, .94, 1.06) };
}
// Solve all joints of a pose.
function dmSolve(P, front){
  const H = [P.x, P.y], t = P.t, S = dmAdd(H, dmDir(t), DM_LEN.t), fwd = dmDir(t + 90), down = dmDir(t + 180);
  const J = { H, S, front, t };
  J.head = dmAdd(S, dmDir(t + (P.n || 0)), 12.5);
  const mirA = a => 180 - a, mirP = p => [2 * P.x - p[0], p[1]], B = dmBody;
  const side = front ? [11 * (B.f ? .86 : 1) * (1 + (B.w - 1) * .5), 6 * (B.f ? 1.3 : 1) * B.w] : [0, 0], perp = dmDir(t + 90);   // shoulder / hip half-widths in front view
  const el = P.el || 0;
  J.S1 = dmAdd(dmAdd(S, perp, side[0]), [0, -el]); J.S2 = dmAdd(dmAdd(S, perp, -side[0]), [0, -el]);
  J.H1 = dmAdd(H, perp, side[1] * (front ? 1 : 0)); J.H2 = dmAdd(H, perp, -side[1] * (front ? 1 : 0));
  if (front){ J.S1 = [S[0] + side[0], S[1] - el]; J.S2 = [S[0] - side[0], S[1] - el]; J.H1 = [H[0] + side[1], H[1]]; J.H2 = [H[0] - side[1], H[1]]; }
  const rel = (r, root) => dmAdd(dmAdd(root, fwd, r[0]), down, r[1]);
  const arm = (root, ua, fa, hand, hr, s, hz, mirror) => {
    const sc = P.as || 1;
    if (hz !== undefined){        // front view, arm swinging in the horizontal plane (flyes)
      const pr = (a, L) => { const v = dmDir(a); return [v[0] * Math.cos(hz * Math.PI / 180) * L * (mirror ? -1 : 1), v[1] * L]; };
      const e = dmAdd(root, pr(ua, DM_LEN.ua)); return [e, dmAdd(e, pr(fa, DM_LEN.fa))];
    }
    if (hand || hr){ const tg = hand || rel(hr, root); return dmIk(root, tg, DM_LEN.ua * sc, DM_LEN.fa * sc, s); }
    const e = dmAdd(root, dmDir(ua), DM_LEN.ua * sc); return [e, dmAdd(e, dmDir(fa), DM_LEN.fa * sc)];
  };
  const leg = (root, th, sh, foot, s, ts) => {
    if (foot) return dmIk(root, foot, DM_LEN.th * ts, DM_LEN.sh, s);
    const k = dmAdd(root, dmDir(th), DM_LEN.th * ts); return [k, dmAdd(k, dmDir(sh), DM_LEN.sh)];
  };
  const eb = P.eb || 1, kb = P.kb || -1, ts = P.ts || 1;
  [J.E1, J.W1] = arm(J.S1, P.ua, P.fa, P.hand, P.hr, eb, P.hz, false);
  const farArm = P.ub !== undefined || P.hand2 || P.hr2 || P.hz2 !== undefined;
  if (farArm) [J.E2, J.W2] = arm(J.S2, P.ub, P.fb, P.hand2, P.hr2, P.eb2 || eb, P.hz2, front);
  else if (front && P.hz !== undefined) [J.E2, J.W2] = arm(J.S2, P.ua, P.fa, undefined, undefined, -eb, P.hz, true);
  else if (front) [J.E2, J.W2] = arm(J.S2, P.ua !== undefined ? mirA(P.ua) : undefined, P.fa !== undefined ? mirA(P.fa) : undefined,
    P.hand ? mirP(P.hand) : undefined, P.hr ? [P.hr[0], P.hr[1]] : undefined, -eb, P.hz, true);
  else { J.E2 = J.E1; J.W2 = J.W1; }
  if (front && P.hr && !farArm){ const tg = mirP(rel(P.hr, J.S1)); [J.E2, J.W2] = dmIk(J.S2, tg, DM_LEN.ua, DM_LEN.fa, -eb); }
  [J.K1, J.A1] = leg(J.H1, P.th, P.sh, P.foot, kb, ts);
  const farLeg = P.tb !== undefined || P.foot2;
  if (farLeg) [J.K2, J.A2] = leg(J.H2, P.tb, P.sb, P.foot2, P.kb2 || kb, ts);
  else if (front) [J.K2, J.A2] = leg(J.H2, P.th !== undefined ? mirA(P.th) : undefined, P.sh !== undefined ? mirA(P.sh) : undefined, P.foot ? mirP(P.foot) : undefined, -kb, ts);
  else { J.K2 = J.K1; J.A2 = J.A1; }
  const fd = P.fd !== undefined ? P.fd : 0, fd2 = P.fd2 !== undefined ? P.fd2 : fd;
  J.T1 = dmAdd(J.A1, dmDir(front ? 90 + (P.x < J.A1[0] ? -60 : -60) : fd), front ? 4 : 8);
  J.T2 = dmAdd(J.A2, dmDir(front ? 90 : fd2), front ? 4 : 8);
  if (front){ J.T1 = [J.A1[0] + 4, J.A1[1] + 2]; J.T2 = [J.A2[0] - 4, J.A2[1] + 2]; }
  J.cv = P.cv || 0;
  J.P = P;
  return J;
}

// ---------- drawing ----------
const dmF = n => Math.round(n * 10) / 10;
const dmCirc = (p, r, cls) => `<circle cx="${dmF(p[0])}" cy="${dmF(p[1])}" r="${r}" class="${cls}"/>`;
const dmMix = (a, b, u) => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
const dmPt = p => dmF(p[0]) + " " + dmF(p[1]);
// A limb as a tapered capsule with a muscle bulge: half-width ra at a, rb at b, rounded at both joints.
function dmLimb(a, b, ra, rb, cls, bulge = 1.1){
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
  if (L < .6) return dmCirc(a, dmF(Math.max(ra, rb)), cls);
  const d = [dx / L, dy / L], n = [-d[1], d[0]], c = (4 * (ra + rb) / 2 * bulge - ra - rb) / 2;
  const P = (p, r, s) => dmAdd(p, n, r * s), C = s => dmAdd(dmAdd(a, d, L * .42), n, c * s);
  return `<path d="M${dmPt(P(a, ra, 1))}Q${dmPt(C(1))} ${dmPt(P(b, rb, 1))}A${dmF(rb)} ${dmF(rb)} 0 0 0 ${dmPt(P(b, rb, -1))}`
    + `Q${dmPt(C(-1))} ${dmPt(P(a, ra, -1))}A${dmF(ra)} ${dmF(ra)} 0 0 0 ${dmPt(P(a, ra, 1))}Z" class="${cls}"/>`;
}
// A smooth closed outline through points (Catmull-Rom as cubic curves).
function dmSmooth(pts, cls){
  const n = pts.length;
  let s = `M${dmPt(pts[0])}`;
  for (let i = 0; i < n; i++){
    const p0 = pts[(i + n - 1) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    s += `C${dmPt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${dmPt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${dmPt(p2)}`;
  }
  return `<path d="${s}Z" class="${cls}"/>`;
}
// Torso outline from hips to shoulders. Side view: back and front profile (glutes, waist, chest, shoulders) that
// bends with the spine; front view: hips, waist and shoulders. k < 1 gives the inner shape for a working muscle.
function dmTorso(J, cls, k = 1){
  const B = dmBody, f = B.f, w = 1 + (B.w - 1) * .9, belly = Math.pow(B.w, 1.8), u = dmDir(J.t), p = dmDir(J.t + 90), Lt = DM_LEN.t;
  const ax = s => { const c = Math.max(0, Math.min(1, s)); return dmAdd(dmAdd(J.H, u, Lt * s), p, 2 * c * (1 - c) * (J.cv || 0)); };
  const pts = [];
  if (J.front){
    const hw = Math.abs(J.H1[0] - J.H2[0]) / 2 || 6, sw = Math.abs(J.S1[0] - J.S2[0]) / 2 || 11, wst = (hw + sw) / 2 * (f ? .66 : .8) * belly;
    const prof = [[-.04, hw + .6], [.2, hw + 1.1], [.48, wst], [.74, sw * .84], [.92, sw * .98], [1.04, sw * .6]];
    prof.forEach(([s, r]) => pts.push(dmAdd(ax(s), p, -r * k)));
    pts.push(ax(1.12));
    prof.slice().reverse().forEach(([s, r]) => pts.push(dmAdd(ax(s), p, r * k)));
    pts.push(ax(-.14));
  } else {
    // [level along the spine, front, back]
    const prof = f ? [[-.06, 5, 6.6], [.16, 5.8, 7.6], [.46, 4.6 * belly, 4.6], [.7, 6.4, 5.2], [.9, 4.9, 5], [1.04, 3.2, 3.6]]
      : [[-.06, 4.6, 5.8], [.18, 5.3, 6.4], [.46, 5.2 * belly, 5], [.72, 6.6, 6.1], [.92, 5.3, 5.6], [1.05, 3.4, 4]];
    prof.forEach(([s, , b]) => pts.push(dmAdd(ax(s), p, -b * w * k)));
    pts.push(ax(1.13));
    prof.slice().reverse().forEach(([s, fr]) => pts.push(dmAdd(ax(s), p, fr * w * k)));
    pts.push(ax(-.15));
  }
  return dmSmooth(pts, cls);
}
// Head with hair: short hair for a man, a ponytail (side view) or long hair (front view) for a woman.
function dmHead(J){
  const h = J.head, r = 7.2, up = J.t + (J.P.n || 0), back = up - 90, pt = (a, rr) => dmAdd(h, dmDir(a), rr);
  // the hair is the part of the head cut off by a chord between two angles
  const cap = (a1, a2) => { const R = r + .5, p = pt(a1, R), q = pt(a2, R); return `<path d="M${dmPt(p)}A${R} ${R} 0 ${Math.abs(a2 - a1) > 180 ? 1 : 0} ${a2 > a1 ? 1 : 0} ${dmPt(q)}Z" class="dm-hairf"/>`; };
  let s = dmCirc(h, r, "dm-skin");
  if (!J.front) s += dmCirc(pt(up + 98, r - .3), 1.6, "dm-skin");      // nose, so you see which way the face points
  if (!dmBody.f) return s + (J.front ? cap(up - 80, up + 80) : cap(up + 55, up - 140));
  if (J.front){
    const l = pt(up - 92, r - 1), rt = pt(up + 92, r - 1);
    return `<path d="M${dmPt(l)}l-1 10M${dmPt(rt)}l1 10" stroke-width="4" class="dm-hair"/>` + s + cap(up - 105, up + 105);
  }
  const a = pt(up - 60, r), sway = Math.sin(performance.now() / 300) * 1.2, c = dmAdd(a, dmDir(back), 6.5), e = dmAdd(dmAdd(a, dmDir(back), 5), [sway, 9]);
  return `<path d="M${dmPt(a)}Q${dmPt(c)} ${dmPt(e)}" stroke-width="4.2" class="dm-hair"/>` + s + cap(up + 55, up - 150) + dmCirc(a, 2.6, "dm-hairf");
}
// The figure: skin-coloured limbs with sleeves, shorts and shoes; the working muscles in the accent colour.
function dmFigure(J, hl, gearBack, gearFront){
  const B = dmBody, f = B.f, k = v => v * (1 + (B.w - 1) * .9);
  const R = f ? { ua: [3.2, 2.3], fa: [2.4, 1.6], th: [5.6, 3.2], sh: [3.1, 1.8] } : { ua: [3.8, 2.6], fa: [2.8, 1.8], th: [5.3, 3.4], sh: [3.4, 2] };
  // top part covered by clothing (short sleeve, shorts)
  const CL = { ua: .42, th: .5 };
  const limb = (a, b, seg, far, hot) => {
    const [ra, rb] = R[seg].map(k), x = far ? " dm-far" : "";
    let s = dmLimb(a, b, ra, rb, "dm-skin" + x, seg === "sh" ? 1.18 : 1.12);
    if (CL[seg]){ const u = CL[seg]; s += dmLimb(a, dmMix(a, b, u), ra + .6, ra + (rb - ra) * u + .6, "dm-cloth" + x, 1.04); }
    if (hot) s += dmLimb(dmMix(a, b, .1), dmMix(a, b, .84), ra * .66, rb * .7, "dm-mus" + x, 1.2);
    return s;
  };
  const shoe = (a, t, far) => { const v = dmDir(Math.atan2(t[1] - a[1], t[0] - a[0]) * 180 / Math.PI); return dmLimb(dmAdd(a, v, -1.6), dmAdd(t, v, 1), 2.4, 1.6, "dm-shoe" + (far ? " dm-far" : ""), 1); };
  const hand = (p, far) => dmCirc(p, dmF(k(f ? 1.9 : 2.2)), "dm-skin" + (far ? " dm-far" : ""));
  const arm = (S, E, W, far, hot) => limb(S, E, "ua", far, hot("ua")) + limb(E, W, "fa", far, hot("fa")) + hand(W, far);
  const leg = (H, K, A, T, far, hot) => limb(H, K, "th", far, hot("th")) + limb(K, A, "sh", far, hot("sh")) + shoe(A, T, far);
  const near = seg => hl.includes(seg), farHot = seg => hl.includes(seg + "2");
  const torso = () => dmTorso(J, "dm-cloth") + (hl.includes("t") ? dmTorso(J, "dm-mus", .62) : "");
  const neck = dmLimb(J.S, dmAdd(J.S, dmDir(J.t + (J.front ? 0 : J.P.n || 0)), 6), k(f ? 2.2 : 2.7), k(f ? 2 : 2.4), "dm-skin", 1);
  let s = gearBack || "";
  if (J.front){
    s += leg(J.H2, J.K2, J.A2, J.T2, false, near) + leg(J.H1, J.K1, J.A1, J.T1, false, near);
    s += neck + torso();
    s += arm(J.S2, J.E2, J.W2, false, near) + arm(J.S1, J.E1, J.W1, false, near) + dmHead(J);
  } else {
    s += arm(J.S2, J.E2, J.W2, true, farHot) + leg(J.H2, J.K2, J.A2, J.T2, true, farHot);
    s += neck + dmHead(J) + torso();
    s += leg(J.H1, J.K1, J.A1, J.T1, false, near) + arm(J.S1, J.E1, J.W1, false, near);
  }
  return s + (gearFront || "");
}
// The gym around the figure: a skirting board, the floor and a soft shadow under the figure.
function dmScene(J){
  const k = dmBody.k, xs = [J.H[0], J.A1[0], J.A2[0], J.S[0]], lo = Math.min(...xs), hi = Math.max(...xs);
  const cx = 80 + ((lo + hi) / 2 - 80) * k, rx = Math.min(46, Math.max(16, (hi - lo) / 2 + 9)) * k;
  return `<rect x="-90" y="104.5" width="340" height="4" class="dm-skirt"/><rect x="-90" y="108.5" width="340" height="30" class="dm-floor"/>`
    + `<line x1="-90" y1="108.5" x2="250" y2="108.5" class="dm-edge"/><ellipse cx="${dmF(cx)}" cy="110.4" rx="${dmF(rx)}" ry="2.6" class="dm-shadow"/>`;
}

// gear pieces
const DG = {
  plate: (p, r = 10) => `<circle cx="${dmF(p[0])}" cy="${dmF(p[1])}" r="${r}" class="dm-plate"/><circle cx="${dmF(p[0])}" cy="${dmF(p[1])}" r="${Math.max(1.6, r / 4.5)}" class="dm-hub"/>`,
  db: p => DG.plate(p, 4.8),
  handle: p => `<circle cx="${dmF(p[0])}" cy="${dmF(p[1])}" r="3.2" class="dm-handle"/>`,
  cable: (p, a) => `<line x1="${dmF(p[0])}" y1="${dmF(p[1])}" x2="${a[0]}" y2="${a[1]}" class="dm-cable"/><circle cx="${a[0]}" cy="${a[1]}" r="3.6" class="dm-pulley"/>`,
  tower: x => `<line x1="${x}" y1="-16" x2="${x}" y2="108" class="dm-frame"/>`,
  rect: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" class="dm-pad"/>`,
  line: (a, b, w = 5) => `<line x1="${dmF(a[0])}" y1="${dmF(a[1])}" x2="${dmF(b[0])}" y2="${dmF(b[1])}" stroke-width="${w}" class="dm-padl"/>`,
  bench: (x1, x2, y) => DG.rect(x1, y, x2 - x1, 5) + `<line x1="${x1 + 6}" y1="${y + 5}" x2="${x1 + 6}" y2="108" class="dm-frame"/><line x1="${x2 - 6}" y1="${y + 5}" x2="${x2 - 6}" y2="108" class="dm-frame"/>`,
  // a pad along the back of the torso (bench, incline bench, chair back)
  back: (J, ext = 6, off = 7.5) => { const b = dmDir(J.t - 90), a = dmAdd(dmAdd(J.H, b, off), dmDir(J.t), -ext), c = dmAdd(dmAdd(J.S, b, off), dmDir(J.t), ext); return DG.line(a, c, 5); },
  bar: (x, y) => `<line x1="${x}" y1="${y}" x2="${x + 34}" y2="${y}" class="dm-frame"/><line x1="${x + 34}" y1="${y}" x2="${x + 34}" y2="108" class="dm-frame"/><circle cx="${x}" cy="${y}" r="2.6" class="dm-handle"/>`,
  wall: x => `<rect x="${x}" y="-18" width="5" height="126" class="dm-wall"/>`,
  mat: (x1, x2) => `<rect x="${x1}" y="106.5" width="${x2 - x1}" height="2.5" rx="1.2" class="dm-mat"/>`,
};

// ---------- the poses ----------
const DS = { x: 80, y: 59, t: -90, foot: [80, 105] };                 // standing
const DSEAT = { x: 74, y: 84, t: -90, foot: [99, 105] };               // seated on a bench
const DLIE = { x: 92, y: 70, t: 180, foot: [112, 105] };               // lying on a flat bench
const DPRONE = { x: 72.6, y: 82.4, t: -23.6, th: 156.4, sh: 156.4, fd: 50 }; // push-up top, angle legs
const dmBenchGear = J => DG.back(J, 8, 7.5) + `<line x1="50" y1="80" x2="50" y2="108" class="dm-frame"/><line x1="96" y1="80" x2="96" y2="108" class="dm-frame"/>`;
const dmSeatGear = J => DG.rect(J.H[0] - 16, J.H[1] + 6, 30, 5) + `<line x1="${J.H[0] - 4}" y1="${J.H[1] + 11}" x2="${J.H[0] - 4}" y2="108" class="dm-frame"/>`;
const dmPair = (A, B, o) => Object.assign({ k: [A, B] }, o);

const DEMOS = {
  bench: dmPair(Object.assign({}, DLIE, { hand: [66, 62] }), Object.assign({}, DLIE, { hand: [62, 34] }),
    { eq: "bb", back: dmBenchGear, hl: ["t", "ua"], ph: ["Uitduwen", "Gecontroleerd laten zakken"], tm: [1, 2] }),
  benchDb: null, // filled below (same motion, dumbbells)
  incline: dmPair({ x: 92, y: 78, t: -150, foot: [114, 105], hr: [8, 4] }, { x: 92, y: 78, t: -150, foot: [114, 105], hr: [36, -2] },
    { eq: "db", back: J => DG.back(J, 8, 7.5) + DG.rect(84, 85, 26, 5) + `<line x1="96" y1="90" x2="96" y2="108" class="dm-frame"/>`, hl: ["t", "ua"], ph: ["Uitduwen", "Gecontroleerd laten zakken"], tm: [1, 2] }),
  decline: dmPair({ x: 92, y: 66, t: 168, foot: [116, 82], kb: -1, hr: [8, 4] }, { x: 92, y: 66, t: 168, foot: [116, 82], hr: [36, -1] },
    { eq: "bb", back: J => DG.back(J, 8, 7.5) + `<line x1="60" y1="80" x2="60" y2="108" class="dm-frame"/><line x1="96" y1="76" x2="96" y2="108" class="dm-frame"/>` + DG.rect(108, 84, 14, 6), hl: ["t", "ua"], ph: ["Uitduwen", "Gecontroleerd laten zakken"], tm: [1, 2] }),
  chestPress: dmPair(Object.assign({}, DSEAT, { hr: [6, 9] }), Object.assign({}, DSEAT, { hr: [35, 7] }),
    { eq: "handle", back: J => DG.back(J, 4, 7.5) + dmSeatGear(J), hl: ["t", "ua"], ph: ["Uitduwen", "Terug laten komen"], tm: [1, 2] }),
  fly: dmPair({ x: 80, y: 59, t: -90, foot: [84, 105], ua: -4, fa: -8, hz: 0 }, { x: 80, y: 59, t: -90, foot: [84, 105], ua: -4, fa: -8, hz: 100 },
    { front: true, eq: "handle", hl: ["t"], ph: ["Armen in een boog samenbrengen", "Gecontroleerd openen"], tm: [1.2, 2] }),
  flyLow: dmPair({ x: 80, y: 59, t: -90, foot: [86, 105], ua: 45, fa: 40, hz: 0 }, { x: 80, y: 59, t: -90, foot: [86, 105], ua: -18, fa: -20, hz: 100 },
    { front: true, eq: "handle", cables: [[10, 100], [150, 100]], hl: ["t"], ph: ["Van laag naar hoog samenbrengen", "Gecontroleerd terug"], tm: [1.2, 2] }),
  flyHigh: dmPair({ x: 80, y: 59, t: -90, foot: [86, 105], ua: -35, fa: -30, hz: 0 }, { x: 80, y: 59, t: -90, foot: [86, 105], ua: 40, fa: 45, hz: 100 },
    { front: true, eq: "handle", cables: [[10, -14], [150, -14]], hl: ["t"], ph: ["Van hoog naar laag samenbrengen", "Gecontroleerd terug"], tm: [1.2, 2] }),
  revFly: dmPair({ x: 80, y: 59, t: -90, foot: [84, 105], ua: -2, fa: -4, hz: 100 }, { x: 80, y: 59, t: -90, foot: [84, 105], ua: -2, fa: -4, hz: 0 },
    { front: true, eq: "handle", hl: ["ua"], ph: ["Armen naar achter openen", "Gecontroleerd terug"], tm: [1.2, 2] }),
  pushup: dmPair(Object.assign({}, DPRONE, { hand: [102, 106] }), { x: 75.8, y: 92.9, t: -10, th: 170, sh: 170, fd: 50, hand: [102, 106] },
    { mat: [20, 132], hl: ["t", "ua"], ph: ["Laten zakken", "Uitduwen"], tm: [2, 1] }),
  pike: dmPair({ x: 66, y: 60, t: 48, n: 20, foot: [42, 104], fd: -10, hand: [108, 104] }, { x: 68, y: 64, t: 62, n: 20, foot: [42, 104], fd: -10, hand: [108, 104] },
    { mat: [20, 132], hl: ["ua"], ph: ["Hoofd naar de grond", "Uitduwen"], tm: [2, 1] }),
  ohp: dmPair(Object.assign({}, DS, { hr: [7, -2] }), Object.assign({}, DS, { hr: [3, -36] }),
    { eq: "bb", hl: ["ua"], ph: ["Boven je hoofd uitduwen", "Gecontroleerd laten zakken"], tm: [1, 2] }),
  ohpSeat: dmPair(Object.assign({}, DSEAT, { hr: [7, -1] }), Object.assign({}, DSEAT, { hr: [2, -36] }),
    { eq: "db", back: J => DG.back(J, 6, 7.5) + dmSeatGear(J), hl: ["ua"], ph: ["Uitduwen", "Gecontroleerd laten zakken"], tm: [1, 2] }),
  landmine: dmPair(Object.assign({}, DS, { t: -80, x: 76, hr: [8, 2] }), Object.assign({}, DS, { t: -80, x: 76, hr: [32, -18] }),
    { eq: "none", front_: J => DG.line([30, 106], J.W1, 3.4) + DG.plate([30, 98], 9), hl: ["ua", "t"], ph: ["Schuin omhoog duwen", "Terug laten zakken"], tm: [1, 2] }),
  latRaise: dmPair({ x: 80, y: 59, t: -90, foot: [84, 105], ua: 82, fa: 86 }, { x: 80, y: 59, t: -90, foot: [84, 105], ua: -2, fa: 2 },
    { front: true, eq: "db", hl: ["ua"], ph: ["Zijwaarts heffen tot schouderhoogte", "Langzaam laten zakken"], tm: [1, 2] }),
  frontRaise: dmPair(Object.assign({}, DS, { ua: 86, fa: 88 }), Object.assign({}, DS, { ua: -4, fa: -6 }),
    { eq: "db", hl: ["ua"], ph: ["Voorwaarts heffen", "Langzaam laten zakken"], tm: [1, 2] }),
  uprightRow: dmPair(Object.assign({}, DS, { hand: [84, 64], eb: -1 }), Object.assign({}, DS, { hand: [85, 30], eb: -1 }),
    { eq: "bb", hl: ["ua"], ph: ["Ellebogen hoog optrekken", "Laten zakken"], tm: [1, 2] }),
  shrug: dmPair({ x: 80, y: 59, t: -90, foot: [84, 105], ua: 86, fa: 88 }, { x: 80, y: 59, t: -90, foot: [84, 105], ua: 86, fa: 88, el: 5 },
    { front: true, eq: "db", hl: ["t"], ph: ["Schouders naar je oren", "Laten zakken"], tm: [1, 1.5] }),
  facePull: dmPair(Object.assign({}, DS, { hand: [114, 18], eb: -1 }), Object.assign({}, DS, { hand: [90, 14], eb: -1 }),
    { eq: "handle", anchor: [138, 14], back: () => DG.tower(142), hl: ["ua"], ph: ["Naar je gezicht trekken, ellebogen hoog", "Gecontroleerd terug"], tm: [1, 2] }),
  pushdown: dmPair(Object.assign({}, DS, { x: 77, t: -80, ua: 95, fa: -35 }), Object.assign({}, DS, { x: 77, t: -80, ua: 95, fa: 86 }),
    { eq: "handle", anchor: [94, -14], back: () => DG.tower(104), hl: ["ua"], ph: ["Naar beneden duwen", "Gecontroleerd terug"], tm: [1, 2] }),
  ohExt: dmPair(Object.assign({}, DS, { ua: -100, fa: 118 }), Object.assign({}, DS, { ua: -100, fa: -95 }),
    { eq: "db", hl: ["ua"], ph: ["Onderarmen strekken", "Achter je hoofd laten zakken"], tm: [1, 2] }),
  ohExtCable: dmPair(Object.assign({}, DS, { x: 74, t: -62, foot: [86, 105], ua: -40, fa: 150 }), Object.assign({}, DS, { x: 74, t: -62, foot: [86, 105], ua: -40, fa: -38 }),
    { eq: "handle", anchor: [26, 86], back: () => DG.tower(20), hl: ["ua"], ph: ["Naar voor strekken", "Gecontroleerd terug"], tm: [1, 2] }),
  skull: dmPair(Object.assign({}, DLIE, { ua: -104, fa: 172 }), Object.assign({}, DLIE, { ua: -100, fa: -98 }),
    { eq: "bb", back: dmBenchGear, hl: ["ua"], ph: ["Onderarmen strekken", "Naar je voorhoofd laten zakken"], tm: [1, 2] }),
  kickback: dmPair({ x: 70, y: 62, t: -22, foot: [80, 105], ua: 168, fa: 92 }, { x: 70, y: 62, t: -22, foot: [80, 105], ua: 168, fa: 168 },
    { eq: "handle", anchor: [134, 100], back: () => DG.tower(140), hl: ["ua"], ph: ["Onderarm naar achter strekken", "Gecontroleerd terug"], tm: [1, 2] }),
  dips: dmPair({ x: 78, y: 50, t: -88, foot: [64, 86], hand: [84, 54] }, { x: 76, y: 66, t: -80, foot: [62, 100], hand: [84, 54] },
    { back: () => `<line x1="84" y1="56" x2="84" y2="108" class="dm-frame"/>`, front_: J => DG.handle([84, 56]), hl: ["ua", "t"], ph: ["Laten zakken", "Uitduwen"], tm: [2, 1] }),
  chestDip: dmPair({ x: 78, y: 50, t: -84, foot: [62, 86], hand: [84, 54] }, { x: 72, y: 64, t: -64, foot: [52, 94], hand: [84, 54] },
    { back: () => `<line x1="84" y1="56" x2="84" y2="108" class="dm-frame"/>`, front_: J => DG.handle([84, 56]), hl: ["t", "ua"], ph: ["Voorover laten zakken", "Uitduwen"], tm: [2, 1] }),
  benchDip: dmPair({ x: 68, y: 80, t: -92, foot: [110, 104], fd: -80, hand: [60, 80] }, { x: 68, y: 94, t: -92, foot: [110, 104], fd: -80, hand: [60, 80] },
    { back: () => DG.bench(30, 64, 80), hl: ["ua"], ph: ["Laten zakken", "Uitduwen"], tm: [2, 1] }),
  pullup: dmPair({ x: 79, y: 52, t: -92, foot: [66, 90], hand: [84, -16] }, { x: 75, y: 24, t: -100, foot: [62, 62], hand: [84, -16] },
    { back: () => DG.bar(84, -16), hl: ["ua", "t"], ph: ["Optrekken tot je kin boven de stang", "Gecontroleerd laten zakken"], tm: [1, 2] }),
  hang: dmPair({ x: 79, y: 52, t: -92, foot: [70, 96], hand: [84, -16] }, { x: 80, y: 52, t: -90, foot: [72, 96], hand: [84, -16] },
    { back: () => DG.bar(84, -16), hl: ["ua"], ph: ["Ontspannen hangen", "Rustig ademen"], tm: [2.5, 2.5] }),
  pulldown: dmPair({ x: 76, y: 82, t: -100, foot: [102, 105], hand: [84, 14] }, { x: 76, y: 82, t: -102, foot: [102, 105], hand: [82, 49] },
    { eq: "handle", anchor: [84, -14], back: J => DG.tower(116) + `<line x1="84" y1="-16" x2="116" y2="-16" class="dm-frame"/>` + DG.rect(60, 88, 30, 5) + DG.rect(92, 72, 14, 6), hl: ["t", "ua"], ph: ["Stang naar je borst trekken", "Gecontroleerd terug"], tm: [1, 2] }),
  saPulldown: dmPair({ x: 76, y: 60, t: -66, foot: [82, 105], hand: [114, 6] }, { x: 76, y: 60, t: -66, foot: [82, 105], hand: [96, 64] },
    { eq: "handle", anchor: [134, -12], back: () => DG.tower(140), hl: ["t"], ph: ["Gestrekte armen naar je dijen", "Langzaam terug"], tm: [1, 2] }),
  pullover: dmPair(Object.assign({}, DLIE, { ua: 176, fa: 178 }), Object.assign({}, DLIE, { ua: -86, fa: -86 }),
    { eq: "db", back: dmBenchGear, hl: ["t"], ph: ["Boog naar boven", "Langzaam achter je hoofd"], tm: [1.2, 2] }),
  row: dmPair({ x: 68, y: 62, t: -22, foot: [80, 105], hand: [96, 92] }, { x: 68, y: 62, t: -22, foot: [80, 105], hand: [84, 70] },
    { eq: "bb", hl: ["t", "ua"], ph: ["Naar je buik roeien", "Gecontroleerd laten zakken"], tm: [1, 2] }),
  tbar: dmPair({ x: 68, y: 62, t: -24, foot: [80, 105], hand: [98, 92] }, { x: 68, y: 62, t: -24, foot: [80, 105], hand: [86, 72] },
    { eq: "none", front_: J => DG.line([150, 106], J.W1, 3.4) + DG.plate(dmAdd(J.W1, [8, 4]), 9), hl: ["t", "ua"], ph: ["Naar je borst roeien", "Laten zakken"], tm: [1, 2] }),
  cableRow: dmPair({ x: 60, y: 92, t: -72, foot: [104, 92], fd: -70, hand: [106, 74] }, { x: 60, y: 92, t: -94, foot: [104, 92], fd: -70, hand: [72, 76] },
    { eq: "handle", anchor: [128, 88], back: () => DG.tower(134) + DG.rect(40, 98, 30, 5) + DG.rect(106, 82, 6, 18), hl: ["t", "ua"], ph: ["Naar je buik trekken", "Armen gecontroleerd strekken"], tm: [1, 2] }),
  dbRow: dmPair({ x: 62, y: 68, t: -8, foot: [66, 105], tb: 90, sb: 180, hand: [94, 96], hand2: [98, 82] }, { x: 62, y: 68, t: -8, foot: [66, 105], tb: 90, sb: 180, hand: [80, 74], hand2: [98, 82] },
    { eq: "db1", back: () => DG.bench(46, 108, 82), hl: ["t", "ua"], ph: ["Elleboog naar je heup trekken", "Laten zakken"], tm: [1, 2] }),
  csRow: dmPair({ x: 70, y: 80, t: -38, foot: [56, 105], hand: [96, 98] }, { x: 70, y: 80, t: -38, foot: [56, 105], hand: [84, 76] },
    { eq: "db", back: J => DG.back(J, 4, -8) + `<line x1="74" y1="88" x2="74" y2="108" class="dm-frame"/>`, hl: ["t", "ua"], ph: ["Naar je ribben roeien", "Laten zakken"], tm: [1, 2] }),
  invRow: dmPair({ x: 75.5, y: 93, t: -12, foot: [30, 103], fd: -80, hand: [104, 54] }, { x: 71, y: 80, t: -29, foot: [30, 103], fd: -80, hand: [104, 54], eb: -1 },
    { back: () => DG.bar(104, 54), hl: ["t", "ua"], ph: ["Borst naar de stang trekken", "Laten zakken"], tm: [1, 2] }),
  curl: dmPair(Object.assign({}, DS, { ua: 92, fa: 86 }), Object.assign({}, DS, { ua: 96, fa: -58 }),
    { eq: "bb", hl: ["ua"], ph: ["Omhoog krullen", "Langzaam laten zakken"], tm: [1, 2] }),
  curlDb: null, curlCable: null,
  preacher: dmPair({ x: 72, y: 84, t: -78, foot: [98, 105], ua: 50, fa: 48 }, { x: 72, y: 84, t: -78, foot: [98, 105], ua: 50, fa: -74 },
    { eq: "bb", back: J => DG.line(dmAdd(J.S1, [2, 7]), dmAdd(J.E1, [3, 8]), 6) + dmSeatGear(J), hl: ["ua"], ph: ["Omhoog krullen", "Laten zakken tot bijna gestrekt"], tm: [1, 2] }),
  inclineCurl: dmPair({ x: 88, y: 80, t: -122, foot: [110, 105], ua: 98, fa: 96 }, { x: 88, y: 80, t: -122, foot: [110, 105], ua: 98, fa: -22 },
    { eq: "db", back: J => DG.back(J, 8, 7.5) + `<line x1="86" y1="88" x2="86" y2="108" class="dm-frame"/>`, hl: ["ua"], ph: ["Omhoog krullen", "Volledig laten zakken"], tm: [1, 2] }),
  concCurl: dmPair({ x: 66, y: 88, t: -48, foot: [96, 105], ua: 84, fa: 86 }, { x: 66, y: 88, t: -48, foot: [96, 105], ua: 84, fa: -60 },
    { eq: "db", back: J => dmSeatGear(J), hl: ["ua"], ph: ["Omhoog krullen", "Laten zakken"], tm: [1, 2] }),
  spiderCurl: dmPair({ x: 66, y: 76, t: -32, foot: [54, 105], ua: 92, fa: 90 }, { x: 66, y: 76, t: -32, foot: [54, 105], ua: 92, fa: -40 },
    { eq: "bb", back: J => DG.back(J, 4, -8), hl: ["ua"], ph: ["Omhoog krullen", "Laten zakken"], tm: [1, 2] }),
  bayesian: dmPair(Object.assign({}, DS, { x: 82, foot: [86, 105], ua: 116, fa: 112 }), Object.assign({}, DS, { x: 82, foot: [86, 105], ua: 116, fa: -18 }),
    { eq: "handle", anchor: [24, 98], back: () => DG.tower(18), hl: ["ua"], ph: ["Omhoog krullen, elleboog achter je", "Laten zakken"], tm: [1, 2] }),
  squat: dmPair(Object.assign({}, DS, { hr: [-5, -5], eb: -1 }), { x: 65, y: 78, t: -55, foot: [80, 105], hr: [-5, -5], eb: -1 },
    { eq: "bb", hl: ["th"], ph: ["Zakken: heupen naar achter", "Omhoog duwen"], tm: [2, 1] }),
  frontSquat: dmPair(Object.assign({}, DS, { hr: [10, -1] }), { x: 68, y: 80, t: -68, foot: [80, 105], hr: [10, -1] },
    { eq: "bb", hl: ["th"], ph: ["Rechtop zakken", "Omhoog duwen"], tm: [2, 1] }),
  goblet: dmPair(Object.assign({}, DS, { hr: [9, 9] }), { x: 67, y: 80, t: -64, foot: [80, 105], hr: [9, 9] },
    { eq: "db1", hl: ["th"], ph: ["Diep zakken, borst omhoog", "Omhoog duwen"], tm: [2, 1] }),
  bwSquat: dmPair(Object.assign({}, DS, { ua: 0, fa: 0 }), { x: 65, y: 78, t: -58, foot: [80, 105], ua: -4, fa: -4 },
    { hl: ["th"], ph: ["Zakken: heupen naar achter", "Omhoog duwen"], tm: [2, 1] }),
  hack: dmPair(Object.assign({}, DS, { t: -100, x: 78, hr: [4, -4], eb: -1 }), { x: 62, y: 80, t: -64, foot: [80, 105], hr: [4, -4], eb: -1 },
    { back: J => DG.back(J, 8, 7.5), hl: ["th"], ph: ["Zakken", "Omhoog duwen"], tm: [2, 1] }),
  wallSit: dmPair({ x: 62, y: 84, t: -90, foot: [86, 105], ua: 90, fa: 90 }, { x: 62, y: 84, t: -90, foot: [86, 105], ua: 90, fa: 90, cv: 1 },
    { back: () => DG.wall(48), hl: ["th"], ph: ["Vasthouden met rug tegen de muur", "Rustig ademen"], tm: [2.5, 2.5] }),
  deadlift: dmPair({ x: 64, y: 76, t: -28, foot: [80, 105], hand: [86, 96] }, Object.assign({}, DS, { hand: [83, 64] }),
    { eq: "bb", plateR: 11, hl: ["th", "t"], ph: ["Opstaan: duw de vloer weg", "Gecontroleerd laten zakken"], tm: [1.2, 2] }),
  rdl: dmPair(Object.assign({}, DS, { hand: [83, 64] }), { x: 68, y: 60, t: -14, foot: [80, 105], hand: [99, 88] },
    { eq: "bb", hl: ["th", "t"], ph: ["Heupen naar achter, rug recht", "Heupen naar voor"], tm: [2, 1] }),
  pullThrough: dmPair({ x: 66, y: 62, t: -22, foot: [82, 105], hand: [70, 92] }, Object.assign({}, DS, { x: 80, foot: [84, 105], hand: [84, 70] }),
    { eq: "handle", anchor: [22, 100], back: () => DG.tower(16), hl: ["th"], ph: ["Heupen krachtig naar voor", "Heupen naar achter"], tm: [1, 2] }),
  hipThrust: dmPair({ x: 82, y: 96, t: -140, foot: [108, 105], hand: [82, 90] }, { x: 86, y: 74, t: 180, foot: [108, 105], hand: [86, 66] },
    { eq: "bb", back: () => DG.bench(30, 62, 74), hl: ["th"], ph: ["Heupen omhoog duwen", "Laten zakken"], tm: [1, 2] }),
  bridge: dmPair({ x: 84, y: 101, t: 180, foot: [108, 105], ua: 4, fa: 2 }, { x: 86, y: 84, t: 153, foot: [108, 105], ua: 26, fa: 4 },
    { mat: [20, 130], hl: ["th"], ph: ["Heupen omhoog", "Laten zakken"], tm: [1, 2] }),
  lunge: dmPair({ x: 77, y: 63, t: -90, foot: [100, 105], foot2: [52, 100], fd2: 30, hr: [1, 36] }, { x: 76, y: 80, t: -90, foot: [100, 105], foot2: [52, 100], fd2: 30, hr: [1, 36] },
    { eq: "db", hl: ["th"], ph: ["Achterste knie naar de vloer", "Omhoog duwen"], tm: [2, 1] }),
  bulgarian: dmPair({ x: 74, y: 62, t: -88, foot: [98, 105], foot2: [44, 80], fd2: 20, hr: [1, 36] }, { x: 74, y: 80, t: -84, foot: [98, 105], foot2: [44, 80], fd2: 20, hr: [1, 36] },
    { eq: "db", back: () => DG.bench(22, 52, 84), hl: ["th"], ph: ["Zakken op je voorste been", "Omhoog duwen"], tm: [2, 1] }),
  stepUp: dmPair({ x: 82, y: 64, t: -86, foot: [100, 80], foot2: [74, 105], hr: [1, 36] }, { x: 98, y: 36, t: -90, foot: [100, 80], foot2: [104, 80], hr: [1, 36] },
    { eq: "db", back: () => DG.rect(86, 84, 34, 24), hl: ["th"], ph: ["Opstappen via de hiel", "Gecontroleerd afstappen"], tm: [1, 2] }),
  legPress: dmPair({ x: 60, y: 84, t: -140, foot: [80, 64], kb: -1, ua: 70, fa: 10 }, { x: 60, y: 84, t: -140, foot: [94, 52], kb: -1, ua: 70, fa: 10 },
    { back: J => DG.back(J, 6, 7.5) + DG.rect(40, 92, 30, 5), front_: J => { const a = dmAdd(J.A1, dmDir(48), -2); return DG.line(dmAdd(a, dmDir(-42 + 90), 13), dmAdd(a, dmDir(-42 + 90), -13), 6); }, hl: ["th"], ph: ["Wegduwen", "Gecontroleerd terug"], tm: [1, 2] }),
  legExt: dmPair(Object.assign({}, DSEAT, { foot: undefined, th: 0, sh: 90, ua: 96, fa: 96 }), Object.assign({}, DSEAT, { foot: undefined, th: 0, sh: 4, ua: 96, fa: 96 }),
    { back: J => DG.back(J, 4, 7.5) + dmSeatGear(J), front_: J => DG.handle(dmAdd(J.A1, [0, -1])), hl: ["th"], ph: ["Benen strekken", "Laten zakken"], tm: [1, 2] }),
  legCurlSeat: dmPair(Object.assign({}, DSEAT, { foot: undefined, th: 0, sh: 6, ua: 96, fa: 96 }), Object.assign({}, DSEAT, { foot: undefined, th: 0, sh: 112, ua: 96, fa: 96 }),
    { back: J => DG.back(J, 4, 7.5) + dmSeatGear(J), front_: J => DG.handle(dmAdd(J.A1, [0, -4])), hl: ["sh"], ph: ["Hielen onder je trekken", "Gecontroleerd terug"], tm: [1, 2] }),
  legCurlLie: dmPair({ x: 66, y: 80, t: 4, th: 180, sh: 182, fd: 180, ua: 100, fa: 10 }, { x: 66, y: 80, t: 4, th: 180, sh: -82, fd: 180, ua: 100, fa: 10 },
    { back: () => DG.bench(30, 110, 86), front_: J => DG.handle(J.A1), hl: ["th"], ph: ["Hielen naar je billen", "Gecontroleerd terug"], tm: [1, 2] }),
  calf: dmPair(Object.assign({}, DS, { hr: [1, 36], foot: [80, 99], fd: 0 }), Object.assign({}, DS, { y: 52, hr: [1, 36], foot: [82, 93], fd: 40 }),
    { eq: "db", back: () => DG.rect(80, 101, 26, 7), hl: ["sh"], ph: ["Op je tenen omhoog", "Hielen diep laten zakken"], tm: [1, 2] }),
  calfSeat: dmPair(Object.assign({}, DSEAT, { foot: [98, 99], fd: 0, hand: [96, 80] }), Object.assign({}, DSEAT, { foot: [99, 93], fd: 40, hand: [97, 74] }),
    { back: J => dmSeatGear(J) + DG.rect(96, 101, 20, 7), front_: J => DG.rect(J.K1[0] - 10, J.K1[1] - 8, 20, 5), hl: ["sh"], ph: ["Hielen omhoog", "Laten zakken"], tm: [1, 2] }),
  abduct: dmPair({ x: 80, y: 84, t: -90, foot: [88, 104], ts: .55, hand: [92, 88] }, { x: 80, y: 84, t: -90, foot: [104, 104], ts: .55, hand: [92, 88] },
    { front: true, back: () => DG.rect(60, 88, 40, 5), hl: ["th"], ph: ["Knieën naar buiten duwen", "Gecontroleerd terug"], tm: [1, 2] }),
  adduct: dmPair({ x: 80, y: 84, t: -90, foot: [104, 104], ts: .55, hand: [92, 88] }, { x: 80, y: 84, t: -90, foot: [88, 104], ts: .55, hand: [92, 88] },
    { front: true, back: () => DG.rect(60, 88, 40, 5), hl: ["th"], ph: ["Knieën naar elkaar knijpen", "Gecontroleerd open"], tm: [1, 2] }),
  nordic: dmPair({ x: 58, y: 80, t: -86, th: 95, sh: 180, fd: 180, ua: 70, fa: -30 }, { x: 77, y: 92, t: -30, th: 150, sh: 180, fd: 180, ua: 40, fa: -10 },
    { mat: [20, 120], back: () => DG.rect(24, 98, 14, 8), hl: ["th"], ph: ["Langzaam voorover laten vallen", "Terug omhoog"], tm: [3, 1.2] }),
  backExt: dmPair({ x: 72, y: 68, t: 78, th: 135, sh: 135, fd: 45, hr: [4, 10] }, { x: 72, y: 68, t: -45, th: 135, sh: 135, fd: 45, hr: [4, 10] },
    { back: () => DG.line([60, 80], [80, 60], 6) + `<line x1="70" y1="72" x2="70" y2="108" class="dm-frame"/>` + DG.rect(30, 98, 12, 6), hl: ["t"], ph: ["Romp omhoog tot één lijn", "Gecontroleerd zakken"], tm: [1, 2] }),
  plank: dmPair({ x: 76, y: 95, t: -7, th: 172, sh: 172, fd: 50, hand: [126, 105] }, { x: 76, y: 94, t: -8, th: 171, sh: 171, fd: 50, hand: [126, 105] },
    { mat: [20, 134], hl: ["t"], ph: ["Vasthouden: lichaam in één lijn", "Rustig doorademen"], tm: [2.5, 2.5] }),
  sidePlank: dmPair({ x: 74, y: 90, t: -18, th: 162, sh: 162, fd: 60, hand: [124, 105], hand2: [110, 14] }, { x: 74, y: 88, t: -19, th: 161, sh: 161, fd: 60, hand: [124, 105], hand2: [110, 14] },
    { mat: [20, 134], hl: ["t"], ph: ["Heupen hoog houden", "Rustig doorademen"], tm: [2.5, 2.5] }),
  abWheel: dmPair({ x: 64, y: 78, t: -40, foot: [38, 104], fd: 180, hand: [90, 99] }, { x: 82, y: 92, t: -10, foot: [38, 104], fd: 180, hand: [130, 99] },
    { mat: [20, 140], front_: J => `<circle cx="${dmF(J.W1[0])}" cy="102" r="6.5" class="dm-plate"/><circle cx="${dmF(J.W1[0])}" cy="102" r="1.8" class="dm-hub"/>`, hl: ["t"], ph: ["Uitrollen met strakke buik", "Terug oprollen"], tm: [2, 1.2] }),
  crunch: dmPair({ x: 72, y: 102, t: 180, foot: [100, 105], hr: [-4, -13] }, { x: 72, y: 102, t: -150, foot: [100, 105], hr: [-4, -13] },
    { mat: [20, 130], hl: ["t"], ph: ["Schouders oprollen", "Rustig terug"], tm: [1, 1.5] }),
  revCrunch: dmPair({ x: 72, y: 101, t: 180, th: -80, sh: 4, ua: 2, fa: 0 }, { x: 74, y: 96, t: 172, th: -128, sh: -30, ua: 2, fa: 0 },
    { mat: [20, 130], hl: ["t"], ph: ["Knieën naar je borst, bekken oprollen", "Rustig terug"], tm: [1, 1.5] }),
  bicycle: dmPair({ x: 72, y: 101, t: -152, th: -50, sh: 10, tb: -14, sb: -12, hr: [-4, -13] }, { x: 72, y: 101, t: -152, th: -14, sh: -12, tb: -50, sb: 10, hr: [-4, -13] },
    { mat: [20, 130], hl: ["t"], ph: ["Elleboog naar de andere knie", "Wisselen"], tm: [1, 1] }),
  vup: dmPair({ x: 72, y: 101, t: 180, th: -4, sh: -2, ua: 180, fa: 180 }, { x: 72, y: 99, t: -132, th: -48, sh: -46, ua: -48, fa: -46 },
    { mat: [20, 140], hl: ["t"], ph: ["Romp en benen samen omhoog", "Gecontroleerd terug"], tm: [1, 1.6] }),
  legRaise: dmPair({ x: 74, y: 101, t: 180, th: -4, sh: -4, ua: 4, fa: 2 }, { x: 74, y: 101, t: 180, th: -88, sh: -88, ua: 4, fa: 2 },
    { mat: [20, 140], hl: ["t"], ph: ["Benen omhoog", "Langzaam laten zakken"], tm: [1, 2] }),
  flutter: dmPair({ x: 74, y: 101, t: 180, th: -12, sh: -12, tb: -26, sb: -26, ua: 4, fa: 2 }, { x: 74, y: 101, t: 180, th: -26, sh: -26, tb: -12, sb: -12, ua: 4, fa: 2 },
    { mat: [20, 140], hl: ["t"], ph: ["Kleine trappen op en neer", "Onderrug tegen de grond"], tm: [.5, .5] }),
  hollow: dmPair({ x: 74, y: 101, t: -166, th: -14, sh: -14, ua: -168, fa: -170 }, { x: 74, y: 101, t: -165, th: -16, sh: -16, ua: -167, fa: -169 },
    { mat: [20, 140], hl: ["t"], ph: ["Vasthouden, onderrug plat", "Rustig doorademen"], tm: [2.5, 2.5] }),
  deadBug: dmPair({ x: 74, y: 101, t: 180, th: -90, sh: 0, ua: -90, fa: -90 }, { x: 74, y: 101, t: 180, th: -90, sh: 0, tb: -8, sb: -6, ua: -172, fa: -174, ub: -90, fb: -90 },
    { mat: [20, 140], hl: ["t"], ph: ["Arm en tegenovergesteld been strekken", "Terug en wisselen"], tm: [1.5, 1.5] }),
  superman: dmPair({ x: 70, y: 101, t: 0, th: 180, sh: 180, fd: 180, ua: -2, fa: -2 }, { x: 70, y: 101, t: -12, th: 172, sh: 172, fd: 180, ua: -18, fa: -18 },
    { mat: [10, 150], hl: ["t"], ph: ["Armen en benen optillen", "Laten zakken"], tm: [1, 1.5] }),
  birdDog: dmPair({ x: 62, y: 80, t: -22, th: 90, sh: 180, fd: 180, ua: 90, fa: 90 }, { x: 62, y: 80, t: -22, th: 90, sh: 180, fd: 180, tb: 180, sb: 180, ua: -18, fa: -18, ub: 90, fb: 90 },
    { mat: [10, 140], hl: ["t"], ph: ["Arm en tegenovergesteld been strekken", "Terug en wisselen"], tm: [1.5, 1.5] }),
  shoulderTap: dmPair(Object.assign({}, DPRONE, { ua: 92, fa: 92 }), Object.assign({}, DPRONE, { ua: 150, fa: -40, ub: 92, fb: 92 }),
    { mat: [20, 132], hl: ["t"], ph: ["Tik je andere schouder aan", "Terug en wisselen"], tm: [.8, .8] }),
  climber: dmPair(Object.assign({}, DPRONE, { ua: 92, fa: 92, th: 156.4, sh: 156.4, tb: 66, sb: 160 }), Object.assign({}, DPRONE, { ua: 92, fa: 92, th: 66, sh: 160, tb: 156.4, sb: 156.4 }),
    { mat: [20, 132], hl: ["t"], ph: ["Knieën om beurten naar je borst", "Tempo hoog, heupen laag"], tm: [.45, .45] }),
  russian: dmPair({ x: 80, y: 96, t: -90, foot: [96, 104], ts: .5, hand: [100, 70], hand2: [92, 72] }, { x: 80, y: 96, t: -90, foot: [96, 104], ts: .5, hand: [68, 72], hand2: [60, 70] },
    { front: true, eq: "db1", hl: ["t"], ph: ["Draaien naar links en rechts", "Rug recht, buik aan"], tm: [1, 1] }),
  pallof: dmPair(Object.assign({}, DS, { foot: [84, 105], hr: [10, 10] }), Object.assign({}, DS, { foot: [84, 105], hr: [36, 4] }),
    { eq: "handle", anchor: [16, 36], back: () => DG.tower(10), hl: ["t"], ph: ["Armen recht vooruit duwen, niet meedraaien", "Terug naar je borst"], tm: [1.5, 1.5] }),
  farmer: dmPair({ x: 80, y: 59, t: -90, foot: [94, 105], foot2: [66, 105], hr: [1, 36] }, { x: 80, y: 58, t: -90, foot: [66, 105], foot2: [94, 105], hr: [1, 36] },
    { eq: "db", hl: ["fa"], ph: ["Rechtop stappen", "Zware gewichten, stevige grip"], tm: [.6, .6] }),
  hangLeg: dmPair({ x: 79, y: 52, t: -90, th: 92, sh: 92, hand: [82, -16] }, { x: 80, y: 50, t: -92, th: -4, sh: -4, hand: [82, -16] },
    { back: () => DG.bar(82, -16), hl: ["t"], ph: ["Benen omhoog", "Langzaam laten zakken"], tm: [1, 2] }),
  cableCrunch: dmPair({ x: 64, y: 80, t: -64, th: 90, sh: 180, fd: 180, hr: [-2, -11], eb: -1 }, { x: 64, y: 80, t: 8, th: 90, sh: 180, fd: 180, hr: [-2, -11], eb: -1 },
    { eq: "handle", anchor: [104, -14], back: () => DG.tower(112), hl: ["t"], ph: ["Ellebogen naar je knieën krullen", "Gecontroleerd terug"], tm: [1, 2] }),
  burpee: { k: [
      { x: 80, y: 56, t: -90, ua: -96, fa: -92, th: 90, sh: 92 },
      { x: 74, y: 88, t: -40, ua: 85, fa: 85, th: -15, sh: 105 },
      { x: 72.6, y: 82.4, t: -23.6, ua: 90, fa: 90, th: 156.4, sh: 156.4, fd: 50 },
      { x: 74, y: 88, t: -40, ua: 85, fa: 85, th: -15, sh: 105 }],
    loop: true, tm: [.5, .6, .6, .5], mat: [20, 132], hl: ["th", "t"], ph: ["Hurken", "Benen naar achter", "Terug in hurkzit", "Opspringen"] },
};
DEMOS.benchDb = Object.assign({}, DEMOS.bench, { eq: "db" });
DEMOS.curlDb = Object.assign({}, DEMOS.curl, { eq: "db" });
DEMOS.curlCable = Object.assign({}, DEMOS.curl, { eq: "handle", anchor: [94, 104] });
DEMOS.dbFly = Object.assign({}, DEMOS.fly, { eq: "db" });

// ---------- stretches and yoga: held poses that breathe ----------
const dmHold = (P, o, d = { t: 1.5 }) => {
  const B = Object.assign({}, P); Object.entries(d).forEach(([k, v]) => B[k] = (B[k] || 0) + v);
  return Object.assign({ k: [P, B], tm: [3, 3], ph: ["Vasthouden en rustig inademen", "Uitademen en iets dieper"] }, o);
};
Object.assign(DEMOS, {
  pecStretch: dmHold(Object.assign({}, DS, { x: 84, foot: [88, 105], ua: 182, fa: -88, t: -84 }), { back: () => `<rect x="54" y="-18" width="6" height="126" class="dm-wall"/>`, hl: ["t"] }, { t: 2 }),
  crossBody: dmHold({ x: 80, y: 59, t: -90, foot: [86, 105], ua: 178, fa: 180, hand2: [102, 30] }, { front: true, hl: ["ua"] }, { ua: -2 }),
  tricepsStretch: dmHold(Object.assign({}, DS, { ua: -108, fa: 112 }), { hl: ["ua"] }, { ua: -3 }),
  threadNeedle: dmHold({ x: 62, y: 80, t: 4, n: 30, th: 90, sh: 180, fd: 180, ua: 160, fa: 176, ub: 90, fb: 90 }, { mat: [10, 140], hl: ["t"] }),
  wristStretch: dmHold(Object.assign({}, DS, { ua: -2, fa: -2, hand2: [114, 26] }), { hl: ["fa"] }, { fa: -6 }),
  latStretch: dmHold({ x: 60, y: 80, t: 6, n: 20, th: 90, sh: 180, fd: 180, hand: [122, 70] }, { mat: [10, 110], back: () => DG.bench(112, 150, 72), hl: ["t"] }, { y: 2 }),
  bicepsStretch: dmHold(Object.assign({}, DS, { x: 86, foot: [90, 105], ua: 176, fa: 178 }), { back: () => DG.wall(42), hl: ["ua"] }, { t: 2 }),
  thoracic: dmPair({ x: 62, y: 80, t: -22, th: 90, sh: 180, fd: 180, ua: 92, fa: 140, ub: 90, fb: 90 }, { x: 62, y: 80, t: -22, th: 90, sh: 180, fd: 180, ua: -100, fa: -170, ub: 90, fb: 90 },
    { mat: [10, 140], hl: ["t"], ph: ["Elleboog naar het plafond draaien", "Terug onder je borst"], tm: [2, 2] }),
  catCow: dmPair({ x: 62, y: 80, t: -22, th: 90, sh: 180, fd: 180, ua: 90, fa: 90, cv: -7, n: 40 }, { x: 62, y: 80, t: -22, th: 90, sh: 180, fd: 180, ua: 90, fa: 90, cv: 6, n: -35 },
    { mat: [10, 140], hl: ["t"], ph: ["Rug bol, kin naar je borst", "Rug hol, blik vooruit"], tm: [2.5, 2.5] }),
  quadStretch: dmHold(Object.assign({}, DS, { th: 94, sh: -112, foot: undefined, foot2: [80, 105], hand: [72, 62], ub: 0, fb: 0 }), { hl: ["th"] }, { th: 2 }),
  couch: dmHold({ x: 70, y: 82, t: -86, foot: [102, 105], foot2: [54, 82], fd2: 180, hr: [4, 34] }, { back: () => DG.wall(44), mat: [40, 120], hl: ["th2"] }, { t: -2 }),
  hamStretch: dmHold({ x: 50, y: 100, t: -32, th: 0, sh: 0, fd: -90, hand: [92, 96] }, { mat: [20, 120], hl: ["th"] }, { t: 3 }),
  figure4: dmHold({ x: 84, y: 101, t: 192, foot: [99, 80], foot2: [112, 104], hand: [88, 92] }, { mat: [20, 130], hl: ["th2"] }, { t: 0, x: 1 }),
  butterfly: dmHold({ x: 80, y: 98, t: -90, th: 12, sh: 160, hand: [86, 104] }, { front: true, mat: [30, 130], hl: ["th"] }, { th: 3 }),
  calfStretch: dmHold({ x: 84, y: 64, t: -76, foot: [100, 105], foot2: [56, 105], hand: [124, 30] }, { back: () => DG.wall(126), hl: ["sh2"] }, { x: 1 }),
  deepSquat: dmHold({ x: 70, y: 94, t: -72, foot: [80, 105], hr: [14, 12] }, { mat: [40, 120], hl: ["th"] }, { y: 1 }),
  pigeon: dmHold({ x: 66, y: 96, t: -84, th: 14, sh: 170, fd: 170, tb: 178, sb: 178, hand: [77, 99] }, { mat: [10, 140], hl: ["th"] }, { t: 3 }),
  worldsGreatest: dmHold({ x: 74, y: 86, t: -36, foot: [104, 105], foot2: [44, 102], fd2: 20, hand: [102, 104], hand2: [70, 2] }, { mat: [30, 130], hl: ["th2"] }, { t: -2 }),
  hip9090: dmPair({ x: 80, y: 100, t: -90, foot: [112, 104], foot2: [60, 92], ts: .7, hand: [102, 100] }, { x: 80, y: 100, t: -90, foot: [100, 92], foot2: [48, 104], ts: .7, hand: [102, 100] },
    { front: true, mat: [30, 130], hl: ["th"], ph: ["Knieën naar de andere kant draaien", "En terug"], tm: [2, 2] }),
  legSwing: dmPair(Object.assign({}, DS, { foot: undefined, th: 38, sh: 46, foot2: [80, 105], hand2: [64, 50], ua: 160, fa: 140 }), Object.assign({}, DS, { foot: undefined, th: 132, sh: 124, foot2: [80, 105], hand2: [64, 50], ua: 20, fa: 30 }),
    { back: () => DG.wall(54), hl: ["th"], ph: ["Been naar voor zwaaien", "Been naar achter zwaaien"], tm: [.8, .8] }),
  armCircles: { k: [{ x: 80, y: 59, t: -90, foot: [84, 105], ua: -10, fa: -10 }, { x: 80, y: 59, t: -90, foot: [84, 105], ua: 4, fa: 4 }, { x: 80, y: 59, t: -90, foot: [84, 105], ua: 12, fa: 12 }, { x: 80, y: 59, t: -90, foot: [84, 105], ua: 2, fa: 2 }],
    loop: true, front: true, tm: [.4, .4, .4, .4], hl: ["ua"], ph: ["Kleine cirkels", "Kleine cirkels", "Kleine cirkels", "Kleine cirkels"] },
  wallSlide: dmPair({ x: 80, y: 59, t: -90, foot: [84, 105], ua: 14, fa: -88 }, { x: 80, y: 59, t: -90, foot: [84, 105], ua: -58, fa: -78 },
    { front: true, hl: ["ua"], ph: ["Armen omhoog schuiven tegen de muur", "Terug in een W"], tm: [2, 2] }),
  downDog: dmHold({ x: 66, y: 62, t: 40, n: 20, foot: [44, 104], fd: -10, hand: [116, 104] }, { mat: [20, 140], hl: ["th"] }, { y: -1.5 }),
  cobra: dmHold({ x: 64, y: 100, t: -30, n: -15, th: 180, sh: 180, fd: 180, hand: [96, 104] }, { mat: [10, 140], hl: ["t"] }, { t: -3 }),
  lowLunge: dmHold({ x: 72, y: 86, t: -92, foot: [102, 105], foot2: [50, 104], fd2: 180, ua: -94, fa: -92 }, { mat: [30, 130], hl: ["th2"] }, { t: -3 }),
  warrior1: dmHold({ x: 76, y: 74, t: -90, foot: [104, 105], foot2: [40, 105], fd2: -20, ua: -94, fa: -92 }, { hl: ["th"] }, { y: 1 }),
  warrior2: dmHold({ x: 80, y: 72, t: -90, foot: [122, 105], foot2: [34, 105], kb: -1, kb2: -1, ua: 0, fa: 0 }, { front: true, hl: ["th"] }, { y: 1 }),
  warrior3: dmHold({ x: 80, y: 59, t: 0, foot: [80, 105], tb: 180, sb: 180, ua: 0, fa: 0 }, { hl: ["th2", "t"] }, { t: -1.5 }),
  triangle: dmHold({ x: 80, y: 68, t: -24, foot: [112, 105], foot2: [48, 105], ua: 66, fa: 66, ub: -114, fb: -114 }, { front: true, hl: ["th"] }, { t: -2 }),
  chair: dmHold({ x: 68, y: 76, t: -62, foot: [80, 105], ua: -64, fa: -62 }, { hl: ["th"] }, { y: 1 }),
  tree: dmHold({ x: 80, y: 59, t: -90, th: 30, sh: 168, foot2: [78, 105], hand: [80, -10] }, { front: true, hl: ["th"] }, { y: -1 }),
  boat: dmHold({ x: 72, y: 100, t: -126, th: -46, sh: -46, ua: -6, fa: -6 }, { mat: [20, 140], hl: ["t"] }, { t: 2 }),
  crow: dmHold({ x: 76, y: 74, t: 30, n: -20, foot: [72, 88], fd: 100, hand: [106, 104] }, { mat: [30, 130], hl: ["ua", "t"] }, { y: 1 }),
  dolphin: dmHold({ x: 66, y: 62, t: 52, n: 20, foot: [44, 104], fd: -10, hand: [114, 104] }, { mat: [20, 140], hl: ["ua"] }, { y: -1.5 }),
  garland: dmHold({ x: 72, y: 94, t: -80, foot: [82, 105], hr: [14, 12] }, { mat: [40, 120], hl: ["th"] }, { y: 1 }),
  childPose: dmHold({ x: 60, y: 92, t: 14, n: 10, foot: [56, 104], fd: 180, hand: [126, 104] }, { mat: [20, 140], hl: ["t"] }, { y: 1.5 }),
  puppy: dmHold({ x: 62, y: 80, t: 26, n: 10, th: 90, sh: 180, fd: 180, hand: [128, 104] }, { mat: [20, 140], hl: ["t"] }, { t: 2 }),
  supineTwist: dmHold({ x: 84, y: 101, t: 180, th: -40, sh: 60, ua: -60, fa: -60 }, { mat: [20, 140], hl: ["t"] }, { th: 3 }),
  happyBaby: dmHold({ x: 84, y: 101, t: 180, th: -128, sh: -86, hand: [66, 62] }, { mat: [20, 140], hl: ["th"] }, { th: -3 }),
  legsUpWall: dmHold({ x: 100, y: 101, t: 180, th: -90, sh: -90, fd: 0, ua: 150, fa: 170 }, { mat: [20, 120], back: () => DG.wall(108), hl: ["th"] }, { th: 1 }),
  savasana: dmHold({ x: 84, y: 102, t: 180, th: 0, sh: 0, fd: -80, ua: 8, fa: 4 }, { mat: [20, 140], hl: [], ph: ["Volledig ontspannen", "Rustig ademen"] }, { y: -.6 }),
  sunSal: { k: [
      { x: 80, y: 59, t: -90, ua: -96, fa: -92, foot: [80, 105] },
      { x: 76, y: 60, t: 80, n: 0, ua: 90, fa: 90, foot: [80, 105] },
      { x: 72.6, y: 82.4, t: -23.6, ua: 90, fa: 90, th: 156.4, sh: 156.4, fd: 50 },
      { x: 66, y: 100, t: -30, n: -15, hand: [96, 104], th: 180, sh: 180, fd: 180 },
      { x: 66, y: 62, t: 40, n: 20, hand: [116, 104], th: 138, sh: 138, fd: -10 }],
    loop: true, tm: [2, 2, 2, 2, 2], mat: [20, 140], hl: ["t"], ph: ["Armen omhoog", "Voorover vouwen", "Plank", "Cobra", "Neerwaartse hond"] },
});

// ---------- cardio: cycles ----------
const dmRun = (o, a = 1) => ({ k: [
    { x: 80, y: 58, t: -82, th: 90 - 40 * a, sh: 100 + 10 * a, tb: 90 + 35 * a, sb: 90 + 85 * a, ua: 90 + 40 * a, fa: 60 * a, ub: 90 - 40 * a, fb: -20 * a, fd: 0 },
    { x: 80, y: 60, t: -82, th: 90 + 35 * a, sh: 90 + 85 * a, tb: 90 - 40 * a, sb: 100 + 10 * a, ua: 90 - 40 * a, fa: -20 * a, ub: 90 + 40 * a, fb: 60 * a, fd: 0 }],
  tm: [.38 / a, .38 / a], hl: ["th"], ph: ["Ritmisch lopen", "Ritmisch lopen"], ...o });
const dmCrank = (cx, cy, r, base, arms) => ({ fn: p => {
    const a = p * 360, f1 = [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)], f2 = [cx - r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)];
    const P = Object.assign({}, base, { foot: f1, foot2: f2, fd: 10, fd2: 10 });
    if (arms){ const s = Math.sin(a * Math.PI / 180) * arms; P.hand = [base.hand[0] + s, base.hand[1]]; P.hand2 = [base.hand[0] - s, base.hand[1]]; }
    return P;
  }, period: 1.1, ph: ["Rond trappen"], hl: ["th"] });
Object.assign(DEMOS, {
  run: dmRun({}),
  treadmill: dmRun({ back: () => `<rect x="28" y="104" width="104" height="6" rx="3" class="dm-pad"/><line x1="128" y1="104" x2="138" y2="34" class="dm-frame"/><line x1="138" y1="34" x2="118" y2="40" class="dm-frame"/>` }),
  inclineWalk: dmRun({ back: () => `<rect x="28" y="104" width="104" height="6" rx="3" class="dm-pad"/><line x1="128" y1="104" x2="138" y2="34" class="dm-frame"/>`, ph: ["Stevig stappen op helling", "Niet vasthouden"] }, .55),
  bike: Object.assign(dmCrank(84, 92, 9, { x: 70, y: 62, t: -50, hand: [108, 48], kb: -1 }), { back: () => `<line x1="70" y1="66" x2="84" y2="92" class="dm-frame"/><line x1="84" y1="92" x2="108" y2="52" class="dm-frame"/><circle cx="84" cy="92" r="9" class="dm-cable"/><line x1="62" y1="66" x2="76" y2="66" stroke-width="5" class="dm-padl"/><line x1="70" y1="108" x2="104" y2="108" class="dm-frame"/>` }),
  airbike: Object.assign(dmCrank(84, 92, 9, { x: 70, y: 62, t: -66, hand: [104, 40], kb: -1 }, 8), { back: () => `<circle cx="112" cy="84" r="20" class="dm-cable"/><line x1="70" y1="66" x2="84" y2="92" class="dm-frame"/><line x1="62" y1="66" x2="76" y2="66" stroke-width="5" class="dm-padl"/>` }),
  elliptical: Object.assign(dmCrank(80, 98, 7, { x: 78, y: 52, t: -88, hand: [98, 40], kb: -1 }, 8), { back: () => `<line x1="40" y1="106" x2="128" y2="106" class="dm-frame"/><line x1="112" y1="106" x2="104" y2="26" class="dm-frame"/>` }),
  stairs: dmPair({ x: 80, y: 50, t: -84, foot: [92, 80], foot2: [78, 98], fd: 0, ua: 110, fa: 70 }, { x: 82, y: 46, t: -84, foot: [94, 76], foot2: [82, 94], fd: 0, ua: 70, fa: 0 },
    { back: () => `<path d="M60 108V98H78V88H96V78H114V68H132V108Z" class="dm-pad"/>`, hl: ["th"], ph: ["Trede per trede", "Rechtop blijven"], tm: [.55, .55] }),
  rower: dmPair({ x: 82, y: 94, t: -58, foot: [114, 92], fd: -70, hand: [114, 80] }, { x: 62, y: 94, t: -108, foot: [114, 92], fd: -70, hand: [80, 72] },
    { eq: "handle", anchor: [124, 82], back: () => `<line x1="20" y1="102" x2="128" y2="102" class="dm-frame"/><circle cx="128" cy="86" r="11" class="dm-cable"/>`, front_: J => DG.rect(J.H[0] - 10, 98, 20, 4), hl: ["th", "t"], ph: ["Benen, romp, armen: krachtig trekken", "Armen, romp, benen: rustig terug"], tm: [.8, 1.6] }),
  skierg: dmPair(Object.assign({}, DS, { foot: [82, 105], hand: [100, -2] }), { x: 70, y: 66, t: -40, foot: [82, 105], hand: [92, 82] },
    { eq: "handle", anchor: [112, -14], back: () => DG.tower(118), hl: ["t", "ua"], ph: ["Krachtig naar beneden trekken", "Terug omhoog reiken"], tm: [.6, 1] }),
  rope: { fn: p => { const j = Math.abs(Math.sin(p * Math.PI)) * 5; return { x: 80, y: 57 - j, t: -90, foot: [80, 103 - j], fd: 20, hr: [8, 30], eb: 1 }; }, period: .7,
    rope: true, hl: ["sh"], ph: ["Kleine sprongetjes op je voorvoeten"] },
});

// Exercise name → pattern (explicit first, then key words, then the exercise type).
const DEMO_OF = {
  "Bench Press": "bench", "Close-Grip Bench Press": "bench", "Decline Bench Press": "decline", "Dumbbell Bench Press": "benchDb",
  "Incline Dumbbell Press": "incline", "Incline Barbell Bench Press": "incline", "Smith Machine Incline Press": "incline",
  "Machine Chest Press": "chestPress", "Pec Deck Fly": "fly", "Dumbbell Fly": "dbFly", "Low-to-High Cable Fly": "flyLow", "High-to-Low Cable Fly": "flyHigh",
  "Chest Dip": "chestDip", "Dips": "dips", "Bench Dip": "benchDip", "Push-up": "pushup", "Close-Grip Push-up": "pushup", "Pike Push-up": "pike",
  "Overhead Press": "ohp", "Seated Dumbbell Shoulder Press": "ohpSeat", "Arnold Press": "ohpSeat", "Machine Shoulder Press": "ohpSeat", "Landmine Press": "landmine",
  "Lateral Raise": "latRaise", "Dumbbell Lateral Raise": "latRaise", "Cable Lateral Raise": "latRaise", "Front Raise": "frontRaise",
  "Triceps Pushdown": "pushdown", "Rope Triceps Pushdown": "pushdown", "Overhead Triceps Extension": "ohExt", "One-Arm Dumbbell Overhead Extension": "ohExt",
  "Cable Overhead Triceps Extension": "ohExtCable", "Skull Crusher": "skull", "Cable Triceps Kickback": "kickback",
  "Pull-up (added weight)": "pullup", "Chin-up": "pullup", "Assisted Pull-up": "pullup", "Lat Pulldown": "pulldown", "Close-Grip Lat Pulldown": "pulldown",
  "Straight-Arm Pulldown": "saPulldown", "Dumbbell Pullover": "pullover", "Barbell Row": "row", "T-Bar Row": "tbar", "Seated Cable Row": "cableRow",
  "Single-Arm Cable Row": "cableRow", "Machine Row": "cableRow", "Chest-Supported Dumbbell Row": "csRow", "Single-Arm Dumbbell Row": "dbRow", "Inverted Row": "invRow",
  "Face Pull": "facePull", "Machine Reverse Fly": "revFly", "Reverse Cable Fly": "revFly", "Bent-Over Dumbbell Reverse Fly": "revFly",
  "Upright Row": "uprightRow", "Cable Upright Row": "uprightRow", "Dumbbell Shrug": "shrug", "Rack Pull": "rdl",
  "Barbell Curl": "curl", "EZ-Bar Curl": "curl", "Reverse Curl": "curl", "Wrist Curl": "curl", "Hammer Curl": "curlDb", "Cable Curl": "curlCable", "Rope Hammer Curl": "curlCable",
  "Preacher Curl": "preacher", "Incline Dumbbell Curl": "inclineCurl", "Concentration Curl": "concCurl", "Spider Curl": "spiderCurl", "Bayesian Cable Curl": "bayesian",
  "Deadlift": "deadlift", "Sumo Deadlift": "deadlift", "Romanian Deadlift": "rdl", "Back Squat": "squat", "Front Squat": "frontSquat", "Goblet Squat": "goblet",
  "Hack Squat": "hack", "Bodyweight Squat": "bwSquat", "Wall Sit": "wallSit", "Leg Press": "legPress", "Leg Curl": "legCurlSeat", "Lying Leg Curl": "legCurlLie",
  "Leg Extension": "legExt", "Walking Lunge": "lunge", "Bodyweight Lunge": "lunge", "Bulgarian Split Squat": "bulgarian", "Step-up": "stepUp",
  "Standing Calf Raise": "calf", "Seated Calf Raise": "calfSeat", "Hip Thrust": "hipThrust", "Glute Bridge": "bridge", "Cable Pull-Through": "pullThrough",
  "Hip Adduction Machine": "adduct", "Hip Abduction Machine": "abduct", "Nordic Hamstring Curl": "nordic", "Back Extension": "backExt",
  "Ab Wheel Rollout": "abWheel", "Plank": "plank", "Side Plank (left)": "sidePlank", "Side Plank (right)": "sidePlank", "Hanging Leg Raise": "hangLeg",
  "Cable Crunch": "cableCrunch", "Crunch": "crunch", "Russian Twist": "russian", "Dead Bug": "deadBug", "Mountain Climber": "climber", "Pallof Press": "pallof",
  "Hollow Hold": "hollow", "Bird Dog": "birdDog", "Farmer's Walk": "farmer", "Burpee": "burpee", "Superman": "superman",
  "Reverse Crunch": "revCrunch", "Bicycle Crunch": "bicycle", "V-up": "vup", "Plank Shoulder Tap": "shoulderTap", "Lying Leg Raise": "legRaise", "Flutter Kicks": "flutter",
  "Doorway Pec Stretch": "pecStretch", "Cross-Body Shoulder Stretch": "crossBody", "Overhead Triceps Stretch": "tricepsStretch", "Thread the Needle": "threadNeedle",
  "Wrist Flexor Stretch": "wristStretch", "Dead Hang": "hang", "Kneeling Lat Stretch": "latStretch", "Biceps Wall Stretch": "bicepsStretch",
  "Thoracic Rotation": "thoracic", "Cat-Cow": "catCow", "Standing Quad Stretch": "quadStretch", "Couch Stretch": "couch", "Hamstring Stretch": "hamStretch",
  "Figure-4 Stretch": "figure4", "Butterfly Stretch": "butterfly", "Calf Wall Stretch": "calfStretch", "Deep Squat Hold": "deepSquat", "Pigeon Stretch": "pigeon",
  "World's Greatest Stretch": "worldsGreatest", "90/90 Hip Switch": "hip9090", "Leg Swings": "legSwing", "Arm Circles": "armCircles", "Wall Slide": "wallSlide",
  "Sun Salutation A": "sunSal", "Downward Dog": "downDog", "Cobra Pose": "cobra", "Low Lunge": "lowLunge", "Warrior I": "warrior1", "Warrior II": "warrior2",
  "Warrior III": "warrior3", "Triangle Pose": "triangle", "Chair Pose": "chair", "Tree Pose": "tree", "Boat Pose": "boat", "Crow Pose": "crow", "Dolphin Pose": "dolphin",
  "Garland Pose": "garland", "Bridge Pose": "bridge", "Puppy Pose": "puppy", "Seated Forward Fold": "hamStretch", "Supine Twist": "supineTwist", "Happy Baby": "happyBaby",
  "Legs Up the Wall": "legsUpWall", "Child's Pose": "childPose", "Savasana": "savasana",
  "Loopband": "treadmill", "Hellingwandelen": "inclineWalk", "Lopen": "run", "Spinning": "bike", "Roeien": "rower", "Traploper": "stairs", "Crosstrainer": "elliptical", "Ligfiets": "bike", "Arc trainer": "elliptical", "VersaClimber": "stairs", "Stepper": "stairs", "Curved loopband": "treadmill", "Armergometer": "armCircles", "Battle ropes": "rope",
  "Air bike": "airbike", "SkiErg": "skierg", "Springtouw": "rope", "HIIT-intervallen": "treadmill", "Wandelen": "run", "Zwemmen": "superman", "Zwemintervallen": "superman", "Intervallopen": "run", "Fietsen": "bike",
  "Zumba": "armCircles", "Yoga": "downDog", "BBB": "bridge", "Pilates": "hollow", "Bootcamp": "burpee", "Step aerobics": "stepUp", "BodyPump": "squat", "CrossFit WOD": "burpee", "Hyrox training": "skierg",
  "Hyrox SkiErg (1000 m)": "skierg", "Hyrox sled push (50 m)": "lunge", "Hyrox sled pull (50 m)": "row", "Hyrox burpee broad jumps (80 m)": "burpee", "Hyrox row (1000 m)": "rower",
  "Hyrox farmers carry (200 m)": "farmer", "Hyrox sandbag lunges (100 m)": "lunge", "Hyrox wall balls (100×)": "frontSquat",
  "Jumping Jack": "rope", "High Knees": "run", "Squat Jump": "bwSquat", "Sumo Squat": "bwSquat", "Curtsy Lunge": "lunge", "Donkey Kick": "birdDog", "Fire Hydrant": "birdDog",
  "Side-Lying Leg Lift": "sidePlank", "The Hundred": "hollow", "Roll-up": "crunch", "Single Leg Stretch": "deadBug", "Pilates Swimming": "superman", "Pilates Teaser": "vup",
  "Basic Step": "stepUp", "Step Knee Lift": "stepUp", "Over the Top": "stepUp", "Bear Crawl": "climber", "Thruster": "frontSquat", "Kettlebell Swing": "pullThrough",
  "Box Jump": "stepUp", "Wall Ball": "frontSquat", "Power Clean": "deadlift", "Sled Push": "lunge", "Sled Pull": "row", "Burpee Broad Jump": "burpee", "Sandbag Lunge": "lunge",
};
for (let i = 1; i <= 8; i++) DEMO_OF[HYROX_RUN(i)] = "run";
KINE_EX.forEach(([n, , , , , demo]) => { DEMO_OF[n] = demo; });
HOME_EX.forEach(([n, , , , , demo]) => { DEMO_OF[n] = demo; });
OUT_EX.forEach(([n, , , , , demo]) => { DEMO_OF[n] = demo; });
MIND_EX.forEach(([n, , , demo]) => { if (demo) DEMO_OF[n] = demo; });
Object.assign(DEMO_OF, DEMO_LATE);
const DEMO_WORDS = [[/pull-?up|chin-?up/i, "pullup"], [/pulldown/i, "pulldown"], [/incline.*(press|bench)/i, "incline"], [/bench|chest press/i, "bench"],
  [/push-?up/i, "pushup"], [/fly|flye/i, "fly"], [/dip/i, "dips"], [/shoulder press|overhead press|military/i, "ohp"], [/lateral/i, "latRaise"],
  [/pushdown/i, "pushdown"], [/extension.*tri|tri.*extension|skull/i, "ohExt"], [/curl/i, "curl"], [/row/i, "row"], [/squat/i, "squat"],
  [/deadlift|rdl/i, "deadlift"], [/lunge|split/i, "lunge"], [/calf/i, "calf"], [/hip thrust|bridge/i, "hipThrust"], [/leg press/i, "legPress"],
  [/plank/i, "plank"], [/crunch|sit-?up/i, "crunch"], [/raise/i, "frontRaise"], [/press/i, "ohp"], [/stretch/i, "hamStretch"]];
const DEMO_TYPE = { push: "pushup", pull: "row", legs: "bwSquat", core: "plank", mobility: "catCow", yoga: "downDog", cardio: "run", kine: "catCow", mind: "butterfly" };
function demoKey(name, type){
  if (DEMO_OF[name]) return DEMO_OF[name];
  const w = DEMO_WORDS.find(([re]) => re.test(name));
  return w ? w[1] : DEMO_TYPE[type] || null;
}

// ---------- runtime ----------
function demoPose(pat, sec){
  if (pat.fn){ const p = (sec / pat.period) % 1; return { P: pat.fn(p), ph: 0 }; }
  const n = pat.k.length, segs = pat.loop ? n : 2, tm = pat.tm, hold = .3;
  const total = tm.slice(0, segs).reduce((a, b) => a + b + hold, 0);
  let x = sec % total, i = 0;
  while (x > tm[i] + hold){ x -= tm[i] + hold; i++; }
  const from = pat.loop ? pat.k[i] : pat.k[i === 0 ? 0 : 1], to = pat.loop ? pat.k[(i + 1) % n] : pat.k[i === 0 ? 1 : 0];
  const u = Math.min(1, x / tm[i]), e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
  return { P: dmLerp(from, to, e), ph: i };
}
function demoSvg(pat, P, path = "", over = ""){
  const J = dmSolve(P, !!pat.front);
  let back = path + (pat.mat ? DG.mat(pat.mat[0], pat.mat[1]) : "") + (pat.back ? pat.back(J) : "");
  if (pat.anchor){ back += DG.cable(J.W1, pat.anchor); }
  if (pat.cables){ back += DG.cable(J.W1, pat.cables[1]) + DG.cable(J.W2, pat.cables[0]); }
  let front = "";
  const eq = pat.eq;
  if (eq === "bb") front += DG.plate(J.W1, pat.plateR || 10);
  else if (eq === "db") front += J.front ? DG.db(J.W1) + DG.db(J.W2) : DG.db(J.W1);
  else if (eq === "db1") front += DG.db(J.W1);
  else if (eq === "handle") front += J.front ? DG.handle(J.W1) + DG.handle(J.W2) : DG.handle(J.W1);
  if (pat.front_) front += pat.front_(J);
  if (pat.rope){
    const p = (performance.now() / 1000 / pat.period) % 1, a = p * 360, c = dmAdd([J.H[0] - 2, J.H[1] - 14], dmDir(a - 90), 66);
    back += `<path d="M${dmF(J.W1[0])} ${dmF(J.W1[1])}Q${dmF(c[0])} ${dmF(c[1])} ${dmF(J.W1[0] - 1)} ${dmF(J.W1[1])}" class="dm-cable dm-rope"/>`;
  }
  front += over;
  const k = dmBody.k;
  return dmScene(J) + `<g transform="translate(80 108.5) scale(${dmF(k * 100) / 100}) translate(-80 -108.5)">${dmFigure(J, pat.hl || [], back, front)}</g>`;
}
const demoLive = new Set(), demoAll = new Set();
// Frame the view to the movement (the top follows the highest point of figure and gear) and trace the path of
// the bar or of the body part that moves most, so the range of motion stays visible.
function demoFit(d){
  const pat = d.pat, n = pat.fn ? 8 : pat.k.length, front = !!pat.front;
  let top = 108;
  for (let i = 0; i < n; i++){
    const P = pat.fn ? pat.fn(i / n) : pat.k[i], J = dmSolve(P, front);
    top = Math.min(top, J.head[1] - 9, J.W1[1] - 12, J.W2[1] - 12);
    (demoSvg(pat, P).match(/\b(?:y1|y2|y|cy)="-?[\d.]+"/g) || []).forEach(m => { top = Math.min(top, parseFloat(m.split('"')[1]) - 4); });
  }
  const y0 = Math.max(-44, Math.min(18, Math.floor(108.5 - (108.5 - top) * dmBody.k - 3)));
  d.svg.setAttribute("viewBox", `0 ${y0} 160 ${118 - y0}`);
  d.path = ""; d.track = null;
  if (pat.fn || pat.loop || pat.k.length !== 2) return;
  const pts = []; for (let i = 0; i <= 12; i++) pts.push(dmSolve(dmLerp(pat.k[0], pat.k[1], i / 12), front));
  let best = null, far = 8;
  // with a weight follow the hand; without, the body part that moves most (hands count a bit less, so a lean
  // shows the shoulders rather than the swinging arms)
  (pat.eq && pat.eq !== "none" ? ["W1"] : ["W1", "S", "H", "K1", "A1"]).forEach(key => {
    const a = pts[0][key], b = pts[12][key], dd = Math.hypot(a[0] - b[0], a[1] - b[1]) * (key === "W1" && !(pat.eq && pat.eq !== "none") ? .7 : 1);
    if (dd > far){ far = dd; best = key; }
  });
  if (!best) return;
  d.path = `<polyline points="${pts.map(J => dmF(J[best][0]) + "," + dmF(J[best][1])).join(" ")}" class="dm-path"/>`;
  // The arrow runs beside the path. Try a few spots (along the path, either side, a few distances) and keep the one
  // that stays clear of body and weight during the whole movement (a few units is enough, closer to the path is
  // better), inside the view and above the floor.
  const t = d.track = pts.map(J => J[best]), L = Math.hypot(t[12][0] - t[0][0], t[12][1] - t[0][1]) || 1, k = dmBody.k;
  const v = [(t[12][0] - t[0][0]) / L, (t[12][1] - t[0][1]) / L], q = [-v[1], v[0]], len = Math.min(18, L * .7), body = [];
  const wr = pat.eq === "bb" ? (pat.plateR || 10) + 1 : pat.eq && pat.eq !== "none" ? 6 : 3;
  pts.forEach(J => {
    [["H", "S", 6], ["S", "head", 0], ["S1", "E1", 4], ["E1", "W1", 3], ["S2", "E2", 4], ["E2", "W2", 3], ["H1", "K1", 5], ["K1", "A1", 3.5], ["H2", "K2", 5], ["K2", "A2", 3.5]]
      .forEach(([a, b, r]) => { for (let i = 0; i <= 4; i++) body.push([dmMix(J[a], J[b], i / 4), r]); });
    body.push([J.head, 8.5], [J.W1, wr], [J.W2, wr]);
  });
  const clear = p => Math.min(...body.map(([b, r]) => Math.hypot(p[0] - b[0], p[1] - b[1]) - r));
  const inView = p => { const x = 80 + (p[0] - 80) * k, y = 108.5 - (108.5 - p[1]) * k; return x > 3 && x < 157 && y > y0 + 3 && y < 102; };
  let score = -1e9;
  const shift = len / 2 + 8;
  [6, 3, 9].forEach(at => [1, -1].forEach(sg => [4, 9, 14, 20].forEach(off => [0, shift, -shift, shift * 1.7, -shift * 1.7].forEach(al => {
    const c = dmAdd(dmAdd(t[at], q, sg * off), v, al), ps = [c, dmAdd(c, v, len / 2), dmAdd(c, v, -len / 2)];
    const sc = Math.min(4, ...ps.map(clear)) - off * .12 - Math.abs(at - 6) * .15 - (al ? 1.5 : 0) - (ps.every(inView) ? 0 : 50);
    if (sc > score){ score = sc; d.at = at; d.side = [q[0] * sg, q[1] * sg]; d.off = off; d.al = al; }
  }))));
}
// An arrow beside the traced path that shows where the movement goes now (phase 0: to the end pose, phase 1: back).
function demoArrow(d, ph){
  if (!d.track) return "";
  const t = d.track, a = t[ph === 1 ? 12 : 0], b = t[ph === 1 ? 0 : 12], L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, v = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-v[1], v[0]];
  const len = Math.min(18, L * .7), c = dmAdd(dmAdd(t[d.at], d.side, d.off), [t[12][0] - t[0][0], t[12][1] - t[0][1]], d.al / (Math.hypot(t[12][0] - t[0][0], t[12][1] - t[0][1]) || 1)), p0 = dmAdd(c, v, -len / 2), p1 = dmAdd(c, v, len / 2), base = dmAdd(p1, v, -4.6);
  return `<path d="M${dmPt(p0)}L${dmPt(base)}" class="dm-arrowl"/><path d="M${dmPt(p1)}L${dmPt(dmAdd(base, n, 3.2))}L${dmPt(dmAdd(base, n, -3.2))}Z" class="dm-arrow"/>`;
}
// Redraw every demo on screen (also paused ones) after the profile changed.
function demoRefit(){
  dmBodyFit();
  demoAll.forEach(d => { if (!d.el.isConnected) demoAll.delete(d); else if (d.P){ demoFit(d); d.g.innerHTML = demoSvg(d.pat, d.P, d.path, demoArrow(d, Math.max(0, d.ph))); } });
}
let demoRaf = 0;
const demoReduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
function demoTick(now){
  demoRaf = 0;
  demoLive.forEach(d => {
    if (!d.el.isConnected || (d.details && !d.details.open) || d.el.closest("[hidden]")){ demoLive.delete(d); return; }
    if (d.paused) return;
    const sec = (now - d.t0) / 1000, { P, ph } = demoPose(d.pat, sec);
    d.P = P; d.g.innerHTML = demoSvg(d.pat, P, d.path, demoArrow(d, ph));
    if (ph !== d.ph){ d.ph = ph; d.label.textContent = demoLabel(d.pat, ph); }
  });
  if (demoLive.size) demoRaf = requestAnimationFrame(demoTick);
}
function demoLabel(pat, i){
  const t = pat.tm && !pat.loop && pat.ph[1] !== pat.ph[0] && !/adem/i.test(pat.ph[1]) ? ` · ${String(pat.tm[i]).replace(".", ",")} s` : "";
  return (pat.ph[i] || pat.ph[0]) + t;
}
// Build the demo inside a card; it plays while its <details> is open.
// Breathing pacer: a circle that grows while you breathe in, waits while you hold and shrinks while you breathe out.
function mountBreath(box, phases){
  const total = phases.reduce((a, p) => a + p[1], 0);
  box.hidden = false;
  box.innerHTML = `<div class="breath" role="img" aria-label="Ademhalingsbegeleider"><div class="breath-ring"><div class="breath-dot"></div></div>
    <b class="breath-ph" aria-live="off"></b><small class="breath-n"></small></div>
    <div class="demo-cap"><span></span><button type="button" class="demo-play" aria-label="Pauzeren">❚❚</button></div>`;
  const dot = box.querySelector(".breath-dot"), ph = box.querySelector(".breath-ph"), n = box.querySelector(".breath-n"), btn = box.querySelector(".demo-play");
  const details = box.closest("details");
  let t0 = performance.now(), paused = false, pausedAt = 0, last = -1, raf = 0;
  const show = t => {
    let x = t % total, i = 0, from = phases[phases.length - 1][2];
    while (x >= phases[i][1]){ x -= phases[i][1]; from = phases[i][2]; i++; }
    const [label, sec, to] = phases[i], u = x / sec, e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
    dot.style.transform = `scale(${.35 + .65 * (from + (to - from) * e)})`;
    if (i !== last){ ph.textContent = label; last = i; }
    n.textContent = String(Math.ceil(sec - x));
  };
  const tick = now => {
    if (!box.isConnected || (details && !details.open) || paused){ raf = 0; return; }
    show((now - t0) / 1000); raf = requestAnimationFrame(tick);
  };
  const start = () => { if (demoReduced() || paused || raf) return; raf = requestAnimationFrame(tick); };
  show(0);
  if (demoReduced()){ btn.hidden = true; ph.textContent = phases.map(p => `${p[0]} ${fmt(p[1])}`).join(" · "); n.textContent = ""; return; }
  btn.onclick = () => {
    paused = !paused; btn.textContent = paused ? "▶" : "❚❚"; btn.setAttribute("aria-label", paused ? "Afspelen" : "Pauzeren");
    if (paused) pausedAt = performance.now(); else { t0 += performance.now() - pausedAt; start(); }
  };
  if (details){ details.addEventListener("toggle", () => { if (details.open) start(); }); if (details.open) start(); }
  else start();
}
function mountDemo(box, name, type){
  if (BREATH[name]) return mountBreath(box, BREATH[name]);
  const key = demoKey(name, type), pat = key && DEMOS[key];
  if (!pat){ box.hidden = true; return; }
  dmBodyFit();
  demoAll.forEach(d => { if (!d.el.isConnected || d.el === box) demoAll.delete(d); });
  box.innerHTML = `<svg viewBox="0 -36 160 154" role="img" aria-label="Animatie: ${esc(name)}"><g></g></svg>
    <div class="demo-cap"><span class="demo-ph" aria-live="off"></span><button type="button" class="demo-play" aria-label="Pauzeren">❚❚</button></div>`;
  const d = { el: box, pat, svg: box.querySelector("svg"), g: box.querySelector("g"), label: box.querySelector(".demo-ph"), details: box.closest("details"), t0: performance.now(), ph: -1, paused: false };
  demoFit(d);
  const still = () => { const { P } = demoPose(pat, pat.fn ? .25 * pat.period : (pat.tm[0] + .3)); d.P = P; d.g.innerHTML = demoSvg(pat, P, d.path, demoArrow(d, 0)); d.label.textContent = demoLabel(pat, 0); };
  still();
  demoAll.add(d);
  const btn = box.querySelector(".demo-play");
  const start = () => { if (demoReduced() || d.paused) return; d.t0 = performance.now(); demoLive.add(d); if (!demoRaf) demoRaf = requestAnimationFrame(demoTick); };
  btn.onclick = () => { d.paused = !d.paused; btn.textContent = d.paused ? "▶" : "❚❚"; btn.setAttribute("aria-label", d.paused ? "Afspelen" : "Pauzeren"); if (!d.paused){ d.t0 = performance.now(); start(); } };
  if (demoReduced()){ btn.hidden = true; }
  if (d.details){ d.details.addEventListener("toggle", () => { if (d.details.open) start(); }); if (d.details.open) start(); }
  else start();
}


// ---------- Daily tip on Today ----------
const DAILY_TIP_CATS = ["train", "food", "rest", "train", "train", "train", "train", "mind", "rest", "food", "food", "train", "train", "train", "train", "train", "move", "train", "food", "train", "mind", "train", "train", "move"];
const DAILY_TIPS = [
  "Progressie is de motor van spiergroei: elke week een beetje meer gewicht of één rep extra is genoeg.",
  "Eet verspreid over de dag ongeveer 1,6 gram eiwit per kilo lichaamsgewicht voor optimale spieropbouw.",
  "Slaap van 7 à 9 uur helpt je herstel meer dan eender welk supplement.",
  "10 tot 20 sets per spiergroep per week is voor de meeste mensen een goede hoeveelheid.",
  "Laat 1 à 2 reps over aan het einde van een set. Zo train je zwaar genoeg zonder je techniek te verliezen.",
  "Rust 2–3 minuten bij zware basisoefeningen; bij isolatieoefeningen volstaat vaak 60–90 seconden.",
  "Een warming-up van 5 minuten en 1–2 lichte sets van je eerste oefening verminderen de kans op blessures.",
  "Stilstand? Kijk eerst naar slaap, eten en stress voor je je schema verandert.",
  "Elke 6 à 8 weken een lichtere week (deload) helpt je lichaam inhalen en daarna sterker verder te gaan.",
  "Creatine monohydraat (3–5 g per dag) is het best onderzochte supplement voor kracht.",
  "Drink genoeg: je urine moet licht van kleur zijn. Een fles water bij je training helpt.",
  "Volle bewegingsuitslag geeft meestal meer spiergroei dan halve herhalingen.",
  "Cardio en krachttraining gaan prima samen. Doe cardio liefst na je krachttraining of op een andere dag.",
  "Spierpijn is geen maat voor een goede training. Vooruitgang in je logboek wel.",
  "Train elke spiergroep minstens 2 keer per week voor de beste resultaten.",
  "Langzaam laten zakken (2–3 tellen) maakt een oefening zwaarder zonder extra gewicht.",
  "Wandel elke dag 7000 à 10.000 stappen. Dat helpt je herstel en je conditie.",
  "Twijfel je over techniek? Film jezelf van opzij en vergelijk met een voorbeeldvideo.",
  "Na je training een maaltijd met eiwit en koolhydraten helpt je herstellen, maar het moment is minder belangrijk dan het totaal per dag.",
  "Pijn in een gewricht is een signaal: ga lichter, verander de oefening of sla ze over.",
  "Consistentie wint: 3 trainingen per week, maandenlang, doet meer dan 6 trainingen één maand.",
  "Een goede grip helpt bij trekoefeningen: knijp de stang stevig vast.",
  "Ademen: adem in voor je zakt, span je buik aan en adem uit na het zwaarste stuk.",
  "Mobiliteit op rustdagen houdt je heupen en schouders soepel voor zware oefeningen."
];
// A new tip every day: the whole pool in a shuffled order that only repeats once you have seen everything,
// and on some days a tip about your own progress.
const EXTRA_TIPS = [
  ["mind", "Je hoeft niet gemotiveerd te zijn om te beginnen. Begin, en de motivatie volgt vanzelf."],
  ["mind", "Een slechte training is nog altijd beter dan de training die je niet deed."],
  ["mind", "Vergelijk jezelf met wie je gisteren was, niet met iemand anders op Instagram."],
  ["mind", "Kleine stappen tellen: 1 kilo of 1 rep meer is een record. Vier het!"],
  ["mind", "Discipline is kiezen tussen wat je nu wil en wat je het meest wil."],
  ["mind", "Geen zin vandaag? Spreek af met jezelf: 10 minuten. Daarna mag je stoppen (spoiler: dat doe je meestal niet)."],
  ["mind", "Leg je sportkleren de avond ervoor klaar. Je toekomstige zelf zal je dankbaar zijn."],
  ["mind", "Niemand in de gym kijkt naar jou. Ze zijn allemaal bezig met hun eigen set."],
  ["mind", "Motivatie komt en gaat. Gewoontes blijven. Bouw er vandaag één."],
  ["mind", "Over een jaar wens je dat je vandaag begonnen was. Goed nieuws: dat kan nog."],
  ["mind", "Trots zijn mag. Kijk eens in je logboek hoe ver je al gekomen bent."],
  ["mind", "Je lichaam hoort wat je denkt. Zeg vandaag eens: \"Ik ben sterk.\""],
  ["mind", "Zet een klein doel voor deze week. Haalbaar is beter dan heldhaftig."],
  ["mind", "Train met muziek die je blij maakt. Een goede playlist is gratis pre-workout."],
  ["mind", "Zoek een trainingsmaatje. Afspraken met een ander sla je minder snel over."],
  ["mind", "Perfectie bestaat niet in de gym. Volhouden wel."],
  ["mind", "Een gemiste training is geen ramp. Twee op rij is het begin van een nieuwe gewoonte, dus pak de volgende."],
  ["train", "Schrijf je sets op: wat je meet, kan je verbeteren. Goed bezig dat je deze app gebruikt!"],
  ["train", "Begin je training met de zwaarste oefening, als je nog fris bent."],
  ["train", "Kies één oefening om deze maand echt goed te leren. Techniek is je beste investering."],
  ["train", "Train je benen. Je toekomstige trappen-oplopende zelf zal je eeuwig dankbaar zijn."],
  ["train", "Ga niet tot falen bij zware basisoefeningen. Stop een rep vroeger en kom volgende week sterker terug."],
  ["train", "Variatie is leuk, maar spieren groeien van herhaling. Houd je oefeningen een paar weken hetzelfde."],
  ["train", "Knieën die over je tenen gaan bij een squat zijn normaal. Heel je voet blijft op de grond, dat telt."],
  ["train", "Pauzeer je telefoon tussen de sets en kijk naar je rusttimer. Zo blijft je training scherp."],
  ["train", "Trek met je ellebogen, niet met je handen. Je rug doet dan het werk bij roeien en pulldowns."],
  ["train", "Leg na een zware week niet meteen gewicht bij. Dezelfde gewichten met betere techniek is ook vooruitgang."],
  ["train", "Elke sterke atleet was ooit een beginner die bleef komen."],
  ["train", "Probeer vandaag de shuffleknop: een andere volgorde voelt als een nieuwe training."],
  ["train", "Superset: wissel twee oefeningen voor verschillende spieren af en win tijd zonder kwaliteit te verliezen."],
  ["train", "Je grip geeft het als eerste op? Hang na je training 30 seconden aan een stang."],
  ["train", "Rug pijn bij deadlifts? Vaak helpt het om de halter dichter bij je benen te houden."],
  ["food", "Eiwit bij elke maaltijd is het makkelijkste voedingstrucje voor spieren: denk aan yoghurt, eieren, kip of bonen."],
  ["food", "Vul de helft van je bord met groenten. Meer vitamines, meer vezels, minder honger."],
  ["food", "Dorst lijkt soms op honger. Drink eerst een groot glas water en kijk dan opnieuw."],
  ["food", "Banaan of boterham een uurtje voor je training? Perfecte brandstof."],
  ["food", "Je hoeft niets te schrappen. Kies 80% voedzaam en geniet van de rest."],
  ["food", "Koffie voor de training kan je prestaties verbeteren. Maar niet te laat op de dag, voor je nachtrust."],
  ["food", "Plan je eten zoals je trainingen. Een gezonde lunch meenemen is het halve werk."],
  ["food", "Snack slim: een handje noten, kwark of fruit houdt je energie stabiel."],
  ["food", "Je hoeft geen dure shakes te kopen. Een glas melk of sojamelk na je training werkt ook prima."],
  ["food", "Eet bewust trager. Je verzadigingsgevoel heeft ongeveer 20 minuten nodig om je hersenen te bereiken."],
  ["food", "Kleurrijk eten = gezond eten. Probeer vandaag drie kleuren op je bord."],
  ["rest", "Spieren groeien niet in de gym, maar in bed. Ga vanavond een halfuur vroeger slapen."],
  ["rest", "Een rustdag is geen luie dag. Het is de dag waarop je sterker wordt."],
  ["rest", "Schermen uit een uur voor het slapen. Een boek of rustige muziek helpt je sneller in te slapen."],
  ["rest", "Spierpijn? Rustig bewegen, zoals wandelen of fietsen, helpt meer dan stilzitten."],
  ["rest", "Een koele, donkere slaapkamer (ongeveer 18 °C) geeft je de beste nachtrust."],
  ["rest", "Stress telt ook mee als belasting. Op drukke weken is een lichtere training slim, niet zwak."],
  ["rest", "Een powernap van 20 minuten kan wonderen doen voor een training later op de dag."],
  ["rest", "Probeer vanavond de ademhalingsoefening \"Slapen\" in Meditatie en ademhaling."],
  ["fun", "Weetje: je hebt meer dan 600 spieren. Vandaag mag je er een paar extra laten werken!"],
  ["fun", "Weetje: je bilspier is de grootste spier van je lichaam. Een goede reden om squats te doen."],
  ["fun", "Weetje: krachttraining maakt ook je botten sterker, niet alleen je spieren."],
  ["fun", "Weetje: na een stevige training verbrand je nog uren extra calorieën. Je lichaam blijft voor jou werken."],
  ["fun", "Weetje: je hart is ook een spier, en die train je met elke cardiosessie."],
  ["fun", "Weetje: sporten maakt endorfines vrij, je eigen natuurlijke gelukshormonen. Gratis en legaal!"],
  ["fun", "Weetje: spiergeheugen bestaat. Ben je een tijd gestopt, dan kom je sneller terug dan de eerste keer."],
  ["fun", "Weetje: de eerste weken word je vooral sterker doordat je zenuwstelsel leert, nog voor je spieren groeien."],
  ["fun", "Weetje: lachen gebruikt je buikspieren. Tel dit als bonusset."],
  ["fun", "Weetje: wie regelmatig sport, slaapt gemiddeld beter en dieper. Dubbele winst!"],
  ["move", "Neem vandaag overal de trap. Gratis beentraining!"],
  ["move", "Zit je veel? Sta elk halfuur even op en rek je uit. Je rug zal het merken."],
  ["move", "Bel je vandaag iemand? Doe het al wandelend."],
  ["move", "Wandelen na het eten helpt je bloedsuiker stabiel te houden. Tien minuten is al genoeg."],
  ["move", "Geen tijd voor de gym? Het schema Thuis heeft trainingen zonder materiaal van 30 minuten."],
  ["move", "Probeer eens iets nieuws: een yogales, een bootcamp of een zwembeurt. Nieuwe prikkels houden het leuk."],
  ["move", "Dansen in je keuken telt ook als cardio. Zet je favoriete nummer op!"],
  ["move", "Ga vandaag naar buiten. Daglicht en frisse lucht geven je energie en een betere nachtrust."],
  ["mind", "Elke herhaling is een stem voor de persoon die je wil worden."],
  ["mind", "Zweet is gewoon je vet dat huilt. Grapje, het is water. Maar je deed het wel goed!"],
  ["mind", "Het moeilijkste deel van de training is de voordeur. Eenmaal binnen, gaat het vanzelf."],
  ["mind", "Je bent al verder dan de persoon die nog op de bank zit te twijfelen. Trots!"],
  ["train", "Fris je schema op met een nieuwe oefening uit de bibliotheek. Tik op Aanpassen."],
  ["train", "Cardio na krachttraining in plaats van ervoor: zo hou je je kracht voor de gewichten."],
  ["train", "Een goede warming-up hoeft niet saai te zijn: 5 minuten roeien of fietsen en je bent klaar."],
  ["rest", "Een deloadweek voelt als niets doen, maar daarna voel je je als een superheld."],
  ["rest", "Voel je je ziek boven je nek (verkoudheid)? Licht bewegen mag. Koorts? Dan is rust de beste training."],
  ["food", "Alcohol remt je spierherstel. Een feestje mag, maar drink er telkens een glas water tussen."],
  ["food", "Na een zware dag is een goede maaltijd geen beloning, het is brandstof voor morgen."],
  ["move", "Doe vandaag 3 minuten mobiliteit bij het tandenpoetsen: kniebuigingen of heupcirkels."],
  ["mind", "Kijk vandaag niet naar de weegschaal maar naar je energie, je slaap en je humeur. Ook dat is vooruitgang."],
  ["mind", "Elke pro was ooit een amateur die niet opgaf. Ga zo door!"]
];
const TIP_POOL = DAILY_TIPS.map((t, i) => [DAILY_TIP_CATS[i] || "train", t]).concat(EXTRA_TIPS);
const TIP_CATS = { train: ["💪", "Training"], food: ["🥗", "Voeding"], rest: ["😴", "Herstel"], mind: ["🧠", "Mindset"], fun: ["🤓", "Weetje"], move: ["🚶", "Beweging"], you: ["⭐", "Voor jou"] };
let tipExtra = 0;
function tipOrder(cycle){
  const idx = TIP_POOL.map((_, i) => i);
  let seed = (cycle * 2654435761 + 97) >>> 0;
  const rnd = () => { seed ^= seed << 13; seed >>>= 0; seed ^= seed >>> 17; seed ^= seed << 5; seed >>>= 0; return seed / 4294967296; };
  for (let i = idx.length - 1; i > 0; i--){ const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return idx;
}
function personalTips(){
  const out = [], dates = Object.keys(log).sort();
  if (!dates.length) return out;
  const weeks = new Set(dates.map(weekOf)); let w = weekOf(today()); if (!weeks.has(w)) w = addDays(w, -7);
  let streak = 0; while (weeks.has(w)){ streak++; w = addDays(w, -7); }
  if (streak >= 2) out.push(`${streak} weken op rij getraind. Houd de reeks levend!`);
  const gap = daysAgo(dates[dates.length - 1]);
  if (gap >= 4) out.push(`Al ${gap} dagen geen training. Eén korte sessie is genoeg om de draad weer op te pikken.`);
  const month = today().slice(0, 7), inMonth = dates.filter(d => d.startsWith(month)).length;
  if (inMonth >= 4) out.push(`Al ${inMonth} trainingen deze maand. Mooi bezig!`);
  try { const p = plannedSessions(today(), 1)[0]; if (p && p.date === today()) out.push(`Vandaag op je planning: ${p.scheme.days[p.day].name}. Je kan het!`); } catch {}
  let best = {}, lastPr = null;
  dates.forEach(d => Object.entries(log[d].ex).forEach(([k, e]) => e.sets.forEach(st => {
    if (!(st.w > 0)) return;
    if (best[k] != null && st.w > best[k]) lastPr = { name: e.name, w: st.w, d };
    best[k] = Math.max(best[k] || 0, st.w);
  })));
  if (lastPr && daysAgo(lastPr.d) <= 14) out.push(`Je laatste record: ${lastPr.name} ${fw(lastPr.w)}. Kan het vandaag nog een stapje beter?`);
  try {
    const g = (prefs.goals || []).map(x => ({ x, ev: goalEval(x) })).find(o => !o.ev.done && o.ev.pct >= 10);
    if (g) out.push(`Je bent al op ${Math.round(g.ev.pct)}% van je doel voor ${g.x.name || TRAIN_GOALS[trainGoal()][0]}. Volhouden!`);
  } catch {}
  return out;
}
function dailyTip(){
  const n = Math.floor(new Date(today() + "T12:00") / 864e5) + tipExtra, L = TIP_POOL.length;
  // every third day something personal, if there is something to say
  const mine = tipExtra ? [] : personalTips();
  if (mine.length && n % 3 === 0) return ["you", mine[Math.floor(n / 3) % mine.length]];
  return TIP_POOL[tipOrder(Math.floor(n / L))[n % L]];
}
function dailyTipHtml(){
  const [cat, text] = dailyTip(), [icon, label] = TIP_CATS[cat] || TIP_CATS.train;
  return `<section class="panel mod tip-card" data-mod="tip" id="tipCard">
    ${modHead("Tip van de dag")}
    <div class="mod-body">
      <span class="tip-cat"><i aria-hidden="true">${icon}</i> ${esc(label)}</span>
      <p>${esc(text)}</p>
      <button type="button" class="tip-more" id="tipMore"><span aria-hidden="true">↻</span> Nog een tip</button>
    </div>
  </section>`;
}
function wireTip(){
  const b = $("tipMore"); if (!b) return;
  b.onclick = () => { tipExtra++; renderToday(); };
}

// ---------- Strength level against bodyweight standards ----------
// Estimated 1RM ÷ bodyweight for beginner, novice, intermediate, advanced, elite (based on common strength standards).
const STANDARDS = {
  man:   { "Bench Press":[0.5,0.75,1,1.5,2], "Back Squat":[0.75,1.25,1.5,2.25,2.75], "Deadlift":[1,1.5,2,2.5,3], "Overhead Press":[0.35,0.55,0.75,1,1.3], "Barbell Row":[0.5,0.75,1,1.25,1.75] },
  vrouw: { "Bench Press":[0.25,0.5,0.75,1,1.5], "Back Squat":[0.5,0.75,1.25,1.5,2], "Deadlift":[0.5,1,1.25,1.75,2.5], "Overhead Press":[0.2,0.35,0.5,0.75,1], "Barbell Row":[0.25,0.4,0.65,0.9,1.2] }
};
// "Anders": the calculations use the average of the values for men and women.
STANDARDS.anders = Object.fromEntries(Object.keys(STANDARDS.man).map(l => [l, STANDARDS.man[l].map((v, i) => Math.round((v + STANDARDS.vrouw[l][i]) / 2 * 100) / 100)]));
const sexOf = () => ["man", "vrouw", "anders"].includes(prefs.sex) ? prefs.sex : "man";
const SEX_BMR = { man: 5, vrouw: -161, anders: -78 };
const LEVELS = ["Beginner", "Gevorderde beginner", "Gemiddeld", "Gevorderd", "Expert"];
function renderStrength(){
  const sex = sexOf(), std = STANDARDS[sex];
  const bw = Object.entries(prefs.body || {}).sort((a, b) => a[0] < b[0] ? -1 : 1).pop();
  if (!bw){ $("strength").innerHTML = `<p class="note">Vul eerst je lichaamsgewicht in (blok Lichaamsgewicht). Je kracht wordt vergeleken met wat gebruikelijk is voor jouw gewicht.</p>`; }
  else {
    const rows = Object.keys(std).map(lift => {
      const k = keyOf(lift); let best = 0;
      Object.keys(log).filter(d => daysAgo(d) <= 120).forEach(d => ((log[d].ex[k] || { sets: [] }).sets).forEach(st => { if (st.w > 0 && st.r) best = Math.max(best, e1rm(st)); }));
      if (!best) return `<div class="lvl"><div class="goal-top"><b>${esc(lift)}</b><span>nog niet gelogd</span></div></div>`;
      const ratio = best / bw[1], th = std[lift];
      let lv = 0; th.forEach((t, i) => { if (ratio >= t) lv = i; });
      const next = th[lv + 1];
      const pos = Math.min(100, ratio / th[4] * 100);
      return `<div class="lvl"><div class="goal-top"><b>${esc(lift)}</b><span>1RM ≈ ${fw(Math.round(best * 2) / 2)} · ${fmt(Math.round(ratio * 100) / 100)}× lichaamsgewicht</span></div>
        <div class="lvl-track">${th.map(t => `<i style="left:${t / th[4] * 100}%"></i>`).join("")}<span class="lvl-dot" style="left:${pos}%"></span></div>
        <p class="note"><b class="lvl-name">${ratio < th[0] ? "Starter" : LEVELS[lv]}</b>${next ? ` · volgend niveau bij ${fw(Math.round(next * bw[1] * 2) / 2)} (1RM)` : " · top!"}</p></div>`;
    }).join("");
    $("strength").innerHTML = `${rows}<p class="note">Op basis van je beste geschatte 1RM (laatste 4 maanden) en je lichaamsgewicht (${fw(bw[1])}). Streepjes: beginner → expert.</p>`;
  }
}

// ---------- Profile: age, height, weight, sex → body and training metrics ----------
const CARDIO_MET = { "Loopband": 9, "Hellingwandelen": 6, "Lopen": 9.8, "Spinning": 7.5, "Roeien": 7, "Traploper": 9, "Crosstrainer": 5, "Air bike": 10, "SkiErg": 8, "Springtouw": 11, "HIIT-intervallen": 9, "Ligfiets": 5.5, "Arc trainer": 6, "VersaClimber": 10, "Stepper": 6, "Curved loopband": 10, "Armergometer": 4.5, "Battle ropes": 10, "Wandelen": 3.8, "Zwemmen": 6,
  "Zumba": 6.5, "Yoga": 3, "BBB": 5, "Pilates": 3.5, "Bootcamp": 8, "Step aerobics": 7, "BodyPump": 5.5, "CrossFit WOD": 8, "Hyrox training": 9 };
HYROX_STATIONS.forEach(([n]) => { CARDIO_MET[n] = 9; });
for (let i = 1; i <= 8; i++) CARDIO_MET[HYROX_RUN(i)] = 10.5;
// Age coefficients for strength (Foster for teens, McCulloch from 40): compare yourself fairly with adults of 23–40.
function ageFactor(a){
  if (!a) return 1;
  if (a < 23) return 1 + Math.min(9, 23 - a) * .03;
  const T = [[40, 1], [45, 1.05], [50, 1.13], [55, 1.21], [60, 1.32], [65, 1.44], [70, 1.56], [80, 1.85]];
  if (a <= 40) return 1;
  for (let i = 1; i < T.length; i++) if (a <= T[i][0]) return T[i - 1][1] + (T[i][1] - T[i - 1][1]) * (a - T[i - 1][0]) / (T[i][0] - T[i - 1][0]);
  return T[T.length - 1][1];
}
function dots(total, bw, sex){
  if (sex === "anders") return (dots(total, bw, "man") + dots(total, bw, "vrouw")) / 2;
  const c = sex === "vrouw" ? [-57.96288, 13.6175032, -.1126655495, .0005158568, -.0000010706] : [-307.75076, 24.0900756, -.1918759221, .0007391293, -.000001093];
  const b = Math.min(sex === "vrouw" ? 150 : 210, Math.max(sex === "vrouw" ? 40 : 40, bw));
  return total * 500 / (c[0] + c[1] * b + c[2] * b * b + c[3] * b ** 3 + c[4] * b ** 4);
}
function latestBw(){ const e = Object.entries(prefs.body || {}).sort((a, b) => a[0] < b[0] ? -1 : 1).pop(); return e ? e[1] : null; }
// Minutes of one training day: first to last set, plus warm-up; cardio counts its own minutes.
function sessionMinutes(d){
  const ts = Object.values(log[d].ex).filter(e => !cardioType(e.name)).flatMap(e => e.sets.map(x => new Date(x.t).getTime())).sort((a, b) => a - b);
  if (!ts.length) return 0;
  const n = ts.length, span = (ts[n - 1] - ts[0]) / 60000;
  return Math.min(150, Math.max(n * 2.5, span + 4));
}
function kcalParts(d, kg){
  const lift = sessionMinutes(d) / 60 * 5 * kg;   // strength training ≈ 5 MET
  const cardio = (log[d].cardio || []).reduce((a, c) => a + (c.kcal || (CARDIO_MET[c.type] || 7) * kg * (c.min || 0) / 60), 0);
  return { lift, cardio };
}
function trainingKcal(d, kg){ const k = kcalParts(d, kg); return Math.round(k.lift + k.cardio); }
// ---------- Calorie burn: per week, per training and how strength and cardio share it ----------
function renderKcal(){
  if (!$("kcalWeeks")) return;
  const kg = latestBw();
  if (!kg){
    $("kcalWeeks").innerHTML = ""; $("kcalSplit").innerHTML = "";
    $("kcalNote").textContent = "Vul je lichaamsgewicht in (Instellingen → Taal en profiel, of Lichaamsgewicht), dan berekent de app je calorieverbruik.";
    return;
  }
  const per = {};
  let lift4 = 0, cardio4 = 0;
  Object.keys(log).forEach(d => {
    const k = kcalParts(d, kg), tot = k.lift + k.cardio; if (!tot) return;
    const w = weekOf(d); per[w] = (per[w] || 0) + tot;
    if (daysAgo(d) < 28){ lift4 += k.lift; cardio4 += k.cardio; }
  });
  const total4 = Math.round(lift4 + cardio4), best = Math.round(Math.max(0, ...Object.values(per)));
  weekBars("kcalWeeks", per, (v, short) => short ? (v >= 1000 ? fmt(Math.round(v / 100) / 10) + "k" : String(Math.round(v))) : Math.round(v) + " kcal");
  const lp = total4 ? Math.round(lift4 / total4 * 100) : 0;
  $("kcalSplit").innerHTML = total4 ? `<div class="bal"><div class="goal-top"><b>${esc(`Kracht ${lp}% · cardio ${100 - lp}%`)}</b><span>${esc(`${Math.round(lift4)} / ${Math.round(cardio4)} kcal`)}</span></div>
    <div class="bal-track"><span style="width:${lp}%"></span></div></div>` : "";
  // what training adds to a normal day, next to the resting burn from the profile
  const pr = prefs.profile || {}, age = profileAge(pr), cm = pr.height, sex = sexOf();
  const perDay = Math.round(total4 / 28), parts = [];
  if (age && cm){
    const bmr = Math.round(10 * kg + 6.25 * cm - 5 * age + SEX_BMR[sex]);
    parts.push(`Rustverbranding ±${bmr} kcal per dag; je trainingen voegen daar gemiddeld ±${perDay} kcal per dag aan toe.`);
  } else parts.push(`Je trainingen verbruiken gemiddeld ±${perDay} kcal per dag. Vul leeftijd en lengte in voor je rustverbranding.`);
  if (best) parts.push(`Beste week: ±${best} kcal.`);
  parts.push("Schatting met MET-waarden en je gewicht; calorieën die je zelf invult bij cardio tellen exact mee.");
  $("kcalNote").innerHTML = parts.map(x => `<span>${esc(x)}</span>`).join(" ");
}
// Age goes up by itself: one year for every year since you filled it in.
function profileAge(pr){
  if (pr && pr.birth){
    const b = new Date(pr.birth + "T12:00"), n = new Date();
    let a = n.getFullYear() - b.getFullYear();
    if (n.getMonth() < b.getMonth() || (n.getMonth() === b.getMonth() && n.getDate() < b.getDate())) a--;
    return a > 0 ? a : undefined;
  }
  if (!pr || !pr.age) return undefined;
  const since = pr.ageSet ? Math.floor((Date.now() - new Date(pr.ageSet + "T12:00").getTime()) / (365.2425 * 864e5)) : 0;
  return pr.age + Math.max(0, since);
}
const ageNote = pr => profileAge(pr) ? `${profileAge(pr)} jaar` : "";
function renderProfile(){
  const pr = prefs.profile || {}, sex = sexOf(), kg = latestBw(), age = profileAge(pr), cm = pr.height;
  if (pr.age && !pr.ageSet){ pr.ageSet = today(); savePrefs(); }
  $("pWUnit").textContent = U();
  const setVal = (id, v) => { const el = $(id); if (document.activeElement !== el) el.value = v ? String(v).replace(".", ",") : ""; };
  if (document.activeElement !== $("pBirth")) $("pBirth").value = pr.birth || "";
  $("pAgeNote").textContent = ageNote(pr);
  setVal("pHeight", cm); setVal("pWeight", kg ? fmt(toU(kg)) : "");
  const waist = pr.waist, wu = waistUnit();
  setVal("pWaist", waist ? fmt(Math.round((wu === "in" ? waist / 2.54 : waist) * 10) / 10) : "");
  $("pWaistUnit").querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.v === wu));
  $("pSex").querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.v === sex));
  const missing = [!age && "leeftijd", !cm && "lengte", !kg && "gewicht"].filter(Boolean);
  // Lichaamsvet% en spiermassa staan al bij Fysiologie (gemeten); hier alleen wat daar niet staat.
  const tiles = [], tile = (key, label, val, sub, cls = "") => tiles.push({ key, html: `<div class="tile pm${cls}" data-pm="${key}"><span class="mod-order"><button class="mod-order-btn mod-order-toggle" type="button" aria-label="Volgorde aanpassen" title="Volgorde aanpassen"><span aria-hidden="true">⌃</span><span aria-hidden="true">⌄</span></button><button class="mod-order-btn mod-up" type="button" aria-label="Omhoog" title="Omhoog" hidden>▲</button><button class="mod-order-btn mod-down" type="button" aria-label="Omlaag" title="Omlaag" hidden>▼</button></span><small>${label}</small><strong>${val}</strong><em>${sub}</em></div>` });
  const dates = Object.keys(log).sort(), last28 = dates.filter(d => daysAgo(d) < 28), perWeek = last28.length / 4;
  if (kg && cm){
    const bmi = kg / (cm / 100) ** 2, cat = bmi < 18.5 ? "ondergewicht" : bmi < 25 ? "gezond gewicht" : bmi < 30 ? "overgewicht" : "obesitas";
    tile("bmi", "BMI", fmt(Math.round(bmi * 10) / 10), cat + (bmi >= 25 && perWeek >= 3 ? " · spiermassa telt mee" : ""), bmi >= 18.5 && bmi < 25 ? " ok" : "");
    // measured by your scale (last 60 days) beats any estimate
    const measured = k => { const e = Object.entries(prefs.well || {}).filter(([d, o]) => o[k] != null && daysAgo(d) <= 60).sort((a, b) => a[0] < b[0] ? -1 : 1).pop(); return e ? e[1][k] : null; };
    const mFat = measured("bf");
    if (waist || mFat){
      // Relative fat mass (height and waist), averaged with the BMI–age formula when your age is known.
      const rfm = waist ? (sex === "vrouw" ? 76 : sex === "anders" ? 70 : 64) - 20 * (cm / waist) : 0;
      const deur = age ? 1.2 * bmi + .23 * age - 10.8 * (sex === "vrouw" ? 0 : sex === "anders" ? .5 : 1) - 5.4 : null;
      const fat = mFat || Math.max(3, Math.min(60, deur == null ? rfm : (rfm + deur) / 2)), lean = kg * (1 - fat / 100);
      tile("fatfree", "Vetvrije massa", fw(Math.round(lean * 2) / 2), "spieren, botten, organen en water");
      if (waist){ const r = waist / cm, rcat = r < .4 ? "slank" : r < .5 ? "gezond" : r < .6 ? "verhoogd risico" : "hoog risico";
      tile("waist", "Taille", `${fmt(Math.round(waist))} cm`, `${fmt(Math.round(waist / 2.54 * 10) / 10)} inch · <span>${rcat}</span> (${fmt(Math.round(r * 100) / 100)})`, r >= .4 && r < .5 ? " ok" : ""); }
    } else {
      const leanF = .252 * kg + .473 * cm - 48.3, leanM = .407 * kg + .267 * cm - 19.2, lean = sex === "vrouw" ? leanF : sex === "anders" ? (leanF + leanM) / 2 : leanM;
      tile("fatfree", "Vetvrije massa", fw(Math.round(lean * 2) / 2), `geschat · ±${Math.round(100 - lean / kg * 100)}% vet`);
    }
  }
  if (kg && cm && age){
    const bmr = 10 * kg + 6.25 * cm - 5 * age + SEX_BMR[sex];
    const f = perWeek < .75 ? 1.2 : perWeek < 2.5 ? 1.375 : perWeek < 4.5 ? 1.55 : 1.725;
    tile("bmr", "Rustverbranding", Math.round(bmr) + " kcal", "per dag, in volledige rust");
    tile("energy", "Energie per dag", Math.round(bmr * f) + " kcal", `bij ${fmt(Math.round(perWeek * 10) / 10)} trainingen per week`);
  }
  if (kg) tile("protein", "Eiwit per dag", `${Math.round(kg * 1.6)}–${Math.round(kg * 2.2)} g`, "1,6–2,2 g per kg voor spiergroei");
  if (age){
    const max = Math.round(208 - .7 * age);
    tile("maxhr", "Maximale hartslag", max + " bpm", `zone 2 (duur): ${Math.round(max * .6)}–${Math.round(max * .7)} bpm`);
  }
  // Calories of your trainings
  if (kg && dates.length){
    const lastD = dates[dates.length - 1], week = dates.filter(d => daysAgo(d) < 7).reduce((a, d) => a + trainingKcal(d, kg), 0);
    tile("lastsession", "Laatste training", trainingKcal(lastD, kg) + " kcal", `${Math.round(sessionMinutes(lastD) + (log[lastD].cardio || []).reduce((a, c) => a + (c.min || 0), 0))} min · ${relDate(lastD).toLowerCase()}`);
    tile("weekburn", "Verbrand deze week", week + " kcal", "met trainen, geschat");
  }
  const pmOrder = prefs.pmOrder || [];
  tiles.sort((a, b) => { const ia = pmOrder.indexOf(a.key), ib = pmOrder.indexOf(b.key);
    return ia < 0 && ib < 0 ? 0 : ia < 0 ? 1 : ib < 0 ? -1 : ia - ib; });
  // Strength relative to body weight, corrected for age
  let strHtml = "";
  if (kg){
    const af = ageFactor(age), best = {};
    ["Bench Press", "Back Squat", "Deadlift", "Overhead Press", "Barbell Row", "Pull-up (added weight)"].forEach(lift => {
      const k = keyOf(lift); let b = 0;
      Object.keys(log).filter(d => daysAgo(d) <= 120).forEach(d => ((log[d].ex[k] || { sets: [] }).sets).forEach(st => {
        const w = lift.startsWith("Pull-up") ? (st.w || 0) + kg : st.w;
        if (w > 0 && st.r) b = Math.max(b, e1rm({ w, r: st.r }));
      }));
      if (b) best[lift] = b;
    });
    const std = STANDARDS[sex], rows = Object.entries(best).map(([lift, b]) => {
      const ratio = b / kg, adj = ratio * af, th = std[lift];
      let lv = ""; if (th){ let i = -1; th.forEach((t, j) => { if (adj >= t) i = j; }); lv = i < 0 ? "Starter" : LEVELS[i]; }
      return `<div class="rec-row"><span class="rec-name">${esc((NL[lift] || [lift])[0] || lift)}</span><span class="rec-vals"><b>${fmt(Math.round(ratio * 100) / 100)}×</b> je gewicht${af !== 1 ? ` · leeftijd ${fmt(Math.round(adj * 100) / 100)}×` : ""}${lv ? ` · <b>${esc(lv)}</b>` : ""}</span></div>`;
    });
    if (rows.length){
      const sbd = ["Back Squat", "Bench Press", "Deadlift"];
      let dotsTxt = "";
      if (sbd.every(l => best[l])){
        const total = sbd.reduce((a, l) => a + best[l], 0), sc = Math.round(dots(total, kg, sex) * af);
        const lab = sc < 200 ? "beginner" : sc < 300 ? "gemiddeld" : sc < 400 ? "gevorderd" : sc < 500 ? "zeer sterk" : "elite";
        dotsTxt = `<p class="note"><b>DOTS-score ${sc}</b> (${lab}) · totaal squat + bench + deadlift ≈ ${fw(Math.round(total))}. Hiermee vergelijk je kracht eerlijk tussen lichaamsgewichten.</p>`;
      }
      strHtml = `<h3 class="pm-h">Kracht in verhouding tot je lichaam</h3>${rows.join("")}${dotsTxt}
        <p class="note">Geschatte 1RM (laatste 4 maanden) gedeeld door je gewicht${af !== 1 ? `, met leeftijdscorrectie ×${fmt(Math.round(af * 100) / 100)}` : ""}.</p>`;
    }
  }
  $("profMetrics").innerHTML = (missing.length ? `<p class="note pm-miss">Vul nog je ${missing.join(", ").replace(/, ([^,]*)$/, " en $1")} in voor alle cijfers.</p>` : "")
    + (!pr.waist && !Object.values(prefs.well || {}).some(o => o.bf != null) ? `<p class="note pm-miss">Vul je tailleomtrek in bij Instellingen voor een betere schatting van je vetvrije massa.</p>` : "")
    + (tiles.length ? `<div class="pm-tiles">${tiles.map(t => t.html).join("")}</div>` : "");
  $("profMetrics").querySelectorAll("[data-pm]").forEach(el => wireTileOrder(el, $("profMetrics").querySelector(".pm-tiles"), "pmOrder"));
  $("profStrength").innerHTML = strHtml;
}
// Tap the stacked-chevron button on a tile to reveal up/down arrows and move it past its neighbour.
function wireTileOrder(el, container, prefKey){
  const toggle = el.querySelector(".mod-order-toggle"), up = el.querySelector(".mod-up"), down = el.querySelector(".mod-down");
  if (!toggle) return;
  const items = () => [...container.querySelectorAll("[data-pm]")];
  const refresh = () => { const vis = items(), i = vis.indexOf(el); up.disabled = i <= 0; down.disabled = i < 0 || i === vis.length - 1; };
  const collapse = () => { toggle.hidden = false; up.hidden = true; down.hidden = true; };
  const move = () => { prefs[prefKey] = items().map(x => x.dataset.pm); savePrefs(); collapse(); toggle.focus(); };
  toggle.onclick = () => { toggle.hidden = true; up.hidden = false; down.hidden = false; refresh(); };
  up.onclick = () => { const sib = items()[items().indexOf(el) - 1]; if (!sib) return; container.insertBefore(el, sib); move(); };
  down.onclick = () => { const sib = items()[items().indexOf(el) + 1]; if (!sib) return; container.insertBefore(sib, el); move(); };
  collapse();
}
function saveProfileField(id){
  const raw = $(id).value.trim().replace(",", "."), v = parseFloat(raw);
  prefs.profile = Object.assign({}, prefs.profile);
  if (id === "pBirth"){
    const a = raw ? profileAge({ birth: $(id).value }) : 0;
    if (raw && !(a >= 10 && a <= 100)){ toast("Vul een geldige geboortedatum in (tussen 10 en 100 jaar oud)"); return; }
    prefs.profile.birth = raw ? $(id).value : undefined; prefs.profile.age = undefined; prefs.profile.ageSet = undefined;
  }
  if (id === "pHeight"){ if (raw && !(v >= 100 && v <= 250)){ toast("Vul je lengte in cm in (bv. 178)"); return; } prefs.profile.height = raw ? Math.round(v) : undefined; }
  if (id === "pWaist"){
    const cmW = waistUnit() === "in" ? v * 2.54 : v;
    if (raw && !(cmW >= 40 && cmW <= 200)){ toast("Vul je tailleomtrek in, bv. 85 cm of 33,5 inch"); return; }
    prefs.profile.waist = raw ? Math.round(cmW * 10) / 10 : undefined; prefs.profile.waistSet = raw ? today() : undefined;
  }
  if (id === "pWeight"){
    if (!raw) return;
    const kg = fromU(v); if (!(kg > 20 && kg < 400)){ toast("Vul je gewicht in " + U() + " in"); return; }
    if (Math.abs(kg - (latestBw() || 0)) > .05){ prefs.body = Object.assign({}, prefs.body, { [today()]: kg }); renderBodyWeight(); }
  }
  savePrefs(); renderProfile(); demoRefit();
}
["pBirth", "pHeight", "pWeight", "pWaist"].forEach(id => $(id).addEventListener("change", () => saveProfileField(id)));
const waistUnit = () => prefs.waistUnit === "in" || (!prefs.waistUnit && isLb()) ? "in" : "cm";
$("pWaistUnit").onclick = e => { const b = e.target.closest("button"); if (!b) return; prefs.waistUnit = b.dataset.v; savePrefs(); renderProfile(); };
$("waistHow").onclick = () => { const box = $("waistHowBox"); box.hidden = !box.hidden; $("waistHow").setAttribute("aria-expanded", !box.hidden); };
// The stand-alone app keeps each language in its own file (build.py: FPT_I18N_FILES) and loads it on first use.
const langLoads = {};
let langWant = "";
function loadLang(code){
  const f = (window.FPT_I18N_FILES || {})[code];
  if (!f || I18N[code]) return null;
  return langLoads[code] || (langLoads[code] = new Promise(ok => {
    const s = document.createElement("script"); s.src = f; s.onload = s.onerror = () => ok(); document.head.appendChild(s);
  }));
}
function setLang(code){
  if (!LOCALES[code] || code === lang) return;
  langWant = code;
  const wait = loadLang(code);
  if (wait && !wait.done){ wait.then(() => { wait.done = true; if (langWant === code) setLang(code); }); return; }
  lang = code; lsSet("ppl.lang", code);
  prefs.lang = code; savePrefs();
  buildLang(); applyLangAttrs();
  trObserver.dirty = true; trTree(document.body); trObserver.dirty = false;
  fitTabs();
  render(); if (page === "stats") renderStats(); if (page === "today" && typeof renderToday === "function") renderToday();
  if (!$("welcome").hidden){ renderLangSlide(); wlGo(wlAt); }
}
document.querySelectorAll(".lang-sel").forEach(sel => sel.addEventListener("change", () => setLang(sel.value)));
$("pSex").onclick = e => { const b = e.target.closest("button"); if (!b) return; prefs.sex = b.dataset.v; savePrefs(); renderProfile(); demoRefit(); if (page === "stats"){ renderStrength(); renderKcal(); renderAdvice(); } };

// ---------- Muscle balance (last 4 weeks) ----------
const BALANCE = [
  ["Duwen", ["Borst", "Voorkant schouders", "Triceps"], "Trekken", ["Lats", "Bovenrug", "Biceps", "Achterkant schouders"], "Train minstens evenveel trekken als duwen; dat is goed voor je schouders en houding."],
  ["Voorkant", ["Borst", "Voorkant schouders", "Quadriceps", "Buikspieren", "Biceps"], "Achterkant", ["Lats", "Bovenrug", "Achterkant schouders", "Hamstrings", "Billen", "Onderrug", "Triceps"], "Een sterke achterkant (rug, billen, hamstrings) beschermt je rug en knieën."],
  ["Bovenlichaam", ["Borst", "Voorkant schouders", "Zijkant schouders", "Achterkant schouders", "Triceps", "Biceps", "Lats", "Bovenrug"], "Benen", ["Quadriceps", "Hamstrings", "Billen", "Kuiten", "Adductoren", "Abductoren"], "Benen zijn je grootste spieren; sla ze niet over."]
];
function renderBalance(){
  const mus = {};
  Object.keys(log).filter(d => daysAgo(d) < 28).forEach(d => Object.values(log[d].ex).forEach(e => {
    const m = MUSCLES[e.name]; if (!m || cardioType(e.name) || isStretch(e.name)) return;
    const n = e.sets.length, strong = new Set(m[0].map(muscleGroup));
    strong.forEach(g => { mus[g] = (mus[g] || 0) + n; });
    new Set(m[1].map(muscleGroup)).forEach(g => { if (!strong.has(g)) mus[g] = (mus[g] || 0) + n / 2; });
  }));
  const sum = gs => gs.reduce((a, g) => a + (mus[g] || 0), 0);
  $("balance").innerHTML = BALANCE.map(([a, ga, b, gb, tip]) => {
    const x = sum(ga), y = sum(gb), tot = x + y;
    if (!tot) return `<div class="bal"><div class="goal-top"><b>${a} / ${b}</b><span>nog geen gegevens</span></div></div>`;
    const pct = Math.round(x / tot * 100), ratio = y ? x / y : 9;
    const off = ratio > 1.25 ? `Meer ${a.toLowerCase()} dan ${b.toLowerCase()}. ${tip}` : ratio < 0.8 ? `Meer ${b.toLowerCase()} dan ${a.toLowerCase()}. ${tip}` : "Mooi in balans.";
    return `<div class="bal"><div class="goal-top"><b>${a} ${pct}% · ${b} ${100 - pct}%</b><span>${Math.round(x)} / ${Math.round(y)} sets</span></div>
      <div class="bal-track"><span style="width:${pct}%"></span></div><p class="note${off === "Mooi in balans." ? "" : " warn-t"}">${esc(off)}</p></div>`;
  }).join("") + `<p class="note">Laatste 4 weken. Sterk aangesproken spier = 1 set, minder sterk = ½ set.</p>`;
}

// ---------- Balance and suggestions: strength, core, stretching and fitness at the level that suits your age and sex ----------
// What a logged exercise trains, from the schemes and the library ("push", "pull", "legs", "core", "mobility", "yoga").
function exTypeMap(){
  const m = {};
  LIB.forEach(x => { m[x[0]] = x[1]; });
  allSchemes().forEach(sc => sc.days.forEach(dd => dd.ex.forEach(e => { if (!m[e[0]] && e[4] && e[4] !== "cardio") m[e[0]] = e[4]; })));
  return m;
}
// A class you log as cardio also counts for the areas it trains (sets are a rough equivalent).
const CLASS_CREDIT = { "Yoga": { core: 2, mob: true }, "Pilates": { core: 6, mob: true }, "BBB": { legs: 8, core: 4, str: true }, "BodyPump": { push: 6, pull: 6, legs: 6, str: true },
  "Bootcamp": { legs: 4, push: 3, core: 3, str: true }, "CrossFit WOD": { legs: 4, push: 3, pull: 3, str: true }, "Hyrox training": { legs: 4, pull: 2, str: true } };
function trainingBalance(){
  const types = exTypeMap(), days = Object.keys(log).filter(d => daysAgo(d) < 28), weeks = 4;
  const sets = { push: 0, pull: 0, legs: 0, core: 0 }, strDays = new Set(), mobDays = new Set();
  let cardioMin = 0;
  days.forEach(d => {
    Object.values(log[d].ex).forEach(e => {
      const t = types[e.name] || (isStretch(e.name) ? "mobility" : ""), n = e.sets.length; if (!n) return;
      if (t === "mobility" || t === "yoga") mobDays.add(d);
      else if (t === "core") sets.core += n;
      else if (sets[t] != null){ sets[t] += n; strDays.add(d); }
    });
    (log[d].cardio || []).forEach(c => {
      cardioMin += c.min || 0;
      const cr = CLASS_CREDIT[c.type]; if (!cr) return;
      ["push", "pull", "legs", "core"].forEach(k => { sets[k] += cr[k] || 0; });
      if (cr.str) strDays.add(d); if (cr.mob) mobDays.add(d);
    });
  });
  const pw = v => Math.round(v / weeks * 10) / 10;
  return { push: pw(sets.push), pull: pw(sets.pull), legs: pw(sets.legs), core: pw(sets.core), strDays: pw(strDays.size), mobDays: pw(mobDays.size),
    cardio: Math.round(cardioMin / weeks), logged: days.length, since: Object.keys(log).sort()[0] };
}
// Weekly targets (WHO and ACSM guidelines): strength 2×, 8+ sets per area, core twice, stretching 2–3 days, 150 min cardio.
function balanceTargets(age, sex){
  return { strDays: 2, area: 8, core: 6, mobDays: age >= 50 ? 3 : 2, cardio: 150, balance: age >= 65, bones: sex === "vrouw" && age >= 40 };
}
// Average strength level over the main lifts, corrected for age; null without body weight or lifts.
function strengthLevel(sex, age){
  const bw = latestBw(); if (!bw) return null;
  const std = STANDARDS[sex], lv = [];
  Object.keys(std).forEach(lift => {
    const k = keyOf(lift); let best = 0;
    Object.keys(log).filter(d => daysAgo(d) <= 120).forEach(d => ((log[d].ex[k] || { sets: [] }).sets).forEach(st => { if (st.w > 0 && st.r) best = Math.max(best, e1rm(st)); }));
    if (!best) return;
    const ratio = best / bw * ageFactor(age), th = std[lift];
    let l = ratio < th[0] ? -1 : 0; th.forEach((t, i) => { if (ratio >= t) l = i; });
    lv.push(l);
  });
  return lv.length ? lv.reduce((a, b) => a + b, 0) / lv.length : null;
}
function renderAdvice(){
  const box = $("advice"); if (!box) return;
  const pr = prefs.profile || {}, age = profileAge(pr) || 30, sex = sexOf();
  const b = trainingBalance(), T = balanceTargets(age, sex);
  if (!b.logged){ box.innerHTML = `<p class="note">Train een paar keer, dan zie je hier hoe evenwichtig je traint en wat je kan toevoegen.</p>`; return; }
  const lowArea = ["push", "pull", "legs"].sort((x, y) => b[x] - b[y])[0];
  const AREA = { push: "Duwen", pull: "Trekken", legs: "Benen" };
  const rows = [
    { k: "str", lab: "Krachttraining", v: b.strDays, t: T.strDays, unit: "dagen per week" },
    { k: "area", lab: "Duwen · trekken · benen", v: Math.min(b.push, b.pull, b.legs), t: T.area, unit: "sets per week (laagste)", sub: `Duwen ${fmt(b.push)} · trekken ${fmt(b.pull)} · benen ${fmt(b.legs)}` },
    { k: "core", lab: "Core", v: b.core, t: T.core, unit: "sets per week" },
    { k: "mob", lab: "Stretchen en mobiliteit", v: b.mobDays, t: T.mobDays, unit: "dagen per week" },
    { k: "cardio", lab: "Conditie", v: b.cardio, t: T.cardio, unit: "min per week" }
  ].map(r => Object.assign(r, { pct: Math.min(100, Math.round(r.v / r.t * 100)) }));
  const lvl = strengthLevel(sex, age);
  const cur = scheme(), main = isAddon(cur) || cur.cls ? (comboHome() || findScheme("ppl")) : cur;
  const tips = [];
  const add = (score, text, label, act) => tips.push({ score, text, label, act });
  const open = (id, dayIdx) => () => {
    const sc = findScheme(id); if (!sc) return;
    const nx = nextDayIndex(sc);
    view = { scheme: id, day: dayIdx != null ? dayIdx : nx ? nx.idx : 0, home: homeFor(sc) }; lsSet(LS_VIEW, view);
    showPage("train"); render(); window.scrollTo(0, 0);
  };
  const r = Object.fromEntries(rows.map(x => [x.k, x]));
  if (r.str.pct < 100){
    const newbie = !b.since || daysAgo(b.since) < 56;
    add(r.str.pct, newbie ? `Train ${T.strDays}× per week kracht. Begin met Beginner Full Body: het hele lichaam per training.` : `Train ${T.strDays}× per week kracht, bijvoorbeeld Upper / Lower.`,
      newbie ? "Beginner Full Body openen" : "Upper / Lower openen", open(newbie ? "prog-beginner" : "ul"));
  }
  if (r.area.pct < 100 && r.str.pct >= 50){
    const di = main.days.findIndex(dd => dd.ex.filter(e => e[4] === lowArea).length >= 2);
    add(r.area.pct, `${AREA[lowArea]} blijft achter (${fmt(b[lowArea])} sets per week). Doe die dag wat vaker of voeg 2–3 sets toe.`,
      di >= 0 ? `${main.days[di].name} openen` : "Push / Pull / Legs openen", di >= 0 ? open(main.id, di) : open("ppl"));
  }
  if (r.core.pct < 100){
    const evenDays = main.days.map((_, i) => i).filter(i => i % 2 === 0);
    const names = evenDays.map(i => main.days[i].name).join(" + ");
    add(r.core.pct, `Meer core: laat Core volgen na ${names}. Na Core ga je vanzelf verder met je schema.`, `Core na ${names}`, () => {
      prefs.after = Object.assign({}, prefs.after); evenDays.forEach(i => { prefs.after[dayKey(main, i)] = "core"; }); savePrefs();
      toast(`Core volgt nu na ${names}.`); renderAdvice();
    });
  }
  if (r.mob.pct < 100){
    const yin = T.balance ? 2 : 1;
    add(r.mob.pct, T.balance ? `Stretch ${T.mobDays}× per week en werk aan je balans: Hatha-yoga is daar ideaal voor.` : `Stretch ${T.mobDays}× per week: Yin-yoga op een rustdag of 10 minuten mobiliteit na je training.`,
      T.balance ? "Yoga Hatha openen" : "Yoga Yin openen", open("yoga", yin));
  }
  if (r.cardio.pct < 100){
    add(r.cardio.pct, `Mik op ${T.cardio} minuten conditie per week, bv. 3× 30–40 minuten Zone 2 waarbij je nog kan praten.`, "Lopen openen", open("run", 0));
  }
  if (lvl != null && lvl < 1 && r.str.pct >= 100){
    add(40, `Je kracht ligt onder het gemiddelde voor je leeftijd en geslacht. Een gericht krachtprogramma helpt het snelst.`, "Kracht 5/3/1 openen", open("prog-531"));
  }
  if (T.bones && r.str.pct < 100) add(r.str.pct - 1, "Vanaf 40 jaar helpen zware krachttraining en springen (bv. Bootcamp) om je botten sterk te houden.", "Bootcamp openen", open("bootcamp"));
  // the goal that needs the most help
  const behind = (prefs.goals || []).map(g => ({ g, ev: goalEval(g) })).filter(o => !o.ev.done).map(o => Object.assign(o, { pl: goalPlan(o.g) })).filter(o => o.pl && o.pl.verdict && o.pl.verdict !== "ok")[0];
  if (behind){
    const t = behind.ev.type, nm = behind.g.name || "";
    const pick = ["dist", "dur", "pace"].includes(t) ? ["run", 1, "Lopen openen"] : t === "body" ? ["walk", 0, "Wandelen openen"] : t === "freq" ? null : ["prog-531", null, "Kracht 5/3/1 openen"];
    if (pick) add(10, nm ? `Voor je doel ${nm} heb je wat extra nodig.` : "Voor je doel heb je wat extra nodig.", pick[2], open(pick[0], pick[1]));
  }
  const tg = trainGoal();
  if (tg === "fat") add(45, "Vetverlies: houd je krachttraining zwaar genoeg, doe 150–300 minuten cardio per week en eet ±300–500 kcal per dag minder dan je verbruikt.", "Wandelen openen", open("walk", 0));
  else if (tg === "strength") add(50, "Kracht: zware basisoefeningen in 3–6 herhalingen en elke week een klein beetje zwaarder. Een vast programma zoals 5/3/1 helpt.", "Kracht 5/3/1 openen", open("prog-531"));
  else if (tg === "endurance") add(48, "Conditie: doe 80% van je cardio rustig, 1× per week intervallen of tempo, en bouw per week hooguit 10% op.", "Lopen openen", open("run"));
  else if (tg === "athletic") add(52, "Athletisch: wissel kracht, conditie en core af, ±3× per week.", "Athletisch openen", open("ath"));
  else if (r.area.pct < 100) add(55, "Spieropbouw: mik op 10–20 sets per spiergroep per week in 6–12 herhalingen.", "Push / Pull / Legs openen", open("ppl"));
  tips.sort((x, y) => x.score - y.score);
  const lvText = lvl == null ? "" : lvl < 0 ? "Starter" : LEVELS[Math.round(lvl)];
  box.innerHTML = rows.map(x => `<div class="adv-row ${x.pct >= 100 ? "ok" : x.pct >= 60 ? "mid" : "low"}">
      <div class="adv-top"><b>${esc(x.lab)}</b><span>${esc(`${fmt(x.v)} / ${fmt(x.t)} ${x.unit}`)}</span></div>
      <div class="adv-track"><span style="width:${x.pct}%"></span></div>${x.sub ? `<span class="adv-sub">${esc(x.sub)}</span>` : ""}</div>`).join("")
    + (lvText ? `<p class="note">Krachtniveau voor je leeftijd (${age}) en geslacht: <b>${esc(lvText)}</b>.</p>` : `<p class="note">Vul je lichaamsgewicht in voor een krachtniveau volgens leeftijd en geslacht.</p>`)
    + `<div class="adv-tips">${tips.length ? tips.slice(0, 3).map((x, i) => `<div class="adv-tip"><p>${esc(x.text)}</p><button type="button" class="ghost-sm" data-adv="${i}">${esc(x.label)}</button></div>`).join("")
      : `<div class="adv-tip"><p>Mooi in balans: kracht, core, stretchen en conditie zitten allemaal op niveau. Ga zo door!</p></div>`}</div>
    <p class="note">Gemiddelde van de laatste 4 weken. Richtlijnen: 2× per week kracht, 150 minuten conditie, ${T.mobDays}× ${T.balance ? "stretchen en balans" : "stretchen"}.</p>`;
  box.querySelectorAll("[data-adv]").forEach(btn => { btn.onclick = tips[+btn.dataset.adv].act; });
}

// ---------- Google Calendar: put planned trainings in the viewer's own calendar ----------
let mcpNs = null;
const localIso = (date, hm, plusMin = 0) => {
  const [h, m] = hm.split(":").map(Number), d = new Date(date + "T00:00");
  d.setHours(h, m + plusMin, 0, 0);
  const p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:00`;
};
function calendarControls(){
  if (!mcpNs) return STANDALONE ? "" : `<p class="note">Google Agenda koppelen kan als je de app op claude.ai opent met Google Agenda verbonden.</p>`;
  return `<div class="cal-add">
    <label>Uur<input type="time" id="calTime" value="${esc(prefs.calTime || "18:00")}"></label>
    <label>Duur<select id="calDur">${[45, 60, 75, 90].map(m => `<option value="${m}"${(prefs.calDur || 60) === m ? " selected" : ""}>${m} min</option>`).join("")}</select></label>
    <button class="save" type="button" id="calGo">Zet in Google Agenda</button>
  </div><p class="note" id="calMsg">Zet de geplande trainingen van deze week in je agenda, met een herinnering 1 uur vooraf.</p>`;
}
async function addToCalendar(){
  const btn = $("calGo"), msg = $("calMsg");
  prefs.calTime = $("calTime").value || "18:00"; prefs.calDur = +$("calDur").value || 60; savePrefs();
  const s = scheme(), sent = prefs.calSent || {};
  const todo = weekPlan().filter(d => (d.state === "planned" || d.state === "today") && !sent[d.date]);
  if (!todo.length){ msg.textContent = (prefs.planDays || []).length ? "Alle geplande trainingen van deze week staan al in je agenda." : "Kies eerst op welke dagen je traint."; return; }
  btn.disabled = true; msg.textContent = "Bezig…";
  let ok = 0;
  for (const d of todo){
    const day = s.days.find(x => x.name === d.label);
    const ex = day ? exercisesFor(s, s.days.indexOf(day)).map(x => x[0]).join(", ") : "";
    try {
      await mcpNs.callTool("Google Calendar", "create_event", {
        summary: `Training: ${d.label}`,
        startTime: localIso(d.date, prefs.calTime), endTime: localIso(d.date, prefs.calTime, prefs.calDur),
        description: `${s.name}${ex ? "\nOefeningen: " + ex : ""}\nGepland met Fitness Progress Tracker.`,
        overrideReminders: [{ method: "popup", minutes: 60 }]
      });
      sent[d.date] = true; ok++;
    } catch (e) {
      const c = e && e.code;
      msg.textContent = c === "server_not_connected" ? "Google Agenda is niet verbonden. Voeg het toe in claude.ai → Instellingen → Connectors."
        : c === "needs_reauth" ? "Je Google Agenda-koppeling is verlopen. Verbind opnieuw in claude.ai → Instellingen → Connectors."
        : c === "approval_required" || c === "not_in_manifest" || c === "consent_required" ? "Er is geen toestemming gegeven voor Google Agenda. Tik opnieuw en kies Toestaan."
        : c === "not_granted" || c === "capability_disabled" ? "Google Agenda werkt niet in deze weergave. Open de app op claude.ai."
        : `Niet gelukt${ok ? " na " + ok + " training(en)" : ""}. Kijk in je agenda wat er al staat voor je opnieuw probeert.`;
      break;
    }
  }
  prefs.calSent = sent; savePrefs();
  btn.disabled = false;
  if (ok) { msg.textContent = `${ok} ${ok === 1 ? "training staat" : "trainingen staan"} in je Google Agenda.`; toast("Toegevoegd aan Google Agenda"); }
}

// Redrawing empties and refills the lists, which could drop the page to the top: stay where you were.
function keepScroll(fn){ const y = window.scrollY; fn(); if (Math.abs(window.scrollY - y) > 1) window.scrollTo({ top: y, behavior: "instant" }); }
function render(){ keepScroll(() => { renderProgram(); renderSchemes(); renderDays(); renderAddScope(); renderDayTools(); renderExercises(); renderRecovery(); renderWeek(); if (page === "today") renderToday(); }); }

let toastTimer;
function toast(msg, undoFn, undoLabel = "Ongedaan maken"){
  const t = $("toast"); t.innerHTML = "";
  const sp = document.createElement("span"); sp.textContent = msg; t.appendChild(sp);
  if (undoFn){
    const b = document.createElement("button"); b.type = "button"; b.className = "toast-undo"; b.textContent = undoLabel;
    b.onclick = () => { t.classList.remove("show"); undoFn(); };
    t.appendChild(b);
  }
  t.classList.toggle("has-undo", !!undoFn); t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), undoFn ? 6000 : 2400);
}

// ---------- Mini chart in each exercise card: the last 8 trainings ----------
let progCache = {};
function miniTrend(p){
  if (!p || p.pts.length < 2) return "";
  const pts = p.pts.slice(-8), a = pts[0].w, b = pts[pts.length - 1].w;
  const show = v => p.unit === "kg" ? fw(v) : fmt(v) + " " + p.unit, d = b - a;
  return `<div class="mini-trend">${sparkline(pts)}<span>${pts.length} trainingen: <b>${esc(show(a))} → ${esc(show(b))}</b>${d ? ` <small class="${d > 0 ? "up" : "down"}">${d > 0 ? "▲" : "▼"}</small>` : ""}</span></div>`;
}

// ---------- Auto-close a workout you forgot to finish (3 hours after its last set) ----------
function autoCloseWorkout(){
  const t = log[today()]; if (!t) return false;
  const times = Object.values(t.ex).flatMap(e => e.sets.map(x => x.t)).concat((t.cardio || []).map(c => c.t)).filter(x => !endedAt || x > endedAt).sort();
  if (!times.length || Date.now() - new Date(times[times.length - 1]).getTime() < 3 * 36e5) return false;
  endedAt = new Date(new Date(times[times.length - 1]).getTime() + 1000).toISOString(); lsSet(LS_ENDED, endedAt);
  skips = Object.fromEntries(Object.entries(skips).filter(([sk]) => !sk.startsWith(today() + "|"))); lsSet(LS_SKIPS, skips);
  return true;
}

// ---------- Undo: a snapshot of everything you can change, restored with one tap ----------
function takeSnapshot(){ return clone({ log, records, skips, endedAt, layouts, prefs, view }); }
// Undo only what the action changed (from `sn` to `after`): what came in since then, from another device,
// Garmin or Strava, stays. Merged with the state right after the action as the common copy.
function restoreSnapshot(sn, after){
  const back = k => merge3(after[k], sn[k], k === "prefs" ? clone(prefs) : { log, records, layouts }[k]) || {};
  const cur = log, nlog = back("log");
  log = nlog; lsSet(LS_LOG, log);
  new Set(Object.keys(cur).concat(Object.keys(nlog))).forEach(d => { if (!deepEq(cur[d], nlog[d])) saveSession(d); });
  records = back("records"); saveRecords();
  layouts = back("layouts"); saveLayouts();
  const np = back("prefs"); adoptInto(prefs, np); savePrefs();
  skips = sn.skips; lsSet(LS_SKIPS, skips);
  endedAt = sn.endedAt; lsSet(LS_ENDED, endedAt);
  view = sn.view; lsSet(LS_VIEW, view);
  $("finishPanel").hidden = true;
  render(); if (page === "stats") renderStats();
}
const undoToast = (msg, sn) => { const after = takeSnapshot(); toast(msg, () => { restoreSnapshot(sn, after); toast("Ongedaan gemaakt"); }); };

function saveWeight(name, raw, repsRaw, mode){
  const reps = parseInt(repsRaw, 10);
  if (mode){
    // Reps-only or timed exercise: no weight, the reps (or seconds) are the record.
    if (!(reps > 0 && reps < 1000)){ toast(mode === "time" ? "Vul het aantal seconden in, bv. 45" : "Vul je reps in, bv. 12"); return 0; }
    const unit = mode === "time" ? "sec" : "reps", prevStats = repStats(keyOf(name));
    const setNo = logSet(name, 0, reps, mode === "time");
    renderExercises();
    toast(prevStats && reps > prevStats.best ? `Nieuw record! ${reps} ${unit}` : `Set ${setNo} opgeslagen: ${reps} ${unit}`);
    return setNo;
  }
  const w = fromU(parseFloat(String(raw).replace(",", ".")));
  if (!isFinite(w) || w < 0 || w > 1000){ toast("Vul een gewicht in " + U() + " in, bv. " + (isLb() ? "135" : "62,5")); return 0; }
  if (String(repsRaw).trim() && !(reps > 0 && reps < 200)){ toast("Reps moet een getal zijn, bv. 8"); return 0; }
  const k = keyOf(name), prev = records[k];
  const isBest = !prev || w > prev.best;
  records = Object.assign({}, records, { [k]: { best: prev ? Math.max(prev.best, w) : w, last: w, date: new Date().toISOString(), name } });
  saveRecords();
  const setNo = logSet(name, w, reps > 0 ? reps : undefined);
  renderExercises();
  toast((isBest && prev ? `Nieuw record! ${fw(w)}` : `Set ${setNo} opgeslagen: ${fw(w)}`) + (reps > 0 ? ` × ${reps}` : ""));
  return setNo;
}

function setStore(ok, text){ $("storeDot").classList.toggle("ok", ok); $("storeText").textContent = text; }

// Merge two record sets, keeping the higher best and the most recent last.
function merge(a, b){
  const out = Object.assign({}, a);
  for (const [k, r] of Object.entries(b || {})){
    const o = out[k];
    if (!o) { out[k] = r; continue; }
    const newer = (r.date || "") > (o.date || "") ? r : o;
    out[k] = { best: Math.max(o.best, r.best), last: newer.last, date: newer.date, name: newer.name || o.name };
  }
  return out;
}

$("restPlus").onclick = () => { restEnd = Math.max(restEnd, Date.now()) + 30000; $("restBar").classList.remove("over"); if (!restTimer) restTimer = setInterval(tickRest, 250); tickRest(); };
$("restStop").onclick = stopRest;
$("finishBtn").onclick = finishWorkout;
$("focusToggle").onclick = () => { focusOn = !focusOn; devSet("ppl.focus", focusOn); focusKey = null; stopRest(); sessionOn = focusOn; watchAt = Date.now(); renderExercises();
  // look at the first exercise, not the top of the page
  const c = document.querySelector("#exercises .ex.focused") || document.querySelector("#exercises .ex:not(.finished)") || document.querySelector("#exercises .ex");
  if (c) window.scrollTo({ top: Math.max(0, c.getBoundingClientRect().top + window.scrollY - headerOffset()), behavior: "instant" }); };
$("fPrev").onclick = () => focusStep(-1);
$("fNext").onclick = () => focusStep(1);
// Swipe left/right between exercises in focus mode.
let touchX = null, touchY = null;
$("exercises").addEventListener("touchstart", e => { touchX = e.touches[0].clientX; touchY = e.touches[0].clientY; }, { passive: true });
$("exercises").addEventListener("touchend", e => {
  if (!document.body.classList.contains("focus") || touchX == null) return;
  const dx = e.changedTouches[0].clientX - touchX, dy = e.changedTouches[0].clientY - touchY;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && !e.target.closest("input,textarea")) focusStep(dx < 0 ? 1 : -1);
  touchX = null;
}, { passive: true });
$("newScheme").addEventListener("submit", createScheme);
$("nsCancel").onclick = () => { $("newScheme").hidden = true; };
$("ownScheme").onclick = () => { pickMode = pickMode === "new" ? "" : "new"; renderCatPick(); };
delBtns().forEach(b => b.onclick = deleteScheme);
$("orderScheme").onclick = () => { if (orderEditing){ orderEditing = false; pickMode = ""; renderCatPick(); renderSchemes(); return; } pickMode = pickMode === "order" ? "" : "order"; renderCatPick(); };
$("addProg").addEventListener("change", () => { addProgOpen = null; renderAddProg(); });
setupModules();
$("welcomeSkip").onclick = closeWelcome;
document.querySelectorAll(".mod-today").forEach(b => b.onclick = () => selectDay(today(), b.dataset.from));
$("calPrev").onclick = () => { const [y, m] = calMonth.split("-").map(Number); const d = new Date(y, m - 2, 1); calMonth = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"); renderCalendar(); };
$("calNext").onclick = () => { const [y, m] = calMonth.split("-").map(Number); const d = new Date(y, m, 1); calMonth = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"); renderCalendar(); };
$("bwForm").addEventListener("submit", e => {
  e.preventDefault();
  const w = fromU(parseFloat(String($("bwInput").value.trim() || $("bwInput").placeholder).replace(",", ".")));
  if (!(w > 20 && w < 400)){ toast("Vul je gewicht in " + U() + " in"); return; }
  prefs.body = Object.assign({}, prefs.body, { [today()]: w }); savePrefs();
  $("bwInput").value = ""; renderBodyWeight(); toast("Gewicht opgeslagen: " + fw(w));
});
$("viewTrain").onclick = () => showPage("train");
$("viewStats").onclick = () => showPage("stats");
$("viewPlan").onclick = () => { showPage("plan"); window.scrollTo(0, 0); };
$("viewToday").onclick = () => showPage("today");
$("settingsBtn").onclick = () => { const st = $("settings"); closeFriends(); st.hidden = !st.hidden; $("settingsBtn").setAttribute("aria-expanded", !st.hidden); renderSettings(); renderProfile(); if (!st.hidden) window.scrollTo(0, 0); };
$("settingsClose").onclick = () => { $("settings").hidden = true; $("settingsBtn").setAttribute("aria-expanded", false); };
$("settingsSummary").onclick = () => openSummary();
$("showWelcomeBtn").onclick = () => { $("settings").hidden = true; showWelcome(true); };
$("segStyle").onclick = e => { const b = e.target.closest("button"); if (!b) return; devSet(LS_STYLE, b.dataset.v); applyTheme(); renderSettings(); };
$("segTheme").onclick = e => { const b = e.target.closest("button"); if (!b) return; devSet(LS_THEME, b.dataset.v); applyTheme(); renderSettings(); };
$("segBig").onclick = e => { const b = e.target.closest("button"); if (!b) return; devSet(LS_BIG, b.dataset.v === "on"); applyTheme(); renderSettings(); };
$("segUnit").onclick = e => { const b = e.target.closest("button"); if (!b) return; prefs.unit = b.dataset.v; savePrefs(); renderSettings(); render(); if (page === "stats") renderStats(); toast("Gewichten in " + U()); };
$("gEx").addEventListener("change", goalFormSync);
$("gType").addEventListener("change", goalFormSync);
$("goalForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("gEx").value, type = $("gType").value || goalTypesFor(name)[0], gt = GOAL_TYPES[type];
  const num = id => parseFloat(String($(id).value.trim() || "").replace(",", "."));
  let v = type === "race" ? RACES[name].km : num("gKg"); const v2 = gt.unit2 ? num("gV2") : undefined;
  if (type === "race" && !($("gDate").value > today())){ toast("Kies de datum van je wedstrijd."); return; }
  if (!(v > 0)){ toast("Vul een doel in."); return; }
  if (gt.unit2 && !(v2 > 0)){ toast(gt.unit2 === "min" ? "Vul ook de tijd in minuten in." : "Vul ook het aantal reps in."); return; }
  if (gt.unit === "w") v = fromU(v);
  const goal = { name, type, v, date: type === "freq" ? "" : $("gDate").value || addDays(today(), 84) };
  if (v2 != null) goal.v2 = v2;
  if (type === "body") goal.start = latestBw() || v;
  // One goal per exercise: a new goal for the same exercise replaces the old one, in its place.
  const goals = prefs.goals || [], same = g => g.name === name && (type !== "body" || g.date === goal.date), at = goals.findIndex(same);
  prefs.goals = at < 0 ? goals.concat([goal]) : goals.map((g, i) => i === at ? goal : g).filter((g, i) => i === at || !same(g));
  savePrefs(); $("gKg").value = ""; $("gV2").value = ""; if (type === "race") renderPlanning(); else renderGoals(); toast(at < 0 ? "Doel toegevoegd" : "Doel aangepast");
});
$("shareSheetClose").onclick = () => { $("shareSheet").hidden = true; };
$("shareSheet").addEventListener("click", e => { if (e.target.id === "shareSheet") $("shareSheet").hidden = true; });
$("repPrev").onclick = () => { repMonth = prevMonth(repMonth); renderReport(); };
$("repNext").onclick = () => { const [y, m] = repMonth.split("-").map(Number); const d = new Date(y, m, 1); repMonth = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"); renderReport(); };
$("volGroup").addEventListener("change", renderVolume);
let logFilter = "all", logSearchTimer;
const logOpen = new Set(), logMonths = new Map();   // Logboek: trainings and months you opened or closed
$("logSearch").addEventListener("input", () => { clearTimeout(logSearchTimer); logSearchTimer = setTimeout(renderStats, 150); });
$("logFilter").onclick = e => { const b = e.target.closest("button"); if (!b) return; logFilter = b.dataset.v;
  $("logFilter").querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); renderStats(); };
// ---------- Stand-alone: backup file and offline app ----------
function exportBackup(){
  const data = backupData();
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: "application/json" }));
  a.download = `fpt-backup-${today()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 3000);
  lsSet("ppl.lastBackup", today());
  toast("Back-up gedownload. Bewaar het bestand op een veilige plek.");
}
// A back-up (file or move link): only this app's own keys, as text; anything else in it is ignored.
function restoreItems(d){
  if (!d || d.app !== "FPT" || !d.items || typeof d.items !== "object") return false;
  const items = Object.entries(d.items).filter(([k, v]) => /^ppl\.[\w.-]{1,40}$/.test(k) && typeof v === "string" && v.length < 5e6);
  if (!items.length) return false;
  try { items.forEach(([k, v]) => { JSON.parse(v); }); } catch { return false; }
  items.forEach(([k, v]) => localStorage.setItem(k, v));
  localStorage.removeItem(SYNC_LS);   // the back-up is added to your account, it does not count as deleting what it lacks
  return true;
}
function backupData(){
  const data = { app: "FPT", version: 1, date: new Date().toISOString(), items: {} };
  for (let i = 0; i < localStorage.length; i++){ const k = localStorage.key(i); if (k && k.startsWith("ppl.")) data.items[k] = localStorage.getItem(k); }
  return data;
}
function importBackup(file){
  if (file.size > 20e6) return void toast("Dit is geen geldige FPT-back-up.");
  const r = new FileReader();
  r.onload = () => {
    let ok = false; try { ok = restoreItems(JSON.parse(r.result)); } catch {}
    if (!ok) return void toast("Dit is geen geldige FPT-back-up.");
    toast("Back-up teruggezet. De app laadt opnieuw.");
    setTimeout(() => location.reload(), 900);
  };
  r.readAsText(file);
}
if (STANDALONE){
  $("backupRow").hidden = false; $("backupNote").hidden = false; $("wipeRow").hidden = false; $("privacyNote").hidden = false;
  $("wipeBtn").onclick = wipeDevice;
  $("backupDl").onclick = exportBackup;
  $("backupFile").addEventListener("change", e => { const f = e.target.files[0]; if (f) importBackup(f); e.target.value = ""; });
  if ("serviceWorker" in navigator){
    // sw.js serves the app from the cache; when a new version has taken over, offer to switch to it now
    const hadSw = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener("controllerchange", () => { if (hadSw) toast("Er is een nieuwe versie van FPT.", () => location.reload(), "Vernieuwen"); });
    navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).then(reg => {
      // an app that stays open for days (phone, PC) still looks for a new version when you come back to it
      document.addEventListener("visibilitychange", () => { if (!document.hidden) reg.update().catch(() => {}); });
    }).catch(() => {});
  }
}
// ---------- Install as an app: phone, tablet or PC (Chrome, Edge, Samsung Internet; Safari via its own menu) ----------
let installEvt = window.FPT_INSTALL || null;
const appMode = () => ["standalone", "window-controls-overlay", "minimal-ui"].some(m => matchMedia(`(display-mode: ${m})`).matches) || navigator.standalone === true;
function renderInstall(){
  const row = $("installRow"), note = $("installNote");
  if (!STANDALONE || appMode()){ row.hidden = note.hidden = true; return; }
  const ua = navigator.userAgent, ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const macSafari = !ios && /Macintosh/.test(ua) && /Safari\//.test(ua) && !/Chrome|Chromium|Edg|Firefox|OPR/.test(ua);
  const tip = installEvt ? "Dan opent FPT in een eigen venster, zonder adresbalk, en werkt hij ook zonder internet."
    : ios ? (/CriOS|FxiOS|EdgiOS/.test(ua) ? "Op iPhone en iPad: tik op Deel (het vierkantje met de pijl) en kies Zet op beginscherm. Lukt dat niet, open deze pagina dan in Safari." : "Op iPhone en iPad: tik in Safari op Deel (het vierkantje met de pijl) en kies Zet op beginscherm.")
    : macSafari ? "Op een Mac: kies in Safari Archief → Voeg toe aan Dock."
    : /Firefox\//.test(ua) && !/Android/.test(ua) ? "Firefox installeert geen apps. Open deze pagina in Chrome of Edge om FPT als app te installeren, of gebruik hem hier gewoon als website."
    : "Kies in het menu van je browser App installeren of Toevoegen aan startscherm.";
  row.hidden = false; $("installBtn").hidden = !installEvt; note.hidden = false; note.textContent = tip;
}
window.addEventListener("beforeinstallprompt", e => { installEvt = e; renderInstall(); });
window.addEventListener("appinstalled", () => { installEvt = null; renderInstall(); toast("FPT is geïnstalleerd. Je vindt de app bij je andere apps."); });
$("installBtn").onclick = async () => {
  const e = installEvt; if (!e) return;
  installEvt = null;
  try { await e.prompt(); await e.userChoice; } catch {}
  renderInstall();
};
renderInstall();
try { claude.use("mcp").then(m => { mcpNs = m; if (m) renderWeek(); }).catch(() => {}); } catch {}
applyTheme();
$("chartEx").addEventListener("change", e => { statsEx = e.target.value; renderStats(); });
$("chartAllToggle").addEventListener("click", () => { statsAll = !statsAll; renderStats(); });
let resizeTimer;
// PC: the mouse wheel also scrolls the rows that only scroll sideways (day tabs, the jump bar in Analytics).
["days", "statsJump"].forEach(id => $(id).addEventListener("wheel", e => {
  const row = e.currentTarget, max = row.scrollWidth - row.clientWidth;
  if (e.ctrlKey || !max || Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
  if ((e.deltaY < 0 && row.scrollLeft <= 0) || (e.deltaY > 0 && row.scrollLeft >= max - 1)) return;
  row.scrollLeft += e.deltaY; e.preventDefault();
}, { passive: false }));
try { document.fonts.ready.then(() => { fitTabs(); if (page === "train") renderSchemes(); }); } catch {}
window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { fitTabs(); if (page === "train") renderSchemes(); if (page === "stats") renderStats(); }, 150); });
$("editToggle").onclick =() => { editing = !editing; renderDayTools(); renderExercises(); };
// Shuffle: a new random order for the exercises you have not done yet; what you already did stays on top.
$("durBtn").onclick = () => { durOpen = !durOpen; renderDayTools(); };
$("restEachBtn").setAttribute("aria-pressed", restEach);
$("restEachBtn").onclick = () => {
  restEach = !restEach; lsSet("ppl.restEach", restEach);
  document.body.classList.toggle("rest-each", restEach);
  $("restEachBtn").setAttribute("aria-pressed", restEach); renderExercises();
};
$("shuffleBtn").onclick = () => {
  const s = scheme(), key = dayKey(s, view.day), items = exercisesFor(s, view.day).map(e => e.slice());
  const finished = e => { const k = keyOf(e[0]); return sessionSets(k).length > 0 || sessionCardio(e[0]).length > 0 || isMarked("done", k) || isSkipped(k); };
  const done = items.filter(finished), open = items.filter(e => !finished(e));
  if (open.length < 2){ toast("Er valt niets te husselen."); return; }
  const before = open.map(e => e[0]).join("|");
  for (let tries = 0; tries < 5; tries++){
    for (let i = open.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [open[i], open[j]] = [open[j], open[i]]; }
    if (open.map(e => e[0]).join("|") !== before) break;
  }
  const sn = takeSnapshot();
  layouts = Object.assign({}, layouts, { [key]: done.concat(open) }); saveLayouts();
  expanded.clear(); focusKey = null; renderExercises();   // focus mode: back to the first exercise, which is now another one
  undoToast("Volgorde gehusseld", sn);
};
$("addForm").addEventListener("submit", addExercise);
$("addName").addEventListener("change", prefillKnown);
let addNameTimer;
$("addName").addEventListener("input", () => { clearTimeout(addNameTimer); addNameTimer = setTimeout(renderAddNameList, 150); });
$("resetDay").onclick = () => {
  const copy = Object.assign({}, layouts); delete copy[dayKey(scheme(), view.day)];
  layouts = copy; saveLayouts(); renderExercises(); toast("Standaardvolgorde hersteld");
};


// ---------- Friends: share schemes and goals by link; per friend an eye decides what they see ----------
// Nothing goes to a server: the shared data travels inside the link (after the #), in WhatsApp or a text message.
const SHARE_BASE = APP_HOME;
const EYE_ON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>`;
const EYE_OFF = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.6 9.6 0 0 0 4.4-1.1M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>`;
const goalKey = g => [g.name, g.type, g.date || ""].join("|");
const goalLabel = name => name === "__body" ? "Lichaamsgewicht" : name === "__freq" ? "Trainingen per week" : RACES[name] ? RACES[name].label : name;
function shareables(){
  const cur = scheme(), list = [{ k: "s:" + cur.id, kind: "s", label: cur.name, s: cur }];
  (prefs.custom || []).forEach(c => { if (c.id !== cur.id) list.push({ k: "s:" + c.id, kind: "s", label: c.name, s: c }); });
  (prefs.goals || []).forEach(g => list.push({ k: "g:" + goalKey(g), kind: "g", label: goalLabel(g.name), g }));
  return list;
}
// Schemes are shared unless you close the eye; goals stay private until you open it.
const isShown = (f, it) => f.show && it.k in f.show ? !!f.show[it.k] : it.kind === "s";
function sharePayload(f){
  const items = shareables().filter(it => isShown(f, it));
  return { v: 1, from: (prefs.myName || "").slice(0, 40), d: today(),
    s: items.filter(it => it.kind === "s").map(({ s: sc }) => ({ id: sc.id, n: sc.name, note: (sc.note || "").slice(0, 200),
      days: sc.days.map((d, i) => ({ n: d.name, f: (d.focus || "").slice(0, 140), ex: exercisesFor(sc, i).map(e => e.slice(0, 6)) })).filter(d => d.ex.length) })).filter(x => x.days.length),
    g: items.filter(it => it.kind === "g").map(({ g }) => { const ev = goalEval(g); return { n: g.name, t: ev.type, c: ev.curText, tg: ev.targetText, p: ev.pct, d: g.date || "" }; }) };
}
const b64u = bytes => { let t = ""; for (let i = 0; i < bytes.length; i += 0x8000) t += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
const unb64u = str => { const t = atob(str.replace(/-/g, "+").replace(/_/g, "/")), b = new Uint8Array(t.length); for (let i = 0; i < t.length; i++) b[i] = t.charCodeAt(i); return b; };
async function packShare(obj){
  const raw = new TextEncoder().encode(JSON.stringify(obj));
  if (typeof CompressionStream === "function"){
    try { return "z" + b64u(new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream("deflate-raw"))).arrayBuffer())); } catch {}
  }
  return "j" + b64u(raw);
}
async function unpackShare(str, max = 3e5){
  let b = unb64u(str.slice(1));
  if (str[0] === "z"){
    // read at most `max` (300 KB for a shared link), so a crafted link cannot blow up
    const r = new Blob([b]).stream().pipeThrough(new DecompressionStream("deflate-raw")).getReader(), parts = []; let n = 0;
    for (;;){ const { done, value } = await r.read(); if (done) break; n += value.length; if (n > max){ r.cancel(); throw new Error("big"); } parts.push(value); }
    b = new Uint8Array(n); let o = 0; parts.forEach(x => { b.set(x, o); o += x.length; });
  } else if (str[0] !== "j") throw new Error("bad");
  return JSON.parse(new TextDecoder().decode(b), (k, x) => k === "__proto__" ? undefined : x);
}
// A shared link is someone else's data: keep only plain text of limited length, and only known exercise types.
function cleanShare(o){
  if (!o || o.v !== 1) return null;
  const S = (v, n) => typeof v === "string" ? v.slice(0, n) : "", day = v => /^\d{4}-\d{2}-\d{2}$/.test(S(v, 10)) ? v : "";
  const types = new Set(SCHEMES.flatMap(sc => sc.days.flatMap(d => d.ex.map(e => e[4]))).concat(LIB.map(l => l[1])));
  const modes = new Set(["", "bw", "time", "cardio", "yoga", "kine", "mind"]);
  const sch = (Array.isArray(o.s) ? o.s : []).slice(0, 8).map(x => ({ id: S(x && x.id, 40), n: S(x && x.n, 50) || "Schema", note: S(x && x.note, 200),
    days: (Array.isArray(x && x.days) ? x.days : []).slice(0, 7).map(d => ({ n: S(d && d.n, 40) || "Dag", f: S(d && d.f, 140),
      ex: (Array.isArray(d && d.ex) ? d.ex : []).slice(0, 25).filter(Array.isArray).map(e => [S(e[0], 60), S(e[1], 4) || "3", S(e[2], 14), S(e[3], 14), types.has(e[4]) ? e[4] : "push", modes.has(e[5] || "") ? e[5] || "" : ""]).filter(e => e[0].trim()) })).filter(d => d.ex.length) })).filter(x => x.days.length);
  const goals = (Array.isArray(o.g) ? o.g : []).slice(0, 20).map(x => ({ n: S(x && x.n, 60), t: S(x && x.t, 12), c: S(x && x.c, 40), tg: S(x && x.tg, 40),
    p: Math.max(0, Math.min(100, Math.round(+(x && x.p) || 0))), d: day(x && x.d) })).filter(x => x.n);
  return { from: S(o.from, 40).trim() || "Een vriend", d: day(o.d) || today(), s: sch, g: goals, seen: false };
}
function renderFriends(){
  // your last workout, ready for Instagram or Strava
  const lastDone = Object.keys(log).sort().reverse().find(d => Object.keys(log[d].ex || {}).length || (log[d].cardio || []).length);
  $("frShare").innerHTML = lastDone ? `<section class="share-today"><p class="label">Deel je training</p><p class="note">${esc(longDate(lastDone))} · ${esc(daySummary(lastDone).title)}</p>
    <div class="share-row"><button class="share-btn sb-ig" type="button" data-tsh="ig"><span aria-hidden="true">◎</span> Instagram</button><button class="share-btn sb-strava" type="button" data-tsh="strava"><span aria-hidden="true">▲</span> Strava</button></div></section>` : "";
  $("frShare").querySelectorAll("[data-tsh]").forEach(b => b.onclick = () => { openShareSheet(lastDone); const go = $("shareSheet").querySelector(`[data-sh="${b.dataset.tsh}"]`); if (go) go.click(); });
  // one choice for everyone; you pick the friend in WhatsApp itself
  const items = shareables(), f = { show: prefs.shareShow };
  $("frList").innerHTML = `<div class="fr-card">
      <p class="label">Zichtbaar voor je vrienden</p>
      ${items.length ? `<ul class="fr-items">${items.map(it => { const on = isShown(f, it); return `<li class="${on ? "" : "off"}"><button type="button" class="eye" data-k="${esc(it.k)}" aria-pressed="${on}" aria-label="${on ? "Zichtbaar: tik om te verbergen" : "Verborgen: tik om te tonen"}">${on ? EYE_ON : EYE_OFF}</button><small class="fr-kind">${it.kind === "s" ? "Schema" : "Doel"}</small><span>${esc(it.label)}</span></li>`; }).join("")}</ul>`
        : `<p class="note">Nog niets om te delen: kies een schema of maak een doel.</p>`}
      <div class="share-row fr-share"><button class="share-btn sb-wa" type="button" data-frs="wa"><span aria-hidden="true">✆</span> WhatsApp</button><button class="share-btn" type="button" data-frs="copy"><span aria-hidden="true">⧉</span> Kopieer link</button></div>
    </div>`;
  $("frList").querySelectorAll(".eye").forEach(b => b.onclick = () => { prefs.shareShow = Object.assign({}, prefs.shareShow, { [b.dataset.k]: b.getAttribute("aria-pressed") !== "true" }); savePrefs(); renderFriends(); });
  $("frList").querySelectorAll("[data-frs]").forEach(b => b.onclick = () => shareWithFriends(f, b.dataset.frs));
  const inbox = prefs.fromFriends || [];
  $("frInbox").innerHTML = inbox.length ? `<div class="fr-in"><h3>Gedeeld met jou</h3>${inbox.map((x, i) => `<div class="fr-card" data-ii="${i}">
      <div class="fr-top"><span class="fr-av" aria-hidden="true">${esc((x.from[0] || "?").toUpperCase())}</span><b>${esc(x.from)}</b><small>${esc(shortDate(x.d))}</small><button type="button" class="goal-x" data-ix aria-label="Verwijderen">×</button></div>
      ${x.s.map((sc, j) => `<div class="fr-sch"><div><b>${esc(sc.n)}</b><small>${sc.days.length === 1 ? "1 dag" : `${sc.days.length} dagen`} · ${esc(sc.days.map(d => d.n).join(", "))}</small></div><button class="ghost" type="button" data-add="${j}">Toevoegen</button></div>`).join("")}
      ${x.g.map(g => `<div class="goal"><div class="goal-top"><b>${esc(goalLabel(g.n))}</b><span>${esc(g.c)} / ${esc(g.tg)}${g.d ? ` · tegen ${esc(shortDate(g.d))}` : ""}</span></div><div class="mb-track"><div class="mb-fill" style="width:${g.p}%"></div></div></div>`).join("")}
    </div>`).join("")}</div>` : "";
  $("frInbox").querySelectorAll("[data-ii]").forEach(card => {
    const x = inbox[+card.dataset.ii];
    card.querySelector("[data-ix]").onclick = () => { prefs.fromFriends = inbox.filter(y => y !== x); savePrefs(); renderFriends(); };
    card.querySelectorAll("[data-add]").forEach(b => b.onclick = () => addSharedScheme(x.s[+b.dataset.add], x.from));
  });
  if (inbox.some(x => !x.seen)){ inbox.forEach(x => { x.seen = true; }); savePrefs(); }
  friendsBadge();
}
const friendsBadge = () => $("friendsBtn").classList.toggle("has-new", (prefs.fromFriends || []).some(x => !x.seen));
function addSharedScheme(x, from){
  const id = "c" + Date.now().toString(36);
  prefs.custom = (prefs.custom || []).concat([{ id, name: `${x.n} (${from})`.slice(0, 60), note: x.note || `Gedeeld door ${from}.`,
    days: x.days.map(d => ({ name: d.n, focus: d.f, ex: d.ex.map(e => e.slice()) })) }]);
  savePrefs(); render();
  toast(`${x.n} staat nu bij je schema's.`);
}
async function shareWithFriends(f, how){
  const data = sharePayload(f);
  if (!data.s.length && !data.g.length) return void toast("Zet minstens één oogje open om iets te delen.");
  const link = SHARE_BASE + "#share=" + await packShare(data);
  const text = tr("Bekijk mijn schema's en doelen in Fitness Progress Tracker:") + "\n" + link;
  if (how === "copy"){ try { await navigator.clipboard.writeText(link); toast("Link gekopieerd."); } catch { prompt("Kopieer de link", link); } return; }
  // no number: WhatsApp opens its own contact list
  window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank", "noopener");
}
function openFriends(){
  $("settings").hidden = true; $("settingsBtn").setAttribute("aria-expanded", false);
  $("friends").hidden = false; $("friendsBtn").setAttribute("aria-expanded", true);
  renderFriends(); renderLinks(); refreshLinks(); window.scrollTo(0, 0);
}
function closeFriends(){ $("friends").hidden = true; $("friendsBtn").setAttribute("aria-expanded", false); }
$("friendsBtn").onclick = () => $("friends").hidden ? openFriends() : closeFriends();
$("friendsClose").onclick = closeFriends;
// Opening a shared link: keep what a friend shared under Vrienden → Gedeeld met jou.
(async () => {
  const m = /^#share=([A-Za-z0-9_-]{2,60000})$/.exec(location.hash); if (!m) { friendsBadge(); return; }
  try { history.replaceState(null, "", location.pathname + location.search); } catch {}
  let data = null; try { data = cleanShare(await unpackShare(m[1])); } catch {}
  if (!data || (!data.s.length && !data.g.length)) return void toast("Deze gedeelde link kan niet gelezen worden.");
  prefs.fromFriends = [data].concat((prefs.fromFriends || []).filter(x => x.from !== data.from)).slice(0, 20); savePrefs();
  if ($("welcome").hidden) openFriends(); else friendsBadge();
  toast(`${data.from} deelt schema's en doelen met je.`);
})();

// ---------- New address: the old one offers to move, the new one takes your data over ----------
// Your data lives per web address, so it travels inside the link (after the #: it never reaches a server).
// build.py sets FPT_MOVE_TO; the card only shows once the new address really serves FPT (not a registrar's parking page).
const MOVE_TO = window.FPT_MOVE_TO || "";
if (STANDALONE && MOVE_TO && new URL(MOVE_TO).origin !== location.origin){
  fetch(MOVE_TO + "manifest.webmanifest", { cache: "no-store" }).then(r => r.json()).then(m => {
    if (m.name !== "Fitness Progress Tracker") return;
    const box = $("moveCard");
    box.innerHTML = `<h2>FPT heeft een nieuw adres</h2><p class="move-host" translate="no">${esc(new URL(MOVE_TO).host)}</p>
      <p>Open de app voortaan op het nieuwe adres. Tik op de knop: je gegevens van dit toestel gaan mee.</p>
      <button class="save" type="button" id="moveBtn">Verhuizen met je gegevens</button>
      <p class="note">Installeerde je FPT als app? Installeer hem daarna opnieuw vanaf het nieuwe adres en verwijder de oude.</p>`;
    box.hidden = false;
    $("moveBtn").onclick = async () => { location.href = MOVE_TO + "#move=" + await packShare(backupData()); };
  }).catch(() => {});
}
(async () => {
  const m = /^#move=([A-Za-z0-9_-]{2,8000000})$/.exec(location.hash); if (!m) return;
  try { history.replaceState(null, "", location.pathname + location.search); } catch {}
  let d = null; try { d = await unpackShare(m[1], 20e6); } catch {}
  if (!d || d.app !== "FPT") return void toast("Deze verhuislink kan niet gelezen worden.");
  // a link can come from anyone: always ask before it replaces what is here
  if (!confirm(tr(Object.keys(log).length ? "Je gegevens van het oude adres overnemen? Wat nu op dit adres staat, wordt vervangen." : "Je gegevens van het oude adres overnemen?"))) return;
  if (!restoreItems(d)) return void toast("Deze verhuislink kan niet gelezen worden.");
  toast("Je gegevens zijn verhuisd. De app laadt opnieuw.");
  setTimeout(() => location.reload(), 900);
})();

// Opening the app on a new day: jump to the next day of your scheme.
const autoClosed = autoCloseWorkout();
if (!inWorkout()){ const nx = nextDayIndex(scheme()); if (nx) view.day = nx.idx; }
if (autoClosed) setTimeout(() => toast("Je vorige training werd automatisch afgesloten."), 400);
if (devRestore()){ focusOn = lsGet("ppl.focus", true); applyTheme(); }
const answeredBefore = lsGet("ppl.welcomed", false) || Object.keys(log).length || prefs.trainGoal || prefs.daysPerWeek || (prefs.profile && (prefs.profile.age || prefs.profile.birth));
if (!answeredBefore) showWelcome();
render();
showPage(inWorkout() ? "train" : "today");
setStore(false, "Opgeslagen op dit toestel.");


// ---------- Account for the stand-alone app: Supabase, log in with a code by mail, your data per user ----------
// The publishable key is meant to be public; row level security in the database lets each user reach only their own rows.
const SB_URL = "https://vcbyebuhmefyydevjsur.supabase.co", SB_KEY = "sb_publishable_cupM_aiMLcFREDDAlqQhCw_GUk45Cko", SB_LS = "fpt.sb";
let sbGoogle = false;
let sbSession = (() => { try { return JSON.parse(localStorage.getItem(SB_LS) || "null"); } catch { return null; } })(), sbMail = "";
// Asking for a login (mail or Google) leaves a mark, so a link with someone else's session is not taken over unseen.
const SB_WAIT = "fpt.sbWait", sbAsked = () => { try { localStorage.setItem(SB_WAIT, String(Date.now())); } catch {} };
const sbSave = x => { sbSession = x; try { x ? localStorage.setItem(SB_LS, JSON.stringify(x)) : localStorage.removeItem(SB_LS); } catch {} };
async function sbAuth(path, body){
  const r = await fetch(SB_URL + "/auth/v1/" + path, { method: "POST", headers: { apikey: SB_KEY, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(j.msg || j.error_description || j.message || "auth"), { status: r.status });
  return j;
}
const sbKeep = j => sbSave({ access_token: j.access_token, refresh_token: j.refresh_token, expires_at: j.expires_at || Math.floor(Date.now() / 1000) + (j.expires_in || 3600), user: { id: j.user.id, email: j.user.email } });
async function sbToken(){
  if (!sbSession) return null;
  if (sbSession.expires_at - 60 > Date.now() / 1000) return sbSession.access_token;
  try { sbKeep(await sbAuth("token?grant_type=refresh_token", { refresh_token: sbSession.refresh_token })); return sbSession.access_token; }
  catch (e) { if (e.status === 400 || e.status === 401) sbSave(null); throw e; }
}
async function sbRest(method, query, body){
  const t = await sbToken(); if (!t) throw new Error("login");
  const headers = { apikey: SB_KEY, Authorization: "Bearer " + t, "Content-Type": "application/json" };
  if (method === "POST") headers.Prefer = "resolution=merge-duplicates,return=minimal";
  const r = await fetch(SB_URL + "/rest/v1/fpt_store" + query, { method, headers, body: body ? JSON.stringify(body) : undefined });
  if (!r.ok) throw new Error("rest " + r.status);
  return method === "GET" ? r.json() : null;
}
// The same small document API the app uses on claude.ai, on top of one table of (user, key, value).
function sbDoc(key){
  return {
    async get(){ const rows = await sbRest("GET", `?select=value&key=eq.${encodeURIComponent(key)}`); return { exists: rows.length > 0, data: () => rows[0] && rows[0].value }; },
    set: value => sbRest("POST", "?on_conflict=user_id,key", { user_id: sbSession.user.id, key, value, updated_at: new Date().toISOString() }),
    delete: () => sbRest("DELETE", `?key=eq.${encodeURIComponent(key)}`),
    collection: name => ({
      doc: id => sbDoc(`${key}/${name}/${id}`),
      limit: () => ({ async get(){ const pre = `${key}/${name}/`, rows = await sbRest("GET", `?select=key,value&key=like.${encodeURIComponent(pre)}*`); return { docs: rows.map(r => ({ id: r.key.slice(pre.length), data: () => r.value })) }; } })
    })
  };
}
async function cloudStore(){
  if (!sbSession || !(await sbToken())) return null;
  const uid = sbSession.user.id;
  return { uid, db: { doc: path => sbDoc(path.replace("data/users/" + uid + "/", "")) } };
}
function renderAccount(){
  const box = $("acctBox"); if (!box) return;
  $("backupNote").hidden = !!sbSession;   // "only on this device" is no longer true once you are logged in
  box.hidden = false;
  if (sbSession){
    box.innerHTML = `<p class="acct-h">Account</p><p class="note">Ingelogd als <b translate="no">${esc(sbSession.user.email || "")}</b>. Je trainingen worden gesynchroniseerd tussen al je toestellen.</p>
      <div class="entry-row"><button class="ghost wide" type="button" id="acctSync">Nu synchroniseren</button><button class="ghost wide" type="button" id="acctOut">Uitloggen</button></div>
      <button class="acct-del" type="button" id="acctDel">Account verwijderen</button>`;
    $("acctSync").onclick = () => connectStore();
    $("acctDel").onclick = deleteAccount;
    $("acctOut").onclick = () => {
      sbSave(null); recordsRef = prefsRef = layoutRef = logCol = null;
      setStore(false, "Uitgelogd. Je gegevens blijven op dit toestel staan."); renderAccount();
    };
  } else if (sbMail){
    box.innerHTML = `<p class="acct-h">Account</p><p class="note">We stuurden een mail naar <b translate="no">${esc(sbMail)}</b>. Kijk ook in je spam. Tik op de link in de mail; daarna ben je ingelogd. Opende de link in je browser, kom dan terug naar de app.</p>
      <button class="save" type="button" id="acctCheck">Ik heb op de link getikt</button>
      <p class="note"><b>Lukt dat niet?</b> Tik niet op de link, maar hou hem ingedrukt in de mail en kies <b>Link kopiëren</b>. Plak hem hieronder.</p>
      <form class="acct-form" id="acctLinkForm"><input id="acctLink" type="url" inputmode="url" autocomplete="off" placeholder="https://…supabase.co/auth/v1/verify?…" aria-label="Link uit de mail" required><button class="save" type="submit">Inloggen met link</button></form>
      <p class="note">Staat er een code in de mail? Vul die dan hier in.</p>
      <form class="acct-form" id="acctCodeForm"><input id="acctCode" inputmode="numeric" autocomplete="one-time-code" maxlength="10" placeholder="123456" aria-label="Code uit de mail" required><button class="save" type="submit">Inloggen</button></form>
      <button class="ghost-sm acct-back" type="button" id="acctBack">Ander e-mailadres</button>`;
    $("acctBack").onclick = () => { sbMail = ""; renderAccount(); };
    $("acctLinkForm").onsubmit = async e => {
      e.preventDefault();
      let u = null; try { u = new URL($("acctLink").value.trim()); } catch {}
      const token = u && (u.searchParams.get("token") || u.searchParams.get("token_hash")), type = (u && u.searchParams.get("type")) || "magiclink";
      if (!token){ toast("Dat is geen inloglink uit de mail. Kopieer de link achter Sign in."); return; }
      try { sbKeep(await sbAuth("verify", { type, token_hash: token })); sbMail = ""; toast("Ingelogd. Je gegevens worden gesynchroniseerd."); renderAccount(); connectStore(); }
      catch (err) { toast(err.status === 429 ? "Even wachten en dan opnieuw proberen." : "Die link werkt niet meer (al gebruikt of verlopen). Vraag een nieuwe aan."); }
    };
    $("acctCheck").onclick = () => { if (!sbAdopt()) toast("Nog niet ingelogd. Tik op de link in de mail en kom dan terug, of sluit de app en open hem opnieuw."); };
    $("acctCodeForm").onsubmit = async e => {
      e.preventDefault();
      const token = $("acctCode").value.replace(/\s/g, "");
      try { sbKeep(await sbAuth("verify", { type: "email", email: sbMail, token })); sbMail = ""; toast("Ingelogd. Je gegevens worden gesynchroniseerd."); renderAccount(); connectStore(); }
      catch (err) { toast(err.status === 429 ? "Even wachten en dan opnieuw proberen." : "Die code klopt niet of is verlopen. Vraag een nieuwe aan."); }
    };
  } else {
    box.innerHTML = `<p class="acct-h">Account</p>${sbGoogle ? `<p class="note">Log in om je trainingen op al je toestellen te bewaren.</p>
      <button class="g-btn" type="button" id="acctGoogle"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.7z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z"/></svg><span>Doorgaan met Google</span></button>
      <p class="note acct-or">Of met een inloglink per mail:</p>` : ""}<p class="note">${sbGoogle ? "" : "Log in met je e-mailadres om je trainingen op al je toestellen te bewaren. "}Je krijgt een mail met een inloglink; een wachtwoord is niet nodig.</p>
      <form class="acct-form" id="acctForm"><input type="email" id="acctMail" autocomplete="email" placeholder="jij@voorbeeld.be" aria-label="E-mailadres" required><button class="save" type="submit">Stuur inloglink</button></form>`;
    if ($("acctGoogle")) $("acctGoogle").onclick = () => {
      sbAsked();
      location.href = `${SB_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(location.origin + location.pathname)}`;
    };
    $("acctForm").onsubmit = async e => {
      e.preventDefault();
      const email = $("acctMail").value.trim();
      try { await sbAuth("otp", { email, create_user: true }); sbAsked(); sbMail = email; renderAccount(); toast("Mail verstuurd. Kijk in je mailbox."); }
      catch (err) { toast(err.status === 429 ? "Je vroeg te veel codes aan. Probeer het over een uur opnieuw." : "Versturen lukt niet. Controleer je e-mailadres en je verbinding."); }
    };
  }
}
// Your account and everything in it, for good (supabase/functions/account). What is on this device stays, unless you wipe it.
async function deleteAccount(){
  if (!sbSession || !confirm(tr("Je account en alle gegevens in je account definitief verwijderen? Dit kan niet ongedaan worden. Wat op dit toestel staat, blijft staan."))) return;
  const b = $("acctDel"); if (b) b.disabled = true;
  try { await sbFn("account", { action: "delete" }); }
  catch { if (b) b.disabled = false; toast("Verwijderen lukte niet. Controleer je verbinding en probeer opnieuw."); return; }
  sbSave(null); recordsRef = prefsRef = layoutRef = logCol = null;
  try { localStorage.removeItem(SYNC_LS); } catch {}
  delete links().strava; savePrefs();
  setStore(false, "Je account is verwijderd. Je gegevens staan nog op dit toestel."); renderAccount(); renderLinks();
  toast("Je account is verwijderd.");
}
// Everything FPT keeps in this browser: trainings, settings, your login. Your account (if any) is not touched.
function wipeDevice(){
  if (!confirm(tr(sbSession ? "Alle gegevens van FPT op dit toestel wissen en uitloggen? Je account en wat erin staat, blijven bestaan." : "Alle gegevens van FPT op dit toestel wissen? Dit kan niet ongedaan worden. Download eerst een back-up als je ze wilt bewaren."))) return;
  const keys = []; for (let i = 0; i < localStorage.length; i++){ const k = localStorage.key(i); if (k && /^(ppl|fpt)\./.test(k)) keys.push(k); }
  keys.forEach(k => localStorage.removeItem(k));
  try { sessionStorage.clear(); } catch {}
  toast("Alles op dit toestel is gewist. De app laadt opnieuw.");
  setTimeout(() => location.reload(), 900);
}
// Back from the sign-in link in the mail: the session is in the address after the #.
function sbFromHash(){
  const h = new URLSearchParams(location.hash.slice(1));
  if (h.get("error_description") || h.get("error")){
    try { history.replaceState(null, "", location.pathname + location.search); } catch {}
    setTimeout(() => toast("Die inloglink werkt niet meer. Vraag een nieuwe aan bij Instellingen → Account."), 600);
    return;
  }
  const at = h.get("access_token"), rt = h.get("refresh_token"); if (!at || !rt) return;
  try { history.replaceState(null, "", location.pathname + location.search); } catch {}
  let claims = {};
  try { claims = JSON.parse(new TextDecoder().decode(unb64u(at.split(".")[1]))); } catch {}
  if (!claims.sub) return;
  let asked = 0; try { asked = +localStorage.getItem(SB_WAIT) || 0; localStorage.removeItem(SB_WAIT); } catch {}
  if (Date.now() - asked > 864e5 && !confirm(tr(`Inloggen als ${claims.email || "?"}? Doe dit alleen als je zelf om deze inloglink vroeg.`))) return;
  sbSave({ access_token: at, refresh_token: rt, expires_at: +h.get("expires_at") || claims.exp || Math.floor(Date.now() / 1000) + 3600, user: { id: claims.sub, email: claims.email || "" } });
  sbMail = "";
  setTimeout(() => toast("Ingelogd. Je gegevens worden gesynchroniseerd."), 600);
}
// Logged in from the link in another tab (e.g. Chrome next to the installed app): pick that session up here too.
function sbAdopt(){
  let x = null; try { x = JSON.parse(localStorage.getItem(SB_LS) || "null"); } catch {}
  if (!x || (sbSession && sbSession.access_token === x.access_token)) return false;
  sbSession = x; sbMail = ""; renderAccount(); connectStore();
  toast("Ingelogd. Je gegevens worden gesynchroniseerd.");
  return true;
}
if (STANDALONE){
  sbFromHash(); renderAccount();
  fetch(SB_URL + "/auth/v1/settings", { headers: { apikey: SB_KEY } }).then(r => r.json()).then(j => { sbGoogle = !!(j.external && j.external.google); if (!sbSession) renderAccount(); }).catch(() => {});
  window.addEventListener("storage", e => { if (e.key === SB_LS) sbAdopt(); });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) sbAdopt(); });
}
// ---------- Linked apps: Strava (both ways; Garmin Connect through Strava); Health Connect (Samsung Health) and Apple Health need the phone apps ----------
// Strava needs a client secret, so swapping the login code and uploading run in a Supabase Edge Function
// (supabase/functions/strava). Its tokens stay on the server; prefs only remember that you are linked.
const links = () => prefs.links || (prefs.links = {});
async function sbFn(name, body){
  const t = await sbToken().catch(() => null);
  const r = await fetch(`${SB_URL}/functions/v1/${name}`, { method: "POST", headers: { apikey: SB_KEY, Authorization: "Bearer " + (t || SB_KEY), "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(j.error || "fn"), { status: r.status, code: j.error });
  return j;
}
// Strava sport per cardio type: [sport_type, indoors]
const STRAVA_SPORT = { "Loopband": ["Run", 1], "Hellingwandelen": ["Walk", 1], "Lopen": ["Run", 0], "Wandelen": ["Walk", 0], "Zwemmen": ["Swim", 0], "Zwemintervallen": ["Swim", 0], "Intervallopen": ["Run", 0], "Fietsen": ["Ride", 0], "Spinning": ["Ride", 1], "Air bike": ["Ride", 1],
  "Roeien": ["Rowing", 1], "Traploper": ["StairStepper", 1], "Crosstrainer": ["Elliptical", 1], "Arc trainer": ["Elliptical", 1], "Ligfiets": ["Ride", 1], "Stepper": ["StairStepper", 1], "VersaClimber": ["StairStepper", 1], "Curved loopband": ["Run", 1], "HIIT-intervallen": ["HighIntensityIntervalTraining", 1], "Yoga": ["Yoga", 1], "Pilates": ["Pilates", 1], "CrossFit WOD": ["Crossfit", 1] };
function stravaActivity(sm){
  const sport = !sm.exs.length && sm.cardio.length ? STRAVA_SPORT[sm.cardio[0].type] || ["Workout", 1] : ["WeightTraining", 1];
  const d = sm.start, p = n => String(n).padStart(2, "0");
  return { name: [sm.scheme, sm.title].filter(Boolean).join(" · ") || "Training", sport_type: sport[0], trainer: sport[1],
    start_date_local: `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`,
    elapsed_time: sm.mins * 60, distance: Math.round(sm.km * 1000), description: summaryText(sm) };
}
async function stravaSend(sm){
  const L = links().strava; if (!L) return false;
  const a = stravaActivity(sm);
  if ((L.sent || []).includes(a.start_date_local) || (!sm.exs.length && sm.cardio.length && sm.cardio.every(c => c.src))){ toast("Deze training staat al op Strava."); return true; }
  try {
    await sbFn("strava", { action: "upload", activity: a });
    L.sent = (L.sent || []).concat(a.start_date_local).slice(-40); savePrefs();
    toast("Training naar Strava gestuurd.");
    return true;
  } catch (e) {
    if (e.code === "unlinked" || e.code === "login"){ delete links().strava; savePrefs(); renderLinks(); toast("Strava is niet meer gekoppeld. Koppel opnieuw bij Delen → Gekoppelde apps."); }
    else toast("Naar Strava sturen lukte niet. Probeer het later opnieuw via Delen → Strava.");
    return false;
  }
}
// After Einde training: off to the linked apps, unless you tap Ongedaan maken first.
function autoSync(sm){
  const L = STANDALONE && links().strava; if (!L || L.auto === false) return;
  const at = endedAt;
  setTimeout(() => { if (endedAt === at) stravaSend(sm); }, 8000);
}

// ---------- Activities from other apps into the log: Garmin Connect → Strava → FPT, or a .fit/.tcx/.gpx file ----------
// Garmin only opens its own API to approved partners, but Garmin Connect passes every activity on to Strava.
// Each activity becomes a cardio entry, as if you logged it here: under its scheme (a run under Lopen), so records,
// calories, the week plan and the next day of the scheme count it too.
const IN_SPORT = { Run: "Lopen", TrailRun: "Lopen", VirtualRun: "Loopband", Walk: "Wandelen", Hike: "Wandelen", Ride: "Fietsen", GravelRide: "Fietsen", MountainBikeRide: "Fietsen",
  EBikeRide: "Fietsen", VirtualRide: "Spinning", Swim: "Zwemmen", Rowing: "Roeien", Elliptical: "Crosstrainer", StairStepper: "Traploper", HighIntensityIntervalTraining: "HIIT-intervallen" };
// The scheme day that fits best: the one with this cardio type whose target minutes are closest (60 min of running is a long run).
function importLabel(type, min){
  let best = null, gap = Infinity;
  allSchemes().filter(s => s.crd).forEach(s => s.days.forEach(d => d.ex.forEach(x => {
    if (x[0] !== type) return;
    const [lo, hi] = repRange(x[2]), g = min < lo ? lo - min : min > hi ? min - hi : 0;
    if (g < gap){ gap = g; best = s.name + " · " + d.name; }
  })));
  return best || "Cardio · " + type;
}
// a = { id, name, sport_type, trainer, start_date (UTC), start_date_local, moving_time, elapsed_time (s), distance (m), elevation, average_speed (m/s),
//       average_heartrate, max_heartrate, average_cadence, average_watts, calories, device_name }. Returns the new entry, or null.
function importActivity(a, src){
  const type = a.trainer && a.sport_type === "Run" ? "Loopband" : IN_SPORT[a.sport_type], t = type && cardioType(type);
  if (!t || !a.start_date) return null;
  const secs = a.moving_time || a.elapsed_time, min = Math.round(secs / 6) / 10;
  if (!(min > 0)) return null;
  const date = (a.start_date_local || "").slice(0, 10) || today();
  const end = new Date(Date.parse(a.start_date) + (a.elapsed_time || secs) * 1000).toISOString();
  const prev = log[date] || { date, days: [], ex: {} };
  // already in the log: the same activity, or the same thing you logged by hand
  if ((prev.cardio || []).some(c => c.sid === a.id || (c.type === type && Math.abs((c.min || 0) - min) <= Math.max(3, min * 0.15)))) return null;
  const keys = t[3], r1 = v => Math.round(v * 10) / 10;
  const e = { type, t: end, min, src, sid: a.id };
  if (a.distance > 0) keys.includes("m") ? e.m = Math.round(a.distance) : e.km = Math.round(a.distance / 10) / 100;
  if (a.average_speed > 0 && keys.includes("speed")) e.speed = r1(a.average_speed * 3.6);
  if (a.average_heartrate > 0) e.hr = Math.round(a.average_heartrate);
  if (a.max_heartrate > 0) e.hrmax = Math.round(a.max_heartrate);
  if (a.calories > 0) e.kcal = Math.round(a.calories);
  if (a.average_watts > 0 && keys.includes("watt")) e.watt = Math.round(a.average_watts);
  if (a.average_cadence > 0) keys.includes("rpm") ? e.rpm = Math.round(a.average_cadence) : /Run|Walk|Hike/.test(a.sport_type) && (e.cad = Math.round(a.average_cadence * (a.average_cadence < 120 ? 2 : 1)));
  if (a.elevation > 0 && !a.trainer) e.elev = Math.round(a.elevation);
  if (a.name) e.name = String(a.name).slice(0, 80);
  if (a.device_name) e.dev = String(a.device_name).slice(0, 60);
  const label = importLabel(type, min);
  log = Object.assign({}, log, { [date]: Object.assign({}, prev, { days: prev.days.includes(label) ? prev.days : prev.days.concat([label]),
    cardio: (prev.cardio || []).concat([e]).sort((x, y) => x.t < y.t ? -1 : 1) }) });
  saveSession(date);
  return e;
}
function imported(list){
  if (!list.length) return;
  render(); if (page === "stats") renderStats();
  const e = list[list.length - 1], what = `${e.type}: ${cardioText(e).replace(/^[^:]+: /, "").split(" · ").slice(0, 2).join(" · ")}`;
  toast(list.length === 1 ? `In je logboek gezet: ${what}` : `${list.length} activiteiten in je logboek gezet.`);
}
// Fetch new Strava activities: on start, when the app comes back to the front (every few minutes at most) and with "Nu ophalen".
let pulledAt = 0, pulling = false;
async function stravaPull(manual){
  const L = STANDALONE && sbSession && logCol && links().strava;
  if (!L || pulling || (!manual && (L.pull === false || L.read === false || Date.now() - pulledAt < 5 * 60000))) return;
  pulling = true; pulledAt = Date.now();
  try {
    const from = Math.max(L.from || 0, Date.now() - 14 * 864e5);
    const j = await sbFn("strava", { action: "activities", after: Math.floor(from / 1000), skip: L.got || [] });
    if (!L.read){ L.read = true; savePrefs(); renderLinks(); }
    const sent = new Set(L.sent || []), got = [], added = [];
    (j.activities || []).sort((a, b) => a.start_date < b.start_date ? -1 : 1).forEach(a => {
      got.push(a.id);
      if (sent.has((a.start_date_local || "").slice(0, 19))) return;   // sent from here
      const e = importActivity(a, "strava"); if (e) added.push(e);
    });
    if (got.length){ L.got = (L.got || []).concat(got).slice(-80); savePrefs(); }
    imported(added);
    if (manual && !added.length) toast("Geen nieuwe activiteiten op Strava.");
  } catch (e) {
    if (e.code === "scope"){ L.read = false; savePrefs(); renderLinks(); if (manual) toast("Koppel Strava opnieuw en vink het lezen van je activiteiten aan."); }
    else if (e.code === "unlinked" || e.code === "login"){ delete links().strava; savePrefs(); renderLinks(); }
    else if (manual) toast("Ophalen van Strava lukte niet. Probeer het later opnieuw.");
  }
  pulling = false;
}

// A file from Garmin Connect (Exporteren: origineel .fit in een .zip, .tcx or .gpx) or another sport app.
async function importFile(file){
  try {
    let buf = new Uint8Array(await file.arrayBuffer()), name = file.name.toLowerCase();
    if (buf[0] === 0x50 && buf[1] === 0x4b){ [name, buf] = await unzipFirst(buf); }
    const text = () => new TextDecoder().decode(buf);
    const a = /\.fit$/.test(name) || String.fromCharCode(...buf.slice(8, 12)) === ".FIT" ? fitActivity(buf) : /<TrainingCenterDatabase/.test(text()) ? tcxActivity(text()) : /<gpx/.test(text()) ? gpxActivity(text()) : null;
    if (!a){ toast("Dit bestand kan FPT niet lezen. Gebruik een .fit-, .tcx- of .gpx-bestand."); return; }
    if (!IN_SPORT[a.sport_type] && !(a.trainer && a.sport_type === "Run")){ toast("Deze sport kan FPT nog niet in het logboek zetten."); return; }
    a.id = "f" + Date.parse(a.start_date);
    const e = importActivity(a, "file");
    e ? imported([e]) : toast("Deze activiteit staat al in je logboek.");
  } catch { toast("Dit bestand kan FPT niet lezen. Gebruik een .fit-, .tcx- of .gpx-bestand."); }
}
// The first .fit/.tcx/.gpx in a .zip (Garmin's "Origineel exporteren").
async function unzipFirst(b){
  const v = new DataView(b.buffer, b.byteOffset, b.byteLength);
  let eo = b.length - 22; while (eo > 0 && v.getUint32(eo, true) !== 0x06054b50) eo--;
  let p = v.getUint32(eo + 16, true);
  for (let n = v.getUint16(eo + 10, true); n--; ){
    const method = v.getUint16(p + 10, true), size = v.getUint32(p + 20, true), nl = v.getUint16(p + 28, true), xl = v.getUint16(p + 30, true), cl = v.getUint16(p + 32, true);
    const lo = v.getUint32(p + 42, true), name = new TextDecoder().decode(b.slice(p + 46, p + 46 + nl)).toLowerCase();
    p += 46 + nl + xl + cl;
    if (!/\.(fit|tcx|gpx)$/.test(name)) continue;
    const start = lo + 30 + v.getUint16(lo + 26, true) + v.getUint16(lo + 28, true), raw = b.slice(start, start + size);
    if (method === 0) return [name, raw];
    const out = await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer();
    return [name, new Uint8Array(out)];
  }
  throw new Error("zip");
}
const isoAt = ms => { const d = new Date(ms), p = n => String(n).padStart(2, "0"); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`; };
// FIT: read the session message (global 18); the totals are in there.
function fitActivity(b){
  const v = new DataView(b.buffer, b.byteOffset, b.byteLength), defs = {}, hs = b[0], end = hs + v.getUint32(4, true);
  let p = hs, ses = null, dev = "";
  const val = (o, size, le) => size === 1 ? b[o] : size === 2 ? v.getUint16(o, le) : size === 4 ? v.getUint32(o, le) : null;
  const BAD = { 1: 0xff, 2: 0xffff, 4: 0xffffffff };
  while (p < end){
    const h = b[p++];
    if (h & 0x80){ readMsg(defs[(h >> 5) & 3]); continue; }
    const local = h & 15;
    if (h & 0x40){
      const le = b[p + 1] === 0, gnum = v.getUint16(p + 2, le), nf = b[p + 4]; p += 5;
      const fields = []; for (let i = 0; i < nf; i++, p += 3) fields.push([b[p], b[p + 1]]);
      let devSize = 0; if (h & 0x20){ const nd = b[p++]; for (let i = 0; i < nd; i++, p += 3) devSize += b[p + 1]; }
      defs[local] = { le, gnum, fields, devSize };
    } else readMsg(defs[local]);
  }
  function readMsg(d){
    if (!d) throw new Error("fit");
    const m = {};
    d.fields.forEach(([num, size]) => { const x = val(p, size, d.le); if (x !== null && x !== BAD[size]) m[num] = x; p += size; });
    p += d.devSize;
    if (d.gnum === 18 && !ses) ses = m;
    if (d.gnum === 0 && m[2] && !dev) dev = m[1] === 1 ? "Garmin" : "";   // file_id: manufacturer 1 = Garmin
  }
  if (!ses || !ses[2]) return null;
  const sport = ses[5], sub = ses[6];
  const SP = { 1: sub === 1 ? "VirtualRun" : sub === 3 ? "TrailRun" : "Run", 2: sub === 6 || sub === 58 ? "VirtualRide" : "Ride", 5: "Swim", 11: "Walk", 17: "Hike", 15: "Rowing",
    4: { 1: "VirtualRun", 6: "VirtualRide", 14: "Rowing", 15: "Elliptical", 16: "StairStepper" }[sub] };
  const start = (ses[2] + 631065600) * 1000;
  return { name: "", sport_type: SP[sport] || "", trainer: sub === 1 || sub === 6 || sport === 4, start_date: new Date(start).toISOString(), start_date_local: isoAt(start),
    moving_time: (ses[8] || ses[7] || 0) / 1000, elapsed_time: (ses[7] || ses[8] || 0) / 1000, distance: (ses[9] || 0) / 100, elevation: ses[22] || 0,
    average_speed: (ses[14] || 0) / 1000, average_heartrate: ses[16] || 0, max_heartrate: ses[17] || 0, average_cadence: ses[18] || 0, average_watts: ses[20] || 0,
    calories: ses[11] || 0, device_name: dev };
}
const xmlDoc = s => new DOMParser().parseFromString(s, "application/xml");
const xnum = (el, tag) => { const x = el && el.getElementsByTagName(tag)[0]; return x ? parseFloat(x.textContent) || 0 : 0; };
function tcxActivity(s){
  const doc = xmlDoc(s), act = doc.getElementsByTagName("Activity")[0]; if (!act) return null;
  const laps = [...act.getElementsByTagName("Lap")]; if (!laps.length) return null;
  const secs = laps.reduce((a, l) => a + xnum(l, "TotalTimeSeconds"), 0), start = Date.parse(laps[0].getAttribute("StartTime"));
  const hr = laps.reduce((a, l) => a + xnum(l.getElementsByTagName("AverageHeartRateBpm")[0], "Value") * xnum(l, "TotalTimeSeconds"), 0) / (secs || 1);
  const alts = [...act.getElementsByTagName("AltitudeMeters")].map(x => parseFloat(x.textContent));
  const sport = (act.getAttribute("Sport") || "").toLowerCase(), notes = act.getElementsByTagName("Notes")[0], creator = act.getElementsByTagName("Creator")[0];
  return { name: notes ? notes.textContent.trim().split("\n")[0] : "", sport_type: sport === "running" ? "Run" : sport === "biking" ? "Ride" : "", start_date: new Date(start).toISOString(), start_date_local: isoAt(start),
    moving_time: secs, elapsed_time: secs, distance: laps.reduce((a, l) => a + xnum(l, "DistanceMeters"), 0), elevation: climb(alts),
    average_heartrate: hr, max_heartrate: Math.max(0, ...laps.map(l => xnum(l.getElementsByTagName("MaximumHeartRateBpm")[0], "Value"))),
    calories: laps.reduce((a, l) => a + xnum(l, "Calories"), 0), device_name: creator ? (creator.getElementsByTagName("Name")[0] || {}).textContent || "" : "" };
}
// metres climbed, ignoring GPS noise under 2 m
function climb(alts){ let up = 0, ref = alts.find(isFinite); alts.filter(isFinite).forEach(a => { if (a > ref + 2){ up += a - ref; ref = a; } else if (a < ref - 2) ref = a; }); return up; }
function gpxActivity(s){
  const doc = xmlDoc(s), pts = [...doc.getElementsByTagName("trkpt")].map(p => ({ lat: +p.getAttribute("lat"), lon: +p.getAttribute("lon"), t: Date.parse((p.getElementsByTagName("time")[0] || {}).textContent),
    ele: xnum(p, "ele"), hr: [...p.getElementsByTagName("*")].filter(x => /(^|:)hr$/.test(x.tagName)).map(x => +x.textContent)[0] || 0 })).filter(p => isFinite(p.t));
  if (pts.length < 2) return null;
  const R = 6371000, rad = x => x * Math.PI / 180;
  let dist = 0; for (let i = 1; i < pts.length; i++){
    const a = pts[i - 1], b = pts[i], h = Math.sin(rad(b.lat - a.lat) / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lon - a.lon) / 2) ** 2;
    dist += 2 * R * Math.asin(Math.sqrt(h));
  }
  const hrs = pts.map(p => p.hr).filter(Boolean), type = ((doc.getElementsByTagName("type")[0] || {}).textContent || "").toLowerCase(), nm = doc.getElementsByTagName("name")[0];
  const secs = (pts[pts.length - 1].t - pts[0].t) / 1000;
  return { name: nm ? nm.textContent.trim() : "", sport_type: /run/.test(type) ? "Run" : /cycl|bik|rid/.test(type) ? "Ride" : /hik/.test(type) ? "Hike" : /walk/.test(type) ? "Walk" : /swim/.test(type) ? "Swim" : "Run",
    start_date: new Date(pts[0].t).toISOString(), start_date_local: isoAt(pts[0].t), moving_time: secs, elapsed_time: secs, distance: dist, elevation: climb(pts.map(p => p.ele)),
    average_heartrate: hrs.length ? hrs.reduce((a, b) => a + b, 0) / hrs.length : 0, max_heartrate: hrs.length ? Math.max(...hrs) : 0, calories: 0,
    device_name: (doc.documentElement.getAttribute("creator") || "").slice(0, 60) };
}
function pickActivityFile(){
  const inp = document.createElement("input");
  inp.type = "file"; inp.accept = ".fit,.tcx,.gpx,.zip";
  inp.onchange = () => { if (inp.files[0]) importFile(inp.files[0]); };
  inp.click();
}

// ---------- intervals.icu: Garmin → intervals.icu → FPT, free and automatic ----------
// intervals.icu is a Garmin partner, so every activity from your watch lands there, and you can read your own
// activities with your personal API key. intervals.icu allows calls from the browser, so no server function:
// the key sits in prefs.links.intervals (your account only, row level security).
const ICU_API = "https://intervals.icu/api/v1/athlete/";
async function icuGet(L, path){
  const r = await fetch(ICU_API + encodeURIComponent(L.id || "0") + path, { headers: { Authorization: "Basic " + btoa("API_KEY:" + L.key) } });
  if (r.status === 401 || r.status === 403 || r.status === 404) throw Object.assign(new Error("icu"), { code: "key" });
  if (!r.ok) throw Object.assign(new Error("icu"), { code: "net" });
  return r.json();
}
async function icuLink(id, key){
  const raw = id.trim(), L = { id: !raw || raw === "0" ? "0" : /^\d+$/.test(raw) ? "i" + raw : raw, key: key.trim() };   // "0": the athlete of this key
  if (!L.key){ toast("Vul je API-sleutel van intervals.icu in."); return; }
  try {
    const a = await icuGet(L, "");
    const old = links().intervals || {};
    links().intervals = { id: String(a.id || L.id), key: L.key, name: a.name || "", got: old.got || [], from: old.from || Date.now() - 7 * 864e5 };
    savePrefs(); renderLinks();
    toast("intervals.icu gekoppeld. Je activiteiten, je gewicht en je fysiologie van Garmin komen vanzelf in de app.");
    icuAt = 0; icuPull(true);
  } catch (e) {
    toast(e.code === "key" ? "Die Athlete ID of API-sleutel klopt niet. Kopieer ze opnieuw bij intervals.icu → Settings → Developer Settings." : "intervals.icu is niet bereikbaar. Controleer je verbinding en probeer opnieuw.");
  }
}
// Weight and the daily Garmin numbers (resting heart rate, sleep, HRV, steps, …) from the wellness records.
// Numbers intervals.icu has no column for (Body Battery, intensity minutes, fitness age, acclimatisation)
// come along when you add them there as your own wellness field; they are recognised by their name.
const WELL_STD = new Set("id ctl atl rampRate ctlLoad atlLoad sportInfo updated weight restingHR hrv hrvSDNN menstrualPhase menstrualPhasePredicted kcalConsumed sleepSecs sleepScore sleepQuality avgSleepingHR soreness fatigue stress mood motivation injury spO2 systolic diastolic hydration hydrationVolume readiness baevskySI bloodGlucose lactate bodyFat abdomen vo2max comments steps floorsClimbed respiration carbohydrates protein fatTotal locked tempWeight tempRestingHR".split(" "));
const WELL_OWN = [["mm", /muscle|spier/i], ["bm", /bone|botmassa/i], ["wat", /water/i], ["bb", /body.?battery/i], ["im", /intens/i], ["fa", /fitness.?age|fit.?age|fitnessleeftijd/i], ["acc", /acclim/i], ["st", /stress/i], ["fl", /floor|verdieping/i]];
function wellOf(r){
  const o = {}, put = (k, v) => { if (typeof v === "number" && isFinite(v) && o[k] === undefined) o[k] = Math.round(v * 10) / 10; };
  put("hr", r.restingHR); put("hrv", r.hrv); put("sl", r.sleepScore); put("ss", r.sleepSecs); put("stp", r.steps);
  put("fl", r.floorsClimbed); put("vo2", r.vo2max); put("spo2", r.spO2); put("sq", r.stress); put("bf", r.bodyFat);
  // own fields: the highest Body Battery of the day first
  const own = Object.keys(r).filter(f => !WELL_STD.has(f)).sort((a, b) => /max|high|wake|morning/i.test(b) - /max|high|wake|morning/i.test(a));
  WELL_OWN.forEach(([k, re]) => own.filter(f => re.test(f)).forEach(f => put(k, r[f])));
  return o;
}
async function icuWell(L, full){
  const from = addDays(today(), full || !Object.keys(prefs.well || {}).length ? -400 : -10);   // the first time a year back, for the year chart
  const list = await icuGet(L, `/wellness?oldest=${from}&newest=${today()}`), rows = Array.isArray(list) ? list : [];
  const W = Object.assign({}, prefs.well), B = Object.assign({}, prefs.body);   // after the wait: what you typed meanwhile stays
  let n = 0;
  L.wellAt = Date.now(); L.wellDays = rows.filter(r => Object.keys(wellOf(r)).length || r.weight > 0).length;
  rows.forEach(r => {
    const d = r.id; if (!/^\d{4}-\d\d-\d\d$/.test(d || "")) return;
    const o = wellOf(r), old = W[d] || {};
    // Garmin's weight: the scale is more precise, so it replaces a weight you typed in on that day
    if (r.weight > 20 && r.weight < 400){ o.w = Math.round(r.weight * 10) / 10; B[d] = o.w; }
    if (JSON.stringify(o) !== JSON.stringify(old) && Object.keys(o).length){ W[d] = o; n++; }
  });
  const cut = addDays(today(), -731); Object.keys(W).forEach(d => { if (d < cut) delete W[d]; });
  if (n){ prefs.well = W; prefs.body = B; }
  savePrefs(); if (page === "stats"){ renderBodyWeight(); renderProfile(); }
  return { n, rows: rows.length, days: L.wellDays };
}
// "Opnieuw ophalen" under Fysiologie: the whole year again, and say plainly what intervals.icu sent.
let wellBusy = false;
async function icuWellNow(){
  const L = links().intervals; if (!L || wellBusy) return;
  wellBusy = true; renderPhys();
  try {
    const r = await icuWell(L, true);
    if (L.bad){ delete L.bad; savePrefs(); renderLinks(); }
    toast(!r.rows ? "intervals.icu stuurde geen wellness-gegevens. Zet bij intervals.icu → Settings → Garmin Connect het ophalen van wellness aan en probeer het later opnieuw."
      : !r.days ? `intervals.icu stuurde ${r.rows} dagen, maar zonder Garmin-waarden. Kijk bij intervals.icu → Settings → Garmin Connect of wellness aanstaat.`
      : `${r.days} dagen met gewicht en fysiologie opgehaald.`);
  } catch (e) {
    if (e.code === "key"){ L.bad = true; savePrefs(); renderLinks(); toast("intervals.icu weigert je API-sleutel. Koppel opnieuw met een nieuwe sleutel."); }
    else toast("intervals.icu is niet bereikbaar. Probeer het later opnieuw.");
  }
  wellBusy = false; renderPhys();
}
let icuAt = 0, icuBusy = false;
async function icuPull(manual){
  const L = links().intervals;
  if (!L || icuBusy || (STANDALONE && sbSession && !logCol) || (!manual && ((L.pull === false && L.well === false) || Date.now() - icuAt < 5 * 60000))) return;
  icuBusy = true; icuAt = Date.now();
  try {
    let nw = 0;
    if (L.well !== false) try { nw = (await icuWell(L)).n; } catch (e) { if (e.code === "key") throw e; }
    if (!manual && L.pull === false){ icuBusy = false; if (L.bad){ delete L.bad; savePrefs(); renderLinks(); } return; }
    const p = n => String(n).padStart(2, "0"), d = new Date(Math.max(L.from || 0, Date.now() - 14 * 864e5));
    const list = await icuGet(L, `/activities?oldest=${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`);
    const seen = new Set(L.got || []), got = [], added = [];
    (Array.isArray(list) ? list : []).filter(a => !seen.has(String(a.id)) && !a._note && a.source !== "STRAVA")   // Strava's own activities come as empty stubs
      .sort((a, b) => (a.start_date_local || "") < (b.start_date_local || "") ? -1 : 1).forEach(a => {
        got.push(String(a.id));
        const e = importActivity({ id: "icu" + a.id, name: a.name, sport_type: a.type, trainer: !!a.trainer, start_date: a.start_date || a.start_date_local, start_date_local: a.start_date_local,
          moving_time: a.moving_time, elapsed_time: a.elapsed_time, distance: a.distance || a.icu_distance, elevation: a.total_elevation_gain, average_speed: a.average_speed,
          average_heartrate: a.average_heartrate, max_heartrate: a.max_heartrate, average_cadence: a.average_cadence, average_watts: a.icu_average_watts, calories: a.calories,
          device_name: a.device_name }, "intervals");
        if (e) added.push(e);
      });
    if (got.length){ L.got = (L.got || []).concat(got).slice(-80); savePrefs(); }
    if (L.bad){ delete L.bad; savePrefs(); renderLinks(); }
    imported(added);
    if (manual && !added.length) toast(nw ? "Gewicht en fysiologie bijgewerkt. Geen nieuwe activiteiten." : "Geen nieuwe activiteiten op intervals.icu.");
  } catch (e) {
    if (e.code === "key"){ L.bad = true; savePrefs(); renderLinks(); if (manual) toast("intervals.icu weigert je API-sleutel. Koppel opnieuw met een nieuwe sleutel."); }
    else if (manual) toast("intervals.icu is niet bereikbaar. Probeer het later opnieuw.");
  }
  icuBusy = false;
}
// New activities from the linked apps: on start, after syncing and when the app comes back to the front.
function pullLinks(){ if (!STANDALONE) return; stravaPull(); icuPull(); }
async function stravaConnect(){
  if (!sbSession){ toast("Log eerst in bij Account (onderaan in Instellingen). Zo blijft je koppeling bewaard."); return; }
  let cfg = {}; try { cfg = await sbFn("strava", { action: "config" }); } catch {}
  if (!cfg.client_id){ toast("De Strava-koppeling is nog niet ingesteld op de server."); return; }
  linksChecked = 0;
  const mobile = /Android|iPhone|iPad/i.test(navigator.userAgent), back = location.origin + location.pathname;
  const state = "strava." + [...crypto.getRandomValues(new Uint8Array(12))].map(b => b.toString(16).padStart(2, "0")).join("");
  try { localStorage.setItem("fpt.stravaState", state); } catch {}
  location.href = `https://www.strava.com/oauth/${mobile ? "mobile/" : ""}authorize?client_id=${encodeURIComponent(cfg.client_id)}&response_type=code&redirect_uri=${encodeURIComponent(back)}&approval_prompt=auto&scope=read,activity:read_all,activity:write&state=${state}`;
}
// Back from Strava: ?code=…&scope=…&state=strava.<random>
async function stravaFromUrl(){
  const q = new URLSearchParams(location.search);
  const st = q.get("state") || "";
  if (!/^strava(\.|$)/.test(st)) return;
  try { history.replaceState(null, "", location.pathname + location.hash); } catch {}
  const later = m => setTimeout(() => toast(m), 600);
  let want = ""; try { want = localStorage.getItem("fpt.stravaState") || ""; localStorage.removeItem("fpt.stravaState"); } catch {}
  if (!want || st !== want) return later("Strava is niet gekoppeld.");
  if (q.get("error") || !q.get("code")) return later("Strava is niet gekoppeld.");
  const scope = q.get("scope") || "";
  if (!scope.includes("activity:write")) return later("Vink bij Strava ook het uploaden van activiteiten aan, anders kan FPT je training er niet op zetten.");
  try {
    const j = await sbFn("strava", { action: "exchange", code: q.get("code") }), old = links().strava || {};
    // a week back, so a run you just did on your Garmin comes along right away
    links().strava = { name: j.athlete || "", auto: old.auto !== false, sent: old.sent || [], got: old.got || [], read: scope.includes("activity:read"), from: old.from || Date.now() - 7 * 864e5 };
    savePrefs(); renderLinks();
    later(scope.includes("activity:read") ? "Strava gekoppeld. Je trainingen gaan er vanzelf naartoe, en je activiteiten (ook van je Garmin) komen in je logboek." : "Strava gekoppeld. Je trainingen gaan er voortaan vanzelf naartoe.");
    pulledAt = 0; setTimeout(() => stravaPull(), 1500);
  } catch { later("Strava koppelen lukte niet. Probeer het opnieuw."); }
}
// The server knows best (you can also unlink on strava.com): check now and then while Instellingen is open.
let linksChecked = 0;
async function refreshLinks(){
  if (!STANDALONE || !sbSession || Date.now() - linksChecked < 30000) return;
  linksChecked = Date.now();
  let j; try { j = await sbFn("strava", { action: "status" }); } catch { return; }
  const L = links(), had = !!L.strava;
  if (j.linked && !had) L.strava = { name: j.athlete || "", auto: true, sent: [], from: Date.now() - 7 * 864e5 };
  else if (!j.linked && had) delete L.strava;
  if (had !== !!j.linked){ savePrefs(); renderLinks(); }
}
function lastSummary(){
  const d = Object.keys(log).filter(k => Object.keys(log[k].ex || {}).length || (log[k].cardio || []).length).sort().pop();
  return d ? daySummary(d) : null;
}
function renderLinks(){
  const sec = $("linksSec"); if (!sec) return;
  sec.hidden = !STANDALONE; if (!STANDALONE) return;
  const S = links().strava, I = links().intervals, viaS = S && S.read !== false;
  const row = (ic, cls, name, txt, pill, on, act = "") => `<div class="lk"><span class="lk-ic ${cls}" aria-hidden="true">${ic}</span><span class="lk-txt"><b>${name}</b>${txt}</span><span class="lk-pill${on ? " on" : ""}">${pill}</span>${act ? `<div class="lk-act">${act}</div>` : ""}</div>`;
  $("linksBox").innerHTML =
    row("▲", "strava", "Strava", S ? `<small>Gekoppeld met je Strava-account.</small>${S.name ? `<small translate="no">${esc(S.name)}</small>` : ""}${S.read === false ? "<small>Koppel opnieuw en vink het lezen van je activiteiten aan, dan komen je activiteiten (ook van je Garmin) in je logboek.</small>" : ""}`
        : "<small>Na Einde training komt je training vanzelf op Strava, met je oefeningen in de beschrijving. Je activiteiten op Strava, ook die van je Garmin-horloge, komen vanzelf in je logboek.</small>",
      S ? "Gekoppeld" : "Niet gekoppeld", !!S,
      S ? `<label class="lk-auto"><input type="checkbox" id="lkStravaAuto"${S.auto !== false ? " checked" : ""}>Automatisch na elke training</label>
          ${S.read === false ? `<button class="save" type="button" id="lkStravaOn">Opnieuw koppelen</button>` : `<label class="lk-auto"><input type="checkbox" id="lkStravaPull"${S.pull !== false ? " checked" : ""}>Activiteiten in je logboek zetten</label><button class="ghost" type="button" id="lkStravaGet">Nu ophalen</button>`}
          <button class="ghost" type="button" id="lkStravaOff">Ontkoppelen</button>`
        : `<button class="save" type="button" id="lkStravaOn">Strava koppelen</button>`) +
    row("G", "garmin", "Garmin Connect", `<small>Garmin geeft alleen goedgekeurde partners rechtstreeks toegang. Daarom loopt het via intervals.icu (gratis, hieronder): elke activiteit op je Garmin, zoals een looptocht, komt dan vanzelf als training in je logboek. Garmin → intervals.icu → FPT.</small>
        <small>Of eenmalig: exporteer de activiteit op connect.garmin.com (⚙ → Origineel exporteren) en laad het bestand hier in.</small>`,
      I ? "Via intervals.icu" : viaS ? "Via Strava" : "Via bestand", !!(I || viaS), `<button class="ghost" type="button" data-lk-in>Garmin-bestand inladen</button><button class="ghost" type="button" data-lk-file>Bestand van je laatste training</button>`) +
    row("i", "icu", "intervals.icu", I ? `<small>Gekoppeld. Nieuwe activiteiten (ook van je Garmin) komen vanzelf in je logboek, je gewicht en je fysiologie (slaap, HRV, stappen …) bij Analytics → Lichaam.</small>${I.name ? `<small translate="no">${esc(I.name)}</small>` : ""}${I.bad ? "<small>intervals.icu weigert je API-sleutel. Koppel opnieuw met een nieuwe sleutel.</small>" : ""}`
        : `<small>Gratis en automatisch. Zo koppel je het:</small><small>1. Maak een gratis account op intervals.icu en koppel daar Garmin Connect (Settings → Connections).</small><small>2. Kopieer bij Settings → Developer Settings je Athlete ID en API key en vul ze hier in.</small>`,
      I ? (I.bad ? "Opnieuw koppelen" : "Gekoppeld") : "Niet gekoppeld", !!(I && !I.bad),
      I && !I.bad ? `<label class="lk-auto"><input type="checkbox" id="lkIcuPull"${I.pull !== false ? " checked" : ""}>Activiteiten in je logboek zetten</label><label class="lk-auto"><input type="checkbox" id="lkIcuWell"${I.well !== false ? " checked" : ""}>Gewicht en fysiologie ophalen</label><button class="ghost" type="button" id="lkIcuGet">Nu ophalen</button><button class="ghost" type="button" id="lkIcuOff">Ontkoppelen</button>`
        : `<form class="lk-form" id="lkIcuForm"><input id="lkIcuId" autocomplete="off" spellcheck="false" placeholder="Athlete ID (bv. i123456)" aria-label="Athlete ID" value="${I ? esc(I.id) : ""}"><input id="lkIcuKey" type="password" autocomplete="off" spellcheck="false" placeholder="API key" aria-label="API key" required><button class="save" type="submit">intervals.icu koppelen</button></form>${I ? `<button class="ghost" type="button" id="lkIcuOff">Ontkoppelen</button>` : ""}`) +
    row("♥", "hc", "Samsung Health · Health Connect", "<small>Komt met de Android-app van FPT: je training gaat dan vanzelf naar Health Connect, en Samsung Health en Google Fit nemen ze daar over. Een website kan daar niet bij.</small>",
      "Android-app", false) +
    row("♥", "apple", "Apple Health", "<small>Komt met de iPhone-app van FPT.</small>", "iPhone-app", false) +
    row("⇄", "other", "Andere apps", "<small>Veel apps, zoals TrainingPeaks, halen je trainingen uit Strava. Anders werkt het bestand (.tcx) bij bijna elke sport-app.</small>", "Via Strava", false);
  const on = $("lkStravaOn"); if (on) on.onclick = () => stravaConnect();
  const au = $("lkStravaAuto"); if (au) au.onchange = () => { links().strava.auto = au.checked; savePrefs(); };
  const pu = $("lkStravaPull"); if (pu) pu.onchange = () => { links().strava.pull = pu.checked; savePrefs(); if (pu.checked) stravaPull(true); };
  const gt = $("lkStravaGet"); if (gt) gt.onclick = async () => { gt.disabled = true; await stravaPull(true); gt.disabled = false; };
  $("linksBox").querySelector("[data-lk-in]").onclick = () => pickActivityFile();
  const icf = $("lkIcuForm"); if (icf) icf.onsubmit = async e => {
    e.preventDefault(); const b = icf.querySelector("button"); b.disabled = true;
    await icuLink($("lkIcuId").value, $("lkIcuKey").value); b.disabled = false;
  };
  const ip = $("lkIcuPull"); if (ip) ip.onchange = () => { links().intervals.pull = ip.checked; savePrefs(); if (ip.checked) icuPull(true); };
  const iw = $("lkIcuWell"); if (iw) iw.onchange = () => { links().intervals.well = iw.checked; savePrefs(); if (iw.checked) icuPull(true); };
  const ig = $("lkIcuGet"); if (ig) ig.onclick = async () => { ig.disabled = true; await icuPull(true); ig.disabled = false; };
  const io = $("lkIcuOff"); if (io) io.onclick = () => { delete links().intervals; savePrefs(); renderLinks(); toast("intervals.icu ontkoppeld."); };
  const off = $("lkStravaOff"); if (off) off.onclick = async () => {
    off.disabled = true;
    try { await sbFn("strava", { action: "unlink" }); } catch {}
    delete links().strava; savePrefs(); renderLinks(); toast("Strava ontkoppeld.");
  };
  $("linksBox").querySelector("[data-lk-file]").onclick = async () => {
    const sm = lastSummary(); if (!sm){ toast("Nog geen training om te bewaren."); return; }
    if (await saveFile(`fpt-${sm.date}.tcx`, new Blob([tcxFor(sm, summaryText(sm))], { type: "application/vnd.garmin.tcx+xml" }))) toast("Bestand bewaard. Importeer het op connect.garmin.com → Importeren.");
  };
}
if (STANDALONE){
  stravaFromUrl();
  document.addEventListener("visibilitychange", () => { if (document.hidden) return; if (!$("friends").hidden) refreshLinks(); pullLinks(); });
}
async function claudeStore(){
  const [db, user] = await Promise.all([claude.use("db"), claude.use("user")]);
  const uid = user && await user.id();
  if (!db || !uid) return { msg: "Je gegevens worden op dit toestel bewaard, in deze browser. Log in op claude.ai om ze op al je toestellen te hebben." };
  // Friends who open a shared view-only link cannot save to the account store: keep everything on their device.
  const canWrite = user && typeof user.can === "function" ? await user.can("data.write") : null;
  if (canWrite === false) return { msg: "Je gegevens worden op dit toestel bewaard, in deze browser. Niemand anders ziet ze." };
  return { db, uid };
}
// Merge this device with your account: records, prefs, your own exercise order and the session log.
// The first sync of a device (or of another account) unites both copies. After that it is a three-way merge with
// the copy last seen in the account, so what you deleted on one device stays deleted and nothing newer is lost.
// Prefs as they were merged before there was a common copy: the newest save wins, the lists are united.
function unitePrefs(rp){
  const ids = new Set((rp.custom || []).map(c => c.id));
  const localNewer = (prefs.savedAt || 0) > (rp.savedAt || 0);
  const [old, neu] = localNewer ? [rp, prefs] : [prefs, rp];
  return clone(Object.assign({}, old, neu, {
    progStart: Object.assign({}, old.progStart, neu.progStart),
    goals: neu.goals || old.goals || [],
    notes: Object.assign({}, old.notes, neu.notes),
    body: Object.assign({}, old.body, neu.body),
    well: Object.assign({}, old.well, neu.well),
    dev: Object.assign({}, old.dev, neu.dev),
    custom: (rp.custom || []).concat((prefs.custom || []).filter(c => !ids.has(c.id))),
    deloadStart: [prefs.deloadStart || "", rp.deloadStart || ""].sort().pop(),
    deloadSnooze: [prefs.deloadSnooze || "", rp.deloadSnooze || ""].sort().pop()
  }));
}
let connecting = false, connectedAt = 0;
async function connectStore(){
  if (connecting) return;
  connecting = true;
  try {
    const got = STANDALONE ? (await cloudStore()) || { msg: "Je gegevens staan op dit toestel. Log in bij Instellingen → Account om ze op al je toestellen te hebben." } : await claudeStore();
    if (got.msg){ prefsBooting = false; setStore(false, got.msg); pullLinks(); return; }
    const { db, uid } = got;
    setStore(false, "Synchroniseren…");
    await waitForSync();
    const known = synced && synced.uid === uid ? synced.docs : null, docs = {};
    // Write the merged copy where the account differs, and keep it as the common copy.
    const put = async (id, ref, merged, theirs) => {
      if (merged === undefined){ if (theirs !== undefined) await ref.delete(); return; }
      if (!deepEq(merged, theirs)) await ref.set(merged);
      docs[id] = clone(merged);
    };

    const ref = db.doc("data/users/" + uid + "/records");
    const snap = await ref.get(), theirR = snap.exists ? snap.data() : undefined;
    const mR = known ? merge3(known.records, { lifts: records }, theirR) : { lifts: merge((theirR && theirR.lifts) || {}, records) };
    records = (mR && mR.lifts) || {}; lsSet(LS_RECORDS, records); renderExercises();
    await put("records", ref, { lifts: records }, theirR);
    recordsRef = ref;

    // Notes, body weight, own schemes, goals, profile, linked apps …
    const pref = db.doc("data/users/" + uid + "/prefs");
    const psnap = await pref.get(), rp = psnap.exists ? psnap.data() : undefined;
    if (rp){
      adoptInto(prefs, known ? merge3(known.prefs, clone(prefs), rp) || {} : unitePrefs(rp));
      lsSet(LS_PREFS, prefs);
      // a new device takes over the language chosen in your account
      if (LOCALES[rp.lang] && rp.lang !== lang && localStorage.getItem("ppl.lang") === null) setLang(rp.lang);
    }
    prefsBooting = false;
    if (devRestore()){ focusOn = lsGet("ppl.focus", true); renderSettings(); renderExercises(); }
    setupModules(); applyTheme();
    await put("prefs", pref, clone(prefs), rp);
    prefsRef = pref;
    if (Object.keys(log).length || rp) { if (!$("welcome").hidden) closeWelcome(); }

    // Your own exercise order / added exercises per day.
    const lref = db.doc("data/users/" + uid + "/layout");
    const lsnap = await lref.get(), theirL = lsnap.exists ? lsnap.data() : undefined;
    const mL = known ? merge3(known.layout, { days: layouts }, theirL) : { days: Object.assign({}, layouts, theirL && theirL.days) };
    layouts = Object.assign({}, mL && mL.days); carryOverOldSchemes(layouts); lsSet(LS_LAYOUTS, layouts); renderExercises();
    await put("layout", lref, { days: layouts }, theirL);
    layoutRef = lref;

    // Session log: one document per date.
    const lcol = db.doc("data/users/" + uid + "/log").collection("sessions");
    const remoteLog = {}, knownLog = {};
    (await lcol.limit(1000).get()).docs.forEach(d => { remoteLog[d.id] = d.data(); });
    if (known) Object.keys(known).filter(k => k.startsWith("log/")).forEach(k => { knownLog[k.slice(4)] = known[k]; });
    log = Object.assign({}, known ? merge3(knownLog, log, remoteLog) : mergeLog(remoteLog, log)); lsSet(LS_LOG, log);
    await Promise.all([...new Set(Object.keys(log).concat(Object.keys(remoteLog)))].map(d => put("log/" + d, lcol.doc(d), log[d], remoteLog[d])));
    logCol = lcol;
    synced = { uid, docs }; saveSynced(); connectedAt = Date.now();

    if (Object.keys(log).length && !$("welcome").hidden) closeWelcome();
    render(); if (page === "stats") renderStats();
    setStore(true, "Opgeslagen in je account. Je gegevens staan op al je toestellen.");
    if (STANDALONE){ renderAccount(); pullLinks(); }
  } catch (e) {
    prefsBooting = false;
    setStore(false, STANDALONE ? (sbSession ? "Synchroniseren lukt nu niet (geen verbinding?). Je gegevens staan veilig op dit toestel." : "Je gegevens staan op dit toestel. Maak af en toe een back-up via Instellingen.") : "Alleen op dit toestel opgeslagen.");
  } finally { connecting = false; }
}
// Back to the app after a while: first fetch what other devices changed.
document.addEventListener("visibilitychange", () => { if (!document.hidden && logCol && Date.now() - connectedAt > 60000) connectStore(); });
connectStore();
