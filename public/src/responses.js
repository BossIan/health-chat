const { containerBootstrap, Nlp, LangEn, fs } = window.nlpjs;
async function getBotResponse(text) {
    const container = await containerBootstrap();
    container.register('fs', fs);
    container.use(Nlp);
    container.use(LangEn);
    const nlp = container.get('nlp');
    nlp.settings.autoSave = false;
    nlp.addLanguage('en');
    // Adds the utterances and intents for the NLP
    nlp.addDocument('en', 'goodbye for now', 'greetings.bye');
    nlp.addDocument('en', 'bye bye take care', 'greetings.bye');
    nlp.addDocument('en', 'okay see you later', 'greetings.bye');
    nlp.addDocument('en', 'bye for now', 'greetings.bye');
    nlp.addDocument('en', 'i must go', 'greetings.bye');
    nlp.addDocument('en', 'hello', 'greetings.hello');
    nlp.addDocument('en', 'hi', 'greetings.hello');
    nlp.addDocument('en', 'howdy', 'greetings.hello');
    nlp.addDocument('en', 'how to change password', 'user.changepassword');
    nlp.addDocument('en', 'Emergency Hotlines', 'health.emergency');
    
    // Train also the NLG
    nlp.addAnswer('en', 'greetings.bye', 'Till next time');
    nlp.addAnswer('en', 'greetings.bye', 'see you soon!');
    nlp.addAnswer('en', 'greetings.hello', 'Hey there!');
    nlp.addAnswer('en', 'greetings.hello', 'Greetings!');
    nlp.addAnswer('en', 'user.changepassword', "Navigate to the FTP Users & Files page.Click the 'Show Info' down arrow next to your hostname to open the settings box for the user.Click the Reset Password link. ...Enter a password and click the Reset Password button to reset the password. ... If necessary, enter a new password.");
    nlp.addAnswer('en', 'health.emergency', 'NCMH Crisis Hotline – Provides free mental health support for all affected by COVID-19. Reach them at 1553 (nationwide and toll-free landline), 0966-351-4518 (Globe/TM), 0917-899-8727 (Globe/TM), or 0908-639-2672 (Smart/Sun/TNT).Regional DOH Helplines – Compilation of helplines for different regions in the Philippines. Check it out here: bit.ly/DOHhelplines. For non-crisis callers, NCMH encourages the use of the following lines:NCMH Trunkline: (02) 8531-9001 for general services NCMH Public Health Unit: 0915-792-6889 or 0949-143-6425');
    await nlp.train();
    var response = nlp.process('en', text);
    return response;
};
