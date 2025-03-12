/**
 * 
 */
let account_file = '../src/currentAccounts.csv'

window.onload = function (){
  $('#login').on('click', openLogin)
    .on('dblclick', function(){$('#Box').toggleClass('is-hidden')});

  $('#signup').on('click', openSignUp)
    .on('dblclick', function(){$('#Box').toggleClass('is-hidden')});
}

function openLogin(error = ''){
  /**Function to build login input section
   * @Params:
   *  error (string) - error message to display on false logins
   */
  $('.rect').empty();
  $('#Box').removeClass('is-hidden');

  let username = document.createElement('input');
  let password = document.createElement('input');
  let save = document.createElement('button');
  let error_msg = document.createElement('h5');

  password.type = 'password';
  save.textContent = 'Login';
  save.setAttribute('class','custom-button save');

  if (error.length > 1){error_msg.textContent = error;} //Show error message
  
  //Build login input UI
  $('.rect')
    .append(error_msg)
    .append('<h6>Enter Username:</h6>')
    .append(username)
    .append('<h6>Enter Password:</h6>')
    .append(password)
    .append(save);

    save.addEventListener('click',function(){ //Validate login info on click
      if (validateLogin(username.value, password.value)){
        //Navigate to home page.
        alert('Login Successful!');
      }

      else{
        console.log('Login failed.')
      }
    });   
}

function validateLogin(user, pass){
  /** Function to verify account exists
   * @param user (string) - user name to validate
   * @param pass (string) - password to validate
   * 
   * @returns boolean
   */

  readAccounts().then(accounts => {
    //Parse accounts to find current login
    for(let i=0; i<accounts.length; i++){
     if (accounts[i].name === user && accounts[i].password === pass){
      return true;
     }
    }
    //Login Failed
    openLogin('*Error. Invalid Username or Password.');
    return false;
  });
}

function openSignUp(error = ''){
  /**Function to build sign up input section
   * @param error (string) - error message to display on false logins
   */
  $('.rect').empty();
  $('#Box').removeClass('is-hidden');

  let username = document.createElement('input');
  let password = document.createElement('input');
  let confirm_password = document.createElement('input');
  let save = document.createElement('button');
  let error_msg = document.createElement('h5');

  password.type = 'password';
  confirm_password.type = 'password';
  save.textContent = 'Sign Up';
  save.setAttribute('class','custom-button save');

  if (error.length > 1){error_msg.textContent = error;} //Show error message
  
  //Build sign up input UI
  $('.rect')
    .append(error_msg)
    .append('<h6>Enter Username:</h6>')
    .append(username)
    .append('<h6>Enter Password:</h6>')
    .append(password)
    .append('<h6>Confirm Password:</h6>')
    .append(confirm_password)
    .append(save);

    save.addEventListener('click',function(){ //Validate signup info on click
      if (validateSignUp(username.value, password.value, confirm_password.value)){
        //Navigate to home page.
        alert('Sign Up Successful!');
      }

      else{
        console.log('Login failed.')
      }
    });   
}

function validateSignUp(user, pass, pass2){
  /** Function to validate info is valid to create an account
   * @param user (string) - user name
   * @param pass (string) - password
   * @param pass2 (string) - confirmed password
   * 
   * @return boolean
   */
  let err = '' //Error message if invalid

  readAccounts().then(accounts => {
    //Parse accounts to validate username
    for(let i=0; i<accounts.length; i++){
      if (user.length === 0 || pass.length === 0 || pass2.length === 0){  //fields not filled out
        openSignUp('*Error. Please fill out all the fields.')
        return false;
      }
      else if (accounts[i].name === user){ //username exists
        openSignUp('*Error. Username already exists.')
        return false;
      }
      else if (pass !== pass2){ //Mismatch password + confirm password
        openSignUp('*Error. Passwords do not match.')
        return false;  
      }
    }
    //Sign up is valid. Write to csv file
 
    return true;
  });
  
}

async function readAccounts() {
  let accounts;
  await d3.csv(account_file)  
    .then(data => {
      accounts = data;  
    })
    .catch(error => {
      console.error('Error loading CSV file:', error);
    });
  return accounts;  // Return the accounts data 
}
