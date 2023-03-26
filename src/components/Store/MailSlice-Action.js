// import { mailActions } from "./MailSlice";

// export const sendingEmailMessage = (mailData) => {
//   const sender = mailData.from.replace("@", "").replace(".", "").replace(".", "");
//   const receiever = mailData.to.replace("@", "").replace(".", "").replace(".", "");

//   return async (disptach) => {
//     try {
//       const sendEmail = await fetch(
//         `https://mail-box-project-default-rtdb.firebaseio.com/${sender}.json`,
//         {
//           method: "POST",
//           body: JSON.stringify({ ...mailData }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       ); //fetch ends

//       await fetch(
//         `https://mail-box-project-default-rtdb.firebaseio.com/${receiever}.json`,
//         {
//           method: "POST",
//           body: JSON.stringify({ ...mailData }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (sendEmail.ok) {
//         const response = await sendEmail.json();
//         disptach(
//           mailActions.send({
//             id: response.name,
//             ...mailData,
//           })
//         );
//       } else {
//         const response = await sendEmail.json();
//         throw response.error;
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };
// };

// // fetching data on page load and on refresh in inbox
// export const fetchDataFromSender = (data) => {
//   const mymail = localStorage
//     .getItem("email")
//     .replace("@", "")
//     .replace(".", "")
//     .replace(".", "");
//   return async (disptach) => {
//     try {
//       const fetchData = await fetch(
//         `https://mail-box-project-default-rtdb.firebaseio.com/${mymail}.json`
//       );
//       if (fetchData.ok) {
//         const response = await fetchData.json();
//         const receivedEmails = Object.entries(response).map(
//           ([id, { from, message, to }]) => ({ id, from, message, to })
//         );
//         disptach(mailActions.receieve(receivedEmails));
//       } else {
//         const response = await fetchData.json();
//         throw response.error;
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };
// };