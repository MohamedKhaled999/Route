var quotes = [

    {
        quote:'“It is better to be hated for what you are than to be loved for what you are not.”',
        author:'― Andre Gide'
    },
    {
        quote:'“You cannot control what happens to you in life, but you can always control what you will feel and do about what happens to you.”',
        author:'― Viktor E. Frankl'
    },
    {
        quote:'“To paraphrase several sages: Nobody can think and hit someone at the same time.”',
        author:'― Susan Sontag'
    },
    {
        quote:'“If someone puts their hands on you make sure they never put their hands on anybody else again.”',
        author:'― Malcom X,'
    },
    {
        quote:'“The most wasted of all days is one without laughter.”',
        author:'― Nicolas Chamfort'
    },
    {
        quote:'“A friend is someone who knows all about you and still loves you.”',
        author:'― Elbert Hubbard'
    },
    {
        quote:'“!الغرب ليسوا عباقرة ونحن لسنا أغبياء؛ هم فقط يدعمون الفاشل حتى ينجح، ونحن نحارب الناجح حتى يفشل”',
        author:'― Ahmed Zewail'
    },
    {
        quote:'“We accept the love we think we deserve.”',
        author:'― Stephen Chbosky,'
    }
];

var last=-1;





function getRandomQuote() {
  var rand = Math.floor(Math.random() * quotes.length);
if (rand == last) {
    rand =(rand+1)%quotes.length
} 
document.getElementById('quote').innerHTML=quotes[rand].quote
document.getElementById('quote-author').innerHTML=quotes[rand].author
last =rand;
console.log(rand)

}
