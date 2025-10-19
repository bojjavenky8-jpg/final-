
let currentUser  = null;
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let voiceEnabled = true;
let gameLevel = 1;
let gameScore = 0;
let progress = 0;
let badges = [];

// Drag and drop questions for each class
const classDragQuestions = {
    1: [
        {
            q: {
                en: "During heavy rain, what should you use to stay dry?",
                hi: "भारी बारिश के दौरान, सूखे रहने के लिए क्या इस्तेमाल करना चाहिए?",
        dragGameTitle: "Drag and Drop Safety Game",
        dragInstructions: "Drag the correct item to answer each question!",
        startDragGame: "Start Drag Game",
        dragMaster: "Drag Master",
        dragParticipant: "Drag Participant",
        correctDrop: "Correct! Well done!",
        wrongDrop: "Try again!",
        dropHere: "Drop your answer here",
                mr: "मुसळधार पावसात, कोरडे राहण्यासाठी काय वापरावे?",
                es: "Durante la lluvia intensa, ¿qué debes usar para mantenerte seco?",
                te: "భారీ వర్షంలో, పొడిగా ఉండటానికి ఏమి ఉపయోగించాలి?"
            },
            items: {
                en: ["Umbrella", "Toy car", "Candy", "Book"],
                hi: ["छाता", "खिलौना कार", "कैंडी", "किताब"],
                mr: ["छत्री", "खेळणी कार", "कॅन्डी", "पुस्तक"],
        // Drag and Drop Game
        dragGameTitle: "ड्रैग एंड ड्रॉप सुरक्षा खेल",
        dragInstructions: "सही वस्तु को खींचकर प्रश्न का उत्तर दें!",
        startDragGame: "ड्रैग गेम शुरू करें",
        dragMaster: "ड्रैग मास्टर",
        dragParticipant: "ड्रैग प्रतिभागी",
        correctDrop: "सही! बहुत अच्छा!",
        wrongDrop: "फिर से प्रयास करें!",
        dropHere: "अपना उत्तर यहाँ छोड़ें",
                es: ["Paraguas", "Carro de juguete", "Caramelo", "Libro"],
                te: ["గొడుగు", "బొమ్మ కారు", "కేండీ", "పుస్తకం"]
            },
            correct: {
                en: "Umbrella",
                hi: "छाता",
                mr: "छत्री",
        // Drag and Drop Game
        dragGameTitle: "ड्रॅग आणि ड्रॉप सुरक्षा खेळ",
        dragInstructions: "योग्य वस्तू ओढून प्रश्नाचे उत्तर द्या!",
        startDragGame: "ड्रॅग गेम सुरू करा",
        dragMaster: "ड्रॅग मास्टर",
        dragParticipant: "ड्रॅग सहभागी",
        correctDrop: "बरोबर! छान केलंत!",
        wrongDrop: "पुन्हा प्रयत्न करा!",
        dropHere: "तुमचे उत्तर इथे सोडा",
                es: "Paraguas",
                te: "గొడుగు"
            }
        },
        {
            q: {
                en: "What helps you see in the dark during a power cut?",
        // Drag and Drop Game
        dragGameTitle: "Juego de Seguridad de Arrastrar y Soltar",
        dragInstructions: "¡Arrastra el elemento correcto para responder cada pregunta!",
        startDragGame: "Iniciar Juego de Arrastre",
        dragMaster: "Maestro del Arrastre",
        dragParticipant: "Participante del Arrastre",
        correctDrop: "¡Correcto! ¡Bien hecho!",
        wrongDrop: "¡Inténtalo de nuevo!",
        dropHere: "Suelta tu respuesta aquí",
                hi: "बिजली जाने पर अंधेरे में देखने में क्या मदद करता है?",
                mr: "वीज गेल्यावर अंधारात पाहण्यास काय मदत करते?",
                es: "¿Qué te ayuda a ver en la oscuridad durante un corte de energía?",
                te: "విద్యుత్ కోత సమయంలో చీకటిలో చూడటానికి ఏది సహాయపడుతుంది?"
            },
            items: {
                en: ["Flashlight", "Ball", "Paper", "Hat"],
        // Drag and Drop Game
        dragGameTitle: "డ్రాగ్ అండ్ డ్రాప్ భద్రతా ఆట",
        dragInstructions: "ప్రతి ప్రశ్నకు సరైన అంశాన్ని లాగి జవాబు ఇవ్వండి!",
        startDragGame: "డ్రాగ్ ఆట ప్రారంభించండి",
        dragMaster: "డ్రాగ్ మాస్టర్",
        dragParticipant: "డ్రాగ్ పాల్గొనేవారు",
        correctDrop: "సరైనది! బాగా చేశారు!",
        wrongDrop: "మళ్లీ ప్రయత్నించండి!",
        dropHere: "మీ సమాధానాన్ని ఇక్కడ వదలండి",
                hi: ["टॉर्च", "गेंद", "कागज", "टोपी"],
                mr: ["टॉर्च", "चेंडू", "कागद", "टोपी"],
                es: ["Linterna", "Pelota", "Papel", "Sombrero"],
                te: ["టార్చ్", "బంతి", "కాగితం", "టోపీ"]
            },
            correct: {
                en: "Flashlight",
                hi: "टॉर्च",
                mr: "टॉर्च",
                es: "Linterna",
                te: "టార్చ్"
            }
        }
    ],
    2: [
        {
            q: {
                en: "What should you grab first in a fire emergency?",
                hi: "आग लगने की स्थिति में सबसे पहले क्या पकड़ना चाहिए?",
                mr: "आग लागल्यास प्रथम काय घ्यावे?",
                es: "¿Qué debes agarrar primero en una emergencia de incendio?",
                te: "అగ్ని ప్రమాద సమయంలో మొదట ఏమి తీసుకోవాలి?"
            },
            items: {
                en: ["Emergency kit", "Video game", "Pillow", "Guitar"],
                hi: ["आपातकालीन किट", "वीडियो गेम", "तकिया", "गिटार"],
                mr: ["आपत्कालीन किट", "व्हिडिओ गेम", "उशी", "गिटार"],
                es: ["Kit de emergencia", "Videojuego", "Almohada", "Guitarra"],
                te: ["అత్యవసర కిట్", "వీడియో గేమ్", "దిండు", "గిటార్"]
            },
            correct: {
                en: "Emergency kit",
                hi: "आपातकालीन किट",
                mr: "आपत्कालीन किट",
                es: "Kit de emergencia",
                te: "అత్యవసర కిట్"
            }
        }
    ]
};

let quizQuestions = [
    {
        q: {
            en: "What should you pack in an emergency kit?",
            hi: "आपातकालीन किट में क्या रखना चाहिए?",
            mr: "आपत्कालीन किटमध्ये काय ठेवावे?",
            es: "¿Qué debes llevar en un kit de emergencia?",
            te: "అత్యవసర కిట్‌లో ఏమి పెట్టాలి?"
        },
        options: {
            en: ["Water, food, flashlight", "Toys", "Books"],
            hi: ["पानी, खाना, टॉर्च", "खिलौने", "किताबें"],
            mr: ["पाणी, अन्न, टॉर्च", "खेळणी", "पुस्तके"],
            es: ["Agua, comida, linterna", "Juguetes", "Libros"],
            te: ["నీరు, ఆహారం, టార్చ్", "బొమ్మలు", "పుస్తకాలు"]
        },
        a: {
            en: "Water, food, flashlight",
            hi: "पानी, खाना, टॉर्च",
            mr: "पाणी, अन्न, टॉर्च",
            es: "Agua, comida, linterna",
            te: "నీరు, ఆహారం, టార్చ్"
        }
    },
    {
        q: {
            en: "Where should you go during a cyclone?",
            hi: "चक्रवात के दौरान आपको कहाँ जाना चाहिए?",
            mr: "चक्रीवादळाच्या वेळी कुठे जावे?",
            es: "¿Dónde debes ir durante un ciclón?",
            te: "చక్రవాత సమయంలో మీరు ఎక్కడికి వెళ్లాలి?"
        },
        options: {
            en: ["Beach", "Balcony", "Safe shelter indoors"],
            hi: ["समुद्र तट", "बालकनी", "घर के अंदर सुरक्षित स्थान"],
            mr: ["समुद्रकिनारा", "बाल्कनी", "घरात सुरक्षित ठिकाणी"],
            es: ["Playa", "Balcón", "Refugio seguro en el interior"],
            te: ["బీచ్", "బాల్కనీ", "ఇంట్లో సురక్షిత ఆశ్రయం"]
        },
        a: {
            en: "Safe shelter indoors",
            hi: "घर के अंदर सुरक्षित स्थान",
            mr: "घरात सुरक्षित ठिकाणी",
            es: "Refugio seguro en el interior",
            te: "ఇంట్లో సురక్షిత ఆశ్రయం"
        }
    },
    {
        q: {
            en: "What to do in earthquake?",
            hi: "भूकंप के दौरान क्या करना चाहिए?",
            mr: "भूकंपाच्या वेळी काय करावे?",
            es: "¿Qué hacer durante un terremoto?",
            te: "భూకంప సమయంలో ఏమి చేయాలి?"
        },
            a: {
                en: "Drop, Cover, Hold On",
                hi: "नीचे झुको, ढककर पकड़ो",
                mr: "झुकून, झाकून, धरून ठेवा",
                es: "Agacharse, cubrirse, sujetarse",
                te: "వంచి, కప్పుకుని, పట్టుకోండి"
            },
        options: {
            en: ["Run", "Drop, Cover, Hold On", "Hide under bed"],
            hi: ["भागो", "नीचे झुको, ढककर पकड़ो", "बिस्तर के नीचे छुपो"],
            mr: ["पळा", "झुकून, झाकून, धरून ठेवा", "पलंगाखाली लपवा"],
            es: ["Corre", "Agacharse, cubrirse, sujetarse", "Escóndete debajo de la cama"],
            te: ["పరుగెత్తండి", "వంచి, కప్పుకుని, పట్టుకోండి", "పందిరి కింద దాచండి"]
        }
    },
    {
        q: {
            en: "What number do you call for fire emergency?",
            hi: "आग की आपात स्थिति के लिए किस नंबर पर कॉल करेंगे?",
            mr: "आग आपत्कालासाठी कोणता क्रमांक कॉल कराल?",
            es: "¿A qué número llamas en caso de incendio?",
            te: "ఫైర్ ఎమర్జెన్సీకి ఏ నంబర్‌కు కాల్ చేస్తారు?"
        },
        a: {
            en: "101",
            hi: "101",
            mr: "101",
            es: "101",
            te: "101"
        },
        options: {
            en: ["100", "101", "108"],
            hi: ["100", "101", "108"],
            mr: ["100", "101", "108"],
            es: ["100", "101", "108"],
            te: ["100", "101", "108"]
        }
    },
    {
        q: {
            en: "What should you do during a flood?",
            hi: "बाढ़ के दौरान आपको क्या करना चाहिए?",
            mr: "पूराच्या वेळी काय करावे?",
            es: "¿Qué debes hacer durante una inundación?",
            te: "విపత్తు సమయంలో ఏమి చేయాలి?"
        },
        a: {
            en: "Move to higher ground",
            hi: "ऊँची जगह पर जाएं",
            mr: "उंच जागी जा",
            es: "Ir a un lugar más alto",
            te: "ఎత్తైన ప్రదేశానికి వెళ్లండి"
        },
        options: {
            en: ["Swim in water", "Move to higher ground", "Stay in basement"],
            hi: ["पानी में तैरें", "ऊँची जगह पर जाएं", "तहखाने में रहें"],
            mr: ["पाण्यात पोहा", "उंच जागी जा", "तळघरात रहा"],
            es: ["Nada en el agua", "Ir a un lugar más alto", "Quédate en el sótano"],
            te: ["నీటిలో ఈదండి", "ఎత్తైన ప్రదేశానికి వెళ్లండి", "బేస్‌మెంట్‌లో ఉండండి"]
        }
    },
    {
        q: {
            en: "What is the safest place during a thunderstorm?",
            hi: "तूफान के दौरान सबसे सुरक्षित जगह कौन सी है?",
            mr: "वादळाच्या वेळी सर्वात सुरक्षित जागा कोणती?",
            es: "¿Cuál es el lugar más seguro durante una tormenta?",
            te: "ఈదురుగాలిలో అత్యంత సురక్షితమైన ప్రదేశం ఏమిటి?"
        },
        a: {
            en: "Indoors away from windows",
            hi: "खिड़कियों से दूर घर के अंदर",
            mr: "खिडकींपासून दूर घरात",
            es: "Dentro, lejos de las ventanas",
            te: "కిటికీల నుండి దూరంగా ఇంట్లో"
        },
        options: {
            en: ["Under a tree", "Indoors away from windows", "On the roof"],
            hi: ["पेड़ के नीचे", "खिड़कियों से दूर घर के अंदर", "छत पर"],
            mr: ["झाडाखाली", "खिडकींपासून दूर घरात", "छतावर"],
            es: ["Debajo de un árbol", "Dentro, lejos de las ventanas", "En el techo"],
            te: ["చెట్టు కింద", "కిటికీల నుండి దూరంగా ఇంట్లో", "అడుగు మీద"]
        }
    },
    {
        q: {
            en: "What to do if you smell gas?",
            hi: "अगर आपको गैस की गंध आती है तो क्या करना चाहिए?",
            mr: "गॅसचा वास आल्यास काय करावे?",
            es: "¿Qué hacer si hueles gas?",
            te: "గ్యాస్ వాసన వస్తే ఏమి చేయాలి?"
        },
        a: {
            en: "Open windows and leave",
            hi: "खिड़कियाँ खोलें और बाहर जाएं",
            mr: "खिडक्या उघडा आणि बाहेर पडा",
            es: "Abre las ventanas y sal",
            te: "కిటికీలు తెరిచి బయటకు వెళ్లండి"
        },
        options: {
            en: ["Light a match", "Open windows and leave", "Ignore it"],
            hi: ["माचिस जलाएं", "खिड़कियाँ खोलें और बाहर जाएं", "नज़रअंदाज़ करें"],
            mr: ["माचिस पेटवा", "खिडक्या उघडा आणि बाहेर पडा", "दुरलक्ष करा"],
            es: ["Enciende un fósforo", "Abre las ventanas y sal", "Ignóralo"],
            te: ["మాచిస్ వెలిగించండి", "కిటికీలు తెరిచి బయటకు వెళ్లండి", "పట్టించుకోకండి"]
        }
    }
];
let userLocation = null;

