function Home({ backendURL }) {
    const onReset = async () =>{
        try{
            await fetch(`${backendURL}/Reset`, { method: 'POST'});
            window.location.reload();
            alert("Successfully reset database back to sample data.");
        } catch(err){
            console.error('Front: reset failed');
        }
    }

    return (
        <>
            <h1>NBA Games & Stats Management System</h1>

            <div className="homepageDescription bg-overlay">
            <h1>Welcome to NBA Stats</h1>
            <p className="text-accent">Track games, players, and more.</p>
            <button onClick={onReset}>Reset</button>
            </div>
        </>
    )
} export default Home;
