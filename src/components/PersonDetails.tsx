import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { EditPerson } from "../models/PersonModel";
import { useGetPerson, useUpdatePerson } from "../useRequest";
import Header from "./Header";
const defaultPerson = {
  id: "", 
  name: {
    title: "", first: "", last: ""
  }, 
  picture: { large: ""}, 
  email: ""
}

export default function PersonDetails() {
  const { id } = useParams<{ id: string }>();

  const { data, error, loading } = useGetPerson(id);
  const [ person, setPerson ] = useState(defaultPerson);
  const [ status, setStatus ] = useState("read");
  const [ updatePerson, setUpdatePerson ] = useState<EditPerson>();
  const [ editPerson, { data: updateData, error: updateError } ] = useUpdatePerson();

  React.useEffect(() => {
    if(data && data.person)setPerson(data.person);
  }, [data]);

  React.useEffect(() => {
    if(updatePerson) editPerson({ variables: {
      id,
      payload: updatePerson
    }
  });
  },[updatePerson, editPerson, id]);

  React.useEffect(() => {
    // if the update failed, reset the data to the original values.
    if(updateError && data && data.person)setPerson(data.person);
  },[updateError,data]);

  const enableEdit = () => {
    setStatus("edit");
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setStatus("read");
    const title = event.target.title.value;
    const first = event.target.first.value;
    const last = event.target.last.value;
    const email = event.target.email.value;
    setUpdatePerson({
      title,
      first,
      last,
      email
    });
  }

  if(error) return <h1>Something went wrong!</h1>;
  if(loading) return <h1>Loading...</h1>;

  return (
      <div className="person">
        <Header pageName="Employee Details"/>
        <img src={person.picture.large} alt={person.id}/>
        <div>Person ID: {person.id}</div>
        <form onSubmit={handleSubmit}>
          <p>Title:&nbsp;
            <input id="title" type="text" size={51} value={person.name.title} disabled={status === "read"}/>
          </p>       
          <p>Firstname:&nbsp;
            <input id="first" type="text" size={45} defaultValue={person.name.first} disabled={status === "read"}/>
          </p>       
          <p>Lastname:&nbsp;
            <input id="last" type="text" size={45} defaultValue={person.name.last} disabled={status === "read"}/>
          </p>       
          <p>Email:&nbsp;
            <input id="email" type="text" size={50} defaultValue={person.email} disabled={status === "read"}/>
          </p>
          <button type="button" onClick={enableEdit} disabled={status !== "read"}>{"Edit"}</button>&nbsp;&nbsp;
          <input type="submit" disabled={status === "read"} value="Save"/>
          {updateError && <p>{updateError.message}</p>}
          {updateData && <p>Update Success!</p>} 
        </form>
      </div>
  );
}