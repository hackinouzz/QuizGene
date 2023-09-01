//on importe tout en haut notre "ecranAccuei" et notre "ecranQuestion"
let ecranAccueil = document.getElementById("presentation");
let ecranQuestion = document.getElementById("corps__quiz");
let resultatUtilisateur = document.getElementById("resultat__quiz");
/*-------------------------------------------------------------------------------------------------------------*/

function Quiz (){ // créatyion d'une fonction Quiz(){...}
    this.questions = []; // mise en place des arguments
    this.NbrdeQuestCorrect = 0;
    this.diaporamaQuestion = 0;
/*-----------------------Objet pour ajouter des questions-------------------------*/
    this.AjoutQuestion = function(question){
        this.questions.push(question);
    },
/*-----------------------Objet pour ajouter des questions  (fin)-------------------------*/
/*---------------------------------------------------------------------------------------*/
//lancement de notre question
    this.affichageQuestion = function(){
        if(this.diaporamaQuestion < this.questions.length){// si mon diaporamaQuestion est inférieur à ma longueur du tableau, alors je continu
            this.questions[this.diaporamaQuestion].afficheElement(//à chaque fois que je lance "affichageQuestion", il va afficher ma question actuelle.
                /*---------------------la gestion de lEnTeteQuestion--------------------*/
                this.diaporamaQuestion +1, this.questions.length );//on récupère notre compteur diaporamaQuestion et la longueur de notre tableau da question 
        }
        else{// sinon j'affiche le résultat
            ecranQuestion.style.display = "none";
            let elnombreReponsesCorrectes = document.querySelector/*récupere le 1 élément qu'il rencontre*/("#nombre__reponses__correctes");
            //initaialisation de nos nombres de réponses correctes à notre argument "nbReponsesCorrects"
            elnombreReponsesCorrectes.textContent = quiz.NbrdeQuestCorrect;
            resultatUtilisateur.style.display = "block";
        }
       
    }

}

// ---------------------------------------------------------------------------------------------------------------------
function Question(titre,reponses,correcteReponse){ //créatyion d'une fonction Question(qui prend en premier lieu le titre, ensuite, les différentes réponses et enfin, la réponse correcte){...} 
    this.titre = titre;
    this.reponses = reponses;
    this.correcteReponse = correcteReponse;
    // une fonction dans un objet s'appelle méthode.

    this.afficheElement=  function(indexQuestion, nbQuestions){ // création (objet) contenant le corps de nos questions
        let lEnTeteQuestion = document.createElement("h2");//on l'attribut un élément "h2"
        lEnTeteQuestion.classList.add("numero_question");//on lui crée une classe
        lEnTeteQuestion.textContent = "Question " + indexQuestion + "/" + nbQuestions;//on le donne un contenu
        console.log(lEnTeteQuestion);
        ecranQuestion.append(lEnTeteQuestion);// mon n'écran de question va intégrer l'entête de ma question
                /*--------------------------------------------------------------*/
        let titreQuestion = document.createElement("h3");//on crée le titre de notre question
        titreQuestion.classList.add("type_question");
        titreQuestion.textContent = titre; //mon titre va contenir "this.titre"
        console.log(titreQuestion);
        ecranQuestion.append(titreQuestion);// mon n'écran de question va intégrer le titre de ma question
                /*--------------------------------------------------------------*/
        let blocUl = document.createElement("ul");
        blocUl.classList.add("reponses_quiz");

                /*---------------les "li" (avec les réponses) qui appartiennent à "ul"--------------*/
        this.reponses.forEach ((reponse, index) => {// pour chaque bloc de mes réponses (reponses) qui existe, on va venir créer une réponse
            let elreponse = document.createElement("li");// création de bloc de réponses 
            elreponse.classList.add("reponse");// création de classe
            elreponse.textContent = reponse;//attribution de réponses possible 
            elreponse.id = index+1;//on attribut un propriété id dans norte réponse: son index, sa place dans le tableau 
            blocUl.append(elreponse);// on l'intègre dans notre blocUl
            // console.log(reponse);

             /*------------------étude de la réponse de l'utilisateur (avec l'évennement)-----------*/
             elreponse.addEventListener("click", this.etudeReponse);
        })
            /*--------------------------étude de la réponse de l'utilisateur-----------------------*/
        ecranQuestion.append(blocUl);
}
        this.etudeReponse = (/*1er paramètre: l'évennement*/ event) => {
            // console.log(event.target);
            let reponseSelectionnee = event.target;// la variable "reponseSelectionnee" récupère l'entièreté de lélément cliqué            
            console.log(this.correcteReponse);
            /*-------------vérifier si la réponse de l'utilisateur est vraie ou fausse-------------*/
            
            if(this.reponseCorrect(reponseSelectionnee.id)){//ici on a besoin que l'id (1,2,3 etc).
                reponseSelectionnee.classList.add("reponse_correcte");
                quiz.NbrdeQuestCorrect ++;
            }
            else{
                //dans le cas où ma réponse n'est pas correcte
                reponseSelectionnee.classList.add("reponse_incorrecte");
                //et je qu'il m'affiche la bonne réponse en vert.
                let bonnReponse = document.getElementById(this.correcteReponse);//récupère l'identifiant qui a la bonne réponse
                bonnReponse.classList.add("reponse_correcte");// la classe de la bonne réponse
            }

            setTimeout(function(){// on vide notre écran de première question pour passer au suivante. (2000 mili-seconde = 2s);
                ecranQuestion.textContent = " ";// on vide 
                quiz.diaporamaQuestion ++;// ensuite, on passe à la question suivante  
                quiz.affichageQuestion();// pour enfin, afficher notre 2ème question.
            }, 1000);
}
                            /*----------------------------------------------------------------------*/
        this.reponseCorrect = function(Reponse_Utilisateur){
            if(Reponse_Utilisateur == this.correcteReponse){
                return true;
        }
            else{
                return false;
        }
        }
};
let quiz = new Quiz();
 // Crétion de question avec le titre, les différentes réponses et la réponse correcte
