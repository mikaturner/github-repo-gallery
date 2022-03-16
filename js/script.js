const OVERVIEW = document.getElementById('overview');//selects DIV with class name overview
const USER_NAME = "mikaturner";
const UL_REPO_DISPLAY = document.getElementById('repo-list');//place where repos will display

const getGithubProfile = async () =>{
    const GIT_HUB_PROFILE_REQ = await fetch (`https://api.github.com/users/${USER_NAME}`);
    const PROFILE_DATA = await GIT_HUB_PROFILE_REQ.json();
    displayUserData(PROFILE_DATA);
}

getGithubProfile();

const getGithubRepos = async () =>{
    const GIT_HUB_REPO_REQ = await fetch (`https://api.github.com/users/${USER_NAME}/repos??type=public&sort=updated&per_page=100`);
    const REPO_DATA = await GIT_HUB_REPO_REQ.json();
    repoDisplayInfo(REPO_DATA);
}

const displayUserData = (PROFILE_DATA) =>{
    const FIGURE = document.createElement("figure"); //parent element for user avatar
    const USER_AVATAR = document.createElement("img");//child element avatar
    FIGURE.appendChild(USER_AVATAR); //nests <img> inside <figure>
    USER_AVATAR.src=`${PROFILE_DATA.avatar_url}`;

    const DIV = document.createElement("div");//div parent element for displaying user info
    DIV.classList.add("user-info");//sets a class name of "user-info" to div
    OVERVIEW.appendChild(DIV); //Sets the div with class overview to be the parent of DIV
    DIV.appendChild(FIGURE);

    const PARA_DIV = document.createElement("div");//create a container for all paragraph elements
    DIV.appendChild(PARA_DIV);
    
    const PARAGRAPH_NAME = document.createElement("p");//child element of div
    PARA_DIV.appendChild(PARAGRAPH_NAME);//nest p element inside of parent
    PARAGRAPH_NAME.innerHTML = `<strong>Name:</strong> ${PROFILE_DATA.name}`;
    
    const PARAGRAPH_BIO = document.createElement("p");//child element of div
    PARA_DIV.appendChild(PARAGRAPH_BIO);//nest p element inside of parent
    PARAGRAPH_BIO.innerHTML = `<strong>Bio: </strong>${PROFILE_DATA.bio}`;
    
    const PARAGRAPH_LOCATION = document.createElement("p");//child element of div
    PARA_DIV.appendChild(PARAGRAPH_LOCATION);//nest p element inside of parent
    PARAGRAPH_LOCATION.innerHTML = `<strong>Location:</strong> ${PROFILE_DATA.location}`;
    
    const PARAGRAPH_REP_NUM = document.createElement("p");//child element of div
    PARA_DIV.appendChild(PARAGRAPH_REP_NUM);//nest p element inside of parent
    PARAGRAPH_REP_NUM.innerHTML = `<strong>Number of public repos:</strong> ${PROFILE_DATA.public_repos} `;

    getGithubRepos();
}

const repoDisplayInfo = (REPO_DATA) =>{
    for (let i= 0; i < REPO_DATA.length; i++){
        const REP_LIST_ITEM = document.createElement("li");
        REP_LIST_ITEM.classList.add("repo");
        UL_REPO_DISPLAY.appendChild(REP_LIST_ITEM);
        REP_LIST_ITEM.innerHTML = REPO_DATA[i].name;
    }
}