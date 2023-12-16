import {useState, useEffect} from 'react';

function UpdateWorkout(){

    const token = localStorage.getItem("token");
    if(!token){
        window.location.href = "/login"
    }
    const [workout,setWorkout] = useState(JSON.parse(localStorage.getItem("workout")))


    const handleWeightsUpdate = (e,exercise,index) => {
      e.preventDefault()
      const updatedWorkout = {...workout};
      updatedWorkout.exercises[index].exerciseWeight[index] = e.target.value;
      setWorkout(updatedWorkout);
    }

    const handleRepsUpdate = (e,exercise,index) => {
      e.preventDefault()
      const updatedWorkout = {...workout};
      updatedWorkout.exercises[index].exerciseReps[index] = e.target.value;
      setWorkout(updatedWorkout);
    }

    const handleUpdateWorkout = async(e) =>{
      e.preventDefault();
      const response = await fetch('https://workout-app-server-five.vercel.app/api/updateWorkout',{
        method: 'POST',
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({token: token, workout: workout}),
      })
      const data = await response.json();
      window.location.href = "/dashboard"
      }


    return (
        <div className="main">
          <h1>Update Workout</h1>
          <h2>{workout.name}</h2>
          <form action="">
          {workout.exercises.map((exercise, index) => {
            return (
              <div className="exercise" key={index}>
                <h2>{exercise.exerciseName}</h2>
                {exercise.exerciseSets.map((set, index) => {
                  return (
                    <div className="set" key={index}>
                    <label htmlFor="exerciseWeight">Weight</label>
                    <input type="text" name='exerciseWeight' value={exercise.exerciseWeight[index]} onChange={(e) => handleWeightsUpdate(e, exercise, index)}/>
                    <label htmlFor="exerciseReps">Reps</label>
                    <input type="text" name='exerciseReps' value={exercise.exerciseReps[index]} onChange={(e) => handleRepsUpdate(e, exercise, index)}/>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <button type='submit' onClick={handleUpdateWorkout}>Update Workout</button>
          </form>
          <form action="">
              <button type='submit'>Dashboard</button>
          </form>
        </div>
      );
    }


export default UpdateWorkout;