let quest1 = new Question("Qui est l'auteur du roman *Maïmouna* ?"/*titre*/, ["Ousmane Sembene","Abdoulaye Sadji","Victor Hugo"]/*les différentes réponses*/,2/*la réponse correcte*/); // 
quiz.AjoutQuestion(quest1);

let quest2 = new Question("Quelle hauteur a le monument de la renaissance africaine ?", ["15 m","100 m","52 m"],3); 
quiz.AjoutQuestion(quest2);

let quest3 = new Question("Qu'elle est la première capitale du Sénégal ?", ["Dakar","Thiès","Saint-Louis"],3); 
quiz.AjoutQuestion(quest3);

let quest4 = new Question("Qui est le président-fondateur de Give1Projet ?", ["Thione Niang","Bill Gates","Ousmane Sonko"],1);
quiz.AjoutQuestion(quest4);

let quest5 = new Question("Aliko Dangote est le fondateur de:", ["Dangate Restaurant","Dangote cement","EDK oil"],2); 
quiz.AjoutQuestion(quest5);

let quest6 = new Question("Qui est le fondateur de NMA (Nouvelle Minoterie Africaine) ?", ["Demba Kâ","Ameth Amar","Youssou Ndour"],2);
quiz.AjoutQuestion(quest6);

let quest7 = new Question("Comment appelle-t-on le bébé d'un chameau ?", ["chamelon","chamois","dromadaire"],1); 
quiz.AjoutQuestion(quest7);

let quest8 = new Question("Comment appelle-t-on le bébé du sanglier ?", ["sanglion","marcassin","sangleton"],2);
quiz.AjoutQuestion(quest8);

let quest9 = new Question("Comment appelle-t-on le bébé d'un phoque ?", ["fokof","faucon","blanchon"],3); 
quiz.AjoutQuestion(quest9);

let quest10 = new Question("Comment appelle-t-on le petit d'un pingouin ?", ["poussin","panda","poulain"],1); 
quiz.AjoutQuestion(quest10);

let quest11 = new Question("Comment appelle-t-on le bébé de la mouche ?", ["moucheron","asticot","mouchoir"],2); 
quiz.AjoutQuestion(quest11);

let quest12 = new Question("Comment appelle-t-on les habitants du Yémen ?", ["yéménites","yménais","yéménois"],1); 
quiz.AjoutQuestion(quest12);

let quest13 = new Question("Comment appelle-t-on les habitants du Cuba ?", ["cubains","cubanais","cubanois"],1); 
quiz.AjoutQuestion(quest13);

