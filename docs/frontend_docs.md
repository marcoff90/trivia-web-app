### Frontend App
- used libraries
  - React
  - Axios
  - React Toastify
  - React Awesome Reveal
  - React countdown-circle timer
  - Sass
  - Font Awesome

### Styling
- style and responsiveness of the page is done using Sass with variables and mixins for specific elements

### API calls
- all requests are done through AxiosService which handles most of the redirecting to pages as well informing user about possible errors using Toastify

### Pages
- the whole app is inside of layout component which creates the background of the app
- [Home](#home-page)
- [Choose Avatar](#choose-avatar-page)
- [Reset password](#reset-password-page)
- divided by Auth component which checks if JWT token is stored in local storage, if not redirects to home page
- [Game choosing](#choose-game-type-page)
- from this point duel id as path variable
- [Searching for second player](#searching-for-second-player-page)
- [Player two wait](#player-two-wait-page)
- [Categories choosing](#choose-category-page)
- [Player vs Player](#player-vs-player-page)
- [Quiz](#quiz-page)
- [Round results](#round-results-page)


###Home page
- the home page is responsible for welcoming user
- each button (sign up / login) opens corresponding input modal which contains the corresponding input fields
  - each input field and button in the modal is assigned onKeyPress and onClick function in order to send the request to server
- registration
  - user fills out username, password, email and gets notification to check his email box where he needs to click on link which takes him to [Choose Avatar page](#choose-avatar-page) to finish his registration
  - in case of invalid input the user is notified through toastify
- login
  - user fills out username and password, by clicking on button or pressing enter the request is send to server and user is redirected to [Game choosing page](#choose-game-type-page)
  - in case of invalid input the user is notified through toastify
  - in case of successful login important part of response are saved in local storage for upcoming use
    - jwt token
    - rendered in each page
      - user avatar url
      - username
      - user total score
    - the jwt token is set as default header for each request made through axios
      - in case of page refresh during the time user is logged in, the header is also set in index.js directly from local storage
    - the local storage is cleared when user logges out using a button which is showed after clicking on his avatar in user info component
- forgotten password
  - in the login modal user can click on text 'forgotten password' which opens another modal where he fills out email address and is notified to check his email, where he finds a link to finish restart his password [Reset password](#reset-password-page)
  - in case of invalid input the user is notified through toastify


### Choose avatar page
- responsible for activating user account on server
- user gets generated token from server which is used as query string and parameter in response
- when page is loading the request is made to server to get username by the token in order to welcome user by name in the game
- user can choose from 11 avatars
  - when clicked on any avatar the url of the avatar is set as the chosen avatar and through useState hook the border around the img is rendered
  - useState hooks tracks state of every avatar img and changes the boolean value of selected by id which is assigned to each avatar
- by clicking the button choose, the request to server is send containing the avatar url and query string token
  - in response the token, username, avatar url and total score is obtained and stored the same way as in case of login
- the user is then redirected to [Game choosing](#choose-game-type-page)

### Reset password page
- responsible for reseting password of the user
- user obtains the query string needed for password reset in email sent by server
- when page is loading it sends request to server to validate the query string, in case of non existing query string, user is redirected to home page
- the user fills out email and password and request to reset password is made
- then he's redirected to home page where he can log in

### Choose Game Type page
- at the moment there is just one type of the game - duel
- user sees the user info component which contains his avatar, username and current total score
- by clicking on the avatar the logout button is shown in the user info component
- when user clicks on Start Duel, the countdown 3-2-1 is shown and request to server is made
- based on the response the user is redirected to [Searching for second player](#searching-for-second-player-page) or [Player two wait](#player-two-wait-page)
  - the response tells us if the duel has been connected to second user or if the user is the one who initiated the duel
  - based on that the axios service redirects correspondingly

### Searching for second player page
- the user sees loader component and text 'Searching for second player'
- on this page the request to server is made in interval in order to find out if any other user has started the duel and the server connected these two users
- once that happens user, as a player one, is redirected to [Categories choosing](#choose-category-page)

### Player two wait page
- since the user is the player number two in the duel, he needs to wait till the player one chooses categories of questions for the game
- user sees loader component and text 'Other player chooses categories'
- the request to server is made in interval in order to find out if the categories have been chosen
- once that's done the user is redirected

### Choose category page
- when the page is loading, request to server is made in order to get the list of categories
- the state of selected categories is tracked by two useState hooks similar to choose avatar
  - the first one is responsible for holding the ids of chosen categories in array
  - the second one for tagging the chosen categories with border and detagging them on the second click
  - since the user is supposed to choose five categories, he's notified in case of overload
  ```
   const onClickCategoriesHandler = (id) => {
    // check if de-choosing category by click again
    let chosenCategory = categoriesState.filter(
        e => e.id === id && e.selected === true);

    if (chosenCategory.length > 0) {
      unselectCategory(id);
    } else {
      if (selectedCategories.length >= 5) {
        toast.error('Maximum number of categories has been chosen', {
          position: "top-center",
          autoClose: 3000,
          theme: 'colored'
        });
      } else {
        selectCategory(id);
      }
    }
  };

  const unselectCategory = (id) => {
    setCategoriesState(
        categoriesState.map(item =>
            item.id === id
                ? {...item, selected: false}
                : item
        ));
    selectedCategories.splice(selectedCategories.indexOf(id));
    setSelectedCategories(selectedCategories);
  };

  const selectCategory = (id) => {
    setCategoriesState(
        categoriesState.map(item =>
            item.id === id
                ? {...item, selected: true}
                : item
        ));
    let array = selectedCategories;
    array.push(id);
    setSelectedCategories(array);
  };
  ```
  - when the categories are chosen the request with ids is sent to server which causes the second player to connect to the game and both players are redirected to [Player vs Player](#player-vs-player-page)
  - when the user is being redirected 

### Player vs player page
- a page to display both users who is who -> avatars and usernames
- this page also makes the first request to get the question for the quiz page and sends the data as a state to the [Quiz](#quiz-page)

### Quiz page
- the page is loaded just once every five questions
- the first time it's loaded all the necessary data are passed through state and using useLocation hook, with each other question just the state of the components is changed
- the page is made of user info component, circle timer and quiz component
- the quiz component is made of question and answers
- the data to each component is passed from the state/response
- since the page isn't reloading it was neccessary to keep the state of each answer directly in the answer component
  - the answer component is conditioned to have a correct answer tag based on boolean value which is passed from the quiz page using array of boolean values in useState hook
  - with each new response (new question and answers), the use state hook is set to the initial value (4x false)
- answers are rendered from array of answers from useState hook (set in each response, initially from state) and each answer is assigned index from the array to track the state in order to get the answer id as well tag the correct answer by a green border
  ```
    const tagCorrectAnswer = (correctAnswerId) => {
    let index = findAnswerIndex(correctAnswerId);
    correctAnswerState[index] = true;
    setCorrectAnswerState(correctAnswerState);
  };

  const findAnswerIndex = (answerId) => {
    for (let answer of answers) {
      if (answer.id === answerId) {
        return answers.indexOf(answer);
      }
    }
  };
  ```
- by clicking on answer request is send to server to check if the answer has been right
  - the server returns obtained points (if > 0 shown in toastify), correct answer id, guess id and number of answered questions to this point
    - based on which the correct answer is tagged
    - toastify with points/maybe next time text is shown
    - the total score in local storage is updated if the points have been upped
    - since the game is based on 1 round per 5 questions, the checkAnswer function checks the number of answered questions, if it's dividable by 5, the request to get the round results is made and the user is redirect to [Round results](#round-results-page)
      - the request is made in interval - in order to get the response from server, both players must have the same number of questions answered
      - the user is notified through toastify to wait for other player to finish the round, the timer is hidden
      - once the request is successful, the user is redirected and in state with the redirect, all the data is sent to the Results page
    - if the number of questions isn't dividable by 5, the request to load a new question is made, the state of hooks is reseted, the answers array and question are assigned to their corresponding hooks and rerendered
- if the user doesn't answer in 15 seconds (timer visible), the check answer function is called with negative guess id which causes the wrong answer at all times

### Round results page
- the page shows the result of each round based on data obtained through useLocation hook (state)
- the data contains the array of round results (points obtained in each round), the duel object and avatars of both users
- all the data is displayed
- in time out function based on the state of the duel, the players are redirected back to quiz page (less than 26 questions - count starts at one) to continue the game or they are redirected to choose game type page in case of finished game
- the users are notified how the round went for them or the whole game in case of finished game