// Unique question for each class 1-5
const classQuestions = {
    1: [
        {
            question: {
                en: "What should you do if you feel an earthquake while in class?",
                hi: "यदि आप कक्षा में भूकंप महसूस करते हैं तो आपको क्या करना चाहिए?",
                mr: "वर्गात भूकंप जाणवला तर काय करावे?",
                es: "¿Qué debes hacer si sientes un terremoto en clase?",
                te: "మీరు తరగతిలో భూకంపాన్ని అనుభవిస్తే ఏమి చేయాలి?"
            },
            options: {
                en: ["Run outside", "Stand near windows", "Hide under your desk"],
                hi: ["बाहर भागो", "खिड़कियों के पास खड़े हो जाओ", "डेस्क के नीचे छुपो"],
                mr: ["बाहेर पळा", "खिडकीजवळ उभे रहा", "डेस्कखाली लपवा"],
                es: ["Corre afuera", "Párate cerca de las ventanas", "Escóndete debajo de tu escritorio"],
                te: ["బయటకు పరుగెత్తండి", "కిటికీల దగ్గర నిలబడండి", "మీ డెస్క్ కింద దాచండి"]
            },
            answer: {
                en: "Hide under your desk",
                hi: "डेस्क के नीचे छुपो",
                mr: "डेस्कखाली लपवा",
                es: "Escóndete debajo de tu escritorio",
                te: "మీ డెస్క్ కింద దాచండి"
            }
        },
        {
            question: {
                en: "Which light tells you to STOP at a traffic signal?",
                hi: "ट्रैफिक सिग्नल पर कौन सी बत्ती आपको रुकने का संकेत देती है?",
                mr: "ट्रॅफिक सिग्नलवर कोणता दिवा थांबण्याचा संकेत देतो?",
                es: "¿Qué luz te dice que te DETENGAS en un semáforo?",
                te: "ట్రాఫిక్ సిగ్నల్‌లో ఏ లైట్ మిమ్మల్ని ఆపమని చెబుతుంది?"
            },
            options: {
                en: ["Red light", "Green light", "Yellow light"],
                hi: ["लाल बत्ती", "हरी बत्ती", "पीली बत्ती"],
                mr: ["लाल दिवा", "हिरवा दिवा", "पिवळा दिवा"],
                es: ["Luz roja", "Luz verde", "Luz amarilla"],
                te: ["ఎరుపు లైట్", "పచ్చని లైట్", "పసుపు లైట్"]
            },
            answer: {
                en: "Red light",
                hi: "लाल बत्ती",
                mr: "लाल दिवा",
                es: "Luz roja",
                te: "ఎరుపు లైట్"
            }
        },
        {
            question: {
                en: "What should you do if you get lost in a public place?",
                hi: "यदि आप सार्वजनिक स्थान पर खो जाते हैं तो क्या करना चाहिए?",
                mr: "सार्वजनिक ठिकाणी हरवल्यास काय करावे?",
                es: "¿Qué debes hacer si te pierdes en un lugar público?",
                te: "పబ్లిక్ ప్రదేశంలో తప్పిపోతే ఏమి చేయాలి?"
            },
            options: {
                en: ["Go with strangers", "Stay where you are", "Run away"],
                hi: ["अजनबियों के साथ जाएं", "जहाँ हैं वहीं रुकें", "भाग जाएं"],
                mr: ["अनोळखी व्यक्तींसोबत जा", "जिथे आहात तिथेच थांबा", "पळून जा"],
                es: ["Ir con extraños", "Quedarse donde estás", "Huir corriendo"],
                te: ["అపరిచితులతో వెళ్ళండి", "మీరున్న చోటనే ఉండండి", "పరుగెత్తండి"]
            },
            answer: {
                en: "Stay where you are",
                hi: "जहाँ हैं वहीं रुकें",
                mr: "जिथे आहात तिथेच थांबा",
                es: "Quedarse donde estás",
                te: "మీరున్న చోటనే ఉండండి"
            }
        }
    ],
    2: [
        {
            question: {
                en: "If there is a fire drill, what should you do first?",
                hi: "अगर फायर ड्रिल है तो सबसे पहले क्या करना चाहिए?",
                mr: "फायर ड्रिल असल्यास सर्वप्रथम काय करावे?",
                es: "¿Qué debes hacer primero si hay un simulacro de incendio?",
                te: "ఫైర్ డ్రిల్ ఉంటే ముందుగా ఏమి చేయాలి?"
            },
            options: {
                en: ["Hide in the bathroom", "Shout loudly", "Follow your teacher"],
                hi: ["बाथरूम में छुप जाओ", "जोर से चिल्लाओ", "अपने शिक्षक का अनुसरण करो"],
                mr: ["बाथरूममध्ये लपवा", "जोरात ओरडा", "शिक्षकाचा पाठपुरावा करा"],
                es: ["Escóndete en el baño", "Grita fuerte", "Sigue a tu maestro"],
                te: ["బాత్రూమ్‌లో దాచండి", "బిగ్గరగా అరవండి", "మీ టీచర్‌ను అనుసరించండి"]
            },
            answer: {
                en: "Follow your teacher",
                hi: "अपने शिक्षक का अनुसरण करो",
                mr: "शिक्षकाचा पाठपुरावा करा",
                es: "Sigue a tu maestro",
                te: "మీ టీచర్‌ను అనుసరించండి"
            }
        },
        {
            question: {
                en: "What should you keep near your bed at night?",
                hi: "रात में अपने बिस्तर के पास क्या रखना चाहिए?",
                mr: "रात्री बेडजवळ काय ठेवावे?",
                es: "¿Qué debes mantener cerca de tu cama por la noche?",
                te: "రాత్రి మీ పడక దగ్గర ఏమి ఉంచాలి?"
            },
            options: {
                en: ["Toys", "Flashlight", "Food"],
                hi: ["खिलौने", "टॉर्च", "खाना"],
                mr: ["खेळणी", "टॉर्च", "अन्न"],
                es: ["Juguetes", "Linterna", "Comida"],
                te: ["ఆట వస్తువులు", "టార్చ్", "ఆహారం"]
            },
            answer: {
                en: "Flashlight",
                hi: "टॉर्च",
                mr: "टॉर्च",
                es: "Linterna",
                te: "టార్చ్"
            }
        },
        {
            question: {
                en: "Which number should you call for help in a fire?",
                hi: "आग लगने पर मदद के लिए किस नंबर पर कॉल करना चाहिए?",
                mr: "आग लागल्यास मदतीसाठी कोणत्या क्रमांकावर कॉल करावा?",
                es: "¿A qué número debes llamar para pedir ayuda en caso de incendio?",
                te: "అగ్ని ప్రమాదంలో సహాయం కోసం ఏ నంబర్‌కు కాల్ చేయాలి?"
            },
            options: {
                en: ["911", "101", "108"],
                hi: ["911", "101", "108"],
                mr: ["911", "101", "108"],
                es: ["911", "101", "108"],
                te: ["911", "101", "108"]
            },
            answer: {
                en: "101",
                hi: "101",
                mr: "101",
                es: "101",
                te: "101"
            }
        }
    ],
    3: [
        {
            question: {
                en: "What items should be in a basic first aid kit?",
                hi: "प्राथमिक चिकित्सा किट में कौन सी वस्तुएं होनी चाहिए?",
                mr: "प्राथमिक उपचार पेटीत कोणत्या वस्तू असाव्यात?",
                es: "¿Qué elementos debe tener un botiquín de primeros auxilios básico?",
                te: "ప్రాథమిక ప్రథమ చికిత్స కిట్‌లో ఏ వస్తువులు ఉండాలి?"
            },
            options: {
                en: ["Only candy", "Bandages and antiseptic", "Just water"],
                hi: ["केवल कैंडी", "बैंडेज और एंटीसेप्टिक", "केवल पानी"],
                mr: ["फक्त कॅन्डी", "बॅंडेज आणि जंतुनाशक", "फक्त पाणी"],
                es: ["Solo caramelos", "Vendas y antiséptico", "Solo agua"],
                te: ["కేవలం క్యాండీ", "కట్టులు మరియు యాంటీసెప్టిక్", "నీరు మాత్రమే"]
            },
            answer: {
                en: "Bandages and antiseptic",
                hi: "बैंडेज और एंटीसेप्टिक",
                mr: "बॅंडेज आणि जंतुनाशक",
                es: "Vendas y antiséptico",
                te: "కట్టులు మరియు యాంటీసెప్టిక్"
            }
        },
        {
            question: {
                en: "What should you do if you see a snake?",
                hi: "अगर आप सांप देखें तो क्या करना चाहिए?",
                mr: "साप दिसल्यास काय करावे?",
                es: "¿Qué debes hacer si ves una serpiente?",
                te: "మీరు పాము చూస్తే ఏమి చేయాలి?"
            },
            options: {
                en: ["Try to catch it", "Stay still and back away slowly", "Run towards it"],
                hi: ["उसे पकड़ने की कोशिश करें", "स्थिर रहें और धीरे से पीछे हटें", "उसकी ओर दौड़ें"],
                mr: ["पकडण्याचा प्रयत्न करा", "स्थिर राहा आणि हळूहळू मागे सरका", "त्याच्याकडे धावा"],
                es: ["Intentar atraparla", "Quedarte quieto y retroceder lentamente", "Correr hacia ella"],
                te: ["దానిని పట్టుకోవడానికి ప్రయత్నించండి", "నిశ్చలంగా ఉండి నెమ్మదిగా వెనక్కి వెళ్లండి", "దాని వైపు పరుగెత్తండి"]
            },
            answer: {
                en: "Stay still and back away slowly",
                hi: "स्थिर रहें और धीरे से पीछे हटें",
                mr: "स्थिर राहा आणि हळूहळू मागे सरका",
                es: "Quedarte quieto y retroceder lentamente",
                te: "నిశ్చలంగా ఉండి నెమ్మదిగా వెనక్కి వెళ్లండి"
            }
        },
        {
            question: {
                en: "Why should we not play with matches or lighters?",
                hi: "हमें माचिस या लाइटर से क्यों नहीं खेलना चाहिए?",
                mr: "आपण काडेपेटी किंवा लायटरशी का खेळू नये?",
                es: "¿Por qué no debemos jugar con fósforos o encendedores?",
                te: "మాచిస్ లేదా లైటర్లతో ఎందుకు ఆడకూడదు?"
            },
            options: {
                en: ["Because they're fun", "They can start dangerous fires", "They're expensive"],
                hi: ["क्योंकि वे मजेदार हैं", "वे खतरनाक आग लगा सकते हैं", "वे महंगे हैं"],
                mr: ["कारण ते मजेदार आहेत", "ते धोकादायक आग लावू शकतात", "ते महाग आहेत"],
                es: ["Porque son divertidos", "Pueden iniciar incendios peligrosos", "Son caros"],
                te: ["అవి సరదాగా ఉంటాయి కాబట్టి", "అవి ప్రమాదకరమైన అగ్ని ప్రమాదాలను సృష్టించగలవు", "అవి ఖరీదైనవి"]
            },
            answer: {
                en: "They can start dangerous fires",
                hi: "वे खतरनाक आग लगा सकते हैं",
                mr: "ते धोकादायक आग लावू शकतात",
                es: "Pueden iniciar incendios peligrosos",
                te: "అవి ప్రమాదకరమైన అగ్ని ప్రమాదాలను సృష్టించగలవు"
            }
        }
    ],
    4: [
        {
            question: {
                en: "What should you keep in your emergency survival kit?",
                hi: "आपके आपातकालीन सर्वाइवल किट में क्या होना चाहिए?",
                mr: "आपत्कालीन जगण्याच्या किटमध्ये काय ठेवावे?",
                es: "¿Qué debes mantener en tu kit de supervivencia de emergencia?",
                te: "మీ అత్యవసర సర్వైవల్ కిట్‌లో ఏమి ఉంచుకోవాలి?"
            },
            options: {
                en: ["Only clothes", "Water, food, and first-aid kit", "Just money"],
                hi: ["केवल कपड़े", "पानी, खाना और फर्स्ट-एड किट", "केवल पैसे"],
                mr: ["फक्त कपडे", "पाणी, अन्न आणि प्रथमोपचार पेटी", "फक्त पैसे"],
                es: ["Solo ropa", "Agua, comida y botiquín", "Solo dinero"],
                te: ["దుస్తులు మాత్రమే", "నీరు, ఆహారం మరియు ప్రథమ చికిత్స కిట్", "డబ్బు మాత్రమే"]
            },
            answer: {
                en: "Water, food, and first-aid kit",
                hi: "पानी, खाना और फर्स्ट-एड किट",
                mr: "पाणी, अन्न आणि प्रथमोपचार पेटी",
                es: "Agua, comida y botiquín",
                te: "నీరు, ఆహారం మరియు ప్రథమ చికిత్స కిట్"
            }
        },
        {
            question: {
                en: "What should you do during a cyclone warning?",
                hi: "चक्रवात की चेतावनी के दौरान क्या करना चाहिए?",
                mr: "चक्रीवादळाच्या इशाऱ्यादरम्यान काय करावे?",
                es: "¿Qué debes hacer durante una advertencia de ciclón?",
                te: "తుఫాను హెచ్చరిక సమయంలో ఏమి చేయాలి?"
            },
            options: {
                en: ["Go to the beach", "Store water and food", "Play outside"],
                hi: ["समुद्र तट पर जाएं", "पानी और खाना स्टोर करें", "बाहर खेलें"],
                mr: ["समुद्रकिनारी जा", "पाणी आणि अन्न साठवा", "बाहेर खेळा"],
                es: ["Ir a la playa", "Almacenar agua y comida", "Jugar afuera"],
                te: ["బీచ్‌కి వెళ్లండి", "నీరు మరియు ఆహారం నిల్వ చేయండి", "బయట ఆడండి"]
            },
            answer: {
                en: "Store water and food",
                hi: "पानी और खाना स्टोर करें",
                mr: "पाणी आणि अन्न साठवा",
                es: "Almacenar agua y comida",
                te: "నీరు మరియు ఆహారం నిల్వ చేయండి"
            }
        },
        {
            question: {
                en: "Which places should you avoid during a flood?",
                hi: "बाढ़ के दौरान किन स्थानों से बचना चाहिए?",
                mr: "पुराच्या वेळी कोणती ठिकाणे टाळावीत?",
                es: "¿Qué lugares debes evitar durante una inundación?",
                te: "వరద సమయంలో ఏ ప్రదేశాలను నివారించాలి?"
            },
            options: {
                en: ["High ground", "Basement and low areas", "Upper floors"],
                hi: ["ऊंची जमीन", "तहखाना और निचले क्षेत्र", "ऊपरी मंजिल"],
                mr: ["उंच जमीन", "तळघर आणि खालची क्षेत्रे", "वरचे मजले"],
                es: ["Terreno alto", "Sótano y zonas bajas", "Pisos superiores"],
                te: ["ఎత్తైన ప్రదేశం", "బేస్‌మెంట్ మరియు పల్లపు ప్రాంతాలు", "పై అంతస్తులు"]
            },
            answer: {
                en: "Basement and low areas",
                hi: "तहखाना और निचले क्षेत्र",
                mr: "तळघर आणि खालची क्षेत्रे",
                es: "Sótano y zonas bajas",
                te: "బేస్‌మెంట్ మరియు పల్లపు ప్రాంతాలు"
            }
        }
    ],
    5: [
        {
            question: {
                en: "What should you do if you hear a tsunami warning?",
                hi: "सुनामी की चेतावनी सुनने पर क्या करना चाहिए?",
                mr: "त्सुनामीची सूचना ऐकल्यास काय करावे?",
                es: "¿Qué debes hacer si escuchas una advertencia de tsunami?",
                te: "సునామీ హెచ్చరిక వినిపిస్తే ఏమి చేయాలి?"
            },
            options: {
                en: ["Go to the beach", "Move to higher ground", "Stay where you are"],
                hi: ["समुद्र तट पर जाएं", "ऊंची जगह पर जाएं", "जहां हैं वहीं रहें"],
                mr: ["समुद्रकिनारी जा", "उंच जागी जा", "जिथे आहात तिथेच रहा"],
                es: ["Ir a la playa", "Ir a un lugar más alto", "Quedarse donde estás"],
                te: ["బీచ్‌కి వెళ్లండి", "ఎత్తైన ప్రదేశానికి వెళ్లండి", "మీరున్న చోటనే ఉండండి"]
            },
            answer: {
                en: "Move to higher ground",
                hi: "ऊंची जगह पर जाएं",
                mr: "उंच जागी जा",
                es: "Ir a un lugar más alto",
                te: "ఎత్తైన ప్రదేశానికి వెళ్లండి"
            }
        },
        {
            question: {
                en: "What important numbers should you save on your phone?",
                hi: "अपने फोन में कौन से महत्वपूर्ण नंबर सेव करने चाहिए?",
                mr: "फोनमध्ये कोणते महत्त्वाचे क्रमांक सेव्ह करावेत?",
                es: "¿Qué números importantes debes guardar en tu teléfono?",
                te: "మీ ఫోన్‌లో ఏ ముఖ్యమైన నంబర్లను సేవ్ చేసుకోవాలి?"
            },
            options: {
                en: ["Friends only", "Emergency services and family", "Game numbers"],
                hi: ["केवल दोस्तों के", "आपातकालीन सेवाएं और परिवार", "गेम नंबर"],
                mr: ["फक्त मित्रांचे", "आपत्कालीन सेवा आणि कुटुंब", "गेम क्रमांक"],
                es: ["Solo amigos", "Servicios de emergencia y familia", "Números de juegos"],
                te: ["స్నేహితుల నంబర్లు మాత్రమే", "అత్యవసర సేవలు మరియు కుటుంబం", "గేమ్ నంబర్లు"]
            },
            answer: {
                en: "Emergency services and family",
                hi: "आपातकालीन सेवाएं और परिवार",
                mr: "आपत्कालीन सेवा आणि कुटुंब",
                es: "Servicios de emergencia y familia",
                te: "అత్యవసర సేవలు మరియు కుటుంబం"
            }
        },
        {
            question: {
                en: "How can you help in a disaster situation?",
                hi: "आपदा की स्थिति में आप कैसे मदद कर सकते हैं?",
                mr: "आपत्ती परिस्थितीत तुम्ही कसे मदत करू शकता?",
                es: "¿Cómo puedes ayudar en una situación de desastre?",
                te: "విపత్తు పరిస్థితిలో మీరు ఎలా సహాయపడగలరు?"
            },
            options: {
                en: ["Take photos", "Follow instructions and stay calm", "Run away"],
                hi: ["फोटो लें", "निर्देशों का पालन करें और शांत रहें", "भाग जाएं"],
                mr: ["फोटो काढा", "सूचनांचे पालन करा आणि शांत रहा", "पळून जा"],
                es: ["Tomar fotos", "Seguir instrucciones y mantener la calma", "Huir"],
                te: ["ఫోటోలు తీయండి", "సూచనలను పాటించి ప్రశాంతంగా ఉండండి", "పారిపోండి"]
            },
            answer: {
                en: "Follow instructions and stay calm",
                hi: "निर्देशों का पालन करें और शांत रहें",
                mr: "सूचनांचे पालन करा आणि शांत रहा",
                es: "Seguir instrucciones y mantener la calma",
                te: "సూచనలను పాటించి ప్రశాంతంగా ఉండండి"
            }
        }
    ]
};