let quest14 = new Question("Comment appelle-t-on les habitants de la Boulgarie ?", ["bulgares","bulgarois","bulgarais"],1); 
quiz.AjoutQuestion(quest14);

let quest15 = new Question("Le massacre du camps militaire Thiaroye s'est déroulé le :", ["4 décembre 1944","15 décembre 1944","1 décémbre 1944"],3); 
quiz.AjoutQuestion(quest15);

let quest16 = new Question("Quelle femme a été pour la première à avoir exercée la fonction de prémière ministre au Sénégal ?", ["Mimi Touré","Fatou Diome","Mame Madior Boye"],3);
quiz.AjoutQuestion(quest16);

let quest17 = new Question("Quelle est la superficie du Sénégal :", ["196 712 km²","195 712 km²","194 712 km²"],1); 
quiz.AjoutQuestion(quest17);

let quest18 = new Question("Quelle est la longueur du fleuve Sénégal :", ["1 200 km","1 650 km","1 750 km"],3); 
quiz.AjoutQuestion(quest18);

let quest19 = new Question("Elle est la deuxième femme à avoir exercée la fonction de première ministre au Sénégal :", ["Mame Madior Boye","Ndella Madior","Mimi Touré"],3);
quiz.AjoutQuestion(quest19);

let quest20 = new Question("Qui est l'auteur de la citation suivante : *on peut tuer un homme mais pas ses idées*", ["Ousmane Sembène","Thomas Sankara","Ousmane Sonko"],2); 
quiz.AjoutQuestion(quest20);






// lancement de l'objet lanceQuiz, qui comporte l'ensemble contenu de notre quiz.
//quiz.lanceQuiz();

/*-------------------------------------------------partie 2-------------------------------------------*/

//Appel du nombre de reponses correctes

let elnombreReponsesCorrectes = document.querySelector/*récupere le 1 élément qu'il rencontre*/("#nombre__reponses__correctes");
console.log(elnombreReponsesCorrectes);
//ou (avec au lieu, de: let elnombreReponsesCorrectes = document.querySelector("#nombre__reponses__correctes"); on met  let elnombreReponsesCorrectes = document.getElementsById("nombre__reponses__correctes"); 

//initaialisation de nos nombres de réponses correctes à notre argument "nbReponsesCorrects"
elnombreReponsesCorrectes.textContent = quiz.NbrdeQuestCorrect;

//Appel du nombre de question
let elnombreQuestion = document.querySelectorAll/*récupere tous les éléments qu'il rencontre*/(".nombre__questions");
console.log(elnombreQuestion);

// initialiser nos questions à notre tableau de questions
//ou (avec au lieu, de: let elnombreQuestion = document.querySelectorAll(".nombre__questions"); on met:let elnombreQuestion = document.getElementsByClassName("nombre__questions");)
/*for (let i=0; i<elnombreQuestion.length; i++){
    elnombreQuestion[i].textContent = quiz.nbQuestions.length;
} */
elnombreQuestion.forEach(function(elnombreQuestion){
    elnombreQuestion.textContent = quiz.questions.length;
});

// on récupère notre écran d'accueil
function voirFirstQuestion(){ // on récupère notre écran d'accueil
    // let ecranAccueil = document.getElementById("presentation");
    ecranAccueil.style.display = "none"; //on cache notre écran "presentation" pour laisser la place à notre 1ère question "corps__quiz".
// ou aller dans mon style css, créer une classe hidden{ display: nono;}, ensuite: (ajouter à la liste des classes) ecranAccueil.classList.add("hidden");
/*-------------------------------------ensuite---------------------------------*/
// on va venir récupérer notre écran de question
    // let ecranQuestion = document.getElementById("corps__quiz");
    ecranQuestion.style.display = "block";// l'inverse de display: none, c'est display: block.
    
/*-------------------------------------enfin---------------------------------*/
//on va venir executer une methode de quiz qui va activer les questions à tour de rôle
quiz.affichageQuestion();
}
// on passe la récupération de notre bouton
let bouton = document.getElementById("bouton");
// on va faire de telle sorte qu'au click de notre bouton (avec addEventListener, qui prend deux paramètres), 
bouton.addEventListener/*écouteur d'évennement au moment du click*/("click",voirFirstQuestion); 
// on créer la fonction "voirFirstQuestion"
/*-------------------------------------------------FIN----------------------------------------------------------*/