// import { useState, useTransition } from "react";
// import ClientSelect from './ClientSelect';
// import DatePicker from './DatePicker';
// import Hours from './Hours';
// import Description from './Description';

// function Form() {
//     const [client, setclient] = useState("")
//     const [project, setProject] = useState("")
//     const [date, setDate] = useState("")
//     const [hours, setHours] = useState("")
//     const [description, setDescription] = useState("")
//     const [billable, setBillable] = useState(false);
// }

// const clearForm =()=> {
//     setClient("");
//     setProject("");
//     setDate(new Date());
//     setHours("");
//     setDescription("");
//     setBillable(false);
// }


// return(
//     <div>
//         <ClientSelect client={client} setClient={setClient}/>
//         <DatePicker date={date} setDate={setDate} />
//         <Hours hours={hours} setHours={setHours} />
//         <Description clearForm={clearForm} />
//     </div>
// )

// export default Form;