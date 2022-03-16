const OVERVIEW = document.getElementById('overview');//selects DIV with class name overview
const USER_NAME = "mikaturner";
const UL_REPO_DISPLAY = document.getElementById('repo-list');//place where repos will display
const SECTION_SELECT = document.getElementById('repos'); //where all repo information appears
const SECTION_REPO_DATA = document.getElementById('repo-data'); //where individual repo data will display
let repoData = [];//Empty array to store repo data from gitHub API

const getGithubProfile = async () =>
{
    const GIT_HUB_PROFILE_REQ = await fetch (`https://api.github.com/users/${USER_NAME}`);
    const PROFILE_DATA = await GIT_HUB_PROFILE_REQ.json();
    displayUserData(PROFILE_DATA);
}

getGithubProfile();

const getGithubRepos = async () =>
{
    const GIT_HUB_REPO_REQ = await fetch (`https://api.github.com/users/${USER_NAME}/repos??type=public&sort=updated&per_page=100`);
    repoData = await GIT_HUB_REPO_REQ.json();
    repoDisplayInfo(repoData);
    console.log(repoData);
}

const displayUserData = (PROFILE_DATA) =>
{
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

const repoDisplayInfo = (repoData) => //Gets repo names from gitHub API creates list items and gives them class name of repo
{
    for (let i= 0; i < repoData.length; i++)
    {
        const REP_LIST_ITEM = document.createElement("li");
        REP_LIST_ITEM.classList.add("repo");
        UL_REPO_DISPLAY.appendChild(REP_LIST_ITEM);
        REP_LIST_ITEM.innerHTML = `<h3>${repoData[i].name}</h3>`;
    }
}

UL_REPO_DISPLAY.addEventListener("click", (e) =>
{
    if (e.target.matches("h3"))
    {
        let repoName = e.target.innerText;
        repoDetails(repoName);
    }
})

const repoDetails = (repoName) =>
{
    console.log(repoName);

    const REPO = repoData.find((r) =>
    {
        return r.name === repoName;
    });

    SECTION_REPO_DATA.innerHTML = "";
    const DIV = document.createElement("div");//div parent element for displaying repo Details
    SECTION_REPO_DATA.appendChild(DIV);//Makes DIV the child of DIV with #repo-data

    const HEADING = document.createElement("h3");//makes an h3
    DIV.appendChild(HEADING);//makes h3 a child of DIV
    HEADING.innerHTML = `Name: ${REPO.name}`;

    const P_DESCR = document.createElement("p");//makes a <p> for description
    DIV.appendChild(P_DESCR);//makes child of DIV
    P_DESCR.innerHTML = `Description: ${REPO.description}`;

    const P_DEFAULT_BRANCH = document.createElement("p");//makes a <p> for Default Branch
    DIV.appendChild(P_DEFAULT_BRANCH);//makes child of DIV
    P_DEFAULT_BRANCH.innerHTML = `Default Branch: ${REPO.default_branch}`;

    const P_LANGUAGES = document.createElement("p");//makes a <p> for languages
    DIV.appendChild(P_LANGUAGES);//makes child of DIV
    P_LANGUAGES.innerHTML = `Languages: ${REPO.language}`;

    const A_LINK = document.createElement("a");//makes a <a> for gitHub Link
    DIV.appendChild(A_LINK);//makes child of DIV
    A_LINK.classList.add("visit");//adds .visit to link
    A_LINK.href = `${REPO.html_url}`;
    A_LINK.target = "_blank";
    A_LINK.rel = "noreferrer noopener";
    A_LINK.innerHTML = "View Repo on GitHUB!"

    SECTION_REPO_DATA.classList.remove("hide");
    SECTION_SELECT.classList.add("hide");
}