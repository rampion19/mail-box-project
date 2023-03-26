import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
    name: "email",
    initialState: {
        recievedEmails: [],
        sentEmails: [],
        unread: 0,
        // email:
        //   localStorage.getItem("email")?.replace(".", "")?.replace("@", "") || "",
    },
    reducers: {
        recievedEmail(state, action) {
            const newEmail = action.payload;

            state.recievedEmails.push({
                id: newEmail.id,
                from: newEmail.from,
                subject: newEmail.subject,
                message: newEmail.message,
            });
        },
        sentBox(state, action) {
            const sentEmail = action.payload;

            state.sentEmails.push({
                id: sentEmail.id,
                to: sentEmail.to,
                subject: sentEmail.subject,
                message: sentEmail.message,
            });
        },
    },
});

export const emailActions = emailSlice.actions;
export default emailSlice;