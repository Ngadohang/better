
module.exports={
//Login screen
emailLogin:"#username",
passwordLogin:"#password",
loginButton: "form>button",
//Menu item
createButton:"div:nth-child(1)>div>div>button",

//Create screen
nameTextBox:"#root_name",
emailTextBox:"#root_email",
phoneTextBox:"#root_phoneNumber",
passwordTextBox:"#root_password",
confirmPasswordTextBox:"#root_confirmPassword",
descriptionTextBox:"#root_subDescription",
datetimeTextBox:"input[data-schema-variant='date']",
uploadImage: "#root div:nth-child(5) input[type=file]",
submitButton: "div>div>button[type='submit']",
addNewButton: "div:nth-child(1)>div>div>button",
index: function(row,column){
    return `tr:nth-child(${row})>td:nth-child(${column})`;
},

}