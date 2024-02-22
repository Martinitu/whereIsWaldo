import { useState, useEffect } from 'react'
import waldo from './assets/waldo.png'
import whiteBeard from './assets/whiteBeard.png'
import odlaw from './assets/odlaw.png'
import whereIsWaldo from './assets/whereswaldoimg.png'
import MyStopwatch from  './timer' 
import { useStopwatch } from 'react-timer-hook';


// Characters id on database

const waldoId = "65a6fe2b15e10549730d0422";
const whiteBeardId = "65a6fe7415e10549730d0424";
const odlawId = "65a6febb15e10549730d0426";




// Function to format time

const formatTime = (time) => {
    if (!time) return '';
  
    const { days, hours, minutes, seconds } = time;
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };



function Img () {

//clock

    const {
        days,
        hours,
        minutes,
        seconds,
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: true });

    const [timeTaken, setTimeTaken] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [charactersFound, setCharactersFound] = useState(false);  

    const [count, setCount] = useState(0);
    const [characters, setCharacters] = useState({waldo: false, whiteBeard: false, odlaw: false});
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    const [showForm, setShowForm] = useState(true); 

      //pause clock when characters found
    useEffect(() => {
        if (characters.waldo && characters.whiteBeard && characters.odlaw && !charactersFound) {
        pause()
        setTimeTaken({ days, hours, minutes, seconds });
        setCharactersFound(true);
          
        }
      }, [characters, charactersFound, days, hours, minutes, seconds]);

    
    
      const handleCharacterClick = (event) => {
        const id = event.target.getAttribute('a-key');
        const clickedX = event.clientX + window.scrollX;
        const clickedY = event.clientY + window.scrollY;
      
        fetch('http://localhost:3000/waldo/character/' + id, { mode: 'cors' })
          .then(function (response) {
            return response.json();
          })
          .then((response) => {
            const characterX = response[0].x;
            const characterY = response[0].y;
            const characterName = response[0].name;
      
            console.log("clickedX =" + clickedX);
            console.log("clickedY =" + clickedY);
            console.log("characterX =" + characterX);
            console.log("characterY =" + characterY);
      
            const tolerance = 20;
      
            if (
              clickedX >= characterX - tolerance &&
              clickedX <= characterX + tolerance &&
              clickedY >= characterY - tolerance &&
              clickedY <= characterY + tolerance
            ) {

                setCharacters((prevCharacters) => {
                    return {
                      ...prevCharacters,
                      [characterName]: true,
                    };
                  });
                setCount(count + 1)
              console.log("Clicked on " + characterName);
              setMenuVisible(false)


            } else {
              console.log("Clicked outside of " + characterName);
              setMenuVisible(false)
            }
          })
          .catch((error) => {
            console.error('Error fetching character details:', error);
            ;
          });
      };
      
      useEffect(() => {
        if (menuVisible) {
            console.log(menuPosition, menuVisible);
        }
    }, [menuVisible, menuPosition]);

    const handldeImgClic = (event) => {
        const scrollOffsetY = window.scrollY;
        const scrollOffsetX = window.scrollX;
        const { clientX, clientY } = event;

        // Update menuPosition
        console.log(scrollOffsetX)
        setMenuPosition({ x: clientX + scrollOffsetX -50, y: clientY + scrollOffsetY - 320 });

        // Update menuVisible
        setMenuVisible(true);
    };

    const [highScores, setHighScores] = useState([]);

    const handleFormSubmit = (event) => {
      event.preventDefault();
      const name = event.target.name.value;
      const time = timeTaken.seconds;
     
    
      // Submit the user's score
      fetch(`http://localhost:3000/waldo/createScore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, time }),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data as needed
          console.log(data);
    
          // Fetch and display high scores after submitting the form
          return fetch(`http://localhost:3000/waldo/`);
        })
        .then(response => response.json())
        .then(response => {
          // Handle the high scores data and update the UI
          console.log(response);
    
          // Update the UI with the high scores, e.g., render a list
          setHighScores(response);
        })
        .catch(error => {
          console.error('Error submitting score or fetching high scores:', error);
        });
        setShowForm(false)
    };
    const renderHighScores = () => {
     
      return (
        <div className="formDiv">
        <ul>
          {highScores.map(score => (
            <li key={score.id}>{`${score.name}: ${score.time} seconds`}</li>
          ))}
        </ul>
        </div>
      );
    };
    

    

    return (

        <>
      <div className="header">
        <h1>Where is Waldo</h1>
        

  
        <div className="characters">
        {Object.entries(characters).map(([character, found]) => (
          found ? (
            <div key={character} className="found">
              <img src={eval(`${character}`)} alt={character} />
            </div>
          ) : (
            <div key={character} className="notFound">
              <img src={eval(`${character}`)} alt={character} />
            </div>
          )
        ))}
        </div>
        <div className='timer'>
       <div style={{textAlign: 'center'}}>
    
                    <div style={{fontSize: '50px'}}>
                        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                    </div>
                   
                  
                    </div>
        </div>
        <div className="imgContainer">
        <img className="whereIsWaldo" src={whereIsWaldo} alt="where is waldo image" onClick={handldeImgClic}/>
        {menuVisible && (
            <div className="dropDown"
            style={{ top: menuPosition.y, left: menuPosition.x }}>
                <div className="area"></div>
             <ul className="menu">
           <img src={waldo} alt="waldo" a-key={waldoId} onClick={handleCharacterClick} />
           <img src={whiteBeard} alt="white Beard" a-key={whiteBeardId} onClick={handleCharacterClick} />
            <img src={odlaw} alt="odlaw" a-key={odlawId} onClick={handleCharacterClick} />
             </ul>
            </div>
        )}
        </div>
      </div>
      {characters.waldo && characters.whiteBeard && characters.odlaw && showForm && (
            <div className="formDiv">
                <form onSubmit={handleFormSubmit} action="">
                    <label htmlFor="name">what's your name: </label>
                    <input type="text" name="name" />
                    <button type="submit">Submit</button>
                 </form>
                
          </div>
            )}

              {!showForm && (renderHighScores())}
      <p>code by Martin I</p>
     
    </>
       
    )
    
}

export default Img