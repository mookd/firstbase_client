import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useGetPeople } from "./useRequest";
import Person from "./components/Person";
import PersonDetails from "./components/PersonDetails";
import { PersonModel } from "./models/PersonModel";
import Header from "./components/Header";
import { SearchBar } from "./components/SearchBar";

const App = () => {

  const { data : { people = [] } = {}, error, loading } = useGetPeople();
  const [filteredData, setFilteredData] = useState(people);

  const [searchFirstName, setSearchFirstName] = useState<string>("");
  const [searchLastName, setSearchLastName] = useState<string>("");

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event && event.target && event.target.value;
    setSearchFirstName(value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event && event.target && event.target.value;
    setSearchLastName(value);
  };

  React.useEffect(() => {
    if(people && people.length){
        setFilteredData(
        people.filter((person: PersonModel) => person.name.first.toLowerCase().startsWith(searchFirstName.toLowerCase()) 
        && person.name.last.toLowerCase().startsWith(searchLastName.toLowerCase())
      ));
    }
    
  }, [people, searchFirstName, searchLastName])
  if(error) return <h1>Something went wrong!</h1>;
  if(loading) return <h1>Loading...</h1>;

  return (
    <Router>
      <Route path="/" exact>          
        <>
          <div>
            <Header pageName="Company Employee Directory"/>
            <form>
              <SearchBar 
                fieldLabel="First Name" 
                searchField="firstName" 
                value={searchFirstName} 
                onChange={handleFirstNameChange} 
              />
              &nbsp;
              <SearchBar 
                fieldLabel="Last Name" 
                searchField="lastName" 
                value={searchLastName} 
                onChange={handleLastNameChange} 
              />
            </form>
          </div>
          {filteredData.map((person: PersonModel) => <Person key={person.id} person={person} />)}
        </>
      </Route>
      <Route path="/person/:id">
        <PersonDetails />
      </Route>    
    </Router>
  );
}

export default App;