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
            <div className="homepageDescription">
                <p>By: Shawn Singharaj & Andy Bui</p>
                <h2>Reset to Original Sample Data:</h2>
                <button onClick={onReset}>Reset</button>
            </div>
        </>
    )
} export default Home;
