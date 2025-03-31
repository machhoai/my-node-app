import logo from './logo.svg';
import './App.css';

function App() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const id = event.target.id.value;

    try {
      const response = await fetch('http://localhost:5000/user', {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, id }),
      });
  
      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
      }
  
      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error('Error:', error.message);
  }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" name="id" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
