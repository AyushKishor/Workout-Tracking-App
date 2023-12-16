import { useState, useEffect } from "react";
import '../NewWorkout.css';


function NewWorkout (){

    const token = localStorage.getItem("token");

    const [currentWorkout, setCurrentWorkout] = useState([]);
    const [workoutName, setWorkoutName] = useState('');

    const [exerciseName, setExerciseName] = useState('');
    const [exerciseSets, setExerciseSets] = useState([]);
    const [exerciseWeight, setExerciseWeight] = useState([]);
    const [exerciseReps, setExerciseReps] = useState([]);

    const [currentSetNumber, setCurrentSetNumber] = useState(2);
    const [currentWeight, setCurrentWeight] = useState(0);
    const [currentReps, setCurrentReps] = useState(0);


    const handleAddExercise = async (e) => {
        e.preventDefault();


        const lastExercise = currentWorkout[currentWorkout.length - 1];

        if (lastExercise){
            if (lastExercise.exerciseName === exerciseName)
        {
            console.log("Same Exercise")

            const updatedWorkoutWithoutLastExercise = currentWorkout.slice(0, -1);
            setCurrentSetNumber(currentSetNumber + 1)
            console.log(currentSetNumber)
            
            
            

            //Adding currentSetNumber, currentWeight, currentReps to Sets, Weight, Reps for Same Exercise
            setExerciseSets([...exerciseSets, currentSetNumber]);
            setExerciseWeight([...exerciseWeight, currentWeight]);
            setExerciseReps([...exerciseReps, currentReps]);
            console.log(exerciseSets)

            
            // Updating Sets, Weight, Reps for Same Exercise

            const updatedLastExercise = {
                exerciseName: exerciseName,
                exerciseSets: [...exerciseSets, currentSetNumber],
                exerciseWeight: [...exerciseWeight, currentWeight],
                exerciseReps: [...exerciseReps, currentReps]
              };
            
            setCurrentWorkout([...updatedWorkoutWithoutLastExercise, updatedLastExercise]) 


            //Updating Current Workout with Exercise after all Sets are done
            // setCurrentWorkout(currentWorkout => [...currentWorkout,{exerciseName: exerciseName, exerciseSetNumber: exerciseSets, exerciseWeight: exerciseWeight, exerciseReps: exerciseReps}])
        }
        else
        {    
            console.log("New Exercise")
            setCurrentSetNumber(2)
            console.log(currentSetNumber)
            
            // Emptying Sets, Weight, Reps for New Exercise
            setExerciseSets([1]);
            setExerciseWeight([currentWeight]);
            setExerciseReps([currentReps]);
            
        

            //Adding First Set to Sets, Weight, Reps for New Exercise

            setCurrentWorkout(currentWorkout => [...currentWorkout,{exerciseName: exerciseName, exerciseSetNumber: [1], exerciseWeight: [currentWeight], exerciseReps: [currentReps]}])
        }
        }
        else
        {    
            console.log("First Exercise")
            // Emptying Sets, Weight, Reps for New Exercise
            setExerciseSets([1]);
            setExerciseWeight([currentWeight]);
            setExerciseReps([currentReps]);

           


            //Adding First Set to Sets, Weight, Reps for New Exercise
            setCurrentWorkout(currentWorkout => [...currentWorkout,{exerciseName: exerciseName, exerciseSetNumber: [1], exerciseWeight: [currentWeight], exerciseReps: [currentReps]}])
        }
        
    }


    const handleSaveWorkout = async (e) => {
        e.preventDefault();

        const workoutDate = new Date();
        const formattedWorkoutDate = workoutDate.toLocaleDateString('en-GB')
        setWorkoutName(formattedWorkoutDate);
    
        const response = await fetch('https://workout-app-server-five.vercel.app/api/newWorkout',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({currentWorkout: currentWorkout, token: token, workoutName: formattedWorkoutDate}),
        })

        const data = await response.json();
        if (data.message === "Workout Added"){
            window.location.href = "/dashboard";
        }
        else{
            alert("Workout could not be added")
        }
    }

    useEffect(() => {
        if (!token){
            window.location.href = "/login";
        }
      }, []);

      return (
        <div className="new-workout-container">
            <form className="new-workout-form" action="">
                <label htmlFor="exerciseName">Exercise Name</label>
                <input type="text" id="exerciseName" placeholder='Exercise Name' name='exerciseName' value={exerciseName} onChange={(e) => setExerciseName(e.target.value)}/> 

                <label htmlFor="exerciseWeight">Weight (in kg)</label>
                <input type="text" id="exerciseWeight" placeholder='Weight (in kg)' name='exerciseWeight' value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)}/>   

                <label htmlFor="exerciseReps">Reps</label>
                <input type="text" id="exerciseReps" placeholder='Reps' name='exerciseReps' value={currentReps} onChange={(e) => setCurrentReps(e.target.value)}/>

                <button type="submit" onClick={handleAddExercise}>Add Exercise</button>            
            </form>

            {currentWorkout.map(exercise => (
                <div className="exercise" key={exercise.id}> 
                    <p>{exercise.exerciseName}</p>
                    {exercise.exerciseSets?.map((set, index) => (
                        <p key={index}>Set {set}: {exercise.exerciseWeight[index]}kg     Reps: {exercise.exerciseReps[index]}</p>
                    ))}
                </div>
            ))}

            <form className="new-workout-form" action="">
                <button className="end-workout-button" type='submit' onClick={handleSaveWorkout}>End Workout</button>
            </form>   
        </div>
    );
}


export default NewWorkout;