// --- LOGIN/SIGNUP ---
function showSignup() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('signupScreen').classList.remove('hidden');
    speak("Welcome to the sign up page. Please create your account.");
}

function showLogin() {
    document.getElementById('signupScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    speak("Welcome to the login page. Please enter your username and password.");
}

function signup() {
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    if (!username || !password) {
        speak('Please enter username and password.');
        alert('Please enter username and password.');
        return;
    }
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
        speak('Username already exists.');
        alert('Username already exists.');
        return;
    }
    users[username] = { password: password };
    localStorage.setItem('users', JSON.stringify(users));
    speak('Account created! Please sign in.');
    alert('Account created! Please sign in.');
    showLogin();
}

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Check demo credentials
    if (username === "student" && password === "pass123") {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        speak("Welcome to Disaster Prep Portal! You are now logged in.");
        return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    // Check localStorage users
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username] && users[username].password === password) {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        speak("Welcome, " + username + "! You are now logged in.");
    } else {
        speak("Invalid username or password. Try student pass one two three for demo or sign up.");
        // Show creative error message
        var errorDiv = document.getElementById('errorMessage');
        errorDiv.classList.remove('hidden');
        errorDiv.classList.add('show');
        // Optionally, update text for more creativity
        document.getElementById('errorText').textContent = "Sorry, please enter valid credentials!";
        // Hide after 3 seconds
        setTimeout(function() {
            errorDiv.classList.add('hidden');
            errorDiv.classList.remove('show');
        }, 3000);
    }
}

function logout() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    speak("You have been logged out. Please login again to continue.");
    localStorage.setItem('isLoggedIn', 'false');
}

// --- NAVIGATION ---
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(function(s) {
        s.classList.add('hidden');
    });
    var section = document.getElementById(sectionId);
    if (section) section.classList.remove('hidden');
    let messages = {
        home: t('dashboardVoice') || "This is your dashboard. Explore disaster safety tips and your progress.",
    emergency: t('emergencyVoice') || "Here are emergency contacts for Vizag.",
        quizzes: t('quizzesVoice') || "Test your disaster knowledge with quizzes.",
        games: t('gamesVoice') || "Play disaster safety games for your class.",
        hackathon: t('hackathonVoice') || "Welcome to Hackathon Mode. Solve disaster scenarios by making quick decisions.",
        advanced: t('advancedVoice') || "Try the advanced real-time disaster simulation.",
        videos: t('videosVoice') || "Watch disaster safety videos and learn how to stay safe."
    };
    if (messages[sectionId]) speak(messages[sectionId]);
    if (sectionId === 'quizzes') {
        startQuiz();
        speak(t('quizzesVoice'));
    }
    if (sectionId === 'videos') {
        renderVideos();
        speak(t('videosVoice'));
    }
    if (sectionId === 'games') {
        speak(t('gamesVoice'));
    }
    if (sectionId === 'hackathon') {
        speak(t('hackathonVoice'));
    }
    if (sectionId === 'advanced') {
        speak(t('advancedVoice'));
    }
}

