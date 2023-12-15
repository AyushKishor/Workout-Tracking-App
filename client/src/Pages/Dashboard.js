import {useState,useEffect} from 'react';
import '../Dashboard.css'

function Dashboard(){

    const [pastWorkouts,setPastWorkouts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
           handleDashboard();
        }
        else{
            window.location.href = "/login"
        }
    },[])

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "/login"
    }

    const handleUpdateWorkout = (e,workout) => {
        e.preventDefault();
        localStorage.setItem("workout",JSON.stringify(workout));
        window.location.href = "/updateWorkout"

    }

    const handleDeleteWorkout = async(e,workoutId) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/deleteWorkout',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token: localStorage.getItem("token"),workoutId: workoutId}),
        })

        const data = await response.json();
        console.log(data)
        handleDashboard();
    }

    const handleDashboard = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:8000/api/dashboard',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token: token}),
        }
        )
        const data = await response.json();
        console.log(data.pastWorkouts)
        setPastWorkouts(data.pastWorkouts);
        
    }

    const handleAddWorkout = (e) => {
        e.preventDefault();
        window.location.href = "/newWorkout"
    }

    return(
        <div>
            <h1>Past Workouts</h1>
            <div className="buttons">
                <form action="">
                    <button type='submit' onClick={handleAddWorkout}>Add New Workout</button>
                </form>
            
                <form action=""> 
                    <button type='submit' onClick={handleLogout}>Logout </button>
                </form>
            </div>
            <div className="past-workouts">
            {pastWorkouts.map((workout,index) => {
                return(
                <div className="workout">
                <div className="workout-text">
                    <h2>{workout.name || "Unnamed Workout"}</h2>
                    <div className="workout-exercises">
                    {workout.exercises.map((exercise) => {
                        return(
                        <div className="exercise">
                            <h3>{exercise.exerciseName}</h3>
                            {exercise.exerciseSets.map((setNumber,index)=>{
                                return(
                                    <p>Set {setNumber}: {exercise.exerciseWeight[index]} kg X {exercise.exerciseReps[index]}</p>
                                )
                            })}
                        </div>
                )})}
                </div>
                <form action="">
                    <button type='submit' onClick={(e) => handleUpdateWorkout(e,workout)}>Edit Workout</button>
                </form>
                <form action="">
                    <button type='submit' onClick={(e) => handleDeleteWorkout(e,workout._id)}>Delete Workout</button>
                </form>
                </div>
                </div>
            )})}
            </div>
        </div>
    )
}



export default Dashboard;