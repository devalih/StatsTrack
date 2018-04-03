# StatsTrack 
sounds like star trek 
<hr>
<h2>Technologies</h2>
<h3>For back-end I used:</h3>
<ul>
    <li>Express.js(4.16.3), which is a web application framework for Node.js(v8.9.4)</li>
    <li>socket.io(2.1.0) which  is a javascript library for realtime web applications(uses the WebSocket protocol), in use by               board(chat) for live information exchange.</li>
    <li>cookie-parser parses Cookie header and populate req.cookies with an object keyed by the cookie names. Im using it to identify       participants(ask for their name and save it in Cookie), so if they are using live board, their name(nickname) would be visible for          everyone else.</li>
    <li>body-parser - parses incoming request bodies in a middleware before your handlers</li>
</ul>
<h3>For front-end I used:</h3>
<ul>
    <li>Javascript(ES6) as main language</li>
    <li>JQuery in some cases to make code more readable and easier to follow</li>
    <li>AJAX is used to update the ranking table(planing to change it and make future table updates with socket.io).</li>
</ul>
<br>
<h3>Summary</h3>
<ul>
    <li>HTML/CSS and JS(ES6), JQuery, AJAX on the fron-end.</li>
    <li>
        Node.js, Express.js and sockets.io(WebSocket) on the back-end, along with additional middlewares: cookie-parser and body-parser.    </li>
    <li>Simple JSON files are used to simulate DB role.</li>
</ul>
<hr>
<h2>Basic logic explanation</h2>
<ol>
    <li>
        Main Page
        <ol>
            <li>
                [Future feature]Find your competition using CompetitionID
            </li>
        </ol>
    </li>
    <li>
        Your competition's results live
        <ol>
            <li>
                Show the result table(ranking) of the competition #${competitionID} with participants sorted <br> according to the gained points
            </li>
            <li>
                Button to add new participant to the competition(and ranking table)
            </li>
            <li>
                Also there you can find which clibming routes(walls) have been finished
            </li>
        </ol>
    </li>
    <li>Live board (chat) for competition announcements and inside comunication between everybody
    <li>
        Panel for organizators to manage competition
        <ol>
            <li>
                Choose the number(type?) of the climbing wall from a drop-down menu,
                each wall has it's points.(If some partipant has finished it, he gains poits according to
                the wall's points.)
            </li>
            <li>
              button to add participant's result
                <ol>
                    <li>Full name</li>
                    <li>Result</li>
                </ol>
            </li>
             <li>
                 button to disqualify a participant
            </li>
        </ol>
    </li>
</ol>
<hr>
<h2>Start</h2>
To start my project, simply clone it somewhere, open StatsTrack folder, install it "npm install" and run with "npm start" command.<br>
P.S. make sure you have all dependencies installed.
<hr> 
Final project for WebDev Academy at Motorola Solutions<br>
for any info feel free to email me:<br>
kolodiy1103@gmail.com
