function initialize() {
    document.addEventListener('deviceready', function() {

        updateUserID();
        fillCourses();

    }, false);

}

function fillCourses() {
    userID = window.localStorage.getItem("userID");
    var request = new XMLHttpRequest();

    request.onload = function() {
        console.log('in this func here')
        if (request.readyState === 4 && request.status === 200) {
            responseStr = request.responseText.trim();
            if (responseStr.startsWith('<result>') && responseStr.endsWith('</result>'))
            {
              responseStr = responseStr.replace("<result>","");
              responseStr = responseStr.replace("</result>","");

              document.getElementById('contentDiv').innerHTML = responseStr;
            //alert(request.responseText);
            }
            else {
              document.getElementById('contentDiv').textContent = "An error has occurred. Response str is " + responseStr
            }
        } else {
            alert(request.statusText);
        }
    }

    request.open("get", "http://kendellclement.com/test.php?getUserLikes="+userID, true);
    request.send();
}

function updateUserID()
{
  userID = window.localStorage.getItem("userID");
  console.log('user id is ',userID)
  if (!userID)
  {
    console.log('trying to get new user')
    //userid is not set. get it
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            responseStr = xmlhttp.responseText.trim();
            if (responseStr.startsWith('<result>') && responseStr.endsWith('</result>'))
            {
              userID = responseStr.replace("<result>","");
              userID = userID.replace("</result>","");

              window.localStorage.setItem("userID",userID);
            }
            else
            {
              console.log('Cannot parse'+responseStr);
            }

        }
    }
    xmlhttp.open("GET", "http://kendellclement.com/test.php?newuser=test", false);
    xmlhttp.send();
  }

  document.getElementById("userIDDiv").innerHTML="<h2>Your userID is "+userID+"</h2>";

  return userID;
}
