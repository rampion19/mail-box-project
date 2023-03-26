import { createSlice } from "@reduxjs/toolkit";
const loggedInUserEmail = localStorage.getItem("email");
const intialstate = {
    mailData: [],
    email: loggedInUserEmail,
    toEmail: null,
    unreadmessages: 0,
};
const mailSlice = createSlice({
    name: "mail",
    initialState: intialstate,
    reducers: {
        addSentMails(state, action) { },
        onRefresh(state, action) {
            const Allmails = action.payload;
            const toEmails = Allmails.filter((item) => item.to === state.email);
            state.mailData = toEmails;
            const unreadmessagesArray = Allmails.filter(
                (item) => item.read === false
            );
            state.unreadmessages = unreadmessagesArray.length;
        },
        updated(state, action) {
            const mailId = action.payload.id;
            const mailIndex = state.mailData.findIndex((mail) => mail.id === mailId);
            if (mailIndex !== -1) {
                state.mailData[mailIndex] = action.payload;
            }
            state.unreadmessages = state.mailData.reduce(
                (count, mail) => (mail.read === false ? count + 1 : count),
                0
            );
        },
        deleteMail(state, action) {
            const presentmails = [...state.mailData];
            const remainingMails = presentmails.filter(
                (item) => item.id !== action.payload.id
            );
            state.mailData = remainingMails;
        },
        setToEmail(state, action) {
            state.toEmail = action.payload;
        },
        sentMails(state, action) {
            const sentMails = action.payload
            const fromMyMails = sentMails.filter(item => item.from === state.email)
            state.mailData = fromMyMails
        },
        onLogin(state, action) {
            state.email = action.payload;
        },
        onLogOut(state, action) {
            state.toEmail = null;
            state.email = null;
            state.mailData = []; // Reset mailData to empty array
        },
    },
});

export default mailSlice;
export const mailActions = mailSlice.actions;