function toggleVoice() {
    voiceEnabled = !voiceEnabled;
    alert('Voice is now ' + (voiceEnabled ? 'ON' : 'OFF'));
}

function speak(text) {
    if (!voiceEnabled) return;
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        // Use translated text if key exists
        const key = Object.keys(translations[currentLanguage]).find(k => translations[currentLanguage][k] === text);
        const speakText = key ? t(key) : text;
        const utter = new SpeechSynthesisUtterance(speakText);
        utter.rate = 1;
        utter.pitch = 1;
        // Set language for voice
        let langCode = 'en-US';
        if (currentLanguage === 'hi') langCode = 'hi-IN';
        else if (currentLanguage === 'mr') langCode = 'mr-IN';
        else if (currentLanguage === 'es') langCode = 'es-ES';
        else if (currentLanguage === 'te') langCode = 'te-IN';
        utter.lang = langCode;
        // Try to select a matching voice
        const voices = window.speechSynthesis.getVoices();
        let match = voices.find(v => v.lang === langCode);
        // Fallback: if no exact match, try any voice for the language
        if (!match) {
            const baseLang = langCode.split('-')[0];
            match = voices.find(v => v.lang.startsWith(baseLang));
        }
        // Fallback: if still no match, use English
        if (!match) {
            match = voices.find(v => v.lang.startsWith('en'));
            utter.lang = 'en-US';
        }
        if (match) utter.voice = match;
        // Debug logging
        console.log('Speak:', {text: speakText, lang: utter.lang, voice: match ? match.name : 'none', voices: voices.map(v => v.lang + ' - ' + v.name)});
        window.speechSynthesis.speak(utter);
    }
}

function shareContacts() {
    const contacts = 'NDMA: 011-26701700\nVizag: 0891-2568499';
    navigator.clipboard.writeText(contacts).then(() => alert('Contacts copied! Share with parents.'));
}

// --- QUIZ ---
function startQuiz() {
    let questions = shuffle([...quizQuestions]);
    let score = 0;
    let current = 0;
    showQuestion();

    function showQuestion() {
        if (current >= questions.length) {
            document.getElementById('quizContent').innerHTML = `
                <div class="score-badge">
                    <span>🏅</span>
                    <div>${t('yourScore') || 'Your Score'}: <b>${score}/${questions.length}</b></div>
                </div>
            `;
            updateProgressBar(score, questions.length);
            addBadge(score >= 4 ? t('quizMaster') || "Quiz Master" : t('quizParticipant') || "Quiz Participant");
            checkAchievements();
            return;
        }
        const q = questions[current];
        speak(q.q[currentLanguage] || q.q['en']);
        let html = `<p><b>${q.q[currentLanguage] || q.q['en']}</b></p>`;
        (q.options[currentLanguage] || q.options['en']).forEach(function(opt) {
            html += `<button class="quiz-btn" onclick="window.checkAnswerQuiz('${opt}')">${opt}</button><br>`;
        });
        document.getElementById('quizContent').innerHTML = html;
    }

    window.checkAnswerQuiz = function(selected) {
        const q = questions[current];
        let feedback = '';
        // Highlight selected button red if wrong
        let btns = document.querySelectorAll('.quiz-btn');
        btns.forEach(btn => {
            if (btn.textContent === selected) {
                if (selected === (q.a[currentLanguage] || q.a['en'])) {
                    btn.classList.add('quiz-correct');
                } else {
                    btn.classList.add('quiz-wrong');
                }
            }
        });
        if (selected === (q.a[currentLanguage] || q.a['en'])) {
            feedback = `<div class='quiz-feedback correct'>${t('correctAnswer') || "Correct answer! Well done."}<br><span class='hurray'>🎉 Hurray!</span><span class='cracker-blast'>🧨</span></div>`;
            speak(t('correctAnswer') || "Correct answer! Well done.");
            document.getElementById('quizContent').innerHTML += feedback;
            setTimeout(() => {
                current++;
                showQuestion();
            }, 1500);
        } else {
            feedback = `<div class='quiz-feedback wrong' style='color:red;'>${t('wrongAnswer') || "Wrong answer. Try again."}</div>`;
            speak(t('wrongAnswer') || "Wrong answer. Try again.");
            document.getElementById('quizContent').innerHTML += feedback;
            setTimeout(() => {
                // Remove wrong feedback and red highlight after delay
                let fb = document.querySelector('.quiz-feedback.wrong');
                if (fb) fb.remove();
                btns.forEach(btn => btn.classList.remove('quiz-wrong'));
            }, 1200);
        }
    };
}

function updateProgressBar(score, total) {
    const percent = Math.round((score / total) * 100);
    document.getElementById('progress').textContent = percent + "%";
    document.getElementById('progressFill').style.width = percent + "%";
}

// --- GAME ---
function startDragGame() {
    const classLevel = document.getElementById('dragClassLevel').value;
    // Filter questions for current class level and get translated content
    const questions = classDragQuestions[classLevel] || [];
    let current = 0;
    let score = 0;

    function showDragQuestion() {
        if (current >= questions.length) {
            document.getElementById('dragArea').innerHTML = `
                <div class="score-badge">
                    <span>🏅</span>
                    <div>${t('yourScore') || 'Your Score'}: <b>${score}/${questions.length}</b></div>
                </div>
            `;
            updateProgressBar(score, questions.length);
            addBadge(score >= questions.length ? t('dragMaster') || "Drag Master" : t('dragParticipant') || "Drag Participant");
            return;
        }

        const q = questions[current];
        // Get language-specific content or fallback to English
        const questionText = q.q[currentLanguage] || q.q['en'];
        const items = q.items[currentLanguage] || q.items['en'];
        const correct = q.correct[currentLanguage] || q.correct['en'];
        
        let html = `
            <div class="drag-question-container">
                <div class="drag-question">${questionText}</div>
                <div class="drag-instructions">${t('dragInstructions') || 'Drag the correct item to answer each question!'}</div>
            </div>`;

        html += '<div class="drag-items">';
        items.forEach((item, index) => {
            html += `
                <div class="drag-item" draggable="true" data-item="${item}">
                    <span class="drag-item-text">${item}</span>
                    <span class="drag-handle">⋮</span>
                </div>`;
        });
        html += '</div>';
        html += `<div class="drop-zone" data-correct="${correct}">
            <div class="drop-zone-text">${t('dropHere') || 'Drop your answer here'}</div>
            <div class="drop-zone-icon">🎯</div>
        </div>`;
        
        document.getElementById('dragArea').innerHTML = html;
        
        // Add drag and drop event listeners
        const dragItems = document.querySelectorAll('.drag-item');
        const dropZone = document.querySelector('.drop-zone');
        
        dragItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.item);
                e.target.classList.add('dragging');
                e.target.style.opacity = '0.5';
            });
            
            item.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
                e.target.style.opacity = '1';
            });
        });
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            
            const droppedItem = e.dataTransfer.getData('text/plain');
            if (droppedItem === dropZone.dataset.correct) {
                score++;
                dropZone.innerHTML = `
                    <div class='correct-drop'>
                        <div class="correct-icon">✅</div>
                        <div class="correct-text">${t('correctDrop') || 'Correct! Well done.'}</div>
                        <div class="celebration">🎉</div>
                    </div>`;
                speak(t('correctDrop') || "Correct! Well done.");
                setTimeout(() => {
                    current++;
                    document.getElementById('dragScoreValue').textContent = score;
                    showDragQuestion();
                }, 1500);
            } else {
                dropZone.innerHTML = `
                    <div class='wrong-drop'>
                        <div class="wrong-icon">❌</div>
                        <div class="wrong-text">${t('wrongDrop') || 'Try again!'}</div>
                    </div>`;
                speak(t('wrongDrop') || "Try again!");
                setTimeout(() => {
                    dropZone.innerHTML = `
                        <div class="drop-zone-text">${t('dropHere') || 'Drop your answer here'}</div>
                        <div class="drop-zone-icon">🎯</div>`;
                }, 1200);
            }
        });
    }

    // initialize score display
    document.getElementById('dragScoreValue').textContent = '0';
    showDragQuestion();
}

function startGame() {
    speak(t('gamesVoice'));
    const classLevel = document.getElementById('classLevel').value;
    const questions = classQuestions[classLevel];
    if (!questions) {
        document.getElementById('gameArea').innerHTML = "No questions for this class.";
        return;
    }
    let current = 0;
    let score = 0;

    const environments = {
        1: {
            intro: t('floodRising'),
            success: `<span style='color:green;font-size:1.2em;'>${t('floodSafeMsg')}</span>`,
            fail: `<div class='disaster-anim flood'><span>🌊</span><br><b>${t('floodCaught')}</b></div>`
        },
        2: {
            intro: t('earthquakeEscape'),
            success: `<span style='color:green;font-size:1.2em;'>${t('earthquakeEscape')}</span>`,
            fail: `<div class='disaster-anim quake'><span>🌋</span><br><b>${t('earthquakeTrapped')}</b></div>`
        },
        3: {
            intro: t('firefightersOnWay'),
            success: `<span style='color:green;font-size:1.2em;'>${t('firefightersOnWay')}</span>`,
            fail: `<div class='disaster-anim fire'><span>🔥</span><br><b>${t('noHelp')}</b></div>`
        },
        4: {
            intro: t('floodAvoided'),
            success: `<span style='color:green;font-size:1.2em;'>${t('floodAvoided')}</span>`,
            fail: `<div class='disaster-anim flood'><span>🌊</span><br><b>${t('floodCaught')}</b></div>`
        },
        5: {
            intro: "A disaster is happening! Why should you stay calm?",
            success: "<span style='color:green;font-size:1.2em;'>😌 You stayed calm and handled the disaster!</span>",
            fail: "<div class='disaster-anim panic'><span>😱</span><br><b>You panicked and made mistakes!</b></div>"
        }
    };

    document.getElementById('gameArea').innerHTML = `<p>${environments[classLevel].intro}</p>`;
    setTimeout(showQuestion, 1200);

    function showQuestion() {
        const q = questions[current];
        let html = `<p><b>${q.question[currentLanguage] || q.question['en']}</b></p>`;
        (q.options[currentLanguage] || q.options['en']).forEach(function(opt) {
            html += `<button class="quiz-btn" onclick="window.answerGame('${opt}')">${opt}</button><br>`;
        });
        document.getElementById('gameArea').innerHTML = html;
    }

    window.answerGame = function(selected) {
        const q = questions[current];
        if (selected === (q.answer[currentLanguage] || q.answer['en'])) {
            score++;
            document.getElementById('gameArea').innerHTML = environments[classLevel].success;
            speak(t('correct') || "Correct! You survived the disaster.");
        } else {
            document.getElementById('gameArea').innerHTML = environments[classLevel].fail;
            speak(t('wrong') || "Wrong! You faced the disaster.");
        }
        document.getElementById('gameScore').textContent = `${t('score') || 'Score'}: ${score}`;
        setTimeout(function() {
            current++;
            if (current < questions.length) {
                showQuestion();
            } else {
                document.getElementById('gameArea').innerHTML += `<br><b>${t('gameOver') || 'Game Over!'}</b>`;
                updateLeaderboard(currentUser || 'Anonymous', score);
            }
        }, 1500);
    };

    document.getElementById('gameScore').textContent = `${t('score') || 'Score'}: ${score}`;
    document.getElementById('levelProgress').textContent = `${t('level') || 'Level'}: ${classLevel}/5`;
}

// --- ADVANCED SIMULATION ---
function startAdvancedSimulation() {
    const simQuestion = document.getElementById('simQuestion');
    const simFeedback = document.getElementById('simFeedback');
    const realMap = document.getElementById('realMap');
    const safePlaces = document.getElementById('safePlaces');
    simQuestion.textContent = t('floodAlert');
    simFeedback.innerHTML = `
        <b>${t('directions')}</b>
        <ul>
            <li>🚶‍♂️ <b>${t('moveHighPlace')}</b></li>
            <li>🚫 <b>${t('avoidBasement')}</b></li>
            <li>🎒 ${t('keepSupplies')}</li>
            <li>🆘 ${t('waitRescue')}</li>
        </ul>
        <b>${t('safePlaces')}</b> 🏫 ${t('safePlacesList')}<br>
        <b>${t('unsafePlaces')}</b> 🚫 ${t('unsafePlacesList')}
    `;
    speak(t('floodAlertVoice'));
    realMap.innerHTML = '';
    safePlaces.innerHTML = '';

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            realMap.innerHTML = `<div id="leafletMap" style="width:100%;height:300px;border-radius:12px;overflow:hidden;"></div>`;

            const map = L.map('leafletMap').setView([lat, lon], 16);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            const userIcon = L.divIcon({
                className: 'sim-user-marker',
                html: `<div style="font-size:2em;filter:drop-shadow(0 2px 6px #36d1c4aa);">📍</div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });
            const marker = L.marker([lat, lon], { icon: userIcon }).addTo(map);
            marker.bindPopup(`<b>📍 ${t('youAreHere')}</b><br>${t('stayAlert')}`).openPopup();

            safePlaces.innerHTML = `
                <b>${t('findSafePlaces')}</b><br>
                <a href="https://www.google.com/maps/search/school/@${lat},${lon},15z" target="_blank">🏫 ${t('schools')}</a>
                <a href="https://www.google.com/maps/search/hospital/@${lat},${lon},15z" target="_blank">🏥 ${t('hospitals')}</a>
                <a href="https://www.google.com/maps/search/police+station/@${lat},${lon},15z" target="_blank">🚓 ${t('policeStations')}</a>
                <a href="https://www.google.com/maps/search/shelter/@${lat},${lon},15z" target="_blank">🏠 ${t('shelters')}</a>
            `;
        }, function(error) {
            simFeedback.innerHTML += `<br><b>${t('locationAccessError')}</b>`;
            speak(t('locationAccessError'));
        });
    } else {
    simFeedback.innerHTML += `<br><b>${t('geolocationNotSupported')}</b>`;
    speak(t('geolocationNotSupported'));
    }
}

// --- YOUTUBE VIDEOS ---
// Public, embeddable, easy-access disaster videos:
const disasterVideos = [
    {
        id: "dKQnG7Vw3xw",
        title: {
            en: "Disaster Preparedness for Kids",
            hi: "बच्चों के लिए आपदा तैयारी",
            mr: "मुलांसाठी आपत्ती तयारी",
            es: "Preparación para desastres para niños",
            te: "పిల్లల కోసం విపత్తు సిద్ధత"
        }
    },
    {
        id: "w7VwBqRr1nA",
        title: {
            en: "Flood Safety Tips",
            hi: "बाढ़ सुरक्षा टिप्स",
            mr: "पूर सुरक्षा टिप्स",
            es: "Consejos de seguridad ante inundaciones",
            te: "వరద భద్రతా సూచనలు"
        }
    },
    {
        id: "lA3r4K8Q93E",
        title: {
            en: "Earthquake Safety Tips",
            hi: "भूकंप सुरक्षा टिप्स",
            mr: "भूकंप सुरक्षा टिप्स",
            es: "Consejos de seguridad ante terremotos",
            te: "భూకంప భద్రతా సూచనలు"
        }
    }
];

function renderVideos() {
    var grid = document.getElementById('videoGrid');
    grid.innerHTML = "";
    disasterVideos.forEach(function(video) {
        var card = document.createElement('div');
        card.className = "video-card";
        card.innerHTML = `
            <div class="video-title">
                <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener">
                    ${video.title[currentLanguage] || video.title['en']}
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- UTILITY ---
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- BADGES & ACHIEVEMENTS (stub functions) ---
function addBadge(name) {
    if (!badges.includes(name)) {
        badges.push(name);
        document.getElementById('badgeList').innerHTML += `<span>${name}</span>`;
    }
}
function checkAchievements() {
    if (gameScore >= 5 && !badges.includes('Disaster Hero')) {
        addBadge('Disaster Hero');
        alert('Achievement unlocked: Disaster Hero!');
    }
}

// --- LEADERBOARD ---
function updateLeaderboard(username, score) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboard.push({ username, score, date: new Date().toLocaleString() });
    leaderboard = leaderboard.sort(function(a, b) { return b.score - a.score; }).slice(0, 10);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function showLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    let html = "<h3>Leaderboard</h3><ol>";
    leaderboard.forEach(function(entry) {
        html += `<li>${entry.username || 'Anonymous'}: ${entry.score} pts <span style="font-size:0.8em;color:#888;">(${entry.date})</span></li>`;
    });
    html += "</ol>";
    document.getElementById('home').innerHTML += html;
}

document.addEventListener('DOMContentLoaded', function() {
    if (isLoggedIn) {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
    } else {
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
    }
    if (document.getElementById('dashboard')) showLeaderboard();
});

// Hackathon Mode Game for Classes 6-10
const hackathonQuestions = {
    6: [
        {
            scenario: {
                en: "A flood warning has been issued for your area. What should you do first?",
                hi: "आपके क्षेत्र के लिए बाढ़ की चेतावनी जारी की गई है। आपको सबसे पहले क्या करना चाहिए?",
                mr: "तुमच्या परिसरासाठी पूराची सूचना जारी करण्यात आली आहे. तुम्ही प्रथम काय कराल?",
                es: "Se ha emitido una advertencia de inundación para tu área. ¿Qué deberías hacer primero?",
                te: "మీ ప్రాంతానికి వరద హెచ్చరిక జారీ చేయబడింది. మీరు ముందుగా ఏమి చేయాలి?"
            },
            options: {
                en: ["Go outside to watch", "Move valuables to higher ground", "Ignore the warning"],
                hi: ["देखने के लिए बाहर जाएं", "कीमती सामान ऊँची जगह पर रखें", "चेतावनी को अनदेखा करें"],
                mr: ["पाहण्यासाठी बाहेर जा", "किमती वस्तू उंच जागी ठेवा", "सूचनाकडे दुर्लक्ष करा"],
                es: ["Sal afuera a mirar", "Mueve objetos de valor a un lugar más alto", "Ignora la advertencia"],
                te: ["చూడటానికి బయటకు వెళ్లండి", "విలువైన వస్తువులను ఎత్తైన ప్రదేశానికి తరలించండి", "హెచ్చరికను పట్టించుకోకండి"]
            },
            answer: {
                en: "Move valuables to higher ground",
                hi: "कीमती सामान ऊँची जगह पर रखें",
                mr: "किमती वस्तू उंच जागी ठेवा",
                es: "Mueve objetos de valor a un lugar más alto",
                te: "విలువైన వస్తువులను ఎత్తైన ప్రదేశానికి తరలించండి"
            }
        }
    ],
    7: [
        {
            scenario: {
                en: "During an earthquake, you are in a classroom. What is the safest action?",
                hi: "भूकंप के दौरान, आप कक्षा में हैं। सबसे सुरक्षित कार्रवाई क्या है?",
                mr: "भूकंपाच्या वेळी, तुम्ही वर्गात आहात. सर्वात सुरक्षित कृती कोणती?",
                es: "Durante un terremoto, estás en un aula. ¿Cuál es la acción más segura?",
                te: "భూకంప సమయంలో మీరు తరగతిలో ఉన్నారు. అత్యంత సురక్షిత చర్య ఏమిటి?"
            },
            options: {
                en: ["Run outside", "Hide under a sturdy desk", "Stand near windows"],
                hi: ["बाहर भागें", "मजबूत डेस्क के नीचे छुपें", "खिड़कियों के पास खड़े हों"],
                mr: ["बाहेर पळा", "मजबूत डेस्कखाली लपवा", "खिडकीजवळ उभे रहा"],
                es: ["Corre afuera", "Escóndete debajo de un escritorio resistente", "Párate cerca de las ventanas"],
                te: ["బయటకు పరుగెత్తండి", "బలమైన డెస్క్ కింద దాచుకోండి", "కిటికీల దగ్గర నిలబడండి"]
            },
            answer: {
                en: "Hide under a sturdy desk",
                hi: "मजबूत डेस्क के नीचे छुपें",
                mr: "मजबूत डेस्कखाली लपवा",
                es: "Escóndete debajo de un escritorio resistente",
                te: "బలమైన డెస్క్ కింద దాచుకోండి"
            }
        }
    ],
    8: [
        {
            scenario: {
                en: "A fire breaks out in your school. What should you do?",
                hi: "आपके स्कूल में आग लग जाती है। आपको क्या करना चाहिए?",
                mr: "तुमच्या शाळेत आग लागली आहे. तुम्ही काय कराल?",
                es: "Se produce un incendio en tu escuela. ¿Qué deberías hacer?",
                te: "మీ పాఠశాలలో అగ్ని ప్రమాదం సంభవించింది. మీరు ఏమి చేయాలి?"
            },
            options: {
                en: ["Call 101 and evacuate calmly", "Hide in the restroom", "Shout and panic"],
                hi: ["101 पर कॉल करें और शांतिपूर्वक बाहर निकलें", "शौचालय में छुपें", "चिल्लाएं और घबराएं"],
                mr: ["101 वर कॉल करा आणि शांतपणे बाहेर पडा", "शौचालयात लपवा", "ओरडा आणि घाबरा"],
                es: ["Llama al 101 y evacúa con calma", "Escóndete en el baño", "Grita y entra en pánico"],
                te: ["101కి కాల్ చేసి ప్రశాంతంగా బయటకు వెళ్లండి", "బాత్రూమ్‌లో దాచుకోండి", "అరిచి భయపడండి"]
            },
            answer: {
                en: "Call 101 and evacuate calmly",
                hi: "101 पर कॉल करें और शांतिपूर्वक बाहर निकलें",
                mr: "101 वर कॉल करा आणि शांतपणे बाहेर पडा",
                es: "Llama al 101 y evacúa con calma",
                te: "101కి కాల్ చేసి ప్రశాంతంగా బయటకు వెళ్లండి"
            }
        }
    ],
    9: [
        {
            scenario: {
                en: "You see someone injured during a disaster. What is your first step?",
                hi: "आप आपदा के दौरान किसी को घायल देखते हैं। आपकी पहली प्रतिक्रिया क्या होगी?",
                mr: "आपत्तीच्या वेळी तुम्ही कोणाला जखमी पाहता. तुमची पहिली कृती काय असेल?",
                es: "Ves a alguien herido durante un desastre. ¿Cuál es tu primer paso?",
                te: "విపత్తు సమయంలో మీరు ఎవరో గాయపడిన వ్యక్తిని చూస్తారు. మీ మొదటి చర్య ఏమిటి?"
            },
            options: {
                en: ["Call for help and give first aid", "Take a photo", "Run away"],
                hi: ["मदद के लिए कॉल करें और प्राथमिक उपचार दें", "फोटो लें", "भाग जाएं"],
                mr: ["मदतीसाठी कॉल करा आणि प्राथमिक उपचार द्या", "फोटो काढा", "पळा"],
                es: ["Llama para pedir ayuda y da primeros auxilios", "Toma una foto", "Huye"],
                te: ["సహాయం కోసం కాల్ చేసి ప్రథమ చికిత్స చేయండి", "ఫోటో తీసుకోండి", "పరుగెత్తండి"]
            },
            answer: {
                en: "Call for help and give first aid",
                hi: "मदद के लिए कॉल करें और प्राथमिक उपचार दें",
                mr: "मदतीसाठी कॉल करा आणि प्राथमिक उपचार द्या",
                es: "Llama para pedir ayuda y da primeros auxilios",
                te: "సహాయం కోసం కాల్ చేసి ప్రథమ చికిత్స చేయండి"
            }
        }
    ],
    10: [
        {
            scenario: {
                en: "After a disaster, what is most important?",
                hi: "आपदा के बाद सबसे महत्वपूर्ण क्या है?",
                mr: "आपत्ती नंतर सर्वात महत्त्वाचे काय?",
                es: "Después de un desastre, ¿qué es lo más importante?",
                te: "విపత్తు తర్వాత అత్యంత ముఖ్యమైనది ఏమిటి?"
            },
            options: {
                en: ["Check for injuries and hazards", "Post on social media", "Go back to sleep"],
                hi: ["चोट और खतरों की जांच करें", "सोशल मीडिया पर पोस्ट करें", "फिर से सो जाएं"],
                mr: ["जखमा आणि धोके तपासा", "सोशल मीडियावर पोस्ट करा", "परत झोपा"],
                es: ["Verifica lesiones y peligros", "Publica en redes sociales", "Vuelve a dormir"],
                te: ["గాయాలు మరియు ప్రమాదాలను తనిఖీ చేయండి", "సోషల్ మీడియాలో పోస్ట్ చేయండి", "మళ్లీ నిద్రపోండి"]
            },
            answer: {
                en: "Check for injuries and hazards",
                hi: "चोट और खतरों की जांच करें",
                mr: "जखमा आणि धोके तपासा",
                es: "Verifica lesiones y peligros",
                te: "గాయాలు మరియు ప్రమాదాలను తనిఖీ చేయండి"
            }
        }
    ]
};

function startHackathonGame() {
    speak(t('hackathonVoice'));
    speak(t('advancedVoice'));
    var classLevel = document.getElementById('hackathonClass').value;
    var questions = hackathonQuestions[classLevel];
    var current = 0;
    var score = 0;
    var gameArea = document.getElementById('hackathonGameArea');
    var scoreDisplay = document.getElementById('hackathonScore');
    if (!questions) {
        gameArea.innerHTML = "No hackathon questions for this class.";
        return;
    }
    showScenario();

    function showScenario() {
        var q = questions[current];
        var html = `<p><b>${q.scenario[currentLanguage] || q.scenario['en']}</b></p>`;
        (q.options[currentLanguage] || q.options['en']).forEach(function(opt) {
            html += `<button class="quiz-btn" onclick="window.answerHackathon('${opt}')">${opt}</button><br>`;
        });
        gameArea.innerHTML = html;
    }

    window.answerHackathon = function(selected) {
        var q = questions[current];
        if (selected === (q.answer[currentLanguage] || q.answer['en'])) {
            score++;
            gameArea.innerHTML = `<span style='color:green;font-size:1.2em;'>${t('hackathonCorrect') || '✅ Correct! Good decision.'}</span>`;
        } else {
            gameArea.innerHTML = `<span style='color:red;font-size:1.2em;'>${t('incorrect') || '❌ Incorrect. Think again!'}</span>`;
        }
        scoreDisplay.textContent = `${t('hackathonScore') || 'Score:'} ${score}`;
        setTimeout(function() {
            current++;
            if (current < questions.length) {
                showScenario();
            } else {
                gameArea.innerHTML += `<br><b>${t('hackathonOver') || 'Hackathon Over!'}</b>`;
            }
        }, 1200);
    };
}

// Supported languages and translations
const translations = {
    en: {
        // Basic UI Elements
        home: "Welcome to Disaster Prep Portal",
        regularGame: "Regular Quiz Game",
        startGame: "Start Game",
        score: "Score",
        level: "Level",
        
        // Drag and Drop Game
        dragGameTitle: "Drag and Drop Safety Game",
        dragInstructions: "Drag the correct item to answer each question!",
        startDragGame: "Start Drag Game",
        dragMaster: "Drag Master",
        dragParticipant: "Drag Participant",
        correctDrop: "Correct! Well done!",
        wrongDrop: "Try again!",
        dropHere: "Drop your answer here",
        dragGameTitle: "Drag and Drop Safety Game",
        dragInstructions: "Drag the correct item to answer each question!",
        emergency: "Emergency Contacts (Punjab)",
        quizzes: "Disaster Quizzes",
        games: "Games for Classes 1-5 (Drag & Drop)",
        hackathon: "Hackathon Mode Game (Classes 6-10)",
        advanced: "Real-Time Location-Based Simulation",
        videos: "Disaster Safety: Watch & Learn",
        login: "Disaster Prep Login",
        signup: "Sign Up",
        logout: "Logout",
        voice: "Voice Guide",
        selectClass: "Select your class:",
        startGame: "Start Game",
        startHackathon: "Start Hackathon Game",
        startSimulation: "Start Simulation"
            ,
            correct: "Correct! You survived the disaster.",
            wrong: "Wrong! You faced the disaster.",
            gameOver: "Game Over!",
            score: "Score",
            level: "Level"
                ,
                floodAlert: "🌊 Flood Alert! Your area is at risk. What will you do to stay safe?",
                directions: "Directions:",
                moveHighPlace: "Move to the highest safe place (terrace or upper floor).",
                avoidBasement: "Avoid basements and low-lying areas.",
                keepSupplies: "Keep emergency supplies with you.",
                waitRescue: "Wait for rescue teams if needed.",
                safePlaces: "Safe places:",
                safePlacesList: "Terrace, upper floors, schools, hospitals, police stations, shelters",
                unsafePlaces: "Unsafe places:",
                unsafePlacesList: "Basement, ground floor, garage",
                youAreHere: "You are here!",
                stayAlert: "Stay alert and move to a safe place.",
                findSafePlaces: "Find nearest safe places in your area:",
                schools: "Schools",
                hospitals: "Hospitals",
                policeStations: "Police Stations",
                shelters: "Shelters",
                floodAlertVoice: "Flood alert! Move to the highest safe place in your house, such as the terrace or upper floor. Avoid basements and low-lying areas. You can also go to the nearest school, hospital, police station, or shelter.",
                locationAccessError: "Unable to access your location. Please allow location access in your browser.",
                geolocationNotSupported: "Geolocation is not supported by your browser."
                    ,
                    ndmaHelpline: "NDMA Helpline: 011-26701700",
                punjabDisaster: "Vizag Disaster Mgmt: 0891-2568499",
                    firePoliceMedical: "Fire: 101 | Police: 100 | Medical: 108",
                    schoolCoordinator: "Local School Drill Coordinator: Contact Admin",
                    shareParents: "Share with Parents",
                    floodSafe: "You are safe from the flood!",
                    floodRising: "Floods are rising, choose the right action and stay safe.",
                    hackathonCorrect: "✅ Correct! Good decision.",
                    hackathonOver: "Hackathon Over!",
                    hackathonScore: "Score:",
                    floodWarning: "A flood warning has been issued for your area. What should you do first?",
                    goOutside: "Go outside to watch",
                    moveValuables: "Move valuables to higher ground",
                    ignoreWarning: "Ignore the warning",
                    searchMaps: "Search Google Maps"
                        ,
                        incorrect: "❌ Incorrect. Think again!"
                            ,
                            floodSafeMsg: "🛟 You are safe from the flood!",
                            earthquakeEscape: "🏃‍♂️ You escaped the earthquake safely!",
                            earthquakeTrapped: "You got trapped in the earthquake!",
                            firefightersOnWay: "🚒 Firefighters are on the way!",
                            noHelp: "You couldn't call for help in time!",
                            floodCaught: "You got caught in the flood!",
                            floodAvoided: "🚧 You avoided the flood danger!"
                                ,
                                chooseUsername: "Choose Username",
                                choosePassword: "Choose Password",
                                usernamePlaceholder: "Username (e.g., student)",
                                passwordPlaceholder: "Password"
                                    ,
                                    correctAnswer: "Correct answer! Well done.",
                                    wrongAnswer: "Wrong answer. Try again."
                                        ,
                                        dashboardVoice: "This is your dashboard. Explore disaster safety tips and your progress.",
                                    emergencyVoice: "Here are emergency contacts for Vizag.",
                                        quizzesVoice: "Test your disaster knowledge with quizzes.",
                                        gamesVoice: "Play disaster safety games for your class.",
                                        hackathonVoice: "Welcome to Hackathon Mode. Solve disaster scenarios by making quick decisions.",
                                        advancedVoice: "Try the advanced real-time disaster simulation.",
                                        videosVoice: "Watch disaster safety videos and learn how to stay safe.",
                                        yourScore: "Your Score"
    },
    hi: {
        home: "आपका स्वागत है Disaster Prep Portal में",
    emergency: "आपातकालीन संपर्क (विजाग)",
        quizzes: "आपदा क्विज़",
        games: "कक्षा 1-5 के लिए खेल (ड्रैग एंड ड्रॉप)",
        hackathon: "हैकथॉन मोड गेम (कक्षा 6-10)",
        advanced: "रीयल-टाइम स्थान आधारित सिमुलेशन",
        videos: "आपदा सुरक्षा: देखें और सीखें",
        login: "डिजास्टर प्रेप लॉगिन",
        signup: "साइन अप",
        logout: "लॉगआउट",
        voice: "वॉयस गाइड",
        selectClass: "अपनी कक्षा चुनें:",
        startGame: "खेल शुरू करें",
        startHackathon: "हैकथॉन गेम शुरू करें",
        startSimulation: "सिमुलेशन शुरू करें"
            ,
            correct: "सही! आपने आपदा से बचाव किया।",
            wrong: "गलत! आपदा का सामना किया।",
            gameOver: "खेल समाप्त!",
            score: "स्कोर",
            level: "स्तर"
                ,
                floodAlert: "🌊 बाढ़ की चेतावनी! आपका क्षेत्र जोखिम में है। सुरक्षित रहने के लिए आप क्या करेंगे?",
                directions: "निर्देश:",
                moveHighPlace: "सबसे ऊँची सुरक्षित जगह पर जाएं (छत या ऊपरी मंजिल)।",
                avoidBasement: "तहखाने और नीची जगहों से बचें।",
                keepSupplies: "आपातकालीन सामान अपने पास रखें।",
                waitRescue: "जरूरत पड़ने पर बचाव दल का इंतजार करें।",
                safePlaces: "सुरक्षित स्थान:",
                safePlacesList: "छत, ऊपरी मंजिल, स्कूल, अस्पताल, पुलिस स्टेशन, शरण स्थल",
                unsafePlaces: "असुरक्षित स्थान:",
                unsafePlacesList: "तहखाना, ग्राउंड फ्लोर, गैराज",
                youAreHere: "आप यहाँ हैं!",
                stayAlert: "सतर्क रहें और सुरक्षित स्थान पर जाएं।",
                findSafePlaces: "अपने क्षेत्र में निकटतम सुरक्षित स्थान खोजें:",
                schools: "स्कूल",
                hospitals: "अस्पताल",
                policeStations: "पुलिस स्टेशन",
                shelters: "शरण स्थल",
                floodAlertVoice: "बाढ़ की चेतावनी! अपने घर की सबसे ऊँची सुरक्षित जगह पर जाएं, जैसे छत या ऊपरी मंजिल। तहखाने और नीची जगहों से बचें। आप निकटतम स्कूल, अस्पताल, पुलिस स्टेशन या शरण स्थल पर भी जा सकते हैं।",
                locationAccessError: "आपके स्थान तक पहुँचने में असमर्थ। कृपया अपने ब्राउज़र में स्थान की अनुमति दें।",
                geolocationNotSupported: "आपका ब्राउज़र जियोलोकेशन का समर्थन नहीं करता।"
                    ,
                    ndmaHelpline: "एनडीएमए हेल्पलाइन: 011-26701700",
                punjabDisaster: "विजाग डिजास्टर Mgmt: 0891-2568499",
                    firePoliceMedical: "फायर: 101 | पुलिस: 100 | मेडिकल: 108",
                    schoolCoordinator: "स्थानीय स्कूल ड्रिल समन्वयक: संपर्क करें",
                    shareParents: "माता-पिता के साथ साझा करें",
                    floodSafe: "आप बाढ़ से सुरक्षित हैं!",
                    floodRising: "बाढ़ बढ़ रही है, सही कार्रवाई चुनें और सुरक्षित रहें।",
                    hackathonCorrect: "✅ सही! अच्छा निर्णय।",
                    hackathonOver: "हैकथॉन समाप्त!",
                    hackathonScore: "स्कोर:",
                    floodWarning: "आपके क्षेत्र के लिए बाढ़ की चेतावनी जारी की गई है। आपको सबसे पहले क्या करना चाहिए?",
                    goOutside: "देखने के लिए बाहर जाएं",
                    moveValuables: "कीमती सामान ऊँची जगह पर रखें",
                    ignoreWarning: "चेतावनी को अनदेखा करें",
                    searchMaps: "गूगल मैप्स खोजें"
                        ,
                        incorrect: "❌ गलत। फिर से सोचें!"
                            ,
                            floodSafeMsg: "🛟 आप बाढ़ से सुरक्षित हैं!",
                            earthquakeEscape: "🏃‍♂️ आप भूकंप से सुरक्षित निकल गए!",
                            earthquakeTrapped: "आप भूकंप में फंस गए!",
                            firefightersOnWay: "🚒 फायरफाइटर्स रास्ते में हैं!",
                            noHelp: "आप समय पर मदद नहीं मांग सके!",
                            floodCaught: "आप बाढ़ में फंस गए!",
                            floodAvoided: "🚧 आपने बाढ़ के खतरे से बचाव किया!"
                                ,
                                chooseUsername: "यूज़रनेम चुनें",
                                choosePassword: "पासवर्ड चुनें",
                                usernamePlaceholder: "यूज़रनेम (जैसे, student)",
                                passwordPlaceholder: "पासवर्ड"
                                    ,
                                    correctAnswer: "सही उत्तर! बहुत अच्छा।",
                                    wrongAnswer: "गलत उत्तर। फिर कोशिश करें।"
                                        ,
                                        dashboardVoice: "यह आपका डैशबोर्ड है। आपदा सुरक्षा टिप्स और अपनी प्रगति देखें।",
                                    emergencyVoice: "यहाँ विजाग के आपातकालीन संपर्क हैं।",
                                        quizzesVoice: "क्विज़ के साथ अपनी आपदा ज्ञान का परीक्षण करें।",
                                        gamesVoice: "अपनी कक्षा के लिए आपदा सुरक्षा गेम खेलें।",
                                        hackathonVoice: "हैकथॉन मोड में आपका स्वागत है। आपदा परिदृश्यों को हल करें।",
                                        advancedVoice: "एडवांस्ड रियल-टाइम सिमुलेशन आज़माएँ।",
                                        videosVoice: "आपदा सुरक्षा वीडियो देखें और सुरक्षित रहना सीखें।",
                                        yourScore: "आपका स्कोर"
    },
    mr: {
        home: "Disaster Prep Portal मध्ये स्वागत आहे",
    emergency: "आपत्कालीन संपर्क (विजाग)",
        quizzes: "आपत्ती क्विझ",
        games: "इयत्ता 1-5 साठी खेळ (ड्रॅग आणि ड्रॉप)",
        hackathon: "हॅकथॉन मोड गेम (इयत्ता 6-10)",
        advanced: "रिअल-टाइम स्थान आधारित सिम्युलेशन",
        videos: "आपत्ती सुरक्षा: पहा आणि शिका",
        login: "डिझास्टर प्रेप लॉगिन",
        signup: "साइन अप",
        logout: "लॉगआउट",
        voice: "व्हॉइस गाइड",
        selectClass: "तुमची इयत्ता निवडा:",
        startGame: "खेळ सुरू करा",
        startHackathon: "हॅकथॉन गेम सुरू करा",
        startSimulation: "सिम्युलेशन सुरू करा"
            ,
            correct: "बरोबर! तुम्ही आपत्तीपासून वाचलात.",
            wrong: "चूक! तुम्ही आपत्तीला सामोरे गेला.",
            gameOver: "खेळ संपला!",
            score: "स्कोर",
            level: "स्तर"
                ,
                floodAlert: "🌊 पूराची सूचना! तुमचा परिसर धोक्यात आहे. सुरक्षित राहण्यासाठी तुम्ही काय कराल?",
                directions: "सूचना:",
                moveHighPlace: "सर्वात उंच सुरक्षित ठिकाणी जा (टेरेस किंवा वरचा मजला).",
                avoidBasement: "तळघर आणि नीच जागा टाळा.",
                keepSupplies: "आपत्कालीन सामान जवळ ठेवा.",
                waitRescue: "गरज असल्यास बचाव पथकाची वाट पाहा.",
                safePlaces: "सुरक्षित ठिकाणे:",
                safePlacesList: "टेरेस, वरचे मजले, शाळा, रुग्णालये, पोलीस स्टेशन, निवारा",
                unsafePlaces: "असुरक्षित ठिकाणे:",
                unsafePlacesList: "तळघर, ग्राउंड फ्लोर, गॅरेज",
                youAreHere: "तुम्ही येथे आहात!",
                stayAlert: "सतर्क रहा आणि सुरक्षित ठिकाणी जा.",
                findSafePlaces: "तुमच्या परिसरातील जवळची सुरक्षित ठिकाणे शोधा:",
                schools: "शाळा",
                hospitals: "रुग्णालये",
                policeStations: "पोलीस स्टेशन",
                shelters: "निवारा",
                floodAlertVoice: "पूराची सूचना! तुमच्या घरातील सर्वात उंच सुरक्षित ठिकाणी जा, जसे टेरेस किंवा वरचा मजला. तळघर आणि नीच जागा टाळा. तुम्ही जवळच्या शाळा, रुग्णालय, पोलीस स्टेशन किंवा निवाऱ्यात जाऊ शकता.",
                locationAccessError: "तुमच्या स्थानापर्यंत पोहोचता आले नाही. कृपया ब्राउझरमध्ये स्थानाची परवानगी द्या.",
                geolocationNotSupported: "तुमचा ब्राउझर जियोलोकेशनला समर्थन देत नाही."
                    ,
                    ndmaHelpline: "एनडीएमए हेल्पलाइन: 011-26701700",
                punjabDisaster: "विजाग डिजास्टर Mgmt: 0891-2568499",
                    firePoliceMedical: "फायर: 101 | पोलीस: 100 | मेडिकल: 108",
                    schoolCoordinator: "स्थानिक शाळा ड्रिल समन्वयक: संपर्क करा",
                    shareParents: "पालकांसोबत शेअर करा",
                    floodSafe: "तुम्ही पूरापासून सुरक्षित आहात!",
                    floodRising: "पूर वाढत आहे, योग्य कृती निवडा आणि सुरक्षित रहा.",
                    hackathonCorrect: "✅ बरोबर! चांगला निर्णय.",
                    hackathonOver: "हॅकथॉन संपला!",
                    hackathonScore: "स्कोर:",
                    floodWarning: "तुमच्या परिसरासाठी पूराची सूचना जारी करण्यात आली आहे. तुम्ही प्रथम काय कराल?",
                    goOutside: "पाहण्यासाठी बाहेर जा",
                    moveValuables: "किमती वस्तू उंच जागी ठेवा",
                    ignoreWarning: "सूचनाकडे दुर्लक्ष करा",
                    searchMaps: "गूगल मॅप्स शोधा"
                        ,
                        incorrect: "❌ चुकीचे. पुन्हा विचार करा!"
                            ,
                            floodSafeMsg: "🛟 तुम्ही पूरापासून सुरक्षित आहात!",
                            earthquakeEscape: "🏃‍♂️ तुम्ही भूकंपातून सुरक्षित बाहेर पडलात!",
                            earthquakeTrapped: "तुम्ही भूकंपात अडकला आहात!",
                            firefightersOnWay: "🚒 अग्निशमन दल येत आहे!",
                            noHelp: "तुम्ही वेळेत मदत मागू शकला नाही!",
                            floodCaught: "तुम्ही पूरात अडकला आहात!",
                            floodAvoided: "🚧 तुम्ही पूराच्या धोक्यापासून बचाव केला!"
                                ,
                                chooseUsername: "यूजरनेम निवडा",
                                choosePassword: "पासवर्ड निवडा",
                                usernamePlaceholder: "यूजरनेम (उदा. student)",
                                passwordPlaceholder: "पासवर्ड"
                                    ,
                                    correctAnswer: "बरोबर उत्तर! छान केले.",
                                    wrongAnswer: "चुकीचे उत्तर. पुन्हा प्रयत्न करा."
                                        ,
                                        dashboardVoice: "हे तुमचे डॅशबोर्ड आहे. आपत्ती सुरक्षा टिप्स आणि तुमची प्रगती पहा.",
                                    emergencyVoice: "विजागसाठी आपत्कालीन संपर्क येथे आहेत.",
                                        quizzesVoice: "क्विझसह तुमचे आपत्ती ज्ञान तपासा.",
                                        gamesVoice: "तुमच्या इयत्तेसाठी आपत्ती सुरक्षा खेळ खेळा.",
                                        hackathonVoice: "हॅकथॉन मोडमध्ये स्वागत आहे. आपत्ती परिस्थिती सोडवा.",
                                        advancedVoice: "प्रगत रिअल-टाइम सिम्युलेशन वापरून पहा.",
                                        videosVoice: "आपत्ती सुरक्षा व्हिडिओ पहा आणि सुरक्षित राहा.",
                                        yourScore: "तुमचा स्कोर"
    },
    es: {
        home: "Bienvenido al Portal de Preparación para Desastres",
    emergency: "Contactos de emergencia (Vizag)",
        quizzes: "Cuestionarios de desastres",
        games: "Juegos para clases 1-5 (Arrastrar y soltar)",
        hackathon: "Modo Hackathon (Clases 6-10)",
        advanced: "Simulación basada en ubicación en tiempo real",
        videos: "Seguridad ante desastres: Mira y aprende",
        login: "Inicio de sesión de preparación para desastres",
        signup: "Registrarse",
        logout: "Cerrar sesión",
        voice: "Guía de voz",
        selectClass: "Selecciona tu clase:",
        startGame: "Iniciar juego",
        startHackathon: "Iniciar Hackathon",
        startSimulation: "Iniciar simulación"
            ,
            correct: "¡Correcto! Sobreviviste al desastre.",
            wrong: "¡Incorrecto! Enfrentaste el desastre.",
            gameOver: "¡Fin del juego!",
            score: "Puntuación",
            level: "Nivel"
                ,
                floodAlert: "🌊 ¡Alerta de inundación! Tu área está en riesgo. ¿Qué harás para mantenerte seguro?",
                directions: "Direcciones:",
                moveHighPlace: "Muévete al lugar seguro más alto (terraza o piso superior).",
                avoidBasement: "Evita sótanos y áreas bajas.",
                keepSupplies: "Mantén suministros de emergencia contigo.",
                waitRescue: "Espera a los equipos de rescate si es necesario.",
                safePlaces: "Lugares seguros:",
                safePlacesList: "Terraza, pisos superiores, escuelas, hospitales, estaciones de policía, refugios",
                unsafePlaces: "Lugares inseguros:",
                unsafePlacesList: "Sótano, planta baja, garaje",
                youAreHere: "¡Estás aquí!",
                stayAlert: "Mantente alerta y muévete a un lugar seguro.",
                findSafePlaces: "Encuentra los lugares seguros más cercanos en tu área:",
                schools: "Escuelas",
                hospitals: "Hospitales",
                policeStations: "Estaciones de policía",
                shelters: "Refugios",
                floodAlertVoice: "¡Alerta de inundación! Muévete al lugar seguro más alto en tu casa, como la terraza o el piso superior. Evita sótanos y áreas bajas. También puedes ir a la escuela, hospital, estación de policía o refugio más cercano.",
                locationAccessError: "No se puede acceder a tu ubicación. Permite el acceso a la ubicación en tu navegador.",
                geolocationNotSupported: "Tu navegador no admite la geolocalización."
                    ,
                    ndmaHelpline: "Línea de ayuda NDMA: 011-26701700",
                punjabDisaster: "Gestión de desastres de Vizag: 0891-2568499",
                    firePoliceMedical: "Incendio: 101 | Policía: 100 | Médico: 108",
                    schoolCoordinator: "Coordinador de simulacros escolares locales: Contactar al administrador",
                    shareParents: "Compartir con padres",
                    floodSafe: "¡Estás a salvo de la inundación!",
                    floodRising: "Las inundaciones están aumentando, elige la acción correcta y mantente seguro.",
                    hackathonCorrect: "✅ ¡Correcto! Buena decisión.",
                    hackathonOver: "¡Hackathon terminado!",
                    hackathonScore: "Puntuación:",
                    floodWarning: "Se ha emitido una advertencia de inundación para tu área. ¿Qué deberías hacer primero?",
                    goOutside: "Sal afuera a mirar",
                    moveValuables: "Mueve objetos de valor a un lugar más alto",
                    ignoreWarning: "Ignora la advertencia",
                    searchMaps: "Buscar en Google Maps"
                        ,
                        incorrect: "❌ Incorrecto. ¡Piensa de nuevo!"
                            ,
                            floodSafeMsg: "🛟 ¡Estás a salvo de la inundación!",
                            earthquakeEscape: "🏃‍♂️ ¡Escapaste del terremoto con seguridad!",
                            earthquakeTrapped: "¡Quedaste atrapado en el terremoto!",
                            firefightersOnWay: "🚒 ¡Los bomberos están en camino!",
                            noHelp: "¡No pudiste pedir ayuda a tiempo!",
                            floodCaught: "¡Quedaste atrapado en la inundación!",
                            floodAvoided: "🚧 ¡Evitaste el peligro de la inundación!"
                                ,
                                chooseUsername: "Elige nombre de usuario",
                                choosePassword: "Elige contraseña",
                                usernamePlaceholder: "Nombre de usuario (ej. estudiante)",
                                passwordPlaceholder: "Contraseña"
                                    ,
                                    correctAnswer: "¡Respuesta correcta! Bien hecho.",
                                    wrongAnswer: "Respuesta incorrecta. Intenta de nuevo."
                                        ,
                                        dashboardVoice: "Este es tu panel. Explora consejos de seguridad ante desastres y tu progreso.",
                                    emergencyVoice: "Aquí están los contactos de emergencia para Vizag.",
                                        quizzesVoice: "Pon a prueba tu conocimiento sobre desastres con cuestionarios.",
                                        gamesVoice: "Juega juegos de seguridad ante desastres para tu clase.",
                                        hackathonVoice: "Bienvenido al modo Hackathon. Resuelve escenarios de desastre.",
                                        advancedVoice: "Prueba la simulación avanzada en tiempo real.",
                                        videosVoice: "Mira videos de seguridad ante desastres y aprende a estar seguro.",
                                        yourScore: "Tu puntuación"
    },
    te: {
        home: "Disaster Prep Portal కి స్వాగతం",
    emergency: "అత్యవసర సంప్రదింపులు (Vizag)",
        quizzes: "ప్రమాదాల క్విజ్‌లు",
        games: "తరగతి 1-5 కోసం ఆటలు (డ్రాగ్ & డ్రాప్)",
        hackathon: "హాకథాన్ మోడ్ గేమ్ (తరగతి 6-10)",
        advanced: "రియల్-టైమ్ స్థాన ఆధారిత అనుకరణ",
        videos: "ప్రమాద భద్రత: చూడండి మరియు నేర్చుకోండి",
        login: "Disaster Prep లాగిన్",
        signup: "సైన్ అప్",
        logout: "లాగ్ అవుట్",
        voice: "వాయిస్ గైడ్",
        selectClass: "మీ తరగతి ఎంచుకోండి:",
        startGame: "ఆట ప్రారంభించండి",
        startHackathon: "హాకథాన్ ప్రారంభించండి",
        startSimulation: "అనుకరణ ప్రారంభించండి"
            ,
            correct: "సరైనది! మీరు విపత్తును ఎదుర్కొన్నారు.",
            wrong: "తప్పు! మీరు విపత్తును ఎదుర్కొన్నారు.",
            gameOver: "ఆట ముగిసింది!",
            score: "స్కోర్",
            level: "స్థాయి"
                ,
                floodAlert: "🌊 వరద హెచ్చరిక! మీ ప్రాంతం ప్రమాదంలో ఉంది. మీరు సురక్షితంగా ఉండేందుకు ఏమి చేస్తారు?",
                directions: "దిశానిర్దేశాలు:",
                moveHighPlace: "అత్యున్నత సురక్షిత ప్రదేశానికి వెళ్లండి (టెర్రస్ లేదా పై అంతస్తు).",
                avoidBasement: "బేస్‌మెంట్ మరియు తక్కువ ప్రదేశాలను నివారించండి.",
                keepSupplies: "అత్యవసర సరఫరాలను మీతో ఉంచుకోండి.",
                waitRescue: "అవసరమైతే రక్షణ బృందాలను ఎదురుచూడండి.",
                safePlaces: "సురక్షిత ప్రదేశాలు:",
                safePlacesList: "టెర్రస్, పై అంతస్తులు, పాఠశాలలు, ఆసుపత్రులు, పోలీస్ స్టేషన్లు, ఆశ్రయాలు",
                unsafePlaces: "అసురక్షిత ప్రదేశాలు:",
                unsafePlacesList: "బేస్‌మెంట్, గ్రౌండ్ ఫ్లోర్, గ్యారేజ్",
                youAreHere: "మీరు ఇక్కడ ఉన్నారు!",
                stayAlert: "జాగ్రత్తగా ఉండండి మరియు సురక్షిత ప్రదేశానికి వెళ్లండి.",
                findSafePlaces: "మీ ప్రాంతంలో సమీప సురక్షిత ప్రదేశాలను కనుగొనండి:",
                schools: "పాఠశాలలు",
                hospitals: "ఆసుపత్రులు",
                policeStations: "పోలీస్ స్టేషన్లు",
                shelters: "ఆశ్రయాలు",
                floodAlertVoice: "వరద హెచ్చరిక! మీ ఇంట్లో అత్యున్నత సురక్షిత ప్రదేశానికి వెళ్లండి, ఉదాహరణకు టెర్రస్ లేదా పై అంతస్తు. బేస్‌మెంట్ మరియు తక్కువ ప్రదేశాలను నివారించండి. మీరు సమీపంలోని పాఠశాల, ఆసుపత్రి, పోలీస్ స్టేషన్ లేదా ఆశ్రయానికి కూడా వెళ్లవచ్చు.",
                locationAccessError: "మీ స్థానాన్ని యాక్సెస్ చేయలేకపోయాం. దయచేసి మీ బ్రౌజర్‌లో స్థాన అనుమతిని ఇవ్వండి.",
                geolocationNotSupported: "మీ బ్రౌజర్ జియోలొకేషన్‌ను మద్దతు ఇవ్వదు."
                    ,
                    ndmaHelpline: "ఎన్డీఎంఏ హెల్ప్‌లైన్: 011-26701700",
                punjabDisaster: "విజాగ్ డిజాస్టర్ Mgmt: 0891-2568499",
                    firePoliceMedical: "ఫైర్: 101 | పోలీస్: 100 | మెడికల్: 108",
                    schoolCoordinator: "స్థానిక పాఠశాల డ్రిల్ సమన్వయకుడు: అడ్మిన్‌ను సంప్రదించండి",
                    shareParents: "తల్లిదండ్రులతో పంచుకోండి",
                    floodSafe: "మీరు వరద నుండి సురక్షితంగా ఉన్నారు!",
                    floodRising: "వరదలు పెరుగుతున్నాయి, సరైన చర్యను ఎంచుకోండి మరియు సురక్షితంగా ఉండండి.",
                    hackathonCorrect: "✅ సరైనది! మంచి నిర్ణయం.",
                    hackathonOver: "హాకథాన్ ముగిసింది!",
                    hackathonScore: "స్కోర్:",
                    floodWarning: "మీ ప్రాంతానికి వరద హెచ్చరిక జారీ చేయబడింది. మీరు ముందుగా ఏమి చేయాలి?",
                    goOutside: "చూడటానికి బయటకు వెళ్లండి",
                    moveValuables: "విలువైన వస్తువులను ఎత్తైన ప్రదేశానికి తరలించండి",
                    ignoreWarning: "హెచ్చరికను పట్టించుకోకండి",
                    searchMaps: "Google Mapsలో వెతకండి"
                        ,
                        incorrect: "❌ తప్పు. మళ్లీ ఆలోచించండి!"
                            ,
                            floodSafeMsg: "🛟 మీరు వరద నుండి సురక్షితంగా ఉన్నారు!",
                            earthquakeEscape: "🏃‍♂️ మీరు భూకంపం నుండి సురక్షితంగా తప్పించుకున్నారు!",
                            earthquakeTrapped: "మీరు భూకంపంలో చిక్కుకున్నారు!",
                            firefightersOnWay: "🚒 అగ్నిమాపక సిబ్బంది రాబోతున్నారు!",
                            noHelp: "మీరు సమయానికి సహాయం కోసం కాల్ చేయలేకపోయారు!",
                            floodCaught: "మీరు వరదలో చిక్కుకున్నారు!",
                            floodAvoided: "🚧 మీరు వరద ప్రమాదాన్ని నివారించారు!"
                                ,
                                chooseUsername: "యూజర్ పేరు ఎంచుకోండి",
                                choosePassword: "పాస్‌వర్డ్ ఎంచుకోండి",
                                usernamePlaceholder: "యూజర్ పేరు (ఉదా. student)",
                                passwordPlaceholder: "పాస్‌వర్డ్"
                                    ,
                                    correctAnswer: "సరైన సమాధానం! బాగా చేశావు.",
                                    wrongAnswer: "తప్పు సమాధానం. మళ్లీ ప్రయత్నించండి."
                                        ,
                                        dashboardVoice: "ఇది మీ డాష్‌బోర్డ్. విపత్తు భద్రతా సూచనలు మరియు మీ పురోగతిని అన్వేషించండి.",
                                    emergencyVoice: "ఇక్కడ విజాగ్ కోసం అత్యవసర సంప్రదింపులు ఉన్నాయి.",
                                        quizzesVoice: "క్విజ్‌లతో మీ విపత్తు జ్ఞానాన్ని పరీక్షించండి.",
                                        gamesVoice: "మీ తరగతి కోసం విపత్తు భద్రతా ఆటలు ఆడండి.",
                                        hackathonVoice: "హాకథాన్ మోడ్‌కు స్వాగతం. విపత్తు పరిస్థితులను పరిష్కరించండి.",
                                        advancedVoice: "అధునాతన రియల్-టైమ్ అనుకరణను ప్రయత్నించండి.",
                                        videosVoice: "విపత్తు భద్రతా వీడియోలు చూడండి మరియు ఎలా సురక్షితంగా ఉండాలో తెలుసుకోండి.",
                                        yourScore: "మీ స్కోర్"
    }
};

let currentLanguage = "en";

function setLanguage(lang) {
    currentLanguage = lang;
    updateUITranslations();
}

function t(key) {
    return translations[currentLanguage][key] || translations["en"][key] || key;
}

// Update UI text for selected language
function updateUITranslations() {
    // Example: update section headings and buttons
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
        const key = el.getAttribute('data-i18n-placeholder');
        el.setAttribute('placeholder', t(key));
    });

    // Update dynamic drag-and-drop UI texts if present
    try {
        // update static score label inside drag score area
        const dragScoreLabel = document.querySelector('#dragScore [data-i18n]');
        if (dragScoreLabel) dragScoreLabel.textContent = t('score');

        // update any existing drag instructions or drop zone text
        document.querySelectorAll('#dragArea .drag-instructions').forEach(el => {
            el.textContent = t('dragInstructions') || el.textContent;
        });
        document.querySelectorAll('#dragArea .drop-zone-text').forEach(el => {
            el.textContent = t('dropHere') || el.textContent;
        });
    } catch (e) {
        console.warn('updateUITranslations: dynamic drag UI refresh failed', e);
    }
}

// Call updateUITranslations() after DOMContentLoaded and after language change
document.addEventListener('DOMContentLoaded', updateUITranslations);
speak(t('login'));
document.getElementById('quizContent').innerHTML = `<h2>${t('quizzes')}</h2>`;
